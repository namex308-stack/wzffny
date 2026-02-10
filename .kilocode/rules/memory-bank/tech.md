# Technical Context: Startup Landing Page Template

## Technology Stack

| Technology   | Version | Purpose                         |
| ------------ | ------- | ------------------------------- |
| Next.js      | 16.x    | React framework with App Router |
| React        | 19.x    | UI library                      |
| TypeScript   | 5.9.x   | Type-safe JavaScript            |
| Tailwind CSS | 4.x     | Utility-first CSS               |
| Lucide React | 0.562.x | Icon library                    |
| Bun          | Latest  | Package manager & runtime       |
| Supabase     | Hosted  | Auth, database, Edge Functions  |
| PostgreSQL   | 15+     | Supabase managed database       |
| Kashier      | Hosted  | Subscription payments (EGP)     |

## Development Environment

### Prerequisites

- Bun installed (`curl -fsSL https://bun.sh/install | bash`)
- Node.js 20+ (for compatibility)

### Commands

```bash
bun install        # Install dependencies
bun dev            # Start dev server (http://localhost:3000)
bun build          # Production build
bun start          # Start production server
bun lint           # Run ESLint
bun typecheck      # Run TypeScript type checking
```

## Project Configuration

### Next.js Config (`next.config.ts`)

- App Router enabled
- Default settings for static export compatibility

### TypeScript Config (`tsconfig.json`)

- Strict mode enabled
- Path alias: `@/*` → `src/*`
- Target: ESNext

### Tailwind CSS 4 (`postcss.config.mjs`)

- Uses `@tailwindcss/postcss` plugin
- CSS-first configuration (v4 style)

### ESLint (`eslint.config.mjs`)

- Uses `eslint-config-next`
- Flat config format

## Key Dependencies

### Production Dependencies

```json
{
  "@supabase/supabase-js": "^2.95.3", // Supabase client
  "lucide-react": "^0.562.0", // Icons
  "next": "^16.1.3", // Framework
  "react": "^19.2.3", // UI library
  "react-dom": "^19.2.3" // React DOM
}
```

### Dev Dependencies

```json
{
  "typescript": "^5.9.3",
  "@types/node": "^24.10.2",
  "@types/react": "^19.2.7",
  "@types/react-dom": "^19.2.3",
  "@tailwindcss/postcss": "^4.1.17",
  "tailwindcss": "^4.1.17",
  "eslint": "^9.39.1",
  "eslint-config-next": "^16.0.0"
}
```

## File Structure Explained

```
/
├── .gitignore              # Git ignore rules
├── BOOTSTRAP.md            # Original template spec
├── CONTEXT.md              # Project overview
├── package.json            # Dependencies and scripts
├── bun.lock                # Bun lockfile
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── postcss.config.mjs      # PostCSS (Tailwind) config
├── eslint.config.mjs       # ESLint configuration
├── public/                 # Static assets
│   └── dashboard-placeholder.svg  # Hero image
└── src/                    # Source code
    ├── app/                # Next.js App Router
    ├── components/         # React components
    └── lib/                # Utilities and constants
```

## Technical Constraints

### Database + Auth

- Supabase hosted PostgreSQL for persistence
- Supabase Auth for users and profiles
- Edge Functions for secure server-side logic
- Profiles table with RLS linked to `auth.users`
- Subscriptions + subscription_events tables for billing with RLS (read-own subscription only)
- Billing infra tables: user_plans, plan_limits, usage_counters, payments, webhook_events, user_settings

### Browser Support

- Modern browsers (ES2020+)
- No IE11 support

## Performance Considerations

### Image Optimization

- Uses Next.js `Image` component for optimization
- Hero image is SVG for scalability
- Placeholder images should be replaced with real assets

### Bundle Size

- Lucide icons are tree-shaken (only used icons included)
- No heavy animation libraries by default
- Tailwind CSS purges unused styles

### Core Web Vitals

- LCP: Hero image optimized with `priority` prop
- CLS: Layout is stable (no dynamic content shifts)
- FID: Minimal JavaScript for interactivity

## Deployment

### Build Output

- Static HTML + JS bundles
- Can be deployed to any static hosting
- No server required

### Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL` (client)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (client)
- `SUPABASE_SERVICE_ROLE_KEY` (server/Edge Functions only)
- `SIGNUP_HOOK_SECRET` (optional webhook signature validation)
- `ALLOWED_ORIGIN` (CORS for Edge Functions)
- `NEXT_PUBLIC_SITE_URL` (absolute site URL for payment redirects)
- `KASHIER_MERCHANT_ID` (Kashier merchant ID)
- `KASHIER_API_KEY` (Kashier Payment API Key)
- `KASHIER_WEBHOOK_SECRET` (optional dedicated webhook secret)
- `KASHIER_MODE` (`test` or `live`)
- `KASHIER_BASE_URL` (defaults to `https://checkout.kashier.io`)
- `KASHIER_ALLOWED_METHODS` (e.g. `card,wallet,bank_installments`)
- `KASHIER_DISPLAY` (`en` or `ar`)
- `KASHIER_BRAND_COLOR` (RGBA or hex)

## Development Workflow

1. Run `bun dev` for hot-reload development
2. Edit content in `src/lib/constants.ts`
3. Modify components in `src/components/`
4. Preview changes at `http://localhost:3000`
5. Run `bun build` to validate production build
6. Deploy to hosting platform
