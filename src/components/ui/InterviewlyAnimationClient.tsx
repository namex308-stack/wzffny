"use client";

import dynamic from "next/dynamic";

interface InterviewlyAnimationClientProps {
  className?: string;
}

const InterviewlyAnimation = dynamic(
  () => import("@/components/ui/InterviewlyAnimation").then((mod) => mod.InterviewlyAnimation),
  {
    ssr: false,
    loading: () => (
      <div
        className="relative min-h-[520px] rounded-3xl border border-slate-800/80 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-8 overflow-hidden"
        aria-hidden="true"
      />
    ),
  },
);

export function InterviewlyAnimationClient({
  className = "",
}: InterviewlyAnimationClientProps) {
  return <InterviewlyAnimation className={className} />;
}
