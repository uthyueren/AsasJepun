export const KANA_DATA = {
  hiragana: [
    // gojūon: rows=vowels(a,i,u,e,o), cols=consonants
    { kana: "あ", romaji: "a", example: "朝 (asa) - morning" },          // 0
    { kana: "い", romaji: "i", example: "犬 (inu) - dog" },               // 1
    { kana: "う", romaji: "u", example: "海 (umi) - sea" },               // 2
    { kana: "え", romaji: "e", example: "駅 (eki) - station" },          // 3
    { kana: "お", romaji: "o", example: "美味しい (oishii) - delicious" },// 4

    { kana: "か", romaji: "ka", example: "傘 (kasa) - umbrella" },       // 5
    { kana: "き", romaji: "ki", example: "切符 (kippu) - ticket" },    // 6
    { kana: "く", romaji: "ku", example: "車 (kuruma) - car" },          // 7
    { kana: "け", romaji: "ke", example: "携帯 (keitai) - phone" },      // 8
    { kana: "こ", romaji: "ko", example: "声 (koe) - voice" },          // 9

    { kana: "さ", romaji: "sa", example: "魚 (sakana) - fish" },        // 10
    { kana: "し", romaji: "shi", example: "塩 (shio) - salt" },         // 11
    { kana: "す", romaji: "su", example: "寿司 (sushi) - sushi" },     // 12
    { kana: "せ", romaji: "se", example: "先生 (sensei) - teacher" },  // 13
    { kana: "そ", romaji: "so", example: "空 (sora) - sky" },           // 14

    { kana: "た", romaji: "ta", example: "卵 (tamago) - egg" },         // 15
    { kana: "ち", romaji: "chi", example: "地図 (chizu) - map" },       // 16
    { kana: "つ", romaji: "tsu", example: "机 (tsukue) - desk" },      // 17
    { kana: "て", romaji: "te", example: "手紙 (tegami) - letter" },   // 18
    { kana: "と", romaji: "to", example: "友達 (tomodachi) - friend" },// 19

    { kana: "な", romaji: "na", example: "夏 (natsu) - summer" },       // 20
    { kana: "に", romaji: "ni", example: "肉 (niku) - meat" },          // 21
    { kana: "ぬ", romaji: "nu", example: "ぬいぐるみ (nuigurumi) - plush toy" }, // 22
    { kana: "ね", romaji: "ne", example: "猫 (neko) - cat" },           // 23
    { kana: "の", romaji: "no", example: "飲み物 (nomimono) - drink" },// 24

    { kana: "は", romaji: "ha", example: "花 (hana) - flower" },         // 25
    { kana: "ひ", romaji: "hi", example: "飛行機 (hikouki) - airplane" },// 26
    { kana: "ふ", romaji: "fu", example: "船 (fune) - ship" },          // 27
    { kana: "へ", romaji: "he", example: "部屋 (heya) - room" },        // 28
    { kana: "ほ", romaji: "ho", example: "本 (hon) - book" },           // 29

    { kana: "ま", romaji: "ma", example: "窓 (mado) - window" },       // 30
    { kana: "み", romaji: "mi", example: "水 (mizu) - water" },         // 31
    { kana: "む", romaji: "mu", example: "虫 (mushi) - insect" },      // 32
    { kana: "め", romaji: "me", example: "眼鏡 (megane) - glasses" },   // 33
    { kana: "も", romaji: "mo", example: "森 (mori) - forest" },       // 34

    // ya-row: a(35), i(36), u(37) — only ya, yu, yo
    { kana: "や", romaji: "ya", example: "山 (yama) - mountain" },     // 35
    { kana: "ゆ", romaji: "yu", example: "雪 (yuki) - snow" },          // 36
    { kana: "よ", romaji: "yo", example: "夜 (yoru) - night" },         // 37

    { kana: "ら", romaji: "ra", example: "ラジオ (rajio) - radio" },   // 38
    { kana: "り", romaji: "ri", example: "林檎 (ringo) - apple" },     // 39
    { kana: "る", romaji: "ru", example: "留守 (rusu) - absence" },     // 40
    { kana: "れ", romaji: "re", example: "冷蔵庫 (reizouko) - fridge" },// 41
    { kana: "ろ", romaji: "ro", example: "蝋燭 (rousoku) - candle" },   // 42

    // wa-row: a(43), o(44) — を is particle in o-column, ん is n-row(45)
    { kana: "わ", romaji: "wa", example: "私 (watashi) - I/me" },      // 43
    { kana: "を", romaji: "wo", example: "本を読む (hon o yomu) - read book" }, // 44
    { kana: "ん", romaji: "n", example: "日本 (nihon) - Japan" },      // 45
  ],
  katakana: [
    { kana: "ア", romaji: "a", example: "アメリカ (amerika) - America" },     // 0
    { kana: "イ", romaji: "i", example: "イギリス (igirisu) - UK" },        // 1
    { kana: "ウ", romaji: "u", example: "ウイスキー (uisukii) - whisky" },  // 2
    { kana: "エ", romaji: "e", example: "エアコン (eakon) - aircon" },      // 3
    { kana: "オ", romaji: "o", example: "オレンジ (orenji) - orange" },    // 4

    { kana: "カ", romaji: "ka", example: "カメラ (kamera) - camera" },   // 5
    { kana: "キ", romaji: "ki", example: "ギター (gitaa) - guitar" },     // 6
    { kana: "ク", romaji: "ku", example: "クラス (kurasu) - class" },    // 7
    { kana: "ケ", romaji: "ke", example: "ケーキ (keeki) - cake" },      // 8
    { kana: "コ", romaji: "ko", example: "コーヒー (koohii) - coffee" },   // 9

    { kana: "サ", romaji: "sa", example: "サラダ (sarada) - salad" },    // 10
    { kana: "シ", romaji: "shi", example: "シャツ (shatsu) - shirt" },  // 11
    { kana: "ス", romaji: "su", example: "スポーツ (supootsu) - sports" },// 12
    { kana: "セ", romaji: "se", example: "セーター (seetaa) - sweater" },// 13
    { kana: "ソ", romaji: "so", example: "ソファ (sofa) - sofa" },     // 14

    { kana: "タ", romaji: "ta", example: "タクシー (takushii) - taxi" },// 15
    { kana: "チ", romaji: "chi", example: "チーズ (chiizu) - cheese" },// 16
    { kana: "ツ", romaji: "tsu", example: "ツアー (tsuaa) - tour" },   // 17
    { kana: "テ", romaji: "te", example: "テレビ (terebi) - TV" },     // 18
    { kana: "ト", romaji: "to", example: "トイレ (toire) - toilet" },   // 19

    { kana: "ナ", romaji: "na", example: "ナイフ (naifu) - knife" },   // 20
    { kana: "ニ", romaji: "ni", example: "ニュース (nyuusu) - news" }, // 21
    { kana: "ヌ", romaji: "nu", example: "ヌードル (nuudoru) - noodle" },// 22
    { kana: "ネ", romaji: "ne", example: "ネクタイ (nekutai) - necktie" },// 23
    { kana: "ノ", romaji: "no", example: "ノート (nooto) - notebook" }, // 24

    { kana: "ハ", romaji: "ha", example: "ハム (hamu) - ham" },         // 25
    { kana: "ヒ", romaji: "hi", example: "ヒーロー (hiiroo) - hero" },   // 26
    { kana: "フ", romaji: "fu", example: "フォーク (fooku) - fork" },   // 27
    { kana: "ヘ", romaji: "he", example: "ヘリコプター (herikoputaa) - helicopter" },// 28
    { kana: "ホ", romaji: "ho", example: "ホテル (hoteru) - hotel" },   // 29

    { kana: "マ", romaji: "ma", example: "マフラー (mafuraa) - muffler" },// 30
    { kana: "ミ", romaji: "mi", example: "ミルク (miruku) - milk" },   // 31
    { kana: "ム", romaji: "mu", example: "ムーン (muun) - moon" },// 32
    { kana: "メ", romaji: "me", example: "メール (meeru) - email" },   // 33
    { kana: "モ", romaji: "mo", example: "モニター (monitaa) - monitor" },// 34

    // ya-row: a(35), i(36), u(37)
    { kana: "ヤ", romaji: "ya", example: "ヤク (yaku) - yak" },         // 35
    { kana: "ユ", romaji: "yu", example: "ユニフォーム (yunifoomu) - uniform" },// 36
    { kana: "ヨ", romaji: "yo", example: "ヨーグルト (yooguruto) - yogurt" },// 37

    { kana: "ラ", romaji: "ra", example: "ラジオ (rajio) - radio" },   // 38
    { kana: "リ", romaji: "ri", example: "リボン (ribon) - ribbon" },   // 39
    { kana: "ル", romaji: "ru", example: "ルール (ruuru) - rule" },     // 40
    { kana: "レ", romaji: "re", example: "レストラン (resutoran) - restaurant" },// 41
    { kana: "ロ", romaji: "ro", example: "ロボット (robotto) - robot" },// 42

    // wa-row: a(43), o(44), n-row(45)
    { kana: "ワ", romaji: "wa", example: "ワイン (wain) - wine" },       // 43
    { kana: "ヲ", romaji: "wo", example: "ヲタ (wota) - otaku" },      // 44
    { kana: "ン", romaji: "n", example: "パン (pan) - bread" },         // 45
  ]
};

