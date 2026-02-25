import type { Locale } from "@/lib/i18n";
import type { PlanId } from "@/lib/billing";

export type SiteContent = {
  siteConfig: {
    name: string;
    description: string;
    tagline: string;
    cta: {
      primary: string;
      secondary: string;
    };
  };
  trustIndicators: string[];
  navigation: { name: string; href: string }[];
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
  howItWorks: {
    step: number;
    title: string;
    description: string;
  }[];
  testimonials: {
    quote: string;
    author: string;
    title: string;
    company: string;
    avatar: string;
  }[];
  pricing: {
    id: PlanId;
    name: string;
    price: string;
    period: string;
    secondaryPrice?: string;
    secondaryPeriod?: string;
    description: string;
    features: string[];
    cta: string;
    highlighted: boolean;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  logoCloud: string[];
  footerLinks: {
    product: { name: string; href: string }[];
    company: { name: string; href: string }[];
    resources: { name: string; href: string }[];
    legal: { name: string; href: string }[];
  };
  socialLinks: { name: string; href: string; icon: string }[];
  copy: {
    heroBadge: string;
    logoCloudTitle: string;
    sections: {
      features: { eyebrow: string; title: string; subtitle: string };
      howItWorks: { eyebrow: string; title: string; subtitle: string };
      testimonials: { eyebrow: string; title: string; subtitle: string };
      pricing: { eyebrow: string; title: string; subtitle: string; promotion: string };
      faq: { eyebrow: string; title: string; subtitle: string };
    };
    faqContact: { prompt: string; linkLabel: string };
    cta: { title: string; subtitle: string; button: string };
    blogIndex: {
      eyebrow: string;
      title: string;
      subtitle: string;
      readArticle: string;
    };
    blogPost: {
      conclusionTitle: string;
      continueTitle: string;
      continueDescription: string;
    };
    header: {
      signup: string;
      login: string;
      languageLabel: string;
      dashboard: string;
      signOut: string;
    };
    footer: {
      productTitle: string;
      companyTitle: string;
      resourcesTitle: string;
      legalTitle: string;
      rights: string;
    };
  };
};

const siteContentEn: SiteContent = {
  siteConfig: {
    name: "wzzfny",
    description:
      "AI-powered interview training with live video practice, instant feedback, resume optimization, and personalized growth plans.",
    tagline: "Practice interviews with AI feedback and land your next job",
    cta: {
      primary: "Start Practicing",
      secondary: "Watch Sample Feedback",
    },
  },
  trustIndicators: [
    "Evidence-backed insights",
    "Transparent scoring",
    "Private and secure",
  ],
  navigation: [
    { name: "Features", href: "/#features" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Pricing", href: "/#pricing" },
    { name: "FAQ", href: "/#faq" },
  ],
  features: [
    {
      title: "Live Video Interviews",
      description:
        "Read questions on-screen and record real-time answers to build confidence on camera.",
      icon: "Video",
    },
    {
      title: "AI Performance Reports",
      description:
        "Evidence-based feedback with rubric scores, timestamps, and examples from your answers.",
      icon: "BarChart3",
    },
    {
      title: "Extensive Question Library",
      description:
        "Thousands of behavioral, technical, and hybrid questions by role, level, and industry.",
      icon: "BookOpen",
    },
    {
      title: "Resume Optimization",
      description:
        "ATS-ready edits with keyword coverage, formatting checks, and impact rewrites.",
      icon: "FileText",
    },
    {
      title: "Personalized Training Plan",
      description:
        "Adaptive plans based on observed gaps, progress trends, and your target role.",
      icon: "Target",
    },
    {
      title: "Educational Resources",
      description:
        "Articles, videos, and tips on interview strategy, body language, and confidence.",
      icon: "GraduationCap",
    },
  ],
  howItWorks: [
    {
      step: 1,
      title: "1️⃣ Choose your job role",
      description:
        "Pick the role and level you’re targeting so we tailor questions and scoring.",
    },
    {
      step: 2,
      title: "2️⃣ Start your AI interview",
      description:
        "Our AI interviewer asks realistic questions based on your chosen role.",
    },
    {
      step: 3,
      title: "3️⃣ Answer naturally",
      description:
        "Respond just like a real interview—take your time and explain your thinking.",
    },
    {
      step: 4,
      title: "4️⃣ AI analyzes your responses",
      description:
        "Your answers are evaluated for clarity, structure, relevance, and key skills.",
    },
    {
      step: 5,
      title: "5️⃣ Get instant feedback & score",
      description:
        "Receive your score, strengths, improvement tips, and guidance for next time.",
    },
  ],
  testimonials: [
    {
      quote:
        "wzzfny made me comfortable on camera and helped me structure answers. I landed my product analyst role in three weeks.",
      author: "Nadia Hassan",
      title: "Product Analyst",
      company: "BrightCart",
      avatar: "NH",
    },
    {
      quote:
        "The AI report flagged filler words and pacing issues I never noticed. My confidence skyrocketed after a few sessions.",
      author: "Jordan Lee",
      title: "Software Engineer",
      company: "Stackline",
      avatar: "JL",
    },
    {
      quote:
        "Resume suggestions improved my keywords and I started getting more callbacks within a week.",
      author: "Priya Patel",
      title: "Marketing Specialist",
      company: "Northwind",
      avatar: "PP",
    },
    {
      quote:
        "The video feedback called out my filler-word spikes with timestamps. That made practice measurable and easy to fix.",
      author: "Omar El-Masry",
      title: "Data Analyst",
      company: "Atlas Health",
      avatar: "OE",
    },
    {
      quote:
        "The resume review highlighted weak metrics and gave before-and-after rewrites. I finally had bullets that showed impact.",
      author: "Lena Roberts",
      title: "UX Researcher",
      company: "Fieldstone",
      avatar: "LR",
    },
    {
      quote:
        "I liked that the report showed evidence, not generic tips. The pacing chart and STAR checklist helped me tighten stories.",
      author: "Carlos Vega",
      title: "Customer Success Manager",
      company: "Beaconline",
      avatar: "CV",
    },
  ],
  pricing: [
    {
      id: "free",
      name: "Free",
      price: "EGP 0",
      period: "month",
      description: "Best for beginners: 3 short sessions each month with starter tips.",
      features: [
        "3 short sessions each month",
        "Basic CV scan for format + keywords",
        "Text or audio answers",
        "Keep the latest report",
      ],
      cta: "Start free",
      highlighted: false,
    },
    {
      id: "starter_monthly",
      name: "Starter Monthly",
      price: "EGP 299",
      period: "month",
      description: "Best for beginners who want video feedback.",
      features: [
        "20 practice sessions each month",
        "Video or audio with AI tips",
        "Simple scorecard with 3 fixes",
        "Resume keyword suggestions",
      ],
      cta: "Sign Up Now",
      highlighted: false,
    },
    {
      id: "pro_monthly",
      name: "Pro Monthly",
      price: "EGP 599",
      period: "month",
      description: "Unlimited practice with deeper analysis and priority replies.",
      features: [
        "Unlimited practice sessions",
        "Video + voice analysis with timestamps",
        "Priority support responses",
        "Resume and cover letter rewrites",
      ],
      cta: "Sign Up Now",
      highlighted: true,
    },
    {
      id: "starter_yearly",
      name: "Starter Yearly",
      price: "EGP 1,999",
      period: "year",
      description: "Starter features billed yearly with 40% savings.",
      features: [
        "Everything in Starter Monthly",
        "40% savings with annual billing",
        "20 sessions every month",
        "Unlimited resume keyword checks",
      ],
      cta: "Sign Up Now",
      highlighted: false,
    },
    {
      id: "pro_yearly",
      name: "Pro Yearly",
      price: "EGP 3,999",
      period: "year",
      description: "Pro features billed yearly with 44% savings.",
      features: [
        "Everything in Pro Monthly",
        "44% savings with annual billing",
        "Unlimited sessions and reports",
        "Priority support and CV rewrites",
      ],
      cta: "Sign Up Now",
      highlighted: false,
    },
  ],
  faqs: [
    {
      question: "How does the AI evaluate my answers?",
      answer:
        "wzzfny analyzes clarity, structure, tone, pacing, and body language. You receive a detailed report with strengths, gaps, and tips after each response.",
    },
    {
      question: "How accurate is the analysis?",
      answer:
        "We score each response using a transparent rubric and measurable signals (speech rate, filler-word rate, eye contact when video is enabled). Every insight links back to evidence like timestamps or example phrases, and low-confidence areas are flagged for review. It’s guidance for practice, not a hiring decision.",
    },
    {
      question: "What equipment do I need?",
      answer:
        "A laptop or phone with a camera and microphone is enough. No special equipment or downloads required.",
    },
    {
      question: "What kinds of questions are included?",
      answer:
        "You can practice behavioral, technical, and hybrid questions. Filters let you choose by role, industry, and experience level.",
    },
    {
      question: "Can I upload my resume?",
      answer:
        "Yes. Upload PDF or DOCX files and get AI suggestions for formatting, keywords, and content impact.",
    },
    {
      question: "Is my video private?",
      answer:
        "Your recordings are private and secure by default. You control sharing and can delete videos anytime.",
    },
    {
      question: "Can I change or cancel my plan?",
      answer:
        "Absolutely. Upgrade, downgrade, or cancel at any time from your dashboard.",
    },
  ],
  logoCloud: [
    "CareerLab",
    "HireForward",
    "CampusWorks",
    "TalentBridge",
    "SkillForge",
    "InterviewHub",
  ],
  footerLinks: {
    product: [
      { name: "Interview Practice", href: "/interview-practice" },
      { name: "AI Feedback", href: "/ai-feedback" },
      { name: "Resume Review", href: "/resume-review" },
      { name: "Pricing", href: "/pricing" },
    ],
    company: [
      { name: "Company", href: "/company" },
      { name: "About", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
      { name: "Press", href: "/press" },
    ],
    resources: [
      { name: "Resources", href: "/resources" },
      { name: "Interview Guides", href: "/interview-guides" },
      { name: "Video Tips", href: "/video-tips" },
      { name: "Help Center", href: "/help-center" },
      { name: "Contact", href: "/contact" },
    ],
    legal: [
      { name: "Legal", href: "/legal" },
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms-of-service" },
      { name: "Cookie Policy", href: "/cookie-policy" },
    ],
  },
  socialLinks: [
    { name: "X", href: "https://x.com/namex308", icon: "Twitter" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/ali-hashem-1044883a8", icon: "Linkedin" },
    { name: "WhatsApp", href: "https://wa.me/201050008664", icon: "MessageCircle" },
  ],
  copy: {
    heroBadge: "AI-powered interview practice — Start training in minutes",
    logoCloudTitle: "Trusted by career centers, bootcamps, and hiring teams",
    sections: {
      features: {
        eyebrow: "Features",
        title: "Everything you need to ace interviews",
        subtitle:
          "Live practice, AI feedback, resume optimization, and resources to help you land the job.",
      },
      howItWorks: {
        eyebrow: "How it works",
        title: "Five clear steps from role to score",
        subtitle:
          "Choose your role, practice with AI, and see exactly how to improve.",
      },
      testimonials: {
        eyebrow: "Testimonials",
        title: "Loved by job seekers",
        subtitle: "Real people, real interviews, measurable progress.",
      },
      pricing: {
        eyebrow: "Pricing",
        title: "Simple, transparent pricing",
        subtitle: "Transparent monthly and yearly pricing in EGP for Starter and Pro.",
        promotion: "Annual plans: save up to 44% on Starter and Pro.",
      },
      faq: {
        eyebrow: "FAQ",
        title: "Frequently asked questions",
        subtitle: "Quick answers about practice sessions, feedback, and privacy.",
      },
    },
    faqContact: {
      prompt: "Still have questions?",
      linkLabel: "Contact our support team",
    },
    cta: {
      title: "Ready to ace your next interview?",
      subtitle:
        "Join candidates who are building confidence with wzzfny. Start practicing today and get instant AI feedback.",
      button: "View Sample Report",
    },
    blogIndex: {
      eyebrow: "wzzfny Blog",
      title: "Career tips, interview prep, and resume strategy",
      subtitle:
        "Practical guidance for job seekers, new graduates, and professionals looking to level up.",
      readArticle: "Read article →",
    },
    blogPost: {
      conclusionTitle: "Conclusion and Actionable Tips",
      continueTitle: "Continue with wzzfny",
      continueDescription:
        "Explore the main platform areas to keep improving your interview skills and resume.",
    },
    header: {
      signup: "Sign up",
      login: "Log in",
      languageLabel: "Language",
      dashboard: "Dashboard",
      signOut: "Sign out",
    },
    footer: {
      productTitle: "Product",
      companyTitle: "Company",
      resourcesTitle: "Resources",
      legalTitle: "Legal",
      rights: "All rights reserved.",
    },
  },
};

const siteContentAr: SiteContent = {
  siteConfig: {
    name: "wzzfny",
    description:
      "تدريب مقابلات بالذكاء الاصطناعي للممارسة بالفيديو المباشر، وملاحظات فورية، وتحسين السيرة الذاتية، وخطط نمو مخصصة.",
    tagline: "تدرّب على المقابلات مع ملاحظات الذكاء الاصطناعي واحصل على وظيفتك التالية",
    cta: {
      primary: "ابدأ التدريب",
      secondary: "شاهد عينة من الملاحظات",
    },
  },
  trustIndicators: [
    "رؤى مدعومة بالأدلة",
    "تقييمات شفافة",
    "خاص وآمن",
  ],
  navigation: [
    { name: "المميزات", href: "/#features" },
    { name: "كيف يعمل", href: "/#how-it-works" },
    { name: "الأسعار", href: "/#pricing" },
    { name: "الأسئلة الشائعة", href: "/#faq" },
  ],
  features: [
    {
      title: "مقابلات فيديو مباشرة",
      description:
        "اقرأ الأسئلة على الشاشة وسجّل الإجابات في الوقت الحقيقي لبناء الثقة أمام الكاميرا.",
      icon: "Video",
    },
    {
      title: "تقارير أداء بالذكاء الاصطناعي",
      description:
        "ملاحظات مدعومة بالأدلة مع درجات معيارية وتوقيتات وأمثلة من إجاباتك.",
      icon: "BarChart3",
    },
    {
      title: "مكتبة أسئلة واسعة",
      description:
        "آلاف الأسئلة السلوكية والتقنية والمختلطة حسب الدور والمستوى والصناعة.",
      icon: "BookOpen",
    },
    {
      title: "تحسين السيرة الذاتية",
      description:
        "تحسينات جاهزة لـ ATS مع فحص التنسيق والكلمات المفتاحية وإعادة صياغة الأثر.",
      icon: "FileText",
    },
    {
      title: "خطة تدريب مخصصة",
      description:
        "خطط تكيفية مبنية على الفجوات الملحوظة وتقدمك والدور المستهدف.",
      icon: "Target",
    },
    {
      title: "موارد تعليمية",
      description:
        "مقالات وفيديوهات ونصائح حول استراتيجية المقابلة ولغة الجسد والثقة.",
      icon: "GraduationCap",
    },
  ],
  howItWorks: [
    {
      step: 1,
      title: "1️⃣ اختر الوظيفة المستهدفة",
      description:
        "حدد الوظيفة والمستوى الذي تستهدفه لنضبط الأسئلة والتقييمات.",
    },
    {
      step: 2,
      title: "2️⃣ ابدأ مقابلة الذكاء الاصطناعي",
      description:
        "يطرح عليك المساعد أسئلة واقعية بناءً على الدور الذي اخترته.",
    },
    {
      step: 3,
      title: "3️⃣ أجب بطبيعتك",
      description:
        "أجب كما لو كنت في مقابلة حقيقية—خذ وقتك واشرح طريقة تفكيرك.",
    },
    {
      step: 4,
      title: "4️⃣ يحلل الذكاء الاصطناعي إجاباتك",
      description:
        "تُقيَّم إجاباتك للوضوح والبنية والملاءمة والمهارات الأساسية.",
    },
    {
      step: 5,
      title: "5️⃣ احصل على ملاحظات فورية ودرجة",
      description:
        "تتلقى درجتك ونقاط القوة ونصائح التحسين وإرشادات للجلسة التالية.",
    },
  ],
  testimonials: [
    {
      quote:
        "جعلني wzzfny مرتاحًا أمام الكاميرا وساعدني على تنظيم الإجابات. حصلت على وظيفة محلل منتجات خلال ثلاثة أسابيع.",
      author: "Nadia Hassan",
      title: "محللة منتجات",
      company: "BrightCart",
      avatar: "NH",
    },
    {
      quote:
        "كشف تقرير الذكاء الاصطناعي كلمات الحشو ومشاكل الإيقاع التي لم ألاحظها. ارتفعت ثقتي بسرعة بعد بضع جلسات.",
      author: "Jordan Lee",
      title: "مهندس برمجيات",
      company: "Stackline",
      avatar: "JL",
    },
    {
      quote:
        "تحسينات السيرة الذاتية عززت الكلمات المفتاحية وبدأت أتلقى ردودًا أكثر خلال أسبوع.",
      author: "Priya Patel",
      title: "أخصائية تسويق",
      company: "Northwind",
      avatar: "PP",
    },
    {
      quote:
        "ملاحظات الفيديو حدّدت كلمات الحشو مع توقيتات دقيقة، فأصبحت الممارسة قابلة للقياس وسهلة التحسين.",
      author: "Omar El-Masry",
      title: "محلل بيانات",
      company: "Atlas Health",
      avatar: "OE",
    },
    {
      quote:
        "مراجعة السيرة أبرزت ضعف الأرقام وقدّمت إعادة صياغة قبل/بعد، فصارت النقاط تُظهر الأثر.",
      author: "Lena Roberts",
      title: "باحثة تجربة مستخدم",
      company: "Fieldstone",
      avatar: "LR",
    },
    {
      quote:
        "أعجبني أن التقرير يعرض الأدلة لا النصائح العامة. مخطط الإيقاع وقائمة STAR ساعداني على شدّ القصص.",
      author: "Carlos Vega",
      title: "مدير نجاح العملاء",
      company: "Beaconline",
      avatar: "CV",
    },
  ],
  pricing: [
    {
      id: "free",
      name: "مجاني",
      price: "EGP 0",
      period: "شهر",
      description: "أفضل للبدايات: 3 جلسات قصيرة كل شهر مع نصائح تمهيدية.",
      features: [
        "3 جلسات قصيرة كل شهر",
        "فحص أساسي للسيرة الذاتية للتنسيق والكلمات المفتاحية",
        "إجابات نصية أو صوتية",
        "احتفظ بأحدث تقرير فقط",
      ],
      cta: "ابدأ مجانًا",
      highlighted: false,
    },
    {
      id: "starter_monthly",
      name: "ستارتر شهري",
      price: "EGP 299",
      period: "شهر",
      description: "أفضل للمبتدئين الذين يريدون ملاحظات فيديو.",
      features: [
        "20 جلسة تدريب كل شهر",
        "فيديو أو صوت مع نصائح ذكاء اصطناعي",
        "بطاقة درجات بسيطة مع 3 تحسينات",
        "اقتراحات كلمات مفتاحية للسيرة الذاتية",
      ],
      cta: "اشترك الآن",
      highlighted: false,
    },
    {
      id: "pro_monthly",
      name: "برو شهري",
      price: "EGP 599",
      period: "شهر",
      description: "تدريب غير محدود مع تحليل أعمق وردود أولوية.",
      features: [
        "جلسات تدريب غير محدودة",
        "تحليل فيديو وصوت مع طوابع زمنية",
        "دعم أولوية في الردود",
        "إعادة كتابة للسيرة الذاتية وخطاب التغطية",
      ],
      cta: "اشترك الآن",
      highlighted: true,
    },
    {
      id: "starter_yearly",
      name: "ستارتر سنوي",
      price: "EGP 1,999",
      period: "سنة",
      description: "مزايا ستارتر مع دفع سنوي وتوفير 40٪.",
      features: [
        "كل ما في ستارتر شهري",
        "توفير 40٪ مع الفوترة السنوية",
        "20 جلسة كل شهر",
        "فحوص كلمات مفتاحية غير محدودة للسيرة الذاتية",
      ],
      cta: "اشترك الآن",
      highlighted: false,
    },
    {
      id: "pro_yearly",
      name: "برو سنوي",
      price: "EGP 3,999",
      period: "سنة",
      description: "مزايا برو مع دفع سنوي وتوفير 44٪.",
      features: [
        "كل ما في برو شهري",
        "توفير 44٪ مع الفوترة السنوية",
        "جلسات وتقارير غير محدودة",
        "دعم أولوية وإعادة كتابة للسيرة الذاتية",
      ],
      cta: "اشترك الآن",
      highlighted: false,
    },
  ],
  faqs: [
    {
      question: "كيف يقيّم الذكاء الاصطناعي إجاباتي؟",
      answer:
        "يحلّل wzzfny الوضوح والبنية والنبرة والسرعة ولغة الجسد. تحصل على تقرير مفصل مع نقاط القوة والفجوات والنصائح بعد كل إجابة.",
    },
    {
      question: "ما مدى دقة التحليل؟",
      answer:
        "نقيّم كل إجابة عبر معيار شفاف وإشارات قابلة للقياس (سرعة الكلام، معدل كلمات الحشو، والتواصل البصري عند تفعيل الفيديو). كل ملاحظة مرتبطة بدليل مثل توقيتات أو أمثلة نصية، ونعلّم المناطق منخفضة الثقة للمراجعة. التحليل موجّه للتدريب وليس قرار توظيف.",
    },
    {
      question: "ما المعدات المطلوبة؟",
      answer:
        "يكفي لابتوب أو هاتف بكاميرا وميكروفون. لا حاجة لمعدات خاصة أو تنزيلات.",
    },
    {
      question: "ما أنواع الأسئلة المتاحة؟",
      answer:
        "يمكنك التدريب على الأسئلة السلوكية والتقنية والمختلطة. الفلاتر تسمح باختيار الدور والصناعة ومستوى الخبرة.",
    },
    {
      question: "هل يمكنني رفع سيرتي الذاتية؟",
      answer:
        "نعم. قم بتحميل ملفات PDF أو DOCX واحصل على تحسينات للتنسيق والكلمات المفتاحية والأثر.",
    },
    {
      question: "هل الفيديو الخاص بي آمن؟",
      answer:
        "تسجيلاتك خاصة وآمنة افتراضيًا. يمكنك التحكم في المشاركة وحذف الفيديوهات في أي وقت.",
    },
    {
      question: "هل يمكنني تغيير الخطة أو إلغاؤها؟",
      answer:
        "بالتأكيد. يمكنك الترقية أو الرجوع أو الإلغاء في أي وقت من لوحة التحكم.",
    },
  ],
  logoCloud: [
    "CareerLab",
    "HireForward",
    "CampusWorks",
    "TalentBridge",
    "SkillForge",
    "InterviewHub",
  ],
  footerLinks: {
    product: [
      { name: "تدريب المقابلات", href: "/interview-practice" },
      { name: "ملاحظات الذكاء الاصطناعي", href: "/ai-feedback" },
      { name: "مراجعة السيرة الذاتية", href: "/resume-review" },
      { name: "الأسعار", href: "/pricing" },
    ],
    company: [
      { name: "الشركة", href: "/company" },
      { name: "من نحن", href: "/about" },
      { name: "الوظائف", href: "/careers" },
      { name: "المدونة", href: "/blog" },
      { name: "الصحافة", href: "/press" },
    ],
    resources: [
      { name: "الموارد", href: "/resources" },
      { name: "أدلة المقابلات", href: "/interview-guides" },
      { name: "نصائح فيديو", href: "/video-tips" },
      { name: "مركز المساعدة", href: "/help-center" },
      { name: "تواصل معنا", href: "/contact" },
    ],
    legal: [
      { name: "قانوني", href: "/legal" },
      { name: "سياسة الخصوصية", href: "/privacy-policy" },
      { name: "شروط الخدمة", href: "/terms-of-service" },
      { name: "سياسة ملفات تعريف الارتباط", href: "/cookie-policy" },
    ],
  },
  socialLinks: [
    { name: "X", href: "https://x.com/namex308", icon: "Twitter" },
    { name: "لينكدإن", href: "https://www.linkedin.com/in/ali-hashem-1044883a8", icon: "Linkedin" },
    { name: "واتساب", href: "https://wa.me/201050008664", icon: "MessageCircle" },
  ],
  copy: {
    heroBadge: "تدريب مقابلات بالذكاء الاصطناعي — ابدأ خلال دقائق",
    logoCloudTitle: "موثوق به من مراكز التوظيف ومعسكرات التدريب وفرق التوظيف",
    sections: {
      features: {
        eyebrow: "المميزات",
        title: "كل ما تحتاجه للتميز في المقابلات",
        subtitle:
          "ممارسة مباشرة، وملاحظات بالذكاء الاصطناعي، وتحسين السيرة الذاتية، وموارد تساعدك على الحصول على الوظيفة.",
      },
      howItWorks: {
        eyebrow: "كيف يعمل",
        title: "خمس خطوات واضحة من الدور إلى الدرجة",
        subtitle:
          "اختر الدور، تدرّب مع الذكاء الاصطناعي، واعرف بالضبط كيف تتحسن.",
      },
      testimonials: {
        eyebrow: "آراء المستخدمين",
        title: "محبوب من الباحثين عن عمل",
        subtitle: "أشخاص حقيقيون، مقابلات حقيقية، تقدّم قابل للقياس.",
      },
      pricing: {
        eyebrow: "الأسعار",
        title: "أسعار واضحة وبسيطة",
        subtitle: "أسعار شهرية وسنوية واضحة بالجنيه المصري لخطط ستارتر وبرو.",
        promotion: "وفر حتى 44٪ مع الخطط السنوية لستارتر وبرو.",
      },
      faq: {
        eyebrow: "الأسئلة الشائعة",
        title: "الأسئلة الأكثر تكرارًا",
        subtitle: "إجابات سريعة حول الجلسات والملاحظات والخصوصية.",
      },
    },
    faqContact: {
      prompt: "ما زالت لديك أسئلة؟",
      linkLabel: "تواصل مع فريق الدعم",
    },
    cta: {
      title: "هل أنت مستعد للتألق في مقابلتك القادمة؟",
      subtitle:
        "انضم إلى المرشحين الذين يبنون الثقة مع wzzfny. ابدأ التدريب اليوم واحصل على ملاحظات فورية.",
      button: "عرض تقرير نموذجي",
    },
    blogIndex: {
      eyebrow: "مدونة wzzfny",
      title: "نصائح مهنية وتحضير للمقابلات واستراتيجية السيرة الذاتية",
      subtitle:
        "إرشادات عملية للباحثين عن عمل والخريجين الجدد والمهنيين الذين يريدون التطور.",
      readArticle: "اقرأ المقال →",
    },
    blogPost: {
      conclusionTitle: "الخلاصة ونصائح قابلة للتنفيذ",
      continueTitle: "تابع مع wzzfny",
      continueDescription:
        "استكشف أقسام المنصة الرئيسية لمواصلة تطوير مهارات المقابلات والسيرة الذاتية.",
    },
    header: {
      signup: "إنشاء حساب",
      login: "تسجيل الدخول",
      languageLabel: "اللغة",
      dashboard: "لوحة التحكم",
      signOut: "تسجيل الخروج",
    },
    footer: {
      productTitle: "المنتج",
      companyTitle: "الشركة",
      resourcesTitle: "الموارد",
      legalTitle: "قانوني",
      rights: "جميع الحقوق محفوظة.",
    },
  },
};

export const getSiteContent = (locale: Locale): SiteContent =>
  locale === "ar" ? siteContentAr : siteContentEn;

