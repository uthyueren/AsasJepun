
// =============================================================================
// CULTURE LESSONS - Theme-based vocabulary and cultural context
// (Moved to Supabase database)
// =============================================================================
export const CULTURE_LESSONS = [];

// =============================================================================
// BLOG POSTS - Long-form articles
// (Moved to Supabase database)
// =============================================================================
export const BLOG_POSTS = [];

// =============================================================================
// RESOURCES - Curated tool list
// =============================================================================
export const RESOURCES = {
  dictionary: [
    {
      name: 'Jisho.org',
      description: 'The go-to free Japanese-English dictionary, searchable by word, kanji, or radical.',
      url: 'https://jisho.org',
      icon: 'book-open',
      logo: '/logos/jisho.webp'
    },
    {
      name: 'Takoboto',
      description: 'Offline-friendly dictionary app with example sentences, popular on Android.',
      url: 'https://takoboto.jp',
      icon: 'book',
      logo: '/logos/takoboto.webp'
    },
    {
      name: 'Weblio',
      description: 'Japanese-native dictionary aggregator pulling from multiple sources, great for advanced lookups.',
      url: 'https://www.weblio.jp',
      icon: 'book-marked',
      logo: '/logos/weblio.webp'
    }
  ],
  anki: [
    {
      name: 'Anki',
      description: 'The core spaced repetition flashcard software most immersion learners build their routine around.',
      url: 'https://ankiweb.net',
      icon: 'gamepad-2',
      logo: '/logos/anki.webp'
    },
    {
      name: 'Wani Kani',
      description: 'Structured SRS platform for learning kanji and vocab through mnemonics.',
      url: 'https://www.wanikani.com',
      icon: 'flame',
      logo: '/logos/wanikani.webp'
    },
    {
      name: 'Satori Reader',
      description: 'Graded reading platform with built-in audio and grammar notes alongside vocab review.',
      url: 'https://www.satorireader.com',
      icon: 'book-open',
      logo: '/logos/satori reader.webp'
    }
  ],
  learning: [
    {
      name: 'Tofugu',
      description: 'Japanese culture and language blog covering everything from grammar breakdowns to deep culture dives.',
      url: 'https://www.tofugu.com',
      icon: 'globe',
      logo: '/logos/tofugu.webp'
    },
    {
      name: 'Japanese with Anime',
      description: 'Learn vocabulary and grammar through real anime clips and phrases.',
      url: 'https://www.japanesewithanime.com',
      icon: 'bookmark',
      logo: '/logos/Japanese with Anime.webp'
    }
  ],
  mobileApps: [
    {
      name: 'LingoDeer',
      description: 'Structured lessons with clear grammar explanations, built specifically for learning Asian languages.',
      url: 'https://lingodeer.com',
      icon: 'smartphone',
      logo: '/logos/lingodeer.webp'
    },
    {
      name: 'Renshuu',
      description: 'All-in-one study app covering vocab, kanji, grammar, and JLPT prep with games and SRS.',
      url: 'https://renshuu.org',
      icon: 'gamepad-2',
      logo: '/logos/renshuu.webp'
    },
    {
      name: 'Memrise',
      description: 'Vocabulary-focused SRS app using spaced repetition and real native speaker video clips.',
      url: 'https://memrise.com',
      icon: 'brain',
      logo: '/logos/memrise.webp'
    },
    {
      name: 'Busuu',
      description: 'General language app with structured courses and feedback from native speakers.',
      url: 'https://www.busuu.com',
      icon: 'globe',
      logo: '/logos/busuu.webp'
    }
  ],
  reading: [
    {
      name: 'NHK News Web Easy',
      description: 'Simplified news articles with furigana, great for beginner-to-intermediate reading.',
      url: 'https://www3.nhk.or.jp/news/easy',
      icon: 'newspaper',
      logo: '/logos/nhk.webp'
    },
    {
      name: 'Satori Reader',
      description: 'Graded reading platform with built-in audio and grammar notes.',
      url: 'https://www.satorireader.com',
      icon: 'book-open',
      logo: '/logos/satori reader.webp'
    },
    {
      name: 'Tadoku',
      description: 'Free graded reader library built for extensive reading at an easy, comfortable level.',
      url: 'https://tadoku.org',
      icon: 'library',
      logo: '/logos/tadoku.webp'
    },
    {
      name: 'Todaii',
      description: 'Reading app that adjusts article difficulty automatically to match your level.',
      url: 'https://tadoku.org',
      icon: 'book',
      logo: '/logos/todaii.webp'
    }
  ],
  jlpt: [
    {
      name: 'Bunpro',
      description: 'Grammar-focused SRS app structured around JLPT levels, pairs well with Anki-based vocab study.',
      url: 'https://bunpro.jp',
      icon: 'file-text',
      logo: '/logos/bunpro.webp'
    },
    {
      name: 'JLPTSensei',
      description: 'Free JLPT study resource with grammar, vocab, and kanji lists organized by level.',
      url: 'https://jlptsensei.com',
      icon: 'book-open',
      logo: '/logos/jlptsensei.webp'
    }
  ],
  browserLookup: [
    {
      name: 'Yomitan',
      description: 'Pop-up dictionary extension that shows instant definitions when you hover or click any word on a webpage.',
      url: 'https://yomitan.org',
      icon: 'book-open',
      logo: '/logos/yomitan.webp'
    },
    {
      name: 'Migaku',
      description: 'All-in-one immersion toolkit for sentence mining, subtitles, and dictionary lookup across browser and mobile.',
      url: 'https://migaku.io',
      icon: 'wrench',
      logo: '/logos/migaku.webp'
    }
  ],
  browserSubtitle: [
    {
      name: 'Language Reactor',
      description: 'Popular extension for dual subtitles and instant word lookup on Netflix and YouTube.',
      url: 'https://www.languagereactor.com',
      icon: 'tv',
      logo: '/logos/language reactor.webp'
    },
    {
      name: 'Iago',
      description: 'Interactive subtitles on YouTube, Netflix, and Disney+; click a word to see its meaning and save it for review.',
      url: 'https://getiago.com',
      icon: 'tv',
      logo: '/logos/iago.webp'
    },
    {
      name: 'Metheus',
      description: 'Free, open-source immersion extension with dual subtitles, hover dictionary, and flashcard mining from streaming platforms.',
      url: 'https://metheus.app',
      icon: 'tv',
      logo: '/logos/metheus.webp'
    },
    {
      name: 'Japanese Subtitles Github',
      description: 'Curated collection of subtitle sources for anime, dramas, and films from the AJATT community.',
      url: 'https://gist.github.com/tatsumoto-ren/78ba4e5b7c53c7ed2c987015fa05cc2b',
      icon: 'tv',
      logo: '/logos/github.webp'
    }
  ],
  media: [
    {
      name: 'Netflix (Japan)',
      description: 'Native-level shows and movies, ideal for immersion when paired with a subtitle extension.',
      url: 'https://netflix.com',
      icon: 'tv',
      logo: '/logos/netflix.webp'
    },
    {
      name: 'AbemaTV',
      description: 'Free Japanese streaming platform with native TV, anime, and variety shows. (VPN required outside Japan)',
      url: 'https://abema.tv',
      icon: 'smartphone',
      logo: '/logos/abematv.webp'
    },
    {
      name: 'TVer',
      description: 'Free Japanese streaming service with dramas, anime, and variety shows available shortly after broadcast. (VPN required outside Japan)',
      url: 'https://tver.jp',
      logo: '/logos/tver.webp'
    }
  ],
  podcasts: [
    {
      name: 'YUYUの日本語Podcast',
      description: 'Long-running (500+ episodes) intermediate/advanced podcast where host Yuyu discusses everyday topics naturally in Japanese, no explanations given.',
      url: 'https://yuyujapanese.com',
      logo: '/logos/yuyu.webp'
    },
    {
      name: 'Okkei Japanese',
      description: 'Storytelling-style podcast with natural, unscripted Japanese about daily life in Japan; transcripts with furigana available on the website.',
      url: 'https://okkeijapanese.com',
      logo: '/logos/okkei.webp'
    },
    {
      name: 'Japanese with Shun',
      description: 'Slow, clear Japanese aimed at N5 learners, built around structured immersion lessons rather than native-speed conversation.',
      url: 'https://Japanesewithshun.com',
      logo: '/logos/japanesewithshun.webp'
    },
    {
      name: 'Miku Real Japanese',
      description: 'Focuses on natural, native-speed conversational Japanese, aimed at learners who understand grammar but struggle with real speech.',
      url: 'https://miku.edujoomlay.com',
      logo: '/logos/mikurealjapanese.webp'
    },
    {
      name: 'Nihongo con Teppei',
      description: 'Beginner-friendly, slow-paced, natural speech practice.',
      url: 'https://nihongoconteppei.com',
      logo: '/logos/nihongoconteppei.webp'
    },
    {
      name: 'JapanesePod101',
      description: 'Structured, level-based audio lessons.',
      url: 'https://www.japanesepod101.com',
      logo: '/logos/japanesepod101.webp'
    }
  ],
  youtubeLearning: [
    {
      name: 'Kaname Naito',
      description: 'A Japanese teacher who breaks down grammar clearly in English, popular for making difficult concepts easy to understand.',
      url: 'https://www.youtube.com/@KanameNaito',
      logo: '/logos/kaname naito.webp'
    },
    {
      name: 'That Japanese Man Yuta',
      description: 'Native speaker interviews and street-survey style videos giving real cultural and linguistic context, not a structured grammar channel.',
      url: 'https://www.youtube.com/@ThatJapaneseManYuta',
      logo: '/logos/that japanese man yuta.webp'
    },
    {
      name: 'Nihongo no Mori',
      description: 'Grammar-focused, especially strong for JLPT prep.',
      url: 'https://www.youtube.com/@nihongonomori',
      logo: '/logos/nihongo no mori.webp'
    },
    {
      name: 'Cure Dolly',
      description: 'Unconventional but well-regarded grammar explanations.',
      url: 'https://www.youtube.com/@JapaneseFromZero',
      logo: '/logos/cure dolly.webp'
    },
    {
      name: 'Japanese Ammo with Misa',
      description: 'Structured grammar and vocab lessons.',
      url: 'https://www.youtube.com/@JapaneseAmmo',
      logo: '/logos/japanese ammo with misa.webp'
    }
  ],
  youtubeImmersion: [
    {
      name: 'きまぐれクック Kimagure Cook',
      description: 'Native-speed cooking channel where the host preps seafood with casual narration and humor, good for natural listening practice.',
      url: 'https://www.youtube.com/@kimagurecook',
      logo: '/logos/きまぐれクック Kimagure Cook.webp'
    },
    {
      name: 'オダケン（ホラーゲーム絶叫者）',
      description: 'Horror game reaction channel with lots of unscripted, emotional native speech, useful for casual listening immersion.',
      url: 'https://www.youtube.com/@odaken',
      logo: '/logos/オダケン（ホラーゲーム絶叫者）.webp'
    },
    {
      name: 'Hukumusume',
      description: 'Traditional Japanese fairy tales and folk stories narrated by a native speaker, calm and simple but authentic language; good stepping stone before full native-speed content.',
      url: 'https://www.youtube.com/@hukumusume',
      logo: '/logos/Hukumusume.webp'
    },
    {
      name: 'あかね的日本語教室 (Akane\'s Japanese Classroom)',
      description: 'Native Japanese teacher\'s blend of lessons and vlogs, aimed at upper-intermediate to advanced learners wanting natural-speed content.',
      url: 'https://www.youtube.com/@akanebiyori',
      logo: '/logos/あかね的日本語教室.webp'
    },
    {
      name: 'ひよりの虫日記 (Hiyori\'s Bug Diary)',
      description: 'Actress and composer Hiyori Katada shares her passion for insects, filming and explaining bugs in nature with casual, enthusiastic narration; good for natural spoken Japanese around a specific hobby topic.',
      url: 'https://www.youtube.com/@hiyori8823',
      logo: '/logos/ひよりの虫日記.webp'
    },
    {
      name: 'AKBの素を出すちゃんねる',
      description: 'AKB48\'s official YouTube sub-channel, showing idol members in unscripted, casual settings beyond their usual stage persona; native variety-style content with natural group conversation.',
      url: 'https://www.youtube.com/@akb48show',
      logo: '/logos/AKBの素を出すちゃんねる.webp'
    },
    {
      name: '【素潜り漁師】マサル Masaru.',
      description: 'A free-diving fisherman who films himself spearfishing and diving for seafood along the Japanese coast, with casual native narration; similar vein to きまぐれクック but from the catching side rather than the cooking side.',
      url: 'https://www.youtube.com/@masaru.channel',
      logo: '/logos/【素潜り漁師】マサル Masaru.webp'
    }
  ],
  youtubePopular: [
    {
      name: 'Hikakin',
      description: 'One of Japan\'s most famous YouTubers, wide variety of content.',
      url: 'https://www.youtube.com/@Hikakin',
      logo: '/logos/Hikakin.webp'
    },
    {
      name: 'Kizuna AI',
      description: 'Pioneering VTuber, good for pop culture/internet Japanese.',
      url: 'https://www.youtube.com/@KizunaAI',
      logo: '/logos/Kizuna AI.webp'
    },
    {
      name: 'Hajime Shacho (はじめしゃちょー)',
      description: 'One of Japan\'s biggest YouTubers, known for challenges, experiments, and comedy vlogs at native speed.',
      url: 'https://www.youtube.com/@hajimesyacho',
      logo: '/logos/Hajime Shacho.webp'
    },
    {
      name: 'Fischer\'s',
      description: 'Popular Japanese YouTuber group known for pranks, challenges, and comedy content, widely watched by native audiences.',
      url: 'https://www.youtube.com/@fischers情趣',
      logo: '/logos/Fischer\'s.webp'
    }
  ],
  practice: [
    {
      name: 'iTalki',
      description: 'Book paid lessons or conversation sessions with native tutors.',
      url: 'https://italki.com',
      icon: 'graduation-cap',
      logo: '/logos/italki.webp'
    },
    {
      name: 'HelloTalk',
      description: 'Language exchange app connecting you with native speakers via text, voice, and video.',
      url: 'https://hellotalk.com',
      icon: 'message-circle',
      logo: '/logos/hellotalk.webp'
    },
    {
      name: 'Speechling',
      description: 'Free pronunciation coaching using native speaker audio feedback.',
      url: 'https://speechling.com',
      icon: 'mic',
      logo: '/logos/speechling.webp'
    },
    {
      name: 'Tandem',
      description: 'Language exchange app for finding native speaker conversation partners.',
      url: 'https://www.tandem.net',
      icon: 'users',
      logo: '/logos/tandem.webp'
    }
  ],
  pitchAccent: [
    {
      name: 'Japanese Pitch-Accent in 10 Minutes',
      description: 'Clear explanation of Japanese pitch accent fundamentals — how it works, why it matters, and how to practice it.',
      url: 'https://www.youtube.com/watch?v=O6AoilGEers',
      icon: 'headphones',
      logo: '/logos/Japanese Pitch-Accent in 10 Minutes.webp'
    },
    {
      name: 'Kotu Pitch Accent Practice',
      description: 'Audio perception training using minimal pairs to train your ear to hear Japanese pitch accent distinctions.',
      url: 'https://kotu.io/tests/ja/pitchAccent/perception/minimalPairs',
      icon: 'headphones',
      logo: '/logos/kotu.webp'
    }
  ],
  translator: [
    {
      name: 'DeepL',
      description: 'AI translator known for natural, nuanced sentence-level translations.',
      url: 'https://deepl.com',
      icon: 'languages',
      logo: '/logos/deepl.webp'
    },
    {
      name: 'MiraiTranslate',
      description: 'Japan-based translation engine noted for handling business terminology and honorifics more accurately than general-purpose translators.',
      url: 'https://miraitranslate.com',
      icon: 'languages',
      logo: '/logos/miraitranslate.webp'
    }
  ],
  discordServers: [
    {
      name: 'English-Japanese Language Exchange',
      description: 'A popular server connecting English and Japanese speakers for conversation practice.',
      url: 'https://discord.gg/japanese',
      icon: 'message-circle',
      logo: '/logos/English-Japanese Language Exchange.webp'
    },
    {
      name: 'MBF鯖 - マイクラ＆ゲーム雑談',
      description: 'Japanese server centered on Minecraft and gaming chat, great for casual immersion.',
      url: 'https://discord.gg/mbfqing-maikura-gemuza-tan-960062675012964352',
      icon: 'message-circle',
      logo: '/logos/mbf鯖---マイクラ-ゲーム雑談.webp'
    },
    {
      name: 'Japanese Language Study Space',
      description: 'Study-focused community for asking questions and practicing together.',
      url: 'https://discord.gg/jlss',
      icon: 'message-circle',
      logo: '/logos/jlss.webp'
    },
    {
      name: '毎日英語と日本語',
      description: 'Daily-practice server for mutual English-Japanese language exchange.',
      url: 'https://discord.gg/5av7Svzwuj',
      icon: 'message-circle',
      logo: '/logos/毎日英語と日本語.webp'
    }
  ],
  askQuestions: [
    {
      name: 'Japanese Stack Exchange',
      description: 'Q&A site for detailed grammar and linguistics questions with vetted answers.',
      url: 'https://japanese.stackexchange.com',
      icon: 'help-circle',
      logo: '/logos/Japanese Stack Exchange.webp'
    },
    {
      name: 'HiNative',
      description: 'Ask native speakers specific language or culture questions directly.',
      url: 'https://hinative.com',
      icon: 'message-circle',
      logo: '/logos/hinative.webp'
    },
    {
      name: 'Reddit r/LearnJapanese',
      description: 'Large community forum for resource recommendations and general discussion.',
      url: 'https://reddit.com/r/LearnJapanese',
      icon: 'users',
      logo: '/logos/Reddit LearnJapanese.webp'
    }
  ],
  articles: [
    {
      name: 'Refold',
      description: 'A structured immersion-learning roadmap and methodology guide, covering stages from beginner comprehension to advanced fluency through native content.',
      url: 'https://refold.la',
      logo: '/logos/refold.webp'
    },
    {
      name: 'Morg System',
      description: 'Personal knowledge site with immersion-method guides and the Yokubi grammar guide.',
      url: 'https://morg.system',
      icon: 'zap',
      logo: '/logos/morg.system.webp'
    },
    {
      name: 'Bret Mayer',
      description: 'Kanji-focused articles from the first non-Japanese person outside East Asia to pass the hardest level of the Kanji Kentei.',
      url: 'https://www.bretmayer.com',
      icon: 'user'
    },
    {
      name: 'Sakubi',
      description: 'A short, immersion-focused grammar guide covering the basics for beginners.',
      url: 'https://sakubi.neocities.org',
      icon: 'file-text',
      logo: '/logos/sakubi.webp'
    }
  ],
  otherResources: [
    {
      name: 'Refold List',
      description: 'Curated list of Japanese learning resources from the Refold community, covering tools, apps, media, and study guides.',
      url: 'https://docs.google.com/document/d/1tQmoGwCJQqmjdmaQdigAG0Ph1ODSMsGhsD7qOhlUuc0/edit?tab=t.0',
      icon: 'list'
    }
  ]
};

