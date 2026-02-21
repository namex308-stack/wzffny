import type { Metadata } from "next";
import { Fraunces, Manrope, Noto_Sans_Arabic } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ChatWidgetClient } from "@/components/chat/ChatWidgetClient";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { getServerLocale } from "@/lib/locale.server";
import {
  defaultOpenGraphImage,
  defaultTwitterImage,
  getMetadataBase,
} from "@/lib/seo";
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
  metadataBase: getMetadataBase(),
  title: {
    default: "wzzfny - AI Interview Practice and Resume Optimization",
    template: "%s | wzzfny",
  },
  description:
    "Practice live video interviews, get evidence-backed AI feedback, optimize your resume, and follow a personalized training plan.",
  keywords: [
    "interview practice",
    "mock interview",
    "ai interview",
    "resume optimization",
    "career coaching",
    "job search",
  ],
  authors: [{ name: "wzzfny" }],
  applicationName: "wzzfny",
  creator: "wzzfny",
  publisher: "wzzfny",
  openGraph: {
    title: "wzzfny - AI Interview Practice and Resume Optimization",
    description:
      "Practice live video interviews, get evidence-backed AI feedback, optimize your resume, and follow a personalized training plan.",
    url: "/",
    type: "website",
    locale: "en_US",
    siteName: "wzzfny",
    images: [
      {
        url: defaultOpenGraphImage,
        width: 1200,
        height: 630,
        alt: "wzzfny",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "wzzfny - AI Interview Practice and Resume Optimization",
    description:
      "Practice live video interviews, get evidence-backed AI feedback, optimize your resume, and follow a personalized training plan.",
    images: [defaultTwitterImage],
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
        <LocaleProvider initialLocale={locale}>
          {children}
          <ChatWidgetClient />
        </LocaleProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}

