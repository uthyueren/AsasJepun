# AsasJepun Website

Interactive Japanese learning website for Malaysian beginners, featuring Hiragana/Katakana charts, Kanji rules, culture lessons, blog, and self-study guides (Anki, Immersion, AI).

## Project Overview

- **Type**: Single-page application (SPA) with hash-based routing
- **Stack**: Vanilla JS (ES modules), Vite, CSS
- **Languages**: Bahasa Malaysia (default), English — toggleable via header buttons
- **Theme**: Dark/light mode toggleable, stored in `localStorage`
- **Key Libraries**: None (pure vanilla JS)

## Architecture

### Entry Point

| File | Description |
|---|---|
| `index.html` | Main and only entry point |

All share the same `app.js`, `kana.js`, `content.js`, `siteText.js`, `supabase.js`, and `styles.css`.

### Source Files

| File | Purpose |
|---|---|
| `app.js` | Main application logic — router, views, state, canvas drawing |
| `kana.js` | KANA_DATA (Hiragana/Katakana charts) |
| `content.js` | CULTURE_LESSONS, BLOG_POSTS, RESOURCES, KANJI_STROKE_RULES, ANKI_CONTENT |
| `siteText.js` | `translations` object + `t()` helper, `setLanguage()`, `getLanguage()`, `toggleLanguage()` |
| `styles.css` | Single stylesheet |
| `vite.config.js` | Build config — bundles `index.html` with GA4 analytics proxy for dev |

### State

Managed in a global `state` object in `app.js`:
- `currentView`, `activeKanaTab`, `vocabCardIndex`
- `furiganaVisible` — toggles furigana display
- `resourcePage{}` — tracks current page per resource category

### Hash Router

Routes handled by `initRouter()` in `app.js`:

| Hash | Handler |
|---|---|
| `#home` | `renderIntroView()` |
| `#kana` / `#kana/subpage1/2/3` | `renderKanaView()` / subpages |
| `#kanji-rules` / `#kanji-rules/subpage1/2/3` | `renderKanjiRulesView()` / subpages |
| `#roadmap` | `renderRoadmapView()` |
| `#introduction` / `#introduction/jlpt` | `renderIntroductionView()` / `renderJLPTInfoView()` |
| `#self-study/anki` / `#self-study/immersion` / `#self-study/ai` | `renderAnkiView()` / `renderImmersionView()` / `renderSelfStudyAIView()` |
| `#culture` / `#culture/<slug>` | `handleBlogCultureRoute()` |
| `#blog` / `#blog/<slug>` | `handleBlogCultureRoute()` |
| `#resources` | `renderResourcesView()` |
| `#about` | `renderAboutView()` |
| `#admin` | `renderAdminView()` |
| `#new-post` | `renderPostEditorView()` |

### Views

- **Intro**: Hero, stats, featured content grid
- **Kana**: Hiragana/Katakana charts with subpages (Long Vowels, Tenten/Maru, Small Characters)
- **Kanji Rules**: Radicals, mnemonics, squished kanji explanations
- **Roadmap**: Timeline of 6 learning milestones with expandable drawers
- **Self Study**: Tabs for Anki, Immersion, AI — each with prompt templates
- **Blog**: Combined blog and culture posts listing → detail view
- **Resources**: Categorized external links (dictionary, Anki, media, tools)
- **About**: Bio and social links
- **Admin**: Login form → dashboard with signups list, blog post editor

### Modals

- **Kana Modal**: Click any kana card → shows character, romaji, example word, pronounce button (Web Speech API)
- **Kanji Draw Modal**: Canvas for stroke practice with clear button; touch + mouse support

### i18n

All user-facing strings use `data-i18n` attributes. `updateI18nText()` re-renders on language switch. Supported: `en`, `my`.

### Theming

CSS variables defined in `styles.css`. Dark theme is default. Toggle adds/removes `.light-theme` class on `<body>`.

## Commands

```bash
npm run dev      # Start Vite dev server
npm run build    # Build to dist/
npm run preview  # Preview production build
```

## Notes

- Canvas drawing state (for Kanji modal) is module-level (`isDrawing`, `lastX`, `lastY`, `ctx`) — not part of `state`
- Grammar "mark as learned" persists per grammar slug to `localStorage`
- `renderFuriganaSentence()` in `app.js` has a hardcoded mapping for N5 example sentences — adding new grammar examples requires updating this function
- Blog posts (including culture/vocabulary posts) are stored in Supabase (`blog_posts` table) and fall back to static `BLOG_POSTS`/`CULTURE_LESSONS` arrays in `content.js`. Both are shown together in the combined blog/culture view.
- The admin post editor no longer uses a type selector — all posts are just blog posts.
- Culture posts with `vocabList` or `culturalNotes` fields from `CULTURE_LESSONS` still work (static fallback), but new posts don't have these structured fields.
