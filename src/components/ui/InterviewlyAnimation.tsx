import {
  Video,
  BrainCircuit,
  FileText,
  TrendingUp,
  Sparkles,
} from "lucide-react";

interface InterviewlyAnimationProps {
  className?: string;
}

export function InterviewlyAnimation({
  className = "",
}: InterviewlyAnimationProps) {
  const audioBars = [0, 1, 2, 3, 4, 5, 6];
  const progressBars = [
    { height: "40%", delay: "0s" },
    { height: "55%", delay: "0.2s" },
    { height: "70%", delay: "0.4s" },
    { height: "60%", delay: "0.1s" },
    { height: "85%", delay: "0.3s" },
  ];

  return (
    <div
      className={`relative rounded-3xl border border-slate-800/80 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-8 overflow-hidden ${className}`}
    >
      {/* Ambient background */}
      <div className="absolute inset-0">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl anim-float-slow" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl anim-float" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_60%)]" />
      </div>

      <div className="relative grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          {/* Virtual interview session */}
          <div className="group rounded-2xl border border-slate-800/70 bg-slate-900/70 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-xl bg-indigo-500/20 text-indigo-200 flex items-center justify-center">
                    <Video className="h-5 w-5" />
                  </div>
                  <span className="absolute -right-1 -top-1 inline-flex h-4 w-4 items-center justify-center">
                    <span className="absolute inset-0 rounded-full bg-rose-500/40 anim-pulse-ring" />
                    <span className="relative h-2 w-2 rounded-full bg-rose-500" />
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Virtual interview
                  </p>
                  <p className="text-xs text-slate-400">Live recording mode</p>
                </div>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-emerald-400">
                Recording
              </span>
            </div>

            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="flex items-end gap-1 h-10">
                {audioBars.map((bar) => (
                  <div
                    key={bar}
                    className="h-8 w-1.5 rounded-full bg-indigo-400/70 origin-bottom anim-audio"
                    style={{ animationDelay: `${bar * 0.12}s` }}
                  />
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                <span>Clarity</span>
                <span className="text-emerald-400">+12%</span>
              </div>
            </div>
          </div>

          {/* Resume improvements */}
          <div className="group rounded-2xl border border-slate-800/70 bg-slate-900/70 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-lg hover:shadow-emerald-400/10">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-200 flex items-center justify-center">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Resume refinement
                </p>
                <p className="text-xs text-slate-400">
                  Actionable improvements
                </p>
              </div>
            </div>

            <div className="relative mt-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4 overflow-hidden">
              <div className="absolute inset-y-0 -left-1/2 w-1/2 bg-linear-to-r from-transparent via-emerald-400/20 to-transparent anim-shimmer" />
              <div className="relative space-y-2">
                <div className="h-2 w-4/5 rounded-full bg-slate-800" />
                <div className="h-2 w-3/4 rounded-full bg-slate-800" />
                <div className="h-2 w-5/6 rounded-full bg-emerald-400/40" />
                <div className="h-2 w-2/3 rounded-full bg-slate-800" />
                <div className="mt-3 flex items-center gap-2 text-xs text-emerald-300">
                  <Sparkles className="h-3 w-3" />
                  Stronger impact verbs suggested
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* AI analysis */}
          <div className="group rounded-2xl border border-slate-800/70 bg-slate-900/70 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/10">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-indigo-500/20 text-indigo-200 flex items-center justify-center">
                <BrainCircuit className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  AI performance analysis
                </p>
                <p className="text-xs text-slate-400">
                  Tone, structure, body language
                </p>
              </div>
            </div>

            <div className="relative mt-4 h-28 rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(99,102,241,0.2),transparent_60%)]" />
              <div className="absolute left-0 right-0 h-1 bg-emerald-400/70 anim-scan" />
              <div className="relative grid grid-cols-2 gap-3 p-4 text-xs text-slate-300">
                <div className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2">
                  <p className="text-slate-400">Tone</p>
                  <p className="font-semibold text-white">Confident</p>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2">
                  <p className="text-slate-400">Pacing</p>
                  <p className="font-semibold text-white">Balanced</p>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2">
                  <p className="text-slate-400">Structure</p>
                  <p className="font-semibold text-white">Clear</p>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2">
                  <p className="text-slate-400">Presence</p>
                  <p className="font-semibold text-white">Engaging</p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress tracking */}
          <div className="group rounded-2xl border border-slate-800/70 bg-slate-900/70 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-lg hover:shadow-emerald-400/10">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-200 flex items-center justify-center">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Growth tracking
                </p>
                <p className="text-xs text-slate-400">Progress over time</p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Last 4 sessions</span>
                <span className="text-emerald-400">+18%</span>
              </div>
              <div className="mt-3 flex items-end gap-3 h-20">
                {progressBars.map((bar, index) => (
                  <div
                    key={index}
                    className="h-full w-3 rounded-full bg-slate-800/80 overflow-hidden"
                  >
                    <div
                      className="w-full rounded-full bg-linear-to-t from-indigo-400/70 to-emerald-400/70 origin-bottom anim-rise"
                      style={{ height: bar.height, animationDelay: bar.delay }}
                    />
                  </div>
                ))}
              </div>
              <div className="relative mt-3 h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-2/3 bg-linear-to-r from-indigo-400 to-emerald-400 anim-progress origin-left" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white shadow-md anim-orbit" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
