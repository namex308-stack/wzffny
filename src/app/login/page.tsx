"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { useLocale } from "@/components/providers/LocaleProvider";
import { AUTH_DISABLED, getAuthDisabledMessage } from "@/lib/authConfig";
import { supabase } from "@/lib/supabaseClient";

const DEFAULT_REDIRECT = "/dashboard";

export default function LoginPage() {
  const router = useRouter();
  const { locale } = useLocale();
  const authDisabledMessage = getAuthDisabledMessage(locale);
  const copy =
    locale === "ar"
      ? {
          title: "تسجيل الدخول إلى wzzfny",
          subtitle: "ادخل إلى مساحة التدريب وتحليلات الأداء الخاصة بك.",
          email: "البريد الإلكتروني",
          password: "كلمة المرور",
          remember: "تذكرني",
          rememberHelp: "ابقَ مسجلاً على هذا الجهاز.",
          login: "تسجيل الدخول",
          loggingIn: "جارٍ تسجيل الدخول...",
          loginDisabled: "تعطيل تسجيل الدخول",
          show: "إظهار",
          hide: "إخفاء",
          noAccount: "ليس لديك حساب؟",
          createAccount: "أنشئ حسابًا",
          goToDashboard: "اذهب إلى لوحة التحكم",
        }
      : {
          title: "Sign in to wzzfny",
          subtitle: "Access your interview workspace and progress insights.",
          email: "Email",
          password: "Password",
          remember: "Remember me",
          rememberHelp: "Stay signed in on this device.",
          login: "Login",
          loggingIn: "Logging in...",
          loginDisabled: "Login disabled",
          show: "Show",
          hide: "Hide",
          noAccount: "Don't have an account?",
          createAccount: "Create an account",
          goToDashboard: "Go to dashboard",
        };
  const searchParams = useSearchParams();
  const nextPath = useMemo(() => {
    const nextParam = searchParams.get("next");
    if (nextParam && nextParam.startsWith("/")) {
      return nextParam;
    }
    return DEFAULT_REDIRECT;
  }, [searchParams]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const authDisabled = AUTH_DISABLED;

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace(nextPath);
    });
  }, [nextPath, router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (authDisabled) {
      setErrorMessage(authDisabledMessage);
      return;
    }
    setErrorMessage(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    router.replace(nextPath);
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

      <form className="mt-5 space-y-5" onSubmit={handleSubmit}>
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
          <div className="relative mt-2">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={authDisabled}
              required
              className="w-full rounded-lg border border-(--border) bg-white px-3 py-2.5 input-icon-pad text-sm text-(--ink-900) shadow-sm focus:border-(--brand-600) focus:outline-none focus:ring-2 focus:ring-(--brand-100) disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-(--ink-500)"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute top-1/2 flex -translate-y-1/2 items-center gap-1 text-xs font-semibold text-(--ink-600) hover:text-(--ink-900) disabled:cursor-not-allowed disabled:text-(--ink-400) input-icon-button"
              aria-label={showPassword ? copy.hide : copy.show}
              disabled={authDisabled}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              {showPassword ? copy.hide : copy.show}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-(--ink-700)">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              disabled={authDisabled}
              className="h-4 w-4 rounded border-(--border) text-(--brand-600) focus:ring-(--brand-100) disabled:cursor-not-allowed"
            />
            {copy.remember}
          </label>
          <span className="text-xs text-(--ink-500)">
            {copy.rememberHelp}
          </span>
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
            ? copy.loginDisabled
            : loading
              ? copy.loggingIn
              : copy.login}
        </button>
      </form>

      <div className="mt-6 border-t border-(--border) pt-4 text-sm text-(--ink-700)">
        {copy.noAccount}{" "}
        <Link
          href="/signup"
          className="font-semibold text-(--brand-700) hover:text-(--brand-600)"
        >
          {copy.createAccount}
        </Link>
      </div>
    </AuthShell>
  );
}

