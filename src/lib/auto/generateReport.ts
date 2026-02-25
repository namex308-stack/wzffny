import { groqJson } from "@/lib/groq/client";
import { reportPrompt } from "@/lib/groq/prompts/auto";
import type { CVAnalysis } from "./analyzeCV";
import type { GeneratedQuestion } from "./generateQuestions";
import type { AnswerEvaluation } from "./evaluateAnswer";

export type InterviewReport = {
  executiveSummary: string;
  strengths: string[];
  areasToImprove: string[];
  prioritizedActions: string[];
  keywordGaps: string[];
  confidenceScore: number;
};

type GroqResponse = {
  executive_summary?: string;
  strengths?: string[];
  areas_to_improve?: string[];
  prioritized_actions?: string[];
  keyword_gaps?: string[];
  confidence_score?: number;
};

const coerceNumber = (value: unknown, fallback = 65) => {
  const num = typeof value === "number" ? value : Number(value);
  if (Number.isFinite(num)) {
    return Math.min(100, Math.max(0, Math.round(num)));
  }
  return fallback;
};

const coerceList = (value: unknown) =>
  Array.isArray(value) ? value.map((v) => String(v)) : [];

export async function generateReport(params: {
  analysis: CVAnalysis;
  questions: GeneratedQuestion[];
  evaluations: Array<
    AnswerEvaluation & { question?: string; difficulty?: string }
  >;
}): Promise<InterviewReport> {
  const response = await groqJson<GroqResponse>([
    { role: "system", content: reportPrompt },
    {
      role: "user",
      content: JSON.stringify({
        analysis: params.analysis,
        questions: params.questions,
        evaluations: params.evaluations.map((ev) => ({
          question: ev.question ?? "",
          overallScore: ev.overallScore,
          feedback: ev.feedback,
        })),
      }),
    },
  ]);

  return {
    executiveSummary: response.executive_summary ?? "",
    strengths: coerceList(response.strengths),
    areasToImprove: coerceList(response.areas_to_improve),
    prioritizedActions: coerceList(response.prioritized_actions),
    keywordGaps: coerceList(response.keyword_gaps),
    confidenceScore: coerceNumber(response.confidence_score),
  };
}
