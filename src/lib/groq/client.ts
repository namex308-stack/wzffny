import Groq from "groq-sdk";

const apiKey = process.env.GROQ_API_KEY;
if (!apiKey) {
  throw new Error("Missing GROQ_API_KEY");
}

export const defaultGroqModel =
  process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile";

export const groqClient = new Groq({ apiKey });

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export async function groqJson<T>(
  messages: ChatMessage[],
  model = defaultGroqModel,
): Promise<T> {
  const completion = await groqClient.chat.completions.create({
    model,
    messages,
    temperature: 0.3,
    response_format: { type: "json_object" },
  });

  const raw = completion.choices[0]?.message?.content ?? "{}";
  try {
    return JSON.parse(raw) as T;
  } catch {
    return JSON.parse(
      raw.replace(/```json|```/g, "").trim() || "{}",
    ) as T;
  }
}
