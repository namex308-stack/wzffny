import OpenAI from "openai";
import { toFile } from "openai/uploads";
import { groqJson } from "@/lib/groq/client";
import { evaluationPrompt } from "@/lib/groq/prompts/auto";

export type AnswerEvaluation = {
  transcript: string;
  contentScore: number;
  structureScore: number;
  communicationScore: number;
  personalizationScore: number;
  overallScore: number;
  feedback: {
    whatWorked: string[];
    improveNext: string[];
    realWorldExamples: string[];
  };
};

type GroqResponse = {
  content_score?: number;
  structure_score?: number;
  communication_score?: number;
  personalization_score?: number;
  overall_score?: number;
  feedback?: {
    what_worked?: string[];
    improve_next?: string[];
    real_world_examples?: string[];
  };
};

const openaiApiKey = process.env.OPENAI_API_KEY;
const whisperModel = process.env.OPENAI_WHISPER_MODEL ?? "whisper-1";
const openai = openaiApiKey ? new OpenAI({ apiKey: openaiApiKey }) : null;

const coerce = (value: unknown, fallback: number) => {
  const num = typeof value === "number" ? value : Number(value);
  if (Number.isFinite(num)) {
    return Math.min(100, Math.max(0, Math.round(num)));
  }
  return fallback;
};

const coerceList = (value: unknown) =>
  Array.isArray(value) ? value.map((v) => String(v)) : [];

const weightedOverall = (scores: {
  content: number;
  structure: number;
  communication: number;
  personalization: number;
}) =>
  Math.round(
    scores.content * 0.4 +
      scores.structure * 0.25 +
      scores.communication * 0.2 +
      scores.personalization * 0.15,
  );

async function transcribe(file: File, mimeType?: string) {
  if (!openai) {
    return { transcript: "", model: "none" };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const preparedFile = await toFile(
    buffer,
    file.name || "answer.webm",
    { type: mimeType ?? file.type ?? "audio/webm" },
  );

  const result = await openai.audio.transcriptions.create({
    file: preparedFile,
    model: whisperModel,
    language: "en",
    response_format: "text",
  });

  return { transcript: result?.trim() ?? "", model: whisperModel };
}

export async function evaluateAnswer(params: {
  file: File;
  question: string;
  jobTitle?: string | null;
}): Promise<AnswerEvaluation> {
  const transcription = await transcribe(params.file, params.file.type);

  const groqResult = await groqJson<GroqResponse>([
    { role: "system", content: evaluationPrompt },
    {
      role: "user",
      content: JSON.stringify({
        transcript: transcription.transcript,
        question: params.question,
        jobTitle: params.jobTitle ?? null,
      }),
    },
  ]);

  const contentScore = coerce(groqResult.content_score, 60);
  const structureScore = coerce(groqResult.structure_score, 60);
  const communicationScore = coerce(groqResult.communication_score, 60);
  const personalizationScore = coerce(groqResult.personalization_score, 60);

  return {
    transcript: transcription.transcript,
    contentScore,
    structureScore,
    communicationScore,
    personalizationScore,
    overallScore:
      coerce(groqResult.overall_score, -1) > -1
        ? coerce(groqResult.overall_score, 60)
        : weightedOverall({
            content: contentScore,
            structure: structureScore,
            communication: communicationScore,
            personalization: personalizationScore,
          }),
    feedback: {
      whatWorked: coerceList(groqResult.feedback?.what_worked),
      improveNext: coerceList(groqResult.feedback?.improve_next),
      realWorldExamples: coerceList(groqResult.feedback?.real_world_examples),
    },
  };
}
