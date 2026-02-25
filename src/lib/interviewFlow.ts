export type InterviewFlowStage =
  | "setup_pending"
  | "setup_complete"
  | "interview_in_progress"
  | "interview_complete";

export const INTERVIEW_FLOW_COOKIE = "interview_flow";
const MAX_AGE_SECONDS = 60 * 60 * 24; // 24 hours

export const parseInterviewFlowStage = (
  value?: string | null,
): InterviewFlowStage => {
  switch (value) {
    case "setup_complete":
    case "interview_in_progress":
    case "interview_complete":
      return value;
    default:
      return "setup_pending";
  }
};

export const readInterviewFlowStage = (
  cookieString?: string,
): InterviewFlowStage => {
  const source =
    cookieString ??
    (typeof document !== "undefined" ? document.cookie ?? "" : "");
  const match = source.match(
    new RegExp(`(?:^|; )${INTERVIEW_FLOW_COOKIE}=([^;]+)`),
  );
  const value = match ? decodeURIComponent(match[1]) : null;
  return parseInterviewFlowStage(value);
};

export const setInterviewFlowStage = (stage: InterviewFlowStage) => {
  if (typeof document === "undefined") return;
  document.cookie = `${INTERVIEW_FLOW_COOKIE}=${stage}; path=/; max-age=${MAX_AGE_SECONDS}; samesite=lax`;
};

export const clearInterviewFlowStage = () => {
  if (typeof document === "undefined") return;
  document.cookie = `${INTERVIEW_FLOW_COOKIE}=; path=/; max-age=0; samesite=lax`;
};
