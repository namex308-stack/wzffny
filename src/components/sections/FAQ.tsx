"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/components/providers/LocaleProvider";
import { getSiteContent } from "@/lib/siteContent";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { locale } = useLocale();
  const content = getSiteContent(locale);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-gray-50">
      <Container>
        <SectionHeader
          eyebrow={content.copy.sections.faq.eyebrow}
          title={content.copy.sections.faq.title}
          subtitle={content.copy.sections.faq.subtitle}
        />

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          {content.faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="border-b border-gray-200 last:border-0"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full py-6 flex items-center justify-between text-start cursor-pointer"
              >
                <span className="text-lg font-semibold text-gray-900 pe-8">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  openIndex === index
                    ? "max-h-96 opacity-100 pb-6"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            {content.copy.faqContact.prompt}{" "}
            <Link
              href="/contact"
              className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
            >
              {content.copy.faqContact.linkLabel}
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
