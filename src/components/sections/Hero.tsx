import Link from "next/link";
import { Play } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { TrustBadges } from "@/components/ui/TrustBadges";
import { InterviewlyAnimationClient } from "@/components/ui/InterviewlyAnimationClient";
import { getSiteContent } from "@/lib/siteContent";
import { getServerLocale } from "@/lib/locale.server";

export async function Hero() {
  const locale = await getServerLocale();
  const content = getSiteContent(locale);

  return (
    <section className="relative overflow-hidden pt-32 pb-20 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.35),transparent_70%)] blur-3xl anim-glow" />
        <div className="absolute left-[-8%] top-24 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl anim-drift" />
        <div className="absolute right-[-6%] bottom-[-10%] h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl anim-drift" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:64px_64px] opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.12),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(16,185,129,0.12),transparent_35%),radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.12),transparent_45%)]" />
        <div className="absolute -top-1/3 left-0 right-0 h-1/2 bg-[linear-gradient(120deg,transparent,rgba(59,130,246,0.18),transparent)] anim-sweep" />
        <div className="absolute top-10 right-10 h-32 w-32 rounded-full border border-indigo-200/40 anim-spin-slow" />
        <div
          className="absolute bottom-16 left-10 h-20 w-20 rounded-full border border-emerald-200/50 anim-spin-slow"
          style={{ animationDuration: "18s" }}
        />
      </div>

      <Container>
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            {content.copy.heroBadge}
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight mb-6">
            {content.siteConfig.tagline}
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto">
            {content.siteConfig.description}
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/ai-feedback"
              className="inline-flex w-full sm:w-auto items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer px-8 py-4 text-lg bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500"
            >
              <Play size={20} className="icon-inline" />
              {content.siteConfig.cta.secondary}
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-10">
            <TrustBadges items={content.trustIndicators} />
          </div>
        </div>

        {/* Hero Animation */}
        <div className="mt-16 relative">
          <div className="relative mx-auto max-w-5xl">
            <div className="absolute -left-8 top-8 hidden lg:block">
              <div className="rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-lg backdrop-blur anim-float">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Confidence score
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-900">88%</p>
                <p className="text-xs text-emerald-600">+12% this week</p>
              </div>
            </div>
            <div className="absolute -right-10 bottom-10 hidden lg:block">
              <div className="rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-lg backdrop-blur anim-float-slow">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Live readiness
                </p>
                <div className="mt-2 flex items-center gap-2 text-xs text-slate-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  AI feedback enabled
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-slate-600">
                  <span className="h-2 w-2 rounded-full bg-indigo-500" />
                  Real-time coaching
                </div>
              </div>
            </div>
            {/* Main browser mockup */}
            <div className="relative">
              {/* Soft shadow underneath */}
              <div
                className="absolute -inset-4 bg-gradient-to-b from-indigo-200/20 via-indigo-100/10 to-transparent rounded-3xl blur-2xl"
                aria-hidden="true"
              />
              <div
                className="absolute -inset-10 rounded-[2.5rem] border border-white/40 bg-white/10 backdrop-blur-[2px]"
                aria-hidden="true"
              />
              <InterviewlyAnimationClient />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
