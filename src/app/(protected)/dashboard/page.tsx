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

type Recommendation = {
  title: string;
  description: string;
  tag: string;
};

type UsageSnapshot = {
  practice_sessions: number;
  video_answers: number;
  resume_uploads: number;
  interviews_completed: number;
  cv_analyses?: number;
  video_analyses?: number;
  resumes_used?: number;
  interviews_used?: number;
  period_start?: string;
  period_end?: string;
  month?: string;
};

type ReportSummary = {
  id: string;
  summary: string | null;
  recommendations: unknown;
  evaluation_ids: string[] | null;
  created_at: string;
};

const currentMonth = new Date().toISOString().slice(0, 7) + "-01";

const isMissingTableError = (message: string | null | undefined, table: string) => {
  if (!message) return false;
  const text = message.toLowerCase();
  const tableName = table.toLowerCase();

  return (
    (text.includes(tableName) || text.includes(`public.${tableName}`)) &&
    (
      text.includes("does not exist") ||
      text.includes("doesn't exist") ||
      text.includes("could not find") ||
      text.includes("not found") ||
      text.includes("schema cache")
    )
  );
};

export default function DashboardPage() {
  const { locale } = useLocale();
  const content = getSiteContent(locale);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [usage, setUsage] = useState<UsageSnapshot | null>(null);
  const [reports, setReports] = useState<ReportSummary[]>([]);
  const [plan, setPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isArabic = locale === "ar";
  const copy = {
    loadError: isArabic ? "تعذر تحميل تفاصيل الحساب." : "Unable to load your account details.",
    memberSince: isArabic ? "عضو منذ" : "Member since",
    score: isArabic ? "الأسئلة المجابة" : "Questions answered",
    noReports: isArabic ? "لا توجد مقابلات بعد. ابدأ أول جلسة." : "No interviews yet. Start your first session.",
    periodLabel: isArabic ? "هذا الشهر" : "This month",
    recommendationsEmpty: isArabic
      ? "سيتم عرض توصيات مخصصة بعد أول تقرير مقابلة."
      : "Personalized recommendations will appear after your first interview report.",
  };

  const formatShortDate = (isoDate: string) =>
    new Date(isoDate).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

  const progressSummary = useMemo(() => {
    const periodSource = usage?.period_start ?? usage?.month ?? null;
    const period =
      usage && periodSource
        ? new Date(periodSource).toLocaleDateString(
            locale === "ar" ? "ar-EG" : "en-US",
            { month: "short", year: "numeric" },
          )
        : copy.periodLabel;

    return [
      {
        label: isArabic ? "المقابلات المكتملة" : "Interviews completed",
        value: usage ? String(usage.interviews_completed) : "0",
        caption: period,
      },
      {
        label: isArabic ? "جلسات التدريب" : "Practice sessions",
        value: usage ? String(usage.practice_sessions) : "0",
        caption: period,
      },
      {
        label: isArabic ? "إجابات الفيديو" : "Video answers saved",
        value: usage ? String(usage.video_answers) : "0",
        caption: period,
      },
    ];
  }, [copy.periodLabel, isArabic, locale, usage]);

  const recommendations: Recommendation[] = useMemo(() => {
    const source = reports.find((r) => Array.isArray(r.recommendations) && r.recommendations.length > 0);
    if (!source || !Array.isArray(source.recommendations)) return [];

    return source.recommendations
      .slice(0, 3)
      .map((item: any, index: number) => {
        if (typeof item === "string") {
          return {
            title: isArabic ? `توصية ${index + 1}` : `Recommendation ${index + 1}`,
            description: item,
            tag: isArabic ? "تقرير" : "Report",
          };
        }

        return {
          title: item.title ?? (isArabic ? `توصية ${index + 1}` : `Recommendation ${index + 1}`),
          description:
            item.description ??
            item.detail ??
            item.text ??
            (isArabic ? "تفاصيل غير متوفرة" : "No details provided"),
          tag: item.tag ?? (isArabic ? "تقرير" : "Report"),
        };
      });
  }, [isArabic, reports]);

  const fetchUsage = async (userId: string): Promise<UsageSnapshot> => {
    const empty: UsageSnapshot = {
      practice_sessions: 0,
      video_answers: 0,
      resume_uploads: 0,
      interviews_completed: 0,
      cv_analyses: 0,
      video_analyses: 0,
      resumes_used: 0,
      interviews_used: 0,
      period_start: currentMonth,
      period_end: currentMonth,
      month: currentMonth,
    };

    const fetchLegacy = async (): Promise<UsageSnapshot> => {
      const { data, error } = await supabase
        .from("usage_counters")
        .select(
          "practice_sessions, video_answers, resume_uploads, interviews_completed, period_start, period_end",
        )
        .eq("user_id", userId)
        .order("period_start", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        if (isMissingTableError(error.message, "usage_counters")) {
          return empty;
        }
        console.warn("Usage error (legacy schema):", error);
        return empty;
      }

      return data
        ? {
            ...empty,
            ...data,
          }
        : empty;
    };

    const { data, error } = await supabase
      .from("usage_counters")
      .select(
        `
          interviews_used,
          resumes_used,
          practice_sessions,
          cv_analyses,
          video_analyses,
          video_answers,
          resume_uploads,
          interviews_completed,
          period_start,
          period_end,
          month
        `,
      )
      .eq("user_id", userId)
      .order("period_start", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      if (isMissingTableError(error.message, "usage_counters")) {
        return empty;
      }
      console.warn("Usage error (new schema):", error);
      return fetchLegacy();
    }

    if (data) {
      return {
        ...empty,
        ...data,
      };
    }

    // No row in new schema; fall back to legacy just in case.
    return fetchLegacy();
  };

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

  useEffect(() => {
    let active = true;

    const loadData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || !active) return;

      const [usageData, reportsRes, planRes] = await Promise.all([
        fetchUsage(user.id),
        supabase
          .from("interview_reports")
          .select("id, summary, recommendations, evaluation_ids, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(5),
        supabase.from("user_plans").select("*").eq("user_id", user.id).maybeSingle(),
      ]);

      if (!active) return;

      if (reportsRes.error) {
        if (isMissingTableError(reportsRes.error.message, "interview_reports")) {
          // Table not yet migrated; keep reports empty but allow dashboard to load.
          setReports([]);
        } else {
          setErrorMessage(reportsRes.error.message);
        }
      } else if (reportsRes.data) {
        setReports(reportsRes.data as ReportSummary[]);
      }

      if (planRes.error) {
        const missingPlanColumn =
          planRes.error.message?.toLowerCase().includes("column") &&
          planRes.error.message?.toLowerCase().includes("plan");
        if (!missingPlanColumn) {
          setErrorMessage(planRes.error.message);
        }

        // Fallback: if older schema lacks plan column, derive plan from latest active subscription.
        const fallback = await supabase
          .from("subscriptions")
          .select("plan")
          .eq("user_id", user.id)
          .eq("status", "active")
          .order("current_period_start", { ascending: false })
          .limit(1)
          .maybeSingle();
        if (fallback.data?.plan) setPlan(fallback.data.plan);
      }

      if (planRes.data && "plan" in planRes.data) {
        // Some Supabase typings return data as a Record<string, unknown>
        setPlan((planRes.data as { plan?: string }).plan ?? null);
      }

      setUsage(usageData);
    };

    loadData();

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
  const planLabel = (() => {
    const map: Record<string, { en: string; ar: string }> = {
      free: { en: "Free", ar: "مجاني" },
      starter_monthly: { en: "Starter (Monthly)", ar: "مبتدئ (شهري)" },
      starter_yearly: { en: "Starter (Yearly)", ar: "مبتدئ (سنوي)" },
      pro_monthly: { en: "Pro (Monthly)", ar: "احترافي (شهري)" },
      pro_yearly: { en: "Pro (Yearly)", ar: "احترافي (سنوي)" },
    };
    if (plan && map[plan]) return isArabic ? map[plan].ar : map[plan].en;
    if (plan) return plan;
    return isArabic ? "خطة غير محددة" : "Plan not set";
  })();
  const emailLabel = userEmail ?? (isArabic ? "وضع الوصول العام" : "Public access mode");
  const introTitle = isArabic
    ? "مرحبًا بك في wzzfny — منصتك للتدريب على المقابلات بالذكاء الاصطناعي."
    : "Welcome to Wzffny — your AI-powered interview training platform.";
  const introNote = isArabic
    ? "أكمل الخطوات بالترتيب للحصول على نتائج دقيقة وموثوقة."
    : "Complete the steps in order for the most accurate and trustworthy results.";
  const onboardingSteps = isArabic
    ? [
        { label: "1️⃣ إعداد المقابلة", body: "أدخل بياناتك الشخصية واختر الدور الوظيفي ليتم تخصيص الأسئلة وفقًا لخلفيتك." },
        { label: "2️⃣ المقابلة", body: "أجب بصدق ووضوح على أسئلة المقابلة الموجهة بالذكاء الاصطناعي. سيتم تحليل إجاباتك من حيث المحتوى والبناء والملاءمة." },
        { label: "3️⃣ تحليل المقابلة", body: "استلم نقاط القوة والجوانب التي تحتاج لتحسين، مع إجابات نموذجية قصيرة لكل سؤال." },
        { label: "4️⃣ السيرة الذاتية", body: "حمّل سيرتك الذاتية لتحصل على تحليل كامل للمهارات والفجوات وتوصيات للتحسين." },
      ]
    : [
        { label: "1️⃣ Interview Setup", body: "Enter your personal details and select your job role so the AI can tailor questions to your background." },
        { label: "2️⃣ Interview", body: "Complete the AI-guided interview. Answer honestly and clearly; responses are analyzed for structure, content, and relevance." },
        { label: "3️⃣ Interview Analysis", body: "Get strengths, improvements, and a concise model answer for each question." },
        { label: "4️⃣ Resume", body: "Upload your CV/resume for a full analysis of skills, gaps, and improvement recommendations." },
      ];

  return (
    <div className="mx-auto mt-8 max-w-5xl space-y-8">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">{introTitle}</p>
            <p className="text-sm text-slate-600">{introNote}</p>
          </div>
          <div className="space-y-3">
            {onboardingSteps.map((step) => (
              <div key={step.label} className="rounded-md border border-slate-100 bg-slate-50 px-4 py-3">
                <p className="text-sm font-semibold text-slate-900">{step.label}</p>
                <p className="text-sm text-slate-600">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
              <span>{planLabel}</span>
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
          {reports.length === 0 ? (
            <p className="text-sm text-slate-500">{copy.noReports}</p>
          ) : (
            reports.map((report) => (
              <div
                key={report.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-100 bg-slate-50 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {isArabic ? "تقرير المقابلة" : "Interview report"}
                  </p>
                  <p className="text-xs text-slate-500">
                    {report.id.slice(0, 8)} • {formatShortDate(report.created_at)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">
                    {copy.score} {report.evaluation_ids?.length ?? 0}
                  </p>
                  <p className="text-xs text-slate-500">
                    {report.summary
                      ? report.summary.slice(0, 72) + (report.summary.length > 72 ? "…" : "")
                      : isArabic
                        ? "ملخص مختصر متاح"
                        : "Summary available"}
                  </p>
                </div>
                <Link
                  href={`/interview-analysis?id=${report.id}`}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-slate-300"
                >
                  {isArabic ? "عرض التقرير" : "View report"}
                </Link>
              </div>
            ))
          )}
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
              {recommendations.length === 0 ? (
                <p className="text-sm text-slate-500">{copy.recommendationsEmpty}</p>
              ) : (
                recommendations.map((rec) => (
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
                ))
              )}
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

