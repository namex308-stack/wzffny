"use client";

import { useEffect, useState } from "react";
import { InterviewlyAnimation } from "@/components/ui/InterviewlyAnimation";

interface InterviewlyAnimationClientProps {
  className?: string;
}

export function InterviewlyAnimationClient({
  className = "",
}: InterviewlyAnimationClientProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`relative min-h-[520px] rounded-3xl border border-slate-800/80 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-8 overflow-hidden ${className}`}
        aria-hidden="true"
      />
    );
  }

  return <InterviewlyAnimation className={className} />;
}
