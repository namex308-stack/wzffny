import { NextResponse } from "next/server";
import { evaluateAnswer } from "@/lib/auto/evaluateAnswer";
import { updateUsage } from "@/lib/auto/updateUsage";
import { supabaseAdmin, getUserFromRequest } from "@/lib/server/supabaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const bucket = process.env.SUPABASE_STORAGE_BUCKET ?? "interviews";

export async function POST(request: Request) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const video = formData.get("video");
  const question = formData.get("question")?.toString() ?? "";
  const jobTitle = formData.get("jobTitle")?.toString() ?? null;
  const questionSetId = formData.get("questionSetId")?.toString() ?? null;

  if (!(video instanceof File)) {
    return NextResponse.json(
      { error: "Missing video answer" },
      { status: 400 },
    );
  }

  const buffer = Buffer.from(await video.arrayBuffer());
  const storagePath = `${user.id}/answers/${Date.now()}-${video.name}`;
  const { error: uploadError } = await supabaseAdmin.storage
    .from(bucket)
    .upload(storagePath, buffer, {
      contentType: video.type || "video/webm",
      upsert: true,
    });

  if (uploadError) {
    return NextResponse.json(
      { error: "Failed to store video" },
      { status: 500 },
    );
  }

  const evaluation = await evaluateAnswer({
    file: video,
    question,
    jobTitle,
  });

  const { data: evalRow, error } = await supabaseAdmin
    .from("answer_evaluations")
    .insert({
      user_id: user.id,
      question_set_id: questionSetId,
      question,
      transcript: evaluation.transcript,
      content_score: evaluation.contentScore,
      structure_score: evaluation.structureScore,
      communication_score: evaluation.communicationScore,
      personalization_score: evaluation.personalizationScore,
      overall_score: evaluation.overallScore,
      feedback: evaluation.feedback,
      video_path: storagePath,
    })
    .select("id")
    .single();

  if (error || !evalRow) {
    return NextResponse.json(
      { error: "Failed to persist evaluation" },
      { status: 500 },
    );
  }

  await updateUsage(user.id, { videoAnswers: 1 });

  return NextResponse.json({
    evaluationId: evalRow.id,
    evaluation,
    videoPath: storagePath,
  });
}
