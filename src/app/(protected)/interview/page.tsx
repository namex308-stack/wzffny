// app/(protected)/interview/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLocale } from "@/components/providers/LocaleProvider";

type Recording = {
  url: string;
  createdAt: string;
};

type InterviewMode = "ai" | "coach";

type InterviewStatus = "idle" | "active" | "completed";

const questionsEn = [
  {
    id: "q1",
    text: "Tell me about yourself and what led you to this role.",
  },
  {
    id: "q2",
    text: "Describe a time you solved a difficult problem under pressure.",
  },
  {
    id: "q3",
    text: "Walk me through a recent project you are proud of.",
  },
  {
    id: "q4",
    text: "How do you prioritize tasks when deadlines compete?",
  },
];

const questionsAr = [
  {
    id: "q1",
    text: "حدّثني عن نفسك وما الذي قادك إلى هذا الدور.",
  },
  {
    id: "q2",
    text: "صف موقفًا حللت فيه مشكلة صعبة تحت الضغط.",
  },
  {
    id: "q3",
    text: "حدّثني عن مشروع حديث تفخر به.",
  },
  {
    id: "q4",
    text: "كيف ترتّب أولوياتك عندما تتعارض المواعيد النهائية؟",
  },
];

const recorderMimeTypes = [
  "video/webm;codecs=vp9,opus",
  "video/webm;codecs=vp8,opus",
  "video/webm",
];

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const remainder = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainder}`;
};

export default function InterviewPage() {
  const searchParams = useSearchParams();
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  const t = (en: string, ar: string) => (isArabic ? ar : en);
  const questions = isArabic ? questionsAr : questionsEn;
  const copy = {
    studioLabel: t("Interview studio", "استوديو المقابلة"),
    headline: t("Prepare for your next interview", "استعد لمقابلتك القادمة"),
    subtitle: t(
      "Choose the interview style, target role, and how you want to record your answers.",
      "اختر نمط المقابلة والدور المستهدف وطريقة تسجيل إجاباتك.",
    ),
    cameraPreview: t("Camera preview", "معاينة الكاميرا"),
    hideCamera: t("Hide camera", "إخفاء الكاميرا"),
    interviewBrief: t("Interview brief", "ملخص المقابلة"),
    reviewDetails: t(
      "Review the details you shared before starting.",
      "راجع التفاصيل التي شاركتها قبل البدء.",
    ),
    editBrief: t("Edit brief", "تعديل الملخص"),
    interviewType: t("Interview type", "نوع المقابلة"),
    targetRole: t("Target role", "الدور المستهدف"),
    notSet: t("Not set", "غير محدد"),
    notSpecified: t("Not specified", "غير محدد"),
    industry: t("Industry", "الصناعة"),
    company: t("Company", "الشركة"),
    companyOpen: t("Open", "غير محددة"),
    seniority: t("Seniority", "المستوى الوظيفي"),
    experience: t("Experience", "الخبرة"),
    years: t("years", "سنة"),
    location: t("Location", "الموقع"),
    timePerQuestion: t("Time per question", "الوقت لكل سؤال"),
    seconds: t("seconds", "ثانية"),
    focusAreas: t("Focus areas", "مجالات التركيز"),
    generalPrep: t("General prep", "تحضير عام"),
    answerRecording: t("Answer recording", "تسجيل الإجابات"),
    recordingSubtitle: t(
      "Select the formats you want to capture during the interview.",
      "اختر الصيغ التي تريد تسجيلها أثناء المقابلة.",
    ),
    audio: t("Audio", "الصوت"),
    audioDesc: t(
      "Record voice responses for tone analysis.",
      "سجّل الإجابات الصوتية لتحليل النبرة.",
    ),
    video: t("Video", "الفيديو"),
    videoDesc: t(
      "Capture body language and eye contact.",
      "التقاط لغة الجسد والتواصل البصري.",
    ),
    text: t("Text", "نص"),
    textDesc: t(
      "Type answers when you want quick iterations.",
      "اكتب إجاباتك عندما تريد تكرارًا سريعًا.",
    ),
    readAloud: t("Read aloud", "القراءة بصوت مسموع"),
    readAloudDesc: t(
      "Play each question with speech synthesis.",
      "تشغيل كل سؤال عبر تحويل النص إلى كلام.",
    ),
    liveInterview: t("Live interview", "المقابلة المباشرة"),
    startSession: t(
      "Start a session with AI or a virtual coach.",
      "ابدأ جلسة مع محاور ذكاء اصطناعي أو مدرب افتراضي.",
    ),
    aiInterviewer: t("AI interviewer", "محاور ذكاء اصطناعي"),
    virtualCoach: t("Virtual coach", "مدرب افتراضي"),
    notStarted: t("Not started", "لم تبدأ بعد"),
    startAi: t("Start with AI interviewer", "ابدأ مع محاور الذكاء الاصطناعي"),
    startCoach: t("Start with virtual coach", "ابدأ مع المدرب الافتراضي"),
    timeRemaining: t("Time remaining", "الوقت المتبقي"),
    readQuestion: t("Read question aloud", "اقرأ السؤال بصوت مسموع"),
    turnOffCamera: t("Turn off camera", "إيقاف الكاميرا"),
    activateCamera: t("Activate camera", "تشغيل الكاميرا"),
    videoDisabled: t("Video recording disabled", "تسجيل الفيديو معطل"),
    recording: t("Recording...", "جارٍ التسجيل..."),
    recordVideoAnswer: t("Record video answer", "سجّل إجابة بالفيديو"),
    stopRecording: t("Stop recording", "إيقاف التسجيل"),
    textAnswerNotes: t("Text answer notes", "ملاحظات الإجابة النصية"),
    textAnswerPlaceholder: t(
      "Type key points or a full response.",
      "اكتب النقاط الرئيسية أو الإجابة كاملة.",
    ),
    videoSaved: t("Video answer saved", "تم حفظ إجابة الفيديو"),
    downloadVideo: t("Download video answer", "تحميل إجابة الفيديو"),
    timeIsUp: t("Time is up", "انتهى الوقت"),
    inProgress: t("In progress", "قيد التنفيذ"),
    finishInterview: t("Finish interview", "إنهاء المقابلة"),
    nextQuestion: t("Next question", "السؤال التالي"),
    interviewComplete: t("Interview complete", "اكتملت المقابلة"),
    reviewRecordings: t(
      "Review your recordings and notes below.",
      "راجع تسجيلاتك وملاحظاتك أدناه.",
    ),
    viewAnalysis: t("View analysis", "عرض التحليل"),
    startNewInterview: t("Start a new interview", "ابدأ مقابلة جديدة"),
    conversationFlow: t("Conversation flow", "سير الأسئلة"),
    trackQuestions: t(
      "Track each question and save your responses.",
      "تابع كل سؤال واحفظ إجاباتك.",
    ),
    questionLabel: t("Question", "السؤال"),
    answered: t("Answered", "تمت الإجابة"),
    skipped: t("Skipped", "تم التخطي"),
    pending: t("Pending", "قيد الانتظار"),
    savedAnswers: t("Saved answers", "الإجابات المحفوظة"),
    reviewSaved: t(
      "Review your recorded videos and notes after the session.",
      "راجع تسجيلات الفيديو والملاحظات بعد الجلسة.",
    ),
    noSaved: t("No saved answers yet.", "لا توجد إجابات محفوظة بعد."),
    typeLabel: t("Type", "النوع"),
  };

  const interviewTypeLabels: Record<
    string,
    { en: string; ar: string }
  > = {
    behavioral: { en: "Behavioral", ar: "سلوكي" },
    technical: { en: "Technical", ar: "تقني" },
    mixed: { en: "Mixed", ar: "مختلط" },
  };

  const formatInterviewType = (value: string) => {
    if (!value) return copy.notSet;
    const entry = interviewTypeLabels[value];
    if (!entry) return value;
    return isArabic ? entry.ar : entry.en;
  };

  const formatYears = (value: string) =>
    value ? `${value} ${copy.years}` : copy.notSpecified;

  const formatSeconds = (value: number) => `${value} ${copy.seconds}`;
  const [interviewType, setInterviewType] = useState("behavioral");
  const [targetRole, setTargetRole] = useState("");
  const [targetIndustry, setTargetIndustry] = useState("");
  const [targetCompany, setTargetCompany] = useState("");
  const [seniority, setSeniority] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [location, setLocation] = useState("");
  const [focusAreas, setFocusAreas] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [timePerQuestion, setTimePerQuestion] = useState(60);
  const [recordAudio, setRecordAudio] = useState(true);
  const [recordVideo, setRecordVideo] = useState(true);
  const [recordText, setRecordText] = useState(true);
  const [readAloud, setReadAloud] = useState(true);
  const [initializedFromQuery, setInitializedFromQuery] = useState(false);

  const [mode, setMode] = useState<InterviewMode | null>(null);
  const [status, setStatus] = useState<InterviewStatus>("idle");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);
  const [timeUp, setTimeUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [recordingState, setRecordingState] = useState<
    "idle" | "recording"
  >("idle");
  const [cameraActive, setCameraActive] = useState(false);
  const [recordings, setRecordings] = useState<Record<string, Recording>>({});
  const [textAnswers, setTextAnswers] = useState<Record<string, string>>({});

  const mediaStreamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const recordingQuestionIdRef = useRef<string | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const recordingsRef = useRef<Record<string, Recording>>({});

  useEffect(() => {
    if (initializedFromQuery) return;
    const type = searchParams.get("type");
    const role = searchParams.get("role");
    const industry = searchParams.get("industry");
    const company = searchParams.get("company");
    const level = searchParams.get("level");
    const years = searchParams.get("years");
    const locationParam = searchParams.get("location");
    const focus = searchParams.get("focus");
    const time = searchParams.get("time");
    const notesParam = searchParams.get("notes");

    if (type) setInterviewType(type);
    if (role) setTargetRole(role);
    if (industry) setTargetIndustry(industry);
    if (company) setTargetCompany(company);
    if (level) setSeniority(level);
    if (years) setExperienceYears(years);
    if (locationParam) setLocation(locationParam);
    if (notesParam) setNotes(notesParam);
    if (focus) {
      setFocusAreas(
        focus
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      );
    }
    if (time) {
      const parsed = Number(time);
      if (!Number.isNaN(parsed) && parsed > 0) {
        setTimePerQuestion(parsed);
      }
    }

    setInitializedFromQuery(true);
  }, [initializedFromQuery, searchParams]);

  const currentQuestion = useMemo(() => {
    if (status !== "active") return null;
    return questions[currentIndex] ?? null;
  }, [currentIndex, questions, status]);

  const timeProgress = useMemo(() => {
    if (timePerQuestion === 0) return 0;
    return Math.min(100, Math.max(0, (timeLeft / timePerQuestion) * 100));
  }, [timeLeft, timePerQuestion]);

  const setupQuery = useMemo(() => {
    const params = new URLSearchParams();
    if (interviewType) params.set("type", interviewType);
    if (targetRole.trim()) params.set("role", targetRole.trim());
    if (targetIndustry.trim()) params.set("industry", targetIndustry.trim());
    if (targetCompany.trim()) params.set("company", targetCompany.trim());
    if (seniority.trim()) params.set("level", seniority.trim());
    if (experienceYears.trim()) params.set("years", experienceYears.trim());
    if (location.trim()) params.set("location", location.trim());
    if (timePerQuestion) params.set("time", String(timePerQuestion));
    if (focusAreas.length > 0) params.set("focus", focusAreas.join(","));
    if (notes.trim()) params.set("notes", notes.trim());
    return params.toString();
  }, [
    interviewType,
    targetRole,
    targetIndustry,
    targetCompany,
    seniority,
    experienceYears,
    location,
    timePerQuestion,
    focusAreas,
    notes,
  ]);

  useEffect(() => {
    if (status !== "active") {
      setTimeLeft(timePerQuestion);
      setTimeUp(false);
      return;
    }

    if (timeLeft <= 0) {
      setTimeUp(true);
      return;
    }

    const timer = window.setTimeout(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [status, timeLeft, timePerQuestion]);

  useEffect(() => {
    if (!videoRef.current) return;
    if (mediaStreamRef.current) {
      videoRef.current.srcObject = mediaStreamRef.current;
    } else {
      videoRef.current.srcObject = null;
    }
  }, [cameraActive]);

  useEffect(() => {
    if (status !== "active" || !currentQuestion || !readAloud) return;

    if (typeof window === "undefined") return;
    if (!("speechSynthesis" in window)) return;

    const utterance = new SpeechSynthesisUtterance(currentQuestion.text);
    utterance.lang = isArabic ? "ar" : "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, [currentQuestion, isArabic, readAloud, status]);

  useEffect(() => {
    recordingsRef.current = recordings;
  }, [recordings]);

  useEffect(() => {
    return () => {
      if (recorderRef.current?.state === "recording") {
        recorderRef.current.stop();
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      Object.values(recordingsRef.current).forEach((recording) => {
        URL.revokeObjectURL(recording.url);
      });
    };
  }, []);

  const getRecorderOptions = () => {
    if (typeof MediaRecorder === "undefined") {
      return undefined;
    }
    const supported = recorderMimeTypes.find((type) =>
      MediaRecorder.isTypeSupported(type),
    );
    return supported ? { mimeType: supported } : undefined;
  };

  const startInterview = (selectedMode: InterviewMode) => {
    setMode(selectedMode);
    setStatus("active");
    setCurrentIndex(0);
    setTimeLeft(timePerQuestion);
    setTimeUp(false);
    setErrorMessage(null);
  };

  const stopRecording = () => {
    if (recorderRef.current && recorderRef.current.state !== "inactive") {
      recorderRef.current.stop();
    }
  };

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    setCameraActive(false);
  };

  const handleStartRecording = () => {
    if (!recordVideo) {
      setErrorMessage(
        t("Enable video recording to capture answers.", "فعّل تسجيل الفيديو لتسجيل الإجابات."),
      );
      return;
    }

    if (!mediaStreamRef.current) {
      setErrorMessage(
        t("Enable the camera before recording.", "فعّل الكاميرا قبل التسجيل."),
      );
      return;
    }

    if (!currentQuestion) {
      setErrorMessage(
        t("Start the interview to record an answer.", "ابدأ المقابلة لتسجيل إجابة."),
      );
      return;
    }

    if (typeof MediaRecorder === "undefined") {
      setErrorMessage(
        t(
          "Recording is not supported in this browser.",
          "التسجيل غير مدعوم في هذا المتصفح.",
        ),
      );
      return;
    }

    try {
      chunksRef.current = [];
      recordingQuestionIdRef.current = currentQuestion.id;

      const recorder = new MediaRecorder(
        mediaStreamRef.current,
        getRecorderOptions(),
      );

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType || "video/webm",
        });
        const url = URL.createObjectURL(blob);
        const questionId = recordingQuestionIdRef.current;

        if (questionId) {
          setRecordings((prev) => {
            const previous = prev[questionId];
            if (previous) {
              URL.revokeObjectURL(previous.url);
            }
            return {
              ...prev,
              [questionId]: {
                url,
                createdAt: new Date().toISOString(),
              },
            };
          });
        }
        setRecordingState("idle");
      };

      recorder.start();
      recorderRef.current = recorder;
      setRecordingState("recording");
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(
        t(
          "Unable to start recording. Please check permissions.",
          "تعذر بدء التسجيل. يرجى التحقق من الأذونات.",
        ),
      );
    }
  };

  const handleNextQuestion = () => {
    stopRecording();

    if (currentIndex + 1 >= questions.length) {
      stopCamera();
      setStatus("completed");
      setMode(null);
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setTimeLeft(timePerQuestion);
    setTimeUp(false);
  };

  const handleEnableCamera = async () => {
    setErrorMessage(null);

    if (typeof navigator === "undefined" || !navigator.mediaDevices) {
      setErrorMessage(
        t(
          "Camera access is not supported in this browser.",
          "الوصول إلى الكاميرا غير مدعوم في هذا المتصفح.",
        ),
      );
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: recordAudio,
      });
      mediaStreamRef.current = stream;
      setCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      setErrorMessage(
        t(
          "Camera access was denied or unavailable.",
          "تم رفض الوصول إلى الكاميرا أو أنها غير متاحة.",
        ),
      );
    }
  };

  const handleReplayQuestion = () => {
    if (!currentQuestion) return;
    if (typeof window === "undefined") return;
    if (!("speechSynthesis" in window)) return;
    const utterance = new SpeechSynthesisUtterance(currentQuestion.text);
    utterance.lang = isArabic ? "ar" : "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const handleTextChange = (questionId: string, value: string) => {
    setTextAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const currentRecording = currentQuestion
    ? recordings[currentQuestion.id]
    : undefined;

  const hasAnswer = (questionId: string) => {
    const recorded = Boolean(recordings[questionId]);
    const text = textAnswers[questionId]?.trim();
    return recorded || Boolean(text);
  };

  const hasAnySaved = useMemo(() => {
    if (Object.keys(recordings).length > 0) {
      return true;
    }
    return Object.values(textAnswers).some((value) => value.trim().length > 0);
  }, [recordings, textAnswers]);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <section className="rounded-2xl border border-(--border) bg-white/95 p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-(--ink-500)">
          {copy.studioLabel}
        </p>
        <h1 className="mt-3 font-display text-3xl text-(--ink-900)">
          {copy.headline}
        </h1>
        <p className="mt-2 text-sm text-(--ink-700)">
          {copy.subtitle}
        </p>
      </section>

      {cameraActive ? (
        <section className="rounded-2xl border border-(--border) bg-black/95 p-3 shadow-sm">
          <div className="overflow-hidden rounded-xl border border-black/20 bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[520px]"
            />
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-2 text-xs text-slate-200">
            <span>{copy.cameraPreview}</span>
            <button
              type="button"
              onClick={stopCamera}
              className="rounded-full border border-white/30 px-3 py-1 text-xs font-semibold text-white hover:border-white/60"
            >
              {copy.hideCamera}
            </button>
          </div>
        </section>
      ) : null}

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-(--border) bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-(--ink-900)">
                  {copy.interviewBrief}
                </h2>
                <p className="mt-1 text-sm text-(--ink-500)">
                  {copy.reviewDetails}
                </p>
              </div>
              <Link
                href={`/interview-setup${setupQuery ? `?${setupQuery}` : ""}`}
                className="text-sm font-semibold text-(--brand-700) hover:text-(--brand-600)"
              >
                {copy.editBrief}
              </Link>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 text-sm text-(--ink-700)">
              <div className="rounded-lg border border-(--border) bg-(--brand-50)/40 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--ink-500)">
                  {copy.interviewType}
                </p>
                <p className="mt-1 text-sm font-semibold text-(--ink-900)">
                  {formatInterviewType(interviewType)}
                </p>
              </div>
              <div className="rounded-lg border border-(--border) bg-(--brand-50)/40 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--ink-500)">
                  {copy.targetRole}
                </p>
                <p className="mt-1 text-sm font-semibold text-(--ink-900)">
                  {targetRole || copy.notSpecified}
                </p>
              </div>
              <div className="rounded-lg border border-(--border) bg-white px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--ink-500)">
                  {copy.industry}
                </p>
                <p className="mt-1 text-sm font-semibold text-(--ink-900)">
                  {targetIndustry || copy.notSpecified}
                </p>
              </div>
              <div className="rounded-lg border border-(--border) bg-white px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--ink-500)">
                  {copy.company}
                </p>
                <p className="mt-1 text-sm font-semibold text-(--ink-900)">
                  {targetCompany || copy.companyOpen}
                </p>
              </div>
              <div className="rounded-lg border border-(--border) bg-white px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--ink-500)">
                  {copy.seniority}
                </p>
                <p className="mt-1 text-sm font-semibold text-(--ink-900)">
                  {seniority || copy.notSpecified}
                </p>
              </div>
              <div className="rounded-lg border border-(--border) bg-white px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--ink-500)">
                  {copy.experience}
                </p>
                <p className="mt-1 text-sm font-semibold text-(--ink-900)">
                  {formatYears(experienceYears)}
                </p>
              </div>
              <div className="rounded-lg border border-(--border) bg-white px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--ink-500)">
                  {copy.location}
                </p>
                <p className="mt-1 text-sm font-semibold text-(--ink-900)">
                  {location || copy.notSpecified}
                </p>
              </div>
              <div className="rounded-lg border border-(--border) bg-white px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--ink-500)">
                  {copy.timePerQuestion}
                </p>
                <p className="mt-1 text-sm font-semibold text-(--ink-900)">
                  {formatSeconds(timePerQuestion)}
                </p>
              </div>
            </div>
            <div className="mt-4 rounded-lg border border-(--border) bg-(--brand-50)/50 px-4 py-3 text-sm text-(--ink-700)">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--ink-500)">
                {copy.focusAreas}
              </p>
              <p className="mt-2">
                {focusAreas.length > 0 ? focusAreas.join(", ") : copy.generalPrep}
              </p>
              {notes ? (
                <p className="mt-2 text-sm text-(--ink-600)">{notes}</p>
              ) : null}
            </div>
          </div>

          <div className="rounded-2xl border border-(--border) bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-(--ink-900)">
              {copy.answerRecording}
            </h2>
            <p className="mt-1 text-sm text-(--ink-500)">
              {copy.recordingSubtitle}
            </p>

            <div className="mt-5 space-y-3 text-sm text-(--ink-700)">
              <label className="flex items-center justify-between rounded-lg border border-(--border) bg-(--brand-50)/60 px-4 py-3">
                <div>
                  <p className="font-semibold text-(--ink-900)">{copy.audio}</p>
                  <p className="text-xs text-(--ink-500)">
                    {copy.audioDesc}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={recordAudio}
                  onChange={(event) => setRecordAudio(event.target.checked)}
                  className="h-4 w-4 rounded border-(--border) text-(--brand-600) focus:ring-(--brand-100)"
                />
              </label>
              <label className="flex items-center justify-between rounded-lg border border-(--border) bg-white px-4 py-3">
                <div>
                  <p className="font-semibold text-(--ink-900)">{copy.video}</p>
                  <p className="text-xs text-(--ink-500)">
                    {copy.videoDesc}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={recordVideo}
                  onChange={(event) => setRecordVideo(event.target.checked)}
                  className="h-4 w-4 rounded border-(--border) text-(--brand-600) focus:ring-(--brand-100)"
                />
              </label>
              <label className="flex items-center justify-between rounded-lg border border-(--border) bg-white px-4 py-3">
                <div>
                  <p className="font-semibold text-(--ink-900)">{copy.text}</p>
                  <p className="text-xs text-(--ink-500)">
                    {copy.textDesc}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={recordText}
                  onChange={(event) => setRecordText(event.target.checked)}
                  className="h-4 w-4 rounded border-(--border) text-(--brand-600) focus:ring-(--brand-100)"
                />
              </label>
              <label className="flex items-center justify-between rounded-lg border border-(--border) bg-white px-4 py-3">
                <div>
                  <p className="font-semibold text-(--ink-900)">{copy.readAloud}</p>
                  <p className="text-xs text-(--ink-500)">
                    {copy.readAloudDesc}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={readAloud}
                  onChange={(event) => setReadAloud(event.target.checked)}
                  className="h-4 w-4 rounded border-(--border) text-(--brand-600) focus:ring-(--brand-100)"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-(--border) bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-(--ink-900)">
                  {copy.liveInterview}
                </h2>
                <p className="mt-1 text-sm text-(--ink-500)">
                  {status === "active"
                    ? isArabic
                      ? `السؤال ${currentIndex + 1} من ${questions.length}`
                      : `Question ${currentIndex + 1} of ${questions.length}`
                    : copy.startSession}
                </p>
              </div>
              <span className="rounded-full bg-(--brand-50) px-3 py-1 text-xs font-semibold text-(--brand-700)">
                {mode
                  ? mode === "ai"
                    ? copy.aiInterviewer
                    : copy.virtualCoach
                  : copy.notStarted}
              </span>
            </div>

            {status === "idle" ? (
              <div className="mt-5 space-y-3">
                <button
                  type="button"
                  className="w-full rounded-lg bg-(--brand-600) px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-(--brand-700)"
                  onClick={() => startInterview("ai")}
                >
                  {copy.startAi}
                </button>
                <button
                  type="button"
                  className="w-full rounded-lg border border-(--border) px-4 py-2.5 text-sm font-semibold text-(--ink-700) shadow-sm transition hover:border-(--brand-200)"
                  onClick={() => startInterview("coach")}
                >
                  {copy.startCoach}
                </button>
              </div>
            ) : null}

            {status === "active" && currentQuestion ? (
              <div className="mt-5 space-y-5">
                <div className="rounded-lg border border-(--border) bg-(--brand-50)/50 px-4 py-3">
                  <p className="text-sm font-semibold text-(--ink-900)">
                    {currentQuestion.text}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-(--ink-600)">
                    <span>
                      {copy.timePerQuestion}: {formatSeconds(timePerQuestion)}
                    </span>
                    <span>
                      {copy.targetRole}: {targetRole || copy.notSpecified}
                    </span>
                    <span>
                      {copy.typeLabel}: {formatInterviewType(interviewType)}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-(--ink-600)">
                    <span>{copy.timeRemaining}</span>
                    <span className={timeUp ? "text-red-600" : ""}>
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-(--brand-50)">
                    <div
                      className={`h-2 rounded-full ${
                        timeUp
                          ? "bg-red-500"
                          : "bg-(--brand-600)"
                      }`}
                      style={{ width: `${timeProgress}%` }}
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    className="rounded-lg border border-(--border) px-3 py-2 text-sm font-semibold text-(--ink-700) shadow-sm transition hover:border-(--brand-200)"
                    onClick={handleReplayQuestion}
                  >
                    {copy.readQuestion}
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border border-(--border) px-3 py-2 text-sm font-semibold text-(--ink-700) shadow-sm transition hover:border-(--brand-200)"
                    onClick={cameraActive ? stopCamera : handleEnableCamera}
                  >
                    {cameraActive ? copy.turnOffCamera : copy.activateCamera}
                  </button>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="rounded-lg bg-(--brand-600) px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-(--brand-700) disabled:cursor-not-allowed disabled:bg-slate-300"
                    onClick={handleStartRecording}
                    disabled={!recordVideo || recordingState === "recording"}
                  >
                    {!recordVideo
                      ? copy.videoDisabled
                      : recordingState === "recording"
                        ? copy.recording
                        : copy.recordVideoAnswer}
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border border-(--border) px-3 py-2 text-sm font-semibold text-(--ink-700) shadow-sm transition hover:border-(--brand-200) disabled:cursor-not-allowed"
                    onClick={stopRecording}
                    disabled={recordingState !== "recording"}
                  >
                    {copy.stopRecording}
                  </button>
                </div>

                {recordText ? (
                  <div>
                    <label
                      htmlFor="text-answer"
                      className="text-sm font-semibold text-(--ink-700)"
                    >
                      {copy.textAnswerNotes}
                    </label>
                    <textarea
                      id="text-answer"
                      className="mt-2 min-h-[120px] w-full rounded-lg border border-(--border) bg-white px-3 py-2.5 text-sm text-(--ink-900) shadow-sm focus:border-(--brand-600) focus:outline-none focus:ring-2 focus:ring-(--brand-100)"
                      value={textAnswers[currentQuestion.id] || ""}
                      onChange={(event) =>
                        handleTextChange(currentQuestion.id, event.target.value)
                      }
                      placeholder={copy.textAnswerPlaceholder}
                    />
                  </div>
                ) : null}

                {currentRecording ? (
                  <div className="rounded-lg border border-(--border) bg-(--brand-50)/40 p-3 text-sm text-(--ink-700)">
                    <p className="font-semibold text-(--ink-900)">
                      {copy.videoSaved}
                    </p>
                    <div className="mt-2 grid gap-2">
                      <video
                        src={currentRecording.url}
                        controls
                        className="h-40 w-full rounded-lg border border-(--border) object-cover"
                      />
                      <a
                        href={currentRecording.url}
                        download={`interview-answer-${currentQuestion.id}.webm`}
                        className="text-xs font-semibold text-(--brand-700) hover:text-(--brand-600)"
                      >
                        {copy.downloadVideo}
                      </a>
                    </div>
                  </div>
                ) : null}

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span
                    className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                      timeUp ? "text-red-600" : "text-(--ink-500)"
                    }`}
                  >
                    {timeUp ? copy.timeIsUp : copy.inProgress}
                  </span>
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                  >
                    {currentIndex + 1 >= questions.length
                      ? copy.finishInterview
                      : copy.nextQuestion}
                  </button>
                </div>
              </div>
            ) : null}

            {status === "completed" ? (
              <div className="mt-5 rounded-lg border border-(--border) bg-(--brand-50)/40 p-4 text-sm text-(--ink-700)">
                <p className="font-semibold text-(--ink-900)">
                  {copy.interviewComplete}
                </p>
                <p className="mt-1 text-sm text-(--ink-600)">
                  {copy.reviewRecordings}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href={`/interview-analysis${setupQuery ? `?${setupQuery}` : ""}`}
                    className="rounded-lg bg-(--brand-600) px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-(--brand-700)"
                  >
                    {copy.viewAnalysis}
                  </Link>
                  <button
                    type="button"
                    className="rounded-lg border border-(--border) px-3 py-2 text-sm font-semibold text-(--ink-700)"
                    onClick={() => {
                      setStatus("idle");
                      setMode(null);
                      setCurrentIndex(0);
                      setTimeLeft(timePerQuestion);
                      setTimeUp(false);
                    }}
                  >
                    {copy.startNewInterview}
                  </button>
                </div>
              </div>
            ) : null}

            {errorMessage ? (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {errorMessage}
              </div>
            ) : null}
          </div>

          <div className="rounded-2xl border border-(--border) bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-(--ink-900)">
              {copy.conversationFlow}
            </h2>
            <p className="mt-1 text-sm text-(--ink-500)">
              {copy.trackQuestions}
            </p>
            <div className="mt-4 space-y-3">
              {questions.map((question, index) => {
                const isCurrent = status === "active" && index === currentIndex;
                return (
                  <div
                    key={question.id}
                    className={`rounded-lg border px-4 py-3 text-sm ${
                      isCurrent
                        ? "border-(--brand-200) bg-(--brand-50)/70"
                        : "border-(--border) bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-(--ink-500)">
                      <span>
                        {copy.questionLabel} {index + 1}
                      </span>
                      <span>
                        {hasAnswer(question.id)
                          ? copy.answered
                          : status === "completed" && index <= currentIndex
                            ? copy.skipped
                            : copy.pending}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-(--ink-900)">
                      {question.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-(--border) bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-(--ink-900)">
              {copy.savedAnswers}
            </h2>
            <p className="mt-1 text-sm text-(--ink-500)">
              {copy.reviewSaved}
            </p>
            <div className="mt-4 space-y-4">
              {questions.map((question) => {
                const recording = recordings[question.id];
                const note = textAnswers[question.id];
                if (!recording && !note) {
                  return null;
                }
                return (
                  <div
                    key={question.id}
                    className="rounded-lg border border-(--border) bg-(--brand-50)/40 p-4"
                  >
                    <p className="text-sm font-semibold text-(--ink-900)">
                      {question.text}
                    </p>
                    {recording ? (
                      <video
                        src={recording.url}
                        controls
                        className="mt-3 h-36 w-full rounded-lg border border-(--border) object-cover"
                      />
                    ) : null}
                    {note ? (
                      <p className="mt-3 text-sm text-(--ink-600)">{note}</p>
                    ) : null}
                  </div>
                );
              })}
              {!hasAnySaved ? (
                <p className="text-sm text-(--ink-500)">
                  {copy.noSaved}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
