# System Patterns: Startup Landing Page Template

## Architecture Overview

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout + SEO metadata
│   ├── page.tsx            # Main landing page (composes sections)
│   └── globals.css         # Tailwind imports + global styles
│   ├── login/              # Hosted Supabase login page
│   ├── signup/             # Hosted Supabase signup page
│   └── (protected)/        # Auth-guarded app routes
│       ├── layout.tsx       # Dashboard shell + auth guard
│       └── dashboard/       # Post-login dashboard
├── components/
│   ├── layout/             # Page structure components
│   │   ├── Header.tsx      # Fixed navigation with mobile menu
│   │   └── Footer.tsx      # Multi-column footer
│   ├── sections/           # Main page sections (self-contained)
│   │   ├── Hero.tsx        # Hero with CTA and product mockup
│   │   ├── LogoCloud.tsx   # Social proof company logos
│   │   ├── Features.tsx    # Feature cards grid
│   │   ├── HowItWorks.tsx  # Step-by-step process
│   │   ├── Testimonials.tsx # Customer reviews
│   │   ├── Pricing.tsx     # Pricing tiers
│   │   ├── FAQ.tsx         # Accordion FAQ
│   │   └── CTA.tsx         # Final call-to-action
│   └── ui/                 # Reusable UI components
│       ├── Button.tsx      # Buttons with variants
│       ├── Card.tsx        # Card component
│       ├── Container.tsx   # Max-width wrapper
│       ├── Logo.tsx        # Site logo
│       ├── SectionHeader.tsx # Section title + description
│       ├── FooterLinkColumn.tsx # Footer link group
│       └── TrustBadges.tsx # Trust indicator badges
│   └── auth/               # Auth guard + auth page shell
└── lib/
    ├── constants.ts        # ALL site content lives here
    ├── accountTypes.ts     # Account type labels + formatting
    └── supabaseClient.ts   # Hosted Supabase client re-export
    └── icons.ts            # Lucide icon mapping
```

## Key Design Patterns

### 1. Content Centralization Pattern

**All content is in `src/lib/constants.ts`**

This is the primary customization point for AI:
```typescript
// Site-wide config
export const siteConfig = { name, description, tagline, cta }

// Section content arrays
export const features = [{ title, description, icon }]
export const testimonials = [{ quote, author, title, company, avatar }]
export const pricing = [{ name, price, period, features, cta, highlighted }]
export const faqs = [{ question, answer }]
// etc.
```

**Why**: AI can modify all landing page content by editing ONE file.

### 2. Icon Mapping Pattern

Icons are referenced by string name in constants, mapped in `src/lib/icons.ts`:
```typescript
// In constants.ts
{ icon: "Zap" }

// In icons.ts
export const iconMap: Record<string, LucideIcon> = { Zap, BarChart3, ... }
export function getIcon(name: string): LucideIcon { return iconMap[name] || Zap }
```

**Why**: Content stays serializable; icons can be changed without touching components.

### 3. Section Independence Pattern

Each section component:
- Imports its own data from constants
- Is fully self-contained
- Uses consistent Container wrapper
- Has consistent vertical padding

```tsx
// Example section pattern
export function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <Container>
        <SectionHeader title="..." subtitle="..." />
        {/* Section content */}
      </Container>
    </section>
  );
}
```

**Why**: Sections can be added, removed, or reordered in `page.tsx` easily.

### 4. Button Variants Pattern

Buttons use variant props for consistent styling:
```tsx
<Button variant="primary" size="lg">Primary CTA</Button>
<Button variant="outline" size="md">Secondary Action</Button>
<Button variant="white" size="md">On dark background</Button>
```

Variants: `primary`, `secondary`, `outline`, `white`
Sizes: `sm`, `md`, `lg`

### 5. Responsive Design Pattern

- Mobile-first breakpoints: `sm:`, `md:`, `lg:`
- Grid patterns: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Text scaling: `text-4xl md:text-5xl lg:text-6xl`
- Container max-width: `max-w-7xl mx-auto px-4`

## Component Communication

```
page.tsx
    ├── Header (reads navigation from constants)
    ├── Hero (reads siteConfig, trustIndicators)
    ├── LogoCloud (reads logoCloud)
    ├── Features (reads features)
    ├── HowItWorks (reads howItWorks)
    ├── Testimonials (reads testimonials)
    ├── Pricing (reads pricing)
    ├── FAQ (reads faqs)
    ├── CTA (reads siteConfig)
    └── Footer (reads footerLinks, socialLinks)
```

## Styling Conventions

### Colors (Indigo/Purple Theme)
- Primary: `indigo-600` (buttons, links, accents)
- Primary hover: `indigo-700`
- Background gradients: `from-indigo-50 via-white to-purple-50`
- Text: `gray-900` (headings), `gray-600` (body)

### Colors (Auth + Dashboard)
- Brand tokens: `--brand-50`, `--brand-100`, `--brand-200`, `--brand-600`, `--brand-700`
- Surface tokens: `--surface`, `--surface-strong`, `--border`
- Ink tokens: `--ink-900`, `--ink-700`, `--ink-500`

### Spacing
- Section padding: `py-24` (consistent)
- Container padding: `px-4 sm:px-6 lg:px-8`
- Component gaps: `gap-4`, `gap-6`, `gap-8`

### Typography
- Hero headline: `text-5xl md:text-6xl lg:text-7xl font-bold`
- Section titles: `text-3xl md:text-4xl font-bold`
- Body text: `text-base` or `text-lg`
- Fonts: Sora (body) + Newsreader (display)

## State Management

Minimal state—this is mostly static:
- FAQ accordion: Local `useState` for open/closed state
- Mobile menu: Local `useState` for open/closed state
- No global state needed

## File Naming Conventions

- Components: PascalCase (`Hero.tsx`, `Button.tsx`)
- Utilities: camelCase (`constants.ts`, `icons.ts`)
- Directories: kebab-case or lowercase (`components/sections/`)