// =============================================================================
// KANJI STROKE RULES
// =============================================================================
export const KANJI_STROKE_RULES = {
  sections: [
    {
      title: { en: "Why Stroke Order Matters", my: "Mengapa Urutan Strok Penting" },
      content: {
        en: "While you might not need to write kanji by hand every day, knowing stroke order is still essential. Even if you memorize kanji through other methods, stroke order helps you write whenever needed. Japanese characters are easier to write when you use the right stroke order. Stroke order reflects the most efficient way of writing.",
        my: "Walau mungkin anda tak perlu menulis kanji dengan tangan setiap hari, mengetahui urutan strok masih penting. Juga kalau anda menghafal kanji melalui cara lain, urutan strok membantu anda menulis bila perlu. Aksara Jepun lebih mudah ditulis bila anda menggunakan urutan strok yang betul. Urutan strok mencerminkan cara paling cekap untuk menulis."
      },
      reasons: [
        {
          title: { en: "Characters Look Wrong Without Correct Order", my: "Aksara Nampak Salah Tanpa Urutan Yang Betul" },
          description: { en: "An experienced Japanese teacher can tell if you use the correct stroke order just by looking at your written work. The end result isn't the same if you write strokes in a different order, especially when writing faster and joining strokes together.", my: "Guru Jepun berpengalaman boleh tahu jika anda menggunakan urutan strok yang betul hanya dengan melihat tulisan anda. Hasil akhir tidak sama jika anda menulis strok dalam urutan berbeza, terutamanya bila menulis lebih laju dan menyambung strok." }
        },
        {
          title: { en: "Helps You Read Handwriting", my: "Membantu Anda Membaca Tulisan Tangan" },
          description: { en: "Learning to read other people's handwriting in Japanese is hard. Knowing stroke order helps you figure out which strokes are joined together when native speakers write quickly.", my: "Belajar membaca tulisan tangan orang lain dalam Jepun adalah susah. Mengetahui urutan strok membantu anda kenal pasti strok mana yang disambung bila orang asli menulis dengan laju." }
        },
        {
          title: { en: "Essential for Character Lookup", my: "Penting untuk Mencari Aksara" },
          description: { en: "The quickest way to look up an unknown character is handwriting recognition on your phone or computer. Stroke order is an important factor the system uses to identify what you wrote. Wrong stroke order often fails to match.", my: "Cara paling pantas untuk mencari aksara tidak dikenali adalah pengecaman tulisan tangan pada telefon atau komputer anda. Urutan strok adalah faktor penting yang digunakan sistem untuk mengenal pasti apa yang anda tulis. Urutan strok yang salah sering gagal dipadankan." }
        },
        {
          title: { en: "Muscle Memory is Key", my: "Memori Otot Adalah Kunci" },
          description: { en: "You want to write characters the same way every time because muscle memory matters. The more you write a character correctly, the more likely you will remember it without thinking. If you want to improve your penmanship, consistency is a must.", my: "Anda nak menulis aksara dengan cara yang sama setiap kali kerana memori otot penting. Lebih banyak anda menulis aksara dengan betul, lebih likely anda ingat tanpa fikir. Jika anda nak提高 penmanship anda, konsistensi adalah perlu." }
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
    },
    {
      title: { en: "The Three Principles of Kanji Strokes", my: "Tiga Prinsip Strok Kanji" },
      content: {
        en: "All kanji follow three fundamental rules that make writing consistent and readable. Mastering these will dramatically improve your handwriting and recognition skills.",
        my: "Semua kanji mengikut tiga peraturan asas yang menjadikan penulisan konsisten dan mudah dibaca. Menguasai ini akan meningkatkan tulisan dan kemahiran pengecaman anda dengan ketara."
      },
      rules: [
        {
          name: { en: "Horizontal to Vertical", my: "Mendatar ke Mencancang" },
          description: { en: "Horizontal strokes come before vertical strokes when they cross.", my: "Strok mendatar sebelum strok mencancang bila ia bersilang." },
          example: "十 (juu) - ten: horizontal first, then vertical",
          svg: `<div style="display: flex; gap: 16px; align-items: center; margin-top: 12px;">
            <img src="/references/十 stroke order.jpg" alt="十 stroke order" style="height: 120px; width: auto; border-radius: 8px;">
          </div>`
        },
        {
          name: { en: "Left to Right", my: "Kiri ke Kanan" },
          description: { en: "When strokes are parallel and not connected, write left to right.", my: "Bila strok selari dan tidak bersambung, tulis dari kiri ke kanan." },
          example: "川 (kawa) - river: three vertical strokes left to right",
          svg: `<div style="display: flex; gap: 16px; align-items: center; margin-top: 12px;">
            <img src="/references/川 stroke order.jpg" alt="川 stroke order" style="height: 120px; width: auto; border-radius: 8px;">
          </div>`
        },
        {
          name: { en: "Outside to Inside", my: "Luar ke Dalam" },
          description: { en: "The enclosing frame is drawn before the contents.", my: "Bingkai enclosing dilukis sebelum kandungan." },
          example: "国 (kuni) - country: outside box first, then inside contents",
          svg: `<div style="display: flex; gap: 16px; align-items: center; margin-top: 12px;">
            <img src="/references/国 stroke order.jpg" alt="国 stroke order" style="height: 120px; width: auto; border-radius: 8px;">
          </div>`
        }
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
      { name: "Yomitan + AnkiConnect", description: { en: "Yomitan is a browser popup dictionary. AnkiConnect bridges Yomitan and Anki, letting you send vocabulary cards directly to Anki with one click.", my: "Yomitan adalah popup kamus browser. AnkiConnect penghubung antara Yomitan dan Anki, benarkan hantar kad vocabulary ke Anki dengan satu klik." } },
      { name: "Language Reactor", description: { en: "Browser extension for Netflix, YouTube, and more. Shows dual subtitles and lets you mine vocabulary from videos easily.", my: "Extension browser untuk Netflix, YouTube, dan banyak lagi. Tunjuk dual subtitles dan benarkan korang mining vocabulary dari video dengan mudah." } }
    ]
  }
};
