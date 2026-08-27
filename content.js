// Content Data for AsasJepun Website
// Culture Lessons, Blog Posts, Resources, Kanji Stroke Rules, Anki Content

// NOTE: Grammar data is now in grammar.js
// =============================================================================
// CULTURE LESSONS - Theme-based vocabulary and cultural context
// =============================================================================
export const CULTURE_LESSONS = [
  {
    slug: 'hololive-vocabulary',
    title: {
      en: 'Watching Hololive: Essential Vocabulary for Newcomers',
      my: 'Menonton Hololive: Vocabulary Penting untuk Pemula'
    },
    theme: 'entertainment',
    icon: 'gamepad-2',
    level: 'n5-n4',
    description: {
      en: 'Learn Japanese through the world of Vtubers. This lesson covers essential terms for understanding Hololive streams and Japanese internet culture.',
      my: 'Belajar Jepun melalui dunia Vtuber. Pelajaran ini merangkumi istilah penting untuk memahami strim Hololive dan budaya internet Jepun.'
    },
    vocabList: [
      { word: '配信', furigana: 'はいしん', romaji: 'haishin', meaning: 'Stream/Live broadcast', malay: 'Strim/Siaran langsung' },
      { word: 'コラボ', furigana: 'コラボ', romaji: 'korabo', meaning: 'Collaboration', malay: 'Kolaborasi' },
      { word: 'メンバー', furigana: 'メンバー', romaji: 'menbaa', meaning: 'Channel member', malay: 'Ahli saluran' },
      { word: '登録', furigana: 'とうろく', romaji: 'touroku', meaning: 'Registration/Subscribe', malay: 'Pendaftaran-langgan' },
      { word: 'コメント', furigana: 'コメント', romaji: 'komento', meaning: 'Comment', malay: 'Komen' },
      { word: '高評価', furigana: 'こうひょうか', romaji: 'kouhyoka', meaning: 'Like/Upvote', malay: 'Like' },
      { word: '配信者', furigana: 'はいしんしゃ', romaji: 'haishinsha', meaning: 'Streamer', malay: 'Streamer' },
      { word: '切り抜き', furigana: 'きりぬき', romaji: 'kirinuki', meaning: 'Clip (of stream)', malay: 'Clip (daripada strim)' }
    ],
    culturalNotes: {
      en: 'Hololive Production is a virtual YouTuber agency based in Japan. Their talents (called "Hololive members") stream games, karaoke, talk shows, and more. The community is very engaged, using terms like "ます" respect in comments and supporting their favorite talents through memberships and super chats.',
      my: 'Hololive Production adalah agensi virtual YouTuber berdasarkan di Jepun. Bintang mereka (dipanggil "ahli Hololive") strim game, karaoke, bual, dan lagi. Komuniti sangat engage, menggunakan istilah seperti "ます" dalam komen dan menyokong bintang kegemaran melalui keahlian dan super chat.'
    }
  },
  {
    slug: 'j-drama-vocabulary',
    title: {
      en: 'J-Drama Expressions: Words from Your Favorite Shows',
      my: 'Ungkapan Drama Jepun: Perkataan dari Rancangan Kegemaran'
    },
    theme: 'entertainment',
    icon: 'tv',
    level: 'n4-n3',
    description: {
      en: 'Expand your vocabulary with words and expressions commonly heard in Japanese dramas. Perfect for intermediate learners who want to understand natural conversation.',
      my: 'Perluas vocabulary dengan perkataan dan ungkapan yang selalu didengar dalam drama Jepun. Sesuai untuk pelajar pertengahan yang nak faham percakapan natural.'
    },
    vocabList: [
      { word: 'どうでもいい', furigana: 'どうでもいい', romaji: 'doudemoii', meaning: 'I don\'t care', malay: 'Saya tak kisah' },
      { word: 'やばい', furigana: 'やばい', romaji: 'yabai', meaning: 'Awesome/Crazy/Troublesome', malay: 'Gila/Berbahaya' },
      { word: '微妙', furigana: 'びみょう', romaji: 'bimyou', meaning: 'So-so/Dubious', malay: 'Biasa je/Tak pasti' },
      { word: 'あり得ない', furigana: 'ありえない', romaji: 'arienai', meaning: 'Unbelievable', malay: 'Tak boleh percaya' },
      { word: '面倒', furigana: 'めんどい', romaji: 'mendou', meaning: 'Troublesome/A pain', malay: 'Merepek/Malas' },
      { word: '脈あり', furigana: 'みゃくあり', romaji: 'myakuari', meaning: 'Signs of mutual interest (romance)', malay: 'Tanda ada rasa (romance)' }
    ],
    culturalNotes: {
      en: 'J-dramas often feature workplace romances, school stories, and medical or legal dramas. You\'ll hear lots of casual Japanese in these shows, which is great for learning informal speech patterns. Pay attention to how characters speak differently to seniors vs. friends.',
      my: 'Drama Jepun selalu ada romansa pejabat, cerita sekolah, dan drama perubatan atau undang-undang. Anda akan dengar banyak bahasa Jepun casual, yang bagus untuk belajar corak pertuturan tidak formal. Perhatikan bagaimana watak bercakap bezanya dengan atasan vs kawan.'
    }
  },
  {
    slug: 'convenience-store',
    title: {
      en: 'Convenience Store Life: コンビニ Shopping Vocabulary',
      my: 'Kehidupan Kedai Runcit: Vocabulary Membeli-belah di コンビニ'
    },
    theme: 'food',
    icon: 'store',
    level: 'n5',
    description: {
      en: 'Master the art of shopping at Japanese convenience stores (konbini). From buying onigiri to paying bills, this lesson covers everything you need.',
      my: 'Kuasai seni membeli-belah di kedai runcit Jepun (konbini). Dari beli onigiri sampai bayar bil, pelajaran ini cover semua yang anda perlu.'
    },
    vocabList: [
      { word: 'お弁当', furigana: 'おべんとう', romaji: 'obentou', meaning: 'Lunch box', malay: 'Bekal makanan' },
      { word: 'おにぎり', furigana: 'おにぎり', romaji: 'onigiri', meaning: 'Rice ball', malay: 'Beras bola' },
      { word: 'レジ', furigana: 'レジ', romaji: 'reji', meaning: 'Register', malay: 'Daftar' },
      { word: '袋', furigana: 'ふくろ', romaji: 'fukuro', meaning: 'Bag', malay: 'Beg' },
      { word: '温める', furigana: 'あたためる', romaji: 'atatameru', meaning: 'To warm up', malay: 'Panaskan' },
      { word: '無料', furigana: 'むりょう', romaji: 'muryou', meaning: 'Free (no charge)', malay: 'Percuma (tiada caj)' }
    ],
    culturalNotes: {
      en: 'Japanese konbini (7-Eleven, FamilyMart, Lawson) are amazing - they offer fresh food, ATM services, ticket sales, and even printing services. Most are open 24/7. Staff will always ask "here or takeout?" (こちらですか？お持ち帰りですか？) and heat up your food for free!',
      my: 'Konbini Jepun (7-Eleven, FamilyMart, Lawson) memang amazing - dia punya makanan segar, perkhidmatan ATM, penjualan tiket, dan juga percetakan. Kebanyakannya buka 24/7. Staff akan selalu tanya "sini atau bawa pergi?" (こちらですか？お持ち帰りですか？) dan panaskan makanan anda free!'
    }
  },
  {
    slug: 'tanabata',
    title: {
      en: 'Tanabata Festival: The Star Festival Vocabulary',
      my: 'Pesta Tanabata: Vocabulary Pesta Bintang'
    },
    theme: 'seasonal',
    icon: 'sparkles',
    level: 'n5-n4',
    description: {
      en: 'Learn about Tanabata, the Japanese star festival celebrated in July/August. Perfect for understanding seasonal Japanese cultural events.',
      my: 'Ketahui tentang Tanabata, pesta bintang Jepun yang diraikan pada Julai/Ogos. Sesuai untuk memahami acara budaya bermusim Jepun.'
    },
    vocabList: [
      { word: '短冊', furigana: 'たんざく', romaji: 'tanzaku', meaning: 'Wish strips (paper)', malay: 'Jalur keinginan (kertas)' },
      { word: '星', furigana: 'ほし', romaji: 'hoshi', meaning: 'Star', malay: 'Bintang' },
      { word: '伝説', furigana: 'でんせつ', romaji: 'densetsu', meaning: 'Legend', malay: 'Legenda' },
      { word: '願い事', furigana: 'ねがいごと', romaji: 'negaigoto', meaning: 'Wish/Desire', malay: 'Keinginan' },
      { word: '飾る', furigana: 'かざる', romaji: 'kazaru', meaning: 'To decorate', malay: 'Hias' },
      { word: '流す', furigana: 'ながす', romaji: 'nagasu', meaning: 'To float (downstream)', malay: 'Alirkan (ke bawah)' }
    ],
    culturalNotes: {
      en: 'Tanabata is based on the legend of Orihime (weaving princess) and Hikoboshi (cowherd star) who are separated by the Milky Way and can only meet once a year. People write wishes on tanzaku strips and hang them on bamboo trees. Different cities have their own Tanabata festivals - Sendai\'s is especially famous!',
      my: 'Tanabata berdasarkan legenda Orihime (puteri tenun) dan Hikoboshi (bapa biri-biri) yang diasingkan oleh Milky Way dan hanya boleh jumpa sekali setahun. Orang menulis keinginan pada jalur tanzaku dan gantung pada pokok buluh. Bandar مختلفة ada pesta Tanabata sendiri - Sendai\'s memang famous!'
    }
  },
  {
    slug: 'izakaya',
    title: {
      en: 'Izakaya Etiquette: Japanese Pub Vocabulary',
      my: 'Etiket Izakaya: Vocabulary Pub Jepun'
    },
    theme: 'food',
    icon: 'beer',
    level: 'n4-n3',
    description: {
      en: 'Navigate the exciting world of Japanese izakayas (pubs). Learn ordering phrases, social customs, and essential food vocabulary.',
      my: 'Menavigasi dunia menarik izakaya Jepun (pub). Belajar frasa pesan, adat sosial, dan vocabulary makanan penting.'
    },
    vocabList: [
      { word: '注文', furigana: 'ちゅうもん', romaji: 'chuumon', meaning: 'Order', malay: 'Pesan' },
      { word: 'おすすめ', furigana: 'おすすめ', romaji: 'osusume', meaning: 'Recommendation', malay: 'Cadangan' },
      { word: '乾杯', furigana: 'かんぱい', romaji: 'kanpai', meaning: 'Cheers', malay: 'Sihat' },
      { word: '会計', furigana: 'かいけい', romaji: 'kaikei', meaning: 'Bill/Cheque', malay: 'Bil' },
      { word: '刺身', furigana: 'さしみ', romaji: 'sashimi', meaning: 'Sashimi (raw fish)', malay: 'Sashimi (ikan mentah)' },
      { word: '焼き鳥', furigana: 'やきとり', romaji: 'yakitori', meaning: 'Grilled chicken skewer', malay: 'Ayam panggang cucuk' }
    ],
    culturalNotes: {
      en: 'Izakaya are casual drinking establishments that also serve food. It\'s customary for one person to pay the bill (お会計) rather than splitting it. When ordering, it\'s polite to say "one of each" (一つずつ) or let the staff recommend. Remember: pouring others\' drinks (especially senpai!) shows respect!',
      my: 'Izakaya adalah tempat minum santai yang juga served makanan. Adat了一点人 bayar bil (お会計) 而不是membahagi-bahagi. Bila pesan, sopan cakap "satu setiap satu" (一つずつ) atau biar staff cadangkan. Ingat: menuang minuman orang lain (terutama senpai!) tunjuk hormat!'
    }
  },
  {
    slug: 'daily-greetings',
    title: {
      en: 'Japanese Greetings: From Casual to Formal',
      my: 'Ucaptama Jepun: Dari Relaxed ke Formal'
    },
    theme: 'daily',
    icon: 'heart',
    level: 'n5',
    description: {
      en: 'Master Japanese greetings for every situation. Learn when to use casual お疲れ様です versus formal ご紹介します.',
      my: 'Kuasai ucaptama Jepun untuk setiap situasi. Belajar bila nak guna casual お疲れ様です vs formal をご紹介します.'
    },
    vocabList: [
      { word: 'おはよう', furigana: 'おはよう', romaji: 'ohayou', meaning: 'Good morning (casual)', malay: 'Selamat pagi (relaxed)' },
      { word: 'お疲れ様です', furigana: 'おつかれさまです', romaji: 'otsukaresama desu', meaning: 'Thank you for your hard work', malay: 'Terima kasih atas kerja keras' },
      { word: '行ってきます', furigana: 'いってきます', romaji: 'ittekimasu', meaning: 'I\'m off (leaving home)', malay: 'Saya pergi (tinggalkan rumah)' },
      { word: 'ただいま', furigana: 'ただいま', romaji: 'tadaima', meaning: 'I\'m back home', malay: 'Saya balik' },
      { word: 'お世話になります', furigana: 'おせわになります', romaji: 'osewa ni narimasu', meaning: 'Thank you for your support (work)', malay: 'Terima kasih atas sokongan (kerja)' }
    ],
    culturalNotes: {
      en: 'Japanese greetings vary greatly by time of day, relationship, and formality level. お疲れ様です (otsukaresama) literally means "you look tired from work" but is actually a thank you! At home, families use different phrases than in business settings. Observe and mimic native speakers!',
      my: 'Ucaptama Jepun bezanya banyak berdasarkan masa hari, hubungan, dan tahap formal. お疲れ様です bermakna literally "anda dia penat dari kerja" tapi sebenarnya terima kasih! Di rumah, keluarga guna frasa berbeza dari tempat kerja. Lihat dan tiru penutur asli!'
    }
  }
];

