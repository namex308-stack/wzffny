"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AUTH_DISABLED } from "@/lib/authConfig";
import { supabase } from "@/lib/supabaseClient";
import { useLocale } from "@/components/providers/LocaleProvider";

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const authDisabled = AUTH_DISABLED;
  const [checking, setChecking] = useState(!authDisabled);
  const { locale } = useLocale();
  const copy =
    locale === "ar"
      ? {
          verifying: "جارٍ التحقق من الجلسة",
          wait: "يرجى الانتظار بينما نؤمّن مساحة العمل الخاصة بك.",
        }
      : {
          verifying: "Verifying your session",
          wait: "Please wait while we secure your workspace.",
        };

  useEffect(() => {
    let active = true;

    if (authDisabled) {
      setChecking(false);
      return () => {
        active = false;
      };
    }

    const handleRedirect = () => {
      const query = searchParams?.toString();
      const safePath = pathname && pathname.startsWith("/") ? pathname : "/dashboard";
      const fullPath = query ? `${safePath}?${query}` : safePath;
      const nextParam = encodeURIComponent(fullPath);
      router.replace(`/login?next=${nextParam}`);
    };

    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!active) return;
      if (error || !data.session) {
        handleRedirect();
        return;
      }
      setChecking(false);
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        handleRedirect();
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [authDisabled, pathname, router, searchParams]);

  if (checking) {
    return (
      <div className="min-h-screen bg-[color:var(--surface)] flex items-center justify-center px-6">
        <div className="max-w-sm text-center">
          <div className="text-sm uppercase tracking-[0.3em] text-[color:var(--ink-500)]">
            Interviewly
          </div>
          <p className="mt-3 text-lg font-semibold text-[color:var(--ink-900)]">
            {copy.verifying}
          </p>
          <p className="mt-2 text-sm text-[color:var(--ink-700)]">
            {copy.wait}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
