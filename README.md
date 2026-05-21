## Disability Statistics Portal

**Disability Statistics Portal – Georgia Edition** is a bilingual React SPA that presents **official disability-related statistics** for Georgia. Browse indicators across **healthcare, education, social security, and sport** with subcategory filters, expandable charts, downloadable datasets, a glossary, and infographics.

Built for **policymakers, researchers, and the public**, it connects to Geostat’s disability API and packages the data in an accessible, mobile-friendly experience.

---

## Features

- **Sector pages** — Healthcare, Education, Social Security, Sport (`/ka/...` and `/en/...`)
- **Subcategory filters** — combine multiple data sources per sector without reloading the full list
- **Charts** (Recharts) — lazy-loaded bar/line charts, legend filtering, year brush, sector watermarks
- **Downloads** — Excel files per indicator from the API
- **Glossary** — alphabet navigation and letter-based API filtering
- **Infographics** — sector PDFs in a modal viewer
- **Home** — hero slider, legislation links, partner link carousel
- **Bilingual UI** — Georgian (`/ka`) and English (`/en`)
- **Accessibility** — font scaling, dark mode, optional hover/click text-to-speech (Geostat TTS API)
- **Responsive layout** — mobile through desktop

---

## Live demo

**[disability-statistics-portal.vercel.app](https://disability-statistics-portal.vercel.app/)**

Switch language with the flag control in the header.

---

## Data sources

- [National Statistics Office of Georgia (Geostat)](https://www.geostat.ge/en)
- API base: `https://disability-api.geostat.ge/api` (records, categories, glossary)
- Legislation and partner links as referenced on the portal

The API must allow your origin (browser `fetch`). Opening the API URL directly in a tab is not the same as a request from the deployed app.

---

## Tech stack

Single-page application (SPA): **React** for UI, **Vite** for dev/build, **React Router** for client-side routes. No meta-framework (e.g. Next.js).

| Layer                    | Technology                                                                                                                |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| **UI library**           | [React 19](https://react.dev/) + [React DOM](https://react.dev/)                                                          |
| **Routing**              | [React Router DOM v7](https://reactrouter.com/)                                                                           |
| **Build tool**           | [Vite 8](https://vite.dev/) + [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react)                         |
| **CSS**                  | [Tailwind CSS v4](https://tailwindcss.com/) via [@tailwindcss/vite](https://tailwindcss.com/docs/installation/using-vite) |
| **Charts**               | [Recharts](https://recharts.org/) (lazy-loaded, separate JS chunk)                                                        |
| **Internationalization** | [i18next](https://www.i18next.com/) + [react-i18next](https://react.i18next.com/)                                         |
| **Lint / format**        | [ESLint](https://eslint.org/) 10, [Prettier](https://prettier.io/)                                                        |
| **Tests**                | [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) (jsdom)                                   |
| **Analytics**            | [@vercel/analytics](https://vercel.com/docs/analytics) (enabled in production builds only)                                |
| **Hosting**              | [Vercel](https://vercel.com/) — static `dist/` + SPA fallback in `vercel.json`                                            |

---

## Getting started

**Prerequisites:** Node.js 20+ and npm.

```bash
git clone https://github.com/saba-bar95/disability-statistics-portal.git
cd disability-statistics-portal
npm install
npm run dev
```

Open **http://localhost:3000** (redirects to `/ka`).

### Environment variables

Default API URL is set in `src/services/recordsApi.js`. To override locally:

```bash
cp .env.example .env.local
```

```env
VITE_API_BASE_URL=https://disability-api.geostat.ge/api
```

Restart the dev server after changing env variables.

### Scripts

| Command                | Description                    |
| ---------------------- | ------------------------------ |
| `npm run dev`          | Development server (port 3000) |
| `npm run build`        | Production build → `dist/`     |
| `npm run preview`      | Preview production build       |
| `npm run lint`         | ESLint                         |
| `npm run test`         | Vitest (unit + hook tests)     |
| `npm run test:watch`   | Vitest watch mode              |
| `npm run format`       | Prettier (write)               |
| `npm run format:check` | Prettier (check only)          |

---

## CI

GitHub Actions (`.github/workflows/ci.yml`) on push/PR to `main`:

1. `npm ci`
2. `npm run lint`
3. `npm run format:check`
4. `npm run test`
5. `npm run build`

---

## Project structure

```text
src/
├── components/          # UI (header, footer, sector list, chart panel, glossary, …)
│   └── RecordChartPanel/   # Chart subcomponents + hooks
├── constants/           # Routes, sector IDs, chart titles/units, link URLs
├── context/             # Sector records React context
├── hooks/               # Records, glossary, UI prefs, document title, TTS
├── layouts/             # MainLayout, SectorPageLayout
├── pages/               # Home, sector, glossary, infographic (lazy-loaded)
├── routes/              # AppRoutes, lazy page imports
├── services/            # recordsApi, glossaryApi
├── test/                # Vitest setup
├── utils/               # Chart colors, theme, glossary helpers
└── i18n.js              # Georgian / English strings
```

**Routes (examples):**

| Path                                         | Page              |
| -------------------------------------------- | ----------------- |
| `/ka`, `/en`                                 | Home              |
| `/ka/healthcare`, `/en/healthcare`           | Healthcare sector |
| `/ka/education`, `/en/education`             | Education         |
| `/ka/social-security`, `/en/social-security` | Social security   |
| `/ka/sports`, `/en/sports`                   | Sport             |
| `/ka/glossary`, `/en/glossary`               | Glossary          |
| `/ka/infographic`, `/en/infographic`         | Infographics      |

---

## Author

[Saba Barbakadze](https://github.com/saba-bar95)
