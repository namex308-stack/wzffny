"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { useLocale } from "@/components/providers/LocaleProvider";
import { AUTH_DISABLED } from "@/lib/authConfig";

export default function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  const copy = {
    workspace: isArabic ? "تنقل مساحة العمل" : "Workspace navigation",
    dashboard: isArabic ? "لوحة التحكم" : "Dashboard",
    interviewSetup: isArabic ? "إعداد المقابلة" : "Interview setup",
    interview: isArabic ? "المقابلة" : "Interview",
    interviewAnalysis: isArabic ? "تحليل المقابلة" : "Interview analysis",
    resume: isArabic ? "السيرة الذاتية" : "Resume",
    settings: isArabic ? "الإعدادات" : "Settings",
    authDisabled: isArabic ? "تعطيل تسجيل الدخول" : "Auth disabled",
  };
  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(`${href}/`);

  const navItemClass = (href: string) =>
    `flex items-center justify-between rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
      isActive(href)
        ? "border-[color:var(--brand-100)] bg-[color:var(--brand-50)] text-[color:var(--brand-700)]"
        : "border-[color:var(--border)] text-[color:var(--ink-700)] hover:border-[color:var(--brand-100)] hover:text-[color:var(--ink-900)]"
    }`;

  const pageTitle = () => {
    if (pathname?.startsWith("/interview-setup")) return copy.interviewSetup;
    if (pathname?.startsWith("/interview-analysis")) return copy.interviewAnalysis;
    if (pathname?.startsWith("/interview")) return copy.interview;
    if (pathname?.startsWith("/resume")) return copy.resume;
    if (pathname?.startsWith("/settings")) return copy.settings;
    return copy.dashboard;
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-(--surface) text-(--ink-900)">
        <div className="flex min-h-screen">
          <aside className="hidden w-64 flex-col border-r border-(--border) bg-white/80 px-6 py-8 lg:flex">
            <div>
              <Link href="/" className="font-display text-2xl text-(--ink-900)">
                wzzfny
              </Link>
              <p className="mt-2 text-sm text-(--ink-500)">
                {copy.workspace}
              </p>
            </div>
            <nav className="mt-10 space-y-2 text-sm">
              <Link
                href="/dashboard"
                className={navItemClass("/dashboard")}
                aria-current={isActive("/dashboard") ? "page" : undefined}
              >
                {copy.dashboard}
              </Link>
              <Link
                href="/interview-setup"
                className={navItemClass("/interview-setup")}
                aria-current={isActive("/interview-setup") ? "page" : undefined}
              >
                {copy.interviewSetup}
              </Link>
              <Link
                href="/interview"
                className={navItemClass("/interview")}
                aria-current={isActive("/interview") ? "page" : undefined}
              >
                {copy.interview}
              </Link>
              <Link
                href="/interview-analysis"
                className={navItemClass("/interview-analysis")}
                aria-current={isActive("/interview-analysis") ? "page" : undefined}
              >
                {copy.interviewAnalysis}
              </Link>
              <Link
                href="/resume"
                className={navItemClass("/resume")}
                aria-current={isActive("/resume") ? "page" : undefined}
              >
                {copy.resume}
              </Link>
              <Link
                href="/settings"
                className={navItemClass("/settings")}
                aria-current={isActive("/settings") ? "page" : undefined}
              >
                {copy.settings}
              </Link>
            </nav>
          </aside>
          <div className="flex flex-1 flex-col">
            <header className="flex flex-wrap items-center justify-between gap-4 border-b border-(--border) bg-white/90 px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-(--ink-500)">
                  wzzfny
                </p>
                <h2 className="mt-1 font-display text-2xl text-(--ink-900)">
                  {pageTitle()}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <LanguageToggle />
                {AUTH_DISABLED ? (
                  <span className="rounded-full border border-(--border) px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-(--ink-500)">
                    {copy.authDisabled}
                  </span>
                ) : (
                  <SignOutButton />
                )}
              </div>
            </header>
            <main className="flex-1 px-6 py-8 lg:px-10">{children}</main>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