// =============================================================================
// BLOG POSTS - Long-form articles
// =============================================================================
export const BLOG_POSTS = [
  {
    slug: 'why-n3-feels-like-a-wall',
    title: {
      en: 'Why N3 Feels Like a Wall (And How to Push Through)',
      my: 'Mengapa N3 Rasanya Seperti Dinding (Dan Cara Mengatasinya)'
    },
    publishDate: '2024-01-15',
    readingTime: 8,
    tags: ['n3', 'mindset', 'grammar'],
    excerpt: {
      en: 'After mastering N4 grammar patterns, many learners hit a frustrating plateau at N3. Here\'s why it happens and the mindset shift you need to break through.',
      my: 'Selepas kuasai corak tatabahasa N4, ramai pelajar jumpa plateau yang frustrating di N3. Ini sebab ia berlaku dan pendekatan mindset yang anda perlukan untuk tembus.'
    },
    content: {
      en: `# Why N3 Feels Like a Wall

## The Plateau Problem

You've nailed N5 and N4 grammar. You can hold basic conversations, read simple texts, and feel pretty confident. Then you start N3 materials and suddenly everything feels hard again.

**This is completely normal.**

## Why N3 is Different

### 1. Density of Information
N3 grammar is not just "harder". It is denser. Each grammar point connects to multiple concepts. Where N4 might have 1-2 usage patterns, N3 has 3-4.

### 2. Nuance Over Rules
N4 follows clear rules: use this form for this situation. N3 introduces nuance. This form works here BUT has these subtle implications.

### 3. Passive Recognition Required
Many N3 patterns you don't need to produce actively, but you DO need to recognize them when native speakers use them.

## The Mindset Shift

**Stop treating N3 as "more of the same."**

Think of N4 as learning individual tools. N3 is learning how to combine those tools creatively.

## Practical Strategies

1. **Read native material** - Novels, manga, light novels
2. **Watch without subtitles** - Challenge your ears
3. **Keep a grammar journal** - Write original example sentences
4. **Teach N3 concepts** - Explaining helps you understand

The wall is real, but it's not permanent. Push through.`,
      my: `# Mengapa N3 Rasanya Seperti Dinding

## Masalah Plateau

Anda dah kuasai tatabahasa N5 dan N4. Anda boleh buat perbualan basic, baca teks simple, dan rasa confident. Then anda start bahan N3 dan tiba-tiba semua rasa susah.

**Ini adalah normal.**

## Mengapa N3 Bezanya

### 1. Ketumpatan Maklumat
Tatabahasa N3 bukan sekadar "lebih susah". Ia lebih padat. Setiap titik tatabahasa sambung ke multiple konsep. Mana N4 mungkin ada 1-2 corak penggunaan, N3 ada 3-4.

### 2. Nuance Lebih Dari Rules
N4 ikut rules jelas: guna bentuk ini untuk situasi ini. N3 memperkenalkan nuance. Bentuk ini berfungsi di sini TAPI ada implikasi subtle.

### 3. Passive Recognition Diperlukan
Ramai corak N3 yang anda tak perlu produce aktif, tapi anda PERLU recognise bila penutur asli guna.

## Mindset Shift

**Berhenti treat N3 sebagai "lebih dari yang sama."**

Fikir N4 sebagai belajar alatan individu. N3 adalah belajar bagaimana gabungkan alatan tu secara kreatif.

## Strategi Praktikal

1. **Baca bahan asli** - Novel, manga, light novels
2. **Tengok tanpa sari kata** - Challenge telinga anda
3. **Keep grammar journal** - Tulis contoh ayat original
4. **Ajar konsep N3** - Explaination bantu anda faham

Dinding tu real, tapi ia tak permanent. Pushing through.`
    }
  },
  {
    slug: 'learning-through-hololive',
    title: {
      en: 'Why Learning Japanese Through Hololive Actually Works',
      my: 'Mengapa Belajar Jepun Melalui Hololive Sesungguhnya Berfungsi'
    },
    publishDate: '2024-02-20',
    readingTime: 6,
    tags: ['culture', 'motivation', 'input'],
    excerpt: {
      en: 'Vtuber content is not just entertaining. It is a goldmine for comprehensible input. Here is the science and strategy behind learning through streams.',
      my: 'Kandungan Vtuber bukan sekadar entertaining. Ia adalah lombong emas untuk comprehensible input. Ini science dan strategi di sebalik belajar melalui strim.'
    },
    content: {
      en: `# Learning Japanese Through Hololive

## The Comprehensible Input Theory

Stephen Krashen's Input Hypothesis says we acquire language when we understand messages slightly above our current level. This is called "i+1". Input that is one step ahead.

Hololive streams provide exactly this.

## Why Streams Work

### 1. Visual Context
When a streamer says "これ" while showing something, you get instant visual context. The object + word connection builds vocabulary naturally.

### 2. Emotional Engagement
When you're entertained, your brain is more receptive. You remember content linked to positive emotions.

### 3. Natural Speech Patterns
Streams use casual Japanese. The kind textbooks rarely teach. You hear how people actually speak.

## Getting Started

### Beginner Strategy
- Watch clips with Japanese subtitles
- Focus on repeated words and phrases
- Keep a list of "survival phrases"

### Intermediate Strategy
- Watch lives without subtitles
- Try to understand the conversation flow
- Note unfamiliar grammar patterns for later study

## Recommended Talents for Learners

| Talent | Why They're Good for Learners |
|--------|-------------------------------|
| Mori Calliope | Clear speech, uses English comparisons |
| Gawr Gura | Simple vocabulary, fun personality |
| Akito | Explains Japanese culture, patient teaching style |

Enjoy the journey!`,
      my: `# Belajar Jepun Melalui Hololive

## Teori Input yang Difahami

Input Hypothesis Stephen Krashen kata kita acquire bahasa bila kita faham mesej sikit above tahap semasa. Ini dipanggil "i+1". Input yang satu langkah di hadapan.

Strim Hololive bagi exact ini.

## Mengapa Strim Berfungsi

### 1. Konteks Visual
Bila streamer cakap "これ" sambil tunjuk something, anda dapat context visual segera. Perkataan + objek connection bina vocabulary secara natural.

### 2. Emotional Engagement
Bila anda entertained, otak anda lebih receptive. Anda ingat kandungan yang linked dengan emosi positif.

### 3. Corak Pertuturan Natural
Strim guna Japanese casual. Jenis yang jarang buku teks ajar. Anda dengarcamana orang sebenarnye speak.

## Cara Mula

### Strategi Pemula
- Tengok clips dengan sari kata Jepun
- Fokus pada perkataan dan frasa yang repeat
- Keep satu list "survival phrases"

### Strategi Pertengahan
- Tengok live tanpa sari kata
- Cuba faham conversation flow
- Note corak tatabahasa yang tak familiar untuk study later

## Talent yang Disyorkan untuk Pelajar

| Talent | Mengapa Mereka Bagus untuk Pelajar |
|--------|-------------------------------|
| Mori Calliope | Pertuturan clear, guna comparison English |
| Gawr Gura | Vocabulary simple, personaliti fun |
| Akito | Explain budaya Jepun, gaya ajar patient |

Nikmati perjalanan!`
    }
  },
  {
    slug: 'self-study-vs-class',
    title: {
      en: 'Self-Study vs. Formal Classes: Finding Your Path',
      my: 'Self-Study vs. Kelas Formal: Mencari Jalan Anda'
    },
    publishDate: '2024-03-10',
    readingTime: 5,
    tags: ['mindset', 'methodology'],
    excerpt: {
      en: 'Should you learn Japanese alone or in a classroom? The answer is not either/or. It is about finding the right balance.',
      my: 'Patut ke belajar Jepun sorang atau dalam classroom? Jawapan bukan salah satu. Ia tentang cari keseimbangan yang tepat.'
    },
    content: {
      en: `# Self-Study vs. Formal Classes

## The False Dichotomy

Learners often frame this as an either/or question. But the best Japanese learners I know use BOTH.

## When Self-Study Wins

- **Flexibility**: Learn at 2am if that's when you're sharpest
- **Personalization**: Focus exactly on what interests you
- **Cost**: Most resources are free or cheap
- **Depth**: You can go as deep as you want on any topic

## When Classes Win

- **Accountability**: Deadlines and schedules create consistency
- **Feedback**: Native speakers can correct your mistakes instantly
- **Structured Progress**: Someone else designs the curriculum
- **Speaking Practice**: Real-time conversation practice

## The Hybrid Approach

**Use classes for:**
- Speaking practice and pronunciation feedback
- Grammar explanation when you're confused
- Structured progression and accountability

**Use self-study for:**
- Vocabulary acquisition (flashcards, immersion)
- Reading practice (manga, novels, news)
- Listening practice (podcasts, streams, dramas)
- Writing in your journal

## My Recommendation

Start with a class to build foundation and get feedback. After N5-N4, transition to primarily self-study with occasional tutoring for speaking practice.

The classroom isn't for everyone. But neither is pure self-study. Know yourself and optimize accordingly.`,
      my: `# Self-Study vs. Kelas Formal

## False Dichotomy

Pelajar selalu frame ni sebagai soalan either/or. Tapi learner Jepun terbaik yang saya tahu guna DUA-DUANYA.

## Bila Self-Study Menang

- **Fleksibiliti**: Belajat at 2pg kalau tu masa anda paling sharp
- **Personalisasi**: Fokus exactly pada apa yang interess anda
- **Kos**: Kebanyakan resource adalah free atau cheap
- **Kedalaman**: Anda boleh go deep mana-mana topik

## Bila Kelas Menang

- **Akauntabiliti**: Deadline dan jadual create consistency
- **Feedback**: Penutur asli boleh betulkan mistakes anda serta-merta
- **Progress Terstruktur**: Someone else design curriculum
- **Latihan Bertutur**: Practice perbualan real-time

## Pendekatan Hibrid

**Guna kelas untuk:**
- Latihan pertuturan dan feedback pengucapan
- Penjelasan tatabahasa bila anda confuse
- Progress terstruktur dan akauntabiliti

**Guna self-study untuk:**
- Vocabulary acquisition (flashcards, immersion)
- Reading practice (manga, novel, news)
- Listening practice (podcast, strim, drama)
- Writing dalam journal anda

## Cadangan Saya

Mula dengan kelas untuk bina foundation dan dapat feedback. Selepas N5-N4, transition ke primarily self-study dengan occasional tutoring untuk speaking practice.

Classroom bukan untuk semua. Tapi pure self-study juga bukan. Kenal diri anda dan optimize accordingly.`
    }
  }
];

