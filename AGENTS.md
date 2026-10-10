<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# BazarDor (বাজার দর) — Project Rules

Bangla-language market price tracker. Build it to match the Figma design and the assignment brief:
- Figma: https://www.figma.com/design/wNhWeMFAjA6tIsNHtI8M0q/Bazardor-_-Assignment-07 (file key `wNhWeMFAjA6tIsNHtI8M0q`; frames: Home, Home - User Menu Open, Sign In, Sign Up, Profile, Category, Product Details)
- Brief: https://github.com/ProgrammingHero1/B14-A7-Bazar-Dor
- Read the Figma with the Figma MCP (`get_design_context`, `get_screenshot`) before building each page. Do not guess spacing, colors or fonts.

## Stack (do not swap these)
- **Next.js App Router** + TypeScript. Server Components by default; add `"use client"` only where state or browser APIs are needed.
- **Tailwind CSS v4** for all styling. No CSS modules, no inline style objects, no other CSS framework. Put design tokens (colors, fonts) in `@theme` in `src/app/globals.css`.
- **HeroUI** for UI components (buttons, inputs, select, chips, skeleton, card, dropdown, navbar). Check the HeroUI docs for the installed version before using its API. Only hand-build a component when HeroUI has no equivalent.
- **Better Auth** for authentication, with the **MongoDB adapter**. Email/password plus Google and GitHub social login. No email verification or password reset.
- **MongoDB** for the auth data (users, sessions, accounts). Use one shared cached client in `src/lib/mongodb.ts`. Prices and categories come from the external API, not from Mongo.
- `react-hot-toast` for toasts.

## Data
- Base URL: `https://api.api-store.workers.dev/api/bazardor` (fallback `https://api.abcz.workers.dev/api/bazardor`). Keep it in `NEXT_PUBLIC_API_BASE_URL`.
- Endpoints: `/products`, `/products?category=`, `/products/{id}`, `/categories`, `/categories/{slug}`.
- All fetching goes through typed helpers in `src/lib/api.ts`. Components never call `fetch` on the URL directly.
- Show prices in Bengali digits (a `toBn()` helper in `src/lib/format.ts`). Sort and compare on the numeric value, never on the formatted string.

## Required features
- Navbar (Bangla date, category links with active state, sign in/up or profile/sign out) and a scrolling price ticker.
- Hero with a CTA that smooth-scrolls to all products.
- Home: top 6 risers, top 6 fallers, all-products grid. Cards open the detail page.
- `/product/[slug]`: login required. Show min/max/average and per-market prices. Redirect to `/signin` with a toast when logged out.
- Category page: sort (default, low to high, high to low), skeleton loading, and an empty state with a link home.
- `/signin`, `/signup`, `/profile` (update name through Better Auth).
- Footer, custom 404 page, skeletons on Home and Category.
- Fully responsive (mobile, tablet, desktop), including navbar, ticker, hero and grid.

## Languages (Bangla and English)
- The site has two languages, `bn` (default) and `en`. Every page lives under `src/app/[lang]` and every link must keep the prefix (`/${lang}/...`, or `href()` from `useI18n()` in client components).
- Never hard-code visible text. Put it in both objects in `src/i18n/dictionaries.ts` (the English object must match the Bangla shape). Use `fmt()` for `{placeholders}`.
- Server components call `getDictionary(lang)`; client components use `useI18n()`. Dictionaries must stay plain data (no functions) because they are passed to the client.
- Format numbers with `src/lib/format.ts` (`formatNumber`, `localizeDigits`, ...): Bengali digits for `bn`, normal digits for `en`. Sort and compare on raw numbers only.
- The API only returns Bangla names. English names for products, categories, markets and divisions come from `src/i18n/data-en.ts` via `src/i18n/localize.ts`; add an entry there when new items appear.
- `src/proxy.ts` redirects URLs without a language prefix. Do not rename it to `middleware.ts` (Next 16 uses `proxy`).

## Code conventions
- Folder layout: `src/app` (routes), `src/components` (shared UI), `src/i18n` (language config, dictionaries, helpers), `src/lib` (api, auth, mongodb, format), `src/types`.
- Files kebab-case, components PascalCase, no `any`.
- Keep components small; extract repeated markup (Product Card, Form Field, Filter Chip) into `src/components`.
- Secrets live in `.env.local` only (`MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID/SECRET`, `GITHUB_CLIENT_ID/SECRET`). Never commit them. Keep `.env.example` with the names and no values.
- Use `next/image` and `next/link`. Add alt text and visible focus styles.

## Workflow
- Work like a careful junior dev: one page or feature at a time, then run `npm run lint` and `npm run build` before committing.
- Make small commits with meaningful messages (brief needs at least 8), e.g. `feat: add navbar and ticker`.
- Deploy target is Vercel; dynamic routes must work after a reload.
- Keep the README current: project name, description, technologies, at least 5 features.
- Ask before adding a dependency that is not in the stack above.
