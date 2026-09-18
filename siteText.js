// Internationalization (i18n) Module
// Languages: English (en), Bahasa Malaysia (my)

export const translations = {
  en: {
    // 1. Navigation
    nav: {
      intro: "Home",
      kana: "Hiragana & Katakana",
      kanjiRules: "Kanji",
      anki: "Anki & Vocab Mining",
      roadmap: "Learning Path",
      introduction: "Introduction",
      selfStudy: "Self Study Guide",
      blogCulture: "Blog & Culture",
      resources: "Resources",
      about: "About",
      jlptInfo: "What is JLPT?",
      kanaSubpage1: "Long Vowel",
      kanaSubpage2: "Tenten & Maru",
      kanaSubpage3: "Small Characters",
      immersion: "Comprehensible Input & Immersion",
      ai: "Using AI"
    },

    // 2. Footer
    footer: {
      tagline: "Learn Japanese the right way"
    },

    // 3. Homepage
    home: {
      heroTag: "Konnichiwa! こんにちは",
      heroTitle: "Your guide to learning Japanese the right way",
      heroSubtitle: "Everything you need to self-study Japanese effectively.",
      whyTitle: "How we help you",
      whyPoint1Title: "No more random YouTube spirals",
      whyPoint1Desc: "We give you a clear path. Follow the roadmap from zero to conversational, or jump to whatever level you're at.",
      whyPoint2Title: "Learn what necessary",
      whyPoint2Desc: "Guide and resources that actually help you learn, not just read.",
      whyPoint3Title: "Understand culture to understand the language",
      whyPoint3Desc: "Japanese makes more sense when you understand why things work that way. We teach through context  festivals, daily life, entertainment.",
      quickNavTitle: "Quick Links",
      quickNavSubtitle: "Pick a section and dive in",
      heroCtaStart: "Start with Introduction",
      heroCtaRoadmap: "View Learning Path",
      sectionIntroTitle: "Introduction to Japanese",
      sectionIntroDesc: "The essential first step - learn how Japanese writing works",
      sectionKanaTitle: "Hiragana & Katakana",
      sectionKanaDesc: "Learn the two Japanese syllabaries with interactive charts",
      sectionKanjiTitle: "Kanji",
      sectionKanjiDesc: "Master stroke order, radicals, and writing fundamentals",
      sectionSelfStudyTitle: "Self-Study Guide",
      sectionSelfStudyDesc: "How to learn Japanese effectively on your own",
      sectionResourcesTitle: "Resources",
      sectionResourcesDesc: "Curated tools: dictionaries, Anki decks, media players, and more",
      sectionAboutTitle: "About",
      sectionAboutDesc: "About AsasJepun and the creator behind it"
    },

    // 4. Roadmap
    roadmap: {
      title: "Japanese Language Learning Roadmap",
      intro: "A step-by-step guide to take you from zero to intermediate level (N3) and beyond. Click on each phase for details on learning focus.",
      disclaimer: "⚠️ These timelines are estimates assuming consistent daily study (1-2 hours). Your actual progress depends on consistency, not intensity.",
      goTo: "Go to section",
      phases: {
        phase1: "Phase 1",
        phase2: "Phase 2",
        phase3: "Phase 3",
        phase4: "Phase 4",
        phase5: "Phase 5",
        phase6: "Phase 6",
        phase7: "Phase 7",
        phase8: "Phase 8",
        phase9: "Phase 9"
      },
      kana: {
        title: "Kana (Japanese Characters)",
        desc: "Learn Hiragana and Katakana from scratch.",
        duration: "2 - 3 Weeks",
        activity: "Reading only",
        focusTitle: "Learning Focus:",
        items: [
          "Hiragana and Katakana (reading, not writing yet)",
          "Dakuon, Handakuon, Yoon sounds",
          "Reading simple words and phrases"
        ]
      },
      basic: {
        title: "Basic Phrases + Particles + Sentence Building",
        desc: "Build your first sentences and understand how Japanese works.",
        duration: "1 - 2 Months",
        activity: "Speaking & Writing",
        focusTitle: "Learning Focus:",
        items: [
          "Daily essential phrases (greetings, self-intro, shopping, directions)",
          "Basic particles: は, が, を, に, で, と, から, まで",
          "Build your first sentence: Subject は Object を Verb",
          "Te-form as gateway to conversation"
        ]
      },
      n5: {
        title: "N5 Grammar + Vocab + Basic Kanji",
        desc: "Start formal grammar and learn your first Kanji.",
        duration: "1 - 2 Months",
        activity: "~100 Kanji | ~800 Vocab",
        focusTitle: "Learning Focus:",
        items: [
          "Existence (いる/ある), possession, past tense",
          "Basic Keigo (polite language)",
          "~100 N5 Kanji (numbers, days, time, directions)",
          "~800 essential vocab"
        ]
      },
      n5mastery: {
        title: "N5 Mastery + Habits + Immersion",
        desc: "Master N5, build study habits, and start immersing.",
        duration: "2 - 3 Months",
        activity: "~250 Kanji | ~1,500 Vocab",
        focusTitle: "Learning Focus:",
        items: [
          "All N5 grammar patterns",
          "~150 additional Kanji (身体, 食べる, 行く, etc.)",
          "SRS setup (Anki)",
          "Daily immersion: what to watch, read, listen to"
        ]
      },
      n4bridge: {
        title: "N4 Grammar + Vocab",
        desc: "Build on N5 foundation with intermediate grammar and vocabulary.",
        duration: "3 - 4 Months",
        activity: "~300 Kanji | ~3,000 Vocab",
        focusTitle: "Learning Focus:",
        items: [
          "Conditionals (たら, なら, ば)",
          "Causative + causative-passive",
          "Casual vs polite speech register",
          "~3,000 vocab total"
        ]
      },
      n3: {
        title: "N3 Grammar + Kanji + Comprehension",
        desc: "Japanese becomes more natural and you understand more.",
        duration: "6 - 8 Months",
        activity: "~400 Kanji | ~3,000 Vocab",
        focusTitle: "Learning Focus:",
        items: [
          "Passive, causative-passive, potential forms",
          "Keigo refinement",
          "~400 Kanji total",
          "Native content with subtitles, listen to natural speech"
        ]
      },
      n2prep: {
        title: "N2 Prep + Sustained Immersion",
        desc: "Pipeline to N2 with immersion as lifestyle.",
        duration: "Ongoing",
        activity: "Complex Keigo | Advanced Structures",
        focusTitle: "Learning Focus:",
        items: [
          "Complex keigo and advanced sentence structures",
          "Reading unformatted text (novels, articles)",
          "Immersion as lifestyle",
          "N2 prep and practice"
        ]
      },
      n1: {
        title: "Consistent Routine + N1 Prep",
        desc: "Master near-native level Japanese with business keigo and complex structures.",
        duration: "8 - 12 Months",
        activity: "~1,000 Kanji | ~5,000 Vocab",
        focusTitle: "Learning Focus:",
        items: [
          "Business keigo and formal expressions",
          "Complex sentence structures (倒置法, 強調, etc.)",
          "~1,000 kanji total",
          "Native-level reading and listening"
        ]
      },
      continues: {
        title: "Learning Continues",
        desc: "Beyond structured levels. Native content, advanced reading, speaking practice.",
        duration: "A Lifetime",
        activity: "Journey never really ends",
        focusTitle: "Learning Focus:",
        items: [
          "Native content you actually enjoy",
          "Advanced reading and speaking",
          "Fluency beyond textbook levels",
          "The journey never really ends"
        ]
      }
    },

    // 5. Introduction Page
    introduction: {
      title: "Introduction to Japanese",
      subtitle: "Your first step to understanding the Japanese language",
      welcomeTitle: "What is Japanese?",
      welcomeDesc: "Japanese is a language spoken by about 130 million people in Japan and Japanese communities worldwide. It belongs to the Japonic language family, which has no widely accepted genealogical relationship to any other language family.",
      writingTitle: "The Writing System",
      writingDesc: "Japanese uses three writing systems combined:",
      writingPoint1: "Hiragana - Used for native Japanese words and grammatical elements",
      writingPoint2: "Katakana - Used for foreign words, emphasis, and onomatopoeia",
      writingPoint3: "Kanji - Chinese characters adopted for Japanese, used for nouns and verb roots",
      writingHiragana: "Hiragana",
      writingHiraganaDesc: "Native words (e.g., あめ = rain)",
      writingKatakana: "Katakana",
      writingKatakanaDesc: "Foreign words (e.g., テレビ = TV)",
      writingKanji: "Kanji",
      writingKanjiDesc: "Day / Sun (e.g., 日本 = Japan)",
      structureTitle: "Language Structure",
      structureDesc: "Japanese has a fundamentally different structure from English:",
      structureEnglish: "English",
      structureSVO: "SVO - Subject -> Verb -> Object",
      structureJapanese: "Japanese",
      structureSOV: "SOV - Subject -> Object -> Verb",
      structureI: "I",
      structureEat: "eat",
      structureRice: "rice",
      structureIEatRice: "I eat rice",
      structureWatashi: "Watashi",
      structureGohan: "gohan",
      structureTabemasu: "tabemasu",
      structureWatashiSentence: "Watashi wa gohan wo tabemasu",
      structureNoSpaces: "No spaces between words",
      structureNoSpacesExample: "私はご飯を食べます (I eat rice)",
      structureKeigo: "Politeness Levels (Keigo)",
      structureCasualPolite: "Casual → Polite → Formal",
      soundTitle: "Sound System",
      soundDesc: "Japanese has a relatively simple phonological system:",
      soundPoint2: "No consonant clusters (e.g., \"st\", \"tr\", \"gl\")",
      soundPoint4: "Pitch accent instead of stress accent (differs by dialect)",
      moraTitle: "The Mora: Japanese Timing",
      moraIntro: "Japanese is not counted in syllables. It is counted in morae (拍 / ha-ku). Each mora is a single, evenly-timed beat. The whole rhythm of the language is built by giving every mora the same short duration.",
      moraIntro2: "Getting the mora count right, and giving each beat equal length, is what separates a natural learner from one who is understood only with effort.",
      moraTomodachi: "ともだち (friend)",
      moraOne: "1 mora",
      morae: "morae",
      moraListen: "Listen to this word",
      moraEqualTime: "Notice each syllable takes equal time",
      moraBasicKana: "Each basic kana = 1 mora",
      moraNekoSakura: "ねこ (ne-ko) = 2 morae, さくら (sa-ku-ra) = 3 morae",
      moraN: "ん = 1 mora",
      moraNasal: "The nasal sound at the end (e.g., にほん = ni-ho-n = 3 morae)",
      soundRule1: "Only 5 vowel sounds (a, i, u, e, o)",
      soundRule2: "No consonant clusters (e.g., \"st\", \"tr\", \"gl\")",
      soundRule3: "Simple syllable structure (almost always consonant + vowel)",
      soundRule4: "Pitch accent instead of stress accent (differs by dialect)",
      consonantClusters: "Every Japanese syllable always ends with a vowel or ん (n). No consonant clusters allowed. That means no \"st\", \"tr\", \"gl\" sounds. Instead, you break them into separate syllables. For example: \"stop\" becomes \"su-to-ppu\", \"train\" becomes \"to-re-i-n\".",
      pitchAccentDesc: "The same word can have different meanings depending on which syllable has the high pitch. The pitch accent differs between Tokyo, Kansai, and other dialects. It is best to learn this early. Unlearning wrong pronunciation habits later is much harder than building good ones from the start.",
      pitchChopsticks: "chopsticks",
      pitchBridge: "bridge",
      tipTitle: "Learning Tip",
      tipDesc: "Don't try to translate word-for-word from English. Instead, try to understand concepts and patterns in their Japanese context.",
      ctaRoadmap: "Learn Hiragana & Katakana"
    },

    // 6. Kana (Hiragana & Katakana)
    kana: {
      title: "Kana Charts",
      subtitle: "Interactive Hiragana & Katakana reference with audio pronunciation",
      hiragana: "Hiragana",
      katakana: "Katakana",
      clickToLearn: "Click any character to hear its pronunciation",

      // Long Vowel (subpage1)
      subpage1Title: "Long Vowel",
      subpage1Subtitle: "Learn how to extend vowel sounds (chōon / 長音)",
      subpage1: {
        whatIsTitle: "What is Long Vowel?",
        whatIsDesc: "Long vowels (長音 / chōon) are extended vowel sounds where a vowel is held for two morae instead of one. In Japanese, changing a vowel length can completely change the meaning of a word, so it's important to master this early.",
        hiraganaTitle: "Writing Long Vowel in Hiragana",
        katakanaTitle: "Writing Long Vowel in Katakana",
        katakanaDesc: "Katakana uses a straight horizontal line called the long vowel mark (長音符 / chōonpu / ー) instead of adding extra letters. This line extends the vowel sound of the character before it.",
        aRow: "A-row sounds (あ段)",
        aRowRule: "Add an extra あ (a)",
        iRow: "I-row sounds (い段)",
        iRowRule: "Add an extra い (i)",
        uRow: "U-row sounds (う段)",
        uRowRule: "Add an extra う (u)",
        eRow: "E-row sounds (え段)",
        eRowRule: "Usually add い (i)",
        oRow: "O-row sounds (お段)",
        oRowRule: "Usually add う (u)",
        exOkaasan: "mother",
        exOniisan: "older brother",
        exKuuki: "air",
        exSeito: "student",
        exTokei: "clock",
        exOokami: "wolf",
        exKi: "From キ (ki) + ー",
        exKiWord: "key",
        exKu: "From ク (ku) + ー",
        exKuWord: "air",
        exShiito: "From キ (ki) + ー + パ (pa) + ー",
        exShiitoWord: "keeper",
        exTerebi: "From テ (te) + レ (re) + ビ (bi)",
        exTerebiWord: "television"
      },

      // Tenten & Maru (subpage2)
      subpage2Title: "Tenten & Maru",
      subpage2Subtitle: "Understand dakuten (濁点) and handakuten (半濁点)",
      subpage2: {
        whatIsTitle: "What are Tenten and Maru?",
        whatIsDesc: "Tenten (also known as Dakuten) and Maru (also known as Handakuten) are marks that can change the pronunciation of kana characters. Tenten are the two small dashes (゛) placed at the top-right of a kana character and Maru is a small circle (゜) placed at the top-right of a kana character. Both change the sound of consonants.",
        dakutenTitle: "Dakuten (゛)",
        dakutenDesc: "Tenten changes the か (ka) row into が (ga), the さ (sa) row into ざ (za), the た (ta) row into だ (da), and the は (ha) row into ば (ba).",
        handakutenTitle: "Maru (゜)",
        handakutenDesc: "Maru changes the は (ha) row into ぱ (pa) row.",
        memoryTrickTitle: "Quick Reference",
        memoryTrickDesc: "Pronunciation stays the same with tenten: じ and ぢ both sound like \"ji\", ず and づ both sound like \"zu\". The spelling is different, but they sound identical.",
        chartTitle: "Dakuten & Handakuten Chart",
        columnBase: "Base",
        columnVoiced: "Voiced",
        columnSemi: "Semi-voiced",
        exceptionsTitle: "Exceptions to Remember"
      },

      // Small Characters (subpage3)
      subpage3Title: "Small Characters",
      subpage3Subtitle: "Learn small kana (ァ, ィ, ォ, っ, ゃ, ゅ, ょ) that modify sounds",
      subpage3: {
        sokuonTitle: "Sokuon (っ) - Consonant Doubling",
        sokuonDetail: "Sokuon (促音) is the small っ (or ッ in katakana) that creates a brief pause or \"double consonant\" sound. っ counts as 1 full mora even though it has no sound — it just adds a short stop before the next consonant.",
        yoonTitle: "Youon (ゃ, ゅ, ょ)",
        yoonSmallTitle: "Youon (ゃ, ゅ, ょ)",
        yoonDesc: "Youon (拗音) refers to the combination sounds made when a small ゃ, ゅ, or ょ follows an い-row kana (き, し, ち, に, ひ, み, り, ぎ, じ, び, ぴ) to form a single new sound. The regular kana + small ゃ/ゅ/ょ blend into one sound and you don't pronounce them separately."
      },

      // Small Kana
      smallKana: {
        title: "Small Kana",
        subtitle: "Small kana for foreign sounds",
        desc: "Katakana uses small characters (ァ, ォ, etc.) to write foreign words. These combinations create sounds not found in traditional Japanese. The small vowel versions technically exist in hiragana too and occasionally show up for stylized or emphasis effects, like an elongated exclamation.",
        examplesTitle: "Common Examples",
        examples: [
          { kana: "ヴァ", romaji: "va", used: "ヴァルキリー (Valkyrie)" },
          { kana: "ヴィ", romaji: "vi", used: "ヴィジュアル (visual)" },
          { kana: "ヴェ", romaji: "ve", used: "ヴェスト (vest)" },
          { kana: "ヴォ", romaji: "vo", used: "ヴォイス (voice)" },
          { kana: "ウィ", romaji: "wi", used: "ウィスキー (whisky)" },
          { kana: "ウェ", romaji: "we", used: "ウェディング (wedding)" },
          { kana: "ウォ", romaji: "wo", used: "ワーク (work)" },
          { kana: "ティ", romaji: "ti", used: "ティッシュ (tissue)" },
          { kana: "ディ", romaji: "di", used: "ディズニー (Disney)" },
          { kana: "ドゥ", romaji: "du", used: "ドゥーム (doom)" },
          { kana: "チェ", romaji: "che", used: "チェック (check)" },
          { kana: "ジェ", romaji: "je", used: "ジェット (jet)" },
          { kana: "シェ", romaji: "she", used: "シェイク (shake)" },
          { kana: "ツァ", romaji: "tsa", used: "モーツァルト (Mozart)" },
          { kana: "ファ", romaji: "fa", used: "ファミリー (family)" },
          { kana: "フィ", romaji: "fi", used: "フィルター (filter)" },
          { kana: "フェ", romaji: "fe", used: "フェンス (fence)" },
          { kana: "フォ", romaji: "fo", used: "フォルダー (folder)" },
        ],
        smallHiraganaTitle: "Small Hiragana (っ)",
        smallHiraganaDesc: "The small っ (tsu) doubles the following consonant.  돌아 → もっと (motto), not とも (tomo)"
      }
    },

    // 7. Kanji Rules
    kanjiRules: {
      title: "Kanji",
      subtitle: "Understand what kanji is and how it works",
      subpage1Title: "Stroke Order",
      subpage1Subtitle: "Learn the correct way to write kanji",
      subpage2Title: "Radical",
      subpage2Subtitle: "Learn about kanji radicals and their meanings",
      subpage3Title: "Kanji in Names"
    },

    // 8. Self Study Guide
    selfStudy: {
      title: "Self Study Guide",
      subtitle: "Tips and strategies for effective Japanese self-learning",
      overview: {
        title: "Why Self Study?",
        points: [
          "<strong>Formal classes</strong> for N2 and N1 are rarely available outside major cities, making <strong>self-study essential</strong> for advanced learners.",
          "<strong>Self-study</strong> allows you to learn at your own pace, focus on what interests you most, and <strong>immerse yourself</strong> in Japanese culture through media you enjoy.",
          "Many learners find that <strong>combining self-study</strong> with occasional classes or tutoring sessions yields the best results."
        ]
      },
      principles: {
        title: "Core Principles",
        consistency: {
          title: "Be Consistent",
          desc: "Even 15-30 minutes of daily study is more effective than long irregular sessions. Build the habit first."
        },
        input: {
          title: "Prioritize Input",
          desc: "Read and listen to native content as much as possible. Understanding comes from massive exposure."
        },
        active: {
          title: "Stay Active",
          desc: "Don't just passively read or watch. Take notes, make flashcards, and use new vocabulary in sentences."
        },
        patience: {
          title: "Be Patient",
          desc: "Language acquisition takes time. Trust the process and don't compare yourself to others."
        }
      },
      dailyRoutine: {
        title: "Suggested Daily Routine",
        morning: {
          title: "Morning (15-20 min)",
          desc: "Review flashcards (Anki) and study new grammar or vocabulary."
        },
        afternoon: {
          title: "Afternoon (20-30 min)",
          desc: "Read Japanese content  manga, news, or light novels suited to your level."
        },
        evening: {
          title: "Evening (15-30 min)",
          desc: "Watch or listen to Japanese media  anime, dramas, podcasts, or YouTube."
        }
      },
      resources: {
        title: "Recommended Resources by Level",
        beginner: {
          title: "Beginner (N5)",
          items: [
            "Genki I & II textbooks",
            "Anki N5 vocabulary deck",
            "Cure Dolly's Japanese YouTube channel",
            "Japanese Ammo with Misa"
          ]
        },
        intermediate: {
          title: "Intermediate (N4-N3)",
          items: [
            "Tobira or Shin Nihongo textbooks",
            "Native manga and novels",
            "Comprehensible Japanese YouTube",
            "Japanese podcasts for learners"
          ]
        },
        advanced: {
          title: "Advanced (N2-N1)",
          items: [
            "Native media without subtitles",
            "Japanese news (NHK Easy)",
            "Advanced grammar books",
            "Shadowing practice"
          ]
        }
      },
      tips: {
        title: "Pro Tips",
        mining: "Mine vocabulary from content you enjoy  it makes learning feel less like studying.",
        shadowing: "Practice shadowing (repeat after speakers) to improve pronunciation and speaking flow.",
        writing: "Keep a Japanese diary using a notes app on your phone. Even simple sentences help reinforce what you've learned.",
        thinking: "Try to think in Japanese during your daily life. Describe objects around you in your head."
      }
    },

    // 9. Anki & Vocab Mining
    anki: {
      title: "Anki & Vocab Mining",
      subtitle: "Recommended decks and how to mine vocabulary from native content",
      howItWorks: "How Anki Works",
      howItWorksDesc: "Anki is a spaced repetition system that helps you memorize anything efficiently. It works by showing you cards at increasing intervals just before you'd forget them. New cards appear once a day, and reviews are based on how well you remember each card. The more you struggle with a card, the more often it appears. This method, called spaced repetition, is proven to build long-term memory much faster than cramming.",
      recommendedDecks: "Recommended Decks",
      howToMine: "How to Mine Vocab",
      visit: "Visit"
    },

    // 10. Comprehensible Input & Immersion
    immersion: {
      title: "Comprehensible Input & Immersion",
    },

    // 11. Using AI
    selfStudyAI: {
      title: "Using AI for Japanese Learning",
    },

    // 12. Resources
    resources: {
      title: "Resources",
      subtitle: "Curated tools organized by what problem they solve.",
      categories: {
        dictionary: "Dictionaries",
        anki: "Flashcards",
        learning: "Learning Websites",
        mobileApps: "Mobile Apps",
        reading: "Reading",
        jlpt: "JLPT Preparation",
        browserLookup: "Browser Extensions (Lookup)",
        browserSubtitle: "Subtitle (Browser Extension)",
        media: "Streaming",
        podcasts: "Podcasts",
        youtubeLearning: "YT for Learning Japanese",
        youtubeImmersion: "YT for Immersion",
        youtubePopular: "YT Popular Channels",
        practice: "Speaking Practice",
        pitchAccent: "Pitch Accent",
        translator: "Translator",
        discordServers: "Discord Servers",
        askQuestions: "Ask Questions",
        articles: "Japanese Articles",
        otherResources: "Other Resources"
      },
      descriptions: {
        // Dictionary
        "Jisho.org": "Free Japanese-English dictionary. Search by word, kanji, or radical.",
        "Takoboto": "Offline-friendly dictionary app with sentence examples, popular on Android.",
        "Weblio": "Japanese-language dictionary aggregator pulling from multiple sources, great for advanced searches.",
        // Anki
        "Anki": "Spaced repetition flashcard software that CORE immersion learners build their routine around.",
        "Wani Kani": "Structured SRS platform for learning kanji and vocab through mnemonics.",
        "Satori Reader": "Graded reading platform with built-in audio and grammar notes alongside vocab review.",
        // Learning
        "Tofugu": "Japanese culture and language blog covering everything from grammar breakdowns to deep cultural dives.",
        "Japanese with Anime": "Learn vocabulary and grammar through actual anime clips and phrases.",
        // Mobile Apps
        "LingoDeer": "Structured lessons with clear grammar explanations, built specifically for Asian language learners.",
        "Renshuu": "All-in-one study app covering vocab, kanji, grammar, and JLPT prep with games and SRS.",
        "Memrise": "Vocabulary SRS app using spaced repetition and native speaker video clips.",
        "Busuu": "General language app with structured courses and native speaker feedback.",
        // Reading
        "NHK News Web Easy": "News articles simplified with furigana, good for beginner to intermediate reading.",
        "Tadoku": "Free graded library built for extensive reading at easy, comfortable levels.",
        "Todaii": "Reading app that adapts article difficulty automatically to match your level.",
        // JLPT
        "Bunpro": "Grammar-focused SRS app structured around JLPT levels, pairs well with Anki vocab study.",
        "JLPTSensei": "Free JLPT study resource with grammar, vocab, and kanji lists organized by level.",
        // Browser
        "Yomitan": "Pop-up dictionary extension showing definitions immediately when you hover or click any word.",
        "Migaku": "All-in-one immersion toolkit for sentence mining, subtitles, and dictionary lookups across browser and mobile.",
        "Language Reactor": "Popular extension for dual subtitles and instant word lookup on Netflix and YouTube.",
        "Iago": "Interactive subtitles on YouTube, Netflix, and Disney+; click any word to see meaning and save for review.",
        "Methus": "Free, open-source immersion extension with dual subtitles, hover dictionary, and flashcard mining from streaming platforms.",
        "Japanese Subtitles Github": "Community-curated subtitle collection for anime, dramas, and films from the AJATT community.",
        // Media
        "Netflix (Japan)": "Native-level shows and films, ideal for immersion when paired with subtitle extensions.",
        "AbemaTV": "Free Japanese streaming platform with native TV, anime, and variety shows. (VPN required outside Japan)",
        "TVer": "Free Japanese streaming service with drama, anime, and variety shows available shortly after broadcast.",
        // Podcasts
        "YUYUの日本語Podcast": "Long-running (500+ episodes) intermediate/advanced podcast where host Yuyu discusses daily topics in natural Japanese.",
        "Okkei Japanese": "Storytelling-style podcast with unscripted, natural Japanese about daily life in Japan.",
        "Japanese with Shun": "Slow, clear Japanese intended for N5 learners, built around structured immersion study.",
        "Miku Real Japanese": "Focused on natural, native-speed Japanese speech, intended for students who understand grammar but struggle with actual speech.",
        "Nihongo con Teppei": "Beginner-friendly, natural, slow, and enthusiastic speech.",
        "JapanesePod101": "Structured audio lessons based on level.",
        // YouTube Learning
        "Kaname Naito": "Japanese teacher who breaks down grammar clearly in English, popular for making hard concepts easy.",
        "That Japanese Man Yuta": "Native speaker interviews and street survey style videos giving real cultural and linguistic context.",
        "Nihongo no Mori": "Grammar-focused, especially strong for JLPT prep.",
        "Cure Dolly": "Unconventional but respected grammar explanations.",
        "Japanese Ammo with Misa": "Structured grammar and vocabulary lessons.",
        // YouTube Immersion
        "きまぐれクック Kimagure Cook": "Native-speed cooking channel where host prepares seafood with casual narration and humor, great for natural listening practice.",
        "オダケン（ホラーゲーム絶叫者）": "Horror game reaction channel with lots of unscripted, emotional native speech, useful for casual listening immersion.",
        "Hukumusume": "Japanese folk and traditional stories narrated by native speakers, calm and simple but authentic.",
        "あかね的日本語教室 (Akane's Japanese Classroom)": "Mix of lessons and vlogs from a native Japanese teacher, aimed at upper-intermediate to advanced learners.",
        "ひよりの虫日記 (Hiyori's Bug Diary)": "Actress and composer Hiyori Katada shares her passion for insects, filming and explaining bug nature with casual, enthusiastic narration.",
        "AKBの素を出すちゃんねる": "Official AKB48 YouTube sub-channel showing idols in unscripted, casual settings.",
        "【素潜り漁師】マサル Masaru.": "Freediving fisherman filming himself diving and gathering seafood along Japanese coasts, with casual native narration.",
        // YouTube Popular
        "Hikakin": "One of the most famous YouTubers in Japan, diverse content.",
        "Kizuna AI": "Pioneering VTuber, great for Japanese pop/Internet culture.",
        "Hajime Shacho (はじめしゃちょー)": "One of the biggest YouTubers in Japan, known for challenges, experiments, and comedy vlogs.",
        "Fischer's": "Popular Japanese YouTuber group known for pranks, challenges, and comedy content.",
        // Practice
        "iTalki": "Book paid lessons or conversation sessions with native tutors.",
        "HelloTalk": "Language exchange app connecting you with native speakers through text, voice, and video.",
        "Speechling": "Free pronunciation coaching using native speaker audio feedback.",
        "Tandem": "Language exchange app for finding native speaker conversation partners.",
        // Pitch Accent
        "Japanese Pitch-Accent in 10 Minutes": "Clear explanation of the basics of Japanese pitch accent.",
        "Kotu Pitch Accent Practice": "Audio perception practice using minimal pairs to train your ear to identify pitch accent differences.",
        // Translator
        "DeepL": "AI translator known for natural, nuanced sentence translations.",
        "MiraiTranslate": "Japanese-based translation engine known for handling business terminology and honorifics more accurately.",
        // Discord
        "English-Japanese Language Exchange": "Popular server connecting English and Japanese speakers for conversation practice.",
        "MBF鯖 - マイクラ＆ゲーム雑談": "Japanese server centered on Minecraft and gaming chat, good for casual immersion.",
        "Japanese Language Study Space": "Study-focused community for asking questions and practicing together.",
        "毎日英語と日本語": "Daily practice server for mutual English-Japanese exchange."
      }
    },

    // 13. Blog & Culture
    blogCulture: {
      title: "Blog & Culture",
      subtitle: "Articles, lessons, and long-form content on Japanese learning and culture.",
      blog: "Blog",
      culture: "Culture"
    },

    culture: {
      title: "Culture & Vocabulary",
      subtitle: "Learn Japanese through cultural context  from vtubers to seasonal festivals.",
      themes: {
        entertainment: "Entertainment",
        food: "Food & Drink",
        seasonal: "Seasonal",
        daily: "Daily Life",
        social: "Social Life"
      },
    },

    blog: {
      title: "Blog",
      minRead: "min read"
    },

    // 14. About
    about: {
      title: "About Me",
      subtitle: "The method that actually works, from someone who tried them all.",
      storyContent: "Hi, I'm <strong>Uthman</strong>, fellow Japanese learner! I know exactly how frustrating learning Japanese can be when kanji looks like squiggles, grammar doesn't make sense, and nothing stays in your head.<br><br>I started learning Japanese in 2018 but <strong>quit</strong> after a few months. Kanji looked terrifying, and I couldn't see how any of it would stick. After a long break, I decided to <strong>push through anyway</strong>  and it wasn't as bad as I expected.<br><br>Since 2021, I've been learning off and on since I'm quite busy with university, but things didn't really come together until <strong>mid 2025</strong>. I started consuming Japanese content <strong>every single day</strong>  whether it was Hololive streams, J-dramas, whatever kept me in the language. My comprehension improved a lot using flashcards with SRS (Spaced Repetition System).<br><br>If you're serious about learning, <strong>join my class</strong> and let's do this together.",
      connectTitle: "Connect",
    },

    // JLPT Info
    jlptInfo: {
      title: "What is JLPT?",
      subtitle: "Understanding the Japanese-Language Proficiency Test",
      whatIs: {
        title: "About JLPT",
        description: "The Japanese-Language Proficiency Test (JLPT) is a standardized criterion-referenced test to evaluate and certify the proficiency of non-native Japanese speakers. It is administered by the Japan Foundation and Japan Educational Exchanges and Evaluation Services (JEES). The test is held twice a year in Japan and selected countries, and once a year in other regions."
      },
      levels: {
        title: "JLPT Levels Explained",
        beginner: "- Beginner",
        elementary: "- Elementary",
        intermediate: "- Intermediate",
        upperIntermediate: "- Upper Intermediate",
        advanced: "- Advanced",
        n5Desc: "The most basic level of Japanese language proficiency. Tests knowledge of basic Japanese characters (hiragana and katakana) and everyday vocabulary.",
        n5Kanji: "About 100 kanji",
        n5Vocab: "About 800 vocabulary words",
        n4Desc: "Elementary level, building on N5 knowledge. Tests ability to understand basic Japanese.",
        n4Kanji: "About 300 kanji",
        n4Vocab: "About 1,500 vocabulary words",
        n3Desc: "Intermediate level. Tests ability to understand Japanese used in everyday situations to some extent.",
        n3Kanji: "About 400 kanji",
        n3Vocab: "About 3,000 vocabulary words",
        n2Desc: "Upper-intermediate level. Tests ability to understand Japanese used in everyday situations and more complex contexts.",
        n2Kanji: "About 650 kanji",
        n2Vocab: "About 6,000 vocabulary words",
        n1Desc: "Advanced level. Tests ability to understand Japanese used in a wide range of academic and formal contexts.",
        n1Kanji: "About 2,000 kanji",
        n1Vocab: "About 10,000 vocabulary words"
      },
      format: {
        title: "Test Format",
        descriptionN5N3: "N5-N3 consists of three sections:",
        descriptionN2N1: "N2-N1 consists of two sections:",
        vocabulary: "Vocabulary",
        vocabularyDesc: "Tests knowledge of Japanese vocabulary and correct usage of Japanese words in sentences.",
        grammarReading: "Grammar & Reading",
        grammarReadingDesc: "Tests knowledge of Japanese grammatical structures and reading comprehension.",
        reading: "Reading Comprehension",
        readingDesc: "Tests the ability to understand written materials from various contexts.",
        listening: "Listening",
        listeningDesc: "Tests the ability to listen and comprehend everyday conversations and dialogues."
      },
      purpose: {
        title: "Why Take the JLPT?",
        description: "The JLPT is recognized worldwide as the standard for measuring Japanese language proficiency. It is used by universities, companies, and immigration authorities to evaluate Japanese language ability. Passing JLPT N5 or N4 can also fulfill Japanese visa requirements for certain visa categories.",
        exploreResources: "Explore Learning Resources"
      }
    },

    // Privacy Policy
    privacyPolicy: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: September 2026",
      infoWeCollect: "Information We Collect",
      infoWeCollectDesc: "We collect information you provide directly to us, including:",
      nameContactInfo: "Name and contact information when you sign up for classes",
      classPreferences: "Class preferences and scheduling information",
      communicationPreferences: "Communication preferences",
      howWeUse: "How We Use Your Information",
      provideMaintain: "To provide and maintain our classes and services",
      communicateWithYou: "To communicate with you about your classes and account",
      improveOurWebsite: "To improve our website and services",
      dataStorage: "Data Storage",
      dataStorageDesc: "We use Supabase as our data storage provider. Your personal information is stored securely and is only accessible to us. We do not sell or share your personal information with third parties.",
      cookies: "Cookies",
      cookiesDesc: "We use cookies to remember your preferences (such as language and theme settings). You can choose to disable cookies through your browser settings, but some features may not work properly.",
      contactUs: "Contact Us",
      contactUsDesc: "If you have any questions about this Privacy Policy, please contact us through our <a href=\"/about\">About page</a>."
    },

    // Terms
    terms: {
      title: "Terms & Conditions",
      lastUpdated: "Last updated: September 2026",
      services: "Services",
      servicesDesc: "AsasJepun provides Japanese language learning resources and online classes. By using our services, you agree to these terms and conditions.",
      classRegistration: "Class Registration",
      registrationConfirmed: "Registration is confirmed upon payment receipt",
      classesOnline: "Classes are conducted online via Google Meet",
      stableInternet: "You are responsible for ensuring you have a stable internet connection",
      paymentTerms: "Payment Terms",
      paymentDue: "Payment is due at the beginning of each month",
      payment1on1: "1-on-1 classes: RM200/month (4 classes)",
      paymentGroup: "Group classes: RM150/month (4 classes)",
      cancellationPolicy: "Cancellation Policy",
      cancellationPolicyDesc: "If you need to cancel or reschedule a class, please provide at least 24 hours notice. Classes cancelled with less than 24 hours notice may be counted as completed.",
      intellectualProperty: "Intellectual Property",
      intellectualPropertyDesc: "All content on this website, including but not limited to text, graphics, logos, and images, is the property of AsasJepun and is protected by copyright laws.",
      limitationLiability: "Limitation of Liability",
      limitationLiabilityDesc: "While we strive to provide accurate and up-to-date information, we cannot guarantee the completeness or accuracy of all content. Use of this website and our services is at your own risk.",
      contactUs: "Contact Us",
      contactUsDesc: "If you have any questions about these Terms & Conditions, please contact us through our <a href=\"/about\">About page</a>."
    },

    // Common
    common: {
      loading: "Loading...",
      back: "Back",
      learnMore: "Learn More",
      error: "Error! Try again",
      audioNotSupported: "Your browser does not support audio playback.",
      submitting: "Submitting..."
    },

    // Signup Modal
    signup: {
      title: "Want to learn Japanese?",
      subtitle: "Fill out the form and I'll contact you within 24 hours",
      name: "Name",
      age: "Age",
      phone: "Phone Number",
      schedule: "Select available days and times",
      submit: "Submit",
      required: "* Required fields",
      signupSuccess: "Signup successful!",
      signupError: "Something went wrong. Please try again.",
      joinClassBtn: "Join class",
      classInfoTitle: "Japanese Classes with Uthman",
      classInfoSubtitle: "Personalized 1-on-1 or group lessons tailored to your goals",
      classInfoDesc: "Whether you're starting from zero or picking up where you left off, I'll help you build a solid foundation in Japanese.",
      classInfoIncludesTitle: "What You Get",
      classInfoIncludes1: "Customized lessons based on your level and goals",
      classInfoIncludes2: "Homework and feedback after every class",
      classInfoIncludes3: "Support between classes via WhatsApp",
      classInfoIncludes4: "Resources and materials provided",
      classInfoPricingTitle: "Pricing",
      classInfo1on1: "1-on-1 Class",
      classInfo1on1Price: "RM200/month",
      classInfo1on1Desc: "4 classes per month, personalized attention",
      classInfoGroup: "Group Class",
      classInfoGroupPrice: "RM150/month",
      classInfoGroupDesc: "4 classes per month, learn with others",
      classInfoNote: "All classes are conducted online via Google Meet",
      classInfoStartBtn: "Start Registration"
    },

    // Admin
    admin: {
      title: "Admin Dashboard",
      loginTitle: "Admin Login",
      loginSubtitle: "Enter your admin password to access the dashboard",
      password: "Password",
      login: "Login",
      logout: "Logout",
      loadingPosts: "Loading posts...",
      loadingSignups: "Loading signups...",
      noPosts: "No posts yet. Click \"New Post\" to create your first blog post.",
      noSignups: "No signups yet.",
      newPost: "New Post",
      editPost: "Edit",
      deletePost: "Delete",
      savePost: "Save Post",
      cancel: "Cancel",
      confirmDelete: "Are you sure you want to delete this post?",
      signupsTitle: "Class Signups",
      createNewPost: "Create New Post",
      editPostTitle: "Edit Post",
      readingTime: "Reading Time (minutes)",
      tagsPlaceholder: "n5, grammar, mindset",
      tagsHint: "Press Enter or comma to add a tag",
      contentPlaceholder: "# Heading\n\nYour content here...",
      contentMyPlaceholder: "Malay content here (optional)...",
      coverImageLabel: "Cover Image URL",
      coverImagePlaceholder: "https://example.com/image.jpg",
      statusLabel: "Status",
      statusDraft: "Draft",
      statusPublished: "Published",
      slugLabel: "Slug (URL key)",
      slugPlaceholder: "my-first-post",
      slugLockedHint: "Locked — title changes won't overwrite slug",
      tagsLabel: "Tags",
      writeTab: "Write",
      previewTab: "Preview",
      signups: {
        name: "Name",
        age: "Age",
        phone: "Phone",
        classType: "Class Type",
        schedule: "Schedule",
        date: "Date"
      },
    }
  },

  my: {
    // 1. Navigation
    nav: {
      intro: "Laman Utama",
      kana: "Hiragana & Katakana",
      kanjiRules: "Kanji",
      anki: "Anki & Lombong Vocab",
      roadmap: "Laluan Pembelajaran",
      introduction: "Pengenalan",
      selfStudy: "Panduan Belajar Sendiri",
      blogCulture: "Blog & Budaya",
      resources: "Sumber",
      about: "Tentang",
      jlptInfo: "Apa itu JLPT?",
      kanaSubpage1: "Vokal Panjang",
      kanaSubpage2: "Tenten & Maru",
      kanaSubpage3: "Kana Kecil",
      immersion: "Input Boleh Difahami & Penyerapan",
      ai: "Menggunakan AI"
    },

    // 2. Footer
    footer: {
      tagline: "Belajar Jepun dengan cara yang betul"
    },

    // 3. Homepage
    home: {
      heroTag: "Konnichiwa! こんにちは",
      heroTitle: "Panduan belajar bahasa Jepun dengan cara yang betul",
      heroSubtitle: "Semua yang anda perlukan untuk belajar bahasa Jepun secara efektif.",
      whyTitle: "Bagaimana kami bantu anda",
      whyPoint1Title: "Tak ada lagi Doomscrolling YouTube tak ingat arah",
      whyPoint1Desc: "Kami beri anda jalan yang jelas. Ikut laluan pembelajaran dari kosong hingga boleh bercakap, atau mula di tahap mana pun anda sekarang.",
      whyPoint2Title: "Belajar apa yang perlu",
      whyPoint2Desc: "Panduan dan sumber yang betul-rata membantu korang belajar, bukan sekadar baca je.",
      whyPoint3Title: "Faham budaya untuk faham bahasa",
      whyPoint3Desc: "Bahasa Jepun masuk akal bila korang faham kenapa dia jadi macamtu. Kami ajar melalui konteks  perayaan, kehidupan harian, hiburan.",
      quickNavTitle: "Pautan Pantas",
      quickNavSubtitle: "Pilih seksyen dan mulakan",
      heroCtaStart: "Mulakan dengan Pengenalan Bahasa Jepun",
      heroCtaRoadmap: "Lihat Laluan Pembelajaran",
      sectionIntroTitle: "Pengenalan Bahasa Jepun",
      sectionIntroDesc: "Langkah pertama yang penting. Belajar bagaimana bahasa Jepun berfungsi",
      sectionKanaTitle: "Hiragana & Katakana",
      sectionKanaDesc: "Belajar dua sistem penulisan Jepun dengan carta interaktif",
      sectionKanjiTitle: "Kanji",
      sectionKanjiDesc: "Fahami kanji, radikal, dan asas urutan stroke",
      sectionSelfStudyTitle: "Panduan Belajar Sendiri",
      sectionSelfStudyDesc: "Bagaimana untuk belajar bahasa Jepun dengan efektif secara bebas",
      sectionResourcesTitle: "Sumber",
      sectionResourcesDesc: "Alat yang dipilih: kamus, deck Anki, pemain media, dan banyak lagi",
      sectionAboutTitle: "Tentang",
      sectionAboutDesc: "Tentang AsasJepun dan pengasas di sebaliknya"
    },

    // 4. Roadmap
    roadmap: {
      title: "Roadmap Pembelajaran Bahasa Jepun",
      intro: "Panduan langkah demi langkah untuk bawa anda dari kosong. Klik pada setiap fasa untuk perincian fokus pembelajaran.",
      disclaimer: "⚠️ Anggaran masa ni adalah berdasarkan konsistensi anda jika anda belajar setiap hari (1-2 jam). Progress sebenar bergantung pada konsistensi, bukan intensiti.",
      goTo: "Go to section",
      phases: {
        phase1: "Fasa 1",
        phase2: "Fasa 2",
        phase3: "Fasa 3",
        phase4: "Fasa 4",
        phase5: "Fasa 5",
        phase6: "Fasa 6",
        phase7: "Fasa 7",
        phase8: "Fasa 8",
        phase9: "Fasa 9"
      },
      kana: {
        title: "Kana (Aksara Jepun)",
        desc: "Belajar Hiragana dan Katakana dari sifar.",
        duration: "2 - 3 Minggu",
        activity: "Membaca sahaja",
        focusTitle: "Fokus Pembelajaran:",
        items: [
          "Hiragana dan Katakana (membaca, bukan menulis dulu)",
          "Dakuon, Handakuon, Yoon bunyi",
          "Membaca perkataan dan frasa ringkas"
        ]
      },
      basic: {
        title: "Frasa Asas + Zarah + Bina Ayat",
        desc: "Bina ayat pertama anda dan faham cara Jepun berfungsi.",
        duration: "1 - 2 Bulan",
        activity: "Speaking & Writing",
        focusTitle: "Fokus Pembelajaran:",
        items: [
          "Frasa harian penting (salam, intro diri, shopping, arah)",
          "Zarah asas: は, が, を, に, で, と, から, まで",
          "Bina ayat pertama: Subjek は Object を Verb",
          "Te-form sebagai pintu masuk ke conversation"
        ]
      },
      n5: {
        title: "N5 Grammar + Vocab + Kanji Asas",
        desc: "Mula belajar tatabahasa formal dan Kanji pertama.",
        duration: "1 - 2 Bulan",
        activity: "~100 Kanji | ~800 Vocab",
        focusTitle: "Fokus Pembelajaran:",
        items: [
          "Kehidupan (いる/ある), pemilikan, masa lalu",
          "Basic Keigo (bahasa sopan)",
          "~100 Kanji N5 (nombor, hari, masa, arah)",
          "~800 vocab penting"
        ]
      },
      n5mastery: {
        title: "N5 Mastery + Habits + Immersion",
        desc: "Kuasai N5, bina habit belajar, dan mulakan rendam diri.",
        duration: "2 - 3 Bulan",
        activity: "~250 Kanji | ~1,500 Vocab",
        focusTitle: "Fokus Pembelajaran:",
        items: [
          "Semua pattern grammar N5",
          "~150 Kanji tambahan (身体, 食べる, 行く, dll)",
          "SRS setup (Anki)",
          "Penyerapan harian: apa nak tengok, baca, dengar"
        ]
      },
      n4bridge: {
        title: "N4 Grammar + Vocab",
        desc: "Bina atas asas N5 dengan tatabahasa dan vocabulary pertengahan.",
        duration: "3 - 4 Bulan",
        activity: "~300 Kanji | ~3,000 Vocab",
        focusTitle: "Fokus Pembelajaran:",
        items: [
          "Pengloquent (たら, なら, ば)",
          "Kausatif + kausatif-pasif",
          "Daftar pertuturan kasual vs sopan",
          "~3,000 vocab total"
        ]
      },
      n3: {
        title: "N3 Grammar + Kanji + Comprehension",
        desc: "Bahasa Jepun jadi lebih natural dan anda faham lebih banyak.",
        duration: "6 - 8 Bulan",
        activity: "~400 Kanji | ~3,000 Vocab",
        focusTitle: "Fokus Pembelajaran:",
        items: [
          "Bentuk pasif, kausatif-pasif, potential",
          "Penambahbaikan keigo",
          "~400 Kanji total",
          "Kandungan asli dengan sari kata, dengar pertuturan natural"
        ]
      },
      n2prep: {
        title: "N2 Prep + Sustained Immersion",
        desc: "Pipeline ke N2 dengan immersion sebagai lifestyle.",
        duration: "Berterusan",
        activity: "Keigo Kompleks | Struktur Lanjutan",
        focusTitle: "Fokus Pembelajaran:",
        items: [
          "Keigo kompleks dan struktur ayat lanjutan",
          "Membaca teks tanpa format (novel, artikel)",
          "Penyerapan sebagai gaya hidup",
          "Prep N2 dan latihan"
        ]
      },
      n1: {
        title: "Routine Konsisten + Prep N1",
        desc: "Kuasai bahasa Jepun tahap hampir native dengan keigo bisnes dan struktur kompleks.",
        duration: "8 - 12 Bulan",
        activity: "~1,000 Kanji | ~5,000 Vocab",
        focusTitle: "Fokus Pembelajaran:",
        items: [
          "Business keigo dan ekspresi formal",
          "Struktur ayat kompleks (倒置法, 強調, dll)",
          "~1,000 kanji total",
          "Reading dan listening tahap native"
        ]
      },
      continues: {
        title: "Pembelajaran Berlanjutan",
        desc: "Di luar tahap berstruktur. Kandungan asli, pembacaan lanjutan, latihan pertuturan.",
        duration: "Seumur Hidup",
        activity: "Perjalanan tidak pernah benar-benar berakhir",
        focusTitle: "Fokus Pembelajaran:",
        items: [
          "Kandungan asli yang anda benar-benar suka",
          "Pembacaan dan pertuturan lanjutan",
          "Kelancaran di luar tahap buku teks",
          "Perjalanan tidak pernah benar-benar berakhir"
        ]
      }
    },

    // 5. Introduction Page
    introduction: {
      title: "Pengenalan Bahasa Jepun",
      subtitle: "Langkah pertama anda untuk memahami bahasa Jepun",
      welcomeTitle: "Apa itu Bahasa Jepun?",
      welcomeDesc: "Bahasa Jepun digunakan oleh kira-kira 130 juta orang di Jepun dan komuniti Jepun di seluruh dunia. Ia femenino dalam keluarga bahasa Japonic, yang tidak mempunyai hubungan geneologis yang luas diterima dengan mana-mana keluarga bahasa lain.",
      writingTitle: "Sistem Penulisan",
      writingDesc: "Bahasa Jepun menggunakan tiga sistem penulisan digabungkan:",
      writingPoint1: "Hiragana - Digunakan untuk perkataan asli Jepun dan unsur tatabahasa",
      writingPoint2: "Katakana - Digunakan untuk perkataan asing, penekanan, dan onomatopoeia",
      writingPoint3: "Kanji - Huruf Cina yang diterima pakai untuk Jepun, digunakan untuk kata nama dan punca kata kerja",
      writingHiragana: "Hiragana",
      writingHiraganaDesc: "Perkataan asli (cth, あめ = hujan)",
      writingKatakana: "Katakana",
      writingKatakanaDesc: "Perkataan asing (cth, テレビ = TV)",
      writingKanji: "Kanji",
      writingKanjiDesc: "Hari / Matahari (cth, 日本 = Jepun)",
      structureTitle: "Struktur Bahasa",
      structureDesc: "Bahasa Jepun mempunyai struktur yang berbeza dari Bahasa Inggeris:",
      structureEnglish: "Bahasa Inggeris",
      structureSVO: "SVO - Subjek -> Kata Kerja -> Objek",
      structureJapanese: "Bahasa Jepun",
      structureSOV: "SOV - Subjek -> Objek -> Kata Kerja",
      structureI: "Saya",
      structureEat: "makan",
      structureRice: "nasi",
      structureIEatRice: "Saya makan nasi",
      structureWatashi: "Saya",
      structureGohan: "nasi",
      structureTabemasu: "makan",
      structureWatashiSentence: "Saya wa nasi wo tabemasu",
      structureNoSpaces: "Tiada ruang di antara perkataan",
      structureNoSpacesExample: "私はご飯を食べます",
      structureKeigo: "Tahap Kesopanan (Keigo)",
      structureCasualPolite: "Kasual → Sopan → Rasmi",
      soundTitle: "Sistem Bunyi",
      soundDesc: "Bahasa Jepun mempunyai sistem fonologi yang agak mudah:",
      soundPoint2: "Tiada kluster konsonan (cth: \"st\", \"tr\", \"gl\")",
      soundPoint4: "Nilai nada bukan tekanan aksen (berbeza mengikut dialek)",
      moraTitle: "Mora: Timing Jepun",
      moraIntro: "Bahasa Jepun tidak dikira dalam suku kata. Ia dikira dalam morae (拍 / ha-ku). Setiap mora adalah satu beat yang sama rata. Seluruh irama bahasa dibina dengan memberikan setiap mora tempoh pendek yang sama.",
      moraIntro2: "Kiraan mora yang betul, dan memberikan setiap beat panjang yang sama, adalah apa yang memisahkan pembelajaran semulajadi daripada pembelajaran yang hanya difahami dengan usaha.",
      moraTomodachi: "ともだち (kawan)",
      moraOne: "1 mora",
      morae: "morae",
      moraListen: "Dengar perkataan ini",
      moraEqualTime: "Perhatikan setiap suku ambil masa yang sama",
      moraBasicKana: "Setiap kana asas = 1 mora",
      moraNekoSakura: "ねこ (ne-ko) = 2 morae, さくら (sa-ku-ra) = 3 morae",
      moraN: "ん = 1 mora",
      moraNasal: "Bunyi n di hujung (cth, にほん = ni-ho-n = 3 morae)",
      soundRule1: "Hanya 5 vokal (a, i, u, e, o)",
      soundRule2: "Tiada kluster konsonan (cth: \"st\", \"tr\", \"gl\")",
      soundRule3: "Struktur suku kata mudah (hampir selalu konsonan + vokal)",
      soundRule4: "Nilai nada bukan tekanan aksen (berbeza mengikut dialek)",
      consonantClusters: "Setiap suku kata Jepun sentiasa berakhir dengan vokal atau ん (n). Tiada kluster konsonan dibenarkan. Ini bermakna tiada bunyi \"st\", \"tr\", \"gl\". Sebaliknya, anda memecahnya menjadi suku kata terpisah. Contohnya: \"stop\" menjadi \"su-to-ppu\", \"train\" menjadi \"to-re-i-n\".",
      pitchAccentDesc: "Perkataan yang sama boleh mempunyai makna yang berbeza bergantung pada suku kata mana yang mempunyai pitch tinggi. Pitch accent berbeza antara Tokyo, Kansai, dan dialek lain. Mempelajari pitch accent dari awal adalah lebih baik supaya dapat membuang tabiat output yang salah.",
      pitchChopsticks: "penyepit",
      pitchBridge: "jambatan",
      tipTitle: "Tip Pembelajaran",
      tipDesc: "Jangan cuba menterjemah perkataan demi perkataan dari Bahasa Melayu. Sebaliknya, cuba fahami konsep dan corak dalam konteks Jepun mereka.",
      ctaRoadmap: "Belajar Hiragana & Katakana"
    },

    // 6. Kana (Hiragana & Katakana)
    kana: {
      title: "Jadual Kana",
      subtitle: "Rujukan interaktif Hiragana & Katakana dengan sebutan audio",
      hiragana: "Hiragana",
      katakana: "Katakana",
      clickToLearn: "Klik mana-mana aksara untuk dengar sebutan",

      // Long Vowel (subpage1)
      subpage1Title: "Vokal Panjang",
      subpage1Subtitle: "Belajar cara memanjangkan bunyi vokal (chōon / 長音)",
      subpage1: {
        whatIsTitle: "Apakah Vokal Panjang?",
        whatIsDesc: "Vokal panjang (長音 / chōon) adalah bunyi vokal yang dipegang untuk dua morae bukan satu. Dalam bahasa Jepun, menukar panjang vokal boleh menyebabkan perubahan makna sepenuhnya, jadi ia penting untuk dikuasai awal.",
        hiraganaTitle: "Menulis Vokal Panjang dalam Hiragana",
        katakanaTitle: "Menulis Vokal Panjang dalam Katakana",
        katakanaDesc: "Katakana menggunakan garis lurus mendatar yang dipanggil tanda vokal panjang (長音符 / chōonpu / ー) вместо menambah huruf tambahan. Garis ini memanjangkan bunyi vokal aksara sebelumnya.",
        aRow: "Bunyi baris あ (あ段)",
        aRowRule: "Tambah satu aksara あ (a)",
        iRow: "Bunyi baris い (い段)",
        iRowRule: "Tambah satu aksara い (i)",
        uRow: "Bunyi baris う (う段)",
        uRowRule: "Tambah satu aksara う (u)",
        eRow: "Bunyi baris え (え段)",
        eRowRule: "Biasanya tambah い (i)",
        oRow: "Bunyi baris お (お段)",
        oRowRule: "Biasanya tambah う (u)",
        exOkaasan: "makcik / ibu",
        exOniisan: "abang lebih tua",
        exKuuki: "udara",
        exSeito: "pelajar",
        exTokei: "jam",
        exOokami: "serigala",
        exKi: "Dari キ (ki) + ー",
        exKiWord: "kunci",
        exKu: "Dari ク (ku) + ー",
        exKuWord: "udara",
        exShiito: "Dari キ (ki) + ー + パ (pa) + ー",
        exShiitoWord: "penjaga gol",
        exTerebi: "Dari テ (te) + レ (re) + ビ (bi)",
        exTerebiWord: "televisyen"
      },

      // Tenten & Maru (subpage2)
      subpage2Title: "Tenten & Maru",
      subpage2Subtitle: "Fahami dakuten (濁点) dan handakuten (半濁点)",
      subpage2: {
        whatIsTitle: "Apakah Tenten dan Maru?",
        whatIsDesc: "Tenten (juga dikenali sebagai Dakuten) dan Maru (juga dikenali sebagai Handakuten) adalah tanda yang boleh mengubah sebutan aksara kana. Tenten adalah dua tanda dash kecil (゛) diletakkan di bahagian kanan atas aksara kana dan Maru adalah bulatan kecil (゜) diletakkan di bahagian kanan atas aksara kana. Kedua-duanya menukar bunyi konsonan.",
        dakutenTitle: "Tenten (゛)",
        dakutenDesc: "Tenten menukar baris か (ka) kepada が (ga), baris さ (sa) kepada ざ (za), baris た (ta) kepada だ (da), dan baris は (ha) kepada ば (ba).",
        handakutenTitle: "Maru (゜)",
        handakutenDesc: "Maru menukar baris は (ha) kepada ぱ (pa).",
        memoryTrickTitle: "Rujukan Pantas",
        memoryTrickDesc: "Sebutan tidak berubah dengan tenten: じ dan ぢ kedua-dua berbunyi \"ji\", ず dan づ kedua-dua berbunyi \"zu\". Ejaan berbeza, tetapi sebutannya sama.",
        chartTitle: "Jadual Dakuten & Handakuten",
        columnBase: "Asas",
        columnVoiced: "Berdaras",
        columnSemi: "Separuh",
        exceptionsTitle: "Pengecualian untuk Diingat"
      },

      // Small Characters (subpage3)
      subpage3Title: "Kana Kecil",
      subpage3Subtitle: "Pelajari kana kecil (ァ, ィ, ゥ, ェ, ォ, っ, ゃ, ゅ, ょ) yang mengubah bunyi",
      subpage3: {
        sokuonTitle: "Sokuon (っ) - Penggandaan Konsonan",
        sokuonDetail: "Sokuon (促音) adalah っ kecil (atau ッ dalam katakana) yang menghasilkan jeda singkat atau bunyi \"konsonan berganda\". っ dikira sebagai 1 mora penuh walaupun tidak berbunyi — ia hanya menambah hentian singkat sebelum konsonan berikutnya.",
        yoonTitle: "Yōon (ゃ, ゅ, ょ)",
        yoonSmallTitle: "Yōon (ゃ, ゅ, ょ)",
        yoonDesc: "Yōon (拗音) adalah gabungan bunyi apabila ゃ, ゅ, atau ょ kecil mengikuti kana baris い (き, し, ち, に, ひ, み, り, ぎ, じ, び, ぴ) untuk membentuk satu bunyi baharu. Kana biasa + ゃ/ゅ/ょ kecil bergabung menjadi satu bunyi dan anda tidak menyebutnya secara berasingan."
      },

      // Small Kana
      smallKana: {
        title: "Perkataan Katakana Asing",
        subtitle: "Kana kecil untuk bunyi asing",
        desc: "Katakana gunakan aksara kecil (ァ, ィ, ゥ, ェ, ォ) untuk tulis perkataan asing. Kombinasi ini cipta bunyi yang tak ada dalam bahasa Jepun tradisional.",
        examplesTitle: "Contoh Biasa",
        examples: [
          { kana: "ヴァ", romaji: "va", used: "ヴァルキリー (Valkyrie)" },
          { kana: "ヴィ", romaji: "vi", used: "ヴィジュアル (visual)" },
          { kana: "ヴェ", romaji: "ve", used: "ヴェスト (vest)" },
          { kana: "ヴォ", romaji: "vo", used: "ヴォイス (voice)" },
          { kana: "ウィ", romaji: "wi", used: "ウィスキー (whisky)" },
          { kana: "ウェ", romaji: "we", used: "ウェディング (wedding)" },
          { kana: "ウォ", romaji: "wo", used: "ワーク (work)" },
          { kana: "ティ", romaji: "ti", used: "ティッシュ (tissue)" },
          { kana: "ディ", romaji: "di", used: "ディズニー (Disney)" },
          { kana: "ドゥ", romaji: "du", used: "ドゥーム (doom)" },
          { kana: "チェ", romaji: "che", used: "チェック (check)" },
          { kana: "ジェ", romaji: "je", used: "ジェット (jet)" },
          { kana: "シェ", romaji: "she", used: "シェイク (shake)" },
          { kana: "ツァ", romaji: "tsa", used: "モーツァルト (Mozart)" },
          { kana: "ファ", romaji: "fa", used: "ファミリー (family)" },
          { kana: "フィ", romaji: "fi", used: "フィルター (filter)" },
          { kana: "フェ", romaji: "fe", used: "フェンス (fence)" },
          { kana: "フォ", romaji: "fo", used: "フォルダー (folder)" },
        ],
        smallHiraganaTitle: "Hiragana Kecil (っ)",
        smallHiraganaDesc: "Small っ (tsu) gandakan konsonan selepasnya.  돌아 → もっと (motto), bukan とも (tomo)"
      }
    },

    // 7. Kanji Rules
    kanjiRules: {
      title: "Kanji",
      subtitle: "Fahami apakah kanji dan bagaimana ia berfungsi",
      subpage1Title: "Susunan Loretan",
      subpage1Subtitle: "Belajar cara yang betul untuk menulis kanji",
      subpage2Title: "Radikal",
      subpage2Subtitle: "Pelajari tentang radikal kanji dan maknanya",
      subpage3Title: "Kanji dalam Nama"
    },

    // 8. Self Study Guide
    selfStudy: {
      title: "Panduan Belajar Sendiri",
      subtitle: "Tips dan strategi untuk pembelajaran bahasa Jepun secara efektif",
      overview: {
        title: "Mengapa Belajar Sendiri?",
        points: [
          "<strong>Kelas formal</strong> untuk N2 dan N1 jarang tersedia di luarbandar utama, menjadikan <strong>belajar sendiri penting</strong> untuk pelajar lanjutan.",
          "<strong>Belajar sendiri</strong> membolehkan anda belajar pada kelajuan sendiri, fokus pada apa yang menarik minat anda, dan <strong>menyelami budaya Jepun</strong> melalui media yang anda suka.",
          "Ramai pelajar mendapati <strong>gabungan belajar sendiri</strong> dengan kelas atau sesi tutoring sekali-sekala memberikan hasil terbaik."
        ]
      },
      principles: {
        title: "Prinsip Teras",
        consistency: {
          title: "Jadi Konsisten",
          desc: "Malah 15-30 min belajar harian lebih efektif daripada sesi panjang yang tidak teratur. Bina habit dulu."
        },
        input: {
          title: "Utamakan Input",
          desc: "Baca dan dengar kandungan asli sebanyak mungkin. Pemahaman datang dari pendedahan yang meluas."
        },
        active: {
          title: "Tetap Aktif",
          desc: "Jangan sekadar baca atau tengok secara pasif. Buat nota, kad flashcard, dan guna vocabulary baru dalam ayat."
        },
        patience: {
          title: "Bersabar",
          desc: "Pemerolehan bahasa ambil masa. Yakin dengan proses dan jangan bandingkan diri dengan orang lain."
        }
      },
      dailyRoutine: {
        title: "Rutin Harian Cadangan",
        morning: {
          title: "Pagi (15-20 min)",
          desc: "Ulangkaji flashcard (Anki) dan belajar tatabahasa atau vocabulary baru."
        },
        afternoon: {
          title: "Petang (20-30 min)",
          desc: "Baca kandungan Jepun  manga, berita, atau novel ringan yang sesuai dengan tahap anda."
        },
        evening: {
          title: "Malam (15-30 min)",
          desc: "Tengok atau dengar media Jepun  anime, drama, podcast, atau YouTube."
        }
      },
      resources: {
        title: "Sumber Disyorkan mengikut Tahap",
        beginner: {
          title: "Pemula (N5)",
          items: [
            "Buku teks Genki I & II",
            "Dek vocabulary Anki N5",
            "YouTube channel Cure Dolly's Japanese",
            "Japanese Ammo with Misa"
          ]
        },
        intermediate: {
          title: "Pertengahan (N4-N3)",
          items: [
            "Buku teks Tobira atau Shin Nihongo",
            "Manga dan novel asli",
            "YouTube Comprehensible Japanese",
            "Podcast Jepun untuk pelajar"
          ]
        },
        advanced: {
          title: "Lanjutan (N2-N1)",
          items: [
            "Media asli tanpa sari kata",
            "Berita Jepun (NHK Easy)",
            "Buku tatabahasa lanjutan",
            "Latihan shadowing"
          ]
        }
      },
      tips: {
        title: "Tips Pro",
        mining: "Mining vocabulary dari kandungan yang anda suka  ia buat pembelajaran rasa kurang macam study.",
        shadowing: "Latihan shadowing (ulang selepas penutur) untuk improve sebutan dan kelancaran pertuturan.",
        writing: "Bekalan diary Jepun guna notes app kat telefon. Malah ayat simple bantu reinforce apa yang anda dah belajar.",
        thinking: "Cuba fikir dalam Jepun masa kehidupan harian. Huraikan objek di sekeliling anda dalam kepala."
      }
    },

    // 9. Anki & Vocab Mining
    anki: {
      title: "Anki & Lombong Vocab",
      subtitle: "Dek yang disyorkan dan cara mining vocabulary dari kandungan asli",
      howItWorks: "Bagaimana Anki Berfungsi",
      howItWorksDesc: "Anki adalah sistem repetisi jarak yang bantu anda menghafal apa-apa dengan efisien. Ia berfungsi dengan menunjukkan kad pada selang yang meningkat tepat sebelum anda lupa. Kad baru muncul sekali sehari, dan ulangkaji berdasarkan betapa bagus anda ingat setiap kad. Lebih anda挣扎 dengan kad, lebih kerap ia muncul. Kaedah ini, dipanggil repetisi jarak, terbukti bina memori jangka panjang lebih cepat daripada cram.",
      recommendedDecks: "Dek Disyorkan",
      howToMine: "Cara Mining Vocab",
      visit: "Lawati"
    },

    // 10. Comprehensible Input & Immersion
    immersion: {
      title: "Input Boleh Difahami & Penyerapan",
    },

    // 11. Using AI
    selfStudyAI: {
      title: "Menggunakan AI untuk Pembelajaran Jepun",
    },

    // 12. Resources
    resources: {
      title: "Sumber",
      subtitle: "Alat yang dipilih mengikut masalah yang mereka selesaikan.",
      categories: {
        dictionary: "Kamus",
        anki: "Flashcards",
        learning: "Laman Web Pembelajaran",
        mobileApps: "Aplikasi Mudah Alih",
        reading: "Membaca",
        jlpt: "Persediaan JLPT",
        browserLookup: "Sambungan Pelayar (Lookup)",
        browserSubtitle: "Sari Kata (Sambungan Pelayar)",
        media: "Streaming",
        podcasts: "Podcast",
        youtubeLearning: "YT untuk Belajar Jepun",
        youtubeImmersion: "YT untuk Penyerapan",
        youtubePopular: "YT Channel Popular",
        practice: "Latihan Bertutur",
        pitchAccent: "Pitch Accent",
        translator: "Penterjemah",
        discordServers: "Discord Servers",
        askQuestions: "Tanya Soalan",
        articles: "Artikel Jepun",
        otherResources: "Sumber Lain"
      },
      descriptions: {
        // Dictionary
        "Jisho.org": "Kamus Japanese-English percuma, boleh cari perkataan, kanji, atau radikal.",
        "Takoboto": "App kamus yang mesra offline dengan contoh ayat, popular di Android.",
        "Weblio": "Aggregator kamus berbahasa Jepun yang mengambil dari pelbagai sumber, bagus untuk carian lanjutan.",
        // Anki
        "Anki": "Perisian kad imbas repetisi jarak yang CORE yang kebanyakan pelajar immersion bina routine mereka.",
        "Wani Kani": "Platform SRS berstruktur untuk belajar kanji dan vocab melalui mnemonik.",
        "Satori Reader": "Platform pembacaan bergrad dengan audio terbina dan nota tatabahasa bersama ulangkaji vocab.",
        // Learning
        "Tofugu": "Blog budaya dan bahasa Jepun yang merangkumi semua daripada pecahan tatabahasa hingga ke gelung budaya mendalam.",
        "Japanese with Anime": "Belajar vocabulary dan tatabahasa melalui klip dan frasa anime sebenar.",
        // Mobile Apps
        "LingoDeer": "Pelajaran berstruktur dengan penjelasan tatabahasa yang jelas, dibina khusus untuk belajar bahasa Asia.",
        "Renshuu": "App study semua-dalam-satu merangkumi vocab, kanji, tatabahasa, dan prep JLPT dengan games dan SRS.",
        "Memrise": "App vocabulary SRS menggunakan repetisi jarak dan klip video penutur native sebenar.",
        "Busuu": "App bahasa umum dengan kursus berstruktur dan feedback daripada penutur native.",
        // Reading
        "NHK News Web Easy": "Artikel berita yang dipermudahkan dengan furigana, bagus untuk pembacaan pemula hingga pertengahan.",
        "Tadoku": "Pustaka pembaca bergrad percuma dibina untuk pembacaan extensive pada tahap mudah dan selesa.",
        "Todaii": "App pembacaan yang menyesuaikan kesulitan artikel secara automatik untuk matching tahap anda.",
        // JLPT
        "Bunpro": "AppSRS berfokus tatabahasa berstruktur di sekeliling tahap JLPT, berp搭档 baik dengan study vocab Anki.",
        "JLPTSensei": "Sumber study JLPT percuma dengan senarai tatabahasa, vocab, dan kanji丘陵 mengikut tahap.",
        // Browser
        "Yomitan": "Sambungan kamus pop-up yang menunjukkan definisi serta-merta bila anda hover atau klik mana-mana perkataan.",
        "Migaku": "Toolkit immersion semua-dalam-satu untuk mining ayat, sari kata, dan carian kamus merentasi pelayar dan mudah alih.",
        "Language Reactor": "Sambungan popular untuk sari kata dual dan carian perkataan serta-merta di Netflix dan YouTube.",
        "Iago": "Sari kata interaktif di YouTube, Netflix, dan Disney+; klik perkataan untuk lihat maksud dan simpan untuk ulangkaji.",
        "Methus": "Sambungan immersion percuma, open-source dengan sari kata dual, kamus hover, dan mining kad imbas dari platform streaming.",
        "Japanese Subtitles Github": "Koleksi sumber sari kata yang diurus untuk anime, drama, dan filem daripada komuniti AJATT.",
        // Media
        "Netflix (Japan)": "Rancangan dan filem tahap native, ideal untuk immersion bila dipadan dengan sambungan sari kata.",
        "AbemaTV": "Platform streaming Jepun percuma dengan TV native, anime, dan rancangan variety. (VPN diperlukan di luar Jepun)",
        "TVer": "Servis streaming Jepun percuma dengan drama, anime, dan rancangan variety yang tersedia tidak lama selepas broadcast.",
        // Podcasts
        "YUYUの日本語Podcast": "Podcast pertengahan/lanjutan yang lama (500+ episod) di mana host Yuyu membincangkan topik harian secara natural dalam Jepun.",
        "Okkei Japanese": "Podcast bergaya storytelling dengan Jepun yang tidak scrit dan natural tentang kehidupan harian di Jepun.",
        "Japanese with Shun": "Jepun yang perlahan dan jelas bertujuan untuk pelajar N5, dibina di sekeliling pelajaran immersion berstruktur.",
        "Miku Real Japanese": "Berfokus pada pertuturan Jepun yang natural dan berkelajuan native, bertujuan untuk pelajar yang faham tatabahasa tapi struggle dengan pertuturan sebenar.",
        "Nihongo con Teppei": "Pemula-friendly, pertuturan natural yang perlahan dan bersemangat.",
        "JapanesePod101": "Pelajaran audio berstruktur berdasarkan tahap.",
        // YouTube Learning
        "Kaname Naito": "Guru Jepun yang memecahkan tatabahasa dengan jelas dalam Bahasa Inggeris, popular kerana menjadikan konsep susah jadi mudah difahami.",
        "That Japanese Man Yuta": "Interview penutur native dan video gaya survey jalan yang memberi konteks budaya dan linguistik sebenar.",
        "Nihongo no Mori": "Berfokus tatabahasa, especially kuat untuk prep JLPT.",
        "Cure Dolly": "Penjelasan tatabahasa yang tidak konvensional tapi disegani.",
        "Japanese Ammo with Misa": "Pelajaran tatabahasa dan vocab berstruktur.",
        // YouTube Immersion
        "きまぐれクック Kimagure Cook": "Saluran memasak berkelajuan native di mana host sediakan makanan laut dengan narasi kasual dan humor, bagus untuk amalan pendengaran natural.",
        "オダケン（ホラーゲーム絶叫者）": "Saluran reaksi game horror dengan banyak pertuturan native yang tidak scrit dan emotional, berguna untuk immersion pendengaran kasual.",
        "Hukumusume": "Cerita rakyat dan folk Jepun tradisional yang dinarasikan oleh penutur native, tenang dan simple tapi autentik.",
        "あかね的日本語教室 (Akane's Japanese Classroom)": "Campuran pelajaran dan vlogs daripada guru Jepun native, bertujuan untuk pelajar pertengahan atas hingga lanjutan.",
        "ひよりの虫日記 (Hiyori's Bug Diary)": "Aktres dan komposer Hiyori Katada kongsi passion untuk serangga, merakam dan menjelaskan tentang bug dalam nature dengan narasi kasual dan enthusiast.",
        "AKBの素を出すちゃんねる": "Sub-channel YouTube rasmi AKB48, menunjukkan ahli idol dalam tetapan yang tidak scripted dan kasual.",
        "【素潜り漁師】マサル Masaru.": "Nelayan freediving yang merakam dirinya menyelongkar dan menyelam untuk makanan laut sepanjang pantai Jepun, dengan narasi native yang kasual.",
        // YouTube Popular
        "Hikakin": "Salah satu YouTuber paling famous di Jepun, pelbagai kandungan.",
        "Kizuna AI": "VTuber perintis, bagus untuk budaya pop/Internet Jepun.",
        "Hajime Shacho (はじめしゃちょー)": "Salah satu YouTuber terbesar di Jepun, dikenali untuk cabaran, eksperimen, dan vlog komedi.",
        "Fischer's": "Kumpulan YouTuber Jepun yang popular dikenali untuk prank, cabaran, dan kandungan komedi.",
        // Practice
        "iTalki": "Tempah pelajaran berbayar atau sesi conversation dengan tutor native.",
        "HelloTalk": "App pertukaran bahasa yang menghubungkan anda dengan penutur native melalui teks, voice, dan video.",
        "Speechling": "Coaching sebutan percuma menggunakan audio feedback penutur native.",
        "Tandem": "App pertukaran bahasa untuk mencari partner conversation penutur native.",
        // Pitch Accent
        "Japanese Pitch-Accent in 10 Minutes": "Penjelasan yang jelas tentang asas pitch accent Jepun.",
        "Kotu Pitch Accent Practice": "Latihan persepsi audio menggunakan minimal pairs untuk latih telinga anda mengenal pasti perbezaan pitch accent.",
        // Translator
        "DeepL": "Penterjemah AI yang dikenali untuk terjemahan ayat yang natural dan bernuansa.",
        "MiraiTranslate": "Enjin penterjemahan berasaskan Jepun yang terkenal dengan pengendalian terminologi bisnes dan honorifics dengan lebih tepat.",
        // Discord
        "English-Japanese Language Exchange": "Server popular yang menghubungkan penutur Bahasa Inggeris dan Jepun untuk amalan conversation.",
        "MBF鯖 - マイクラ＆ゲーム雑談": "Server Jepun yang berpusat pada Minecraft dan gaming chat, bagus untuk immersion kasual.",
        "Japanese Language Study Space": "Komuniti berfokus study untuk bertanya soalan dan berlatih bersama.",
        "毎日英語と日本語": "Server amalan harian untuk pertukaran bahasa Inggeris-Jepun mutual."
      }
    },

    // 13. Blog & Culture
    blogCulture: {
      title: "Blog & Budaya",
      subtitle: "Artikel, pelajaran, dan kandungan panjang tentang pembelajaran dan budaya Jepun.",
      blog: "Blog",
      culture: "Budaya"
    },

    culture: {
      title: "Budaya & Vocab",
      subtitle: "Belajar Jepun melalui konteks budaya  dari vtuber hingga perayaan bermusim.",
      themes: {
        entertainment: "Hiburan",
        food: "Makanan & Minuman",
        seasonal: "Bermusim",
        daily: "Kehidupan Harian",
        social: "Kehidupan Sosial"
      },
    },

    blog: {
      title: "Blog",
      minRead: "min baca"
    },

    // 14. About
    about: {
      title: "Tentang Saya",
      subtitle: "Kaedah yang sebenarnya berkesan, dari seseorang yang sudah cuba semua.",
      storyContent: "Hi, saya <strong>Uthman</strong>, student Jepun macam korang! Saya tahu betapa frustrasinya belajar Jepun bila kanji macam garis rawak, grammar tak masuk akal, dan nothing stays in your head.<br><br>Saya mula belajar Jepun pada 2018 tapi <strong>berhenti</strong> selepas beberapa bulan. Kanji kelihatan seram, dan saya tak nampak bagaimana ia akan melekat. Selepas rehat lama, saya decide untuk <strong>paksa belajar</strong>  dan tak jadi seberat yang saya bayang.<br><br>Sejak 2021, saya belajar secara on and off sebab busy dengan universiti, tapi sampai <strong>mid 2025</strong> baru semuanya masuk. Saya mula konsum kandungan Jepun <strong>setiap hari</strong>  sama ada Hololive streams, J-drama, apa je yang saya boleh jejek dalam bahasa tu. Pemahaman saya meningkat banyak dengan flashcards dan SRS (Spaced Repetition System).<br><br>Kalau korang serius nak belajar, <strong>sertai kelas saya</strong> dan kita belajar sama-sama.",
      connectTitle: "Sambung",
    },

    // JLPT Info
    jlptInfo: {
      title: "Apa itu JLPT?",
      subtitle: "Memahami Ujian Kelayakan Bahasa Jepun",
      whatIs: {
        title: "Mengenai JLPT",
        description: "Ujian Kelayakan Bahasa Jepun (JLPT) adalah ujian standard yang menilai dan mengesahkan kecekapan penutur bukan asli bahasa Jepun. Ujian ini dikendalikan oleh Japan Foundation dan Japan Educational Exchanges and Evaluation Services (JEES). Ujian ini diadakan dua kali setahun di Jepun dan negara terpilih, dan sekali setahun di wilayah lain."
      },
      levels: {
        title: "Tahap JLPT Diterangkan",
        beginner: "- Pemula",
        elementary: "- Asas",
        intermediate: "- Pertengahan",
        upperIntermediate: "- Pertengahan Atas",
        advanced: "- Lanjutan",
        n5Desc: "Tahap paling asas kecekapan bahasa Jepun. Menguji pengetahuan aksara Jepun asas (hiragana dan katakana) dan perkataan harian.",
        n5Kanji: "Kira-kira 100 kanji",
        n5Vocab: "Kira-kira 800 perkataan",
        n4Desc: "Tahap asas, membina pengetahuan N5. Menguji keupayaan memahami bahasa Jepun asas.",
        n4Kanji: "Kira-kira 300 kanji",
        n4Vocab: "Kira-kira 1,500 perkataan",
        n3Desc: "Tahap pertengahan. Menguji keupayaan memahami bahasa Jepun yang digunakan dalam situasi harian hingga tahap tertentu.",
        n3Kanji: "Kira-kira 400 kanji",
        n3Vocab: "Kira-kira 3,000 perkataan",
        n2Desc: "Tahap pertengahan atas. Menguji keupayaan memahami bahasa Jepun yang digunakan dalam situasi harian dan konteks yang lebih kompleks.",
        n2Kanji: "Kira-kira 650 kanji",
        n2Vocab: "Kira-kira 6,000 perkataan",
        n1Desc: "Tahap lanjutan. Menguji keupayaan memahami bahasa Jepun yang digunakan dalam pelbagai konteks akademik dan formal.",
        n1Kanji: "Kira-kira 2,000 kanji",
        n1Vocab: "Kira-kira 10,000 perkataan"
      },
      format: {
        title: "Format Ujian",
        descriptionN5N3: "N5-N3 terdiri daripada tiga bahagian:",
        descriptionN2N1: "N2-N1 terdiri daripada dua bahagian:",
        vocabulary: "Perkataan",
        vocabularyDesc: "Menguji pengetahuan perkataan Jepun dan penggunaan perkataan Jepun yang betul dalam ayat.",
        grammarReading: "Tatabahasa & Bacaan",
        grammarReadingDesc: "Menguji pengetahuan struktur tatabahasa dan pemahaman bacaan Jepun.",
        reading: "Pemahaman Bacaan",
        readingDesc: "Menguji keupayaan memahami bahan bertulis dari pelbagai konteks.",
        listening: "Pendengaran",
        listeningDesc: "Menguji keupayaan mendengar dan memahami perbualan dan dialog harian."
      },
      purpose: {
        title: "Mengapa Ambil JLPT?",
        description: "JLPT diiktiraf di seluruh dunia sebagai standard untuk mengukur kecekapan bahasa Jepun. Ia digunakan oleh universiti, syarikat, dan pihak berkuasa imigresen untuk menilai keupayaan bahasa Jepun. Lulus JLPT N5 atau N4 juga boleh memenuhi syarat visa Jepun untuk kategori visa tertentu.",
        exploreResources: "Terokai Sumber Pembelajaran"
      }
    },

    // Privacy Policy
    privacyPolicy: {
      title: "Dasar Privasi",
      lastUpdated: "Terakhir dikemas kini: September 2026",
      infoWeCollect: "Maklumat yang Kami Kumpul",
      infoWeCollectDesc: "Kami mengumpul maklumat yang anda berikan kepada kami secara langsung, termasuk:",
      nameContactInfo: "Nama dan maklumat hubungan apabila anda mendaftar untuk kelas",
      classPreferences: "Keutamaan kelas dan maklumat penjadualan",
      communicationPreferences: "Keutamaan komunikasi",
      howWeUse: "Bagaimana Kami Menggunakan Maklumat Anda",
      provideMaintain: "Untuk menyediakan dan mengekalkan kelas dan perkhidmatan kami",
      communicateWithYou: "Untuk berkomunikasi dengan anda tentang kelas dan akaun anda",
      improveOurWebsite: "Untuk menambah baik website dan perkhidmatan kami",
      dataStorage: "Storan Data",
      dataStorageDesc: "Kami menggunakan Supabase sebagai pembekal storan data kami. Maklumat peribadi anda disimpan dengan selamat dan hanya boleh diakses oleh kami. Kami tidak menjual atau berkongsi maklumat peribadi anda dengan pihak ketiga.",
      cookies: "Kuki",
      cookiesDesc: "Kami menggunakan kuki untuk mengingat keutamaan anda (seperti tetapan bahasa dan tema). Anda boleh memilih untuk melumpuhkan kuki melalui tetapan pelayar anda, tetapi beberapa ciri mungkin tidak berfungsi dengan betul.",
      contactUs: "Hubungi Kami",
      contactUsDesc: "Jika anda mempunyai apa-apa soalan tentang Dasar Privasi ini, sila hubungi kami melalui <a href=\"/about\">halaman Tentang</a> kami."
    },

    // Terms
    terms: {
      title: "Syarat & Ketetapan",
      lastUpdated: "Terakhir dikemas kini: September 2026",
      services: "Perkhidmatan",
      servicesDesc: "AsasJepun menyediakan sumber pembelajaran bahasa Jepun dan kelas dalam talian. Dengan menggunakan perkhidmatan kami, anda bersetuju dengan syarat dan ketetapan ini.",
      classRegistration: "Pendaftaran Kelas",
      registrationConfirmed: "Pendaftaran disahkan setelah penerimaan pembayaran",
      classesOnline: "Kelas dijalankan dalam talian melalui Google Meet",
      stableInternet: "Anda bertanggungjawab untuk memastikan anda mempunyai sambungan internet yang stabil",
      paymentTerms: "Syarat Pembayaran",
      paymentDue: "Pembayaran perlu dilakukan pada awal setiap bulan",
      payment1on1: "Kelas 1-on-1: RM200/bulan (4 kelas)",
      paymentGroup: "Kelas berkumpulan: RM150/bulan (4 kelas)",
      cancellationPolicy: "Dasar Pembatalan",
      cancellationPolicyDesc: "Jika anda perlu membatalkan atau menjadualkan semula kelas, sila berikan sekurang-kurangnya 24 jam notis. Kelas yang dibatalkan dengan kurang daripada 24 jam notis mungkin dikira sebagai selesai.",
      intellectualProperty: "Harta Intelek",
      intellectualPropertyDesc: "Semua kandungan di website ini, termasuk tetapi tidak terhad kepada teks, grafik, logo, dan imej, adalah milik AsasJepun dan dilindungi oleh undang-undang hak cipta.",
      limitationLiability: "Had Liabiliti",
      limitationLiabilityDesc: "Walaupun kami berusaha untuk menyediakan maklumat yang tepat dan terkini, kami tidak dapat menjamin kesempurnaan atau ketepatan semua kandungan. Penggunaan website ini dan perkhidmatan kami adalah atas risiko anda sendiri.",
      contactUs: "Hubungi Kami",
      contactUsDesc: "Jika anda mempunyai apa-apa soalan tentang Syarat & Ketetapan ini, sila hubungi kami melalui <a href=\"/about\">halaman Tentang</a> kami."
    },

    // Common
    common: {
      loading: "Memuatkan...",
      error: "Sesuatu tidak kena",
      back: "Kembali",
      learnMore: "Ketahui Lagi",
      audioNotSupported: "Pelayar anda tidak sokong audio.",
      submitting: "Menghantar..."
    },

    // Signup Modal
    signup: {
      title: "Nak kelas Jepun?",
      subtitle: "Isi form ni, saya akan contact korang dalam 24 jam",
      name: "Nama",
      age: "Umur",
      phone: "No Telefon",
      schedule: "Pilih hari dan masa yang available",
      submit: "Hantar",
      required: "* Ruangan required",
      signupSuccess: "Signup berjaya!",
      signupError: "Something went wrong. Please try again.",
      joinClassBtn: "Nak kelas?",
      classInfoTitle: "Kelas Jepun dengan Uthman",
      classInfoSubtitle: "Pelajaran 1-on-1 atau berkumpulan yang disesuaikan dengan matlamat anda",
      classInfoDesc: "Sama ada anda bermula dari zero atau sambung balik, saya akan bantu anda bina asas yang kukuh dalam Bahasa Jepun.",
      classInfoIncludesTitle: "Apa Yang Anda Dapat",
      classInfoIncludes1: "Pelajaran yang disesuaikan dengan tahap dan matlamat anda",
      classInfoIncludes2: "Homework dan feedback lepas setiap kelas",
      classInfoIncludes3: "Support antara kelas via WhatsApp",
      classInfoIncludes4: "Resource dan bahan disediakan",
      classInfoPricingTitle: "Harga",
      classInfo1on1: "Kelas 1-on-1",
      classInfo1on1Price: "RM200/bulan",
      classInfo1on1Desc: "4 kelas sebulan, perhatian peribadi",
      classInfoGroup: "Kelas Berkumpulan",
      classInfoGroupPrice: "RM150/bulan",
      classInfoGroupDesc: "4 kelas sebulan, belajar bersama",
      classInfoNote: "Semua kelas dijalankan online via Google Meet",
      classInfoStartBtn: "Mula Pendaftaran"
    },

    // Admin
    admin: {
      title: "Dashboard Admin",
      loginTitle: "Login Admin",
      loginSubtitle: "Masukkan password admin untuk akses dashboard",
      password: "Password",
      login: "Login",
      logout: "Logout",
      loadingPosts: "Memuatkan posts...",
      loadingSignups: "Memuatkan signups...",
      noPosts: "Tiada post lagi. Klik \"Post Baru\" untuk buat post blog pertama.",
      noSignups: "Tiada signup lagi.",
      newPost: "Post Baru",
      editPost: "Sunting",
      deletePost: "Padam",
      savePost: "Simpan Post",
      cancel: "Batal",
      confirmDelete: "Betul nak delete post ni?",
      signupsTitle: "Signup Kelas",
      createNewPost: "Buat Post Baru",
      editPostTitle: "Edit Post",
      readingTime: "Masa baca (minit)",
      tagsPlaceholder: "n5, tatabahasa, mindset",
      tagsHint: "Tekan Enter atau koma untuk tambah tag",
      contentPlaceholder: "# Heading\n\nKandungan anda di sini...",
      contentMyPlaceholder: "Kandungan Malay di sini (optional)...",
      coverImageLabel: "URL Imej Cover",
      coverImagePlaceholder: "https://contoh.com/imej.jpg",
      statusLabel: "Status",
      statusDraft: "Draf",
      statusPublished: "Diterbitkan",
      slugLabel: "Slug (kunci URL)",
      slugPlaceholder: "post-pertama-saya",
      slugLockedHint: "Kunci — perubahan tajuk tak akan tulis semula slug",
      tagsLabel: "Tag",
      writeTab: "Tulis",
      previewTab: "Prebiu",
      signups: {
        name: "Nama",
        age: "Umur",
        phone: "Telefon",
        classType: "Jenis Kelas",
        schedule: "Jadual",
        date: "Tarikh"
      },
    }
  }
};

// Current language state
let currentLang = localStorage.getItem('lang') || 'en';

/**
 * Get translation for a key path
 * @param {string} keyPath - Dot notation path (e.g., 'nav.intro')
 * @param {string} lang - Optional language override
 * @returns {string}
 */
export function t(keyPath, lang = currentLang) {
  const keys = keyPath.split('.');
  let value = translations[lang];

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      console.warn(`Translation missing: ${keyPath} for lang ${lang}`);
      return keyPath;
    }
  }

  return value || keyPath;
}

/**
 * Set current language
 * @param {string} lang - 'en' or 'my'
 */
export function setLanguage(lang) {
  if (lang !== 'en' && lang !== 'my') return;
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
}

/**
 * Get current language
 * @returns {string}
 */
export function getLanguage() {
  return currentLang;
}

/**
 * Toggle between languages
 * @returns {string} - New language
 */
export function toggleLanguage() {
  const newLang = currentLang === 'en' ? 'my' : 'en';
  setLanguage(newLang);
  return newLang;
}

/**
 * Initialize i18n on page load
 */
export function initI18n() {
  setLanguage(currentLang);
  return currentLang;
}
