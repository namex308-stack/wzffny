"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { useLocale } from "@/components/providers/LocaleProvider";
import { supabase } from "@/lib/supabaseClient";

type CheckoutStatus =
  | "checking"
  | "pending"
  | "success"
  | "failed"
  | "timeout"
  | "missing";

const POLL_INTERVAL_MS = 2500;
const MAX_WAIT_MS = 60000;

export default function CheckoutResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  const copy = {
    billingLabel: isArabic ? "فواتير wzzfny" : "wzzfny Billing",
    missingTitle: isArabic ? "بيانات الطلب مفقودة" : "Missing order information",
    missingBody: isArabic
      ? "لم نتمكن من العثور على طلبك. يرجى بدء عملية الدفع مرة أخرى."
      : "We couldn't detect your order. Please start checkout again.",
    failedTitle: isArabic ? "الدفع غير مؤكد" : "Payment not confirmed",
    failedBody: isArabic
      ? "تعذر التحقق من الدفع حتى الآن."
      : "Your payment could not be verified yet.",
    timeoutTitle: isArabic ? "ما زالت المعالجة جارية" : "Still processing",
    timeoutBody: isArabic
      ? "يستغرق الأمر وقتًا أطول من المتوقع. يمكنك التحديث أو المحاولة مرة أخرى."
      : "It is taking longer than expected. You can refresh or try again.",
    successTitle: isArabic ? "تم التحقق من الدفع" : "Payment verified",
    successBody: isArabic ? "جارٍ تحويلك إلى لوحة التحكم." : "Redirecting you to your dashboard.",
    pendingTitle: isArabic ? "جارٍ إنهاء الاشتراك" : "Finalizing your subscription",
    pendingBody: isArabic
      ? "ننتظر تأكيد الدفع من Kashier."
      : "Waiting for payment confirmation from Kashier.",
    verifyingTitle: isArabic ? "جارٍ التحقق من الدفع" : "Verifying payment",
    verifyingBody: isArabic
      ? "يرجى الانتظار بينما نؤكد الدفع."
      : "Please wait while we confirm your payment.",
    tryAgain: isArabic ? "إعادة محاولة الدفع" : "Try checkout again",
    goDashboard: isArabic ? "الانتقال إلى لوحة التحكم" : "Go to dashboard",
    confirmError: isArabic ? "تعذر تأكيد الدفع حتى الآن." : "We couldn't confirm your payment yet.",
  };
  const confirmError = copy.confirmError;
  const orderId = useMemo(
    () => searchParams.get("merchantOrderId") ?? searchParams.get("orderId"),
    [searchParams],
  );
  const [status, setStatus] = useState<CheckoutStatus>("checking");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) {
      setStatus("missing");
      return;
    }

    let active = true;
    let elapsed = 0;

    const pollStatus = async () => {
      const { data, error } = await supabase
        .from("subscriptions")
        .select("status")
        .eq("kashier_order_id", orderId)
        .maybeSingle();

      if (!active) return;

      if (error) {
        setErrorMessage(confirmError);
        setStatus("failed");
        return;
      }

      if (!data) {
        setStatus("pending");
        return;
      }

      if (data.status === "active") {
        setStatus("success");
        router.replace("/dashboard");
        return;
      }

      if (data.status === "failed" || data.status === "canceled") {
        setStatus("failed");
        return;
      }

      setStatus("pending");
    };

    pollStatus();

    const interval = window.setInterval(() => {
      elapsed += POLL_INTERVAL_MS;
      if (elapsed >= MAX_WAIT_MS) {
        setStatus("timeout");
        window.clearInterval(interval);
        return;
      }
      pollStatus();
    }, POLL_INTERVAL_MS);

    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, [confirmError, orderId, router]);

  const content = () => {
    switch (status) {
      case "missing":
        return {
          title: copy.missingTitle,
          body: copy.missingBody,
        };
      case "failed":
        return {
          title: copy.failedTitle,
          body: errorMessage ?? copy.failedBody,
        };
      case "timeout":
        return {
          title: copy.timeoutTitle,
          body: copy.timeoutBody,
        };
      case "success":
        return {
          title: copy.successTitle,
          body: copy.successBody,
        };
      case "pending":
        return {
          title: copy.pendingTitle,
          body: copy.pendingBody,
        };
      default:
        return {
          title: copy.verifyingTitle,
          body: copy.verifyingBody,
        };
    }
  };

  const message = content();

  return (
    <AuthGuard>
      <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-(--ink-500)">
          {copy.billingLabel}
        </div>
        <h1 className="text-2xl font-semibold text-(--ink-900)">
          {message.title}
        </h1>
        <p className="text-sm text-(--ink-600)">{message.body}</p>
        {status === "failed" || status === "timeout" || status === "missing" ? (
          <div className="mt-2 flex flex-wrap justify-center gap-3 text-sm">
            <Link
              href="/#pricing"
              className="rounded-lg bg-(--brand-600) px-4 py-2 text-white shadow-sm transition hover:bg-(--brand-700)"
            >
              {copy.tryAgain}
            </Link>
            <Link
              href="/dashboard"
              className="rounded-lg border border-(--border) px-4 py-2 text-(--ink-700) shadow-sm transition hover:border-(--brand-200)"
            >
              {copy.goDashboard}
            </Link>
          </div>
        ) : null}
      </div>
    </AuthGuard>
  );
}

