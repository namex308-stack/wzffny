import { NextResponse } from "next/server";
import { BILLING_CURRENCY, PLAN_DEFINITIONS, type PlanId } from "@/lib/billing";
import { addMonths, verifySignature } from "@/lib/server/kashier";
import { supabaseAdmin } from "@/lib/server/supabaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const parsePayload = async (request: Request) => {
  const contentType = request.headers.get("content-type") ?? "";
  const rawBody = await request.text();
  if (!rawBody) {
    return {};
  }

  if (contentType.includes("application/json")) {
    try {
      return JSON.parse(rawBody) as Record<string, string>;
    } catch {
      return {};
    }
  }

  const params = new URLSearchParams(rawBody);
  return Object.fromEntries(params.entries());
};

export async function POST(request: Request) {
  const payload = await parsePayload(request);
  const headers = Object.fromEntries(request.headers.entries());
  const signature = payload.signature;

  const recordWebhookEvent = async (signatureValid: boolean) => {
    await supabaseAdmin.from("webhook_events").insert({
      provider: "kashier",
      event_type: payload.paymentStatus ?? null,
      signature: signature ?? null,
      signature_valid: signatureValid,
      payload,
      headers,
    });
  };

  if (!signature) {
    await recordWebhookEvent(false);
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const secret = process.env.KASHIER_WEBHOOK_SECRET ?? process.env.KASHIER_API_KEY;
  if (!secret) {
    await recordWebhookEvent(false);
    return NextResponse.json(
      { error: "Missing Kashier webhook secret" },
      { status: 500 },
    );
  }

  const isValidSignature = verifySignature(payload, secret, signature);
  await recordWebhookEvent(isValidSignature);
  if (!isValidSignature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const merchantOrderId = payload.merchantOrderId ?? payload.orderId;
  if (!merchantOrderId) {
    return NextResponse.json({ error: "Missing order id" }, { status: 400 });
  }

  const { data: subscription, error } = await supabaseAdmin
    .from("subscriptions")
    .select("*")
    .eq("kashier_order_id", merchantOrderId)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: "Lookup failed" }, { status: 500 });
  }

  if (!subscription) {
    await supabaseAdmin.from("subscription_events").insert({
      user_id: null,
      type: "kashier_webhook_unmatched",
      payload,
    });
    return NextResponse.json({ received: true });
  }

  if (subscription.status === "active") {
    return NextResponse.json({ received: true });
  }

  const paymentStatus = (payload.paymentStatus ?? "").toUpperCase();
  const success = paymentStatus === "SUCCESS";

  if (!success) {
    await supabaseAdmin
      .from("subscriptions")
      .update({ status: "failed" })
      .eq("id", subscription.id);

    await supabaseAdmin.from("payments").upsert(
      {
        user_id: subscription.user_id,
        provider: "kashier",
        status: "failed",
        amount: subscription.amount ?? 0,
        currency: subscription.currency ?? BILLING_CURRENCY,
        plan: subscription.plan,
        subscription_id: subscription.id,
        provider_order_id: merchantOrderId,
        provider_payment_id: payload.transactionId ?? null,
        metadata: {
          paymentStatus,
          orderReference: payload.orderReference ?? null,
        },
        raw_payload: payload,
      },
      { onConflict: "provider,provider_order_id" },
    );

    await supabaseAdmin.from("subscription_events").insert({
      user_id: subscription.user_id,
      type: "kashier_payment_failed",
      payload,
    });

    return NextResponse.json({ received: true });
  }

  const planId = subscription.plan as PlanId;
  const expectedAmount = PLAN_DEFINITIONS[planId]?.amount ?? 0;
  const receivedAmount = payload.amount ? Number(payload.amount) : null;
  const receivedCurrency = (payload.currency ?? BILLING_CURRENCY).toUpperCase();

  if (
    receivedAmount === null ||
    Number.isNaN(receivedAmount) ||
    Math.abs(receivedAmount - expectedAmount) > 0.01 ||
    receivedCurrency !== BILLING_CURRENCY
  ) {
    await supabaseAdmin
      .from("subscriptions")
      .update({ status: "failed" })
      .eq("id", subscription.id);

    await supabaseAdmin.from("payments").upsert(
      {
        user_id: subscription.user_id,
        provider: "kashier",
        status: "failed",
        amount: subscription.amount ?? 0,
        currency: subscription.currency ?? BILLING_CURRENCY,
        plan: subscription.plan,
        subscription_id: subscription.id,
        provider_order_id: merchantOrderId,
        provider_payment_id: payload.transactionId ?? null,
        metadata: {
          paymentStatus,
          orderReference: payload.orderReference ?? null,
          reason: "amount_mismatch",
        },
        raw_payload: payload,
      },
      { onConflict: "provider,provider_order_id" },
    );

    await supabaseAdmin.from("subscription_events").insert({
      user_id: subscription.user_id,
      type: "kashier_amount_mismatch",
      payload,
    });

    return NextResponse.json({ error: "Amount mismatch" }, { status: 409 });
  }

  await supabaseAdmin
    .from("subscriptions")
    .update({ status: "canceled" })
    .eq("user_id", subscription.user_id)
    .eq("status", "active");

  const now = new Date();
  const periodEnd = addMonths(now, 1);
  const usagePeriodStart = now.toISOString().slice(0, 10);
  const usagePeriodEnd = periodEnd.toISOString().slice(0, 10);

  await supabaseAdmin
    .from("subscriptions")
    .update({
      status: "active",
      current_period_start: now.toISOString(),
      current_period_end: periodEnd.toISOString(),
      amount: receivedAmount,
      currency: receivedCurrency,
      kashier_transaction_id: payload.transactionId ?? null,
      kashier_order_reference: payload.orderReference ?? null,
    })
    .eq("id", subscription.id);

  await supabaseAdmin.from("payments").upsert(
    {
      user_id: subscription.user_id,
      provider: "kashier",
      status: "succeeded",
      amount: receivedAmount,
      currency: receivedCurrency,
      plan: subscription.plan,
      subscription_id: subscription.id,
      provider_order_id: merchantOrderId,
      provider_payment_id: payload.transactionId ?? null,
      metadata: {
        paymentStatus,
        orderReference: payload.orderReference ?? null,
      },
      raw_payload: payload,
    },
    { onConflict: "provider,provider_order_id" },
  );

  await supabaseAdmin.from("user_plans").upsert(
    {
      user_id: subscription.user_id,
      plan: subscription.plan,
      status: "active",
      provider: "kashier",
      subscription_id: subscription.id,
      current_period_start: now.toISOString(),
      current_period_end: periodEnd.toISOString(),
    },
    { onConflict: "user_id" },
  );

  await supabaseAdmin.from("usage_counters").upsert(
    {
      user_id: subscription.user_id,
      period_start: usagePeriodStart,
      period_end: usagePeriodEnd,
    },
    { onConflict: "user_id,period_start", ignoreDuplicates: true },
  );

  await supabaseAdmin.from("subscription_events").insert({
    user_id: subscription.user_id,
    type: "kashier_payment_success",
    payload,
  });

  return NextResponse.json({ received: true });
}
