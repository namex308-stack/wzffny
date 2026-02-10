import { Star, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getSiteContent } from "@/lib/siteContent";
import { getServerLocale } from "@/lib/locale.server";

export async function Testimonials() {
  const locale = await getServerLocale();
  const content = getSiteContent(locale);

  return (
    <section className="py-24 bg-gray-50">
      <Container>
        <SectionHeader
          eyebrow={content.copy.sections.testimonials.eyebrow}
          title={content.copy.sections.testimonials.title}
          subtitle={content.copy.sections.testimonials.subtitle}
        />

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.testimonials.map((testimonial) => (
            <Card key={testimonial.author} className="relative">
              {/* Quote Icon */}
              <div className="absolute -top-3 -left-3 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <Quote className="w-5 h-5 text-indigo-600" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                &quot;{testimonial.quote}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-500">
                    {testimonial.title}, {testimonial.company}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
