// Internationalization (i18n) Module
// Languages: English (en), Bahasa Malaysia (my)

export const translations = {
  en: {
    // Navigation
    nav: {
      intro: "Home",
      kana: "Hiragana & Katakana",
      kanjiRules: "Kanji",
      anki: "Anki & Vocab Mining",
      roadmap: "Learning Path",
      introduction: "Introduction",
      selfStudy: "Self Study Guide",
      culture: "Culture Lessons",
      blog: "Blog",
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
    // Homepage
    home: {
      heroTag: "Konnichiwa! こんにちは",
      heroTitle: "Your guide to learning Japanese the right way",
      heroSubtitle: "Everything you need to self-study Japanese effectively.",
      featuredTitle: "Featured Content",
      whyTitle: "How we help you",
      whyPoint1Title: "No more random YouTube spirals",
      whyPoint1Desc: "We give you a clear path. Follow the roadmap from zero to conversational, or jump to whatever level you're at.",
      whyPoint2Title: "Learn what necessary",
      whyPoint2Desc: "Guide and resources that actually help you learn, not just read.",
      whyPoint3Title: "Understand culture to understand the language",
      whyPoint3Desc: "Japanese makes more sense when you understand why things work that way. We teach through context  festivals, daily life, entertainment.",
      quickNavTitle: "Quick Links",
      quickNavSubtitle: "Pick a section and dive in",
      ctaWhereStart: "Not sure where to start?",
      ctaTakeQuiz: "Take our quick level check quiz"
    },
    // Roadmap
    roadmap: {
      title: "Japanese Language Learning Roadmap",
      intro: "A step-by-step guide to take you from zero to intermediate level (N3) and beyond. Click on each phase for details on learning focus.",
      disclaimer: "⚠️ These timelines are estimates assuming consistent daily study (1-2 hours). Your actual progress depends on consistency, not intensity.",
      goTo: "Go to section",
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
      },
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
        ],
        subpage1Title: "Long Vowel",
        subpage1Subtitle: "Learn how to extend vowel sounds (chōon / 長音)",
        subpage2Title: "Tenten & Maru",
        subpage2Subtitle: "Understand dakuten (濁点) and handakuten (半濁点)",
        subpage3Title: "Small Characters",
        subpage3Subtitle: "Learn small kana (ァ, ィ, ォ, っ, ゃ, ゅ, ょ) that modify sounds",
        // Long Vowel content
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
          // Examples
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
        // Tenten & Maru content
        subpage2: {
          whatIsTitle: "What are Tenten and Maru?",
          whatIsDesc: "Tenten (also known as Dakuten) and Maru (also known as Handakuten) are marks that can change the pronunciation of kana characters. Tenten are the two small dashes (゛) placed at the top-right of a kana character and Maru is a small circle (゜) placed at the top-right of a kana character. Both change the sound of consonants.",
          dakutenTitle: "Implementation",
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
        subpage3: {
          sokuonTitle: "Sokuon (っ) - Consonant Doubling",
          sokuonDetail: "Sokuon (促音) is the small っ (or ッ in katakana) that creates a brief pause or \"double consonant\" sound. っ counts as 1 full mora even though it has no sound — it just adds a short stop before the next consonant.",
          yoonTitle: "Youon (ゃ, ゅ, ょ)",
          yoonSmallTitle: "Youon (ゃ, ゅ, ょ)",
          yoonDesc: "Youon (拗音) refers to the combination sounds made when a small ゃ, ゅ, or ょ follows an い-row kana (き, し, ち, に, ひ, み, り, ぎ, じ, び, ぴ) to form a single new sound. The regular kana + small ゃ/ゅ/ょ blend into one sound and you don't pronounce them separately."
        }
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
    // Introduction Page
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
      structureTitle: "Language Structure",
      structureDesc: "Japanese has a fundamentally different structure from English:",
      structurePoint1: "Subject-Object-Verb word order (SOV) instead of SVO",
      structurePoint2: "No spaces between words",
      structurePoint3: "Complex politeness levels (keigo) based on social hierarchy",
      structurePoint4: "No grammatical gender or plural articles",
      soundTitle: "Sound System",
      soundDesc: "Japanese has a relatively simple phonological system:",
      soundPoint1: "Only 5 vowel sounds (a, i, u, e, o)",
      soundPoint2: "No consonant clusters (e.g., \"st\", \"tr\", \"gl\")",
      soundPoint3: "Each syllable is roughly equal in length",
      soundPoint4: "Pitch accent instead of stress accent (differs by dialect)",
      tipTitle: "Learning Tip",
      tipDesc: "Don't try to translate word-for-word from English. Instead, try to understand concepts and patterns in their Japanese context.",
      ctaRoadmap: "Learn Hiragana & Katakana"
    },
    // Culture/Vocab
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
      vocabulary: "Vocabulary",
      culturalNotes: "Cultural Notes",
      tryQuiz: "Try the Quiz"
    },
    // Blog & Culture (Combined)
    blogCulture: {
      title: "Blog & Culture",
      subtitle: "Articles, lessons, and long-form content on Japanese learning and culture.",
      filterAll: "All",
      filterBlog: "Blog",
      filterCulture: "Culture",
      blog: "Blog",
      culture: "Culture"
    },
    // Resources
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
        browserSubtitle: "Browser Extensions (Subtitle)",
        media: "Streaming",
        podcasts: "Podcasts",
        youtubeLearning: "YT for Learning Japanese",
        youtubeImmersion: "YT for Immersion",
        youtubePopular: "YT Popular Channels",
        practice: "Speaking Practice",
        translator: "Translator",
        discordServers: "Discord Servers",
        askQuestions: "Ask Questions",
        articles: "Japanese Articles",
        otherResources: "Other Resources"
      },
      visit: "Visit"
    },
    // About
    about: {
      title: "About Me",
      subtitle: "The method that actually works, from someone who tried them all.",
      storyTitle: "About Me",
      storyContent: "Hi, I'm <strong>Uthman</strong>, fellow Japanese learner! I know exactly how frustrating learning Japanese can be when kanji looks like squiggles, grammar doesn't make sense, and nothing stays in your head.<br><br>I started learning Japanese in 2018 but <strong>quit</strong> after a few months. Kanji looked terrifying, and I couldn't see how any of it would stick. After a long break, I decided to <strong>push through anyway</strong>  and it wasn't as bad as I expected.<br><br>Since 2021, I've been learning off and on since I'm quite busy with university, but things didn't really come together until <strong>mid 2025</strong>. I started consuming Japanese content <strong>every single day</strong>  whether it was Hololive streams, J-dramas, whatever kept me in the language. My comprehension improved a lot using flashcards with SRS (Spaced Repetition System).<br><br>If you're serious about learning, <strong>join my class</strong> and let's do this together.",
      connectTitle: "Connect",
      followThreads: "Follow on Threads",
      joinCommunity: "Join the Community"
    },
    // Footer
    footer: {
      tagline: "Learn Japanese the right way"
    },
    // Common
    common: {
      loading: "Loading...",
      close: "Close",
      back: "Back",
      next: "Next",
      previous: "Previous",
      learnMore: "Learn More",
      start: "Start",
      continue: "Continue",
      comingSoon: "Coming soon...",
      // Theme
      darkMode: "Dark Mode",
      lightMode: "Light Mode",
      // Status
      success: "Success!",
      error: "Error! Try again",
      // Validation
      fillAllRequired: "Please fill in all required fields.",
      audioNotSupported: "Your browser does not support audio playback.",
      // Signup specific
      submitting: "Submitting..."
    },
    // Signup Modal
    signup: {
      title: "Want to learn Japanese?",
      subtitle: "Fill out the form and I'll contact you within 24 hours",
      name: "Name",
      age: "Age",
      phone: "Phone Number",
      currentLevel: "Current Japanese Level",
      classType: "I want a class",
      selectClass: "Select class type",
      oneOnOne: "1 on 1 (RM200/month)",
      group: "Group (RM150/month)",
      schedule: "Select available days and times",
      submit: "Submit",
      required: "* Required fields",
      success: "Success! I'll contact you soon.",
      error: "Something went wrong. Try again.",
      signupSuccess: "Signup successful!",
      signupError: "Something went wrong. Please try again.",
      joinClassBtn: "Join class",
      section1Title: "Current Status",
      section2Title: "Background & Experience",
      section3Title: "Motivation & Goals",
      section4Title: "Mindset & Expectations",
      section5Title: "Almost Done!",
      next: "Next",
      back: "Back",
      selectScheduleError: "Please select at least one available time slot.",
      fillAllRequired: "Please fill in all required fields.",
      studiedBeforeLabel: "Have you studied Japanese before?",
      studiedHowLabel: "How long? What methods did you use?",
      jlptTakenLabel: "Have you taken JLPT before?",
      jlptLevelLabel: "What level did you pass?",
      resourcesLabel: "What resources have you used? (books, apps, websites)",
      exposureLabel: "What Japanese content do you consume outside study?",
      whyJapaneseLabel: "Why do you want to learn Japanese?",
      goalLabel: "What is your main goal?",
      goalJlpt: "Pass JLPT (certification)",
      goalFluency: "Become conversationally fluent",
      goalTravel: "Travel / Living in Japan",
      goalWork: "Work / Business",
      goalAnime: "Understand anime / manga raw",
      goalUniversity: "University requirement",
      goalCulture: "Cultural interest",
      goalOther: "Other",
      studyHoursLabel: "How many hours per week can you commit to studying?",
      studyHours14: "1-3 hours",
      studyHours47: "4-7 hours",
      studyHours814: "8-14 hours",
      studyHours15: "15+ hours",
      activitiesLabel: "What learning activities do you enjoy most?",
      quitBeforeLabel: "Have you tried learning Japanese before and quit?",
      quitReasonLabel: "Why do you think you quit? What changed this time?",
      challengesLabel: "What challenges do you expect to face?",
      learningStyleLabel: "How do you learn best?",
      styleVisual: "Visual (reading, charts)",
      styleAuditory: "Auditory (listening)",
      styleReading: "Reading / Writing",
      stylePractice: "Hands-on practice",
      expectationsLabel: "What do you expect from this class?",
      referralLabel: "How did you find out about this class?",
      questionsLabel: "Any questions for me?",
      notesLabel: "Anything else you want to share?"
    },
    // Kana Charts
    kana: {
      title: "Kana Charts",
      subtitle: "Interactive Hiragana & Katakana reference with audio pronunciation",
      hiragana: "Hiragana",
      katakana: "Katakana",
      clickToLearn: "Click any character to hear its pronunciation"
    },
    // Kanji Stroke Rules
    kanjiRules: {
      title: "Kanji",
      subtitle: "Understand what kanji is and how it works",
      intro: "Kanji is one of the three writing systems used in Japanese. Each character represents a meaning or concept, unlike hiragana and katakana which represent sounds.",
      whyTitle: "Why Learn Kanji?",
      whyPoint1: "Kanji makes reading Japanese possible. Hiragana alone cannot distinguish words like 橋 (bridge) from 箸 (chopsticks)",
      whyPoint2: "Even at N5 level, you will encounter about 100 kanji. That is why it is part of every JLPT level",
      whyPoint3: "Once you recognize kanji, vocabulary becomes easier. Many words are made of kanji combinations",
      radicalsTitle: "Common Radicals",
      radicalsIntro: "Radicals are the building blocks of kanji. Most kanji are composed of a radical (which gives a hint about meaning) and other components.",
      typesTitle: "Types of Kanji",
      onyomi: "Onyomi (Chinese Reading)",
      onyomiDesc: "The Chinese-derived pronunciation. Used in compound words.",
      kunyomi: "Kunyomi (Japanese Reading)",
      kunyomiDesc: "The native Japanese pronunciation. Often used when kanji stands alone.",
      subpage1Title: "Stroke Order",
      subpage1Subtitle: "Learn the correct way to write kanji",
      subpage2Title: "Radical",
      subpage2Subtitle: "Learn about kanji radicals and their meanings",
      subpage3Title: "Kanji in Names"
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
      postTitle: "Title",
      postSlug: "Slug",
      postExcerpt: "Excerpt",
      postContent: "Content",
      postTags: "Tags (comma separated)",
      savePost: "Save Post",
      cancel: "Cancel",
      confirmDelete: "Are you sure you want to delete this post?",
      signupsTitle: "Class Signups",
      createNewPost: "Create New Post",
      editPostTitle: "Edit Post",
      readingTime: "Reading Time (minutes)",
      tagsPlaceholder: "n5, grammar, mindset",
      tagsHint: "Press Enter or comma to add a tag",
      contentEnLabel: "Content (English) * - Markdown supported",
      contentMyLabel: "Content (Malay)",
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
      requiredFields: "Please fill in all required fields (English title, slug, excerpt, content).",
      postSaved: "Post saved successfully!",
      postSavedLocal: "Post saved locally (Supabase not configured). It will appear on this device.",
      fillAllRequired: "Please fill in all required fields."
    },
    // Anki & Vocab Mining
    anki: {
      title: "Anki & Vocab Mining",
      subtitle: "Recommended decks and how to mine vocabulary from native content",
      howItWorks: "How Anki Works",
      howItWorksDesc: "Anki is a spaced repetition system that helps you memorize anything efficiently. It works by showing you cards at increasing intervals just before you'd forget them. New cards appear once a day, and reviews are based on how well you remember each card. The more you struggle with a card, the more often it appears. This method, called spaced repetition, is proven to build long-term memory much faster than cramming.",
      recommendedDecks: "Recommended Decks",
      howToMine: "How to Mine Vocab",
      visit: "Visit"
    },
    // Self Study Guide
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
    // Comprehensible Input & Immersion
    immersion: {
      title: "Comprehensible Input & Immersion",
      subtitle: "How to acquire Japanese through immersion and comprehensible input"
    },
    // Using AI
    selfStudyAI: {
      title: "Using AI for Japanese Learning",
      subtitle: "How to use AI tools effectively to accelerate your Japanese learning"
    }
  },

  my: {
    // Navigation
    nav: {
      intro: "Laman Utama",
      kana: "Hiragana & Katakana",
      kanjiRules: "Kanji",
      anki: "Anki & Lombong Vocab",
      roadmap: "Laluan Pembelajaran",
      introduction: "Pengenalan",
      selfStudy: "Panduan Belajar Sendiri",
      culture: "Pelajaran Budaya",
      blog: "Blog",
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
    // Homepage
    home: {
      heroTag: "Konnichiwa! こんにちは",
      heroTitle: "Panduan anda belajar bahasa Jepun dengan cara yang betul",
      heroSubtitle: "Semua yang anda perlukan untuk belajar bahasa Jepun secara efektif.",
      featuredTitle: "Kandungan Pilihan",
      whyTitle: "Bagaimana kami bantu anda",
      whyPoint1Title: "Tak ada lagi scroll YouTube tak ingat arah",
      whyPoint1Desc: "Kami beri anda jalan yang jelas. Follow roadmap dari zero ke boleh converse, atau mula di tahap mana pun anda sekarang.",
      whyPoint2Title: "Belajar apa yang perlu",
      whyPoint2Desc: "Panduan dan sumber yang benar-benar bantu korang belajar, bukan sekadar baca je.",
      whyPoint3Title: "Faham budaya untuk faham bahasa",
      whyPoint3Desc: "Bahasa Jepun masuk akal bila anda faham kenapa ia macamtu. Kami ajar melalui konteks  perayaan, kehidupan harian, hiburan.",
      quickNavTitle: "Pautan Pantas",
      quickNavSubtitle: "Pilih seksyen dan mulakan",
      ctaWhereStart: "Tak pasti nak mula dari mana?",
      ctaTakeQuiz: "Ambik kuiz semakan tahap cepat kami"
    },
    // Roadmap
    roadmap: {
      title: "Roadmap Pembelajaran Bahasa Jepun",
      intro: "Panduan langkah demi langkah untuk bawa anda dari zero ke tahap pertengahan (N3) dan ke semua yang lain. Klik pada setiap fasa untuk perincian fokus pembelajaran.",
      disclaimer: "⚠️ Anggaran masa ni adalah berdasarkan anda konsisten belajar setiap hari (1-2 jam). Progress sebenar bergantung pada konsistensi, bukan intensity.",
      smallKana: {
        title: "Perkataan Katakana Asing",
        subtitle: "Kana kecil untuk bunyi asing",
        desc: "Katakana gunakan aksara kecil (ァ, ィ, ゥ, ェ, ォ) untuk tulis perkataan asing. Kombinasi ini cipta bunyi yang tak ada dalam bahasa Jepun tradisional.",
        examplesTitle: "Contoh Biasa",
        examples: [
          { kana: "ヴァ", romaji: "va", used: "credit card (Visa)" },
          { kana: "ヴィ", romaji: "vi", used: "vista (View)" },
          { kana: "ヴェ", romaji: "ve", used: "vehicle (Véhiculo)" },
          { kana: "ヴォ", romaji: "vo", used: "voice (Voice)" },
          { kana: "ウィ", romaji: "wi", used: "whisky (ウィスキー)" },
          { kana: "ウェ", romaji: "we", used: "wedding (ウェディング)" },
          { kana: "ウォ", romaji: "wo", used: "work (ワーク)" },
          { kana: "ティ", romaji: "ti", used: "t-shirt (ティーシャツ)" },
          { kana: "ディ", romaji: "di", used: "Disney (迪士尼)" },
          { kana: "ドゥ", romaji: "du", used: "downtown (ダウンタウン)" },
          { kana: "チェ", romaji: "che", used: "check (チェック)" },
          { kana: "ジェ", romaji: "je", used: "jet (ジェット)" },
          { kana: "シェ", romaji: "she", used: "shake (シェイク)" },
          { kana: "ツァ", romaji: "tsa", used: "Arizona (アリゾナ)" },
          { kana: "ファ", romaji: "fa", used: "family (ファミリー)" },
          { kana: "フィ", romaji: "fi", used: "filter (フィルター)" },
          { kana: "フェ", romaji: "fe", used: "Fender (フェンダー)" },
          { kana: "フォ", romaji: "fo", used: "folder (フォルダー)" },
        ],
        smallHiraganaTitle: "Hiragana Kecil (っ)",
        smallHiraganaDesc: "Small っ (tsu) gandakan konsonan selepasnya.  돌아 → もっと (motto), bukan とも (tomo)"
      },
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
      kana: {
        title: "Kana (Aksara Jepun)",
        desc: "Belajar Hiragana dan Katakana dari sifar.",
        duration: "2 - 3 Minggu",
        activity: "Reading only",
        focusTitle: "Fokus Pembelajaran:",
        items: [
          "Hiragana dan Katatakana (reading, bukan writing dulu)",
          "Dakuon, Handakuon, Yoon sounds",
          "Membaca perkataan dan frasa ringkas"
        ],
        subpage1Title: "Vokal Panjang",
        subpage1Subtitle: "Belajar cara memanjangkan bunyi vokal (chōon / 長音)",
        subpage2Title: "Tenten & Maru",
        subpage2Subtitle: "Fahami dakuten (濁点) dan handakuten (半濁点)",
        subpage3Title: "Small Characters",
        subpage3Subtitle: "Learn small kana (ァ, ィ, ォ, っ, ゃ, ゅ, ょ) that modify sounds",
        // Long Vowel content (MY)
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
          exKa: "Dari カ (ka) + ー",
          exKaWord: "kereta",
          exKi: "Dari キ (ki) + ー",
          exKiWord: "kunci",
          exKu: "Dari ク (ku) + ー",
          exKuWord: "udara",
          exShiito: "Dari キ (ki) + ー + パ (pa) + ー",
          exShiitoWord: "penjaga gol",
          exTerebi: "Dari テ (te) + レ (re) + ビ (bi)",
          exTerebiWord: "televisyen"
        },
        // Tenten & Maru content (MY)
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
        subpage3: {
          sokuonTitle: "Sokuon (っ) - Penggandaan Konsonan",
          sokuonDetail: "Sokuon (促音) adalah っ kecil (atau ッ dalam katakana) yang menghasilkan jeda singkat atau bunyi \"konsonan berganda\". っ dikira sebagai 1 mora penuh walaupun tidak berbunyi — ia hanya menambah hentian singkat sebelum konsonan berikutnya.",
          yoonTitle: "Yōon (ゃ, ゅ, ょ)",
          yoonSmallTitle: "Yōon (ゃ, ゅ, ょ)",
          yoonDesc: "Yōon (拗音) adalah gabungan bunyi apabila ゃ, ゅ, atau ょ kecil mengikuti kana baris い (き, し, ち, に, ひ, み, り, ぎ, じ, び, ぴ) untuk membentuk satu bunyi baharu. Kana biasa + ゃ/ゅ/ょ kecil bergabung menjadi satu bunyi dan anda tidak menyebutnya secara berasingan."
        }
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
          "Existence (いる/ある), possession, past tense",
          "Basic Keigo (bahasa sopan)",
          "~100 Kanji N5 (nombor, hari, masa, arah)",
          "~800 vocab esencial"
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
          "Daily immersion: apa nak tengok, baca, dengar"
        ]
      },
      n4bridge: {
        title: "N4 Grammar + Vocab",
        desc: "Bina atas asas N5 dengan tatabahasa dan vocabulary pertengahan.",
        duration: "3 - 4 Bulan",
        activity: "~300 Kanji | ~3,000 Vocab",
        focusTitle: "Fokus Pembelajaran:",
        items: [
          "Conditionals (たら, なら, ば)",
          "Causative + causative-passive",
          "Casual vs polite speech register",
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
          "Passive, causative-passive, potential forms",
          "Keigo refinement",
          "~400 Kanji total",
          "Native content with subtitles, dengar natural speech"
        ]
      },
      n2prep: {
        title: "N2 Prep + Sustained Immersion",
        desc: "Pipeline ke N2 dengan immersion sebagai lifestyle.",
        duration: "Ongoing",
        activity: "Complex Keigo | Advanced Structures",
        focusTitle: "Fokus Pembelajaran:",
        items: [
          "Complex keigo dan advanced sentence structures",
          "Reading unformatted text (novels, articles)",
          "Immersion as lifestyle",
          "N2 prep and practice"
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
    // Introduction Page
    introduction: {
      title: "Pengenalan kepada Bahasa Jepun",
      subtitle: "Langkah pertama anda untuk memahami bahasa Jepun",
      welcomeTitle: "Apa itu Bahasa Jepun?",
      welcomeDesc: "Bahasa Jepun dituturkan oleh kira-kira 130 juta orang di Jepun dan komuniti Jepun di seluruh dunia. Ia tergolong dalam keluarga bahasa Japonic, yang tidak mempunyai hubungan geneologis yang luas diterima dengan mana-mana keluarga bahasa lain.",
      writingTitle: "Sistem Penulisan",
      writingDesc: "Bahasa Jepun menggunakan tiga sistem penulisan digabungkan:",
      writingPoint1: "Hiragana - Digunakan untuk perkataan asli Jepun dan unsur tatabahasa",
      writingPoint2: "Katakana - Digunakan untuk perkataan asing, penekanan, dan onomatopoeia",
      writingPoint3: "Kanji - Aksara Cina yang diterima pakai untuk Jepun, digunakan untuk kata nama dan punca kata kerja",
      structureTitle: "Struktur Bahasa",
      structureDesc: "Bahasa Jepun mempunyai struktur yang berbeza dari Bahasa Inggeris:",
      structurePoint1: "Tertib Subjek-Objek-Kata Kerja (SOV) bukan SVO",
      structurePoint2: "Tiada ruang antara perkataan",
      structurePoint3: "Tahap kesopanan yang kompleks (keigo) berdasarkan hierarki sosial",
      structurePoint4: "Tiada jantina tatabahasa atau kata ganda",
      soundTitle: "Sistem Bunyi",
      soundDesc: "Bahasa Jepun mempunyai sistem fonologi yang agak mudah:",
      soundPoint1: "Hanya 5 bunyi vokal (a, i, u, e, o)",
      soundPoint2: "Tiada kluster konsonan (cth: \"st\", \"tr\", \"gl\")",
      soundPoint3: "Setiap suku kata lebih kurang sama panjang",
      soundPoint4: "Nilai nada bukan tekanan aksen (berbeza mengikut dialek)",
      tipTitle: "Tip Pembelajaran",
      tipDesc: "Jangan cuba menterjemah perkataan demi perkataan dari Bahasa Inggeris. Sebaliknya, cuba fahami konsep dan corak dalam konteks Jepun mereka.",
      ctaRoadmap: "Belajar Hiragana & Katakana"
    },
    // Culture/Vocab
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
      vocabulary: "Vocabulary",
      culturalNotes: "Nota Budaya",
      tryQuiz: "Cuba Kuiz"
    },
    // Blog & Culture (Combined)
    blogCulture: {
      title: "Blog & Budaya",
      subtitle: "Artikel, pelajaran, dan kandungan panjang tentang pembelajaran dan budaya Jepun.",
      filterAll: "Semua",
      filterBlog: "Blog",
      filterCulture: "Budaya",
      blog: "Blog",
      culture: "Budaya"
    },
    // Resources
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
        browserSubtitle: "Sambungan Pelayar (Subtitle)",
        media: "Streaming",
        podcasts: "Podcast",
        youtubeLearning: "YT untuk Belajar Jepun",
        youtubeImmersion: "YT untuk Penyerapan",
        youtubePopular: "YT Channel Popular",
        practice: "Latihan Bertutur",
        translator: "Penterjemah",
        discordServers: "Discord Servers",
        askQuestions: "Tanya Soalan",
        articles: "Artikel Jepun",
        otherResources: "Sumber Lain"
      },
      visit: "Lawati"
    },
    // About
    about: {
      title: "Tentang Saya",
      subtitle: "Kaedah yang sebenarnya berkesan, dari seseorang yang sudah cuba semua.",
      storyTitle: "Tentang Saya",
      storyContent: "Hi, saya <strong>Uthman</strong>, student Jepun macam korang! Saya tahu betapa frustrasinya belajar Jepun bila kanji macam garis rawak, grammar tak masuk akal, dan nothing stays in your head.<br><br>Saya mula belajar Jepun pada 2018 tapi <strong>berhenti</strong> selepas beberapa bulan. Kanji kelihatan seram, dan saya tak nampak bagaimana ia akan melekat. Selepas rehat lama, saya decide untuk <strong>paksa belajar</strong>  dan tak jadi seberat yang saya bayang.<br><br>Sejak 2021, saya belajar secara on and off sebab busy dengan universiti, tapi sampai <strong>mid 2025</strong> baru semuanya masuk. Saya mula konsum kandungan Jepun <strong>setiap hari</strong>  sama ada Hololive streams, J-drama, apa je yang saya boleh jejek dalam bahasa tu. Pemahaman saya meningkat banyak dengan flashcards dan SRS (Spaced Repetition System).<br><br>Kalau korang serius nak belajar, <strong>sertai kelas saya</strong> dan kita belajar sama-sama.",
      connectTitle: "Sambung",
      followThreads: "Ikuti di Threads",
      joinCommunity: " Sertai Komuniti"
    },
    // Footer
    footer: {
      tagline: "Belajar Jepun dengan cara yang betul"
    },
    // Signup Modal
    signup: {
      title: "Nak kelas Jepun?",
      subtitle: "Isi form ni, saya akan contact korang dalam 24 jam",
      name: "Nama",
      age: "Umur",
      phone: "No Telefon",
      currentLevel: "Tahap Jepun Sekarang",
      classType: "Saya nak kelas",
      selectClass: "Pilih jenis kelas",
      oneOnOne: "1 on 1 (RM200/bulan)",
      group: "Berkumpulan (RM150/bulan)",
      schedule: "Pilih hari dan masa yang available",
      submit: "Hantar",
      required: "* Ruangan required",
      success: "Berjaya! Saya akan contact korang soon.",
      error: "Something went wrong. Try again.",
      signupSuccess: "Signup berjaya!",
      signupError: "Something went wrong. Please try again.",
      joinClassBtn: "Nak kelas?",
      section1Title: "Status Semasa",
      section2Title: "Latar Belakang & Pengalaman",
      section3Title: "Motivasi & Matlamat",
      section4Title: "Mindset & Jangkaan",
      section5Title: "Hampir Siap!",
      next: "Seterusnya",
      back: "Kembali",
      selectScheduleError: "Sila pilih sekurang-kurangnya satu slot masa.",
      fillAllRequired: "Sila isi semua ruangan yang diperlukan.",
      studiedBeforeLabel: "Pernah belajar Jepun sebelum ni?",
      studiedHowLabel: "Berapa lama? Apa kaedah yang digunakan?",
      jlptTakenLabel: "Pernah ambil JLPT sebelum ni?",
      jlptLevelLabel: "Level mana yang anda lulus?",
      resourcesLabel: "Apa sumber yang pernah digunakan? (buku, app, website)",
      exposureLabel: "Kandungan Jepun apa yang anda konsum selain belajar?",
      whyJapaneseLabel: "Kenapa anda nak belajar Jepun?",
      goalLabel: "Apakah matlamat utama anda?",
      goalJlpt: "Lulus JLPT (sijil)",
      goalFluency: "Boleh conversation dengan fluent",
      goalTravel: "Travel / Tinggal di Jepun",
      goalWork: "Kerja / Business",
      goalAnime: "Nak faham anime / manga mentah",
      goalUniversity: "Syarat universiti",
      goalCulture: "Minat budaya",
      goalOther: "Lain",
      studyHoursLabel: "Berapa jam seminggu boleh commitment untuk belajar?",
      studyHours14: "1-3 jam",
      studyHours47: "4-7 jam",
      studyHours814: "8-14 jam",
      studyHours15: "15+ jam",
      activitiesLabel: "Aktiviti pembelajaran apa yang anda enjoy?",
      quitBeforeLabel: "Pernah cuba belajar Jepun sebelum ni dan quit?",
      quitReasonLabel: "Kenapa anda rasa anda quit? Apa yang berbeza kali ni?",
      challengesLabel: "Apa challenge yang anda expect?",
      learningStyleLabel: "Bagaimana anda belajar paling best?",
      styleVisual: "Visual (membaca, chart)",
      styleAuditory: "Auditori (mendengar)",
      styleReading: "Membaca / Menulis",
      stylePractice: "Hands-on practice",
      expectationsLabel: "Apa yang anda expect dari kelas ni?",
      referralLabel: "Macam mana anda tahu tentang kelas ni?",
      questionsLabel: "Soalan untuk saya?",
      notesLabel: "Apa-apa lagi yang nak dikongsi?"
    },
    // Common
    common: {
      loading: "Memuatkan...",
      error: "Sesuatu tidak kena",
      close: "Tutup",
      back: "Kembali",
      next: "Seterusnya",
      previous: "Sebelumnya",
      learnMore: "Ketahui Lagi",
      start: "Mula",
      continue: "Teruskan",
      comingSoon: "Akan datang soon...",
      // Theme
      darkMode: "Mod Gelap",
      lightMode: "Mod Cahaya",
      // Status
      success: "Berjaya!",
      audioNotSupported: "Pelayar anda tidak sokong audio.",
      // Validation
      submitting: "Menghantar..."
    },
    // Kana Charts
    kana: {
      title: "Jadual Kana",
      subtitle: "Rujukan interaktif Hiragana & Katakana dengan sebutan audio",
      hiragana: "Hiragana",
      katakana: "Katakana",
      clickToLearn: "Klik mana-mana aksara untuk dengar sebutan"
    },
    // Kanji Stroke Rules
    kanjiRules: {
      title: "Kanji",
      subtitle: "Fahami apakah kanji dan bagaimana ia berfungsi",
      intro: "Kanji adalah satu daripada tiga sistem penulisan yang digunakan dalam bahasa Jepun. Setiap aksara mewakili satu makna atau konsep, berbeza dengan hiragana dan katakana yang mewakili bunyi.",
      whyTitle: "Kenapa Belajar Kanji?",
      whyPoint1: "Kanji menjadikan pembacaan bahasa Jepun mungkin. Hiragana sahaja tidak boleh membezakan perkataan seperti 橋 (jambatan) daripada 箸 (筷子)",
      whyPoint2: "Walaupun di tahap N5, anda akan Jumpai lebih kurang 100 kanji. Itulah sebabnya ia adalah sebahagian daripada setiap tahap JLPT",
      whyPoint3: "Sebaik sahaja anda mengenali kanji, vocabulary menjadi lebih mudah. Banyak perkataan diperbuat daripada kombinasi kanji",
      radicalsTitle: "Radikal Biasa",
      radicalsIntro: "Radikal adalah blok bangunan kanji. Kebanyakan kanji terdiri daripada radikal (yang memberikan petunjuk tentang makna) dan komponen lain.",
      typesTitle: "Jenis-jenis Kanji",
      onyomi: "Onyomi (Bacaan Cina)",
      onyomiDesc: "Pengelasan bunyi daripada Cina. Digunakan dalam perkataan kompaun.",
      kunyomi: "Kunyomi (Bacaan Jepun)",
      kunyomiDesc: "Pengelasan bunyi asli Jepun. Sering digunakan apabila kanji berdiri sendiri.",
      subpage1Title: "Susunan Loretan",
      subpage1Subtitle: "Belajar cara yang betul untuk menulis kanji",
      subpage2Title: "Radikal",
      subpage2Subtitle: "Pelajari tentang radikal kanji dan maknanya",
      subpage3Title: "Kanji dalam Nama"
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
      editPost: "Edit",
      deletePost: "Delete",
      postTitle: "Tajuk",
      postSlug: "Slug",
      postExcerpt: "Excerpt",
      postContent: "Kandungan",
      postTags: "Tags (comma separated)",
      savePost: "Simpan Post",
      cancel: "Batal",
      confirmDelete: "Betul nak delete post ni?",
      signupsTitle: "Signup Kelas",
      createNewPost: "Buat Post Baru",
      editPostTitle: "Edit Post",
      readingTime: "Masa baca (minit)",
      tagsPlaceholder: "n5, tatabahasa, mindset",
      tagsHint: "Tekan Enter atau koma untuk tambah tag",
      contentEnLabel: "Kandungan (English) * - Markdown supported",
      contentMyLabel: "Kandungan (Malay)",
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
      requiredFields: "Sila isi semua ruangan yang diperlukan (tajuk English, slug, excerpt, content).",
      postSaved: "Post berjaya disimpan!",
      postSavedLocal: "Post disimpan secara lokal (Supabase tak dikonfiguras). Ia akan muncul pada peranti ini.",
      fillAllRequired: "Sila isi semua ruangan yang diperlukan."
    },
    // Anki & Vocab Mining
    anki: {
      title: "Anki & Lombong Vocab",
      subtitle: "Dek yang disyorkan dan cara mining vocabulary dari kandungan asli",
      howItWorks: "Bagaimana Anki Berfungsi",
      howItWorksDesc: "Anki adalah sistem repetisi jarak yang bantu anda menghafal apa-apa dengan efisien. Ia berfungsi dengan menunjukkan kad pada selang yang meningkat tepat sebelum anda lupa. Kad baru muncul sekali sehari, dan ulangkaji berdasarkan betapa bagus anda ingat setiap kad. Lebih anda挣扎 dengan kad, lebih kerap ia muncul. Kaedah ini, dipanggil repetisi jarak, terbukti bina memori jangka panjang lebih cepat daripada cram.",
      recommendedDecks: "Dek Disyorkan",
      howToMine: "Cara Mining Vocab",
      visit: "Lawati"
    },
    // Self Study Guide
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
          desc: "Pemerolehan bahasa ambil masa. Trust the process dan jangan bandingkan diri dengan orang lain."
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
        mining: "Mining vocabulary dari kandungan yang anda enjoy  ia buat pembelajaran rasa kurang macam study.",
        shadowing: "Practice shadowing (ulang selepas penutur) untuk improve sebutan dan kelancaran pertuturan.",
        writing: "Keep diary Jepun guna notes app kat telefon. Malah ayat simple bantu reinforce apa yang anda dah belajar.",
        thinking: "Cuba think dalam Jepun masa kehidupan harian. Huraikan objek di sekeliling anda dalam kepala."
      }
    },
    // Comprehensible Input & Immersion
    immersion: {
      title: "Input Boleh Difahami & Penyerapan",
      subtitle: "Bagaimana untuk memperoleh Jepun melalui penjerapan dan input yang boleh difahami"
    },
    // Using AI
    selfStudyAI: {
      title: "Menggunakan AI untuk Pembelajaran Jepun",
      subtitle: "Bagaimana untuk menggunakan alat AI dengan berkesan untuk mempercepat pembelajaran Jepun anda"
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
