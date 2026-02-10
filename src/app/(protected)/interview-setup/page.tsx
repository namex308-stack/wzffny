// app/(protected)/interview-setup/page.tsx
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale } from "@/components/providers/LocaleProvider";

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

const industriesEn = [
  "Software & SaaS",
  "Fintech",
  "Healthcare",
  "E-commerce",
  "Consulting",
  "Education",
  "Marketing & Media",
  "Operations",
  "Other",
];

const industriesAr = [
  "البرمجيات والخدمات السحابية",
  "التقنية المالية",
  "الرعاية الصحية",
  "التجارة الإلكترونية",
  "الاستشارات",
  "التعليم",
  "التسويق والإعلام",
  "العمليات",
  "أخرى",
];

const seniorityLevelsEn = [
  "Intern",
  "Entry level",
  "Mid level",
  "Senior",
  "Lead / Staff",
  "Manager",
];

const seniorityLevelsAr = [
  "متدرب",
  "مبتدئ",
  "متوسط",
  "متقدم",
  "قيادي / خبير",
  "مدير",
];

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
    title: isArabic ? "اضبط تفاصيل المقابلة" : "Set up your interview details",
    subtitle: isArabic
      ? "حدد الدور المستهدف والصناعة ونقاط التركيز لتبدو المقابلة مخصصة ومهنية."
      : "Provide your target role, industry, and focus areas to make the interview feel tailored and professional.",
    interviewType: isArabic ? "نوع المقابلة" : "Interview type",
    timePerQuestion: isArabic ? "الوقت لكل سؤال" : "Time per question",
    targetRole: isArabic ? "الدور المستهدف" : "Target role",
    targetRolePlaceholder: isArabic
      ? "مثال: مدير منتج، محلل بيانات"
      : "e.g., Product Manager, Data Analyst",
    targetIndustry: isArabic ? "الصناعة المستهدفة" : "Target industry",
    targetCompany: isArabic ? "الشركة المستهدفة (اختياري)" : "Target company (optional)",
    targetCompanyPlaceholder: isArabic
      ? "مثال: Stripe، Google، Shopify"
      : "e.g., Stripe, Google, Shopify",
    seniority: isArabic ? "المستوى الوظيفي" : "Seniority level",
    experienceYears: isArabic ? "سنوات الخبرة" : "Years of experience",
    location: isArabic ? "الموقع أو المنطقة الزمنية" : "Location or time zone",
    locationPlaceholder: isArabic ? "مثال: الرياض، GMT+3" : "e.g., Riyadh, GMT+3",
    focusAreas: isArabic ? "مجالات التركيز" : "Focus areas",
    notes: isArabic ? "ملاحظات إضافية" : "Additional notes",
    notesPlaceholder: isArabic
      ? "شارك الأهداف أو التحديات أو ما تود أن يعرفه المحاور."
      : "Share goals, challenges, or anything you want the interviewer to know.",
    skip: isArabic ? "تخطَّ الآن" : "Skip for now",
    continue: isArabic ? "المتابعة للمقابلة" : "Continue to interview",
    next: isArabic ? "ماذا سيحدث بعد ذلك" : "What happens next",
    nextIntro: isArabic
      ? "سنستخدم بياناتك لتخصيص مسار الأسئلة والتوقيت."
      : "We will use your brief to tailor the question flow and timing.",
    nextOne: isArabic
      ? "أسئلة مخصصة حسب الدور والصناعة."
      : "Tailored questions based on your role and industry.",
    nextTwo: isArabic
      ? "تنبيهات زمنية لمساعدتك على الإجابات المختصرة."
      : "Time cues to help you deliver concise answers.",
    nextThree: isArabic
      ? "لوحة مراجعة مع فيديوهات وملاحظات محفوظة بعد الجلسة."
      : "Review panel with saved videos and notes after the session.",
    proTip: isArabic ? "نصيحة احترافية" : "Pro tip",
    proTipBody: isArabic
      ? "اجعل الشركة المستهدفة محددة. يساعد ذلك على التركيز على أمثلة سلوكية وعمق تقني مناسب."
      : "Keep your target company specific. It helps the interviewer focus on relevant behavioral examples and technical depth.",
  };
  const [interviewType, setInterviewType] = useState("behavioral");
  const [targetRole, setTargetRole] = useState("");
  const [targetIndustry, setTargetIndustry] = useState(
    isArabic ? industriesAr[0] : industriesEn[0],
  );
  const [targetCompany, setTargetCompany] = useState("");
  const [seniority, setSeniority] = useState(
    isArabic ? seniorityLevelsAr[2] : seniorityLevelsEn[2],
  );
  const [experienceYears, setExperienceYears] = useState("3");
  const [location, setLocation] = useState("");
  const [timePerQuestion, setTimePerQuestion] = useState("60");
  const [selectedFocus, setSelectedFocus] = useState<string[]>([
    isArabic ? focusAreasAr[0] : focusAreasEn[0],
  ]);
  const [notes, setNotes] = useState("");

  const interviewTypes = isArabic ? interviewTypesAr : interviewTypesEn;
  const industries = isArabic ? industriesAr : industriesEn;
  const seniorityLevels = isArabic ? seniorityLevelsAr : seniorityLevelsEn;
  const reminderOptions = isArabic ? reminderOptionsAr : reminderOptionsEn;
  const focusAreas = isArabic ? focusAreasAr : focusAreasEn;

  const toggleFocus = (value: string) => {
    setSelectedFocus((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    params.set("type", interviewType);
    if (targetRole.trim()) params.set("role", targetRole.trim());
    if (targetIndustry) params.set("industry", targetIndustry);
    if (targetCompany.trim()) params.set("company", targetCompany.trim());
    if (seniority) params.set("level", seniority);
    if (experienceYears.trim()) params.set("years", experienceYears.trim());
    if (location.trim()) params.set("location", location.trim());
    if (timePerQuestion) params.set("time", timePerQuestion);
    if (selectedFocus.length > 0)
      params.set("focus", selectedFocus.join(","));
    if (notes.trim()) params.set("notes", notes.trim());

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
                className="mt-2 w-full rounded-lg border border-(--border) bg-white px-3 py-2.5 text-sm text-(--ink-900) shadow-sm focus:border-(--brand-600) focus:outline-none focus:ring-2 focus:ring-(--brand-100)"
              />
            </div>

            <div>
              <label
                htmlFor="industry"
                className="text-sm font-semibold text-(--ink-700)"
              >
                {copy.targetIndustry}
              </label>
              <select
                id="industry"
                name="industry"
                value={targetIndustry}
                onChange={(event) => setTargetIndustry(event.target.value)}
                className="mt-2 w-full rounded-lg border border-(--border) bg-white px-3 py-2.5 text-sm text-(--ink-900) shadow-sm focus:border-(--brand-600) focus:outline-none focus:ring-2 focus:ring-(--brand-100)"
              >
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="target-company"
                className="text-sm font-semibold text-(--ink-700)"
              >
                {copy.targetCompany}
              </label>
              <input
                id="target-company"
                name="target-company"
                type="text"
                value={targetCompany}
                onChange={(event) => setTargetCompany(event.target.value)}
                placeholder={copy.targetCompanyPlaceholder}
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
                className="mt-2 w-full rounded-lg border border-(--border) bg-white px-3 py-2.5 text-sm text-(--ink-900) shadow-sm focus:border-(--brand-600) focus:outline-none focus:ring-2 focus:ring-(--brand-100)"
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="text-sm font-semibold text-(--ink-700)"
              >
                {copy.location}
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder={copy.locationPlaceholder}
                className="mt-2 w-full rounded-lg border border-(--border) bg-white px-3 py-2.5 text-sm text-(--ink-900) shadow-sm focus:border-(--brand-600) focus:outline-none focus:ring-2 focus:ring-(--brand-100)"
              />
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-(--ink-700)">
              {copy.focusAreas}
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {focusAreas.map((area) => (
                <label
                  key={area}
                  className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-sm ${
                    selectedFocus.includes(area)
                      ? "border-(--brand-200) bg-(--brand-50)/70"
                      : "border-(--border) bg-white"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedFocus.includes(area)}
                    onChange={() => toggleFocus(area)}
                    className="mt-1 h-4 w-4 rounded border-(--border) text-(--brand-600) focus:ring-(--brand-100)"
                  />
                  <span className="text-(--ink-700)">{area}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="notes"
              className="text-sm font-semibold text-(--ink-700)"
            >
              {copy.notes}
            </label>
            <textarea
              id="notes"
              name="notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder={copy.notesPlaceholder}
              className="mt-2 min-h-[120px] w-full rounded-lg border border-(--border) bg-white px-3 py-2.5 text-sm text-(--ink-900) shadow-sm focus:border-(--brand-600) focus:outline-none focus:ring-2 focus:ring-(--brand-100)"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/interview"
              className="text-sm font-semibold text-(--ink-500) hover:text-(--ink-700)"
            >
              {copy.skip}
            </Link>
            <button
              type="submit"
              className="rounded-lg bg-(--brand-600) px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-(--brand-700)"
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
