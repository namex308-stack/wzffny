# Product Context: Startup Landing Page Template

## Why This Template Exists

Landing pages are the critical first touchpoint for startups and SaaS products. This template provides a proven, conversion-optimized structure that AI can quickly customize for any product or service. Instead of starting from scratch, users describe their product and the AI modifies the template.

## Problems It Solves

1. **Speed**: Creating a professional landing page from scratch takes days/weeks
2. **Design Expertise**: Not everyone is a designer—template provides proven layout
3. **Conversion Optimization**: Sections are ordered for maximum conversion (Hero → Social Proof → Features → Trust → Pricing → FAQ → CTA)
4. **Content Structure**: Users struggle with what to include—template provides the framework
5. **Responsive Design**: Mobile optimization is built-in

## How It Should Work (User Flow)

1. User starts with this template
2. User describes their product/service to AI assistant
3. AI updates `src/lib/constants.ts` with custom content
4. AI adjusts colors/branding in components or Tailwind config
5. User previews changes with `bun dev`
6. Iterate until satisfied
7. Deploy

## Key User Experience Goals

- **Customization in Minutes**: AI should be able to customize basic content in under 5 minutes
- **Preview-Driven**: Changes visible immediately via hot reload
- **Section Independence**: Each section works standalone—can add/remove easily
- **Professional Output**: Final result should look custom, not template-y

## What Makes a Good Landing Page

The template follows landing page best practices:

1. **Hero**: Strong headline, clear value prop, prominent CTA
2. **Social Proof**: Logos of trusted companies build credibility
3. **Features**: Explain what the product does (benefits > features)
4. **How It Works**: Reduce friction by showing simplicity
5. **Testimonials**: Real people vouching for the product
6. **Pricing**: Transparent pricing reduces objections
7. **FAQ**: Address common concerns proactively
8. **Final CTA**: One more chance to convert

## Integration Points

- **Analytics**: Space for Google Analytics, Plausible, etc.
- **Forms**: Email signup forms (Mailchimp, ConvertKit integration ready)
