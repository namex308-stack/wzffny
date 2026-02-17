// app/(protected)/settings/page.tsx
"use client";

import { useState } from "react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { getSiteContent } from "@/lib/siteContent";

export default function SettingsPage() {
  const { locale } = useLocale();
  const content = getSiteContent(locale);
  const isArabic = locale === "ar";
  const copy = {
    settings: isArabic ? "الإعدادات" : "Settings",
    title: isArabic ? "إعدادات wzzfny" : "wzzfny settings",
    subtitle: isArabic
      ? "أدر ملفك وتفضيلاتك والفوترة في مكان واحد."
      : "Manage your profile, preferences, and billing in one place.",
    account: isArabic ? "الحساب" : "Account",
    active: isArabic ? "نشط" : "Active",
    fullName: isArabic ? "الاسم الكامل" : "Full name",
    email: isArabic ? "البريد الإلكتروني" : "Email address",
    saveChanges: isArabic ? "حفظ تغييرات الملف" : "Save profile changes",
    changePassword: isArabic ? "تحديث كلمة المرور" : "Update password",
    logout: isArabic ? "تسجيل الخروج" : "Sign out",
    appearance: isArabic ? "المظهر" : "Appearance",
    darkMode: isArabic ? "الوضع الداكن" : "Dark mode",
    interfaceLanguage: isArabic ? "لغة التطبيق" : "App language",
    notifications: isArabic ? "الإشعارات" : "Notifications",
    emailAlerts: isArabic ? "إشعارات البريد الإلكتروني" : "Email notifications",
    emailAlertsHint: isArabic
      ? "ملخصات تقدم أسبوعية وتذكيرات بالمقابلات وتحديثات التقارير."
      : "Weekly progress summaries, interview reminders, and report updates.",
    browserAlerts: isArabic ? "إشعارات المتصفح" : "Browser notifications",
    browserAlertsHint: isArabic
      ? "تنبيهات التوقيت داخل الجلسة وتذكيرات المتابعة."
      : "In-session timing cues and follow-up reminders.",
    support: isArabic ? "الدعم" : "Support",
    helpCenter: isArabic ? "مركز المساعدة" : "Help Center",
    contactTeam: isArabic ? "تواصل مع الدعم" : "Contact Support",
    privacyPolicy: isArabic ? "سياسة الخصوصية" : "Privacy Policy",
    subscription: isArabic ? "الاشتراك" : "Subscription",
    subscriptionHint: isArabic
      ? "إدارة خطتك والفوترة والفواتير."
      : "Manage your plan, billing, and invoices.",
    currentPlan: isArabic ? "الخطة الحالية" : "Current plan",
    renewsOn: isArabic ? "يتجدد في" : "Renews on",
    changePlan: isArabic ? "تغيير الخطة" : "Change plan",
    cancelSubscription: isArabic ? "إلغاء الخطة" : "Cancel plan",
    billingHistory: isArabic ? "سجل الفواتير" : "Billing history",
    advancedAccount: isArabic ? "الحساب المتقدم" : "Advanced account",
    advancedHint: isArabic
      ? "صدّر بياناتك أو احذف حسابك."
      : "Export your data or delete your account.",
    exportData: isArabic ? "تصدير البيانات" : "Export data",
    deleteAccount: isArabic ? "حذف الحساب" : "Delete account",
    mostPopular: isArabic ? "الأكثر شعبية" : "Most Popular",
    currentPlanLabel: isArabic ? "الخطة الحالية" : "Current plan",
    selectPlan: isArabic ? "اختيار الخطة" : "Choose plan",
    monthly: isArabic ? "شهري" : "Monthly",
  };

  const languages = isArabic
    ? ["العربية", "الإنجليزية", "الفرنسية", "الإسبانية"]
    : ["English", "Arabic", "French", "Spanish"];
  const [name, setName] = useState(isArabic ? "عضو wzzfny" : "wzzfny Member");
  const [email, setEmail] = useState("member@wzzfny.ai");
  const [language, setLanguage] = useState(languages[0]);
  const [darkMode, setDarkMode] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [browserAlerts, setBrowserAlerts] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<"free" | "paid">("paid");
  const planDetails =
    content.pricing.find((plan) => plan.id === currentPlan) ?? content.pricing[0];
  const formatDate = (isoDate: string, options?: Intl.DateTimeFormatOptions) =>
    new Date(isoDate).toLocaleDateString(
      isArabic ? "ar-EG" : "en-US",
      options ?? { year: "numeric", month: "short", day: "2-digit" },
    );
  const paidPlanName =
    content.pricing.find((plan) => plan.id === "paid")?.name ?? (isArabic ? "مدفوع" : "Paid");
  const billingHistory = [
    { date: formatDate("2026-02-02"), amount: "$10", plan: paidPlanName, period: copy.monthly },
    { date: formatDate("2026-01-02"), amount: "$10", plan: paidPlanName, period: copy.monthly },
    { date: formatDate("2025-12-02"), amount: "$10", plan: paidPlanName, period: copy.monthly },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <section className="rounded-2xl border border-(--border) bg-white/95 p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-(--ink-500)">
          {copy.settings}
        </p>
        <h1 className="mt-3 font-display text-3xl text-(--ink-900)">
          {copy.title}
        </h1>
        <p className="mt-2 text-sm text-(--ink-700)">
          {copy.subtitle}
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-(--border) bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-(--ink-900)">
                {copy.account}
              </h2>
              <span className="rounded-full bg-(--brand-50) px-3 py-1 text-xs font-semibold text-(--brand-700)">
                {copy.active}
              </span>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-(--ink-700)">
                  {copy.fullName}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-2 w-full rounded-lg border border-(--border) bg-white px-3 py-2.5 text-sm text-(--ink-900) shadow-sm focus:border-(--brand-600) focus:outline-none focus:ring-2 focus:ring-(--brand-100)"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-(--ink-700)">
                  {copy.email}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-2 w-full rounded-lg border border-(--border) bg-white px-3 py-2.5 text-sm text-(--ink-900) shadow-sm focus:border-(--brand-600) focus:outline-none focus:ring-2 focus:ring-(--brand-100)"
                />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-lg bg-(--brand-600) px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-(--brand-700)"
              >
                {copy.saveChanges}
              </button>
              <button
                type="button"
                className="rounded-lg border border-(--border) px-4 py-2 text-sm font-semibold text-(--ink-700) shadow-sm transition hover:border-(--brand-200)"
              >
                {copy.changePassword}
              </button>
              <button
                type="button"
                className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 shadow-sm transition hover:border-red-300"
              >
                {copy.logout}
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-(--border) bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-(--ink-900)">
              {copy.appearance}
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="flex items-center justify-between rounded-lg border border-(--border) px-4 py-3 text-sm text-(--ink-700)">
                <span>{copy.darkMode}</span>
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(event) => setDarkMode(event.target.checked)}
                  className="h-4 w-4 rounded border-(--border) text-(--brand-600) focus:ring-(--brand-100)"
                />
              </label>
              <div>
                <label className="text-sm font-semibold text-(--ink-700)">
                  {copy.interfaceLanguage}
                </label>
                <select
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                  className="mt-2 w-full rounded-lg border border-(--border) bg-white px-3 py-2.5 text-sm text-(--ink-900) shadow-sm focus:border-(--brand-600) focus:outline-none focus:ring-2 focus:ring-(--brand-100)"
                >
                  {languages.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-(--border) bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-(--ink-900)">
              {copy.notifications}
            </h2>
            <div className="mt-4 space-y-3 text-sm text-(--ink-700)">
              <label className="flex items-center justify-between rounded-lg border border-(--border) px-4 py-3">
                <div>
                  <p className="font-semibold text-(--ink-900)">
                    {copy.emailAlerts}
                  </p>
                  <p className="text-xs text-(--ink-500)">
                    {copy.emailAlertsHint}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(event) => setEmailAlerts(event.target.checked)}
                  className="h-4 w-4 rounded border-(--border) text-(--brand-600) focus:ring-(--brand-100)"
                />
              </label>
              <label className="flex items-center justify-between rounded-lg border border-(--border) px-4 py-3">
                <div>
                  <p className="font-semibold text-(--ink-900)">
                    {copy.browserAlerts}
                  </p>
                  <p className="text-xs text-(--ink-500)">
                    {copy.browserAlertsHint}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={browserAlerts}
                  onChange={(event) => setBrowserAlerts(event.target.checked)}
                  className="h-4 w-4 rounded border-(--border) text-(--brand-600) focus:ring-(--brand-100)"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-(--border) bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-(--ink-900)">
              {copy.subscription}
            </h2>
            <p className="mt-1 text-sm text-(--ink-500)">
              {copy.subscriptionHint}
            </p>
            <div className="mt-4 rounded-lg border border-(--border) bg-(--brand-50)/40 px-4 py-4 text-sm text-(--ink-700)">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--ink-500)">
                {copy.currentPlan}
              </p>
              <p className="mt-2 text-lg font-semibold text-(--ink-900)">
                {planDetails.name} — {planDetails.price} / {planDetails.period}
              </p>
              {planDetails.secondaryPrice && planDetails.secondaryPeriod ? (
                <p className="mt-1 text-xs text-(--ink-500)">
                  {isArabic ? "أو" : "or"} {planDetails.secondaryPrice} / {planDetails.secondaryPeriod}
                </p>
              ) : null}
              <p className="mt-1 text-xs text-(--ink-500)">
                {copy.renewsOn} {formatDate("2026-03-02", { year: "numeric", month: "short", day: "2-digit" })}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="rounded-lg bg-(--brand-600) px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-(--brand-700)"
                >
                  {copy.changePlan}
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-(--border) px-4 py-2 text-sm font-semibold text-(--ink-700) shadow-sm transition hover:border-(--brand-200)"
                >
                  {copy.cancelSubscription}
                </button>
              </div>
            </div>

            <div className="mt-4 grid gap-4">
              {content.pricing.map((plan) => (
                <div
                  key={plan.id}
                  className={`rounded-lg border px-4 py-4 text-sm ${
                    plan.highlighted
                      ? "border-(--brand-200) bg-(--brand-50)/70"
                      : "border-(--border) bg-white"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-(--ink-900)">
                        {plan.name}
                      </p>
                      <p className="text-xs text-(--ink-500)">
                        {plan.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-(--ink-900)">
                        {plan.price}
                      </p>
                      <p className="text-xs text-(--ink-500)">
                        /{plan.period}
                      </p>
                      {plan.secondaryPrice && plan.secondaryPeriod ? (
                        <p className="text-xs text-(--ink-500)">
                          {isArabic ? "أو" : "or"} {plan.secondaryPrice} / {plan.secondaryPeriod}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <ul className="mt-3 space-y-2 text-xs text-(--ink-600)">
                    {plan.features.map((feature) => (
                      <li key={feature}>• {feature}</li>
                    ))}
                  </ul>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-(--brand-700)">
                      {plan.highlighted ? copy.mostPopular : " "}
                    </span>
                    <button
                      type="button"
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold shadow-sm transition ${
                        currentPlan === plan.id
                          ? "bg-(--brand-600) text-white"
                          : "border border-(--border) text-(--ink-700) hover:border-(--brand-200)"
                      }`}
                      onClick={() => setCurrentPlan(plan.id)}
                    >
                      {currentPlan === plan.id
                        ? copy.currentPlanLabel
                        : copy.selectPlan}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-lg border border-(--border) bg-white px-4 py-3 text-sm text-(--ink-700)">
              <p className="font-semibold text-(--ink-900)">
                {copy.billingHistory}
              </p>
              <ul className="mt-3 space-y-2 text-sm text-(--ink-600)">
                {billingHistory.map((item) => (
                  <li key={item.date}>
                    • {item.date} — {item.amount} — {item.plan} ({item.period})
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-(--border) bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-(--ink-900)">
              {copy.support}
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 text-sm text-(--ink-700)">
              <button
                type="button"
                className="rounded-lg border border-(--border) px-4 py-2 text-sm font-semibold text-(--ink-700) shadow-sm transition hover:border-(--brand-200)"
              >
                {copy.helpCenter}
              </button>
              <button
                type="button"
                className="rounded-lg border border-(--border) px-4 py-2 text-sm font-semibold text-(--ink-700) shadow-sm transition hover:border-(--brand-200)"
              >
                {copy.contactTeam}
              </button>
              <button
                type="button"
                className="rounded-lg border border-(--border) px-4 py-2 text-sm font-semibold text-(--ink-700) shadow-sm transition hover:border-(--brand-200)"
              >
                {copy.privacyPolicy}
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-red-700">
              {copy.advancedAccount}
            </h2>
            <p className="mt-1 text-sm text-red-600">
              {copy.advancedHint}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 shadow-sm transition hover:border-red-300"
              >
                {copy.exportData}
              </button>
              <button
                type="button"
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
              >
                {copy.deleteAccount}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

