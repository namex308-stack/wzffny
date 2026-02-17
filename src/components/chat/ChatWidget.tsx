"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { MessageCircle, Send, X } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { getSiteContent } from "@/lib/siteContent";
import {
  CHAT_INTENT_KEYWORDS,
  getChatUiContent,
  type ChatIntentId,
} from "@/lib/chatbot";

type ChatLink = { label: string; href: string };

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
  links?: ChatLink[];
};

const intentOrder: ChatIntentId[] = [
  "ai-feedback",
  "resume",
  "practice",
  "pricing",
  "privacy",
  "support",
  "features",
];

const buildId = (prefix: string) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export function ChatWidget() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  const ui = getChatUiContent(locale);
  const content = getSiteContent(locale);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    { id: "intro", role: "assistant", text: ui.intro },
  ]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setMessages([{ id: "intro", role: "assistant", text: ui.intro }]);
  }, [locale, ui.intro]);

  useEffect(() => {
    if (!open) return;
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, isThinking]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const fallbackLinks: ChatLink[] = useMemo(
    () => [
      { label: isArabic ? "الأسعار" : "Pricing", href: "/pricing" },
      { label: isArabic ? "المميزات" : "Features", href: "/#features" },
      { label: isArabic ? "تواصل معنا" : "Contact", href: "/contact" },
    ],
    [isArabic],
  );

  const responseMap = useMemo(() => {
    const pricingLines = [
      isArabic ? "ملخص سريع للخطط:" : "Here’s a quick overview of our plans:",
      ...content.pricing.map(
        (plan) => {
          const secondary =
            plan.secondaryPrice && plan.secondaryPeriod
              ? isArabic
                ? ` (أو ${plan.secondaryPrice} / ${plan.secondaryPeriod})`
                : ` (or ${plan.secondaryPrice} / ${plan.secondaryPeriod})`
              : "";
          return `• ${plan.name}: ${plan.price} / ${plan.period}${secondary} — ${plan.description}`;
        },
      ),
      isArabic
        ? "يمكنك الترقية أو الإلغاء في أي وقت من لوحة التحكم."
        : "You can upgrade or cancel anytime from your dashboard.",
    ];

    const featureLines = [
      isArabic ? "أبرز المميزات:" : "Top features:",
      ...content.features.slice(0, 3).map(
        (feature) => `• ${feature.title} — ${feature.description}`,
      ),
      isArabic
        ? "هل ترغب في رؤية كل المميزات؟"
        : "Want the full list of features?",
    ];

    const practiceLines = [
      isArabic ? "هكذا تعمل الجلسة عادة:" : "Here’s how a session works:",
      ...content.howItWorks.slice(0, 3).map(
        (step) => `• ${step.title} — ${step.description}`,
      ),
      isArabic
        ? "يمكنك البدء من صفحة تدريب المقابلات."
        : "You can start from the interview practice page.",
    ];

    const aiFaq = content.faqs[0];
    const aiLines = [
      aiFaq?.answer ??
        (isArabic
          ? "تحصل على تقرير مفصل بعد كل إجابة حول الوضوح والبنية والنبرة."
          : "You’ll get a detailed report after each answer on clarity, structure, and delivery."),
      isArabic
        ? "هل تريد الاطلاع على صفحة الملاحظات بالذكاء الاصطناعي؟"
        : "Want to explore the AI feedback page?",
    ];

    const resumeFeature =
      content.features.find((feature) => feature.icon === "FileText") ??
      content.features[3];
    const resumeLines = [
      resumeFeature
        ? `${resumeFeature.title}: ${resumeFeature.description}`
        : isArabic
          ? "نوفر مراجعة وتحسينًا للسيرة الذاتية."
          : "We offer resume review and optimization.",
      isArabic
        ? "ندعم ملفات PDF وDOCX مع تحسينات للكلمات المفتاحية والأثر."
        : "We support PDF and DOCX files with keyword and impact improvements.",
    ];

    const privacyFaq =
      content.faqs.find((faq) =>
        faq.question
          .toLowerCase()
          .includes(isArabic ? "الفيديو" : "video"),
      ) ?? content.faqs[4];
    const privacyLines = [
      privacyFaq?.answer ??
        (isArabic
          ? "بياناتك خاصة وآمنة افتراضيًا."
          : "Your data is private and secure by default."),
      isArabic
        ? "يمكنك مراجعة سياسة الخصوصية لمعرفة التفاصيل."
        : "You can review our privacy policy for more details.",
    ];

    const supportLines = [
      isArabic ? "يسعدنا مساعدتك!" : "Happy to help!",
      isArabic
        ? "راسلنا على support@wzzfny.ai أو استخدم صفحة التواصل."
        : "Email support@wzzfny.ai or use the contact page.",
      isArabic
        ? "نرد عادة خلال يومي عمل."
        : "We typically reply within two business days.",
    ];

    return {
      pricing: {
        text: pricingLines.join("\n"),
        links: [
          {
            label: isArabic ? "عرض الأسعار" : "View pricing",
            href: "/pricing",
          },
          { label: isArabic ? "ابدأ مجانًا" : "Start free", href: "/signup" },
        ],
      },
      features: {
        text: featureLines.join("\n"),
        links: [
          { label: isArabic ? "كل المميزات" : "All features", href: "/#features" },
          { label: isArabic ? "كيف يعمل" : "How it works", href: "/#how-it-works" },
        ],
      },
      practice: {
        text: practiceLines.join("\n"),
        links: [
          {
            label: isArabic ? "تدريب المقابلات" : "Interview practice",
            href: "/interview-practice",
          },
          { label: isArabic ? "ابدأ الآن" : "Start now", href: "/signup" },
        ],
      },
      "ai-feedback": {
        text: aiLines.join("\n"),
        links: [
          {
            label: isArabic ? "ملاحظات الذكاء الاصطناعي" : "AI feedback",
            href: "/ai-feedback",
          },
        ],
      },
      resume: {
        text: resumeLines.join("\n"),
        links: [
          {
            label: isArabic ? "مراجعة السيرة الذاتية" : "Resume review",
            href: "/resume-review",
          },
        ],
      },
      support: {
        text: supportLines.join("\n"),
        links: [
          { label: isArabic ? "صفحة التواصل" : "Contact page", href: "/contact" },
          { label: isArabic ? "مركز المساعدة" : "Help center", href: "/help-center" },
        ],
      },
      privacy: {
        text: privacyLines.join("\n"),
        links: [
          {
            label: isArabic ? "سياسة الخصوصية" : "Privacy policy",
            href: "/privacy-policy",
          },
          {
            label: isArabic ? "شروط الخدمة" : "Terms of service",
            href: "/terms-of-service",
          },
        ],
      },
    };
  }, [content, isArabic]);

  const resolveIntent = (message: string): ChatIntentId | null => {
    const normalized = message.toLowerCase();
    for (const intent of intentOrder) {
      const keywords = CHAT_INTENT_KEYWORDS[intent];
      if (keywords.some((keyword) => normalized.includes(keyword.toLowerCase()))) {
        return intent;
      }
    }
    return null;
  };

  const pushAssistantMessage = (intent: ChatIntentId | null) => {
    const response = intent ? responseMap[intent] : null;
    const message: ChatMessage = {
      id: buildId("assistant"),
      role: "assistant",
      text: response?.text ?? ui.fallback,
      links: response?.links ?? fallbackLinks,
    };
    setMessages((prev) => [...prev, message]);
  };

  const handleSend = (value: string, intentOverride?: ChatIntentId) => {
    const trimmed = value.trim();
    if (!trimmed || isThinking) return;
    setMessages((prev) => [
      ...prev,
      { id: buildId("user"), role: "user", text: trimmed },
    ]);
    setInput("");
    setIsThinking(true);
    const resolved = intentOverride ?? resolveIntent(trimmed);
    window.setTimeout(() => {
      pushAssistantMessage(resolved);
      setIsThinking(false);
    }, 320);
  };

  const positionClass = isArabic ? "left-6" : "right-6";

  return (
    <div className="fixed bottom-6 z-50" style={{ pointerEvents: "none" }}>
      {!open ? (
        <button
          type="button"
          aria-label={ui.openLabel}
          onClick={() => setOpen(true)}
          className={`pointer-events-auto ${positionClass} fixed bottom-6 flex items-center gap-2 rounded-full border border-[color:var(--brand-200)] bg-white/95 px-4 py-3 text-sm font-semibold text-[color:var(--brand-700)] shadow-lg backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[color:var(--brand-600)]`}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <MessageCircle size={18} />
          <span className="hidden sm:inline">{ui.openLabel}</span>
        </button>
      ) : null}

      {open ? (
        <div
          dir={isArabic ? "rtl" : "ltr"}
          className={`pointer-events-auto ${positionClass} fixed bottom-6 w-[min(92vw,360px)] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl`}
        >
          <div className="flex items-center justify-between bg-gradient-to-r from-[color:var(--brand-600)] to-[color:var(--brand-700)] px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20 text-lg font-semibold">
                {isArabic ? "ا" : "I"}
              </div>
              <div className="text-start">
                <p className="text-sm font-semibold">{ui.assistantName}</p>
                <p className="text-xs text-white/80">{ui.assistantTitle}</p>
              </div>
            </div>
            <button
              type="button"
              aria-label={ui.closeLabel}
              onClick={() => setOpen(false)}
              className="rounded-full p-1.5 text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          <div className="bg-[color:var(--surface)] px-4 py-4">
            <div
              ref={scrollRef}
              className="max-h-[320px] space-y-3 overflow-y-auto pr-1"
              aria-live="polite"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm shadow-sm ${
                      message.role === "user"
                        ? "bg-[color:var(--brand-600)] text-white"
                        : "border border-slate-100 bg-white text-slate-700"
                    }`}
                  >
                    <p className="text-start">{message.text}</p>
                    {message.links?.length ? (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {message.links.map((link) => (
                          <Link
                            key={link.href + link.label}
                            href={link.href}
                            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                              message.role === "user"
                                ? "bg-white/20 text-white hover:bg-white/30"
                                : "bg-[color:var(--brand-50)] text-[color:var(--brand-700)] hover:bg-[color:var(--brand-100)]"
                            }`}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}

              {isThinking ? (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-slate-100 bg-white px-4 py-2 text-xs text-slate-500 shadow-sm">
                    {ui.typingLabel}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {ui.quickReplies.map((reply) => (
                <button
                  key={reply.id}
                  type="button"
                  onClick={() => handleSend(reply.label, reply.id)}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-[color:var(--brand-200)] hover:text-[color:var(--brand-700)]"
                >
                  {reply.label}
                </button>
              ))}
            </div>

            <form
              className="mt-3 flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm"
              onSubmit={(event) => {
                event.preventDefault();
                handleSend(input);
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={ui.placeholder}
                className="flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
              <button
                type="submit"
                aria-label={ui.sendLabel}
                disabled={!input.trim() || isThinking}
                className="rounded-full bg-[color:var(--brand-600)] p-2 text-white shadow-sm transition hover:bg-[color:var(--brand-700)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

