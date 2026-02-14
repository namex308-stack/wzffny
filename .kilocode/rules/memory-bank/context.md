# Active Context: Interviewly Landing Page

## Current State

**Template Status**: ✅ Customized for Interviewly

The landing page content now reflects Interviewly, an AI-powered interview training platform.

Arabic localization and professional typography have been integrated across marketing, auth, billing, and protected app pages.

## Recently Completed
- [x] Wired the hero "Watch Sample Feedback" CTA to the AI feedback marketing page.
- [x] Added a client-only wrapper for the hero animation to prevent hydration mismatches.
- [x] Renamed `env.local` to `.env.local` so Next.js loads Supabase environment variables.
- [x] Added Laravel backend subscription management updates (billing columns migration, Supabase/Paddle service config, webhook listener, and Supabase JWT route alias).
- [x] Added Laravel backend API for Supabase JWT auth and Paddle billing (middleware, billing controller, API routes).

- [x] Refined interview analysis page copy (EN/AR) with clearer strengths/areas to improve, actionable tips, and percentage calculation notes
- [x] Refined resume upload page copy (EN/AR) with ATS-focused messaging, clearer upload guidance, and improved section text
- [x] Added before/after improvement examples and updated ratings, strengths, weaknesses, and keyword suggestions on resume page
- [x] Updated site content, CTAs, and section copy for Interviewly
- [x] Replaced features, testimonials, pricing, FAQs, and logo cloud
- [x] Updated metadata and SEO keywords
- [x] Expanded icon map for interview-related features
- [x] Made logo badge use dynamic first letter
- [x] Added blog index and five interview-focused blog pages
- [x] Filled blog posts with full SEO-ready content and excerpts
- [x] Simplified and SEO-optimized English blog posts (titles, excerpts, meta tags, and content)
- [x] Hardened blog slug generation and locale fallback to prevent 404s
- [x] Refreshed Arabic blog posts with SEO-focused content and keywords
- [x] Expanded the behavioral interview blog post with STAR examples and a 48-hour prep plan
- [x] Added hosted Supabase setup (users table migration, Edge Function, and client config)
- [x] Replaced users table with profiles table + RLS, and updated Edge Function for signup profile sync
- [x] Built hosted Supabase auth flow with signup + login pages and metadata-based profile creation
- [x] Added protected app route group with auth guard redirecting unauthorized users to login
- [x] Implemented post-login dashboard with profile summary (name, account type, created date)
- [x] Refreshed login page with remember-me, password visibility toggle, and minimal layout
- [x] Removed primary Start Practicing CTA buttons from header, hero, and CTA sections
- [x] Introduced new typography tokens and SaaS auth layout styling
- [x] Hardened login/signup redirects and trimmed auth inputs
- [x] Improved pricing CTA contrast on highlighted plan
- [x] Added Deno runtime guard and TS import suppressions for Edge Function
- [x] Refreshed signup page to match auth shell design, add account type dropdown, and upsert profile data with created_at
- [x] Updated login button label to "Login" for spec alignment
- [x] Adjusted dashboard greeting to "Welcome back {full_name}" while keeping profile card layout and loading/error states
- [x] Restored `supabaseClient.js` to use environment-based hosted credentials and fixed invalid syntax
- [x] Added auth disable flag to bypass AuthGuard, hide sign-out, and show disabled state on login/signup
- [x] Rebuilt dashboard to support public access with loading/error handling and profile data when available
- [x] Expanded dashboard UI with progress summary cards, new interview/resume actions, previous interview list, and training recommendations
- [x] Added Dashboard link button in the site header (desktop + mobile) linking to /dashboard
- [x] Updated header login/dashboard buttons to use brand color variables for a consistent site palette
- [x] Redesigned login page with AuthShell layout, branded inputs, and disabled-auth messaging
- [x] Redesigned signup page with AuthShell layout, branded inputs, account type dropdown, and disabled-auth messaging
- [x] Added interview setup page with type/role selection, recording options, start buttons, and time reminder guidance
- [x] Converted interview page copy to English to match site language
- [x] Implemented live interview flow with question timer, speech read-aloud, camera activation, video recording, and saved answer review
- [x] Added a dedicated interview setup page and routed its data into the interview session
- [x] Linked the dashboard "Start a new interview" action to the interview setup flow
- [x] Added an interview analysis page with strengths/weaknesses, AI body language insights, tips, performance chart, and video review UI
- [x] Added resume upload and improvement page with AI feedback placeholders and optimized download UI
- [x] Added practice questions library page with filtering, single-question practice panel, and saved favorites
- [x] Added resources & tips page with articles, short videos, and external links
- [x] Linked resources articles to internal blog posts and blog index
- [x] Added "Upload CV" button to the resume page upload section
- [x] Added resume analysis state with ratings and improvement suggestions after analysis
- [x] Removed practice questions and resume pages (and navigation links) per request
- [x] Added full settings page with account, appearance, notifications, subscription, support, and advanced account sections
- [x] Updated pricing plans to Free/Pro/Premium in EGP and mirrored them in dashboard and settings
- [x] Removed resources & tips page and navigation link
- [x] Re-added resume upload and improvement page with AI analysis placeholders and download UI
- [x] Added resume strengths/weaknesses, ratings, editing suggestion, and revised download link on analysis
- [x] Activated optimized/revised resume download links after analysis
- [x] Added Kashier payment checkout flow with signed HPP URL generation and webhook verification
- [x] Implemented subscription storage (subscriptions + subscription_events) with RLS and free plan auto-activation
- [x] Wired pricing CTAs to signup/checkout with plan-aware redirects and free-plan activation API
- [x] Added checkout and checkout result pages with payment status polling and redirect to dashboard
- [x] Preserved query parameters in AuthGuard redirects for plan-safe login flows
- [x] Added billing infrastructure tables (user_plans, payments, webhook_events, plan_limits, usage_counters, user_settings)
- [x] Extended signup trigger to auto-provision free plan, user_plans, usage_counters, and user_settings
- [x] Added webhook logging + payments tracking with provider-agnostic schema for future Stripe support
- [x] Updated signup to show activation messaging before redirecting to dashboard/checkout
- [x] Swapped header CTA from dashboard to sign up + log in buttons
- [x] Re-enabled auth guard enforcement by setting `AUTH_DISABLED` to false
- [x] Enhanced hero with animated gradient mesh, motion graphics, and floating insight cards
- [x] Added locale utilities, cookie-based language persistence, and RTL support
- [x] Introduced Manrope + Fraunces typography with Noto Sans Arabic for RTL pages
- [x] Added a language toggle in marketing header and protected layout header
- [x] Localized auth, checkout, dashboard, interview, interview analysis, resume, settings, and billing flows for Arabic
- [x] Translated blog content and wired Arabic blog post library
- [x] Updated locale cookie access for Next.js async `cookies()` API and made locale-driven pages/sections async
- [x] Tightened `isLocale` type guard to satisfy TypeScript
- [x] Added `LocaleProvider` to hydrate locale consistently across client components and switched locale lookups to context to prevent hydration mismatches
- [x] Added professional marketing pages (product, company, resources, legal) with bilingual copy and a dedicated pricing page
- [x] Wired footer/navigation links and FAQ contact CTA to the new pages
- [x] Implemented auth-aware landing header with Supabase session tracking, username display, and CTA swapping for logged-in vs logged-out users
- [x] Added static marketing route pages for all footer links, reusing a shared marketing page shell to prevent 404s