// =============================================================================
// RESOURCES - Curated tool list
// =============================================================================
export const RESOURCES = {
  dictionary: [
    {
      name: 'Jisho.org',
      description: 'The best English-Japanese dictionary for learners. Includes kanji lookup, example sentences, and stroke order.',
      url: 'https://jisho.org',
      icon: 'book-open'
    },
    {
      name: 'Tangorin',
      description: 'Japanese dictionary with sentence search and example sentences. Great for finding words in context.',
      url: 'https://tangorin.com',
      icon: 'book'
    },
    {
      name: 'Kamus Melayu-Jepun (Wikitionary)',
      description: 'Malay-Japanese dictionary for when English explanations don\'t quite click.',
      url: 'https://en.wiktionary.org/wiki',
      icon: 'book-marked'
    }
  ],
  anki: [
    {
      name: 'N5 Core Grammar Deck',
      description: 'Essential grammar patterns for JLPT N5 with example sentences and audio.',
      url: 'https://ankiweb.net/shared/decks/japanese',
      icon: 'gamepad-2'
    },
    {
      name: 'Kanji Damage',
      description: 'Famous kanji deck using stories and mnemonics. Great for remembering kanji meanings.',
      url: 'https://kanjidamage.github.io',
      icon: 'pencil'
    }
  ],
  practice: [
    {
      name: 'iTalki',
      description: 'Book 1-on-1 lessons with tutors from around the world. Great for speaking practice.',
      url: 'https://italki.com',
      icon: 'graduation-cap'
    },
    {
      name: 'HelloTalk',
      description: 'Language exchange app to chat with native Japanese speakers learning your language.',
      url: 'https://hellotalk.com',
      icon: 'message-circle'
    },
    {
      name: 'Clozemaster',
      description: 'Fill-in-the-blank sentences for vocabulary and grammar practice. Gamified learning.',
      url: 'https://clozemaster.com',
      icon: 'gamepad-2'
    }
  ],
  media: [
    {
      name: 'Netflix (Japan)',
      description: 'Japanese Netflix has tons of J-dramas and anime with Japanese subtitles.',
      url: 'https://netflix.com',
      icon: 'tv'
    },
    {
      name: 'AbemaTV',
      description: 'Free Japanese streaming service with live TV, dramas, and anime.',
      url: 'https://abema.tv',
      icon: 'smartphone'
    },
    {
      name: 'YouTube - Japanese Learning Channels',
      description: 'Follow channels like Japanese Ammo with Misa, ToKini Andy, and Comprehensible Japanese.',
      url: 'https://youtube.com',
      icon: 'play'
    }
  ],
  tools: [
    {
      name: 'Bunpro',
      description: 'Grammar SRS system organized by JLPT level. Connects grammar to example sentences.',
      url: 'https://bunpro.jp',
      icon: 'file-text'
    },
    {
      name: 'Migaku',
      description: 'Browser extension and Anki add-on for mining sentences from native content.',
      url: 'https://migaku.io',
      icon: 'wrench'
    },
    {
      name: 'Morphman',
      description: 'Anki add-on that automatically orders your cards for optimal learning.',
      url: 'https://massimmersionapproach.com/morphman',
      icon: 'settings'
    }
  ]
};

