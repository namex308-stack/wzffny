import type { InterviewReport } from "@/lib/auto/generateReport";

type SendParams = {
  to: string;
  report: InterviewReport;
  downloadUrl?: string | null;
  senderName?: string;
};

const buildHtml = (report: InterviewReport, downloadUrl?: string | null) => `
  <h2>Interview Readiness Report</h2>
  <p><strong>Confidence:</strong> ${report.confidenceScore}/100</p>
  <p>${report.executiveSummary}</p>
  <h3>Strengths</h3>
  <ul>${report.strengths.map((s) => `<li>${s}</li>`).join("")}</ul>
  <h3>Areas to Improve</h3>
  <ul>${report.areasToImprove.map((s) => `<li>${s}</li>`).join("")}</ul>
  <h3>Next Actions</h3>
  <ol>${report.prioritizedActions.map((s) => `<li>${s}</li>`).join("")}</ol>
  ${downloadUrl ? `<p>Download full report: <a href="${downloadUrl}">${downloadUrl}</a></p>` : ""}
`;

export async function sendReportEmail({
  to,
  report,
  downloadUrl,
  senderName,
}: SendParams) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.REPORT_SENDER_EMAIL || process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    return { sent: false, reason: "missing_config" as const };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${senderName ?? "Wzffny Auto-Pilot"} <${fromEmail}>`,
      to,
      subject: "Your interview report is ready",
      html: buildHtml(report, downloadUrl),
    }),
  });

  if (!response.ok) {
    return { sent: false, reason: "send_failed" as const };
  }

  const data = (await response.json()) as { id?: string };
  return { sent: true, id: data.id ?? null };
}
