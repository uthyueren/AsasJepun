# AsasJepun Website Specification

## Overview

**AsasJepun** — A Malaysian-focused Japanese language learning platform built around cultural context rather than rote memorization. The tagline is "Belajar Jepun through culture, bukan hafalan."

The site exists in two languages: English (EN) and Bahasa Malaysia (MY). Language toggle is prominent in the header, not buried in menus.

---

## Architecture

### Tech Stack
- **Vanilla JS** with ES6 modules (no framework)
- **Vite** for bundling
- **CSS custom properties** for theming (dark/light modes already implemented)
- **LocalStorage** for persistence (theme, progress, language preference)

### Routing
Hash-based SPA router:
- `#intro` — Homepage/Dashboard
- `#roadmap` — Learning path
- `#grammar` — Grammar Library (with `?level=n5` etc. for filtering)
- `#culture` — Vocabulary/Culture Lessons
- `#blog` — Blog/Articles
- `#resources` — Resources
- `#about` — About/Community
- `#n5`, `#n4`, `#n3` — JLPT Study Hubs (existing)

### Internationalization (i18n)

All user-facing text stored in a `i18n.js` module with this structure:

```js
export const translations = {
  en: { /* English strings */ },
  my: { /* Malay strings */ }
}
```

Current language stored in `localStorage.lang` and `state.lang`.

**Bilingual display modes:**
1. **Toggle mode** (default for most pages) — site-wide switch, all content changes
2. **Side-by-side mode** (grammar example pages) — shows EN and MY in parallel columns

---

## Page Specifications

### 1. Homepage (`#intro`)

**Hero Section:**
- Tagline: "Belajar Jepun through culture, bukan hafalan"
- Subtext explaining the cultural approach
- Prominent language toggle (EN/MY) in header

**Featured Content Grid (3-4 cards):**
- Link to JLPT N5 Grammar (most relevant for beginners)
- Link to a featured Culture Lesson (e.g., "Understanding Hololive Streams")
- Link to latest Blog article
- "Where do I start?" quiz CTA

**Quick Stats:**
- Number of grammar points available
- Number of vocab/culture lessons
- Community size indicator

---

### 2. Grammar Library (`#grammar`)

**Organization:** By JLPT level (N5 → N1 tabs)

**Each grammar point is a page** (e.g., `#grammar/〜たい`) with:

- **Header:** Grammar point name (e.g., `〜たい`), JLPT level badge
- **Explanation:** In both languages (side-by-side on desktop, toggle on mobile)
- **Formation:** How to conjugate (formatted with Japanese + romaji)
- **Example sentences:** In your established format:
  ```
  Japanese (日本語)
  Romaji
  Malay translation
  ```
- **Common mistakes:** Warning box about typical errors
- **"How this differs from N4" note:** For N3+ grammar, specifically for plateau audience
- **Mark as learned checkbox:** Stored in localStorage

**URL/SEO:** Each grammar point has a slug-based URL (e.g., `#grammar/tai-form`) for Google indexing.

**Sidebar filter:** By JLPT level, searchable.

---

### 3. Vocabulary/Culture Lessons (`#culture`)

**Theme-based lessons** around culture, repurpose Threads posts into evergreen pages:

- **Lesson structure:**
  - Title (e.g., "Watching Hololive: Basic Vocabulary for Newcomers")
  - Cultural context introduction (bilingual)
  - Vocabulary list with:
    - Japanese word
    - Romaji
    - Malay/English meaning
    - Cultural usage notes
  - Example sentences
  - Quiz to test understanding

**Lesson themes:**
- Hololive/Vtuber streams
- J-drama scenes
- Seasonal events (Tanabata, Obon, etc.)
- Food culture (izakaya, convenience store, etc.)
- Daily life situations

---

### 4. Blog/Articles (`#blog`)

**Long-form content** that doesn't fit grammar/vocab format:
- "Why N3 feels like a wall"
- Culture deep-dives
- Learner mindset stuff
- "Explanation-heavy" writing style

**Article page structure:**
- Title, publish date, reading time
- Author info
- Featured image
- Article body (supports markdown-like formatting)
- Related grammar/vocab links
- Share buttons (Threads, etc.)

---

### 5. Resources (`#resources`)

**Curated tool list organized by problem:**

