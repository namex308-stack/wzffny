import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getIcon } from "@/lib/icons";
import { getSiteContent } from "@/lib/siteContent";
import { getServerLocale } from "@/lib/locale.server";

export async function Features() {
  const locale = await getServerLocale();
  const content = getSiteContent(locale);

  return (
    <section id="features" className="cv-auto py-24 bg-gray-50">
      <Container>
        <SectionHeader
          eyebrow={content.copy.sections.features.eyebrow}
          title={content.copy.sections.features.title}
          subtitle={content.copy.sections.features.subtitle}
        />

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.features.map((feature) => {
            const Icon = getIcon(feature.icon);
            return (
              <Card key={feature.title} hover>
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