// =============================================================================
// KANJI STROKE RULES
// =============================================================================
export const KANJI_STROKE_RULES = {
  sections: [
    {
      title: { en: "The Three Principles of Kanji Strokes", my: "Tiga Prinsip Strok Kanji" },
      content: {
        en: "All kanji follow three fundamental rules that make writing consistent and readable. Mastering these will dramatically improve your handwriting and recognition skills.",
        my: "Semua kanji mengikut tiga peraturan asas yang menjadikan penulisan konsisten dan mudah dibaca. Menguasai ini akan meningkatkan tulisan dan kemahiran pengecaman anda dengan ketara."
      },
      rules: [
        {
          name: { en: "Top to Bottom", my: "Atas ke Bawah" },
          description: { en: "Horizontal strokes come before vertical strokes when they cross.", my: "Strok mendatar sebelum strok mencancang bila ia bersilang." },
          example: "十 (juu) - ten: horizontal first, then vertical"
        },
        {
          name: { en: "Left to Right", my: "Kiri ke Kanan" },
          description: { en: "When strokes are parallel and not connected, write left to right.", my: "Bila strok selari dan tidak bersambung, tulis dari kiri ke kanan." },
          example: "川 (kawa) - river: three vertical strokes left to right"
        },
        {
          name: { en: "Outside to Inside", my: "Luar ke Dalam" },
          description: { en: "The enclosing frame is drawn before the contents.", my: "Bingkai enclosing dilukis sebelum kandungan." },
          example: "日 (hi) - day: top, right, bottom, then left vertical last"
        }
      ]
    },
    {
      title: { en: "Common Stroke Patterns", my: "Corak Strok Biasa" },
      content: {
        en: "Certain stroke combinations appear repeatedly across many kanji. Recognizing these patterns makes learning new kanji much faster.",
        my: "Kombinasi strok tertentu muncul berulang kali dalam banyak kanji. Mengenali corak ini menjadikan pembelajaran kanji baru lebih cepat."
      },
      patterns: [
        { pattern: "一", meaning: { en: "one, horizontal", my: "satu, mendatar" } },
        { pattern: "丨", meaning: { en: "vertical line", my: "garis mencancang" } },
        { pattern: "丶", meaning: { en: "dot", my: "titik" } },
        { pattern: "ノ", meaning: { en: "slanting stroke", my: "strok condong" } },
        { pattern: "口", meaning: { en: "mouth shape", my: "bentuk mulut" } },
        { pattern: "亻", meaning: { en: "person radical", my: "radikal orang" } },
        { pattern: "氵", meaning: { en: "water radical", my: "radikal air" } },
        { pattern: "扌", meaning: { en: "hand radical", my: "radikal tangan" } }
      ]
    },
    {
      title: { en: "Stroke Direction Basics", my: "Asas Arah Strok" },
      content: {
        en: "Understanding stroke direction is essential for proper writing technique.",
        my: "Memahami arah strok adalah penting untuk teknik penulisan yang betul."
      },
      directions: [
        { num: 1, rule: { en: "Horizontal strokes go left to right", my: "Strok mendatar kiri ke kanan" } },
        { num: 2, rule: { en: "Vertical strokes go top to bottom", my: "Strok mencancang atas ke bawah" } },
        { num: 3, rule: { en: "Diagonal strokes go top to bottom", my: "Strok diagonal atas ke bawah" } },
        { num: 4, rule: { en: "The dot stroke usually goes top-left to bottom-right", my: "Strok titik biasanya kiri-atas ke kanan-bawah" } }
      ]
    }
  ]
};

