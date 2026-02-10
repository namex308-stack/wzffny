"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { useLocale } from "@/components/providers/LocaleProvider";
import { getSiteContent } from "@/lib/siteContent";
import { supabase } from "@/lib/supabaseClient";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const { locale } = useLocale();
  const content = getSiteContent(locale);
  const isArabic = locale === "ar";
  const displayName = useMemo(() => {
    if (!user) return "";
    const metadata = user.user_metadata ?? {};
    const fromMeta =
      (typeof metadata.full_name === "string" && metadata.full_name.trim()) ||
      (typeof metadata.name === "string" && metadata.name.trim());
    if (fromMeta) return fromMeta;
    if (user.email) {
      return user.email.split("@")[0];
    }
    return isArabic ? "عضو" : "Member";
  }, [isArabic, user]);

  useEffect(() => {
    let active = true;

    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!active) return;
      setUser(data.session?.user ?? null);
      setAuthReady(true);
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      setUser(session?.user ?? null);
      setAuthReady(true);
      setSigningOut(false);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    if (signingOut) return;
    setSigningOut(true);
    try {
      await supabase.auth.signOut();
    } finally {
      setSigningOut(false);
    }
  };

  const showLoggedIn = Boolean(user);
  const showLoggedOut = authReady && !user;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <Container>
        <nav className="flex items-center justify-between py-4">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {content.navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageToggle />
            <div
              className={`flex items-center gap-3 transition-opacity ${
                authReady ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              aria-hidden={!authReady}
            >
              {showLoggedIn ? (
                <>
                  <Link
                    href="/settings"
                    className="inline-flex items-center rounded-full border border-[color:var(--border)] px-3 py-1.5 text-sm font-semibold text-[color:var(--ink-700)] shadow-sm transition hover:border-[color:var(--brand-200)] hover:text-[color:var(--ink-900)]"
                  >
                    {displayName}
                  </Link>
                  <Link
                    href="/dashboard"
                    className="rounded-full bg-[color:var(--brand-600)] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[color:var(--brand-700)]"
                  >
                    {content.copy.header.dashboard}
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    disabled={signingOut}
                    className="inline-flex items-center justify-center rounded-full border border-[color:var(--border)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--ink-700)] shadow-sm transition hover:border-[color:var(--brand-200)] hover:text-[color:var(--ink-900)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {signingOut
                      ? isArabic
                        ? "جارٍ تسجيل الخروج..."
                        : "Signing out..."
                      : content.copy.header.signOut}
                  </button>
                </>
              ) : (
                showLoggedOut && (
                  <>
                    <Link
                      href="/login"
                      className="inline-flex items-center justify-center rounded-full border border-[color:var(--brand-200)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--brand-700)] shadow-sm transition hover:border-[color:var(--brand-600)] hover:text-[color:var(--brand-700)]"
                    >
                      {content.copy.header.login}
                    </Link>
                    <Link
                      href="/signup"
                      className="rounded-full bg-[color:var(--brand-600)] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[color:var(--brand-700)]"
                    >
                      {content.copy.header.signup}
                    </Link>
                  </>
                )
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-4">
              {content.navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <hr className="border-gray-100" />
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold">
                  {content.copy.header.languageLabel}
                </span>
                <LanguageToggle />
              </div>
              {showLoggedIn ? (
                <>
                  <div className="flex items-center justify-between rounded-lg border border-[color:var(--border)] px-4 py-2 text-sm font-semibold text-[color:var(--ink-700)]">
                    <span>{displayName}</span>
                    <span className="text-xs text-[color:var(--ink-500)]">
                      {isArabic ? "الحساب" : "Account"}
                    </span>
                  </div>
                  <Link
                    href="/dashboard"
                    className="rounded-lg bg-[color:var(--brand-600)] px-4 py-2 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[color:var(--brand-700)]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {content.copy.header.dashboard}
                  </Link>
                  <button
                    type="button"
                    onClick={async () => {
                      await handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                    disabled={signingOut}
                    className="rounded-lg border border-[color:var(--border)] px-4 py-2 text-center text-sm font-semibold text-[color:var(--ink-700)] shadow-sm transition hover:border-[color:var(--brand-200)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {signingOut
                      ? isArabic
                        ? "جارٍ تسجيل الخروج..."
                        : "Signing out..."
                      : content.copy.header.signOut}
                  </button>
                </>
              ) : (
                showLoggedOut && (
                  <>
                    <Link
                      href="/login"
                      className="rounded-lg border border-[color:var(--brand-200)] px-4 py-2 text-center text-sm font-semibold text-[color:var(--brand-700)] shadow-sm transition hover:border-[color:var(--brand-600)] hover:text-[color:var(--brand-700)]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {content.copy.header.login}
                    </Link>
                    <Link
                      href="/signup"
                      className="rounded-lg bg-[color:var(--brand-600)] px-4 py-2 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[color:var(--brand-700)]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {content.copy.header.signup}
                    </Link>
                  </>
                )
              )}
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
