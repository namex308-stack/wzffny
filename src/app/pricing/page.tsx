import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { getServerLocale } from "@/lib/locale.server";
import { defaultOpenGraphImage, defaultTwitterImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pricing | wzzfny",
  description: "Free and paid plans for interview practice, AI feedback, and resume review.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Pricing | wzzfny",
    description:
      "Free and paid plans for interview practice, AI feedback, and resume review.",
    type: "website",
    url: "/pricing",
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
    title: "Pricing | wzzfny",
    description:
      "Free and paid plans for interview practice, AI feedback, and resume review.",
    images: [defaultTwitterImage],
  },
};

export default async function PricingPage() {
  const locale = await getServerLocale();
  const isArabic = locale === "ar";
  const copy = {
    eyebrow: isArabic ? "الأسعار" : "Pricing",
    title: isArabic ? "اختر الخطة المناسبة لك" : "Choose the plan that fits you",
    subtitle: isArabic
      ? "خطط واضحة بميزات مناسبة لكل مرحلة من مراحل البحث عن عمل."
      : "Clear, transparent plans designed for every stage of your job search.",
  };

  return (
    <>
      <Header />
      <main className="pt-24 pb-24 bg-white">
        <section className="pt-12 pb-12 bg-gradient-to-b from-slate-50 via-white to-white">
          <Container>
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                {copy.eyebrow}
              </p>
              <h1 className="mt-4 text-4xl md:text-5xl font-bold text-slate-900">
                {copy.title}
              </h1>
              <p className="mt-4 text-lg text-slate-600">{copy.subtitle}</p>
            </div>
          </Container>
        </section>
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

