// app/(protected)/resume/page.tsx
"use client";

import { useState, type ChangeEvent } from "react";
import { useLocale } from "@/components/providers/LocaleProvider";

const keywordSuggestionsEn = [
  "Product strategy",
  "User research",
  "A/B testing",
  "Retention optimization",
  "Agile delivery",
  "OKR ownership",
];

const keywordSuggestionsAr = [
  "استراتيجية المنتج",
  "بحث المستخدمين",
  "اختبارات A/B",
  "تحسين الاحتفاظ",
  "تنفيذ أجايل",
  "ملكية OKR",
];

const formattingImprovementsEn = [
  "Aligned dates and locations for fast scanning.",
  "Standardized bullet punctuation and spacing.",
  "Improved section headings and hierarchy.",
];

const formattingImprovementsAr = [
  "محاذاة التواريخ والمواقع لسهولة القراءة.",
  "توحيد علامات الترقيم والمسافات في النقاط.",
  "تحسين العناوين لتسلسل أوضح.",
];

const grammarChecksEn = [
  "Fixed three tense inconsistencies across experience bullets.",
  "Replaced passive voice in two summary sentences.",
  "Corrected capitalization for product and tool names.",
];

const grammarChecksAr = [
  "تم إصلاح ثلاث مشكلات في زمن الأفعال بنقاط الخبرة.",
  "استبدال المبني للمجهول في جملتين بالملخص.",
  "تصحيح الحروف الكبيرة لأسماء المنتجات والأدوات.",
];

const strengthHighlightsEn = [
  "Impact-first bullets with metrics in recent roles.",
  "Clear ownership of cross-functional initiatives.",
  "Consistent story from summary to experience.",
];

const strengthHighlightsAr = [
  "نقاط تبدأ بالأثر مع أرقام واضحة في الأدوار الأخيرة.",
  "ملكية واضحة لمبادرات متعددة التخصصات.",
  "سرد متّسق من الملخص حتى الخبرات.",
];

const weaknessHighlightsEn = [
  "Summary lacks a target role and measurable outcome.",
  "Skills section mixes tools and competencies—split by category.",
  "Older roles can be condensed to spotlight recent wins.",
];

const weaknessHighlightsAr = [
  "الملخص يفتقد الدور المستهدف ونتيجة قابلة للقياس.",
  "قسم المهارات يخلط الأدوات والقدرات—قسّمه حسب الفئات.",
  "يمكن اختصار الأدوار الأقدم لإبراز الإنجازات الحديثة.",
];

const ratingMetricsEn = [
  { label: "ATS readiness", score: 88 },
  { label: "Impact clarity", score: 80 },
  { label: "Keyword match", score: 76 },
  { label: "Formatting & layout", score: 92 },
];

const ratingMetricsAr = [
  { label: "جاهزية ATS", score: 88 },
  { label: "وضوح الأثر", score: 80 },
  { label: "توافق الكلمات المفتاحية", score: 76 },
  { label: "التنسيق والترتيب", score: 92 },
];

const editSuggestionEn =
  "Rewrite the summary with a target role + 2 measurable outcomes + domain (e.g., B2B SaaS) for stronger alignment.";

const editSuggestionAr =
  "أعد كتابة الملخص بدور مستهدف + نتيجتين قابلتين للقياس + المجال (مثل B2B SaaS) لرفع الملاءمة.";

const improvementExamplesEn = [
  {
    label: "Impact",
    before: "Managed a team to improve onboarding.",
    after:
      "Improved onboarding completion from 62% to 84% by redesigning the first‑run flow.",
  },
  {
    label: "Efficiency",
    before: "Responsible for weekly reports.",
    after:
      "Automated weekly KPI reporting, saving 4 hours per week for the team.",
  },
  {
    label: "Growth",
    before: "Worked on marketing campaigns.",
    after:
      "Led three lifecycle email campaigns that lifted trial‑to‑paid conversion by 12%.",
  },
];

