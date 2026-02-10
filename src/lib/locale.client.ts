"use client";

import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from "@/lib/i18n";

export const getClientLocale = (): Locale => {
  if (typeof document === "undefined") {
    return DEFAULT_LOCALE;
  }

  const docLang = document.documentElement.lang;
  if (isLocale(docLang)) {
    return docLang;
  }

  const cookieMatch = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${LOCALE_COOKIE}=`));

  if (cookieMatch) {
    const value = cookieMatch.split("=")[1];
    if (isLocale(value)) {
      return value;
    }
  }

  return DEFAULT_LOCALE;
};

export const setClientLocale = (locale: Locale) => {
  if (typeof document === "undefined") {
    return;
  }
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000`;
  document.documentElement.lang = locale;
  document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
};

export const isRtlLocale = (locale: Locale) => locale === "ar";
