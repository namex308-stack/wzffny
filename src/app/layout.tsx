import type { Metadata } from "next";
import { Fraunces, Manrope, Noto_Sans_Arabic } from "next/font/google";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { getServerLocale } from "@/lib/locale.server";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-ar",
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Interviewly - AI Interview Practice and Resume Optimization",
  description:
    "Practice live video interviews, get instant AI feedback, optimize your resume, and follow a personalized training plan.",
  keywords: [
    "interview practice",
    "mock interview",
    "ai interview",
    "resume optimization",
    "career coaching",
    "job search",
  ],
  authors: [{ name: "Interviewly" }],
  openGraph: {
    title: "Interviewly - AI Interview Practice and Resume Optimization",
    description:
      "Practice live video interviews, get instant AI feedback, optimize your resume, and follow a personalized training plan.",
    type: "website",
    locale: "en_US",
    siteName: "Interviewly",
  },
  twitter: {
    card: "summary_large_image",
    title: "Interviewly - AI Interview Practice and Resume Optimization",
    description:
      "Practice live video interviews, get instant AI feedback, optimize your resume, and follow a personalized training plan.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerLocale();
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction} className="scroll-smooth">
      <body
        className={`${manrope.variable} ${fraunces.variable} ${notoArabic.variable} antialiased`}
      >
        <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
