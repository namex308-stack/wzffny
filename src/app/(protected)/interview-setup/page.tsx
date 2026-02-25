// app/(protected)/interview-setup/page.tsx
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/components/providers/LocaleProvider";
import { setInterviewFlowStage } from "@/lib/interviewFlow";

const interviewTypesEn = [
  { value: "behavioral", label: "Behavioral" },
  { value: "technical", label: "Technical" },
  { value: "mixed", label: "Mixed" },
];

const interviewTypesAr = [
  { value: "behavioral", label: "سلوكي" },
  { value: "technical", label: "تقني" },
  { value: "mixed", label: "مختلط" },
];

const seniorityLevelsEn = ["Student / Intern", "Junior", "Mid-level"];

const seniorityLevelsAr = ["طالب / متدرب", "مبتدئ", "متوسط"];

const reminderOptionsEn = [
  { value: "30", label: "30 seconds" },
  { value: "45", label: "45 seconds" },
  { value: "60", label: "60 seconds" },
  { value: "90", label: "90 seconds" },
];

const reminderOptionsAr = [
  { value: "30", label: "30 ثانية" },
  { value: "45", label: "45 ثانية" },
  { value: "60", label: "60 ثانية" },
  { value: "90", label: "90 ثانية" },
];

const focusAreasEn = [
  "Behavioral storytelling",
  "Technical depth",
  "System design",
  "Communication clarity",
  "Leadership & collaboration",
  "Career motivation",
];

const focusAreasAr = [
  "سرد سلوكي",
  "عمق تقني",
  "تصميم الأنظمة",
  "وضوح التواصل",
  "القيادة والتعاون",
  "الدافع المهني",
];

