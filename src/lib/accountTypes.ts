import type { Locale } from "@/lib/i18n";

export const accountTypeOptionsEn = [
  { value: "student", label: "Student" },
  { value: "professional", label: "Professional" },
  { value: "job_seeker", label: "Job seeker" },
] as const;

export const accountTypeOptionsAr = [
  { value: "student", label: "طالب" },
  { value: "professional", label: "محترف" },
  { value: "job_seeker", label: "باحث عن عمل" },
] as const;

export type AccountType = (typeof accountTypeOptionsEn)[number]["value"];

export const getAccountTypeOptions = (locale: Locale) =>
  locale === "ar" ? accountTypeOptionsAr : accountTypeOptionsEn;

export function formatAccountType(value?: string | null, locale: Locale = "en") {
  const options = getAccountTypeOptions(locale);
  const match = options.find((option) => option.value === value);
  return match?.label ?? (locale === "ar" ? "باحث عن عمل" : "Job seeker");
}
