# AsasJepun — Product Requirements Document

> **Version**: 3.0
> **Last Updated**: 2026-08-25

---

## 1. Overview

### What It Is

AsasJepun is a free, no-registration-required Japanese learning platform built for Malaysian beginners who want to self-study but don't know where to start. It provides a structured learning pathway through JLPT N5→N3, plus curated resources so learners know exactly what to use and when.

### The Problem It Solves

Malaysian beginners fall into two traps: (1) relying on textbooks that teach *about* Japanese rather than how to acquire it, and (2) jumping between scattered online resources with no sense of what to learn next. AsasJepun provides the path — what to learn, in what order, and which free resources to use at each stage.

### What Success Looks Like

A learner who finishes AsasJepun:
- Has a clear plan and knows exactly where to start their next study session
- Can self-assess whether they're ready for JLPT by testing their kanji and grammar knowledge
- Can continue to N2/N1 without a teacher
- If they ever want structured classes, thinks "I should check out what AsasJepun offers" — because the free content proved its worth

### Target Audience

Malaysian beginners (teenagers to adults) with motivation but no clear pathway. SPM students, working adults, anime fans — they have time and drive but no nearby Japanese courses and limited confidence in self-study.

### Languages

English (default) and Bahasa Malaysia. Content is bilingual so learners can reference their strongest language.

---

## 2. Features

**Kana Charts**
Hiragana and Katakana character grids with audio pronunciation via Web Speech API. Click any character to hear it spoken.

**JLPT Study Hubs (N5, N4, N3)**
Tabbed sections for each level:
- **Kanji** — character grid with meaning and stroke count
- **Grammar** — patterns with formation, explanations, and examples
- **Vocab** — vocabulary lists with readings and meanings

**General Kanji Stroke Rules**
Guides on how kanji strokes are written — direction, order, and common patterns. Helps learners practice correctly without needing a teacher.

**Grammar Library**
Searchable, filterable by JLPT level. Each grammar point shows formation, explanation in both EN/MY, and example sentences.

**Anki Decks & Vocab Mining**
Recommended Anki decks for each level, plus guidance on how to mine vocabulary from anime, dramas, and other native content.

**Culture Lessons**
Themed lessons on Japanese customs, daily life, and culture — connecting language learning to real-world context.

**Blog**
Articles on study strategies, language insights, and deeper cultural topics.

**Resources**
Curated external links organized by type: dictionaries, Anki decks, YouTube channels, podcasts, and study tools.

**Learning Roadmap**
Overview of 4 learning milestones:
1. Hiragana Basics — Master the 46 hiragana characters
2. Katakana & Basic Grammar — Introduction to katakana and essential grammar
3. JLPT N5 Mastery — Comprehensive N5 preparation
4. JLPT N4-N3 Prep — Advanced grammar and kanji

**Per-Item Progress Tracking**
Learners can mark individual kanji, grammar points, and vocabulary as "learned." Progress is stored locally and persists between sessions.

**Theme & Language Toggle**
Dark/light mode toggle. EN/MY language toggle with English as default.

---

## 3. Data

### Kana

```js
{ char: "あ", romaji: "a", example: "日本語", exampleRead: "にほんご", exampleMeaning: "Japanese language" }
```

### Kanji

```js
{ char: "日", romaji: "ni/nichi", meaning: "day, sun", strokes: 4, level: "n5" }
```

### Grammar

```js
{ slug: "wa-particle", level: "n5", formation: "N は", explanation: { en: "...", my: "..." }, examples: [...] }
```

### Vocab

```js
{ word: "日本語", reading: "にほんご", meaning: "Japanese language", level: "n5" }
```

### Progress (localStorage)

```js
{ learnedKanji: [], learnedGrammar: [], learnedVocab: [], preferences: { language: "en", theme: "dark" } }
```
