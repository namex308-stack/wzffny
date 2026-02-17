"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/components/providers/LocaleProvider";
import { getSiteContent } from "@/lib/siteContent";
import { supabase } from "@/lib/supabaseClient";

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
  const secondaryPrefix = locale === "ar" ? "أو" : "or";
  const [submittingPlan, setSubmittingPlan] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePlanSelection = async (planId: "free" | "paid") => {
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

  return (
    <section id="pricing" className="cv-auto py-24 bg-white">
      <Container>
        <SectionHeader
          eyebrow={content.copy.sections.pricing.eyebrow}
          title={content.copy.sections.pricing.title}
          subtitle={content.copy.sections.pricing.subtitle}
        />
        <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm font-semibold text-amber-900">
          {content.copy.sections.pricing.promotion}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {content.pricing.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 ${
                plan.highlighted
                  ? "bg-indigo-600 text-white ring-4 ring-indigo-600 ring-offset-4 ring-offset-white"
                  : "bg-white border-2 border-gray-100"
              }`}
            >
              {/* Popular Badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-yellow-400 text-gray-900 text-sm font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3
                  className={`text-xl font-semibold ${
                    plan.highlighted ? "text-white" : "text-gray-900"
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline justify-center gap-1">
                  <span
                    className={`text-5xl font-bold ${
                      plan.highlighted ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span
                      className={`text-lg ${
                        plan.highlighted ? "text-indigo-200" : "text-gray-500"
                      }`}
                    >
                      /{plan.period}
                    </span>
                  )}
                </div>
                {plan.secondaryPrice && plan.secondaryPeriod ? (
                  <p
                    className={`mt-2 text-sm ${
                      plan.highlighted ? "text-indigo-100" : "text-gray-500"
                    }`}
                  >
                    {secondaryPrefix} {plan.secondaryPrice} / {plan.secondaryPeriod}
                  </p>
                ) : null}
                <p
                  className={`mt-2 text-sm ${
                    plan.highlighted ? "text-indigo-200" : "text-gray-500"
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                        plan.highlighted ? "bg-indigo-500" : "bg-indigo-100"
                      }`}
                    >
                      <Check
                        className={`w-3 h-3 ${
                          plan.highlighted ? "text-white" : "text-indigo-600"
                        }`}
                      />
                    </div>
                    <span
                      className={
                        plan.highlighted ? "text-indigo-100" : "text-gray-600"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                type="button"
                variant={plan.highlighted ? "white" : "outline"}
                className="w-full"
                size="lg"
                onClick={() => handlePlanSelection(plan.id)}
                disabled={submittingPlan === plan.id}
              >
                {submittingPlan === plan.id
                  ? messages.loading
                  : plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {errorMessage ? (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        ) : null}

        {/* Money-back guarantee */}
        <p className="text-center text-gray-500 mt-12">
          <span className="inline-flex items-center gap-2">
            <Check className="w-5 h-5 text-green-500" />
            Cancel anytime. Upgrade or downgrade in seconds.
          </span>
        </p>
      </Container>
    </section>
  );
}
