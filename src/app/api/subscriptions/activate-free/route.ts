import { NextResponse } from "next/server";
import { BILLING_CURRENCY } from "@/lib/billing";
import { supabaseAdmin, getUserFromRequest } from "@/lib/server/supabaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: active } = await supabaseAdmin
    .from("subscriptions")
    .select("id, plan")
    .eq("user_id", user.id)
    .eq("status", "active")
    .maybeSingle();

  const now = new Date();
  const periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const upsertUsage = async () => {
    await supabaseAdmin.from("usage_counters").upsert(
      {
        user_id: user.id,
        period_start: periodStart.toISOString().slice(0, 10),
        period_end: periodEnd.toISOString().slice(0, 10),
      },
      { onConflict: "user_id,period_start", ignoreDuplicates: true },
    );
  };

  if (active?.plan === "free") {
    await supabaseAdmin.from("user_plans").upsert(
      {
        user_id: user.id,
        plan: "free",
        status: "active",
        provider: "internal",
        subscription_id: active.id,
        current_period_start: now.toISOString(),
        current_period_end: null,
      },
      { onConflict: "user_id" },
    );

    await upsertUsage();

    return NextResponse.json({ status: "already_active" });
  }

  if (active?.id) {
    await supabaseAdmin
      .from("subscriptions")
      .update({ status: "canceled" })
      .eq("id", active.id);
  }

  const { data: subscription, error } = await supabaseAdmin
    .from("subscriptions")
    .insert({
      user_id: user.id,
      plan: "free",
      status: "active",
      amount: 0,
      currency: BILLING_CURRENCY,
      current_period_start: now.toISOString(),
      current_period_end: null,
    })
    .select("id")
    .single();

  if (error || !subscription) {
    return NextResponse.json(
      { error: "Unable to activate free plan" },
      { status: 500 },
    );
  }

  await supabaseAdmin.from("user_plans").upsert(
    {
      user_id: user.id,
      plan: "free",
      status: "active",
      provider: "internal",
      subscription_id: subscription.id,
      current_period_start: now.toISOString(),
      current_period_end: null,
    },
    { onConflict: "user_id" },
  );

  await upsertUsage();

  await supabaseAdmin.from("subscription_events").insert({
    user_id: user.id,
    type: "free_plan_activated",
    payload: { user_id: user.id },
  });

  return NextResponse.json({ status: "active" });
}
