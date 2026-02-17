export const BILLING_CURRENCY = "USD" as const;

export type PlanId = "free" | "paid";

type PlanDefinition = {
  id: PlanId;
  name: string;
  amount: number;
  period: "month";
};

export const PLAN_DEFINITIONS: Record<PlanId, PlanDefinition> = {
  free: {
    id: "free",
    name: "Free",
    amount: 0,
    period: "month",
  },
  paid: {
    id: "paid",
    name: "Paid",
    amount: 10,
    period: "month",
  },
};

export const PLAN_NAME_TO_ID: Record<string, PlanId> = {
  Free: "free",
  Paid: "paid",
};

export const isPaidPlan = (plan: PlanId) => plan !== "free";

export const normalizePlanId = (value: string | null | undefined): PlanId | null => {
  if (!value) {
    return null;
  }
  const normalized = value.toLowerCase().trim();
  if (normalized === "free" || normalized === "paid") {
    return normalized;
  }
  return null;
};
