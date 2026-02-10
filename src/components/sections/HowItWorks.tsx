import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getSiteContent } from "@/lib/siteContent";
import { getServerLocale } from "@/lib/locale.server";

export async function HowItWorks() {
  const locale = await getServerLocale();
  const content = getSiteContent(locale);

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <Container>
        <SectionHeader
          eyebrow={content.copy.sections.howItWorks.eyebrow}
          title={content.copy.sections.howItWorks.title}
          subtitle={content.copy.sections.howItWorks.subtitle}
        />

        {/* Steps */}
        <div className="relative max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {content.howItWorks.map((step, index) => (
              <div
                key={step.step}
                className="relative flex flex-col items-center"
              >
                {/* Step Number with connecting line */}
                <div className="relative w-full flex items-center justify-center mb-6">
                  {/* Left connection line */}
                  {index > 0 && (
                    <div className="hidden lg:block absolute right-1/2 top-1/2 w-1/2 h-0.5 bg-gradient-to-r from-indigo-300 to-indigo-500 -translate-y-1/2 mr-7" />
                  )}
                  {/* Right connection line */}
                  {index < content.howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute left-1/2 top-1/2 w-1/2 h-0.5 bg-gradient-to-r from-indigo-500 to-indigo-300 -translate-y-1/2 ml-7" />
                  )}
                  {/* Step Number Badge */}
                  <div className="relative z-10 w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
                    <span className="text-2xl font-bold text-white">
                      {step.step}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>

                {/* Arrow for mobile/tablet - vertical */}
                {index < content.howItWorks.length - 1 && (
                  <div className="flex lg:hidden absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 items-center justify-center text-indigo-400">
                    <svg
                      className="w-6 h-6 md:rotate-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
