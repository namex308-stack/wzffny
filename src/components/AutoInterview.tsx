"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CVUpload } from "@/components/CVUpload";
import { ReportView } from "@/components/ReportView";
import type { CVAnalysis } from "@/lib/auto/analyzeCV";
import type { GeneratedQuestion } from "@/lib/auto/generateQuestions";
import type { InterviewReport } from "@/lib/auto/generateReport";
import type { AnswerEvaluation } from "@/lib/auto/evaluateAnswer";

type UploadResult = {
  cvAnalysisId: string;
  questionSetId: string | null;
  analysis: CVAnalysis;
  questions: GeneratedQuestion[];
};

type EvaluationResult = {
  id: string;
  data: AnswerEvaluation;
  question: string;
};

export function AutoInterview() {
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [evaluations, setEvaluations] = useState<EvaluationResult[]>([]);
  const [report, setReport] = useState<InterviewReport | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loadingEval, setLoadingEval] = useState(false);
  const [loadingReport, setLoadingReport] = useState(false);

  const questions = uploadResult?.questions ?? [];

  const selectedQuestionText = useMemo(() => {
    if (!selectedQuestion) return questions[0]?.prompt ?? "";
    return questions.find((q) => q.id === selectedQuestion)?.prompt ?? "";
  }, [selectedQuestion, questions]);

  const handleEvaluate = async () => {
    if (!videoFile || !uploadResult) {
      setStatus("حمّل فيديو الإجابة واختر سؤالاً.");
      return;
    }
    setLoadingEval(true);
    setStatus("جاري تقييم الفيديو بالذكاء الاصطناعي...");

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("question", selectedQuestionText);
    if (uploadResult.questionSetId) {
      formData.append("questionSetId", uploadResult.questionSetId);
    }
    formData.append("jobTitle", uploadResult.analysis.jobTitle ?? "");

    const response = await fetch("/api/auto/evaluate", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      setStatus("تعذر تقييم الإجابة. حاول مرة أخرى.");
      setLoadingEval(false);
      return;
    }

    const json = (await response.json()) as {
      evaluationId: string;
      evaluation: AnswerEvaluation;
      videoPath: string;
    };

    setEvaluations((prev) => [
      ...prev,
      { id: json.evaluationId, data: json.evaluation, question: selectedQuestionText },
    ]);
    setLoadingEval(false);
    setStatus("تم تقييم الإجابة.");
  };

  const handleReport = async () => {
    if (!uploadResult) return;
    setLoadingReport(true);
    setStatus("جاري بناء التقرير الذكي...");

    const response = await fetch("/api/auto/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cvAnalysisId: uploadResult.cvAnalysisId,
        questionSetId: uploadResult.questionSetId,
        evaluationIds: evaluations.map((e) => e.id),
        sendEmail: true,
      }),
    });

    if (!response.ok) {
      setStatus("تعذر إنشاء التقرير.");
      setLoadingReport(false);
      return;
    }

    const json = (await response.json()) as {
      reportId: string;
      report: InterviewReport;
    };

    setReport(json.report);
    setLoadingReport(false);
    setStatus("تم إنشاء التقرير وإرساله.");
  };

  return (
    <div className="space-y-6">
      <CVUpload
        onComplete={(result) => {
          setUploadResult(result);
          setReport(null);
          setEvaluations([]);
          setSelectedQuestion(result.questions[0]?.id ?? null);
          setStatus("تم التحليل. اختر سؤالاً وسجّل إجابتك.");
        }}
      />

      {uploadResult && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                أسئلة مخصصة لك
              </p>
              <p className="text-xs text-slate-600">
                30% سهلة · 50% متوسطة · 20% صعبة — جاهزة لتسجيل إجابة فيديو.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {uploadResult.questions.map((q) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setSelectedQuestion(q.id)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                    selectedQuestion === q.id
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {q.difficulty} · {q.competency}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-[2fr,1fr]">
            <div className="space-y-2 rounded-xl border border-slate-100 p-4">
              <p className="text-sm font-semibold text-slate-900">
                السؤال المختار
              </p>
              <p className="text-sm text-slate-700">{selectedQuestionText}</p>
              <label className="mt-3 block text-xs font-semibold text-slate-700">
                حمّل فيديو الإجابة (WebM/MP4)
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                />
              </label>
              <Button
                type="button"
                onClick={handleEvaluate}
                disabled={loadingEval}
                className="mt-2"
              >
                {loadingEval ? "جاري التقييم..." : "قيّم الإجابة"}
              </Button>
            </div>

            <div className="rounded-xl border border-slate-100 p-4">
              <p className="text-sm font-semibold text-slate-900">
                التقييمات المسجلة
              </p>
              <div className="mt-2 space-y-2 text-sm text-slate-700">
                {evaluations.length === 0 ? (
                  <p className="text-xs text-slate-500">لم يتم تقييم أي إجابة بعد.</p>
                ) : (
                  evaluations.map((ev) => (
                    <div
                      key={ev.id}
                      className="rounded-lg border border-slate-100 p-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-800">
                          {ev.question.slice(0, 64)}...
                        </span>
                        <span className="text-sm font-bold text-indigo-600">
                          {ev.data.overallScore}/100
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        المحتوى {ev.data.contentScore} · الهيكل{" "}
                        {ev.data.structureScore} · التواصل{" "}
                        {ev.data.communicationScore} · التخصيص{" "}
                        {ev.data.personalizationScore}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-slate-600">
              بعد تقييم 1-2 إجابات، أنشئ تقرير Auto-Pilot الشامل.
            </p>
            <Button
              type="button"
              onClick={handleReport}
              disabled={loadingReport}
              variant="outline"
            >
              {loadingReport ? "جاري إنشاء التقرير..." : "إنشاء التقرير النهائي"}
            </Button>
          </div>
        </div>
      )}

      {uploadResult && (
        <ReportView
          analysis={uploadResult.analysis}
          questions={questions}
          evaluations={evaluations.map((ev) => ({
            ...ev.data,
            question: ev.question,
          }))}
          report={report}
        />
      )}

      {status && (
        <p className="text-sm font-semibold text-emerald-700">{status}</p>
      )}
    </div>
  );
}
