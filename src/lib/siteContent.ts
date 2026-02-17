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
    id: "free" | "paid";
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
      price: "$0",
      period: "month",
      description: "For light practice and a quick preview of wzzfny.",
      features: [
        "Basic dashboard (interview count)",
        "1 behavioral interview / month (no video)",
        "Resume upload: once (basic AI feedback)",
        "Limited practice questions",
        "Save only the most recent report",
      ],
      cta: "Start Free",
      highlighted: false,
    },
    {
      id: "paid",
      name: "Paid",
      price: "$10",
      period: "month",
      secondaryPrice: "$80",
      secondaryPeriod: "year",
      description: "Full access for serious job seekers.",
      features: [
        "Full dashboard + progress tracking",
        "Unlimited interviews (behavioral, technical, or mixed)",
        "Video interview recordings",
        "AI analysis (answers, voice, and body language)",
        "Detailed reports + charts",
        "Unlimited resume improvements",
        "Full practice questions library",
        "Save all interviews and reports",
        "Advanced video feedback (timestamped comments)",
        "Personalized training and daily exercises",
        "Priority access and support",
      ],
      cta: "Start Paid",
      highlighted: true,
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
        title: "Practice in a structured, guided flow",
        subtitle:
          "Set a goal, record answers, and get actionable insights after every session.",
      },
      testimonials: {
        eyebrow: "Testimonials",
        title: "Loved by job seekers",
        subtitle: "Real people, real interviews, measurable progress.",
      },
      pricing: {
        eyebrow: "Pricing",
        title: "Simple, transparent pricing",
        subtitle: "Clear monthly and yearly pricing in USD.",
        promotion:
          "One-month discount: Save 20% on your first month for both Free and Paid plans.",
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
      price: "$0",
      period: "شهر",
      description: "للتجربة الخفيفة ومعاينة سريعة لـ wzzfny.",
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
      id: "paid",
      name: "مدفوع",
      price: "$10",
      period: "شهر",
      secondaryPrice: "$80",
      secondaryPeriod: "سنة",
      description: "وصول كامل للباحثين عن عمل بجدية.",
      features: [
        "لوحة بيانات كاملة + تتبع التقدم",
        "مقابلات غير محدودة (سلوكية/تقنية/مختلطة)",
        "تسجيل مقابلات فيديو",
        "تحليل بالذكاء الاصطناعي (إجابات وصوت ولغة جسد)",
        "تقارير مفصلة ورسوم بيانية",
        "تحسينات غير محدودة للسيرة الذاتية",
        "مكتبة أسئلة كاملة",
        "حفظ كل المقابلات والتقارير",
        "تعليقات فيديو متقدمة (محددة بالتوقيت)",
        "تدريب مخصص وتمارين يومية",
        "أولوية في الوصول والدعم",
      ],
      cta: "ابدأ الخطة المدفوعة",
      highlighted: true,
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
        title: "تدرّب ضمن مسار منظم وموجّه",
        subtitle:
          "حدّد هدفك، سجّل إجاباتك، واحصل على رؤى قابلة للتنفيذ بعد كل جلسة.",
      },
      testimonials: {
        eyebrow: "آراء المستخدمين",
        title: "محبوب من الباحثين عن عمل",
        subtitle: "أشخاص حقيقيون، مقابلات حقيقية، تقدّم قابل للقياس.",
      },
      pricing: {
        eyebrow: "الأسعار",
        title: "أسعار واضحة وبسيطة",
        subtitle: "أسعار شهرية وسنوية واضحة بالدولار الأمريكي.",
        promotion:
          "خصم لمدة شهر واحد: وفّر 20٪ على أول شهر في الخطتين المجانية والمدفوعة.",
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

