import type { Locale } from "@/lib/i18n";

export const AUTH_DISABLED = false;
export const AUTH_DISABLED_MESSAGE =
  "Authentication is temporarily disabled. Please use the dashboard directly.";
export const AUTH_DISABLED_MESSAGE_AR =
  "تم تعطيل تسجيل الدخول مؤقتًا. يرجى استخدام لوحة التحكم مباشرةً.";

export const getAuthDisabledMessage = (locale: Locale = "en") =>
  locale === "ar" ? AUTH_DISABLED_MESSAGE_AR : AUTH_DISABLED_MESSAGE;
