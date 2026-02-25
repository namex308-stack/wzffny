import { supabaseAdmin } from "@/lib/server/supabaseAdmin";

type UsageDelta = {
  resumeUploads?: number;
  videoAnswers?: number;
  interviewsCompleted?: number;
};

const startOfMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 1)
    .toISOString()
    .slice(0, 10);

const startOfNextMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 1)
    .toISOString()
    .slice(0, 10);

export async function updateUsage(userId: string, delta: UsageDelta) {
  const now = new Date();
  const periodStart = startOfMonth(now);
  const periodEnd = startOfNextMonth(now);

  const resumeUploads = delta.resumeUploads ?? 0;
  const videoAnswers = delta.videoAnswers ?? 0;
  const interviewsCompleted = delta.interviewsCompleted ?? 0;

  const { error: rpcError } = await supabaseAdmin.rpc("increment_usage", {
    p_user_id: userId,
    p_resume_uploads: resumeUploads,
    p_video_answers: videoAnswers,
    p_interviews_completed: interviewsCompleted,
  });

  if (!rpcError) {
    return;
  }

  await supabaseAdmin.from("usage_counters").upsert(
    {
      user_id: userId,
      period_start: periodStart,
      period_end: periodEnd,
    },
    { onConflict: "user_id,period_start" },
  );

  const { data } = await supabaseAdmin
    .from("usage_counters")
    .select(
      "practice_sessions, video_answers, resume_uploads, interviews_completed",
    )
    .eq("user_id", userId)
    .eq("period_start", periodStart)
    .maybeSingle();

  if (!data) {
    return;
  }

  await supabaseAdmin
    .from("usage_counters")
    .update({
      resume_uploads: data.resume_uploads + resumeUploads,
      video_answers: data.video_answers + videoAnswers,
      interviews_completed: data.interviews_completed + interviewsCompleted,
    })
    .eq("user_id", userId)
    .eq("period_start", periodStart);
}