export default function InterviewSetupPage() {
  const router = useRouter();
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  const copy = {
    brief: isArabic ? "ملخص المقابلة" : "Interview brief",
    title: isArabic ? "اضبط أساسيات المقابلة" : "Set up the basics",
    subtitle: isArabic
      ? "بعض التفاصيل السريعة لطلاب ومبتدئين لتخصيص الأسئلة لك."
      : "A few quick details for students and beginners so we can tailor the questions for you.",
    fullName: isArabic ? "الاسم الكامل" : "Full name",
    fullNamePlaceholder: isArabic
      ? "مثال: علي هاشم علي"
      : "e.g., Jane Doe",
    interviewType: isArabic ? "نوع المقابلة" : "Interview type",
    timePerQuestion: isArabic ? "الوقت لكل سؤال" : "Time per question",
    targetRole: isArabic ? "الدور المستهدف" : "Target role",
    targetRolePlaceholder: isArabic
      ? "مثال: طالب علوم حاسوب، مطوّر مبتدئ"
      : "e.g., CS student, Junior developer",
    seniority: isArabic ? "المستوى" : "Level",
    experienceYears: isArabic ? "سنوات الخبرة (يمكن أن تكون 0)" : "Years of experience (can be 0)",
    focusAreas: isArabic ? "أهم ما تريد تحسينه" : "What you want to improve most",
    continue: isArabic ? "ابدأ الإعداد" : "Continue to interview",
    next: isArabic ? "ماذا سيحدث بعد ذلك" : "What happens next",
    nextIntro: isArabic
      ? "سنستخدم بياناتك لتخصيص مسار الأسئلة والتوقيت."
      : "We will use your brief to tailor the question flow and timing.",
    nextOne: isArabic
      ? "أسئلة مخصصة حسب الدور والمستوى."
      : "Tailored questions based on your role and level.",
    nextTwo: isArabic
      ? "تنبيهات زمنية لمساعدتك على الإجابات المختصرة."
      : "Time cues to help you deliver concise answers.",
    nextThree: isArabic
      ? "لوحة مراجعة مع فيديوهات وملاحظات محفوظة بعد الجلسة."
      : "Review panel with saved videos and notes after the session.",
    proTip: isArabic ? "نصيحة احترافية" : "Pro tip",
    proTipBody: isArabic
      ? "كن واضحًا حول الدور الذي تتدرب عليه، حتى لو كان تدريبًا أو وظيفة أولى."
      : "Be specific about the role you’re aiming for, even if it’s an internship or first job.",
    requiredMessage: isArabic
      ? "يرجى ملء جميع الحقول المطلوبة قبل المتابعة."
      : "Please fill in all required fields before continuing.",
    readyMessage: isArabic
      ? "جاهز — تم ملء كل شيء، زر المتابعة مفعّل."
      : "Ready — everything looks good and Next is active.",
    completeFields: isArabic
      ? "أكمل الحقول المطلوبة لتفعيل زر المتابعة."
      : "Complete the required fields to activate Next.",
  };
  const [fullName, setFullName] = useState("");
  const [interviewType, setInterviewType] = useState("behavioral");
  const [targetRole, setTargetRole] = useState("");
  const [seniority, setSeniority] = useState(
    isArabic ? seniorityLevelsAr[0] : seniorityLevelsEn[0],
  );
  const [experienceYears, setExperienceYears] = useState("0");
  const [timePerQuestion, setTimePerQuestion] = useState("60");
  const [focusArea, setFocusArea] = useState(
    isArabic ? focusAreasAr[0] : focusAreasEn[0],
  );
  const [error, setError] = useState("");

  const isExperienceValid = () => {
    const trimmed = experienceYears.trim();
    if (trimmed === "") return false;
    const num = Number(trimmed);
    return Number.isFinite(num) && num >= 0 && num <= 40;
  };

  const isFormValid =
    Boolean(fullName.trim()) &&
    Boolean(interviewType) &&
    Boolean(timePerQuestion) &&
    Boolean(targetRole.trim()) &&
    Boolean(seniority) &&
    Boolean(focusArea) &&
    isExperienceValid();

  const interviewTypes = isArabic ? interviewTypesAr : interviewTypesEn;
  const seniorityLevels = isArabic ? seniorityLevelsAr : seniorityLevelsEn;
  const reminderOptions = isArabic ? reminderOptionsAr : reminderOptionsEn;
  const focusAreas = isArabic ? focusAreasAr : focusAreasEn;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid) {
      setError(copy.requiredMessage);
      return;
    }

    setError("");
    const params = new URLSearchParams();
    params.set("name", fullName.trim());
    params.set("type", interviewType);
    params.set("time", timePerQuestion);
    params.set("role", targetRole.trim());
    params.set("level", seniority);
    params.set("years", experienceYears.trim());
    if (focusArea) params.set("focus", focusArea);

    setInterviewFlowStage("setup_complete");
    router.push(`/interview?${params.toString()}`);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <section className="rounded-2xl border border-(--border) bg-white/95 p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-(--ink-500)">
          {copy.brief}
        </p>
        <h1 className="mt-3 font-display text-3xl text-(--ink-900)">
          {copy.title}
        </h1>
        <p className="mt-2 text-sm text-(--ink-700)">
          {copy.subtitle}
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <form
          className="space-y-6 rounded-2xl border border-(--border) bg-white p-6 shadow-sm"
          onSubmit={handleSubmit}
        >
          {error ? (
            <div
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              role="alert"
              aria-live="polite"
            >
              {error}
            </div>
          ) : null}

          <div>
            <label
              htmlFor="full-name"
              className="text-sm font-semibold text-(--ink-700)"
            >
              {copy.fullName}
            </label>
            <input
              id="full-name"
              name="full-name"
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder={copy.fullNamePlaceholder}
              required
              className="mt-2 w-full rounded-lg border border-(--border) bg-white px-3 py-2.5 text-sm text-(--ink-900) shadow-sm focus:border-(--brand-600) focus:outline-none focus:ring-2 focus:ring-(--brand-100)"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="interview-type"
                className="text-sm font-semibold text-(--ink-700)"
              >
                {copy.interviewType}
              </label>
              <select
                id="interview-type"
                name="interview-type"
                value={interviewType}
                onChange={(event) => setInterviewType(event.target.value)}
                required
                className="mt-2 w-full rounded-lg border border-(--border) bg-white px-3 py-2.5 text-sm text-(--ink-900) shadow-sm focus:border-(--brand-600) focus:outline-none focus:ring-2 focus:ring-(--brand-100)"
              >
                {interviewTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="question-time"
                className="text-sm font-semibold text-(--ink-700)"
              >
                {copy.timePerQuestion}
              </label>
              <select
                id="question-time"
                name="question-time"
                value={timePerQuestion}
                onChange={(event) => setTimePerQuestion(event.target.value)}
                required
                className="mt-2 w-full rounded-lg border border-(--border) bg-white px-3 py-2.5 text-sm text-(--ink-900) shadow-sm focus:border-(--brand-600) focus:outline-none focus:ring-2 focus:ring-(--brand-100)"
              >
                {reminderOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="target-role"
                className="text-sm font-semibold text-(--ink-700)"
              >
                {copy.targetRole}
              </label>
              <input
                id="target-role"
                name="target-role"
                type="text"
                value={targetRole}
                onChange={(event) => setTargetRole(event.target.value)}
                placeholder={copy.targetRolePlaceholder}
                required
                className="mt-2 w-full rounded-lg border border-(--border) bg-white px-3 py-2.5 text-sm text-(--ink-900) shadow-sm focus:border-(--brand-600) focus:outline-none focus:ring-2 focus:ring-(--brand-100)"
              />
            </div>

            <div>
              <label
                htmlFor="seniority"
                className="text-sm font-semibold text-(--ink-700)"
              >
                {copy.seniority}
              </label>
              <select
                id="seniority"
                name="seniority"
                value={seniority}
                onChange={(event) => setSeniority(event.target.value)}
                required
                className="mt-2 w-full rounded-lg border border-(--border) bg-white px-3 py-2.5 text-sm text-(--ink-900) shadow-sm focus:border-(--brand-600) focus:outline-none focus:ring-2 focus:ring-(--brand-100)"
              >
                {seniorityLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="experience"
                className="text-sm font-semibold text-(--ink-700)"
              >
                {copy.experienceYears}
              </label>
              <input
                id="experience"
                name="experience"
                type="number"
                min="0"
                max="40"
                value={experienceYears}
                onChange={(event) => setExperienceYears(event.target.value)}
                required
                className="mt-2 w-full rounded-lg border border-(--border) bg-white px-3 py-2.5 text-sm text-(--ink-900) shadow-sm focus:border-(--brand-600) focus:outline-none focus:ring-2 focus:ring-(--brand-100)"
              />
            </div>

            <div>
              <label
                htmlFor="focus-area"
                className="text-sm font-semibold text-(--ink-700)"
              >
                {copy.focusAreas}
              </label>
              <select
                id="focus-area"
                name="focus-area"
                value={focusArea}
                onChange={(event) => setFocusArea(event.target.value)}
                required
                className="mt-2 w-full rounded-lg border border-(--border) bg-white px-3 py-2.5 text-sm text-(--ink-900) shadow-sm focus:border-(--brand-600) focus:outline-none focus:ring-2 focus:ring-(--brand-100)"
              >
                {focusAreas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                isFormValid
                  ? "bg-(--brand-50) text-(--brand-700)"
                  : "bg-(--border) text-(--ink-600)"
              }`}
              aria-live="polite"
            >
              {isFormValid ? "✓" : "•"}{" "}
              {isFormValid ? copy.readyMessage : copy.completeFields}
            </span>
            <button
              type="submit"
              disabled={!isFormValid}
              aria-disabled={!isFormValid}
              className={`rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition ${
                isFormValid
                  ? "bg-(--brand-600) hover:bg-(--brand-700)"
                  : "bg-(--border) text-(--ink-500) cursor-not-allowed opacity-70"
              }`}
            >
              {copy.continue}
            </button>
          </div>
        </form>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-(--border) bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-(--ink-900)">
              {copy.next}
            </h2>
            <p className="mt-2 text-sm text-(--ink-600)">
              {copy.nextIntro}
            </p>
            <div className="mt-4 space-y-3 text-sm text-(--ink-600)">
              <div className="rounded-lg border border-(--border) px-4 py-3">
                {copy.nextOne}
              </div>
              <div className="rounded-lg border border-(--border) px-4 py-3">
                {copy.nextTwo}
              </div>
              <div className="rounded-lg border border-(--border) px-4 py-3">
                {copy.nextThree}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-(--border) bg-(--brand-50)/60 p-6 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-(--brand-700)">
              {copy.proTip}
            </h3>
            <p className="mt-3 text-sm text-(--ink-700)">
              {copy.proTipBody}
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}
