<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# BazarDor (বাজার দর) — Project Rules

Bangla and English market price tracker. Build it to match the Figma design and the assignment brief:
- Figma: https://www.figma.com/design/wNhWeMFAjA6tIsNHtI8M0q/Bazardor-_-Assignment-07 (file key `wNhWeMFAjA6tIsNHtI8M0q`; frames: Home, Home - User Menu Open, Sign In, Sign Up, Profile, Category, Product Details)
- Brief: https://github.com/ProgrammingHero1/B14-A7-Bazar-Dor
- Read the Figma with the Figma MCP (`get_design_context`, `get_screenshot`) before building each page. Do not guess spacing, colors or fonts.

## Most important rule: keep the code simple (junior level)
This is a student assignment. The owner knows: Next.js App Router, HeroUI, Tailwind CSS, basic Better Auth and a basic MongoDB connection. The code must be easy for them to read and explain.
- Use plain React: `useState`, props, `async` server components, `fetch`. No custom hooks, no context, no `useMemo`/`useCallback`, no `useSyncExternalStore`, no regular expressions unless really needed.
- No clever tricks: no `"use cache"`, no `cacheComponents`, no proxy/middleware, no generics, no `as const` tricks, no deep ternary chains. Prefer a short `if` and `for`.
- Write short comments that explain what and why in simple English.
- If something is hard to explain in one sentence, find a simpler way.

## Stack (do not swap these)
- **Next.js App Router** + TypeScript. Pages are server components; add `"use client"` only for buttons, forms and other interactive parts.
- **Tailwind CSS v4** for styling. Figma colors live in `src/app/globals.css` as HeroUI variables (`--accent`, `--surface`, `--border`...). Use classes like `bg-surface`, `text-accent`, `border-border`, `text-danger`, `text-success`.
- **HeroUI v3** for components: `Button`, `Card`, `Chip`, `Skeleton`, `Avatar`, `Dropdown`, `Select`, `TextField` + `Label` + `Input` + `FieldError`. Buttons use `onPress`, not `onClick`. A link that looks like a button uses `buttonVariants()` on a Next.js `Link`.
- **Better Auth** with the **MongoDB adapter** (`src/lib/auth.ts`). Email/password plus Google and GitHub. No email verification or password reset.
- **MongoDB Atlas** only for users, sessions and accounts (`src/lib/mongodb.ts`). Prices and categories come from the API.
- `react-hot-toast` for messages.

## Data
- The API link is in `NEXT_PUBLIC_API_BASE_URL`; the second link from the brief is the fallback. All API calls are in `src/lib/api.ts`.
- Check the signed-in user in server pages with `auth.api.getSession({ headers: await headers() })`.
- Show prices with the helpers in `src/lib/format.ts`. Sort on the real number (`src/lib/sort.ts`), never on the text.

## Languages (Bangla and English)
- Two languages: `bn` (default) and `en`. The choice is saved in a cookie named `lang`.
- All visible words are in `src/data/texts.ts` (the English object must have the same names as the Bangla one). Use `const t = texts[lang]`.
- Server components get the language with `await getLang()` (`src/lib/language.ts`). Client components receive `lang` as a prop. The language buttons set the cookie and call `router.refresh()`.
- English names of products, categories, markets and divisions are in `src/data/english-names.ts` (the API only has Bangla). Add a name there when a new item appears.

## Required features
- Navbar (date, category links with active state, sign in/up or user menu) and a moving price ticker.
- Hero with a button that scrolls smoothly to all products.
- Home: top 6 price rises, top 6 falls, all products with search, category buttons and sort.
- `/product/[slug]`: login required, min/max/average price and a table of market prices.
- `/category/[slug]`: sort, skeleton while loading, empty state with a link home.
- `/signin`, `/signup`, `/profile` (update the name), footer, 404 page, error page.
- Skeletons are `loading.tsx` files. Fully responsive.

## Code conventions
- Folders: `src/app` (pages), `src/components`, `src/lib` (api, auth, mongodb, format, names, sort, language), `src/data` (texts, english names), `src/types`.
- File names kebab-case, component names PascalCase, no `any`.
- Secrets only in `.env.local` (never commit). Keep `.env.example` with names and no values.
- Use `next/image` and `next/link`. Add `alt` text.

## Workflow
- One page or feature at a time. Run `npm run lint` and `npm run build` before each commit.
- Small commits with clear messages (the brief needs at least 8).
- Deploy to Vercel. Keep the README up to date.
- Ask before adding a package that is not listed above.
