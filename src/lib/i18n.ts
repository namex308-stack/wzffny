export const LOCALES = ["en", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "interviewly_locale";

export const isLocale = (value: string | null | undefined): value is Locale =>
  typeof value === "string" && (LOCALES as readonly string[]).includes(value);
