# Bugbot rules — Disability Statistical Portal

This repository is a **React 19 + Vite 8** public portal for disability-related statistics (Georgian + English). Reviews should respect existing patterns and flag real regressions, not stylistic nitpicks.

## Stack and layout

- **Routing:** `react-router-dom` v7. Default language is `ka`; paths are `/:language/...` (e.g. `/ka`, `/en/glossary`).
- **Sector pages:** Single `SectorPage` resolves sector from URL via `src/constants/sectorRoutes.js`. URL segment `sports` maps to sector key `sport` — do not conflate path and key.
- **Main layout routes** (under `MainLayout`): home (`index`), `glossary`, `infographic`.
- **Sector routes** are top-level siblings (not MainLayout children): `education`, `healthcare`, `social-security`, `sports`. Do not add a catch-all `/:language/:slug` route that could steal `glossary` or `infographic`.
- **Styling:** Tailwind CSS v4 + `clsx`. Prefer existing utility patterns over new one-off CSS files.
- **i18n:** All user-visible strings must use `react-i18next` (`t("key")`) with keys added to `src/i18n.js` for both `ka` and `en`. Do not hardcode Georgian/English UI text in components.
- **API:** `src/services/*` uses `import.meta.env.VITE_API_BASE_URL`. Flag missing error handling, unmounted state updates after async fetch, and breaking changes to records/glossary endpoints.

## Domain areas

| Area | Key files |
|------|-----------|
| Home / sector cards | `MainStatistics.jsx`, `sectionCards.js` |
| Sector records | `SectorPage.jsx`, `SectorPageLayout.jsx`, `SectorRecordsList.jsx`, `useSectorRecords.js`, `sectorCategories.js` |
| Glossary | `GlossaryPage.jsx`, `GlossaryAlphabetPanel.jsx`, `GlossaryEntriesList.jsx`, `useGlossary.js` |
| Infographic / PDFs | `InfographicPage.jsx`, `PdfViewerModal.jsx`, `backgroundSlides.js`, `infographicTiles.js` |
| Hero slider | `BackgroundSlider.jsx`, `backgroundSlides.js` |

## Glossary-specific

- Alphabet panel must use **`isLettersLoading`** / **`lettersError`** only — not entry loading state. Entry fetches must not unmount or hide the letter grid.
- `GlossaryAlphabetPanel` is wrapped in `React.memo`; avoid passing unstable props that force full panel re-renders on every entry update.
- Letter filter API: `fetchGlossaryByLetter(lang, letter)`; English letters are lowercase in API calls.

## Sector records-specific

- Category IDs live in `src/constants/sectorCategories.js` — keep in sync with API.
- `SectorRecordsList` requires `SectorRecordsContext` from `SectorPageLayout` (or equivalent provider). Do not call `useSectorRecords()` hook directly in presentational list components.
- Subcategory toggles should remain accessible (`aria-pressed`, keyboard usable).

## Accessibility and UX

- Flag missing `aria-label` / `role="alert"` on loading and error states.
- Georgian content should use `fontFamily: "myFont, var(--app-font)"` where the rest of the app does for ka.
- Images that are decorative must have `alt=""` and `aria-hidden` where appropriate.
- `PdfViewerModal` prop is **`pdfUrl`**, not `url`.

## Security and hygiene

- Block commits of `.env`, API keys, tokens, or credentials.
- Do not use `eval`, `dangerouslySetInnerHTML` on API/glossary HTML without sanitization review.
- Flag `console.log` of PII or full API payloads in production paths.

## What to avoid flagging

- Absence of TypeScript (project is JavaScript).
- Missing tests unless the PR introduces risky logic without any manual test notes.
- Prettier/formatting-only diffs unless they hide functional changes.

## Severity guidance

- **Blocking:** Broken routes, wrong language/sector mapping, data loss on navigation, accessibility regressions on primary flows, security issues, glossary grid disappearing on letter click.
- **Non-blocking:** Copy tweaks, minor naming, optional refactors.
