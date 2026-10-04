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
- Cloudflare Workers + D1 (backend)

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

## Cloudflare Setup

Backend uses Cloudflare Workers + D1. The D1 database `asasjepun-db` is already configured in `wrangler.toml`.

### Setting Up Admin Password

Passwords are hashed with bcrypt. To set your admin password:

1. Generate a bcrypt hash locally (requires Node.js):
```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('YOUR_PASSWORD', 10))"
```

2. Update the D1 database with the generated hash:
```bash
npx wrangler d1 execute asasjepun-db --command="UPDATE admin_users SET password_hash='YOUR_HASH' WHERE username='admin';"
```

Replace `YOUR_PASSWORD` with your desired password and `YOUR_HASH` with the hash output from step 1.

### Deploy the Pages Function (Worker API):
```bash
npx wrangler pages deploy dist
```

## License

MIT
