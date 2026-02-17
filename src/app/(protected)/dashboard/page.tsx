// app/dashboard/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { formatAccountType } from "@/lib/accountTypes";
import { useLocale } from "@/components/providers/LocaleProvider";
import { getSiteContent } from "@/lib/siteContent";
import { supabase } from "@/lib/supabaseClient";

type Profile = {
  full_name: string | null;
  account_type: string | null;
  created_at: string | null;
};

type InterviewSummary = {
  id: string;
  role: string;
  date: string;
  score: string;
  reportStatus: string;
};

type Recommendation = {
  title: string;
  description: string;
  tag: string;
};

export default function DashboardPage() {
  const { locale } = useLocale();
  const content = getSiteContent(locale);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isArabic = locale === "ar";
  const copy = {
    loadError: isArabic ? "تعذر تحميل تفاصيل الحساب." : "Unable to load your account details.",
    memberSince: isArabic ? "عضو منذ" : "Member since",
    score: isArabic ? "النتيجة" : "Score",
  };

  const formatShortDate = (isoDate: string) =>
    new Date(isoDate).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

  const progressSummary = useMemo(
    () => [
      {
        label: isArabic ? "المقابلات المكتملة" : "Interviews completed",
        value: "12",
        caption: isArabic ? "3 جديدة هذا الشهر" : "3 new this month",
      },
      {
        label: isArabic ? "تقييم الأداء" : "Performance evaluation",
        value: "82/100",
        caption: isArabic ? "تحسن مستمر" : "Consistent improvement",
      },
      {
        label: isArabic ? "جودة السيرة الذاتية" : "Resume quality",
        value: "4.2/5",
        caption: isArabic ? "سرد قوي" : "Strong storytelling",
      },
    ],
    [isArabic],
  );

  const previousInterviews: InterviewSummary[] = [
    {
      id: "INT-204",
      role: isArabic ? "مصمم منتجات" : "Product Designer",
      date: formatShortDate("2026-01-28"),
      score: "86",
      reportStatus: isArabic ? "التقرير جاهز" : "Report ready",
    },
    {
      id: "INT-203",
      role: isArabic ? "مهندس واجهات أمامية" : "Frontend Engineer",
      date: formatShortDate("2026-01-22"),
      score: "79",
      reportStatus: isArabic ? "التقرير جاهز" : "Report ready",
    },
    {
      id: "INT-199",
      role: isArabic ? "نجاح العملاء" : "Customer Success",
      date: formatShortDate("2026-01-12"),
      score: "83",
      reportStatus: isArabic ? "ملخص فقط" : "Highlights only",
    },
  ];

  const recommendations: Recommendation[] = useMemo(
    () => [
      {
        title: isArabic
          ? "إجابة: صف موقفًا حليت فيه خلافًا"
          : "Answer: Describe a time you resolved a conflict",
        description: isArabic
          ? "استخدم إطار STAR وركّز على النتيجة خلال 60 ثانية."
          : "Use STAR framing and emphasize the outcome in 60 seconds.",
        tag: isArabic ? "سلوكي" : "Behavioral",
      },
      {
        title: isArabic
          ? "تمرين: شدّد ملخص السيرة الذاتية"
          : "Exercise: Tighten your resume summary",
        description: isArabic
          ? "أعد كتابة أول 3 أسطر لإبراز أثر قابل للقياس."
          : "Rewrite the top 3 lines to highlight measurable impact.",
        tag: isArabic ? "السيرة الذاتية" : "Resume",
      },
      {
        title: isArabic
          ? "سؤال: حدّثني عن مشروع حديث تفتخر به"
          : "Question: Walk me through a recent project",
        description: isArabic
          ? "ركّز على المشكلة والمنهج والنتائج والدروس المستفادة."
          : "Focus on problem, approach, results, and lessons learned.",
        tag: isArabic ? "السرد القصصي" : "Storytelling",
      },
    ],
    [isArabic],
  );

  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (!active) return;

      if (userError) {
        setErrorMessage(copy.loadError);
        setLoading(false);
        return;
      }

      if (!user) {
        setLoading(false);
        return;
      }

      setUserEmail(user.email ?? null);

      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, account_type, created_at")
        .eq("id", user.id)
        .single();

      if (!active) return;

      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }

      setProfile(data);
      setLoading(false);
    };

    loadProfile();

    return () => {
      active = false;
    };
  }, []);

  const createdAt = useMemo(() => {
    if (!profile?.created_at) {
      return "—";
    }
    return new Date(profile.created_at).toLocaleDateString(
      locale === "ar" ? "ar-EG" : "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    );
  }, [locale, profile?.created_at]);

  if (loading) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
        {isArabic ? "جارٍ تحميل لوحة التحكم..." : "Loading dashboard..."}
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-sm text-red-700">
        {errorMessage}
      </div>
    );
  }

  const displayName = profile?.full_name?.trim() || (isArabic ? "عضو wzzfny" : "wzzfny member");
  const accountLabel = profile
    ? formatAccountType(profile.account_type, locale)
    : isArabic
      ? "زائر"
      : "Guest";
  const emailLabel = userEmail ?? (isArabic ? "وضع الوصول العام" : "Public access mode");

  return (
    <div className="mx-auto mt-8 max-w-5xl space-y-8">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              {isArabic ? "مرحبًا بعودتك" : "Welcome back"}
            </p>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">
              {isArabic ? "مرحبًا بعودتك" : "Welcome back"} {displayName}
            </h1>
            <div className="mt-2 flex flex-wrap gap-3 text-sm text-slate-600">
              <span>{emailLabel}</span>
              <span className="hidden sm:inline">•</span>
              <span>{accountLabel}</span>
              <span className="hidden sm:inline">•</span>
              <span>
                {copy.memberSince} {createdAt}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/interview-setup"
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              {isArabic ? "ابدأ مقابلة جديدة" : "Start a new interview"}
            </Link>
            <Link
              href="/resume"
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300"
            >
              {isArabic ? "رفع السيرة الذاتية" : "Upload resume"}
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {progressSummary.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              {item.label}
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {item.value}
            </p>
            <p className="mt-1 text-sm text-slate-500">{item.caption}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {isArabic ? "المقابلات السابقة" : "Previous interviews"}
              </h2>
              <p className="text-sm text-slate-500">
                {isArabic
                  ? "راجع الجلسات السابقة والتقارير المرتبطة."
                  : "Review past sessions and associated reports."}
              </p>
            </div>
            <button
              type="button"
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:border-slate-300"
            >
              {isArabic ? "عرض الكل" : "View all"}
            </button>
          </div>
          <div className="mt-4 space-y-3">
            {previousInterviews.map((interview) => (
              <div
                key={interview.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-100 bg-slate-50 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {interview.role}
                  </p>
                  <p className="text-xs text-slate-500">
                    {interview.id} • {interview.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">
                    {copy.score} {interview.score}
                  </p>
                  <p className="text-xs text-slate-500">
                    {interview.reportStatus}
                  </p>
                </div>
                <button
                  type="button"
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-slate-300"
                >
                  {isArabic ? "عرض التقرير" : "View report"}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              {isArabic ? "تحليل السيرة الذاتية" : "Resume analysis"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {isArabic
                ? "حمّل سيرتك الذاتية للحصول على تقييم واقتراحات تحسين."
                : "Upload your resume for quality scoring and improvement suggestions."}
            </p>
            <div className="mt-4 space-y-3">
              <input
                type="file"
                className="w-full rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500"
              />
              <button
                type="button"
                className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                {isArabic ? "رفع السيرة للتحليل" : "Upload resume for analysis"}
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              {isArabic ? "توصيات تدريب مخصصة" : "Personalized training recommendations"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {isArabic
                ? "ركّز على الأسئلة والتمارين الأعلى تأثيرًا."
                : "Focus on the highest-impact questions and exercises."}
            </p>
            <div className="mt-4 space-y-4">
              {recommendations.map((rec) => (
                <div key={rec.title} className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-900">
                      {rec.title}
                    </p>
                    <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-600">
                      {rec.tag}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{rec.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {isArabic ? "الخطط" : "Plans"}
            </h2>
            <p className="text-sm text-slate-500">
              {isArabic
                ? "نفس الخطط والمزايا الموجودة في صفحة الأسعار."
                : "Same plans and features as the pricing page."}
            </p>
          </div>
          <Link
            href="/settings"
            className="text-sm font-semibold text-slate-700 hover:text-slate-900"
          >
            {isArabic ? "إدارة الفوترة" : "Manage billing"}
          </Link>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {content.pricing.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-lg border px-4 py-4 ${
                plan.highlighted
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-900"
              }`}
            >
              {plan.highlighted ? (
                <span className="inline-flex rounded-full bg-amber-400 px-2 py-0.5 text-xs font-semibold text-slate-900">
                  {isArabic ? "الأكثر شعبية" : "Most Popular"}
                </span>
              ) : null}
              <h3 className="mt-2 text-lg font-semibold">{plan.name}</h3>
              <p className="mt-1 text-sm opacity-80">{plan.description}</p>
              <div className="mt-3 text-2xl font-semibold">
                {plan.price}
                <span className="text-sm font-normal opacity-80">
                  /{plan.period}
                </span>
              </div>
              {plan.secondaryPrice && plan.secondaryPeriod ? (
                <div className="mt-1 text-sm opacity-80">
                  {isArabic ? "أو" : "or"} {plan.secondaryPrice} / {plan.secondaryPeriod}
                </div>
              ) : null}
              <ul className="mt-3 space-y-2 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