// =============================================================================
// ANKI & VOCAB MINING
// =============================================================================
export const ANKI_CONTENT = {
  intro: {
    en: "Anki is a spaced repetition system (SRS) that helps you memorize anything efficiently. Combined with active vocab mining from native content, it's the most powerful combo for vocabulary acquisition.",
    my: "Anki adalah sistem repetisi Spaced (SRS) yang membantu anda menghafal apa-apa dengan cekap. Digabungkan dengan mining vocab aktif dari kandungan asli, ia adalah kombinasi paling power untuk pemerolehan vocabulary."
  },
  recommendedDecks: [
    {
      name: "Core 2K/6K Deck",
      description: { en: "The most common 2000-6000 Japanese words with sentence context. Essential vocabulary for any level.", my: "2000-6000 perkataan Jepun paling common dengan konteks ayat. Vocabulary penting untuk sebarang tahap." },
      url: "https://ankiweb.net/shared/decks/japanese",
      level: "N5-N3"
    },
    {
      name: "Kaishi 1.5K Deck",
      description: { en: "Curated 1500 most practical Japanese words, great for beginners moving beyond basics.", my: "1500 perkataan Jepun paling praktikal, bagus untuk pemula yang nak pergi lebih jauh." },
      url: "https://ankiweb.net/shared/decks/kaishi",
      level: "N5"
    }
  ],
  miningSection: {
    title: { en: "How to Mine Vocab from Anime & Dramas", my: "Cara Mining Vocab dari Anime & Drama" },
    intro: {
      en: "Vocab mining is the process of extracting new words from native content and turning them into Anki cards for study.",
      my: "Vocab mining adalah proses mengekstrak perkataan baru dari kandungan asli dan tukar kepada kad Anki untuk study."
    },
    steps: [
      {
        step: 1,
        title: { en: "Choose Your Content", my: "Pilih Kandungan Anda" },
        description: { en: "Start with material slightly below your level, then gradually increase difficulty. Anime with Japanese subtitles is ideal for beginners.", my: "Mula dengan bahan sedikit di bawah tahap anda, kemudian secara beransur-ansur naikkan kesukaran. Anime dengan sari kata Jepun adalah ideal untuk pemula." },
        tip: { en: "Make sure the sentence is natural and not overly complex. One new word per sentence is the golden rule.", my: "Pastikan ayat adalah natural dan tidak terlalu kompleks. Satu perkataan baru per ayat adalah peraturan emas." }
      },
      {
        step: 2,
        title: { en: "Extract the Sentence", my: "Ekstrak Ayat" },
        description: { en: "When you encounter an unknown word, capture the full sentence it's in. Context is crucial for both understanding and memory.", my: "Bila anda jumpa perkataan yang tidak dikenali, tangkap ayat penuh ia berada. Konteks adalah crucial untuk kedua-dua pemahaman dan memori." }
      },
      {
        step: 3,
        title: { en: "Add the Word Definition", my: "Tambah Definisi Perkataan" },
        description: { en: "Look up the word in a dictionary (Jisho.org is best for learners). Write the reading and at least one meaning.", my: "Cari perkataan dalam kamus (Jisho.org paling baik untuk pelajar). Tulis bacaan dan sekurang-kurangnya satu makna." }
      },
      {
        step: 4,
        title: { en: "Create Your Anki Card", my: "Cipta Kad Anki Anda" },
        description: { en: "Use a sentence-template style card: Front shows the sentence with the word highlighted, Back shows definition and translation.", my: "Guna style kad template ayat: Depan tunjuk ayat dengan perkataan dihighlight, Belakang tunjuk definisi dan terjemahan." },
        example: { front: "彼が遅刻した。", back: "遅刻 (chikoku) - to be late" }
      },
      {
        step: 5,
        title: { en: "Review Consistently", my: "Ulangkaji Konsisten" },
        description: { en: "Anki's spaced repetition will show you cards at optimal intervals. Do your reviews daily for best results.", my: "Sistem spaced repetition Anki akan tunjuk kad pada selang optimal. Buat ulangkaji harian untuk hasil terbaik." }
      }
    ],
    recommendedTools: [
      { name: "Migaku", description: { en: "Browser extension + Anki add-on for mining from any webpage or video", my: "Extension browser + add-on Anki untuk mining dari mana-mana webpage atau video" } },
      { name: "Morphman", description: { en: "Anki add-on that orders cards by difficulty for optimal learning", my: "Add-on Anki yang order kad mengikut kesukaran untuk pembelajaran optimal" } }
    ]
  }
};
