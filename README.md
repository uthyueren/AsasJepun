# AsasJepun - Learn Japanese from Scratch

An interactive Japanese learning website for Malaysian beginners, featuring Hiragana/Katakana charts, JLPT study hubs (N5–N3), grammar library, culture lessons, and more.

## Features

- **Kana Charts** - Interactive Hiragana & Katakana charts with audio pronunciation
- **JLPT Hubs** - Study resources for N5, N4, and N3 levels
- **Grammar Library** - Searchable grammar patterns organized by JLPT level
- **Culture Lessons** - Learn Japanese through festivals, food, and daily life
- **Dark/Light Theme** - UI/UX Pro Max design system
- **i18n Support** - English and Bahasa Malaysia

## Tech Stack

- Vanilla JavaScript (ES modules)
- Vite
- CSS (UI/UX Pro Max Design System)
- Supabase (backend)

## Development

```bash
npm install
npm run dev
```

## Deployment to Cloudflare Pages

1. **Push to GitHub:**
```bash
git add .
git commit -m "Your commit message"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/AsasJepun-Website.git
git push -u origin main
```

2. **Connect to Cloudflare Pages:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Select **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
   - Select your GitHub repository
   - **Build settings:**
     - Build command: `npm run build`
     - Build output directory: `dist`
   - **Environment variables:**
     - `NODE_VERSION`: `18`

3. **Deploy:**
   - Click **Save and Deploy**

Your site will be available at `https://your-project.pages.dev`

## Supabase Setup

Configure your Supabase project URL and anon key in `supabase.js`:

```javascript
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';
```

## License

MIT
