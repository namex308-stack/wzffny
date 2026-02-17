"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { useLocale } from "@/components/providers/LocaleProvider";
import { getAccountTypeOptions, type AccountType } from "@/lib/accountTypes";
import { AUTH_DISABLED, getAuthDisabledMessage } from "@/lib/authConfig";
import { normalizePlanId } from "@/lib/billing";
import { supabase } from "@/lib/supabaseClient";

const DEFAULT_REDIRECT = "/dashboard";

export default function SignupPage() {
  const router = useRouter();
  const { locale } = useLocale();
  const authDisabledMessage = getAuthDisabledMessage(locale);
  const copy =
    locale === "ar"
      ? {
          title: "أنشئ حسابك في wzzfny",
          subtitle: "اضبط ملفك حتى نخصص خطة التدريب لك.",
          fullName: "الاسم الكامل",
          email: "البريد الإلكتروني",
          password: "كلمة المرور",
          accountType: "نوع الحساب",
          signup: "إنشاء حساب",
          creating: "جارٍ الإنشاء...",
          signupDisabled: "تعطيل التسجيل",
          already: "لديك حساب بالفعل؟",
          login: "تسجيل الدخول",
          goToDashboard: "اذهب إلى لوحة التحكم",
          activation: "تم تفعيل حسابك. جارٍ تحويلك إلى لوحة التحكم...",
          checkoutRedirect: "تم إنشاء الحساب. جارٍ تحويلك إلى صفحة الدفع...",
          fullNameRequired: "الاسم الكامل مطلوب.",
          emailRequired: "البريد الإلكتروني مطلوب.",
        }
      : {
          title: "Create your wzzfny account",
          subtitle: "Set up your profile so we can personalize your practice plan.",
          fullName: "Full name",
          email: "Email",
          password: "Password",
          accountType: "Account type",
          signup: "Sign Up",
          creating: "Creating...",
          signupDisabled: "Sign up disabled",
          already: "Already have an account?",
          login: "Login",
          goToDashboard: "Go to dashboard",
          activation: "Your account is activated. Redirecting you to your dashboard...",
          checkoutRedirect: "Account created. Redirecting to secure checkout...",
          fullNameRequired: "Full name is required.",
          emailRequired: "Email address is required.",
        };
  const searchParams = useSearchParams();
  const planId = useMemo(
    () => normalizePlanId(searchParams.get("plan")),
    [searchParams],
  );
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState<AccountType>("job_seeker");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activationMessage, setActivationMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const authDisabled = AUTH_DISABLED;

  const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        if (planId && planId !== "free") {
          router.replace(`/checkout?plan=${planId}`);
        } else {
          router.replace(DEFAULT_REDIRECT);
        }
      }
    });
  }, [planId, router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (authDisabled) {
      setErrorMessage(authDisabledMessage);
      return;
    }
    setErrorMessage(null);
    setActivationMessage(null);
    setLoading(true);

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setErrorMessage(copy.fullNameRequired);
      setLoading(false);
      return;
    }

    if (!trimmedEmail) {
      setErrorMessage(copy.emailRequired);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: trimmedEmail,
      password,
      options: {
        data: {
          full_name: trimmedName,
          account_type: accountType,
        },
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      const { error: profileError } = await supabase
        .from("profiles")
        .upsert(
          [
            {
              id: data.user.id,
              full_name: trimmedName,
              account_type: accountType,
              created_at: data.user.created_at ?? new Date().toISOString(),
            },
          ],
          { onConflict: "id" },
        );

      if (profileError) {
        setErrorMessage(profileError.message);
        setLoading(false);
        return;
      }

      if (planId && planId !== "free") {
        setActivationMessage(copy.checkoutRedirect);
        await pause(900);
        router.replace(`/checkout?plan=${planId}`);
        return;
      }

      const accessToken =
        data.session?.access_token ??
        (await supabase.auth.getSession()).data.session?.access_token;

      if (accessToken) {
        await fetch("/api/subscriptions/activate-free", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      }

      setActivationMessage(copy.activation);
      await pause(900);
      router.replace(DEFAULT_REDIRECT);
    }

    setLoading(false);
  };

  return (
    <AuthShell title={copy.title} subtitle={copy.subtitle}>
      {authDisabled ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {authDisabledMessage}{" "}
          <Link
            href="/dashboard"
            className="font-semibold text-amber-900 hover:text-amber-700"
          >
            {copy.goToDashboard}
          </Link>
        </div>
      ) : null}

      {activationMessage ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {activationMessage}
        </div>
      ) : null}

      <form className="mt-5 space-y-5" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="full-name"
            className="text-sm font-semibold text-(--ink-700)"
          >
            {copy.fullName}
          </label>
          <input
            id="full-name"
            name="full-name"
            type="text"
            autoComplete="name"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            disabled={authDisabled}
            required
            className="mt-2 w-full rounded-lg border border-(--border) bg-white px-3 py-2.5 text-sm text-(--ink-900) shadow-sm focus:border-(--brand-600) focus:outline-none focus:ring-2 focus:ring-(--brand-100) disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-(--ink-500)"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="text-sm font-semibold text-(--ink-700)"
          >
            {copy.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={authDisabled}
            required
            className="mt-2 w-full rounded-lg border border-(--border) bg-white px-3 py-2.5 text-sm text-(--ink-900) shadow-sm focus:border-(--brand-600) focus:outline-none focus:ring-2 focus:ring-(--brand-100) disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-(--ink-500)"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="text-sm font-semibold text-(--ink-700)"
          >
            {copy.password}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={authDisabled}
            required
            className="mt-2 w-full rounded-lg border border-(--border) bg-white px-3 py-2.5 text-sm text-(--ink-900) shadow-sm focus:border-(--brand-600) focus:outline-none focus:ring-2 focus:ring-(--brand-100) disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-(--ink-500)"
          />
        </div>

        <div>
          <label
            htmlFor="account-type"
            className="text-sm font-semibold text-(--ink-700)"
          >
            {copy.accountType}
          </label>
          <select
            id="account-type"
            name="account-type"
            value={accountType}
            onChange={(event) =>
              setAccountType(event.target.value as AccountType)
            }
            disabled={authDisabled}
            className="mt-2 w-full rounded-lg border border-(--border) bg-white px-3 py-2.5 text-sm text-(--ink-900) shadow-sm focus:border-(--brand-600) focus:outline-none focus:ring-2 focus:ring-(--brand-100) disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-(--ink-500)"
          >
            {getAccountTypeOptions(locale).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {errorMessage ? (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {errorMessage}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={loading || authDisabled}
          className="w-full rounded-lg bg-(--brand-600) px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-(--brand-700) focus:outline-none focus:ring-2 focus:ring-(--brand-100) disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600"
        >
          {authDisabled
            ? copy.signupDisabled
            : loading
              ? copy.creating
              : copy.signup}
        </button>
      </form>

      <div className="mt-6 border-t border-(--border) pt-4 text-sm text-(--ink-700)">
        {copy.already}{" "}
        <Link
          href="/login"
          className="font-semibold text-(--brand-700) hover:text-(--brand-600)"
        >
          {copy.login}
        </Link>
      </div>
    </AuthShell>
  );
}

