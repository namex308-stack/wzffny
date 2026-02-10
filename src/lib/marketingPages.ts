import type { Locale } from "@/lib/i18n";

export type MarketingPageSection = {
  title: string;
  body: string;
  bullets?: string[];
};

export type MarketingPageLink = {
  title: string;
  description: string;
  href: string;
};

export type MarketingPageCta = {
  title: string;
  subtitle: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export type MarketingPage = {
  title: string;
  subtitle: string;
  eyebrow?: string;
  highlights?: { title: string; description: string }[];
  sections?: MarketingPageSection[];
  links?: MarketingPageLink[];
  cta?: MarketingPageCta;
  contactForm?: boolean;
  lastUpdated?: string;
};

export const marketingSlugs = [
  "interview-practice",
  "ai-feedback",
  "resume-review",
  "company",
  "about",
  "careers",
  "press",
  "resources",
  "interview-guides",
  "video-tips",
  "help-center",
  "contact",
  "legal",
  "privacy-policy",
  "terms-of-service",
  "cookie-policy",
] as const;

const marketingPagesEn: Record<(typeof marketingSlugs)[number], MarketingPage> = {
  "interview-practice": {
    eyebrow: "Product",
    title: "Interview Practice",
    subtitle:
      "Run realistic mock interviews with timed questions, camera recording, and guided prompts.",
    highlights: [
      {
        title: "Structured sessions",
        description:
          "Follow a clear flow with time limits and curated question sets.",
      },
      {
        title: "Role-based tracks",
        description:
          "Practice behavioral, technical, and mixed interviews by role and level.",
      },
      {
        title: "Record and review",
        description:
          "Capture video answers and replay them with notes for improvement.",
      },
    ],
    sections: [
      {
        title: "How it works",
        body:
          "Set your target role, pick an interview style, and start a live session that mirrors real interviews.",
        bullets: [
          "Choose interview type and difficulty",
          "Answer timed questions with optional read-aloud",
          "Save recordings and notes for review",
        ],
      },
      {
        title: "Built for consistency",
        body:
          "Repeat sessions weekly, track progress, and focus on the skills that matter most for your role.",
        bullets: [
          "Progress summaries across sessions",
          "Role-specific question libraries",
          "Confidence-building practice flow",
        ],
      },
    ],
    cta: {
      title: "Start practicing in minutes",
      subtitle:
        "Create an account and run your first interview session today.",
      primary: { label: "Create an account", href: "/signup" },
      secondary: { label: "View pricing", href: "/pricing" },
    },
  },
  "ai-feedback": {
    eyebrow: "Product",
    title: "AI Feedback",
    subtitle:
      "Objective, actionable insights on clarity, structure, delivery, and confidence after every response.",
    highlights: [
      {
        title: "Answer scoring",
        description:
          "Benchmark performance with clear scores across key dimensions.",
      },
      {
        title: "Voice and pacing",
        description:
          "Detect filler words, speed issues, and moments where you can slow down.",
      },
      {
        title: "Delivery insights",
        description:
          "Track eye contact, energy, and body language trends over time.",
      },
    ],
    sections: [
      {
        title: "What we analyze",
        body:
          "Feedback is organized into the exact areas interviewers care about.",
        bullets: [
          "Clarity, structure, and storytelling",
          "Confidence, tone, and pacing",
          "Impact and measurable outcomes",
        ],
      },
      {
        title: "Turn feedback into progress",
        body:
          "Each report includes targeted tips and next steps so you know what to work on next.",
        bullets: [
          "Actionable coaching suggestions",
          "Highlight strengths to repeat",
          "Track improvement across sessions",
        ],
      },
    ],
    cta: {
      title: "See how AI feedback accelerates progress",
      subtitle:
        "Run a practice session and get a detailed report in minutes.",
      primary: { label: "Start a session", href: "/signup" },
      secondary: { label: "Interview practice", href: "/interview-practice" },
    },
  },
  "resume-review": {
    eyebrow: "Product",
    title: "Resume Review",
    subtitle:
      "Upload your resume and receive targeted improvements for impact, keywords, and structure.",
    highlights: [
      {
        title: "Keyword alignment",
        description:
          "Match your resume to role requirements with smarter keyword coverage.",
      },
      {
        title: "Impact-first bullets",
        description:
          "Focus every bullet on outcomes, metrics, and ownership signals.",
      },
      {
        title: "ATS-ready formatting",
        description:
          "Clean structure that stays readable and consistent across systems.",
      },
    ],
    sections: [
      {
        title: "What gets reviewed",
        body:
          "We analyze content, structure, and tone to help you stand out.",
        bullets: [
          "Summary clarity and role alignment",
          "Experience bullets and quantified impact",
          "Skills and keyword coverage",
        ],
      },
      {
        title: "Best results",
        body:
          "For the strongest feedback, include recent roles and the job title you’re targeting.",
        bullets: [
          "Use measurable outcomes when possible",
          "Keep bullets concise and action-driven",
          "Highlight cross-functional collaboration",
        ],
      },
    ],
    cta: {
      title: "Get a resume review today",
      subtitle:
        "Upload your resume and receive practical improvements in minutes.",
      primary: { label: "Upload resume", href: "/signup" },
      secondary: { label: "AI feedback", href: "/ai-feedback" },
    },
  },
  company: {
    eyebrow: "Company",
    title: "Company",
    subtitle:
      "Learn about our mission, values, and the team building Interviewly.",
    highlights: [
      {
        title: "Mission-driven",
        description:
          "We help candidates practice with clarity, confidence, and measurable progress.",
      },
      {
        title: "Candidate-first",
        description:
          "Every feature is designed to reduce anxiety and improve outcomes.",
      },
      {
        title: "Privacy-focused",
        description:
          "We treat your interview data as sensitive and keep it secure.",
      },
    ],
    sections: [
      {
        title: "Our story",
        body:
          "Interviewly started with a simple goal: make interview prep realistic, supportive, and data-informed.",
      },
      {
        title: "Leadership principles",
        body:
          "We build with empathy, transparency, and a relentless focus on candidate outcomes.",
        bullets: [
          "Make practice realistic and actionable",
          "Respect candidate privacy and ownership",
          "Ship improvements that drive real results",
        ],
      },
    ],
    links: [
      {
        title: "About Interviewly",
        description: "Our story, values, and what we believe.",
        href: "/about",
      },
      {
        title: "Careers",
        description: "Join a team focused on meaningful impact.",
        href: "/careers",
      },
      {
        title: "Press",
        description: "Brand assets and media inquiries.",
        href: "/press",
      },
    ],
    cta: {
      title: "Want to learn more?",
      subtitle:
        "Explore our story, open roles, and company updates.",
      primary: { label: "About Interviewly", href: "/about" },
      secondary: { label: "Careers", href: "/careers" },
    },
  },
  about: {
    eyebrow: "Company",
    title: "About Interviewly",
    subtitle:
      "We’re building a practical, data-informed way to practice interviews and build confidence.",
    highlights: [
      {
        title: "Research-backed",
        description:
          "Our frameworks are grounded in proven interview techniques.",
      },
      {
        title: "Human-centered",
        description:
          "We design for clarity, confidence, and less stress for candidates.",
      },
      {
        title: "Global community",
        description:
          "Built for candidates across roles, industries, and experience levels.",
      },
    ],
    sections: [
      {
        title: "What we believe",
        body:
          "Great interviews are learnable skills. Practice, feedback, and repetition are the fastest ways to improve.",
        bullets: [
          "Practice should feel realistic and supportive",
          "Feedback should be specific and actionable",
          "Progress should be visible and motivating",
        ],
      },
      {
        title: "How we build",
        body:
          "We collaborate with hiring managers, coaches, and candidates to build the most helpful interview experience.",
      },
    ],
    cta: {
      title: "Join the team",
      subtitle:
        "We’re hiring people who care about the candidate experience.",
      primary: { label: "View careers", href: "/careers" },
      secondary: { label: "Contact us", href: "/contact" },
    },
  },
  careers: {
    eyebrow: "Company",
    title: "Careers",
    subtitle:
      "Help candidates land their next job while building a high-trust, high-ownership culture.",
    highlights: [
      {
        title: "Remote-friendly",
        description:
          "Work with a distributed team focused on autonomy and trust.",
      },
      {
        title: "Meaningful impact",
        description:
          "Build products that change career outcomes for candidates.",
      },
      {
        title: "Growth-minded",
        description:
          "Continuous learning, mentorship, and clear growth paths.",
      },
    ],
    sections: [
      {
        title: "Open roles",
        body:
          "We’re always looking for talented people across product, engineering, and customer success.",
        bullets: [
          "Product Designer (Remote)",
          "Full-stack Engineer (Remote)",
          "Customer Success Manager (Hybrid)",
        ],
      },
      {
        title: "Our hiring process",
        body:
          "We keep the process focused and respectful of your time.",
        bullets: [
          "Intro conversation and role alignment",
          "Practical, job-relevant exercise",
          "Final team interview and offer",
        ],
      },
    ],
    cta: {
      title: "Interested in joining?",
      subtitle:
        "Reach out with your background and what you’re excited to build.",
      primary: { label: "Contact recruiting", href: "/contact" },
      secondary: { label: "About Interviewly", href: "/about" },
    },
  },
  press: {
    eyebrow: "Company",
    title: "Press",
    subtitle:
      "News, media resources, and brand assets for Interviewly.",
    highlights: [
      {
        title: "Press kit",
        description:
          "Logos, product screenshots, and brand guidelines.",
      },
      {
        title: "Media inquiries",
        description:
          "Quick responses for journalists and partners.",
      },
      {
        title: "Company facts",
        description:
          "Mission, product overview, and impact metrics.",
      },
    ],
    sections: [
      {
        title: "Latest announcements",
        body:
          "Interviewly launches new AI feedback and interview practice updates tailored to role-based preparation.",
      },
      {
        title: "Brand assets",
        body:
          "Request our press kit for high-resolution logos and product visuals.",
      },
    ],
    cta: {
      title: "Press inquiries",
      subtitle:
        "We’re happy to share product updates and company information.",
      primary: { label: "Contact press", href: "/contact" },
    },
  },
  resources: {
    eyebrow: "Resources",
    title: "Resources",
    subtitle:
      "Guides, templates, and best practices to improve interview performance.",
    highlights: [
      {
        title: "Interview guides",
        description:
          "Playbooks for behavioral, technical, and leadership interviews.",
      },
      {
        title: "Video tips",
        description:
          "Short coaching clips to sharpen delivery and presence.",
      },
      {
        title: "Help center",
        description:
          "Answers to common questions about accounts and billing.",
      },
    ],
    sections: [
      {
        title: "Popular resources",
        body:
          "Start with the essentials to improve structure, clarity, and confidence.",
        bullets: [
          "STAR storytelling guide",
          "Interview day checklist",
          "Answer pacing and delivery tips",
        ],
      },
      {
        title: "Learning paths",
        body:
          "Follow curated paths for different roles and seniority levels.",
        bullets: [
          "New graduate interview prep",
          "Mid-level role transition",
          "Leadership and management interviews",
        ],
      },
    ],
    links: [
      {
        title: "Interview Guides",
        description: "Structured playbooks for every interview type.",
        href: "/interview-guides",
      },
      {
        title: "Video Tips",
        description: "Quick coaching clips for on-camera performance.",
        href: "/video-tips",
      },
      {
        title: "Help Center",
        description: "Account, billing, and troubleshooting support.",
        href: "/help-center",
      },
      {
        title: "Contact",
        description: "Get in touch with the Interviewly team.",
        href: "/contact",
      },
    ],
    cta: {
      title: "Need a tailored plan?",
      subtitle:
        "Start a practice session and get personalized guidance.",
      primary: { label: "Start practicing", href: "/signup" },
      secondary: { label: "Pricing", href: "/pricing" },
    },
  },
  "interview-guides": {
    eyebrow: "Resources",
    title: "Interview Guides",
    subtitle:
      "Step-by-step playbooks for behavioral, technical, and leadership interviews.",
    highlights: [
      {
        title: "Behavioral frameworks",
        description:
          "STAR-based guidance with example answers and prompts.",
      },
      {
        title: "Technical depth",
        description:
          "Structured walkthroughs for coding and system design.",
      },
      {
        title: "Leadership signals",
        description:
          "Communicate impact, ownership, and decision-making clearly.",
      },
    ],
    sections: [
      {
        title: "Guides included",
        body:
          "Use these guides to prepare efficiently and confidently.",
        bullets: [
          "Behavioral interview playbook",
          "System design checklist",
          "Leadership and communication guide",
        ],
      },
      {
        title: "How to use them",
        body:
          "Review the guide, practice with Interviewly, and track improvement with AI feedback.",
      },
    ],
    cta: {
      title: "Ready to practice?",
      subtitle:
        "Put the guides into action with a live session.",
      primary: { label: "Start a session", href: "/signup" },
      secondary: { label: "AI feedback", href: "/ai-feedback" },
    },
  },
  "video-tips": {
    eyebrow: "Resources",
    title: "Video Tips",
    subtitle:
      "Short, practical coaching clips to improve delivery, tone, and on-camera presence.",
    highlights: [
      {
        title: "Presence and posture",
        description:
          "Build confidence with better posture and eye contact.",
      },
      {
        title: "Voice control",
        description:
          "Improve pacing, intonation, and clarity.",
      },
      {
        title: "Answer structure",
        description:
          "Deliver answers that stay on point and impactful.",
      },
    ],
    sections: [
      {
        title: "Recommended topics",
        body:
          "Focus on the fundamentals that make the biggest difference.",
        bullets: [
          "Opening strong with a clear summary",
          "Keeping answers within time limits",
          "Reducing filler words and pauses",
        ],
      },
      {
        title: "Record like a pro",
        body:
          "Use Interviewly recording to see your delivery and refine quickly.",
        bullets: [
          "Practice under real interview timing",
          "Replay and compare sessions",
          "Track improvements week to week",
        ],
      },
    ],
    cta: {
      title: "Practice with video",
      subtitle:
        "Record a session and review your delivery with AI feedback.",
      primary: { label: "Start practicing", href: "/signup" },
      secondary: { label: "Interview practice", href: "/interview-practice" },
    },
  },
  "help-center": {
    eyebrow: "Support",
    title: "Help Center",
    subtitle:
      "Answers to common questions about setup, billing, and interview practice.",
    highlights: [
      {
        title: "Getting started",
        description:
          "Set up your account, camera, and first practice session.",
      },
      {
        title: "Billing and plans",
        description:
          "Manage subscriptions, payments, and upgrades.",
      },
      {
        title: "Security and privacy",
        description:
          "Understand how your data is protected.",
      },
    ],
    sections: [
      {
        title: "Top articles",
        body:
          "The most common questions from new users.",
        bullets: [
          "How to start your first interview session",
          "Updating your billing plan",
          "Downloading interview reports",
        ],
      },
      {
        title: "Support options",
        body:
          "Need extra help? Our team is ready to assist.",
        bullets: [
          "Email support within 1–2 business days",
          "Priority support for paid plans",
          "Help center updates every week",
        ],
      },
    ],
    cta: {
      title: "Still need help?",
      subtitle:
        "Reach our support team and we’ll get back to you quickly.",
      primary: { label: "Contact support", href: "/contact" },
      secondary: { label: "Pricing", href: "/pricing" },
    },
  },
  contact: {
    eyebrow: "Support",
    title: "Contact",
    subtitle:
      "Reach our team for support, partnerships, or media inquiries.",
    highlights: [
      {
        title: "Support",
        description:
          "Account help, billing questions, and technical issues.",
      },
      {
        title: "Partnerships",
        description:
          "Career centers, bootcamps, and hiring partners.",
      },
      {
        title: "Press",
        description:
          "Media requests and brand materials.",
      },
    ],
    sections: [
      {
        title: "How we can help",
        body:
          "Tell us what you need and we’ll route your message to the right team.",
        bullets: [
          "General product questions",
          "Billing and subscription support",
          "Partnership and press inquiries",
        ],
      },
      {
        title: "Response times",
        body:
          "We typically respond within 1–2 business days. Paid plans receive priority support.",
      },
    ],
    contactForm: true,
  },
  legal: {
    eyebrow: "Legal",
    title: "Legal",
    subtitle:
      "Policies and terms that explain how Interviewly works and how we protect your data.",
    highlights: [
      {
        title: "Privacy Policy",
        description:
          "How we collect, use, and protect your information.",
      },
      {
        title: "Terms of Service",
        description:
          "The rules for using Interviewly and our services.",
      },
      {
        title: "Cookie Policy",
        description:
          "How cookies and similar technologies are used.",
      },
    ],
    sections: [
      {
        title: "Quick overview",
        body:
          "We’re committed to transparency and data protection across every part of the product.",
        bullets: [
          "Clear explanations of data usage",
          "Options to manage preferences",
          "Dedicated contact channels for privacy",
        ],
      },
    ],
    links: [
      {
        title: "Privacy Policy",
        description: "Learn how we handle personal data.",
        href: "/privacy-policy",
      },
      {
        title: "Terms of Service",
        description: "Understand the terms for using Interviewly.",
        href: "/terms-of-service",
      },
      {
        title: "Cookie Policy",
        description: "See how cookies are used.",
        href: "/cookie-policy",
      },
    ],
  },
  "privacy-policy": {
    eyebrow: "Legal",
    title: "Privacy Policy",
    subtitle:
      "How we collect, use, and protect your information when you use Interviewly.",
    lastUpdated: "February 6, 2026",
    sections: [
      {
        title: "Information we collect",
        body:
          "We collect information that helps us deliver and improve the service.",
        bullets: [
          "Account data such as name, email, and profile details",
          "Usage data including sessions, feature interactions, and settings",
          "Uploaded content like resumes and interview recordings",
        ],
      },
      {
        title: "How we use data",
        body:
          "We use your data to provide the service, improve performance, and personalize your experience.",
        bullets: [
          "Deliver interview practice and AI feedback",
          "Improve product quality and safety",
          "Communicate updates and support responses",
        ],
      },
      {
        title: "Sharing and security",
        body:
          "We do not sell your personal data. We share data only with trusted service providers and when required by law.",
      },
      {
        title: "Your choices",
        body:
          "You can access, update, or delete your data by contacting us.",
        bullets: [
          "Request data export or deletion",
          "Update your account information",
          "Manage communication preferences",
        ],
      },
      {
        title: "Contact",
        body:
          "Questions about privacy? Email us at privacy@interviewly.ai.",
      },
    ],
  },
  "terms-of-service": {
    eyebrow: "Legal",
    title: "Terms of Service",
    subtitle:
      "The terms that govern access to and use of Interviewly.",
    lastUpdated: "February 6, 2026",
    sections: [
      {
        title: "Using the service",
        body:
          "By using Interviewly, you agree to these terms and to keep your account information accurate.",
        bullets: [
          "You must be at least 16 years old or the age of majority in your jurisdiction.",
          "You are responsible for the security of your account.",
          "Do not share access with unauthorized users.",
        ],
      },
      {
        title: "Acceptable use",
        body:
          "You agree not to misuse the service or interfere with other users.",
        bullets: [
          "No illegal, abusive, or harmful activity",
          "No attempts to access or scrape other users’ data",
          "No reverse engineering or unauthorized automation",
        ],
      },
      {
        title: "Subscriptions and billing",
        body:
          "Paid plans renew monthly unless canceled. You can upgrade or cancel at any time in your settings.",
      },
      {
        title: "Content and intellectual property",
        body:
          "You own your uploaded content. Interviewly retains rights to the platform and related materials.",
      },
      {
        title: "Limitation of liability",
        body:
          "Interviewly is provided \"as is\" without warranties. We are not liable for indirect or consequential damages.",
      },
      {
        title: "Contact",
        body:
          "Questions about these terms? Email support@interviewly.ai.",
      },
    ],
  },
  "cookie-policy": {
    eyebrow: "Legal",
    title: "Cookie Policy",
    subtitle:
      "How Interviewly uses cookies and similar technologies to deliver the service.",
    lastUpdated: "February 6, 2026",
    sections: [
      {
        title: "What are cookies?",
        body:
          "Cookies are small text files stored on your device that help sites remember preferences and improve performance.",
      },
      {
        title: "Types of cookies we use",
        body:
          "We use cookies to keep the platform secure and to improve user experience.",
        bullets: [
          "Essential cookies for authentication and security",
          "Preference cookies to remember settings like language",
          "Analytics cookies to understand product usage",
        ],
      },
      {
        title: "Managing preferences",
        body:
          "You can manage cookie settings through your browser or device. Disabling cookies may affect some features.",
      },
      {
        title: "Contact",
        body:
          "For cookie-related questions, email privacy@interviewly.ai.",
      },
    ],
  },
};

const marketingPagesAr: Record<(typeof marketingSlugs)[number], MarketingPage> = {
  "interview-practice": {
    eyebrow: "المنتج",
    title: "تدريب المقابلات",
    subtitle:
      "محاكاة مقابلات واقعية مع أسئلة مؤقتة وتسجيل فيديو وإرشادات واضحة.",
    highlights: [
      {
        title: "جلسات منظمة",
        description:
          "تدرّب وفق مسار واضح مع توقيت وأسئلة مختارة بعناية.",
      },
      {
        title: "مسارات حسب الدور",
        description:
          "مقابلات سلوكية وتقنية ومختلطة حسب الدور والمستوى.",
      },
      {
        title: "سجّل وراجع",
        description:
          "احفظ إجابات الفيديو وراجعها مع ملاحظات التحسين.",
      },
    ],
    sections: [
      {
        title: "كيف يعمل",
        body:
          "حدد دورك المستهدف واختر نوع المقابلة ثم ابدأ جلسة مباشرة تشبه المقابلة الحقيقية.",
        bullets: [
          "اختر نوع المقابلة ومستوى الصعوبة",
          "أجب ضمن وقت محدد مع خيار القراءة الصوتية",
          "احفظ التسجيلات والملاحظات للمراجعة",
        ],
      },
      {
        title: "مصمم للانتظام",
        body:
          "كرر الجلسات أسبوعيًا وتابع التقدم وركّز على المهارات الأكثر أهمية.",
        bullets: [
          "ملخصات تقدم عبر الجلسات",
          "مكتبات أسئلة خاصة بالأدوار",
          "مسار تدريب يبني الثقة",
        ],
      },
    ],
    cta: {
      title: "ابدأ التدريب خلال دقائق",
      subtitle:
        "أنشئ حسابًا وابدأ أول جلسة مقابلة اليوم.",
      primary: { label: "إنشاء حساب", href: "/signup" },
      secondary: { label: "عرض الأسعار", href: "/pricing" },
    },
  },
  "ai-feedback": {
    eyebrow: "المنتج",
    title: "ملاحظات الذكاء الاصطناعي",
    subtitle:
      "رؤى موضوعية وقابلة للتنفيذ حول الوضوح والبنية وطريقة الإلقاء بعد كل إجابة.",
    highlights: [
      {
        title: "تقييم الإجابات",
        description:
          "درجات واضحة لأهم محاور الأداء.",
      },
      {
        title: "الصوت والإيقاع",
        description:
          "كشف كلمات الحشو والسرعة والأجزاء التي تحتاج تباطؤًا.",
      },
      {
        title: "لغة الجسد",
        description:
          "تتبّع التواصل البصري والطاقة عبر الوقت.",
      },
    ],
    sections: [
      {
        title: "ما الذي نقيسه",
        body:
          "نُركز على العناصر التي يهتم بها المحاورون فعلًا.",
        bullets: [
          "الوضوح والبنية والسرد",
          "الثقة والنبرة والإيقاع",
          "الأثر والنتائج القابلة للقياس",
        ],
      },
      {
        title: "حوّل الملاحظات إلى تقدم",
        body:
          "كل تقرير يتضمن نصائح محددة وخطوات تالية واضحة.",
        bullets: [
          "نصائح تدريب قابلة للتطبيق",
          "تعزيز نقاط القوة",
          "متابعة التحسن عبر الجلسات",
        ],
      },
    ],
    cta: {
      title: "احصل على تقرير خلال دقائق",
      subtitle:
        "ابدأ جلسة تدريب واحصل على تقرير مفصل.",
      primary: { label: "ابدأ جلسة", href: "/signup" },
      secondary: { label: "تدريب المقابلات", href: "/interview-practice" },
    },
  },
  "resume-review": {
    eyebrow: "المنتج",
    title: "مراجعة السيرة الذاتية",
    subtitle:
      "حمّل سيرتك الذاتية واحصل على تحسينات للكلمات المفتاحية والأثر والبنية.",
    highlights: [
      {
        title: "مواءمة الكلمات المفتاحية",
        description:
          "تحسين التطابق مع متطلبات الدور المستهدف.",
      },
      {
        title: "نقاط أثر واضحة",
        description:
          "صياغة نتائج قابلة للقياس وتوضيح المسؤولية.",
      },
      {
        title: "تنسيق مناسب للأنظمة",
        description:
          "هيكلة منظمة وسهلة القراءة عبر الأنظمة.",
      },
    ],
    sections: [
      {
        title: "ما الذي نراجعه",
        body:
          "نراجع المحتوى والبنية والنبرة لتقديم تحسينات عملية.",
        bullets: [
          "الملخص ومدى توافقه مع الدور",
          "نقاط الخبرة والأثر الكمي",
          "المهارات والكلمات المفتاحية",
        ],
      },
      {
        title: "أفضل النتائج",
        body:
          "أدرج أحدث الخبرات وحدد الدور المستهدف بوضوح.",
        bullets: [
          "استخدم أرقامًا متى أمكن",
          "حافظ على نقاط مختصرة",
          "أبرز التعاون متعدد التخصصات",
        ],
      },
    ],
    cta: {
      title: "احصل على مراجعة اليوم",
      subtitle:
        "حمّل سيرتك الذاتية واحصل على تحسينات سريعة.",
      primary: { label: "تحميل السيرة", href: "/signup" },
      secondary: { label: "ملاحظات الذكاء الاصطناعي", href: "/ai-feedback" },
    },
  },
  company: {
    eyebrow: "الشركة",
    title: "الشركة",
    subtitle:
      "تعرف على مهمتنا وقيمنا والفريق الذي يبني Interviewly.",
    highlights: [
      {
        title: "مهمة واضحة",
        description:
          "نساعد المرشحين على التدريب بثقة ونتائج قابلة للقياس.",
      },
      {
        title: "تركيز على المرشح",
        description:
          "كل ميزة مصممة لتقليل التوتر وتحسين الأداء.",
      },
      {
        title: "خصوصية أولًا",
        description:
          "بياناتك الحساسة محمية دائمًا.",
      },
    ],
    sections: [
      {
        title: "قصتنا",
        body:
          "بدأ Interviewly بهدف بسيط: جعل التحضير للمقابلات واقعيًا وداعمًا ومبنيًا على البيانات.",
      },
      {
        title: "مبادئ القيادة",
        body:
          "نبني بثقة وشفافية وتركيز على نتائج المرشحين.",
        bullets: [
          "تجربة تدريب واقعية وقابلة للتنفيذ",
          "حماية الخصوصية والملكية",
          "تحسينات تقود لنتائج فعلية",
        ],
      },
    ],
    links: [
      {
        title: "عن Interviewly",
        description: "القصة والقيم وما نؤمن به.",
        href: "/about",
      },
      {
        title: "الوظائف",
        description: "انضم إلى فريق يصنع أثرًا حقيقيًا.",
        href: "/careers",
      },
      {
        title: "الصحافة",
        description: "مواد العلامة واستفسارات الإعلام.",
        href: "/press",
      },
    ],
    cta: {
      title: "هل تريد معرفة المزيد؟",
      subtitle:
        "استكشف قصتنا والفرص المتاحة وأخبار الشركة.",
      primary: { label: "عن Interviewly", href: "/about" },
      secondary: { label: "الوظائف", href: "/careers" },
    },
  },
  about: {
    eyebrow: "الشركة",
    title: "عن Interviewly",
    subtitle:
      "نبني طريقة عملية قائمة على البيانات للتدريب على المقابلات وبناء الثقة.",
    highlights: [
      {
        title: "مبني على الأبحاث",
        description:
          "منهجياتنا تستند إلى أفضل ممارسات المقابلات.",
      },
      {
        title: "تصميم إنساني",
        description:
          "نصمم للتوضيح وتقليل التوتر وزيادة الثقة.",
      },
      {
        title: "مجتمع عالمي",
        description:
          "مناسب لمختلف الأدوار والصناعات والمستويات.",
      },
    ],
    sections: [
      {
        title: "ما نؤمن به",
        body:
          "المقابلات مهارة يمكن تعلمها. التدريب والملاحظات والتكرار أسرع طريق للتحسن.",
        bullets: [
          "التدريب يجب أن يكون واقعيًا وداعمًا",
          "الملاحظات يجب أن تكون محددة وقابلة للتنفيذ",
          "التقدم يجب أن يكون واضحًا ومحفزًا",
        ],
      },
      {
        title: "كيف نبني",
        body:
          "نتعاون مع مديري التوظيف والمدربين والمرشحين لبناء أفضل تجربة تدريب.",
      },
    ],
    cta: {
      title: "انضم إلى الفريق",
      subtitle:
        "نبحث عن أشخاص يهتمون بتجربة المرشح.",
      primary: { label: "عرض الوظائف", href: "/careers" },
      secondary: { label: "تواصل معنا", href: "/contact" },
    },
  },
  careers: {
    eyebrow: "الشركة",
    title: "الوظائف",
    subtitle:
      "ساعد المرشحين على الحصول على وظائفهم القادمة بينما تبني ثقافة قوية ومسؤولة.",
    highlights: [
      {
        title: "عمل عن بُعد",
        description:
          "فريق موزع يركز على الاستقلالية والثقة.",
      },
      {
        title: "أثر حقيقي",
        description:
          "نبني منتجات تغيّر نتائج المرشحين.",
      },
      {
        title: "نمو مستمر",
        description:
          "تعلم دائم ومسارات نمو واضحة.",
      },
    ],
    sections: [
      {
        title: "الوظائف المتاحة",
        body:
          "نبحث دائمًا عن مواهب في المنتج والهندسة ونجاح العملاء.",
        bullets: [
          "مصمم منتجات (عن بُعد)",
          "مهندس برمجيات شامل (عن بُعد)",
          "مدير نجاح العملاء (هجين)",
        ],
      },
      {
        title: "خطوات التوظيف",
        body:
          "عملية مركزة تحترم وقتك.",
        bullets: [
          "مكالمة تعريفية وتوافق الدور",
          "تمرين عملي مرتبط بالوظيفة",
          "مقابلة نهائية مع الفريق",
        ],
      },
    ],
    cta: {
      title: "هل ترغب بالانضمام؟",
      subtitle:
        "راسلنا بخبراتك وما الذي تريد بناءه.",
      primary: { label: "تواصل مع التوظيف", href: "/contact" },
      secondary: { label: "عن Interviewly", href: "/about" },
    },
  },
  press: {
    eyebrow: "الشركة",
    title: "الصحافة",
    subtitle:
      "الأخبار والموارد الإعلامية ومواد العلامة الخاصة بـ Interviewly.",
    highlights: [
      {
        title: "ملف صحفي",
        description:
          "شعارات وصور المنتج وإرشادات العلامة.",
      },
      {
        title: "طلبات الإعلام",
        description:
          "ردود سريعة للصحفيين والشركاء.",
      },
      {
        title: "حقائق الشركة",
        description:
          "المهمة ونظرة عامة على المنتج.",
      },
    ],
    sections: [
      {
        title: "آخر الإعلانات",
        body:
          "تحديثات جديدة لملاحظات الذكاء الاصطناعي وتجربة التدريب حسب الدور.",
      },
      {
        title: "مواد العلامة",
        body:
          "اطلب ملف العلامة للحصول على شعارات عالية الدقة وصور المنتج.",
      },
    ],
    cta: {
      title: "طلبات الصحافة",
      subtitle:
        "يسعدنا مشاركة تحديثات المنتج ومعلومات الشركة.",
      primary: { label: "تواصل معنا", href: "/contact" },
    },
  },
  resources: {
    eyebrow: "الموارد",
    title: "الموارد",
    subtitle:
      "أدلة وقوالب وأفضل الممارسات لتحسين الأداء في المقابلات.",
    highlights: [
      {
        title: "أدلة المقابلات",
        description:
          "مسارات تدريب للسلوكي والتقني والقيادي.",
      },
      {
        title: "نصائح فيديو",
        description:
          "مقاطع تدريب قصيرة لتحسين الإلقاء.",
      },
      {
        title: "مركز المساعدة",
        description:
          "إجابات لأكثر الأسئلة شيوعًا.",
      },
    ],
    sections: [
      {
        title: "الموارد الأكثر طلبًا",
        body:
          "ابدأ بالأساسيات لتحسين البنية والوضوح والثقة.",
        bullets: [
          "دليل STAR للسرد السلوكي",
          "قائمة تجهيز يوم المقابلة",
          "نصائح الإيقاع وطريقة الإلقاء",
        ],
      },
      {
        title: "مسارات تعلم",
        body:
          "مسارات مخصصة حسب الدور والمستوى.",
        bullets: [
          "تحضير الخريجين الجدد",
          "الانتقال لوظائف متوسطة",
          "مقابلات القيادة والإدارة",
        ],
      },
    ],
    links: [
      {
        title: "أدلة المقابلات",
        description: "خطط تدريب منظمة لكل نوع مقابلة.",
        href: "/interview-guides",
      },
      {
        title: "نصائح فيديو",
        description: "تدريب سريع للأداء أمام الكاميرا.",
        href: "/video-tips",
      },
      {
        title: "مركز المساعدة",
        description: "الدعم والأسئلة المتكررة.",
        href: "/help-center",
      },
      {
        title: "تواصل معنا",
        description: "تواصل مباشرة مع فريق Interviewly.",
        href: "/contact",
      },
    ],
    cta: {
      title: "هل تحتاج خطة مخصصة؟",
      subtitle:
        "ابدأ جلسة تدريب واحصل على توجيه شخصي.",
      primary: { label: "ابدأ التدريب", href: "/signup" },
      secondary: { label: "الأسعار", href: "/pricing" },
    },
  },
  "interview-guides": {
    eyebrow: "الموارد",
    title: "أدلة المقابلات",
    subtitle:
      "خطط خطوة بخطوة للمقابلات السلوكية والتقنية والقيادية.",
    highlights: [
      {
        title: "إطارات سلوكية",
        description:
          "دليل STAR مع أمثلة وإرشادات.",
      },
      {
        title: "عمق تقني",
        description:
          "قوائم تحقق لأسئلة البرمجة وتصميم الأنظمة.",
      },
      {
        title: "إشارات قيادية",
        description:
          "أبرز الأثر واتخاذ القرار والملكية.",
      },
    ],
    sections: [
      {
        title: "الأدلة المتاحة",
        body:
          "استخدم هذه الأدلة للاستعداد بثقة.",
        bullets: [
          "دليل المقابلات السلوكية",
          "قائمة تصميم الأنظمة",
          "دليل القيادة والتواصل",
        ],
      },
      {
        title: "كيفية الاستخدام",
        body:
          "اقرأ الدليل، ثم تدرّب عبر Interviewly وتابع التحسن بالملاحظات.",
      },
    ],
    cta: {
      title: "جاهز للتدريب؟",
      subtitle:
        "حوّل الأدلة إلى تطبيق عملي في جلسة مباشرة.",
      primary: { label: "ابدأ جلسة", href: "/signup" },
      secondary: { label: "ملاحظات الذكاء الاصطناعي", href: "/ai-feedback" },
    },
  },
  "video-tips": {
    eyebrow: "الموارد",
    title: "نصائح فيديو",
    subtitle:
      "مقاطع تدريب قصيرة لتحسين الإلقاء والنبرة والحضور أمام الكاميرا.",
    highlights: [
      {
        title: "الحضور والوضعية",
        description:
          "تعزيز الثقة عبر وضعية أفضل وتواصل بصري.",
      },
      {
        title: "التحكم بالصوت",
        description:
          "تحسين السرعة والنبرة والوضوح.",
      },
      {
        title: "بنية الإجابة",
        description:
          "إجابات مركزة ومؤثرة.",
      },
    ],
    sections: [
      {
        title: "مواضيع مقترحة",
        body:
          "ركز على الأساسيات التي تُحدث فرقًا كبيرًا.",
        bullets: [
          "بداية قوية بملخص واضح",
          "الحفاظ على الإجابات ضمن الوقت",
          "تقليل كلمات الحشو",
        ],
      },
      {
        title: "سجّل مثل المحترفين",
        body:
          "استخدم تسجيل Interviewly لمراجعة الأداء بسرعة.",
        bullets: [
          "تدريب بزمن واقعي",
          "مقارنة الجلسات",
          "متابعة التحسن أسبوعيًا",
        ],
      },
    ],
    cta: {
      title: "تدرّب بالفيديو",
      subtitle:
        "سجّل جلسة وراجع الأداء مع ملاحظات الذكاء الاصطناعي.",
      primary: { label: "ابدأ التدريب", href: "/signup" },
      secondary: { label: "تدريب المقابلات", href: "/interview-practice" },
    },
  },
  "help-center": {
    eyebrow: "الدعم",
    title: "مركز المساعدة",
    subtitle:
      "إجابات عن الأسئلة الأكثر شيوعًا حول الإعداد والفوترة والتدريب.",
    highlights: [
      {
        title: "البدء السريع",
        description:
          "تهيئة الحساب والكاميرا وأول جلسة تدريب.",
      },
      {
        title: "الفوترة والخطط",
        description:
          "إدارة الاشتراكات والترقيات.",
      },
      {
        title: "الأمان والخصوصية",
        description:
          "كيفية حماية بياناتك.",
      },
    ],
    sections: [
      {
        title: "أهم المقالات",
        body:
          "الأسئلة الأكثر شيوعًا من المستخدمين الجدد.",
        bullets: [
          "بدء أول جلسة مقابلة",
          "تحديث الخطة والفوترة",
          "تحميل تقارير المقابلات",
        ],
      },
      {
        title: "خيارات الدعم",
        body:
          "إذا احتجت مساعدة إضافية، فريقنا جاهز.",
        bullets: [
          "دعم عبر البريد خلال 1-2 يوم عمل",
          "أولوية للدعم في الخطط المدفوعة",
          "تحديثات أسبوعية لمركز المساعدة",
        ],
      },
    ],
    cta: {
      title: "تحتاج مساعدة؟",
      subtitle:
        "راسل فريق الدعم وسنعود إليك سريعًا.",
      primary: { label: "تواصل مع الدعم", href: "/contact" },
      secondary: { label: "الأسعار", href: "/pricing" },
    },
  },
  contact: {
    eyebrow: "الدعم",
    title: "تواصل معنا",
    subtitle:
      "تواصل معنا للدعم أو الشراكات أو الاستفسارات الإعلامية.",
    highlights: [
      {
        title: "الدعم",
        description:
          "مساعدة الحساب والفوترة والمشكلات التقنية.",
      },
      {
        title: "الشراكات",
        description:
          "مراكز توظيف ومعسكرات تدريب وشركاء التوظيف.",
      },
      {
        title: "الإعلام",
        description:
          "طلبات الصحافة ومواد العلامة.",
      },
    ],
    sections: [
      {
        title: "كيف يمكننا المساعدة",
        body:
          "شاركنا احتياجك وسنوجه الرسالة للفريق المناسب.",
        bullets: [
          "أسئلة حول المنتج",
          "دعم الفوترة والاشتراك",
          "الشراكات وطلبات الإعلام",
        ],
      },
      {
        title: "زمن الاستجابة",
        body:
          "عادة نرد خلال 1-2 يوم عمل. الخطط المدفوعة تحصل على أولوية.",
      },
    ],
    contactForm: true,
  },
  legal: {
    eyebrow: "قانوني",
    title: "قانوني",
    subtitle:
      "السياسات والشروط التي توضّح كيفية عمل Interviewly وحماية البيانات.",
    highlights: [
      {
        title: "سياسة الخصوصية",
        description:
          "كيف نجمع البيانات ونستخدمها ونحميها.",
      },
      {
        title: "شروط الخدمة",
        description:
          "القواعد التي تنظّم استخدام Interviewly.",
      },
      {
        title: "سياسة ملفات تعريف الارتباط",
        description:
          "كيفية استخدام ملفات تعريف الارتباط والتقنيات المشابهة.",
      },
    ],
    sections: [
      {
        title: "نظرة سريعة",
        body:
          "نلتزم بالشفافية وحماية البيانات عبر كامل التجربة.",
        bullets: [
          "توضيح طريقة استخدام البيانات",
          "خيارات لإدارة التفضيلات",
          "قنوات تواصل خاصة بالخصوصية",
        ],
      },
    ],
    links: [
      {
        title: "سياسة الخصوصية",
        description: "تعرف على كيفية التعامل مع البيانات.",
        href: "/privacy-policy",
      },
      {
        title: "شروط الخدمة",
        description: "افهم شروط استخدام Interviewly.",
        href: "/terms-of-service",
      },
      {
        title: "سياسة ملفات تعريف الارتباط",
        description: "اطلع على استخدام ملفات تعريف الارتباط.",
        href: "/cookie-policy",
      },
    ],
  },
  "privacy-policy": {
    eyebrow: "قانوني",
    title: "سياسة الخصوصية",
    subtitle:
      "كيفية جمع المعلومات واستخدامها وحمايتها عند استخدام Interviewly.",
    lastUpdated: "6 فبراير 2026",
    sections: [
      {
        title: "البيانات التي نجمعها",
        body:
          "نجمع المعلومات اللازمة لتقديم الخدمة وتحسينها.",
        bullets: [
          "بيانات الحساب مثل الاسم والبريد والملف الشخصي",
          "بيانات الاستخدام مثل الجلسات والتفاعلات والإعدادات",
          "المحتوى المرفوع مثل السير الذاتية وتسجيلات المقابلات",
        ],
      },
      {
        title: "كيف نستخدم البيانات",
        body:
          "نستخدم بياناتك لتقديم الخدمة وتحسين الأداء وتخصيص التجربة.",
        bullets: [
          "تقديم التدريب والملاحظات",
          "تحسين الجودة والأمان",
          "التواصل للدعم والتحديثات",
        ],
      },
      {
        title: "المشاركة والأمان",
        body:
          "لا نبيع بياناتك الشخصية. نشاركها فقط مع مزودي خدمة موثوقين وعند الضرورة القانونية.",
      },
      {
        title: "خياراتك",
        body:
          "يمكنك الوصول إلى بياناتك أو تعديلها أو حذفها عبر التواصل معنا.",
        bullets: [
          "طلب تصدير أو حذف البيانات",
          "تحديث معلومات الحساب",
          "إدارة تفضيلات التواصل",
        ],
      },
      {
        title: "تواصل",
        body:
          "للاستفسارات المتعلقة بالخصوصية: privacy@interviewly.ai.",
      },
    ],
  },
  "terms-of-service": {
    eyebrow: "قانوني",
    title: "شروط الخدمة",
    subtitle:
      "الشروط التي تنظّم الوصول إلى Interviewly واستخدامه.",
    lastUpdated: "6 فبراير 2026",
    sections: [
      {
        title: "استخدام الخدمة",
        body:
          "باستخدام Interviewly، توافق على هذه الشروط وتلتزم بصحة بيانات حسابك.",
        bullets: [
          "يجب أن يكون عمرك 16 عامًا على الأقل أو سن الرشد في بلدك.",
          "أنت مسؤول عن حماية حسابك.",
          "لا تشارك الحساب مع أشخاص غير مخولين.",
        ],
      },
      {
        title: "الاستخدام المقبول",
        body:
          "تتعهد بعدم إساءة استخدام الخدمة أو الإضرار بالآخرين.",
        bullets: [
          "لا أنشطة غير قانونية أو ضارة",
          "لا محاولة للوصول إلى بيانات الآخرين",
          "لا هندسة عكسية أو أتمتة غير مصرح بها",
        ],
      },
      {
        title: "الاشتراكات والفوترة",
        body:
          "تتجدد الخطط المدفوعة شهريًا ما لم تُلغَ. يمكنك الترقية أو الإلغاء من الإعدادات.",
      },
      {
        title: "المحتوى وحقوق الملكية",
        body:
          "تملك محتواك المرفوع. تحتفظ Interviewly بحقوق المنصة والمواد المرتبطة بها.",
      },
      {
        title: "حدود المسؤولية",
        body:
          "تُقدَّم Interviewly كما هي دون ضمانات. لا نتحمل مسؤولية الأضرار غير المباشرة.",
      },
      {
        title: "تواصل",
        body:
          "للأسئلة حول هذه الشروط: support@interviewly.ai.",
      },
    ],
  },
  "cookie-policy": {
    eyebrow: "قانوني",
    title: "سياسة ملفات تعريف الارتباط",
    subtitle:
      "كيفية استخدام ملفات تعريف الارتباط والتقنيات المشابهة داخل Interviewly.",
    lastUpdated: "6 فبراير 2026",
    sections: [
      {
        title: "ما هي ملفات تعريف الارتباط؟",
        body:
          "هي ملفات نصية صغيرة تُخزن على جهازك لتذكر التفضيلات وتحسين الأداء.",
      },
      {
        title: "أنواع ملفات تعريف الارتباط التي نستخدمها",
        body:
          "نستخدمها للأمان وتحسين تجربة الاستخدام.",
        bullets: [
          "ملفات أساسية للمصادقة والأمان",
          "ملفات تفضيلات مثل اللغة",
          "ملفات تحليلية لفهم الاستخدام",
        ],
      },
      {
        title: "إدارة التفضيلات",
        body:
          "يمكنك إدارة ملفات تعريف الارتباط من المتصفح أو الجهاز. تعطيلها قد يؤثر على بعض الميزات.",
      },
      {
        title: "تواصل",
        body:
          "للاستفسارات: privacy@interviewly.ai.",
      },
    ],
  },
};

export const getMarketingPage = (slug: string, locale: Locale) => {
  if (!(marketingSlugs as readonly string[]).includes(slug)) {
    return null;
  }
  const pages = locale === "ar" ? marketingPagesAr : marketingPagesEn;
  return pages[slug as (typeof marketingSlugs)[number]] ?? null;
};