| Problem | Tools |
|---------|-------|
| Dictionary | Jisho.org, Tangorin, Kamus Melayu-Jepun |
| Anki Decks | Share your decks links |
| Practice |italki, HelloTalk |
| Media | Netflix JP, AbemaTV suggestions |

**Format:** CTA-then-URL (description first, then affiliate/raw link)

---

### 6. About/Community (`#about`)

**Content:**
- Your story as a learner-teacher
- Teaching philosophy
- Funnel to Threads/socials
- Community guidelines

---

## Feature Specifications

### Progress Tracking

Simple "Mark as learned" checkboxes on:
- Grammar points
- Vocabulary items
- Culture lessons

**Storage:**
```js
localStorage.setItem('learnedItems', JSON.stringify({
  grammar: ['tai-form', 'te-form', ...],
  vocab: ['word-1', 'word-2', ...],
  culture: ['lesson-1', ...]
}))
```

**UI:** Progress shown in sidebar widget, updates dynamically.

### Bilingual Toggle

- Located in header, always visible
- Click to switch EN ↔ MY
- Preference saved to localStorage
- All text content swaps instantly (no reload)

### Side-by-Side Mode

Used for grammar comparison pages:
- Desktop: Two columns (EN left, MY right)
- Mobile: Stacked with toggle switch

---

## Component Inventory

### Language Toggle
- Two-state button (EN | MY)
- Active state highlighted with accent color
- Smooth transition between states

### Grammar Point Card
- Level badge (N5-N1 color coded)
- Grammar pattern in Japanese
- Brief description
- "Learned" indicator (checkmark)
- Hover: subtle lift + border glow

### Vocabulary Flashcard
- Front: Japanese word + furigana
- Back: Meaning + usage example
- Swipe/click to flip
- "Know it" / "Still learning" buttons

### Lesson Card
- Thumbnail/icon
- Title
- Brief description
- Level indicator
- Estimated time

### Progress Widget (Sidebar)
- Current progress bar
- Items learned count
- Level breakdown

---

## Data Structure

### Grammar Point
```js
{
  slug: 'tai-form',
  level: 'n5',
  pattern: '〜たい',
  formation: 'Verb(masu) + たい',
  explanation: {
    en: 'Expresses wanting to do something...',
    my: 'Meneritakan kehendak untuk melakukan sesuatu...'
  },
  examples: [
    { japanese: '食べたい', romaji: 'tabetai', malay: 'nak makan' },
    // ...
  ],
  commonMistakes: {
    en: '...',
    my: '...'
  },
  n4difference: {
    en: '...', // for N3+
    my: '...'
  }
}
```

### Culture Lesson
```js
{
  slug: 'hololive-vocabulary',
  title: { en: '...', my: '...' },
  theme: 'entertainment', // or 'food', 'seasonal', 'daily'
  level: 'n5-n4',
  content: { /* full lesson content */ },
  vocabList: [ /* vocab items */ ],
  quiz: [ /* quiz questions */ ]
}
```

### Blog Post
```js
{
  slug: 'why-n3-feels-like-a-wall',
  title: { en: '...', my: '...' },
  publishDate: '2024-01-15',
  readingTime: 8, // minutes
  content: { en: '...', my: '...' },
  tags: ['n3', 'grammar', 'mindset'],
  relatedItems: ['grammar/n3-patterns', ...]
}
```

---

## Implementation Phases

### Phase 1: Foundation
- [x] Vite project setup
- [x] CSS design system (existing, expand)
- [x] i18n system
- [x] Router expansion

### Phase 2: Core Pages
- [ ] Homepage (redesign with new hero + featured content)
- [ ] Grammar Library (data structure + listing page + detail page)
- [ ] JLPT Hub integration (existing → enhance)

### Phase 3: Content Pages
- [ ] Vocabulary/Culture Lessons
- [ ] Blog/Articles
- [ ] Resources
- [ ] About/Community

### Phase 4: Polish
- [ ] Progress tracking
- [ ] SEO URLs
- [ ] Mobile optimization
- [ ] Testing

---

## Existing Assets

The site already has:
- Dark/light theme system
- Multiple design versions (v2-v10)
- Kana charts (Hiragana/Katakana)
- JLPT N5, N4, N3 study hubs
- Quiz system
- Kanji drawing canvas
- Responsive sidebar navigation
- Progress tracking (quiz-based)

These should be **enhanced and integrated**, not replaced.