const improvementExamplesAr = [
  {
    label: "الأثر",
    before: "أدرت فريقًا لتحسين الإعداد.",
    after:
      "رفعت نسبة إكمال الإعداد من 62% إلى 84% عبر إعادة تصميم تجربة البدء.",
  },
  {
    label: "الكفاءة",
    before: "كنت مسؤولًا عن التقارير الأسبوعية.",
    after:
      "أتمتة تقارير المؤشرات الأسبوعية، موفّرًا 4 ساعات أسبوعيًا للفريق.",
  },
  {
    label: "النمو",
    before: "عملت على حملات تسويقية.",
    after:
      "قدت ثلاث حملات بريدية لرفع التحويل من تجربة إلى مدفوع بنسبة 12%.",
  },
];

export default function ResumePage() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  const copy = {
    label: isArabic ? "تحسين السيرة الذاتية" : "Resume optimization",
    title: isArabic
      ? "ارفع سيرتك الذاتية واجعلها جاهزة للتوظيف خلال دقائق"
      : "Upload your resume. Get recruiter‑ready in minutes.",
    subtitle: isArabic
      ? "يقيم الذكاء الاصطناعي الهيكل والكلمات المفتاحية والأثر، ثم يولّد نسخة محسّنة وجاهزة لأنظمة ATS."
      : "AI reviews structure, keywords, and impact, then generates an optimized ATS‑ready version.",
    uploadTitle: isArabic ? "رفع السيرة الذاتية" : "Upload your resume",
    supportedFormats: isArabic
      ? "PDF أو DOCX حتى 10 ميجابايت. عربي أو إنجليزي."
      : "PDF or DOCX up to 10 MB. English or Arabic.",
    selected: isArabic ? "تم اختيار:" : "Selected:",
    dragDrop: isArabic
      ? "اسحب الملف وأفلته هنا أو انقر لاختيار ملف."
      : "Drag and drop your file here or click to choose.",
    saveToAccount: isArabic
      ? "حفظ السيرة في حسابي للإصدارات القادمة"
      : "Save to my account for future versions",
    uploadCta: isArabic ? "اختيار ملف" : "Choose file",
    analyze: isArabic ? "تحليل بالذكاء الاصطناعي" : "Run AI analysis",
    reanalyze: isArabic ? "إعادة التحليل" : "Re‑run analysis",
    uploadFirst: isArabic
      ? "يرجى رفع ملف السيرة الذاتية قبل بدء التحليل."
      : "Please upload a resume file before running analysis.",
    improvements: isArabic ? "تحسينات السيرة الذاتية" : "Resume improvements",
    improvementsSubtitle: isArabic
      ? "أهم التعديلات والأمثلة المبنية على آخر ملف."
      : "Key changes and examples based on your latest upload.",
    strengths: isArabic ? "نقاط القوة" : "Strengths",
    weaknesses: isArabic ? "فرص التحسين" : "Opportunities",
    formatting: isArabic ? "تحسينات التنسيق" : "Formatting upgrades",
    keywords: isArabic ? "كلمات مفتاحية مقترحة" : "Suggested keywords",
    grammar: isArabic ? "اللغة والنبرة" : "Language & tone",
    editSuggestion: isArabic ? "اقتراح رئيسي" : "Recommended edit",
    examples: isArabic ? "أمثلة قبل وبعد" : "Before & after examples",
    examplesSubtitle: isArabic
      ? "نماذج حقيقية لتحويل الجمل إلى نتائج قابلة للقياس."
      : "Real examples of turning statements into measurable outcomes.",
    emptyHint: isArabic
      ? "ارفع السيرة الذاتية واضغط \"تحليل بالذكاء الاصطناعي\" لعرض النتائج."
      : "Upload a resume and click \"Run AI analysis\" to see feedback.",
    ratings: isArabic ? "تقييم السيرة الذاتية" : "Resume ratings",
    ratingsSubtitle: isArabic
      ? "الدرجات تعكس الجاهزية لـ ATS ووضوح الأثر."
      : "Scores reflect ATS readiness, impact, and clarity.",
    ratingsEmpty: isArabic ? "تظهر التقييمات بعد اكتمال التحليل." : "Ratings appear after analysis is complete.",
    optimized: isArabic ? "السيرة الذاتية المحسّنة" : "Optimized resume",
    optimizedSubtitle: isArabic
      ? "حمّل نسخة جاهزة لأنظمة ATS مع تحسينات الكلمات المفتاحية والإنجازات."
      : "Download the ATS‑ready version with stronger keywords and outcomes.",
    generatedMeta: isArabic
      ? "تم الإنشاء في 5 فبراير 2026 • 1.1 ميجابايت"
      : "Generated Feb 5, 2026 • 1.1 MB",
    downloadOptimized: isArabic ? "تحميل السيرة المحسّنة" : "Download optimized resume",
    viewChanges: isArabic ? "عرض التعديلات" : "View changes",
    downloadRevised: isArabic ? "تحميل النسخة المعدلة" : "Download revised version",
    saveTitle: isArabic ? "النسخ المحفوظة" : "Saved versions",
    saveSubtitle: isArabic
      ? "احتفظ بأفضل النسخ وقارن التحسن بمرور الوقت."
      : "Keep your best iterations and compare progress over time.",
    savedVersions: isArabic ? "أحدث النسخ" : "Recent versions",
    savedItemOne: isArabic ? "سيرة مدير منتجات — 2 فبراير 2026" : "Product Manager Resume — Feb 2, 2026",
    savedItemTwo: isArabic
      ? "سيرة باحثة تجربة مستخدم أول — 18 ديسمبر 2025"
      : "Senior UX Researcher Resume — Dec 18, 2025",
  };
  const keywordSuggestions = isArabic ? keywordSuggestionsAr : keywordSuggestionsEn;
  const formattingImprovements = isArabic ? formattingImprovementsAr : formattingImprovementsEn;
  const grammarChecks = isArabic ? grammarChecksAr : grammarChecksEn;
  const strengthHighlights = isArabic ? strengthHighlightsAr : strengthHighlightsEn;
  const weaknessHighlights = isArabic ? weaknessHighlightsAr : weaknessHighlightsEn;
  const ratingMetrics = isArabic ? ratingMetricsAr : ratingMetricsEn;
  const editSuggestion = isArabic ? editSuggestionAr : editSuggestionEn;
  const improvementExamples = isArabic ? improvementExamplesAr : improvementExamplesEn;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [saveToAccount, setSaveToAccount] = useState(true);
  const [analysisReady, setAnalysisReady] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [revisedUrl, setRevisedUrl] = useState<string | null>(null);
  const [revisedFileName, setRevisedFileName] = useState(
    "Interviewly_Resume_Optimized.pdf",
  );

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
    setAnalysisReady(false);
    setAnalysisError(null);
    if (revisedUrl) {
      URL.revokeObjectURL(revisedUrl);
      setRevisedUrl(null);
    }
  };

  const handleAnalyze = () => {
    if (!selectedFile) {
      setAnalysisError(copy.uploadFirst);
      setAnalysisReady(false);
      return;
    }
    if (revisedUrl) {
      URL.revokeObjectURL(revisedUrl);
    }
    const extension = selectedFile.name.split(".").pop();
    const filename = extension
      ? `Interviewly_Resume_Optimized.${extension}`
      : "Interviewly_Resume_Optimized.pdf";
    setRevisedFileName(filename);
    setRevisedUrl(URL.createObjectURL(selectedFile));
    setAnalysisError(null);
    setAnalysisReady(true);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <section className="rounded-2xl border border-(--border) bg-white/95 p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-(--ink-500)">
          {copy.label}
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
            <h2 className="text-lg font-semibold text-(--ink-900)">
              {copy.uploadTitle}
            </h2>
            <p className="mt-1 text-sm text-(--ink-500)">
              {copy.supportedFormats}
            </p>

            <div className="mt-4 rounded-lg border border-dashed border-(--border) bg-(--brand-50)/40 px-4 py-5">
              <input
                id="resume-file"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="w-full text-sm text-(--ink-600)"
              />
              <p className="mt-2 text-xs text-(--ink-500)">
                {selectedFile
                  ? `${copy.selected} ${selectedFile.name}`
                  : copy.dragDrop}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <label className="flex items-center gap-2 text-sm text-(--ink-700)">
                <input
                  type="checkbox"
                  checked={saveToAccount}
                  onChange={(event) => setSaveToAccount(event.target.checked)}
                  className="h-4 w-4 rounded border-(--border) text-(--brand-600) focus:ring-(--brand-100)"
                />
                {copy.saveToAccount}
              </label>
              <div className="flex flex-wrap gap-3">
                <label
                  htmlFor="resume-file"
                  className="cursor-pointer rounded-lg border border-(--border) px-4 py-2 text-sm font-semibold text-(--ink-700) shadow-sm transition hover:border-(--brand-200)"
                >
                  {copy.uploadCta}
                </label>
                <button
                  type="button"
                  onClick={handleAnalyze}
                  className="rounded-lg bg-(--brand-600) px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-(--brand-700)"
                >
                  {analysisReady ? copy.reanalyze : copy.analyze}
                </button>
              </div>
            </div>

            {analysisError ? (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {analysisError}
              </div>
            ) : null}
          </div>

          <div className="rounded-2xl border border-(--border) bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-(--ink-900)">
              {copy.improvements}
            </h2>
            <p className="mt-1 text-sm text-(--ink-500)">
              {copy.improvementsSubtitle}
            </p>

            {analysisReady ? (
              <div className="mt-4 space-y-4">
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="rounded-lg border border-(--border) bg-(--brand-50)/40 px-4 py-3 text-sm text-(--ink-700)">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--ink-500)">
                      {copy.strengths}
                    </p>
                    <ul className="mt-2 space-y-2">
                      {strengthHighlights.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-lg border border-(--border) bg-white px-4 py-3 text-sm text-(--ink-700)">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--ink-500)">
                      {copy.weaknesses}
                    </p>
                    <ul className="mt-2 space-y-2">
                      {weaknessHighlights.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="rounded-lg border border-(--border) bg-(--brand-50)/40 px-4 py-3 text-sm text-(--ink-700)">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--ink-500)">
                    {copy.formatting}
                  </p>
                  <ul className="mt-2 space-y-2">
                    {formattingImprovements.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg border border-(--border) bg-white px-4 py-3 text-sm text-(--ink-700)">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--ink-500)">
                    {copy.keywords}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {keywordSuggestions.map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-full bg-(--brand-50) px-3 py-1 text-xs font-semibold text-(--brand-700)"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-(--border) bg-white px-4 py-3 text-sm text-(--ink-700)">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--ink-500)">
                    {copy.grammar}
                  </p>
                  <ul className="mt-2 space-y-2">
                    {grammarChecks.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg border border-(--border) bg-white px-4 py-3 text-sm text-(--ink-700)">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--ink-500)">
                    {copy.editSuggestion}
                  </p>
                  <p className="mt-2 text-sm text-(--ink-700)">
                    {editSuggestion}
                  </p>
                </div>

                <div className="rounded-lg border border-(--border) bg-white px-4 py-3 text-sm text-(--ink-700)">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--ink-500)">
                    {copy.examples}
                  </p>
                  <p className="mt-2 text-xs text-(--ink-500)">
                    {copy.examplesSubtitle}
                  </p>
                  <div className="mt-3 space-y-3">
                    {improvementExamples.map((example) => (
                      <div
                        key={example.label}
                        className="rounded-lg border border-(--border) bg-(--brand-50)/40 px-3 py-3"
                      >
                        <div className="flex items-center justify-between text-xs font-semibold text-(--ink-600)">
                          <span>{example.label}</span>
                        </div>
                        <div className="mt-2 grid gap-2 text-xs text-(--ink-700)">
                          <p>
                            <span className="font-semibold text-(--ink-500)">
                              {isArabic ? "قبل:" : "Before:"}
                            </span>{" "}
                            {example.before}
                          </p>
                          <p>
                            <span className="font-semibold text-(--ink-500)">
                              {isArabic ? "بعد:" : "After:"}
                            </span>{" "}
                            {example.after}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-4 rounded-lg border border-dashed border-(--border) bg-(--brand-50)/40 px-4 py-4 text-sm text-(--ink-600)">
                {copy.emptyHint}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-(--border) bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-(--ink-900)">
              {copy.ratings}
            </h2>
            <p className="mt-1 text-sm text-(--ink-500)">
              {copy.ratingsSubtitle}
            </p>
            {analysisReady ? (
              <div className="mt-4 space-y-4">
                {ratingMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-lg border border-(--border) bg-white px-4 py-3"
                  >
                    <div className="flex items-center justify-between text-sm font-semibold text-(--ink-900)">
                      <span>{metric.label}</span>
                      <span>{metric.score}</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-(--brand-50)">
                      <div
                        className="h-2 rounded-full bg-(--brand-600)"
                        style={{ width: `${metric.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4 rounded-lg border border-dashed border-(--border) bg-(--brand-50)/40 px-4 py-4 text-sm text-(--ink-600)">
                {copy.ratingsEmpty}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-(--border) bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-(--ink-900)">
              {copy.optimized}
            </h2>
            <p className="mt-1 text-sm text-(--ink-500)">
              {copy.optimizedSubtitle}
            </p>
            <div className="mt-4 rounded-lg border border-(--border) bg-(--brand-50)/40 px-4 py-4 text-sm text-(--ink-700)">
              <p className="font-semibold text-(--ink-900)">
                {revisedFileName}
              </p>
              <p className="mt-1 text-xs text-(--ink-500)">
                {copy.generatedMeta}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={analysisReady && revisedUrl ? revisedUrl : "#"}
                  download={revisedFileName}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold shadow-sm transition ${
                    analysisReady && revisedUrl
                      ? "bg-(--brand-600) text-white hover:bg-(--brand-700)"
                      : "cursor-not-allowed bg-slate-300 text-slate-600"
                  }`}
                >
                  {copy.downloadOptimized}
                </a>
                <button
                  type="button"
                  disabled={!analysisReady}
                  className="rounded-lg border border-(--border) px-4 py-2 text-sm font-semibold text-(--ink-700) shadow-sm transition hover:border-(--brand-200) disabled:cursor-not-allowed disabled:text-(--ink-500)"
                >
                  {copy.viewChanges}
                </button>
                {analysisReady && revisedUrl ? (
                  <a
                    href={revisedUrl}
                    download={revisedFileName}
                    className="text-sm font-semibold text-(--brand-700) hover:text-(--brand-600)"
                  >
                    {copy.downloadRevised}
                  </a>
                ) : null}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-(--border) bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-(--ink-900)">
              {copy.saveTitle}
            </h2>
            <p className="mt-1 text-sm text-(--ink-500)">
              {copy.saveSubtitle}
            </p>
            <div className="mt-4 rounded-lg border border-(--border) bg-white px-4 py-3 text-sm text-(--ink-700)">
              <p className="font-semibold text-(--ink-900)">
                {copy.savedVersions}
              </p>
              <ul className="mt-3 space-y-2 text-sm text-(--ink-600)">
                <li>• {copy.savedItemOne}</li>
                <li>• {copy.savedItemTwo}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
