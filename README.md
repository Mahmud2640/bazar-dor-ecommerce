# বাজার দর (BazarDor)

BazarDor is a Bangla-language web app that shows today's market prices for everyday items: rice, lentils, oil, vegetables, fish, meat, eggs and dairy, and spices. You can see which prices rose or fell, compare prices across markets, and create an account to see full price details.

Built for Programming Hero Assignment 07 from the [Figma design](https://www.figma.com/design/wNhWeMFAjA6tIsNHtI8M0q/Bazardor-_-Assignment-07).

- **Live site:** _add your deployed link here_
- **Repository:** _add your GitHub link here_

## Key features

1. **Live price ticker and category navbar** – a scrolling ticker with emoji, name, price and change percentage, plus category links with an active highlight and today's Bangla date.
2. **Home page with price movers** – the top 6 risers and top 6 fallers, followed by an all-products grid with search, category filter chips and sorting.
3. **Category pages** – each category lists its products with a sort dropdown (default, low to high, high to low), skeleton loading and a 404-style empty state.
4. **Protected product details** – signed-in users see the lowest, highest and average price, plus a table of prices by market. Signed-out visitors are redirected to sign in with a toast.
5. **Authentication** – email/password sign up and sign in, Google and GitHub login, a profile page and a form to update your name, built with Better Auth.
6. **Two languages (Bangla and English)** – the language buttons in the header change every page, message, date and number (Bengali digits in Bangla, normal digits in English). The choice is saved in a cookie and remembered for next time.
7. **Responsive and polished** – works on mobile, tablet and desktop, with loading skeletons, toast messages and a custom 404 page.

## Technologies

- [Next.js](https://nextjs.org) (App Router) and TypeScript
- [Tailwind CSS](https://tailwindcss.com) v4
- [HeroUI](https://www.heroui.com) v3 components (Button, Card, Chip, Select, Dropdown, Avatar, TextField, Skeleton)
- [Better Auth](https://www.better-auth.com) with the MongoDB adapter
- [MongoDB](https://www.mongodb.com) Atlas for users, sessions and accounts
- [react-hot-toast](https://react-hot-toast.com) for notifications

Price and category data come from the public BazarDor API (`/products`, `/categories`). The API only has Bangla names, so the English names of products, categories, markets and divisions are in `src/data/english-names.ts`.

## Languages

- All the words of the site are in `src/data/texts.ts`, one object for Bangla and one for English. To change a text, change it in both objects.
- The language is saved in a cookie called `lang`. Server components read it with `getLang()`, and client components get `lang` as a prop.

## Project folders

| Folder | What is inside |
| --- | --- |
| `src/app` | the pages (home, category, product, signin, signup, profile) and the layout |
| `src/components` | the parts of the pages (navbar, ticker, product card, forms...) |
| `src/lib` | helper code: API calls, Better Auth, MongoDB, number formatting |
| `src/data` | the Bangla/English texts and the English names |

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and fill in the values:

   | Variable | What it is |
   | --- | --- |
   | `MONGODB_URI` | MongoDB connection string, e.g. `mongodb://127.0.0.1:27017/bazar-dor` |
   | `BETTER_AUTH_SECRET` | a long random string (`openssl rand -base64 32`) |
   | `BETTER_AUTH_URL` / `NEXT_PUBLIC_APP_URL` | the site URL, `http://localhost:3000` locally |
   | `NEXT_PUBLIC_API_BASE_URL` | the BazarDor API base URL |
   | `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth app (optional) |
   | `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub OAuth app (optional) |

   OAuth callback URLs are `<site url>/api/auth/callback/google` and `<site url>/api/auth/callback/github`.

3. Start the dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | start the dev server |
| `npm run build` | create a production build |
| `npm run start` | run the production build |
| `npm run lint` | run ESLint |

## Deploying

Deploy to Vercel. Add the same environment variables in the project settings, and set `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` to the deployed URL. Use a hosted MongoDB such as Atlas for `MONGODB_URI`, and add the deployed callback URLs to your Google and GitHub OAuth apps.
