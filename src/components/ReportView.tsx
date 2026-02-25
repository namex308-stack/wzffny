"use client";

import type { CVAnalysis } from "@/lib/auto/analyzeCV";
import type { GeneratedQuestion } from "@/lib/auto/generateQuestions";
import type { InterviewReport } from "@/lib/auto/generateReport";
import type { AnswerEvaluation } from "@/lib/auto/evaluateAnswer";

type Props = {
  analysis: CVAnalysis;
  questions: GeneratedQuestion[];
  evaluations?: Array<AnswerEvaluation & { question?: string }>;
  report?: InterviewReport | null;
};

const Pill = ({ children }: { children: string }) => (
  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
    {children}
  </span>
);

export function ReportView({
  analysis,
  questions,
  evaluations = [],
  report,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-900">ATS Score</p>
          <span className="text-lg font-bold text-indigo-600">
            {analysis.atsScore}/100
          </span>
        </div>
        <p className="mt-2 text-sm text-slate-600">{analysis.summary}</p>
        <div className="mt-4 space-y-2">
          <p className="text-xs font-semibold text-slate-700">Keywords</p>
          <div className="flex flex-wrap gap-2">
            {analysis.keywords.matched.slice(0, 6).map((kw) => (
              <Pill key={kw}>{kw}</Pill>
            ))}
          </div>
          {analysis.keywords.missing.length > 0 && (
            <p className="text-xs text-amber-600">
              Missing: {analysis.keywords.missing.slice(0, 6).join(", ")}
            </p>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold text-slate-900">
          Strengths & Gaps
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold text-emerald-700">Strengths</p>
            <ul className="mt-1 space-y-1 text-sm text-slate-700">
              {analysis.strengths.slice(0, 4).map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-amber-700">Gaps</p>
            <ul className="mt-1 space-y-1 text-sm text-slate-700">
              {analysis.gaps.slice(0, 4).map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold text-slate-900">Questions</p>
        <div className="mt-3 space-y-2 text-sm text-slate-700">
          {questions.slice(0, 6).map((q) => (
            <div key={q.id} className="rounded-lg border border-slate-100 p-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{q.prompt}</span>
                <Pill>{q.difficulty}</Pill>
              </div>
              <p className="text-xs text-slate-500">{q.competency}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold text-slate-900">Answer Quality</p>
        {evaluations.length === 0 ? (
          <p className="text-sm text-slate-600">
            حمّل إجابة فيديو لتحصل على تقييم فوري.
          </p>
        ) : (
          <div className="mt-2 space-y-3">
            {evaluations.map((ev) => (
              <div key={ev.question ?? ev.transcript} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-800">
                    {ev.question || "إجابة"}
                  </span>
                  <span className="text-sm font-bold text-indigo-600">
                    {ev.overallScore}/100
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  المحتوى {ev.contentScore} · الهيكل {ev.structureScore} ·
                  التواصل {ev.communicationScore} · التخصيص{" "}
                  {ev.personalizationScore}
                </p>
                <p className="text-xs text-slate-600">
                  {ev.feedback.improveNext?.[0] ??
                    ev.feedback.whatWorked?.[0] ??
                    "تم التقييم."}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {report && (
        <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900">
              تقرير Auto-Pilot النهائي
            </p>
            <span className="text-lg font-bold text-emerald-600">
              {report.confidenceScore}/100
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-700">
            {report.executiveSummary}
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold text-slate-700">Strengths</p>
              <ul className="mt-1 space-y-1 text-sm text-slate-700">
                {report.strengths.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-700">
                Areas to Improve
              </p>
              <ul className="mt-1 space-y-1 text-sm text-slate-700">
                {report.areasToImprove.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-700">
                Prioritized Actions
              </p>
              <ol className="mt-1 space-y-1 text-sm text-slate-700">
                {report.prioritizedActions.map((item, index) => (
                  <li key={item}>
                    {index + 1}. {item}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
