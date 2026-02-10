import { NextResponse } from "next/server";
import { BILLING_CURRENCY, PLAN_DEFINITIONS, normalizePlanId } from "@/lib/billing";
import { createOrderHash, KASHIER_BASE_URL } from "@/lib/server/kashier";
import { getUserFromRequest, supabaseAdmin } from "@/lib/server/supabaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const planId = normalizePlanId(body?.plan);
  if (!planId || planId === "free") {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const plan = PLAN_DEFINITIONS[planId];

  const merchantId = process.env.KASHIER_MERCHANT_ID;
  const apiKey = process.env.KASHIER_API_KEY;
  const mode = process.env.KASHIER_MODE ?? "test";
  const baseUrl = process.env.KASHIER_BASE_URL ?? KASHIER_BASE_URL;
  const allowedMethods = process.env.KASHIER_ALLOWED_METHODS ?? "card";
  const display = process.env.KASHIER_DISPLAY ?? "en";
  const brandColor = process.env.KASHIER_BRAND_COLOR ?? "rgba(45, 164, 78, 0.9)";

  if (!merchantId || !apiKey) {
    return NextResponse.json(
      { error: "Missing Kashier environment variables" },
      { status: 500 },
    );
  }

  const orderId = `${Date.now()}${Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0")}`;
  const amount = plan.amount.toFixed(2);
  const currency = BILLING_CURRENCY;

  const hash = createOrderHash({
    merchantId,
    orderId,
    amount,
    currency,
    apiKey,
  });

  const origin =
    request.headers.get("origin") ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000";
  const merchantRedirect = new URL("/checkout/result", origin).toString();

  const metaData = JSON.stringify({
    user_id: user.id,
    email: user.email,
    plan: planId,
  });

  const hppUrl =
    `${baseUrl}?merchantId=${merchantId}` +
    `&orderId=${orderId}` +
    `&amount=${amount}` +
    `&currency=${currency}` +
    `&hash=${hash}` +
    `&merchantRedirect=${encodeURIComponent(merchantRedirect)}` +
    `&metaData=${encodeURIComponent(metaData)}` +
    `&allowedMethods=${allowedMethods}` +
    `&failureRedirect=true` +
    `&redirectMethod=get` +
    `&display=${display}` +
    `&brandColor=${encodeURIComponent(brandColor)}` +
    `&mode=${mode}`;

  const { data: subscription, error: insertError } = await supabaseAdmin
    .from("subscriptions")
    .insert({
      user_id: user.id,
      plan: planId,
      status: "pending",
      amount: plan.amount,
      currency,
      kashier_order_id: orderId,
      metadata: {
        checkout_mode: mode,
      },
    })
    .select("id")
    .single();

  if (insertError || !subscription) {
    return NextResponse.json(
      { error: "Unable to create checkout session" },
      { status: 500 },
    );
  }

  await supabaseAdmin.from("payments").insert({
    user_id: user.id,
    provider: "kashier",
    status: "pending",
    amount: plan.amount,
    currency,
    plan: planId,
    subscription_id: subscription.id,
    provider_order_id: orderId,
    metadata: {
      checkout_mode: mode,
    },
  });

  return NextResponse.json({ url: hppUrl, orderId });
}
