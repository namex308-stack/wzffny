import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { LogoCloud } from "@/components/sections/LogoCloud";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSiteContent } from "@/lib/siteContent";
import { getServerLocale } from "@/lib/locale.server";
import { getSiteUrl } from "@/lib/seo";

export default async function Home() {
  const locale = await getServerLocale();
  const content = getSiteContent(locale);
  const siteUrl = getSiteUrl();
  const pricing = content.pricing;
  const offers = pricing.flatMap((plan) => {
    const baseOffer = {
      "@type": "Offer",
      price: plan.price.replace("$", ""),
      priceCurrency: "USD",
      url: `${siteUrl}/pricing`,
      category: plan.id === "free" ? "free" : "subscription",
      description: plan.description,
    };
    if (plan.secondaryPrice && plan.secondaryPeriod) {
      return [
        baseOffer,
        {
          ...baseOffer,
          price: plan.secondaryPrice.replace("$", ""),
          description: `${plan.description} (${plan.secondaryPeriod})`,
        },
      ];
    }
    return [baseOffer];
  });
  const faqEntities = content.faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  }));
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: content.siteConfig.name,
        url: siteUrl,
      },
      {
        "@type": "WebSite",
        name: content.siteConfig.name,
        url: siteUrl,
        inLanguage: locale === "ar" ? "ar" : "en",
      },
      {
        "@type": "SoftwareApplication",
        name: content.siteConfig.name,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: content.siteConfig.description,
        offers,
      },
      {
        "@type": "FAQPage",
        mainEntity: faqEntities,
      },
    ],
  };

  return (
    <>
      <Header />
      <JsonLd data={jsonLd} />
      <main>
        <Hero />
        <LogoCloud />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
