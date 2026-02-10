import type { Locale } from "@/lib/i18n";

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
    id: "free" | "pro" | "premium";
    name: string;
    price: string;
    period: string;
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
      pricing: { eyebrow: string; title: string; subtitle: string };
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
    name: "Interviewly",
    description:
      "AI-powered interview training for live video practice, instant feedback, resume optimization, and personalized growth plans.",
    tagline: "Practice interviews with AI feedback and land your next job",
    cta: {
      primary: "Start Practicing",
      secondary: "Watch Sample Feedback",
    },
  },
  trustIndicators: [
    "Instant AI feedback",
    "Practice on any device",
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
        "Detailed feedback on clarity, structure, tone, pacing, and body language after every response.",
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
        "Upload PDF or DOCX to receive formatting, keyword, and impact improvements.",
      icon: "FileText",
    },
    {
      title: "Personalized Training Plan",
      description:
        "Adaptive practice plans, progress tracking, and skill milestones tailored to your goals.",
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
      title: "Set your goal",
      description:
        "Choose your role, experience level, and interview type for a personalized plan.",
    },
    {
      step: 2,
      title: "Record live responses",
      description:
        "Pick questions and answer on camera like a real interview.",
    },
    {
      step: 3,
      title: "Get AI feedback",
      description:
        "Receive a detailed report on clarity, structure, tone, and body language.",
    },
    {
      step: 4,
      title: "Improve and track progress",
      description:
        "Follow your training plan, repeat practice, and watch your scores rise.",
    },
  ],
  testimonials: [
    {
      quote:
        "Interviewly made me comfortable on camera and helped me structure answers. I landed my product analyst role in three weeks.",
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
  ],
  pricing: [
    {
      id: "free",
      name: "Free",
      price: "0 EGP",
      period: "month",
      description: "For light practice and a quick preview of Interviewly.",
      features: [
        "Basic dashboard (interview count)",
        "1 behavioral interview / month (no video)",
        "Resume upload: 1 time (basic AI feedback)",
        "Limited practice questions",
        "Save last report only",
      ],
      cta: "Start Free",
      highlighted: false,
    },
    {
      id: "pro",
      name: "Pro",
      price: "149 EGP",
      period: "month",
      description: "Most popular for active job seekers.",
      features: [
        "Full dashboard + progress tracking",
        "Unlimited interviews (behavioral / technical / mixed)",
        "Video interview recording",
        "AI analysis (answers, voice, body language)",
        "Detailed reports + charts",
        "Unlimited resume improvements",
        "Full practice questions library",
        "Save all interviews & reports",
      ],
      cta: "Start Pro",
      highlighted: true,
    },
    {
      id: "premium",
      name: "Premium",
      price: "299 EGP",
      period: "month",
      description: "For candidates who want the full advantage.",
      features: [
        "Everything in Pro",
        "Advanced video feedback (timestamped comments)",
        "Personalized training & daily exercises",
        "Real company interview simulations",
        "Job readiness score",
        "Priority access & support",
      ],
      cta: "Start Premium",
      highlighted: false,
    },
  ],
  faqs: [
    {
      question: "How does the AI evaluate my answers?",
      answer:
        "Interviewly analyzes clarity, structure, tone, pacing, and body language. You receive a detailed report with strengths, gaps, and tips after each response.",
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
    { name: "Twitter", href: "#", icon: "Twitter" },
    { name: "GitHub", href: "#", icon: "Github" },
    { name: "LinkedIn", href: "#", icon: "Linkedin" },
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
        title: "Practice in a structured, guided flow",
        subtitle:
          "Set a goal, record answers, and get actionable insights after every session.",
      },
      testimonials: {
        eyebrow: "Testimonials",
        title: "Loved by job seekers",
        subtitle: "Real people, real interviews, real results.",
      },
      pricing: {
        eyebrow: "Pricing",
        title: "Simple, transparent pricing",
        subtitle: "Clear monthly pricing in EGP.",
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
        "Join candidates building confidence with Interviewly. Start practicing today and get instant AI feedback.",
      button: "View Sample Report",
    },
    blogIndex: {
      eyebrow: "Interviewly Blog",
      title: "Career tips, interview prep, and resume strategy",
      subtitle:
        "Practical guidance for job seekers, fresh graduates, and professionals looking to level up.",
      readArticle: "Read article →",
    },
    blogPost: {
      conclusionTitle: "Conclusion and Actionable Tips",
      continueTitle: "Continue with Interviewly",
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
    name: "Interviewly",
    description:
      "تدريب مقابلات بالذكاء الاصطناعي للممارسة بالفيديو المباشر، وملاحظات فورية، وتحسين السيرة الذاتية، وخطط نمو مخصصة.",
    tagline: "تدرّب على المقابلات مع ملاحظات الذكاء الاصطناعي واحصل على وظيفتك التالية",
    cta: {
      primary: "ابدأ التدريب",
      secondary: "شاهد عينة من الملاحظات",
    },
  },
  trustIndicators: [
    "ملاحظات فورية من الذكاء الاصطناعي",
    "تدرّب على أي جهاز",
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
        "ملاحظات مفصّلة حول الوضوح والبنية والنبرة والسرعة ولغة الجسد بعد كل إجابة.",
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
        "حمّل ملفات PDF أو DOCX لتحصل على تحسينات في التنسيق والكلمات المفتاحية والأثر.",
      icon: "FileText",
    },
    {
      title: "خطة تدريب مخصصة",
      description:
        "خطط تدريب تكيفية، وتتبع للتقدم، ومهارات رئيسية مصممة لأهدافك.",
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
      title: "حدد هدفك",
      description:
        "اختر الدور ومستوى الخبرة ونوع المقابلة للحصول على خطة مخصصة.",
    },
    {
      step: 2,
      title: "سجّل الإجابات مباشرة",
      description:
        "اختر الأسئلة وأجب أمام الكاميرا كما في مقابلة حقيقية.",
    },
    {
      step: 3,
      title: "احصل على ملاحظات الذكاء الاصطناعي",
      description:
        "تقرير مفصّل عن الوضوح والبنية والنبرة ولغة الجسد.",
    },
    {
      step: 4,
      title: "طوّر الأداء وتابع التقدم",
      description:
        "اتبع خطة التدريب، وكرر الممارسة، وشاهد درجاتك تتحسن.",
    },
  ],
  testimonials: [
    {
      quote:
        "جعلني Interviewly مرتاحًا أمام الكاميرا وساعدني على تنظيم الإجابات. حصلت على وظيفة محلل منتجات خلال ثلاثة أسابيع.",
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
  ],
  pricing: [
    {
      id: "free",
      name: "مجاني",
      price: "0 EGP",
      period: "شهر",
      description: "للتجربة الخفيفة ومعاينة سريعة لـ Interviewly.",
      features: [
        "لوحة بيانات أساسية (عدد المقابلات)",
        "مقابلة سلوكية واحدة شهريًا (بدون فيديو)",
        "تحميل سيرة ذاتية مرة واحدة (ملاحظات أساسية)",
        "أسئلة تدريب محدودة",
        "حفظ آخر تقرير فقط",
      ],
      cta: "ابدأ مجانًا",
      highlighted: false,
    },
    {
      id: "pro",
      name: "احترافي",
      price: "149 EGP",
      period: "شهر",
      description: "الأكثر شعبية للباحثين عن عمل بجدية.",
      features: [
        "لوحة بيانات كاملة + تتبع التقدم",
        "مقابلات غير محدودة (سلوكية/تقنية/مختلطة)",
        "تسجيل مقابلات فيديو",
        "تحليل بالذكاء الاصطناعي (إجابات وصوت ولغة جسد)",
        "تقارير مفصلة ورسوم بيانية",
        "تحسينات غير محدودة للسيرة الذاتية",
        "مكتبة أسئلة كاملة",
        "حفظ كل المقابلات والتقارير",
      ],
      cta: "ابدأ احترافي",
      highlighted: true,
    },
    {
      id: "premium",
      name: "مميز",
      price: "299 EGP",
      period: "شهر",
      description: "لمن يريد أفضلية كاملة واستعدادًا عاليًا.",
      features: [
        "كل ما في احترافي",
        "تعليقات فيديو متقدمة (محددة بالتوقيت)",
        "تدريب مخصص وتمارين يومية",
        "محاكاة مقابلات لشركات حقيقية",
        "درجة جاهزية للوظيفة",
        "أولوية في الوصول والدعم",
      ],
      cta: "ابدأ مميز",
      highlighted: false,
    },
  ],
  faqs: [
    {
      question: "كيف يقيّم الذكاء الاصطناعي إجاباتي؟",
      answer:
        "يحلّل Interviewly الوضوح والبنية والنبرة والسرعة ولغة الجسد. تحصل على تقرير مفصل مع نقاط القوة والفجوات والنصائح بعد كل إجابة.",
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
    { name: "تويتر", href: "#", icon: "Twitter" },
    { name: "جيت هَب", href: "#", icon: "Github" },
    { name: "لينكدإن", href: "#", icon: "Linkedin" },
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
        title: "تدرّب ضمن مسار منظم وموجّه",
        subtitle:
          "حدّد هدفك، سجّل إجاباتك، واحصل على رؤى قابلة للتنفيذ بعد كل جلسة.",
      },
      testimonials: {
        eyebrow: "آراء المستخدمين",
        title: "محبوب من الباحثين عن عمل",
        subtitle: "أشخاص حقيقيون، مقابلات حقيقية، نتائج حقيقية.",
      },
      pricing: {
        eyebrow: "الأسعار",
        title: "أسعار واضحة وبسيطة",
        subtitle: "أسعار شهرية واضحة بالجنيه المصري.",
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
        "انضم إلى المرشحين الذين يبنون الثقة مع Interviewly. ابدأ التدريب اليوم واحصل على ملاحظات فورية.",
      button: "عرض تقرير نموذجي",
    },
    blogIndex: {
      eyebrow: "مدونة Interviewly",
      title: "نصائح مهنية وتحضير للمقابلات واستراتيجية السيرة الذاتية",
      subtitle:
        "إرشادات عملية للباحثين عن عمل والخريجين الجدد والمهنيين الذين يريدون التطور.",
      readArticle: "اقرأ المقال →",
    },
    blogPost: {
      conclusionTitle: "الخلاصة ونصائح قابلة للتنفيذ",
      continueTitle: "تابع مع Interviewly",
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
