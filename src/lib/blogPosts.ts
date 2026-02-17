import type { Locale } from "@/lib/i18n";

export type BlogBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  keywords: string[];
  intro: string;
  content: BlogBlock[];
  conclusion: {
    text: string;
    tips: string[];
  };
  internalLinks: {
    label: string;
    href: string;
    description: string;
  }[];
}

export const blogPostsEn: BlogPost[] = [
  {
    slug: "how-to-prepare-for-behavioral-job-interviews",
    title: "Behavioral Interview Preparation: Build STAR Stories That Stand Out",
    metaTitle: "Behavioral Interview Prep with STAR Stories | wzzfny",
    metaDescription:
      "Master behavioral interviews with concise STAR stories, metrics, and practice tips that improve clarity and confidence.",
    excerpt:
      "Behavioral interviews reward clear stories and measurable impact. Build a focused STAR bank and practice for confident delivery.",
    keywords: [
      "behavioral interview preparation",
      "STAR method",
      "job interview tips",
      "AI interview preparation",
      "interview practice",
      "career growth",
    ],
    intro:
      "Behavioral interviews are proof-based. With a small bank of STAR stories and clear delivery, you can show judgment, ownership, and impact in minutes.",
    content: [
      { type: "h2", text: "What Interviewers Want to Hear" },
      {
        type: "p",
        text: "Behavioral questions test how you make decisions and deliver results. The strongest answers show your role, actions, and outcomes.",
      },
      {
        type: "ul",
        items: [
          "Decision-making under pressure",
          "Ownership and follow-through",
          "Collaboration and communication",
          "Measurable results",
        ],
      },
      { type: "h2", text: "The STAR Method (Fast Version)" },
      {
        type: "p",
        text: "Keep answers under two minutes and move through the four parts in order.",
      },
      { type: "h3", text: "S - Situation" },
      {
        type: "p",
        text: "One sentence of context: team, goal, constraint.",
      },
      { type: "h3", text: "T - Task" },
      {
        type: "p",
        text: "Your responsibility and the success criteria.",
      },
      { type: "h3", text: "A - Action" },
      {
        type: "p",
        text: "Two or three actions you personally took and why.",
      },
      { type: "h3", text: "R - Result" },
      {
        type: "p",
        text: "The outcome, preferably with a metric, plus a short lesson.",
      },
      { type: "h2", text: "Build a Focused Story Bank" },
      {
        type: "p",
        text: "Create 6 to 8 stories that cover the skills in the job description.",
      },
      {
        type: "ul",
        items: [
          "Resolving a conflict",
          "Improving a process",
          "Leading a project",
          "Recovering from a mistake",
          "Influencing without authority",
          "Handling ambiguity",
        ],
      },
      { type: "h2", text: "Connect Stories to Resume Optimization" },
      {
        type: "p",
        text: "Your resume and stories should reinforce each other. Use the same impact metrics and keywords from your resume in your answers.",
      },
      {
        type: "ul",
        items: [
          "Pick stories that prove your top resume bullets",
          "Reuse role-specific terms from the job posting",
          "Highlight growth in scope or responsibility",
        ],
      },
      { type: "h2", text: "Practice with Real Feedback" },
      {
        type: "p",
        text: "AI interview preparation tools and mock partners help you refine pacing, clarity, and structure.",
      },
      {
        type: "ul",
        items: [
          "Record two answers and trim long setups",
          "Open with the result when it is strong",
          "Replace filler words with short pauses",
          "End with a clear takeaway",
        ],
      },
      { type: "h2", text: "Common Behavioral Questions to Rehearse" },
      {
        type: "ul",
        items: [
          "Tell me about a time you handled conflict.",
          "Describe a challenge and how you solved it.",
          "Share a time you improved a process.",
          "Give an example of leading under pressure.",
          "Tell me about a mistake and what you learned.",
          "Describe a time you worked with limited resources.",
        ],
      },
    ],
    conclusion: {
      text: "Behavioral interviews become predictable when your stories are ready. A clear STAR structure and regular practice lead to stronger answers and long-term career growth.",
      tips: [
        "Draft 6 to 8 STAR stories this week",
        "Add one metric to every result",
        "Record and review two mock answers",
      ],
    },
    internalLinks: [
      {
        label: "Interview Practice",
        href: "/interview-practice",
        description: "Run timed mock interviews by role and level",
      },
      {
        label: "AI Feedback",
        href: "/ai-feedback",
        description: "See how feedback is structured and scored",
      },
      {
        label: "Resume Review",
        href: "/resume-review",
        description: "Align your stories with resume impact",
      },
    ],
  },
  {
    slug: "top-resume-mistakes-to-avoid-2026",
    title: "Resume Mistakes to Avoid in 2026 (And Simple Fixes)",
    metaTitle: "2026 Resume Mistakes to Avoid | wzzfny",
    metaDescription:
      "Avoid the most common resume mistakes in 2026 with ATS-safe formatting, targeted keywords, and impact-focused bullets.",
    excerpt:
      "Small resume errors can block interviews. Fix the most common issues with better structure, keywords, and measurable results.",
    keywords: [
      "resume optimization",
      "resume mistakes 2026",
      "ATS keywords",
      "job interview tips",
      "career growth",
      "AI resume review",
    ],
    intro:
      "Resume screening is faster and more automated in 2026. Resume optimization helps you pass ATS filters and stand out to recruiters. Fix these mistakes to improve response rates.",
    content: [
      { type: "h2", text: "Mistake 1: Impact-Free Bullets" },
      {
        type: "p",
        text: "Recruiters look for results, not just tasks.",
      },
      {
        type: "ul",
        items: [
          "Start bullets with action verbs",
          "Add numbers for revenue, time saved, or growth",
          "Keep each bullet to one idea",
        ],
      },
      { type: "h2", text: "Mistake 2: Keyword Mismatch" },
      {
        type: "p",
        text: "ATS systems match your resume to the job description.",
      },
      {
        type: "ul",
        items: [
          "Mirror the most important skills and tools",
          "Use the exact role title when accurate",
          "Keep keywords natural and relevant",
        ],
      },
      { type: "h2", text: "Mistake 3: ATS-Unfriendly Design" },
      {
        type: "p",
        text: "Complex layouts reduce readability for both ATS and humans.",
      },
      {
        type: "ul",
        items: [
          "Use a one-column layout",
          "Avoid tables, icons, and text boxes",
          "Use clear section headings",
        ],
      },
      { type: "h2", text: "Mistake 4: Generic Summary" },
      {
        type: "p",
        text: "A vague summary looks unfocused.",
      },
      {
        type: "ul",
        items: [
          "Highlight 2 to 3 role-specific strengths",
          "Add one signature achievement",
          "Limit to 3 or 4 lines",
        ],
      },
      { type: "h2", text: "Mistake 5: No Evidence of Career Growth" },
      {
        type: "p",
        text: "Hiring teams want to see progression over time.",
      },
      {
        type: "ul",
        items: [
          "Show bigger scope or ownership",
          "Quantify leadership or impact",
          "List relevant training or certifications",
        ],
      },
      { type: "h3", text: "Quick ATS Checklist" },
      {
        type: "ul",
        items: [
          "Simple font and consistent dates",
          "Standard headings like Experience and Skills",
          "File as PDF unless told otherwise",
          "No images or charts",
        ],
      },
    ],
    conclusion: {
      text: "A strong resume is targeted, measurable, and easy to scan. Small fixes can create more interviews and faster career growth.",
      tips: [
        "Add metrics to your top five bullets",
        "Tailor the top third for each role",
        "Run a resume scan before applying",
      ],
    },
    internalLinks: [
      {
        label: "Resume Review",
        href: "/resume-review",
        description: "Get AI suggestions for formatting and keywords",
      },
      {
        label: "Interview Practice",
        href: "/interview-practice",
        description: "Align your resume with interview prep",
      },
      {
        label: "Pricing",
        href: "/pricing",
        description: "Compare plans for interview prep and resume review",
      },
    ],
  },
  {
    slug: "ai-tools-to-improve-interview-performance",
    title: "AI Interview Preparation: Tools That Improve Performance",
    metaTitle: "AI Interview Preparation Tools That Work | wzzfny",
    metaDescription:
      "Use AI interview preparation to improve structure, delivery, and confidence with targeted feedback and smart practice plans.",
    excerpt:
      "AI feedback reveals gaps in structure and delivery. Use a simple practice loop to improve faster.",
    keywords: [
      "AI interview preparation",
      "interview performance",
      "job interview tips",
      "video interview practice",
      "career growth",
      "resume optimization",
    ],
    intro:
      "AI interview preparation is now a practical advantage. It analyzes delivery and content so you can improve clarity, confidence, and results.",
    content: [
      { type: "h2", text: "What AI Tools Can Measure" },
      {
        type: "p",
        text: "Modern platforms review both how you speak and what you say.",
      },
      {
        type: "ul",
        items: [
          "Pacing, tone, and clarity",
          "Filler words and long pauses",
          "Answer structure and relevance",
          "Eye contact and body language",
        ],
      },
      { type: "h2", text: "Build a Simple Feedback Loop" },
      {
        type: "p",
        text: "Short, consistent sessions beat occasional marathons.",
      },
      {
        type: "ul",
        items: [
          "Practice for 15 to 20 minutes, three times a week",
          "Focus on one skill per session",
          "Re-record answers after feedback",
        ],
      },
      { type: "h2", text: "Use AI to Strengthen STAR Stories" },
      {
        type: "p",
        text: "AI highlights missing context or weak results so your stories become tighter.",
      },
      {
        type: "ul",
        items: [
          "Open with the goal or outcome",
          "Explain your decisions, not just tasks",
          "Add a metric to the result",
        ],
      },
      { type: "h2", text: "Align Interview Answers with Resume Optimization" },
      {
        type: "p",
        text: "Consistency across your resume and answers builds trust.",
      },
      {
        type: "ul",
        items: [
          "Use the same keywords from the job description",
          "Match examples to your top resume bullets",
          "Avoid claims you cannot back up",
        ],
      },
      { type: "h2", text: "Track Progress for Career Growth" },
      {
        type: "p",
        text: "Use scores and notes to see improvement over time.",
      },
      {
        type: "ul",
        items: [
          "Compare recordings week over week",
          "Create a shortlist of weak questions",
          "Schedule a monthly full mock interview",
        ],
      },
    ],
    conclusion: {
      text: "AI tools give you fast, objective feedback, but progress comes from consistent practice. Combine AI coaching with focused routines to accelerate career growth.",
      tips: [
        "Record three answers this week",
        "Review feedback and re-record",
        "Track scores in your dashboard",
      ],
    },
    internalLinks: [
      {
        label: "AI Feedback",
        href: "/ai-feedback",
        description: "See structured performance insights",
      },
      {
        label: "Interview Practice",
        href: "/interview-practice",
        description: "Run timed mock interviews by role",
      },
      {
        label: "Resume Review",
        href: "/resume-review",
        description: "Keep your resume aligned with interview prep",
      },
    ],
  },
  {
    slug: "common-interview-questions-and-how-to-answer",
    title: "Common Interview Questions and How to Answer Them Well",
    metaTitle: "Common Interview Questions and Answers | wzzfny",
    metaDescription:
      "Answer common interview questions with clear frameworks, examples, and job interview tips that boost confidence.",
    excerpt:
      "Prepare for the questions that show up in nearly every interview with simple, structured answers.",
    keywords: [
      "common interview questions",
      "job interview tips",
      "interview answers",
      "STAR method",
      "AI interview preparation",
      "career growth",
    ],
    intro:
      "Most interviews reuse the same core questions. Prepare structured answers so you can respond with clarity and confidence every time.",
    content: [
      { type: "h2", text: "Tell Me About Yourself" },
      {
        type: "p",
        text: "Use a simple Present-Past-Future structure.",
      },
      {
        type: "ul",
        items: [
          "Present: your current role or focus",
          "Past: the experience that built your skills",
          "Future: why this role fits next",
        ],
      },
      { type: "h2", text: "Why This Role and Company?" },
      {
        type: "p",
        text: "Show that you understand the work and the business.",
      },
      {
        type: "ul",
        items: [
          "Connect your skills to key responsibilities",
          "Mention a product, mission, or market",
          "Explain the impact you want to drive",
        ],
      },
      { type: "h2", text: "Describe a Challenge You Solved" },
      {
        type: "p",
        text: "Use a short STAR story with a measurable result.",
      },
      {
        type: "ul",
        items: [
          "Set the context quickly",
          "Describe your actions and tradeoffs",
          "End with the outcome and lesson",
        ],
      },
      { type: "h2", text: "What Are Your Strengths and Weaknesses?" },
      {
        type: "p",
        text: "Be honest and role-relevant.",
      },
      {
        type: "ul",
        items: [
          "Strength: one example that fits the role",
          "Weakness: a real area you are improving",
          "Show your improvement plan",
        ],
      },
      { type: "h2", text: "What Are Your Salary Expectations?" },
      {
        type: "p",
        text: "Stay calm and data-driven.",
      },
      {
        type: "ul",
        items: [
          "Share a range based on research",
          "Clarify scope and location",
          "Signal flexibility for the right fit",
        ],
      },
      { type: "h2", text: "Do You Have Questions for Us?" },
      {
        type: "p",
        text: "Always ask thoughtful questions.",
      },
      {
        type: "ul",
        items: [
          "How will success be measured in 90 days?",
          "What are the top priorities for the team?",
          "How does the team collaborate day to day?",
        ],
      },
      { type: "h3", text: "One-Minute Answer Framework" },
      {
        type: "ul",
        items: [
          "Lead with the main point",
          "Support it with one proof example",
          "Close with the impact",
        ],
      },
    ],
    conclusion: {
      text: "Strong answers come from structure, not memorization. Practice these questions and refine with feedback to support long-term career growth.",
      tips: [
        "Write answers to the top eight questions",
        "Record two answers with AI interview preparation",
        "Refine your examples to match the role",
      ],
    },
    internalLinks: [
      {
        label: "Interview Practice",
        href: "/interview-practice",
        description: "Practice common questions with timed prompts",
      },
      {
        label: "AI Feedback",
        href: "/ai-feedback",
        description: "See structured feedback on delivery",
      },
      {
        label: "Pricing",
        href: "/pricing",
        description: "Compare plans and start practicing",
      },
    ],
  },
  {
    slug: "confidence-tips-for-online-video-interviews",
    title: "Video Interview Confidence: Tips for Clear, Calm Delivery",
    metaTitle: "Video Interview Confidence Tips | wzzfny",
    metaDescription:
      "Build confidence for video interviews with setup, delivery, and practice routines that reduce nerves and sharpen answers.",
    excerpt:
      "Video interviews require camera-ready delivery. Improve setup, pacing, and practice to sound confident.",
    keywords: [
      "video interview tips",
      "online interview confidence",
      "job interview tips",
      "AI interview preparation",
      "career growth",
      "interview practice",
    ],
    intro:
      "Video interviews test how you present, not just what you say. A better setup and steady practice will raise confidence and results.",
    content: [
      { type: "h2", text: "Fix Your Setup First" },
      {
        type: "p",
        text: "A clean, professional setup reduces distractions.",
      },
      {
        type: "ul",
        items: [
          "Place the camera at eye level",
          "Use front lighting to avoid shadows",
          "Choose a quiet space with a simple background",
          "Test audio before the call",
        ],
      },
      { type: "h2", text: "Deliver Answers with a Calm Pace" },
      {
        type: "p",
        text: "Clear delivery beats fast delivery.",
      },
      {
        type: "ul",
        items: [
          "Slow down slightly and pause between points",
          "Keep posture open and shoulders relaxed",
          "Look at the camera, not the screen",
        ],
      },
      { type: "h2", text: "Use AI Interview Preparation for Practice" },
      {
        type: "p",
        text: "AI feedback helps you improve tone, eye contact, and structure.",
      },
      {
        type: "ul",
        items: [
          "Record short answers and review notes",
          "Remove filler words and rushed endings",
          "Practice the questions you miss most",
        ],
      },
      { type: "h2", text: "Build a 20-Minute Confidence Routine" },
      {
        type: "p",
        text: "Small routines reduce nerves.",
      },
      {
        type: "ul",
        items: [
          "Two-minute breathing reset",
          "Review your top three STAR stories",
          "Do one warm-up answer on camera",
        ],
      },
      { type: "h2", text: "Close Strong and Follow Up" },
      {
        type: "p",
        text: "A confident close improves perception.",
      },
      {
        type: "ul",
        items: [
          "Summarize your fit in one sentence",
          "Ask a thoughtful question",
          "Send a short thank-you note after the interview",
        ],
      },
    ],
    conclusion: {
      text: "Confidence comes from preparation and repetition. Improve your setup, practice with feedback, and you will perform with clarity and calm.",
      tips: [
        "Test your setup the day before",
        "Record three practice answers",
        "Track progress in your dashboard",
      ],
    },
    internalLinks: [
      {
        label: "Interview Practice",
        href: "/interview-practice",
        description: "Practice video answers with timed prompts",
      },
      {
        label: "AI Feedback",
        href: "/ai-feedback",
        description: "Improve tone, pacing, and delivery",
      },
      {
        label: "Resume Review",
        href: "/resume-review",
        description: "Keep your resume aligned with your stories",
      },
    ],
  },
];


