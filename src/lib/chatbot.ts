import type { Locale } from "@/lib/i18n";

export type ChatIntentId =
  | "pricing"
  | "features"
  | "resume"
  | "practice"
  | "ai-feedback"
  | "support"
  | "privacy";

export type ChatQuickReply = { id: ChatIntentId; label: string };

export type ChatUiContent = {
  assistantName: string;
  assistantTitle: string;
  intro: string;
  placeholder: string;
  sendLabel: string;
  openLabel: string;
  closeLabel: string;
  typingLabel: string;
  quickReplies: ChatQuickReply[];
  fallback: string;
};

export const CHAT_INTENT_KEYWORDS: Record<ChatIntentId, string[]> = {
  pricing: [
    "pricing",
    "price",
    "cost",
    "plan",
    "plans",
    "subscription",
    "billing",
    "upgrade",
    "downgrade",
    "cancel",
    "trial",
    "free",
    "paid",
    "الأسعار",
    "السعر",
    "خطة",
    "خطط",
    "اشتراك",
    "اشتراكات",
    "الاشتراك",
    "الفوترة",
    "ترقية",
    "تجربة",
    "مجاني",
    "إلغاء",
  ],
  features: [
    "feature",
    "features",
    "capabilities",
    "what does",
    "offer",
    "product",
    "مميزات",
    "الميزة",
    "المميزات",
    "يقدم",
    "ميزات",
    "المنتج",
  ],
  resume: [
    "resume",
    "cv",
    "c.v",
    "resume review",
    "resume optimization",
    "سيرة",
    "السيرة",
    "السيرة الذاتية",
    "مراجعة السيرة",
    "cv",
    "سي في",
  ],
  practice: [
    "interview",
    "practice",
    "mock",
    "session",
    "training",
    "مقابلة",
    "مقابلات",
    "تدريب",
    "تدرّب",
    "محاكاة",
    "جلسة",
  ],
  "ai-feedback": [
    "ai feedback",
    "feedback",
    "report",
    "analysis",
    "insights",
    "ملاحظات",
    "تقرير",
    "تحليل",
    "ذكاء",
  ],
  support: [
    "support",
    "contact",
    "help",
    "help center",
    "email",
    "team",
    "تواصل",
    "الدعم",
    "مساعدة",
    "مركز المساعدة",
    "راسل",
    "اتصل",
    "البريد",
  ],
  privacy: [
    "privacy",
    "data",
    "security",
    "private",
    "terms",
    "policy",
    "الخصوصية",
    "البيانات",
    "أمان",
    "سياسة",
    "الشروط",
  ],
};

const chatUiEn: ChatUiContent = {
  assistantName: "wzzfny Assistant",
  assistantTitle: "Friendly help in English or Arabic.",
  intro:
    "Hi! I’m here to help with pricing, features, and getting started. What can I answer for you?",
  placeholder: "Type your question...",
  sendLabel: "Send",
  openLabel: "Chat with us",
  closeLabel: "Close chat",
  typingLabel: "Typing…",
  quickReplies: [
    { id: "pricing", label: "Pricing" },
    { id: "features", label: "Features" },
    { id: "resume", label: "Resume review" },
    { id: "practice", label: "Interview practice" },
    { id: "support", label: "Contact support" },
  ],
  fallback:
    "I’m not sure I caught that. Want help with pricing, features, or support?",
};

const chatUiAr: ChatUiContent = {
  assistantName: "مساعد wzzfny",
  assistantTitle: "دعم ودود بالعربية والإنجليزية.",
  intro:
    "أهلاً! أنا هنا للمساعدة في الأسعار والمميزات والبدء السريع. كيف أقدر أساعدك؟",
  placeholder: "اكتب سؤالك...",
  sendLabel: "إرسال",
  openLabel: "تحدث معنا",
  closeLabel: "إغلاق المحادثة",
  typingLabel: "يكتب الآن…",
  quickReplies: [
    { id: "pricing", label: "الأسعار" },
    { id: "features", label: "المميزات" },
    { id: "resume", label: "مراجعة السيرة الذاتية" },
    { id: "practice", label: "تدريب المقابلات" },
    { id: "support", label: "تواصل مع الدعم" },
  ],
  fallback:
    "لم أفهم السؤال تمامًا. هل تحب معلومات عن الأسعار أو المميزات أو الدعم؟",
};

export const getChatUiContent = (locale: Locale): ChatUiContent =>
  locale === "ar" ? chatUiAr : chatUiEn;

