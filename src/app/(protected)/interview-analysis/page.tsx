import Link from "next/link";
import { getServerLocale } from "@/lib/locale.server";

const strengthsEn = [
  "Structured answers that follow STAR with clear action and result.",
  "Strong role alignment using relevant domain language.",
  "Concise wrap‑ups that highlight impact and next steps.",
];

const strengthsAr = [
  "إجابات منظمة تتبع STAR مع فعل ونتيجة واضحين.",
  "توافق قوي مع الدور المستهدف باستخدام لغة المجال.",
  "خلاصات موجزة تُظهر الأثر والخطوة التالية.",
];

const weaknessesEn = [
  "Eye contact drops during technical deep‑dives.",
  "Some answers lack quantified outcomes (time, cost, revenue).",
  "Filler words increase in longer responses.",
];

const weaknessesAr = [
  "ينخفض التواصل البصري أثناء التعمّق التقني.",
  "بعض الإجابات تفتقد نتائج رقمية (وقت، تكلفة، إيراد).",
  "تزداد كلمات الحشو في الإجابات الطويلة.",
];

const improvementTipsEn = [
  "Open with a one‑sentence outcome, then add context in 10–15 seconds.",
  "Use STAR with one metric and one decision point per answer.",
  "Replace filler words with a 2‑second pause; practice with a timer.",
  "Name stakeholders and collaboration in technical answers.",
  "End with relevance: why this matters for the target role.",
  "Keep answers to 90–120 seconds; add a 20‑second summary at the end.",
];

const improvementTipsAr = [
  "ابدأ بجملة نتيجة واحدة ثم أضف السياق خلال 10–15 ثانية.",
  "استخدم STAR مع مقياس واحد ونقطة قرار واحدة لكل إجابة.",
  "استبدل كلمات الحشو بتوقف لمدة ثانيتين مع مؤقّت تدريب.",
  "اذكر أصحاب المصلحة والتعاون في الإجابات التقنية.",
  "اختم بارتباط الدور: لماذا هذه النتيجة مهمة للوظيفة.",
  "حافظ على 90–120 ثانية للإجابة مع ملخص 20 ثانية في النهاية.",
];

const performanceHistoryData = [
  { date: "2026-01-10", score: 72 },
  { date: "2026-01-18", score: 76 },
  { date: "2026-01-25", score: 81 },
  { date: "2026-02-01", score: 84 },
  { date: "2026-02-05", score: 88 },
];

const videoReviewsEn = [
  {
    question: "Describe a time you solved a difficult problem under pressure.",
    feedback: [
      "Great opening that framed the challenge quickly.",
      "Slow down in the middle to emphasize the decision you made.",
      "Add the final outcome with a specific metric.",
    ],
  },
  {
    question: "Walk me through a recent project you are proud of.",
    feedback: [
      "Strong narrative arc and clear ownership.",
      "Include stakeholders and collaboration highlights.",
      "Wrap up with lessons learned for future projects.",
    ],
  },
];

const videoReviewsAr = [
  {
    question: "صف موقفًا حللت فيه مشكلة صعبة تحت الضغط.",
    feedback: [
      "بداية ممتازة أوضحت التحدي بسرعة.",
      "خفّف السرعة في الوسط لتبرز القرار الذي اتخذته.",
      "أضف النتيجة النهائية مع مؤشر محدد.",
    ],
  },
  {
    question: "حدّثني عن مشروع حديث تفخر به.",
    feedback: [
      "سرد قوي وملكية واضحة.",
      "أدرج أصحاب المصلحة وأبرز التعاون.",
      "اختم بالدروس المستفادة للمشاريع القادمة.",
    ],
  },
];

