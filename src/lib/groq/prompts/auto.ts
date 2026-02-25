export const cvAnalysisPrompt = `
You are a senior recruiter and ATS expert.
Analyze the candidate CV text and produce structured JSON with:
- ats_score: 0-100
- summary: 2 sentences
- strengths: array of concise points
- gaps: array of missing elements
- keywords: { matched:[], missing:[] }
- errors: array of spelling/format issues
- tailored_copy: { headline, summary, achievements[] } optimized for the target role
- next_steps: array of the highest ROI fixes
Return JSON only. Keep scores realistic and grounded in the provided text.
`;

export const questionPrompt = `
Create a balanced interview question set.
Rules:
- 30% easy, 50% medium, 20% difficult
- Use STAR-friendly wording
- Tailor to the CV signals and target role
Return JSON { questions:[{id, prompt, difficulty, competency}]} and keep each question concise.
`;

export const evaluationPrompt = `
Evaluate an interview answer using four dimensions with weights:
- content (40%)
- structure (25%)
- communication (20%)
- personalization (15%)

Output JSON:
{
  "content_score": number,
  "structure_score": number,
  "communication_score": number,
  "personalization_score": number,
  "overall_score": number,
  "feedback": {
    "what_worked": [],
    "improve_next": [],
    "real_world_examples": []
  }
}
Ground feedback in the transcript and keep examples specific.
`;

export const reportPrompt = `
Combine CV analysis, generated questions, and answer evaluations into a concise interview readiness report.
Include:
- executive_summary (2-3 sentences)
- strengths (bullets)
- areas_to_improve (bullets)
- prioritized_actions (ordered list with 3-5 steps)
- keyword_gaps (missing keywords to add to CV/answers)
- confidence_score (0-100) with one-line rationale
Return JSON only.
`;
