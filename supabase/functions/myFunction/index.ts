// @ts-ignore Deno edge runtime resolves URL imports.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.95.3";
// @ts-ignore Deno edge runtime resolves URL imports.
import { Webhook } from "https://esm.sh/standardwebhooks@1.0.0";

/**
 * Edge Functions (Reserved for complex server logic and integrations)
 * This function is optional for advanced workflows (webhooks, third-party syncs).
 * Core signup relies on the database trigger to create the profile record.
 */

type DenoEnv = {
  get: (key: string) => string | undefined;
};

type DenoServe = (
  handler: (req: Request) => Response | Promise<Response>,
) => void;

type DenoLike = {
  env: DenoEnv;
  serve: DenoServe;
};

const deno = (globalThis as { Deno?: DenoLike }).Deno;

if (!deno) {
  throw new Error("This function must run in a Deno runtime.");
}

const supabaseUrl = deno.env.get("SUPABASE_URL");
const serviceRoleKey = deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const hookSecret = deno.env.get("SIGNUP_HOOK_SECRET");
const allowedOrigin = deno.env.get("ALLOWED_ORIGIN") ?? "*";

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

const corsHeaders = {
  "Access-Control-Allow-Origin": allowedOrigin,
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const allowedAccountTypes = new Set(["student", "professional", "job_seeker"]);

function normalizeAccountType(value: unknown) {
  if (typeof value !== "string") {
    return "job_seeker";
  }
  const normalized = value.toLowerCase();
  return allowedAccountTypes.has(normalized) ? normalized : "job_seeker";
}

function jsonResponse(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse(405, { error: "Method not allowed" });
  }

  const authHeader = req.headers.get("Authorization") ?? "";
  const token = authHeader.replace("Bearer ", "").trim();

  if (!token) {
    return jsonResponse(401, { error: "Missing Authorization token" });
  }

  const rawBody = await req.text();
  const headers = Object.fromEntries(req.headers.entries()) as Record<
    string,
    string
  >;

  let payload: Record<string, unknown> = {};

  const hasWebhookHeaders =
    Boolean(headers["webhook-signature"]) &&
    Boolean(headers["webhook-id"]) &&
    Boolean(headers["webhook-timestamp"]);

  if (hookSecret && hasWebhookHeaders) {
    const cleanSecret = hookSecret.replace("v1,whsec_", "");
    try {
      const webhook = new Webhook(cleanSecret);
      payload = webhook.verify(rawBody, headers) as Record<string, unknown>;
    } catch (_error) {
      return jsonResponse(401, { error: "Invalid webhook signature" });
    }
  } else if (rawBody) {
    try {
      payload = JSON.parse(rawBody) as Record<string, unknown>;
    } catch (_error) {
      return jsonResponse(400, { error: "Invalid JSON payload" });
    }
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser(token);

  if (userError || !user) {
    return jsonResponse(401, { error: "Unauthorized" });
  }

  const payloadUser = (payload.user ?? {}) as Record<string, unknown>;
  const payloadUserId = payloadUser.id as string | undefined;

  if (payloadUserId && payloadUserId !== user.id) {
    return jsonResponse(403, { error: "User mismatch" });
  }
  const metadata =
    (payloadUser.user_metadata as Record<string, unknown>) ??
    (user.user_metadata as Record<string, unknown>) ??
    {};

  const profileId = payloadUserId ?? user.id;
  const fullName =
    (metadata.full_name as string | undefined) ??
    (metadata.fullName as string | undefined);
  const accountType = normalizeAccountType(
    (metadata.account_type as string | undefined) ??
      (metadata.accountType as string | undefined),
  );

  const profilePayload: Record<string, unknown> = {
    id: profileId,
    account_type: accountType,
  };

  if (typeof fullName === "string" && fullName.length > 0) {
    profilePayload.full_name = fullName;
  }

  const { error: profileError } = await supabase
    .from("profiles")
    .upsert(profilePayload, { onConflict: "id" });

  if (profileError) {
    return jsonResponse(500, { error: profileError.message });
  }

  return jsonResponse(200, {
    success: true,
    profile: {
      id: profileId,
      full_name: fullName ?? null,
      account_type: accountType,
    },
  });
});
