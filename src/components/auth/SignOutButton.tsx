"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useLocale } from "@/components/providers/LocaleProvider";

export function SignOutButton() {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);
  const { locale } = useLocale();
  const copy =
    locale === "ar"
      ? { signingOut: "جارٍ تسجيل الخروج...", signOut: "تسجيل الخروج" }
      : { signingOut: "Signing out...", signOut: "Sign out" };

  const handleSignOut = async () => {
    setSigningOut(true);
    await supabase.auth.signOut();
    router.replace("/login");
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={signingOut}
      className="inline-flex items-center gap-2 rounded-lg border border-[color:var(--border)] px-4 py-2 text-sm font-semibold text-[color:var(--ink-700)] transition-colors hover:border-[color:var(--brand-200)] hover:text-[color:var(--ink-900)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-200)] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {signingOut ? copy.signingOut : copy.signOut}
    </button>
  );
}
