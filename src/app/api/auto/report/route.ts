import { NextResponse } from "next/server";
import { generateReport } from "@/lib/auto/generateReport";
import type { CVAnalysis } from "@/lib/auto/analyzeCV";
import type { GeneratedQuestion } from "@/lib/auto/generateQuestions";
import type { AnswerEvaluation } from "@/lib/auto/evaluateAnswer";
import { sendReportEmail } from "@/lib/email/sendReport";
import { updateUsage } from "@/lib/auto/updateUsage";
import { supabaseAdmin, getUserFromRequest } from "@/lib/server/supabaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: Request) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const cvAnalysisId = body?.cvAnalysisId as string | undefined;
  const questionSetId = body?.questionSetId as string | undefined;
  const evaluationIds = (body?.evaluationIds ?? []) as string[];
  const sendEmail = Boolean(body?.sendEmail);
  const toEmail = (body?.email as string | undefined) ?? user.email;

  if (!cvAnalysisId) {
    return NextResponse.json(
      { error: "cvAnalysisId is required" },
      { status: 400 },
    );
  }

  const { data: cv } = await supabaseAdmin
    .from("cv_analyses")
    .select("*")
    .eq("id", cvAnalysisId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!cv) {
    return NextResponse.json({ error: "CV analysis not found" }, { status: 404 });
  }

  const cvAnalysis: CVAnalysis = {
    atsScore: cv.ats_score ?? 0,
    summary: cv.summary ?? "",
    strengths: cv.strengths ?? [],
    gaps: cv.gaps ?? [],
    keywords: cv.keywords ?? { matched: [], missing: [] },
    errors: cv.errors ?? [],
    tailoredCopy: cv.tailored_copy ?? {
      headline: "",
      summary: "",
      achievements: [],
    },
    nextSteps: cv.next_steps ?? [],
    jobTitle: cv.job_title,
    jobDescription: cv.job_description,
  };

  const { data: questionSet } = await supabaseAdmin
    .from("generated_questions")
    .select("*")
    .eq("user_id", user.id)
    .eq("id", questionSetId ?? cv.question_set_id ?? "")
    .maybeSingle();

  const questions = (questionSet?.questions ?? []) as GeneratedQuestion[];

  let evaluationQuery = supabaseAdmin
    .from("answer_evaluations")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (evaluationIds.length > 0) {
    evaluationQuery = evaluationQuery.in("id", evaluationIds);
  } else if (questionSetId) {
    evaluationQuery = evaluationQuery.eq("question_set_id", questionSetId);
  }

  const { data: evaluationRows } = await evaluationQuery;

  const evaluations: Array<
    AnswerEvaluation & { id: string; question?: string; difficulty?: string }
  > =
    evaluationRows?.map((row) => ({
      id: row.id,
      question: row.question ?? "",
      transcript: row.transcript ?? "",
      contentScore: row.content_score ?? 0,
      structureScore: row.structure_score ?? 0,
      communicationScore: row.communication_score ?? 0,
      personalizationScore: row.personalization_score ?? 0,
      overallScore: row.overall_score ?? 0,
      feedback: row.feedback ?? {
        whatWorked: [],
        improveNext: [],
        realWorldExamples: [],
      },
    })) ?? [];

  const report = await generateReport({
    analysis: cvAnalysis,
    questions,
    evaluations,
  });

  const { data: reportRow, error } = await supabaseAdmin
    .from("interview_reports")
    .insert({
      user_id: user.id,
      cv_analysis_id: cvAnalysisId,
      question_set_id: questionSet?.id ?? questionSetId ?? null,
      evaluation_ids: evaluations.map((ev) => ev.id),
      report,
      summary: report.executiveSummary,
      recommendations: report.prioritizedActions,
    })
    .select("id")
    .single();

  if (error || !reportRow) {
    return NextResponse.json(
      { error: "Failed to save report" },
      { status: 500 },
    );
  }

  if (sendEmail && toEmail) {
    await sendReportEmail({
      to: toEmail,
      report,
      senderName: "Wzffny Auto-Pilot",
    });
  }

  await updateUsage(user.id, { interviewsCompleted: 1 });

  return NextResponse.json({
    reportId: reportRow.id,
    report,
  });
}
