import { ReactNode } from "react";

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  side?: ReactNode;
}

export function AuthShell({ title, subtitle, children, side }: AuthShellProps) {
  const hasSide = Boolean(side);

  return (
    <main className="min-h-screen bg-[color:var(--surface)] text-[color:var(--ink-900)]">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-sky-50" />
        <div className="relative mx-auto max-w-6xl px-6 py-14 lg:py-20">
          <div
            className={`grid items-start gap-10 ${
              hasSide ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]" : ""
            }`}
          >
            <section className={hasSide ? "" : "mx-auto w-full max-w-xl"}>
              <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] p-8 shadow-sm">
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--ink-500)]">
                    Interviewly
                  </p>
                  <h1 className="mt-3 font-display text-3xl text-[color:var(--ink-900)]">
                    {title}
                  </h1>
                  <p className="mt-2 text-sm text-[color:var(--ink-700)]">
                    {subtitle}
                  </p>
                </div>
                {children}
              </div>
            </section>
            {side ? (
              <aside className="rounded-2xl border border-[color:var(--border)] bg-white/90 p-8 shadow-sm">
                {side}
              </aside>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
