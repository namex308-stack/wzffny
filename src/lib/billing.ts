export const BILLING_CURRENCY = "EGP" as const;

export type PlanId =
  | "free"
  | "starter_monthly"
  | "pro_monthly"
  | "starter_yearly"
  | "pro_yearly";

type BillingPeriod = "month" | "year";

type PlanDefinition = {
  id: PlanId;
  name: string;
  amount: number;
  period: BillingPeriod;
  intervalMonths: number;
};

export const PLAN_DEFINITIONS: Record<PlanId, PlanDefinition> = {
  free: {
    id: "free",
    name: "Free",
    amount: 0,
    period: "month",
    intervalMonths: 1,
  },
  starter_monthly: {
    id: "starter_monthly",
    name: "Starter Monthly",
    amount: 299,
    period: "month",
    intervalMonths: 1,
  },
  pro_monthly: {
    id: "pro_monthly",
    name: "Pro Monthly",
    amount: 599,
    period: "month",
    intervalMonths: 1,
  },
  starter_yearly: {
    id: "starter_yearly",
    name: "Starter Yearly",
    amount: 1999,
    period: "year",
    intervalMonths: 12,
  },
  pro_yearly: {
    id: "pro_yearly",
    name: "Pro Yearly",
    amount: 3999,
    period: "year",
    intervalMonths: 12,
  },
};

export const PLAN_NAME_TO_ID: Record<string, PlanId> = {
  Free: "free",
  "Starter Monthly": "starter_monthly",
  "Pro Monthly": "pro_monthly",
  "Starter Yearly": "starter_yearly",
  "Pro Yearly": "pro_yearly",
  Starter: "starter_monthly",
  Pro: "pro_monthly",
  Paid: "pro_monthly", // backward compatibility with legacy links
};

export const isPaidPlan = (plan: PlanId) => plan !== "free";

export const normalizePlanId = (value: string | null | undefined): PlanId | null => {
  if (!value) {
    return null;
  }

  const normalized = value.toLowerCase().trim().replace(/-/g, "_");

  switch (normalized) {
    case "free":
      return "free";
    case "starter":
    case "starter_monthly":
      return "starter_monthly";
    case "pro":
    case "paid":
    case "pro_monthly":
      return "pro_monthly";
    case "starter_year":
    case "starter_yearly":
      return "starter_yearly";
    case "pro_year":
    case "pro_yearly":
    case "premium":
      return "pro_yearly";
    default:
      return null;
  }
};
