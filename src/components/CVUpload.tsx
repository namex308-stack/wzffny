"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { CVAnalysis } from "@/lib/auto/analyzeCV";
import type { GeneratedQuestion } from "@/lib/auto/generateQuestions";
import type { ExtractedCV } from "@/lib/auto/extractCV";

type UploadResult = {
  cvAnalysisId: string;
  questionSetId: string | null;
  analysis: CVAnalysis;
  questions: GeneratedQuestion[];
  extracted: ExtractedCV;
};

type Props = {
  onComplete: (result: UploadResult) => void;
};

export function CVUpload({ onComplete }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      setStatus("الرجاء اختيار ملف السيرة الذاتية.");
      return;
    }

    setLoading(true);
    setStatus("جاري التحليل بالذكاء الاصطناعي...");

    const formData = new FormData();
    formData.append("file", file);
    if (jobTitle) formData.append("jobTitle", jobTitle);
    if (jobDescription) formData.append("jobDescription", jobDescription);

    const response = await fetch("/api/auto/analyze-cv", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      setStatus("تعذر تحليل السيرة الذاتية. حاول مجددًا.");
      setLoading(false);
      return;
    }

    const result = (await response.json()) as UploadResult;
    setLoading(false);
    setStatus("تم التحليل وإعداد الأسئلة تلقائياً.");
    onComplete(result);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">
            ارفع سيرتك الذاتية
          </p>
          <p className="text-xs text-slate-500">
            PDF, DOCX, أو صورة واضحة. سيتم تحليلها وتوليد أسئلة مخصصة.
          </p>
        </div>
        <Button type="submit" disabled={loading} variant="primary" size="sm">
          {loading ? "جارٍ..." : "تحليل السيرة"}
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex h-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-indigo-200 bg-indigo-50/50 px-4 py-6 text-center text-sm text-indigo-700 hover:border-indigo-400 hover:bg-indigo-50">
          <input
            type="file"
            accept=".pdf,.docx,.doc,.png,.jpg,.jpeg,.webp"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
          {file ? (
            <>
              <span className="font-semibold">{file.name}</span>
              <span className="text-xs text-indigo-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </span>
            </>
          ) : (
            <>
              <span className="font-semibold">اسحب الملف أو اختره</span>
              <span className="text-xs text-indigo-500">
                سنستخرج النص ونتأكد من الجاهزية لـ ATS
              </span>
            </>
          )}
        </label>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-700">
              المسمى الوظيفي المستهدف
            </label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              placeholder="Product Manager, Data Scientist..."
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700">
              وصف الوظيفة (اختياري)
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              rows={3}
              placeholder="ألصق أهم المتطلبات لنخصص التحليل أكثر."
            />
          </div>
        </div>
      </div>

      {status && <p className="text-sm text-emerald-700">{status}</p>}
    </form>
  );
}