export default async function InterviewAnalysisPage() {
  const locale = await getServerLocale();
  const isArabic = locale === "ar";
  const copy = {
    label: isArabic ? "تقرير تحليل المقابلة" : "Interview analysis report",
    title: isArabic
      ? "نتائج دقيقة وخطوات واضحة للجلسة القادمة"
      : "Clear results and next steps for your next session",
    subtitle: isArabic
      ? "راجع نقاط القوة ومجالات التحسين وملاحظات الفيديو من جلستك الأخيرة."
      : "Review strengths, improvement areas, and video feedback from your latest session.",
    back: isArabic ? "العودة إلى جلسة المقابلة" : "Back to interview session",
    newInterview: isArabic ? "ابدأ مقابلة تجريبية جديدة" : "Start a new mock interview",
    strengths: isArabic ? "نقاط القوة" : "Strengths",
    weaknesses: isArabic ? "مجالات التحسين" : "Areas to improve",
    overallScore: isArabic ? "التقييم الإجمالي" : "Overall score",
    scoreDelta: isArabic
      ? "زيادة بمقدار 6 نقاط منذ مقابلتك الأخيرة."
      : "Up 6 points since your last interview.",
    scoreBreakdown: isArabic
      ? "الثقة: 84 • الوضوح: 90 • الأثر: 86"
      : "Confidence: 84 • Clarity: 90 • Impact: 86",
    scoreMethod: isArabic
      ? "تقدير النسب يعتمد على متوسط مُرجّح من الوضوح والبنية والأثر وأساليب الإلقاء خلال الجلسة."
      : "Percentages are estimated from a weighted average of clarity, structure, impact, and delivery across the session.",
    bodyAnalysis: isArabic
      ? "تحليل لغة الجسد والصوت"
      : "Body language and voice analysis",
    bodySubtitle: isArabic
      ? "رؤى الذكاء الاصطناعي بناءً على إشارات الفيديو والصوت."
      : "AI insights based on video and audio cues.",
    bodyMethod: isArabic
      ? "مثال حسابي: التواصل البصري = ثواني النظر للكاميرا ÷ إجمالي ثواني الحديث."
      : "Example calculation: Eye contact = seconds looking at camera ÷ total speaking seconds.",
    eyeContact: isArabic ? "التواصل البصري" : "Eye contact",
    eyeContactNote: isArabic
      ? "جيد في البداية ويقل مع الأسئلة المعقّدة."
      : "Strong in openings, drops during complex questions.",
    vocal: isArabic ? "الثقة الصوتية" : "Vocal confidence",
    vocalNote: isArabic
      ? "إيقاع ثابت، وتظهر كلمات حشو عند البحث عن أرقام."
      : "Steady pace, fillers appear when searching for numbers.",
    posture: isArabic ? "الوضعية" : "Posture",
    postureValue: isArabic ? "ثابتة" : "Stable",
    postureNote: isArabic
      ? "حافظ على أكتاف مفتوحة وميول خفيف للأمام عند النقاط المهمة."
      : "Keep open shoulders and lean forward slightly on key points.",
    energy: isArabic ? "الطاقة" : "Energy",
    energyValue: isArabic ? "مستقرة" : "Consistent",
    energyNote: isArabic
      ? "أضف إبرازًا عند النتائج النهائية."
      : "Add emphasis on final outcomes.",
    tips: isArabic ? "نصائح عملية" : "Practical tips",
    tipsSubtitle: isArabic
      ? "ركّز على هذه التحسينات قبل جلستك التالية."
      : "Focus on these improvements before your next session.",
    performance: isArabic ? "تطور الأداء" : "Performance trend",
    performanceSubtitle: isArabic
      ? "تتبّع تطور الدرجة الإجمالية عبر آخر الجلسات."
      : "Track how your overall score changes across recent sessions.",
    lastSessions: isArabic ? "آخر 5 جلسات" : "Last 5 sessions",
    reviewVideo: isArabic ? "مراجعة إجابات الفيديو" : "Review video answers",
    reviewVideoSubtitle: isArabic
      ? "شاهد كل إجابة مع ملاحظات موجهة."
      : "Watch each answer with targeted feedback.",
    uploadVideo: isArabic ? "رفع تسجيل إضافي" : "Upload another recording",
    videoPreview: isArabic ? "معاينة الفيديو" : "Video preview",
    playWithFeedback: isArabic ? "تشغيل مع الملاحظات" : "Play with feedback",
    feedbackHighlights: isArabic ? "أبرز الملاحظات" : "Feedback highlights",
  };

  const strengths = isArabic ? strengthsAr : strengthsEn;
  const weaknesses = isArabic ? weaknessesAr : weaknessesEn;
  const improvementTips = isArabic ? improvementTipsAr : improvementTipsEn;
  const videoReviews = isArabic ? videoReviewsAr : videoReviewsEn;
  const formatShortDate = (isoDate: string) =>
    new Date(isoDate).toLocaleDateString(
      isArabic ? "ar-EG" : "en-US",
      {
        month: "short",
        day: "2-digit",
      },
    );
  const performanceHistory = performanceHistoryData.map((item) => ({
    label: formatShortDate(item.date),
    score: item.score,
  }));

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <section className="rounded-2xl border border-(--border) bg-white/95 p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-(--ink-500)">
              {copy.label}
            </p>
            <h1 className="mt-3 font-display text-3xl text-(--ink-900)">
              {copy.title}
            </h1>
            <p className="mt-2 text-sm text-(--ink-700)">
              {copy.subtitle}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/interview"
              className="rounded-lg border border-(--border) px-4 py-2 text-sm font-semibold text-(--ink-700) shadow-sm transition hover:border-(--brand-200)"
            >
              {copy.back}
            </Link>
            <Link
              href="/interview-setup"
              className="rounded-lg bg-(--brand-600) px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-(--brand-700)"
            >
              {copy.newInterview}
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.7fr)]">
        <div className="rounded-2xl border border-(--border) bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-(--ink-900)">
            {copy.strengths}
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-(--ink-700)">
            {strengths.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-(--brand-600)" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-(--border) bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-(--ink-900)">
            {copy.weaknesses}
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-(--ink-700)">
            {weaknesses.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-red-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-(--border) bg-(--brand-50)/60 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-(--brand-700)">
            {copy.overallScore}
          </p>
          <p className="mt-4 text-4xl font-semibold text-(--ink-900)">88</p>
          <p className="mt-2 text-sm text-(--ink-600)">{copy.scoreDelta}</p>
          <div className="mt-4 rounded-lg border border-(--brand-100) bg-white px-3 py-2 text-sm text-(--ink-700)">
            {copy.scoreBreakdown}
          </div>
          <p className="mt-3 text-xs text-(--ink-500)">
            {copy.scoreMethod}
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="rounded-2xl border border-(--border) bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-(--ink-900)">
            {copy.bodyAnalysis}
          </h2>
          <p className="mt-1 text-sm text-(--ink-500)">
            {copy.bodySubtitle}
          </p>
          <p className="mt-2 text-xs text-(--ink-500)">
            {copy.bodyMethod}
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-(--border) bg-(--brand-50)/50 px-4 py-3 text-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--ink-500)">
                {copy.eyeContact}
              </p>
              <p className="mt-2 text-lg font-semibold text-(--ink-900)">
                78%
              </p>
              <p className="mt-1 text-xs text-(--ink-500)">
                {copy.eyeContactNote}
              </p>
            </div>
            <div className="rounded-lg border border-(--border) bg-(--brand-50)/50 px-4 py-3 text-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--ink-500)">
                {copy.vocal}
              </p>
              <p className="mt-2 text-lg font-semibold text-(--ink-900)">
                85%
              </p>
              <p className="mt-1 text-xs text-(--ink-500)">
                {copy.vocalNote}
              </p>
            </div>
            <div className="rounded-lg border border-(--border) bg-white px-4 py-3 text-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--ink-500)">
                {copy.posture}
              </p>
              <p className="mt-2 text-lg font-semibold text-(--ink-900)">
                {copy.postureValue}
              </p>
              <p className="mt-1 text-xs text-(--ink-500)">
                {copy.postureNote}
              </p>
            </div>
            <div className="rounded-lg border border-(--border) bg-white px-4 py-3 text-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--ink-500)">
                {copy.energy}
              </p>
              <p className="mt-2 text-lg font-semibold text-(--ink-900)">
                {copy.energyValue}
              </p>
              <p className="mt-1 text-xs text-(--ink-500)">
                {copy.energyNote}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-(--border) bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-(--ink-900)">
            {copy.tips}
          </h2>
          <p className="mt-1 text-sm text-(--ink-500)">
            {copy.tipsSubtitle}
          </p>
          <ul className="mt-4 space-y-3 text-sm text-(--ink-700)">
            {improvementTips.map((tip) => (
              <li key={tip} className="rounded-lg border border-(--border) px-4 py-3">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-(--border) bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-(--ink-900)">
              {copy.performance}
            </h2>
            <p className="text-sm text-(--ink-500)">
              {copy.performanceSubtitle}
            </p>
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--ink-500)">
            {copy.lastSessions}
          </span>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-5">
          {performanceHistory.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-3">
              <div className="relative h-32 w-full rounded-full bg-(--brand-50)">
                <div
                  className="absolute bottom-0 left-0 right-0 rounded-full bg-(--brand-600)"
                  style={{ height: `${item.score}%` }}
                />
              </div>
              <div className="text-center text-xs font-semibold text-(--ink-600)">
                {item.label}
              </div>
              <div className="text-sm font-semibold text-(--ink-900)">
                {item.score}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-(--border) bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-(--ink-900)">
              {copy.reviewVideo}
            </h2>
            <p className="text-sm text-(--ink-500)">
              {copy.reviewVideoSubtitle}
            </p>
          </div>
          <button
            type="button"
            className="rounded-lg border border-(--border) px-3 py-2 text-sm font-semibold text-(--ink-700) shadow-sm transition hover:border-(--brand-200)"
          >
            {copy.uploadVideo}
          </button>
        </div>

        <div className="mt-5 space-y-5">
          {videoReviews.map((review) => (
            <div
              key={review.question}
              className="grid gap-4 rounded-xl border border-(--border) bg-(--brand-50)/40 p-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
            >
              <div>
                <p className="text-sm font-semibold text-(--ink-900)">
                  {review.question}
                </p>
                <div className="mt-3 h-40 rounded-lg border border-(--border) bg-white/80">
                  <div className="flex h-full items-center justify-center text-sm text-(--ink-500)">
                    {copy.videoPreview}
                  </div>
                </div>
                <button
                  type="button"
                  className="mt-3 rounded-lg bg-(--brand-600) px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-(--brand-700)"
                >
                  {copy.playWithFeedback}
                </button>
              </div>
              <div className="space-y-3 text-sm text-(--ink-700)">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--ink-500)">
                  {copy.feedbackHighlights}
                </p>
                {review.feedback.map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-(--border) bg-white px-4 py-3"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
