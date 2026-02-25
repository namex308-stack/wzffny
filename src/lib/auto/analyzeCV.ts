import { groqJson } from "@/lib/groq/client";
import { cvAnalysisPrompt } from "@/lib/groq/prompts/auto";

export type CVAnalysis = {
  atsScore: number;
  summary: string;
  strengths: string[];
  gaps: string[];
  keywords: { matched: string[]; missing: string[] };
  errors: string[];
  tailoredCopy: { headline: string; summary: string; achievements: string[] };
  nextSteps: string[];
  jobTitle?: string | null;
  jobDescription?: string | null;
};

type GroqResponse = {
  ats_score?: number;
  summary?: string;
  strengths?: string[];
  gaps?: string[];
  keywords?: { matched?: string[]; missing?: string[] };
  errors?: string[];
  tailored_copy?: {
    headline?: string;
    summary?: string;
    achievements?: string[];
  };
  next_steps?: string[];
};

const coerceNumber = (value: unknown, fallback = 65) => {
  const num = typeof value === "number" ? value : Number(value);
  if (Number.isFinite(num)) {
    return Math.min(100, Math.max(0, Math.round(num)));
  }
  return fallback;
};

const coerceStringArray = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item)).filter(Boolean);
  }
  return [];
};

export async function analyzeCV(
  cvText: string,
  options: { jobTitle?: string; jobDescription?: string; fileName?: string } = {},
): Promise<CVAnalysis> {
  const trimmed = cvText.slice(0, 12000);

  const result = await groqJson<GroqResponse>([
    { role: "system", content: cvAnalysisPrompt },
    {
      role: "user",
      content: JSON.stringify({
        cvText: trimmed,
        jobTitle: options.jobTitle ?? null,
        jobDescription: options.jobDescription ?? null,
        fileName: options.fileName ?? null,
      }),
    },
  ]);

  return {
    atsScore: coerceNumber(result.ats_score),
    summary: result.summary ?? "",
    strengths: coerceStringArray(result.strengths),
    gaps: coerceStringArray(result.gaps),
    keywords: {
      matched: coerceStringArray(result.keywords?.matched),
      missing: coerceStringArray(result.keywords?.missing),
    },
    errors: coerceStringArray(result.errors),
    tailoredCopy: {
      headline: result.tailored_copy?.headline ?? "",
      summary: result.tailored_copy?.summary ?? "",
      achievements: coerceStringArray(result.tailored_copy?.achievements),
    },
    nextSteps: coerceStringArray(result.next_steps),
    jobTitle: options.jobTitle ?? null,
    jobDescription: options.jobDescription ?? null,
  };
}