## Sections Implemented

| Section      | File                                       | Status      |
| ------------ | ------------------------------------------ | ----------- |
| Hero         | `src/components/sections/Hero.tsx`         | ✅ Complete |
| Logo Cloud   | `src/components/sections/LogoCloud.tsx`    | ✅ Complete |
| Features     | `src/components/sections/Features.tsx`     | ✅ Complete |
| How It Works | `src/components/sections/HowItWorks.tsx`   | ✅ Complete |
| Testimonials | `src/components/sections/Testimonials.tsx` | ✅ Complete |
| Pricing      | `src/components/sections/Pricing.tsx`      | ✅ Complete |
| FAQ          | `src/components/sections/FAQ.tsx`          | ✅ Complete |
| CTA          | `src/components/sections/CTA.tsx`          | ✅ Complete |
| Header       | `src/components/layout/Header.tsx`         | ✅ Complete |
| Footer       | `src/components/layout/Footer.tsx`         | ✅ Complete |

## Current Focus

The template is customized. The focus now is on:

1. Final polish on copy and pricing details
2. Replacing placeholder imagery with real product screenshots
3. Adjusting branding/colors if needed
4. Optional: add navigation links to the new blog section

## Quick Customization Guide

### To change site content:

Edit `src/lib/siteContent.ts`:

- `siteConfig` - Site name, tagline, CTAs
- `navigation` - Header nav links
- `features` - Feature cards
- `howItWorks` - Steps content
- `testimonials` - Customer reviews
- `pricing` - Pricing tiers
- `faqs` - FAQ items
- `copy` - Shared UI text (header/footer/blog)

### To change colors:

The primary color is `indigo`. Search and replace in components:

- `indigo-600` → your primary color
- `indigo-500`, `indigo-700` → adjust shades
- `purple-` → accent color adjustments

### To add/remove sections:

Edit `src/app/page.tsx`:

```tsx
<main>
  <Hero />
  <LogoCloud /> {/* Remove this line to hide */}
  <Features />
  {/* Add new sections here */}
</main>
```

### To add new icons:

1. Import in `src/lib/icons.ts`
2. Add to `iconMap` object
3. Reference by name in constants

## Known Considerations

- Hero image is a placeholder SVG → Replace with real product screenshot
- Logo cloud uses text → Replace with actual company logos if available
- Marketing CTA forms are non-functional → Need backend integration
- Avatar images use initials → Replace with real photos if available
- Edge Function is optional and reserved for advanced integrations; core signup uses the database trigger

## Pending Improvements (Optional)

- [ ] Add dark mode support
- [ ] Add Framer Motion animations
- [ ] Add more section variants
- [ ] Add form submission handling
- [ ] Add real logo images



