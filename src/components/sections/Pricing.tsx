"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useLocale } from "@/components/providers/LocaleProvider";
import { getSiteContent } from "@/lib/siteContent";
import { supabase } from "@/lib/supabaseClient";
import type { PlanId } from "@/lib/billing";

export function Pricing() {
  const router = useRouter();
  const { locale } = useLocale();
  const content = getSiteContent(locale);
  const messages =
    locale === "ar"
      ? {
          selectionError: "تعذر اختيار الخطة. يرجى المحاولة مرة أخرى.",
          freeActivationError: "تعذر تفعيل الخطة المجانية الآن.",
          loading: "جارٍ التحميل...",
        }
      : {
          selectionError: "Plan selection failed. Please try again.",
          freeActivationError: "We couldn't activate the free plan yet.",
          loading: "Loading...",
        };
  const heading =
    locale === "ar"
      ? { title: "ابدأ مجانًا. طوّر وقتما تشاء.", subtitle: "احتفظ بالخطة المجانية طالما أردت." }
      : { title: "Start free. Upgrade when ready.", subtitle: "Keep the free plan as long as you want." };
  const toggleLabels =
    locale === "ar"
      ? { monthly: "شهري", yearly: "سنوي (وفر)" }
      : { monthly: "Monthly", yearly: "Yearly (save)" };
  const [submittingPlan, setSubmittingPlan] = useState<PlanId | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<"month" | "year">("month");

  const handlePlanSelection = async (planId: PlanId) => {
    if (!planId) {
      setErrorMessage(messages.selectionError);
      return;
    }

    setErrorMessage(null);
    setSubmittingPlan(planId);

    const { data } = await supabase.auth.getSession();
    const session = data.session;

    if (!session) {
      router.push(planId === "free" ? "/signup" : `/signup?plan=${planId}`);
      setSubmittingPlan(null);
      return;
    }

    if (planId === "free") {
      const response = await fetch("/api/subscriptions/activate-free", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        setErrorMessage(messages.freeActivationError);
        setSubmittingPlan(null);
        return;
      }

      router.push("/dashboard");
      return;
    }

    router.push(`/checkout?plan=${planId}`);
  };

  const plansByCycle = content.pricing.reduce(
    (acc, plan) => {
      if (plan.period === "year") {
        acc.year.push(plan);
      } else {
        acc.month.push(plan);
      }
      return acc;
    },
    { month: [] as typeof content.pricing, year: [] as typeof content.pricing },
  );

  const visiblePlans = plansByCycle[billingCycle];

  const isStarter = (id: PlanId) => id === "starter_monthly" || id === "starter_yearly";
  const isPro = (id: PlanId) => id === "pro_monthly" || id === "pro_yearly";
  const savingsLabel = (id: PlanId) => {
    if (id === "starter_yearly") return locale === "ar" ? "وفر 40٪" : "Save 40%";
    if (id === "pro_yearly") return locale === "ar" ? "وفر 44٪" : "Save 44%";
    return null;
  };

  return (
    <section id="pricing" className="cv-auto py-24 bg-slate-50">
      <Container>
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            {content.copy.sections.pricing.eyebrow}
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-slate-900">
            {heading.title}
          </h2>
          <p className="mt-3 text-lg text-slate-600">{heading.subtitle}</p>
        </div>

        <div className="mx-auto mt-6 flex max-w-2xl items-center justify-center">
          <div className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 shadow-sm">
            {locale === "ar"
              ? "معظم المبتدئين يختارون ستارتر شهري."
              : "Most beginners choose Starter Monthly."}
          </div>
        </div>

        <div className="mx-auto mt-4 flex max-w-lg justify-center">
          <div className="flex w-full rounded-full border border-slate-200 bg-white p-1 shadow-sm">
            <button
              type="button"
              className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
                billingCycle === "month"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-slate-600"
              }`}
              onClick={() => setBillingCycle("month")}
            >
              {toggleLabels.monthly}
            </button>
            <button
              type="button"
              className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
                billingCycle === "year"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-slate-600"
              }`}
              onClick={() => setBillingCycle("year")}
            >
              {toggleLabels.yearly}
            </button>
          </div>
        </div>

        <div
          className={`mx-auto mt-10 grid gap-6 ${
            billingCycle === "month" ? "md:grid-cols-3" : "md:grid-cols-2"
          } max-w-6xl`}
        >
          {visiblePlans.map((plan) => {
            const highlighted =
              billingCycle === "month" ? isStarter(plan.id) : isPro(plan.id);
            const badge =
              billingCycle === "month" && isStarter(plan.id)
                ? locale === "ar"
                  ? "الأفضل للمبتدئين"
                  : "Best for beginners"
                : savingsLabel(plan.id);
            return (
              <div
                key={plan.id}
                className={`relative flex h-full flex-col rounded-3xl border ${
                  highlighted ? "border-indigo-200 bg-indigo-50" : "border-slate-200 bg-white"
                } px-8 py-10 shadow-sm`}
              >
                {badge ? (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span
                      className={`rounded-full px-4 py-1 text-xs font-semibold shadow ${
                        highlighted ? "bg-indigo-600 text-white" : "bg-indigo-100 text-indigo-700"
                      }`}
                    >
                      {badge}
                    </span>
                  </div>
                ) : null}

                <div className="text-center">
                  <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline justify-center gap-2">
                    <span className="text-4xl md:text-5xl font-bold text-slate-900">
                      {plan.price.replace("/month", "").replace("/year", "")}
                    </span>
                    <span className="text-base font-medium text-slate-500">
                      /{plan.period === "month" ? (locale === "ar" ? "شهر" : "month") : locale === "ar" ? "سنة" : "year"}
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-emerald-600">
                    {savingsLabel(plan.id)}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">{plan.description}</p>
                </div>

                <ul className="mt-6 space-y-3 text-sm text-slate-700">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 leading-6">
                      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                        <Check className="h-3 w-3" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => handlePlanSelection(plan.id)}
                    disabled={submittingPlan === plan.id}
                    className={`w-full rounded-xl px-5 py-3 text-sm font-semibold transition ${
                      highlighted
                        ? "bg-indigo-600 text-white shadow-lg hover:bg-indigo-700"
                        : "border border-indigo-200 text-indigo-700 hover:border-indigo-400"
                    }`}
                  >
                    {submittingPlan === plan.id ? messages.loading : plan.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {errorMessage ? (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        ) : null}

        <div className="mt-10 flex flex-col items-center gap-3 text-sm text-slate-600">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Check className="h-3 w-3" />
            </span>
            {locale === "ar" ? "يمكنك التبديل أو الإلغاء في أي وقت." : "Switch or cancel anytime."}
          </div>
          <p className="text-xs text-slate-500">
            {locale === "ar"
              ? "الخطط السنوية توفّر حتى 44٪ وتشمل كل المميزات."
              : "Yearly plans save up to 44% and include all features."}
          </p>
        </div>
      </Container>
    </section>
  );
}
