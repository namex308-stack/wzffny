import { randomUUID } from "crypto";
import { groqJson } from "@/lib/groq/client";
import { questionPrompt } from "@/lib/groq/prompts/auto";
import type { CVAnalysis } from "./analyzeCV";

export type GeneratedQuestion = {
  id: string;
  prompt: string;
  difficulty: "easy" | "medium" | "difficult";
  competency: string;
};

type GroqQuestion = {
  id?: string;
  prompt?: string;
  difficulty?: "easy" | "medium" | "difficult";
  competency?: string;
};

type GroqResponse = { questions?: GroqQuestion[] };

const ensureDifficulty = (
  value: unknown,
): "easy" | "medium" | "difficult" => {
  if (value === "easy" || value === "medium" || value === "difficult") {
    return value;
  }
  return "medium";
};

const fallbackQuestion = (
  prompt: string,
  difficulty: "easy" | "medium" | "difficult",
  competency: string,
): GeneratedQuestion => ({
  id: randomUUID(),
  prompt,
  difficulty,
  competency,
});

export async function generateQuestions(
  analysis: CVAnalysis,
  options: { jobTitle?: string; count?: number } = {},
): Promise<GeneratedQuestion[]> {
  const count = options.count ?? 10;

  const result = await groqJson<GroqResponse>([
    { role: "system", content: questionPrompt },
    {
      role: "user",
      content: JSON.stringify({
        summary: analysis.summary,
        strengths: analysis.strengths,
        gaps: analysis.gaps,
        keywords: analysis.keywords,
        jobTitle: options.jobTitle ?? analysis.jobTitle,
        count,
      }),
    },
  ]);

  const questions =
    result.questions?.slice(0, count).map((q) => ({
      id: q.id ?? randomUUID(),
      prompt: q.prompt ?? "",
      difficulty: ensureDifficulty(q.difficulty),
      competency: q.competency ?? "general",
    })) ?? [];

  if (questions.length >= count * 0.6) {
    return questions;
  }

  const easyFallback = fallbackQuestion(
    "Walk me through a recent project and your specific role.",
    "easy",
    "experience",
  );
  const mediumFallback = fallbackQuestion(
    "Describe a time you resolved a stakeholder conflict and how you measured success.",
    "medium",
    "communication",
  );
  const difficultFallback = fallbackQuestion(
    "Tell me about a time you made a contrarian decision; how did you defend it and what was the outcome?",
    "difficult",
    "leadership",
  );

  return [
    easyFallback,
    mediumFallback,
    mediumFallback,
    difficultFallback,
  ].slice(0, count);
}