export const blogPostsAr: BlogPost[] = [
  {
    slug: "how-to-prepare-for-behavioral-job-interviews",
    title: "التحضير للمقابلات السلوكية: قصص STAR التي تبرزك",
    metaTitle: "التحضير للمقابلات السلوكية بقصص STAR | wzzfny",
    metaDescription:
      "أتقن المقابلات السلوكية بقصص STAR مختصرة ومقاييس واضحة ونصائح تدريب تزيد الوضوح والثقة.",
    excerpt:
      "المقابلات السلوكية تكافئ القصص الواضحة والأثر القابل للقياس. ابنِ بنك قصص STAR مركزًا وتدرّب لتقديم واثق.",
    keywords: [
      "التحضير للمقابلات السلوكية",
      "طريقة STAR",
      "نصائح المقابلات",
      "التحضير للمقابلات بالذكاء الاصطناعي",
      "تدريب المقابلات",
      "النمو المهني",
    ],
    intro:
      "المقابلات السلوكية تعتمد على الأدلة. مع بنك صغير من قصص STAR وتقديم واضح، يمكنك إظهار الحكم والمسؤولية والأثر خلال دقائق.",
    content: [
      { type: "h2", text: "ما الذي يريد المقيم سماعه" },
      {
        type: "p",
        text: "الأسئلة السلوكية تختبر كيف تتخذ القرارات وتحقق النتائج. أقوى الإجابات تظهر دورك وأفعالك والنتائج.",
      },
      {
        type: "ul",
        items: [
          "اتخاذ القرار تحت الضغط",
          "تحمّل المسؤولية والمتابعة",
          "التعاون والتواصل",
          "نتائج قابلة للقياس",
        ],
      },
      { type: "h2", text: "طريقة STAR (نسخة سريعة)" },
      {
        type: "p",
        text: "اجعل الإجابة أقل من دقيقتين وانتقل عبر الأجزاء الأربعة بالترتيب.",
      },
      { type: "h3", text: "S - الموقف" },
      {
        type: "p",
        text: "جملة واحدة للسياق: الفريق والهدف والقيود.",
      },
      { type: "h3", text: "T - المهمة" },
      {
        type: "p",
        text: "مسؤوليتك ومعيار النجاح.",
      },
      { type: "h3", text: "A - الإجراء" },
      {
        type: "p",
        text: "إجراءان أو ثلاثة قمت بها أنت شخصيًا ولماذا.",
      },
      { type: "h3", text: "R - النتيجة" },
      {
        type: "p",
        text: "النتيجة ويفضل مع رقم، مع درس قصير.",
      },
      { type: "h2", text: "ابنِ بنك قصص مركز" },
      {
        type: "p",
        text: "أنشئ من 6 إلى 8 قصص تغطي المهارات الموجودة في الوصف الوظيفي.",
      },
      {
        type: "ul",
        items: [
          "حل نزاع",
          "تحسين عملية",
          "قيادة مشروع",
          "التعافي من خطأ",
          "التأثير دون صلاحية",
          "التعامل مع الغموض",
        ],
      },
      { type: "h2", text: "اربط القصص بتحسين السيرة الذاتية" },
      {
        type: "p",
        text: "يجب أن تعزّز السيرة الذاتية والقصص بعضهما. استخدم نفس مقاييس الأثر والكلمات المفتاحية من سيرتك في إجاباتك.",
      },
      {
        type: "ul",
        items: [
          "اختر قصصًا تثبت أهم نقاط السيرة الذاتية",
          "أعد استخدام مصطلحات الدور من إعلان الوظيفة",
          "أبرز نمو المسؤوليات أو نطاق العمل",
        ],
      },
      { type: "h2", text: "تدرّب مع تغذية راجعة حقيقية" },
      {
        type: "p",
        text: "أدوات التحضير بالذكاء الاصطناعي وشركاء التدريب يساعدونك على ضبط الإيقاع والوضوح والبنية.",
      },
      {
        type: "ul",
        items: [
          "سجّل إجابتين وقلّص المقدمات الطويلة",
          "ابدأ بالنتيجة عندما تكون قوية",
          "استبدل كلمات الحشو بتوقفات قصيرة",
          "اختم بخلاصة واضحة",
        ],
      },
      { type: "h2", text: "أسئلة سلوكية شائعة للتدريب" },
      {
        type: "ul",
        items: [
          "حدثني عن موقف تعاملت فيه مع تعارض.",
          "صف تحديًا وكيف حللته.",
          "شارك موقفًا حسّنت فيه عملية.",
          "أعط مثالًا على القيادة تحت الضغط.",
          "حدثني عن خطأ وماذا تعلمت منه.",
          "صف موقفًا عملت فيه بموارد محدودة.",
        ],
      },
    ],
    conclusion: {
      text: "تصبح المقابلات السلوكية متوقعة عندما تكون قصصك جاهزة. بنية STAR الواضحة والتدريب المنتظم يقودان إلى إجابات أقوى ونمو مهني طويل الأمد.",
      tips: [
        "اكتب من 6 إلى 8 قصص STAR هذا الأسبوع",
        "أضف رقمًا إلى كل نتيجة",
        "سجّل وراجع إجابتين تجريبيتين",
      ],
    },
    internalLinks: [
      {
        label: "تدريب المقابلات",
        href: "/interview-practice",
        description: "أجرِ مقابلات تجريبية مؤقتة حسب الدور والمستوى",
      },
      {
        label: "ملاحظات الذكاء الاصطناعي",
        href: "/ai-feedback",
        description: "اطّلع على كيفية تنظيم الملاحظات وتقييمها",
      },
      {
        label: "مراجعة السيرة الذاتية",
        href: "/resume-review",
        description: "وحّد القصص مع أثر السيرة الذاتية",
      },
    ],
  },
  {
    slug: "top-resume-mistakes-to-avoid-2026",
    title: "أخطاء السيرة الذاتية التي يجب تجنبها في 2026 (وحلول بسيطة)",
    metaTitle: "أخطاء السيرة الذاتية في 2026 | wzzfny",
    metaDescription:
      "تجنب أكثر أخطاء السيرة الذاتية شيوعًا في 2026 عبر تنسيق مناسب لـ ATS وكلمات مفتاحية دقيقة ونقاط إنجاز قابلة للقياس.",
    excerpt:
      "أخطاء صغيرة في السيرة قد تمنع المقابلات. أصلح أكثر المشاكل شيوعًا ببنية أفضل وكلمات مفتاحية ونتائج قابلة للقياس.",
    keywords: [
      "تحسين السيرة الذاتية",
      "أخطاء السيرة الذاتية 2026",
      "كلمات مفتاحية ATS",
      "نصائح المقابلات",
      "النمو المهني",
      "مراجعة السيرة بالذكاء الاصطناعي",
    ],
    intro:
      "فرز السير الذاتية أصبح أسرع وأكثر أتمتة في 2026. تحسين السيرة الذاتية يساعدك على عبور فلاتر ATS والتميّز لدى مسؤولي التوظيف. أصلح هذه الأخطاء لرفع معدل الاستجابة.",
    content: [
      { type: "h2", text: "الخطأ 1: نقاط بلا أثر" },
      {
        type: "p",
        text: "الموظفون يبحثون عن النتائج لا عن المهام فقط.",
      },
      {
        type: "ul",
        items: [
          "ابدأ كل نقطة بفعل قوي",
          "أضف أرقامًا للإيرادات أو الوقت الموفر أو النمو",
          "اجعل كل نقطة فكرة واحدة",
        ],
      },
      { type: "h2", text: "الخطأ 2: عدم تطابق الكلمات المفتاحية" },
      {
        type: "p",
        text: "أنظمة ATS تطابق سيرتك مع الوصف الوظيفي.",
      },
      {
        type: "ul",
        items: [
          "طابق أهم المهارات والأدوات",
          "استخدم مسمى الدور نفسه عندما يكون دقيقًا",
          "حافظ على كلمات مفتاحية طبيعية وذات صلة",
        ],
      },
      { type: "h2", text: "الخطأ 3: تصميم غير مناسب لـ ATS" },
      {
        type: "p",
        text: "التصاميم المعقدة تقلل القراءة للأنظمة والبشر.",
      },
      {
        type: "ul",
        items: [
          "استخدم تخطيط عمود واحد",
          "تجنب الجداول والأيقونات وصناديق النص",
          "استخدم عناوين أقسام واضحة",
        ],
      },
      { type: "h2", text: "الخطأ 4: ملخص عام وغير محدد" },
      {
        type: "p",
        text: "الملخص المبهم يوحي بعدم التركيز.",
      },
      {
        type: "ul",
        items: [
          "اذكر 2 إلى 3 نقاط قوة مرتبطة بالدور",
          "أضف إنجازًا بارزًا واحدًا",
          "لا تتجاوز 3 إلى 4 أسطر",
        ],
      },
      { type: "h2", text: "الخطأ 5: غياب دليل النمو المهني" },
      {
        type: "p",
        text: "فرق التوظيف تريد رؤية تطور عبر الزمن.",
      },
      {
        type: "ul",
        items: [
          "أظهر اتساع المسؤوليات أو نطاق العمل",
          "قم بقياس القيادة أو الأثر",
          "اذكر تدريبًا أو شهادات ذات صلة",
        ],
      },
      { type: "h3", text: "قائمة ATS السريعة" },
      {
        type: "ul",
        items: [
          "خط بسيط وتواريخ متسقة",
          "عناوين قياسية مثل الخبرة والمهارات",
          "احفظ الملف PDF ما لم يُطلب غير ذلك",
          "لا تستخدم صورًا أو رسومًا",
        ],
      },
    ],
    conclusion: {
      text: "السيرة القوية مستهدفة وقابلة للقياس وسهلة المسح. تعديلات صغيرة قد تعني مقابلات أكثر ونموًا مهنيًا أسرع.",
      tips: [
        "أضف أرقامًا إلى أهم خمس نقاط",
        "خصّص الثلث العلوي لكل وظيفة",
        "أجرِ فحصًا للسيرة قبل التقديم",
      ],
    },
    internalLinks: [
      {
        label: "مراجعة السيرة الذاتية",
        href: "/resume-review",
        description: "احصل على اقتراحات للتهيئة والكلمات المفتاحية",
      },
      {
        label: "تدريب المقابلات",
        href: "/interview-practice",
        description: "اربط السيرة بتدريب المقابلات",
      },
      {
        label: "الأسعار",
        href: "/pricing",
        description: "قارن الخطط لتدريب المقابلات ومراجعة السيرة",
      },
    ],
  },
  {
    slug: "ai-tools-to-improve-interview-performance",
    title: "التحضير للمقابلات بالذكاء الاصطناعي: أدوات تحسّن الأداء",
    metaTitle: "أدوات التحضير للمقابلات بالذكاء الاصطناعي | wzzfny",
    metaDescription:
      "استخدم التحضير بالذكاء الاصطناعي لتحسين البنية وطريقة الإلقاء والثقة عبر ملاحظات مستهدفة وخطط تدريب ذكية.",
    excerpt:
      "ملاحظات الذكاء الاصطناعي تكشف فجوات البنية والإلقاء. استخدم دورة تدريب بسيطة لتتحسن أسرع.",
    keywords: [
      "التحضير للمقابلات بالذكاء الاصطناعي",
      "أداء المقابلات",
      "نصائح المقابلات",
      "تدريب المقابلات بالفيديو",
      "النمو المهني",
      "تحسين السيرة الذاتية",
    ],
    intro:
      "التحضير للمقابلات بالذكاء الاصطناعي أصبح ميزة عملية. يحلل الإلقاء والمحتوى لتطوير الوضوح والثقة والنتائج.",
    content: [
      { type: "h2", text: "ماذا يمكن لأدوات الذكاء الاصطناعي قياسه" },
      {
        type: "p",
        text: "المنصات الحديثة تراجع طريقة حديثك ومضمون إجابتك.",
      },
      {
        type: "ul",
        items: [
          "الإيقاع والنبرة والوضوح",
          "كلمات الحشو والتوقفات الطويلة",
          "بنية الإجابة وملاءمتها",
          "تواصل العين ولغة الجسد",
        ],
      },
      { type: "h2", text: "ابنِ حلقة تغذية راجعة بسيطة" },
      {
        type: "p",
        text: "الجلسات القصيرة والمتكررة أفضل من جلسات طويلة متباعدة.",
      },
      {
        type: "ul",
        items: [
          "تدرّب 15 إلى 20 دقيقة ثلاث مرات أسبوعيًا",
          "ركّز على مهارة واحدة في كل جلسة",
          "أعد تسجيل الإجابات بعد الملاحظات",
        ],
      },
      { type: "h2", text: "استخدم الذكاء الاصطناعي لتقوية قصص STAR" },
      {
        type: "p",
        text: "الذكاء الاصطناعي يبرز نقص السياق أو ضعف النتيجة فتغدو القصص أكثر إحكامًا.",
      },
      {
        type: "ul",
        items: [
          "ابدأ بالهدف أو النتيجة",
          "اشرح قراراتك لا المهام فقط",
          "أضف رقمًا في النتيجة",
        ],
      },
      { type: "h2", text: "وحّد إجابات المقابلة مع تحسين السيرة الذاتية" },
      {
        type: "p",
        text: "الاتساق بين السيرة والإجابات يبني الثقة.",
      },
      {
        type: "ul",
        items: [
          "استخدم نفس الكلمات المفتاحية من الوصف الوظيفي",
          "طابق الأمثلة مع أهم نقاط السيرة",
          "تجنب ادعاءات لا تستطيع إثباتها",
        ],
      },
      { type: "h2", text: "تابع التقدّم لنمو مهني مستمر" },
      {
        type: "p",
        text: "استخدم الدرجات والملاحظات لرؤية التحسن عبر الزمن.",
      },
      {
        type: "ul",
        items: [
          "قارن التسجيلات أسبوعًا بعد أسبوع",
          "أنشئ قائمة مختصرة بالأسئلة الضعيفة",
          "حدّد مقابلة تجريبية كاملة شهريًا",
        ],
      },
    ],
    conclusion: {
      text: "تمنحك أدوات الذكاء الاصطناعي ملاحظات سريعة وموضوعية، لكن التقدم يأتي من التدريب المنتظم. اجمع بين التدريب والملاحظات لتسريع النمو المهني.",
      tips: [
        "سجّل ثلاث إجابات هذا الأسبوع",
        "راجع الملاحظات وأعد التسجيل",
        "تابع الدرجات في لوحة التحكم",
      ],
    },
    internalLinks: [
      {
        label: "ملاحظات الذكاء الاصطناعي",
        href: "/ai-feedback",
        description: "اطّلع على مؤشرات الأداء المنظمة",
      },
      {
        label: "تدريب المقابلات",
        href: "/interview-practice",
        description: "أجرِ مقابلات تجريبية مؤقتة حسب الدور",
      },
      {
        label: "مراجعة السيرة الذاتية",
        href: "/resume-review",
        description: "حافظ على اتساق السيرة مع التحضير",
      },
    ],
  },
  {
    slug: "common-interview-questions-and-how-to-answer",
    title: "أسئلة المقابلات الشائعة وكيف تجيب عنها بإتقان",
    metaTitle: "أسئلة المقابلات الشائعة والإجابات النموذجية | wzzfny",
    metaDescription:
      "أجب عن الأسئلة الشائعة في المقابلات بإطارات واضحة وأمثلة ونصائح ترفع الثقة.",
    excerpt:
      "استعد للأسئلة التي تتكرر في معظم المقابلات بإجابات بسيطة ومنظمة.",
    keywords: [
      "أسئلة المقابلات الشائعة",
      "نصائح المقابلات",
      "إجابات المقابلات",
      "طريقة STAR",
      "التحضير للمقابلات بالذكاء الاصطناعي",
      "النمو المهني",
    ],
    intro:
      "معظم المقابلات تعيد نفس الأسئلة الأساسية. حضّر إجابات منظمة لترد بثقة ووضوح كل مرة.",
    content: [
      { type: "h2", text: "حدّثني عن نفسك" },
      {
        type: "p",
        text: "استخدم إطار الحاضر-الماضي-المستقبل البسيط.",
      },
      {
        type: "ul",
        items: [
          "الحاضر: دورك الحالي أو تركيزك",
          "الماضي: الخبرة التي كوّنت مهاراتك",
          "المستقبل: لماذا يناسبك هذا الدور الآن",
        ],
      },
      { type: "h2", text: "لماذا هذه الوظيفة وهذه الشركة؟" },
      {
        type: "p",
        text: "أظهر أنك تفهم العمل والعمل التجاري.",
      },
      {
        type: "ul",
        items: [
          "اربط مهاراتك بالمسؤوليات الأساسية",
          "اذكر منتجًا أو رسالة أو سوقًا",
          "اشرح الأثر الذي تريد تحقيقه",
        ],
      },
      { type: "h2", text: "صف تحديًا حللته" },
      {
        type: "p",
        text: "استخدم قصة STAR قصيرة مع نتيجة قابلة للقياس.",
      },
      {
        type: "ul",
        items: [
          "قدّم السياق بسرعة",
          "صف أفعالك ومفاضلاتك",
          "اختم بالنتيجة والدرس",
        ],
      },
      { type: "h2", text: "ما نقاط القوة والضعف لديك؟" },
      {
        type: "p",
        text: "كن صادقًا ومرتبطًا بالدور.",
      },
      {
        type: "ul",
        items: [
          "القوة: مثال واحد يناسب الدور",
          "الضعف: مجال حقيقي تعمل على تطويره",
          "اذكر خطة التحسين",
        ],
      },
      { type: "h2", text: "ما توقعاتك للراتب؟" },
      {
        type: "p",
        text: "حافظ على هدوءك واعتمد على البيانات.",
      },
      {
        type: "ul",
        items: [
          "اذكر نطاقًا مبنيًا على بحث",
          "وضّح النطاق والمسؤوليات والموقع",
          "أظهر مرونة مع العرض المناسب",
        ],
      },
      { type: "h2", text: "هل لديك أسئلة لنا؟" },
      {
        type: "p",
        text: "اسأل دائمًا أسئلة ذكية.",
      },
      {
        type: "ul",
        items: [
          "كيف سيتم قياس النجاح خلال 90 يومًا؟",
          "ما أولويات الفريق الحالية؟",
          "كيف يتعاون الفريق يوميًا؟",
        ],
      },
      { type: "h3", text: "إطار إجابة بدقيقة واحدة" },
      {
        type: "ul",
        items: [
          "ابدأ بالنقطة الأساسية",
          "ادعمها بمثال واحد",
          "اختم بالأثر",
        ],
      },
    ],
    conclusion: {
      text: "الإجابات القوية تأتي من البنية لا من الحفظ. تدرّب على هذه الأسئلة وحسّنها بالملاحظات لدعم نمو مهني طويل الأمد.",
      tips: [
        "اكتب إجابات لأهم ثمانية أسئلة",
        "سجّل إجابتين باستخدام التحضير بالذكاء الاصطناعي",
        "عدّل أمثلتك لتطابق الدور",
      ],
    },
    internalLinks: [
      {
        label: "تدريب المقابلات",
        href: "/interview-practice",
        description: "تمرّن على الأسئلة الشائعة بمؤقت زمني",
      },
      {
        label: "ملاحظات الذكاء الاصطناعي",
        href: "/ai-feedback",
        description: "اطّلع على ملاحظات منظمة حول الإلقاء",
      },
      {
        label: "الأسعار",
        href: "/pricing",
        description: "قارن الخطط وابدأ التدريب",
      },
    ],
  },
  {
    slug: "confidence-tips-for-online-video-interviews",
    title: "ثقة المقابلات المرئية: نصائح لإلقاء هادئ وواضح",
    metaTitle: "نصائح الثقة للمقابلات المرئية | wzzfny",
    metaDescription:
      "ابنِ ثقتك في المقابلات المرئية عبر الإعداد وطريقة الإلقاء وروتينات تدريب تقلل التوتر وتشحذ الإجابات.",
    excerpt:
      "المقابلات المرئية تتطلب حضورًا أمام الكاميرا. حسّن الإعداد والإيقاع والتدريب لتبدو واثقًا.",
    keywords: [
      "نصائح المقابلات المرئية",
      "الثقة في مقابلات الفيديو",
      "نصائح المقابلات",
      "التحضير للمقابلات بالذكاء الاصطناعي",
      "النمو المهني",
      "تدريب المقابلات",
    ],
    intro:
      "المقابلات المرئية تختبر طريقة تقديمك بقدر ما تختبر ما تقول. إعداد أفضل وممارسة ثابتة يرفعان الثقة والنتائج.",
    content: [
      { type: "h2", text: "اضبط إعداداتك أولًا" },
      {
        type: "p",
        text: "إعداد نظيف واحترافي يقلل المشتتات.",
      },
      {
        type: "ul",
        items: [
          "ضع الكاميرا بمستوى العين",
          "استخدم إضاءة أمامية لتجنب الظلال",
          "اختر مكانًا هادئًا وخلفية بسيطة",
          "اختبر الصوت قبل المكالمة",
        ],
      },
      { type: "h2", text: "قدّم الإجابات بإيقاع هادئ" },
      {
        type: "p",
        text: "الإلقاء الواضح أفضل من الإلقاء السريع.",
      },
      {
        type: "ul",
        items: [
          "خفّض السرعة قليلًا وتوقف بين النقاط",
          "حافظ على وضعية مفتوحة وكتفين مرتاحين",
          "انظر إلى الكاميرا لا إلى الشاشة",
        ],
      },
      { type: "h2", text: "استخدم التحضير بالذكاء الاصطناعي للتدريب" },
      {
        type: "p",
        text: "ملاحظات الذكاء الاصطناعي تساعدك على تحسين النبرة وتواصل العين وبنية الإجابة.",
      },
      {
        type: "ul",
        items: [
          "سجّل إجابات قصيرة وراجع الملاحظات",
          "أزل كلمات الحشو والنهايات المتسرعة",
          "تمرّن على الأسئلة التي تخطئ فيها غالبًا",
        ],
      },
      { type: "h2", text: "ابنِ روتين ثقة لمدة 20 دقيقة" },
      {
        type: "p",
        text: "الروتينات الصغيرة تقلل التوتر.",
      },
      {
        type: "ul",
        items: [
          "دقيقتان لتنظيم التنفس",
          "مراجعة سريعة لأفضل قصص STAR",
          "تسخين صوتي بسيط قبل البدء",
        ],
      },
      { type: "h2", text: "راقب تقدمك أسبوعًا بعد أسبوع" },
      {
        type: "p",
        text: "التحسن يصبح أوضح عندما تتابعه.",
      },
      {
        type: "ul",
        items: [
          "قارن التسجيلات على فترات منتظمة",
          "دوّن ملاحظاتك بعد كل جلسة",
          "حدّد هدفًا صغيرًا للجلسة التالية",
        ],
      },
    ],
    conclusion: {
      text: "الثقة في المقابلات المرئية تُبنى بالممارسة. جهّز إعدادك، تدرب مع الملاحظات، وستقدّم بإلقاء هادئ وواضح.",
      tips: [
        "اختبر إعدادك قبل الموعد بيوم",
        "سجّل ثلاث إجابات تدريبية",
        "تابع التقدّم في لوحة التحكم",
      ],
    },
    internalLinks: [
      {
        label: "تدريب المقابلات",
        href: "/interview-practice",
        description: "تمرّن على إجابات الفيديو بمؤقت زمني",
      },
      {
        label: "ملاحظات الذكاء الاصطناعي",
        href: "/ai-feedback",
        description: "حسّن النبرة والإيقاع وطريقة الإلقاء",
      },
      {
        label: "مراجعة السيرة الذاتية",
        href: "/resume-review",
        description: "وحّد السيرة مع قصصك الأساسية",
      },
    ],
  },
];



export const blogPostsByLocale: Record<Locale, BlogPost[]> = {
  en: blogPostsEn,
  ar: blogPostsAr,
};

export function getBlogPost(slug: string, locale: Locale = "en") {
  const posts = blogPostsByLocale[locale] ?? blogPostsEn;
  const post = posts.find((item) => item.slug === slug);
  if (post) return post;
  if (locale !== "en") {
    return blogPostsEn.find((item) => item.slug === slug);
  }
  return undefined;
}


