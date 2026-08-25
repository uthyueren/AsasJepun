# AsasJepun Website

Interactive Japanese learning website for Malaysian beginners, featuring Hiragana/Katakana charts, JLPT study hubs (N5–N3), grammar library, culture lessons, blog, and quizzes.

## Project Overview

- **Type**: Single-page application (SPA) with hash-based routing
- **Stack**: Vanilla JS (ES modules), Vite, CSS
- **Languages**: Bahasa Malaysia (default), English — toggleable via header buttons
- **Theme**: Dark/light mode toggleable, stored in `localStorage`
- **Key Libraries**: None (pure vanilla JS)

## Architecture

### Entry Points

| File | Theme | Description |
|---|---|---|
| `index.html` | Glassmorphism (default) | Main entry |
| `index-v2.html` – `index-v10.html` | Design variations | Alternate themes (Sakura, Cyberpunk, Washi, Retro, etc.) |

All HTML files share the same `app.js`, `data.js`, `content.js`, `i18n.js`, and `styles.css`.

### Source Files

| File | Purpose |
|---|---|
| `app.js` | Main application logic — router, views, state, quiz system, canvas drawing |
| `data.js` | KANA_DATA (Hiragana/Katakana) and JLPT_DATA (Kanji/Vocab/Grammar/Quiz per level) |
| `content.js` | GRAMMAR_DATA, CULTURE_LESSONS, BLOG_POSTS, RESOURCES |
| `i18n.js` | `translations` object + `t()` helper, `setLanguage()`, `getLanguage()`, `toggleLanguage()` |
| `styles.css` | Single stylesheet shared by all HTML variants |
| `vite.config.js` | Build config — bundles all 10 HTML entry points |

### State

Managed in a global `state` object in `app.js`:
- `currentView`, `activeLevelTab`, `vocabCardIndex`
- `quizCurrentQuestion`, `quizScore`, `quizAnswers`, `quizActiveLevel`
- `passedQuizzes[]` — persisted to `localStorage` key `passedQuizzes`
- `learnedItems{ grammar[], vocab[], culture[] }` — persisted to `localStorage` key `learnedItems`

### Hash Router

Routes handled by `initRouter()` in `app.js`:

| Hash | Handler |
|---|---|
| `#intro` | `renderIntroView()` |
| `#roadmap` | `renderRoadmapView()` |
| `#grammar` / `#grammar/<slug>` | `handleGrammarRoute()` |
| `#culture` / `#culture/<slug>` | `handleCultureRoute()` |
| `#blog` / `#blog/<slug>` | `handleBlogRoute()` |
| `#resources` | `renderResourcesView()` |
| `#about` | `renderAboutView()` |
| `#n5` / `#n4` / `#n3` | `renderJLPTView(level)` |
| `#quiz-n5` / `#quiz-n4` / `#quiz-n3` | `startQuiz(level)` |

### Views

- **Intro**: Hero, stats, featured content grid
- **Roadmap**: Timeline of 4 learning milestones with expandable drawers
- **JLPT Hub**: Tabbed (Kanji / Grammar / Vocab), start quiz button
  - **Kanji**: Grid of cards with draw modal (canvas)
  - **Grammar**: Cards with furigana toggle; detail view with formation, bilingual explanation, examples, common mistakes
  - **Vocab**: Flashcard deck (flip animation) + sortable table with audio pronunciation
- **Quiz**: Multi-choice questions with explanation reveal; results page with pass/fail + localStorage tracking
- **Grammar Library**: Searchable, filterable by JLPT level
- **Culture Lessons**: Themed lesson cards → lesson detail with vocab table
- **Blog**: Article listing → article view with simple markdown rendering
- **Resources**: Categorized external links (dictionary, Anki, media, tools)
- **About**: Bio and social links

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

- 10 design variations exist (`index-v2.html` through `index-v10.html`); the sidebar version selector switches between them
- Canvas drawing state (for Kanji modal) is module-level (`isDrawing`, `lastX`, `lastY`, `ctx`) — not part of `state`
- Quiz passes at ≥60% score; passing a quiz for a level persists to `localStorage`
- Grammar "mark as learned" persists per grammar slug to `localStorage`
- `renderFuriganaSentence()` in `app.js` has a hardcoded mapping for N5 example sentences — adding new grammar examples requires updating this function
