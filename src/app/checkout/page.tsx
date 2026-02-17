"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { useLocale } from "@/components/providers/LocaleProvider";
import { normalizePlanId, PLAN_DEFINITIONS } from "@/lib/billing";
import { supabase } from "@/lib/supabaseClient";
import { getSiteContent } from "@/lib/siteContent";

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { locale } = useLocale();
  const content = getSiteContent(locale);
  const isArabic = locale === "ar";
  const copy = {
    billingLabel: isArabic ? "فواتير wzzfny" : "wzzfny Billing",
    prepareCheckout: isArabic ? "جارٍ تجهيز عملية الدفع لخطة" : "Preparing",
    checkoutSuffix: isArabic ? "المدفوعة" : "checkout",
    checkoutError: isArabic ? "خطأ في الدفع" : "Checkout error",
    redirecting: isArabic
      ? "جارٍ تحويلك إلى Kashier لإتمام الدفع."
      : "We are redirecting you to Kashier to complete your payment.",
    choosePaid: isArabic ? "يرجى اختيار خطة مدفوعة للمتابعة." : "Please choose a paid plan to continue.",
    startFailed: isArabic
      ? "تعذر بدء عملية الدفع. يرجى المحاولة مرة أخرى."
      : "We couldn't start the checkout. Please try again.",
    linkMissing: isArabic ? "رابط الدفع غير متوفر. يرجى المحاولة مرة أخرى." : "Checkout link missing. Please try again.",
    paidPlan: isArabic ? "مدفوعة" : "Paid",
  };
  const choosePaid = copy.choosePaid;
  const startFailed = copy.startFailed;
  const linkMissing = copy.linkMissing;
  const planId = useMemo(
    () => normalizePlanId(searchParams.get("plan")),
    [searchParams],
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const startCheckout = async () => {
      if (!planId || planId === "free") {
        if (active) {
          setErrorMessage(choosePaid);
          setLoading(false);
        }
        return;
      }

      const { data } = await supabase.auth.getSession();
      if (!active) return;

      if (!data.session) {
        router.replace(`/signup?plan=${planId}`);
        return;
      }

      const response = await fetch("/api/kashier/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.session.access_token}`,
        },
        body: JSON.stringify({ plan: planId }),
      });

      if (!active) return;

      if (!response.ok) {
        setErrorMessage(startFailed);
        setLoading(false);
        return;
      }

      const payload = (await response.json()) as { url?: string };
      if (!payload.url) {
        setErrorMessage(linkMissing);
        setLoading(false);
        return;
      }

      window.location.href = payload.url;
    };

    startCheckout();

    return () => {
      active = false;
    };
  }, [choosePaid, linkMissing, planId, router, startFailed]);

  const planLabel =
    (planId
      ? content.pricing.find((plan) => plan.id === planId)?.name ??
        PLAN_DEFINITIONS[planId]?.name
      : undefined) ?? copy.paidPlan;

  return (
    <AuthGuard>
      <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-(--ink-500)">
          {copy.billingLabel}
        </div>
        <h1 className="text-2xl font-semibold text-(--ink-900)">
          {loading
            ? isArabic
              ? `${copy.prepareCheckout} ${planLabel}`
              : `${copy.prepareCheckout} ${planLabel} ${copy.checkoutSuffix}`
            : copy.checkoutError}
        </h1>
        <p className="text-sm text-(--ink-600)">
          {loading ? copy.redirecting : errorMessage}
        </p>
      </div>
    </AuthGuard>
  );
}

