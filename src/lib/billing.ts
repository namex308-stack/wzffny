export const BILLING_CURRENCY = "EGP" as const;

export type PlanId = "free" | "pro" | "premium";

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
  pro: {
    id: "pro",
    name: "Pro",
    amount: 149,
    period: "month",
  },
  premium: {
    id: "premium",
    name: "Premium",
    amount: 299,
    period: "month",
  },
};

export const PLAN_NAME_TO_ID: Record<string, PlanId> = {
  Free: "free",
  Pro: "pro",
  Premium: "premium",
};

export const isPaidPlan = (plan: PlanId) => plan !== "free";

export const normalizePlanId = (value: string | null | undefined): PlanId | null => {
  if (!value) {
    return null;
  }
  const normalized = value.toLowerCase().trim();
  if (normalized === "free" || normalized === "pro" || normalized === "premium") {
    return normalized;
  }
  return null;
};