export const JLPT_DATA = {
  n5: {
    title: "JLPT N5 - Basic",
    description: "Master the fundamentals of Japanese. At N5 level, you will learn basic grammar, approximately 100 kanji, and around 800 vocabulary words.",
    kanji: [
      { kanji: "日", meaning: "day, sun", onyomi: "ニチ, ジツ", kunyomi: "ひ, -び", strokes: 4, example: "日本 (Nihon - Japan)" },
      { kanji: "月", meaning: "month, moon", onyomi: "ゲツ, ガツ", kunyomi: "つき", strokes: 4, example: "今月 (Kongetsu - this month)" },
      { kanji: "火", meaning: "fire", onyomi: "カ", kunyomi: "ひ", strokes: 4, example: "火事 (Kaji - fire)" },
      { kanji: "水", meaning: "water", onyomi: "スイ", kunyomi: "みず", strokes: 4, example: "水泳 (Suiei - swimming)" },
      { kanji: "木", meaning: "tree, wood", onyomi: "モク, ボク", kunyomi: "き", strokes: 4, example: "木村 (Kimura - tree village)" },
      { kanji: "金", meaning: "gold, money", onyomi: "キン, コン", kunyomi: "かね", strokes: 8, example: "お金 (Okane - money)" },
      { kanji: "土", meaning: "earth, soil", onyomi: "ド, ト", kunyomi: "つち", strokes: 3, example: "土地 (Tochi - land)" },
      { kanji: "人", meaning: "person", onyomi: "ジン, ニン", kunyomi: "ひと", strokes: 2, example: "日本人 (Nihonjin - Japanese person)" },
      { kanji: "大口", meaning: "big mouth", onyomi: "ダイコウ", kunyomi: "おおかみ", strokes: 3, example: "大口 (Daiguchi - a lot)" },
      { kanji: "入", meaning: "enter", onyomi: "ニュウ", kunyomi: "はい.る", strokes: 2, example: "入口 (Iriguchi - entrance)" },
      { kanji: "出", meaning: "exit, leave", onyomi: "シュツ", kunyomi: "で.る", strokes: 5, example: "出口 (Deguchi - exit)" },
      { kanji: "九", meaning: "nine", onyomi: "キュウ, ク", kunyomi: "ここの", strokes: 2, example: "九時 (Kuji - nine o'clock)" },
      { kanji: "十", meaning: "ten", onyomi: "ジュウ", kunyomi: "とお", strokes: 2, example: "十歳 (Jussai - ten years old)" },
      { kanji: "百年", meaning: "hundred years", onyomi: "ヒャクネン", kunyomi: "百年", strokes: 5, example: "百年 (Hakunen - hundred years)" },
    ],
    grammar: [
      {
        slug: "n5-ga",
        title: { en: "が (Ga) - Subject Marker", my: "が (Ga) - Penanda Subjek" },
        level: "n5",
        formation: "N + が + Verb",
        explanation: { en: "が marks the subject of a sentence. It is used to identify who or what performs an action or exists in a state.", my: "が menandakan subjek dalam ayat. Ia digunakan untuk mengenal pasti siapa atau apa yang melakukan sesuatu tindakan atau wujud dalam sesuatu keadaan." },
        examples: { en: ["私が学生です。- Watashi ga gakusei desu. (I am a student.)", "猫がいます。- Neko ga imasu. (There is a cat.)"], my: ["私が学生です。- Saya adalah pelajar.", "猫がいます。- Ada kucing."] },
        commonMistakes: { en: "Don't confuse を (object marker) with が (subject marker). が identifies the subject, を marks the object.", my: "Jangan kelirukan を (penanda objek) dengan が (penanda subjek)." }
      },
      {
        slug: "n5-wa",
        title: { en: "は (Wa) - Topic Marker", my: "は (Wa) - Penanda Topik" },
        level: "n5",
        formation: "N + は + Predicate",
        explanation: { en: "は marks the topic of a sentence. It introduces what you are talking about, not necessarily who performs the action.", my: "は menandakan topik ayat. Ia memperkenalkan apa yang anda bicarakan." },
        examples: { en: ["私は先生です。- Watashi wa sensei desu. (As for me, I am a teacher.)", "日本人は親切です。- Nihonjin wa shinsetsu desu. (Japanese people are kind.)"], my: ["私は先生です。- Saya adalah cikgu.", "日本人は親切です。- Orang Jepun是很親切."] },
        commonMistakes: { en: "は is read as わ, not は in this grammatical context.", my: "は dibaca sebagai わ, bukan は dalam konteks tatabahasa ini." }
      },
      {
        slug: "n5-no",
        title: { en: "の (No) - Possessive/Connected Noun", my: "の (No) - Kepunyaan" },
        level: "n5",
        formation: "N1 + の + N2",
        explanation: { en: "の connects two nouns, showing that N2 belongs to N1 or is described by N1.", my: "の menghubungkan dua kata nama, menunjukkan N2 milik N1 atau diterangkan oleh N1." },
        examples: { en: ["先生の猫 - Sensei no neko (The teacher's cat)", "日本語の教室 - Nihongo no kyoushitsu (Japanese language classroom)"], my: ["先生の猫 - Kucing Cikgu", "日本語の教室 - Bilik Darjah Bahasa Jepun"] },
        commonMistakes: { en: "の does not work like English 'of'. 日本語の教室 means 'Japanese language classroom', not 'the classroom of Japanese'.", my: "の tidak berfungsi seperti 'of' dalam bahasa Inggeris." }
      },
      {
        slug: "n5-desu",
        title: { en: "です (Desu) - Polite Copula", my: "です (Desu) - Kata Kerja Serpolite" },
        level: "n5",
        formation: "N / Adj + です",
        explanation: { en: "です is a polite copula, equivalent to 'is/am/are'. It creates a polite sentence.", my: "です adalah kata kerja serpolite, bersamaan dengan 'is/am/are'." },
        examples: { en: ["私は学生です。- Watashi wa gakusei desu. (I am a student.)", "これは本です。- Kore wa hon desu. (This is a book.)"], my: ["私は学生です。- Saya pelajar.", "これは本です。- Ini adalah buku."] },
        commonMistakes: { en: "です does not mean 'to be' in a dynamic sense. Use でんしゃ (train) for actual being/staying somewhere.", my: "です tidak bermakna 'to be' dalam sense dinamik." }
      },
      {
        slug: "n5-kudasai",
        title: { en: "ください (Kudasai) - Please", my: "ください (Kudasai) - Sila/Tolong" },
        level: "n5",
        formation: "Verb (ます form) / N + を + ください",
        explanation: { en: "ください means 'please' and is used to make polite requests.", my: "ください bermakna 'tolong' dan digunakan untuk membuat permintaan yang sopan." },
        examples: { en: ["水をください。- Mizu o kudasai. (Please give me water.)", "見てください。- Mite kudasai. (Please look.)"], my: ["水をください。- Tolong bagi air.", "見てください。- Tolong lihat."] },
        commonMistakes: { en: "ください is a request, not a command. It is polite.", my: "ください adalah permintaan, bukan perintah." }
      },
    ],
    vocabulary: [
      { word: "日本", furigana: "にほん", romaji: "nihon", meaning: "Japan", type: "Noun" },
      { word: "人", furigana: "ひと", romaji: "hito", meaning: "person", type: "Noun" },
      { word: "学生", furigana: "がくせい", romaji: "gakusei", meaning: "student", type: "Noun" },
      { word: "先生", furigana: "せんせい", romaji: "sensei", meaning: "teacher", type: "Noun" },
      { word: "本", furigana: "ほん", romaji: "hon", meaning: "book", type: "Noun" },
      { word: "水", furigana: "みず", romaji: "mizu", meaning: "water", type: "Noun" },
      { word: "火", furigana: "ひ", romaji: "hi", meaning: "fire", type: "Noun" },
      { word: "山", furigana: "やま", romaji: "yama", meaning: "mountain", type: "Noun" },
      { word: "川", furigana: "かわ", romaji: "kawa", meaning: "river", type: "Noun" },
      { word: "日", furigana: "ひ", romaji: "hi", meaning: "day, sun", type: "Noun" },
      { word: "月", furigana: "つき", romaji: "tsuki", meaning: "month, moon", type: "Noun" },
      { word: "大きい", furigana: "おおきい", romaji: "ookii", meaning: "big", type: "Adjective" },
      { word: "小さい", furigana: "ちいさい", romaji: "chiisai", meaning: "small", type: "Adjective" },
      { word: "新しい", furigana: "あたらしい", romaji: "atarashii", meaning: "new", type: "Adjective" },
      { word: "古い", furigana: "ふるい", romaji: "furui", meaning: "old (thing)", type: "Adjective" },
      { word: "良い", furigana: "よい", romaji: "yoi", meaning: "good", type: "Adjective" },
      { word: "悪い", furigana: "わるい", romaji: "warui", meaning: "bad", type: "Adjective" },
      { word: "高い", furigana: "たかい", romaji: "takai", meaning: "expensive, tall", type: "Adjective" },
      { word: "低い", furigana: "ひくい", romaji: "hikui", meaning: "low, short", type: "Adjective" },
      { word: "食べる", furigana: "たべる", romaji: "taberu", meaning: "to eat", type: "Verb" },
      { word: "飲む", furigana: "のむ", romaji: "nomu", meaning: "to drink", type: "Verb" },
      { word: "見る", furigana: "みる", romaji: "miru", meaning: "to see, watch", type: "Verb" },
      { word: "行く", furigana: "いく", romaji: "iku", meaning: "to go", type: "Verb" },
      { word: "来る", furigana: "くる", romaji: "kuru", meaning: "to come", type: "Verb" },
      { word: "帰る", furigana: "かえる", romaji: "kaeru", meaning: "to return home", type: "Verb" },
    ]
  },
  n4: {
    title: "JLPT N4 - Elementary",
    description: "At N4 level, you will expand your grammar knowledge and learn approximately 300 kanji and 1,500 vocabulary words. You can understand basic Japanese used in daily situations.",
    kanji: [
      { kanji: "会", meaning: "meeting, association", onyomi: "カイ, エ", kunyomi: "あ.う", strokes: 6, example: "会社 (Kaisha - company)" },
      { kanji: "計", meaning: "measure, plan", onyomi: "ケイ", kunyomi: "はか.る", strokes: 9, example: "時計 (Tokei - clock)" },
      { kanji: "今夜", meaning: "tonight", onyomi: "コヤ", kunyomi: "こよ", strokes: 8, example: "今夜 (Konya - tonight)" },
      { kanji: "語", meaning: "language, word", onyomi: "ゴ", kunyomi: "かた.る", strokes: 14, example: "日本語 (Nihongo - Japanese language)" },
      { kanji: "文", meaning: "sentence, literature", onyomi: "ブン, モン", kunyomi: "ふみ", strokes: 4, example: "文化 (Bunka - culture)" },
      { kanji: "理", meaning: "reason, logic", onyomi: "リ", kunyomi: "ことわり", strokes: 11, example: "料理 (Ryouri - cooking)" },
      { kanji: "学", meaning: "study, learning", onyomi: "ガク", kunyomi: "まな.ぶ", strokes: 8, example: "学生 (Gakusei - student)" },
      { kanji: "校", meaning: "school", onyomi: "コウ", kunyomi: "", strokes: 10, example: "学校 (Gakkou - school)" },
    ],
    grammar: [
      {
        slug: "n4-tara",
        title: { en: "〜たら (tara) - If/When", my: "〜たら - Kalau/Sebaik" },
        level: "n4",
        formation: "Verb た-form + ら",
        explanation: { en: "〜たら expresses a conditional meaning 'if' or 'when (something happened).'", my: "〜たら menyatakan syarat bermakna 'jika' atau 'bila (sesuatu berlaku).'" },
        examples: { en: ["日本に行ったら、お土産をを買います。- Nihon ni ittara, omiyage o kaimasu. (If I go to Japan, I will buy souvenirs.)", "終わったら、电话してください。- Owattara, denwa shite kudasai. (Please call me when you finish.)"], my: ["日本に行ったら、お土産をを買います。- Kalau saya pergi ke Jepun, saya akan membeli oleh-oleh.", "終わったら、电话してください。- Bila sudah siap, tolong telefon saya."] },
        commonMistakes: { en: "〜たら is for conditional, not general 'when'. Use たら for specific past-condition results.", my: "〜たら untuk syarat, bukan ' bila ' umum." }
      },
      {
        slug: "n4-teki",
        title: { en: "〜て型的 (teki) - Looking", my: "〜て型的 - Rupanya" },
        level: "n4",
        formation: "Verb て-form + 型的 (nai: なしで/无助)",
        explanation: { en: "型的 means 'looking, appearing'. Used to describe how something or someone appears.", my: "型的 bermakna 'rupanya, seolah-olah'. Digunakan untuk menghuraikan bagaimana sesuatu atau seseorang kelihatan." },
        examples: { en: ["彼は約束を忘れた型的です。- Kare wa yakusoku o wasureta mitai desu. (He looks like he forgot the promise.)", "この映画はおもしろい型的です。- Kono eiga wa omoshiroi mitai desu. (This movie looks interesting.)"], my: ["彼は約束を忘れた型的です。- Dia Rupanya sudah lupa janji.", "この映画はおもしろい型的です。- Filem ini Rupanya menarik."] },
        commonMistakes: { en: "型的 is for appearance, not certainty. It means 'it seems/looks like', not 'definitely is'.", my: "型的 untuk rupa, bukan kepastian." }
      },
    ],
    vocabulary: [
      { word: "会社", furigana: "かいしゃ", romaji: "kaisha", meaning: "company", type: "Noun" },
      { word: "電話番号", furigana: "でんわばんご", romaji: "denwabango", meaning: "phone number", type: "Noun" },
      { word: "時計", furigana: "とけい", romaji: "tokei", meaning: "clock, watch", type: "Noun" },
      { word: "友達", furigana: "ともだち", romaji: "tomodachi", meaning: "friend", type: "Noun" },
      { word: "料理", furigana: "りょうり", romaji: "ryouri", meaning: "cooking, cuisine", type: "Noun" },
      { word: "食べる", furigana: "たべる", romaji: "taberu", meaning: "to eat", type: "Verb" },
      { word: "飲む", furigana: "のむ", romaji: "nomu", meaning: "to drink", type: "Verb" },
      { word: "見る", furigana: "みる", romaji: "miru", meaning: "to see, watch", type: "Verb" },
      { word: "行く", furigana: "いく", romaji: "iku", meaning: "to go", type: "Verb" },
      { word: "来る", furigana: "くる", romaji: "kuru", meaning: "to come", type: "Verb" },
    ]
  },
  n3: {
    title: "JLPT N3 - Intermediate",
    description: "At N3 level, you can understand Japanese used in everyday situations and somewhat formal contexts. You will learn approximately 400 kanji and 3,000 vocabulary words.",
    kanji: [
      { kanji: "働", meaning: "to work", onyomi: "ドウ", kunyomi: "はたら.く", strokes: 13, example: "仕事 (Shigoto - work)" },
      { kanji: "意", meaning: "meaning, intention", onyomi: "イ", kunyomi: "", strokes: 13, example: "意味 (Imi - meaning)" },
      { kanji: "識", meaning: "knowledge, recognition", onyomi: "シキ", kunyomi: "", strokes: 19, example: "知識 (Chishiki - knowledge)" },
      { kanji: "開", meaning: "to open", onyomi: "カイ", kunyomi: "ひら.く", strokes: 12, example: "開ける (akeru - to open)" },
    ],
    grammar: [
      {
        slug: "n3-tame",
        title: { en: "〜ために (tame ni) - For/In order to", my: "〜ために - Untuk/Bagi pihak" },
        level: "n3",
        formation: "N + の + ために / Verb dict + ために",
        explanation: { en: "〜ために means 'for the sake of', 'for', or 'in order to'. It expresses purpose or reason.", my: "〜ために bermakna 'untuk', 'bagi pihak', atau 'supaya'. Ia menyatakan tujuan atau sebab." },
        examples: { en: ["日本語を勉強するために、日本へ行きます。- Nihongo o benkyou suru tame ni, Nihon e ikimasu. (I go to Japan in order to study Japanese.)", "健康のために、毎日運動します。- Kenkou no tame ni, mainichi undou shimasu. (I exercise every day for my health.)"], my: ["日本語を勉強するために、日本へ行きます。- Saya pergi ke Jepun untuk belajar bahasa Jepun.", "健康のために、毎日運動します。- Saya bersenam setiap hari untuk kesihatan."] },
        commonMistakes: { en: "〜ために for purpose uses the dictionary form + ために, NOT て-form + ために (that means 'because').", my: "〜ために untuk tujuan menggunakan bentuk kamus + ために, BUKAN て-form + ために." }
      },
    ],
    vocabulary: [
      { word: "意思", furigana: "いし", romaji: "ishi", meaning: "intention, will", type: "Noun" },
      { word: "関心", furigana: "かんしん", romaji: "kanshin", meaning: "interest, concern", type: "Noun" },
      { word: "社会的", furigana: "しゃかいてき", romaji: "shakaiteki", meaning: "social", type: "Adjective" },
      { word: "穏やか", furigana: "おだやか", romaji: "odayaka", meaning: "calm, gentle", type: "Adjective" },
      { word: "努める", furigana: "つとめる", romaji: "tsutomeru", meaning: "to make efforts, to serve (in a role)", type: "Verb" },
      { word: "述べる", furigana: "のべる", romaji: "noberu", meaning: "to state, to express", type: "Verb" },
    ]
  }
};
