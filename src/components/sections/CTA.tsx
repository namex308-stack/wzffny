import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TrustBadges } from "@/components/ui/TrustBadges";
import { getSiteContent } from "@/lib/siteContent";
import { getServerLocale } from "@/lib/locale.server";

export async function CTA() {
  const locale = await getServerLocale();
  const content = getSiteContent(locale);

  return (
    <section className="py-24 bg-indigo-600">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 p-12 md:p-16">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {content.copy.cta.title}
            </h2>
            <p className="text-xl text-indigo-100 mb-10">
              {content.copy.cta.subtitle}
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="white" size="lg" className="w-full sm:w-auto">
                {content.copy.cta.button}
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-10">
              <TrustBadges items={content.trustIndicators} variant="light" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
