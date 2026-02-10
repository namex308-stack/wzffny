"use client";

import { setClientLocale } from "@/lib/locale.client";
import { useLocale } from "@/components/providers/LocaleProvider";
import { type Locale } from "@/lib/i18n";

const labels: Record<Locale, string> = {
  en: "EN",
  ar: "AR",
};

export function LanguageToggle() {
  const { locale, setLocale } = useLocale();

  const toggleLocale = () => {
    const nextLocale: Locale = locale === "ar" ? "en" : "ar";
    setClientLocale(nextLocale);
    setLocale(nextLocale);
    window.location.reload();
  };

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className="inline-flex items-center justify-center rounded-full border border-[color:var(--brand-200)] bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-700)] shadow-sm transition hover:border-[color:var(--brand-600)]"
      aria-label="Toggle language"
    >
      {labels[locale]}
    </button>
  );
}
