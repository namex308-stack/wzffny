import { NextResponse } from "next/server";
import { analyzeCV } from "@/lib/auto/analyzeCV";
import { extractCV } from "@/lib/auto/extractCV";
import { generateQuestions } from "@/lib/auto/generateQuestions";
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

  const formData = await request.formData();
  const file = formData.get("file");
  const jobTitle = formData.get("jobTitle")?.toString();
  const jobDescription = formData.get("jobDescription")?.toString();

  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "Missing CV file" },
      { status: 400 },
    );
  }

  const extracted = await extractCV(file);
  const analysis = await analyzeCV(extracted.text, {
    jobTitle,
    jobDescription,
    fileName: file.name,
  });

  const { data: cvRow, error: cvError } = await supabaseAdmin
    .from("cv_analyses")
    .insert({
      user_id: user.id,
      file_name: file.name,
      file_type: file.type,
      source_type: extracted.sourceType,
      text: extracted.text,
      summary: analysis.summary,
      ats_score: analysis.atsScore,
      strengths: analysis.strengths,
      gaps: analysis.gaps,
      keywords: analysis.keywords,
      errors: analysis.errors,
      tailored_copy: analysis.tailoredCopy,
      next_steps: analysis.nextSteps,
      job_title: analysis.jobTitle,
      job_description: analysis.jobDescription,
    })
    .select("id")
    .single();

  if (cvError || !cvRow) {
    return NextResponse.json(
      { error: "Failed to store CV analysis" },
      { status: 500 },
    );
  }

  const questions = await generateQuestions(analysis, { jobTitle, count: 10 });

  const { data: questionRow } = await supabaseAdmin
    .from("generated_questions")
    .insert({
      user_id: user.id,
      cv_analysis_id: cvRow.id,
      questions,
    })
    .select("id")
    .single();

  if (questionRow?.id) {
    await supabaseAdmin
      .from("cv_analyses")
      .update({ question_set_id: questionRow.id })
      .eq("id", cvRow.id);
  }

  await updateUsage(user.id, { resumeUploads: 1 });

  return NextResponse.json({
    cvAnalysisId: cvRow.id,
    questionSetId: questionRow?.id ?? null,
    analysis,
    extracted,
    questions,
  });
}
