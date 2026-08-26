// Grammar Data - N5, N4, N3, N2, N1
// Comprehensive grammar patterns with formation, explanation, and examples

export const GRAMMAR_DATA = {
  n5: {
    title: "JLPT N5 Grammar",
    description: "Essential grammar for beginners. Master these fundamentals to build basic Japanese sentences.",
    grammar: [
      // Sentence Structure & Particles
      {
        slug: "n5-ga",
        title: { en: "が (Ga) - Subject Marker", my: "が (Ga) - Penanda Subjek" },
        formation: "N + が + Verb/Adjective",
        explanation: { en: "が marks the subject of a sentence. It identifies who or what performs an action or exists in a state.", my: "が menandakan subjek dalam ayat. Ia mengenal pasti siapa atau apa yang melakukan tindakan atau wujud dalam keadaan." },
        examples: [
          { japanese: "私が学生です。", romaji: "Watashi ga gakusei desu.", malay: "Saya adalah pelajar." },
          { japanese: "猫がいます。", romaji: "Neko ga imasu.", malay: "Ada kucing." }
        ],
        commonMistakes: { en: "Don't confuse を (object marker) with が (subject marker).", my: "Jangan kelirukan を dengan が." }
      },
      {
        slug: "n5-wa",
        title: { en: "は (Wa) - Topic Marker", my: "は (Wa) - Penanda Topik" },
        formation: "N + は + Predicate",
        explanation: { en: "は marks the topic of a sentence. It introduces what you are talking about.", my: "は menandakan topik ayat. Ia memperkenalkan apa yang anda bicarakan." },
        examples: [
          { japanese: "私は先生です。", romaji: "Watashi wa sensei desu.", malay: "Saya adalah cikgu." },
          { japanese: "日本人は親切です。", romaji: "Nihonjin wa shinsetsu desu.", malay: "Orang Jepun是很親切." }
        ],
        commonMistakes: { en: "は is read as わ, not は in grammatical context.", my: "は dibaca sebagai わ." }
      },
      {
        slug: "n5-no",
        title: { en: "の (No) - Possessive/Connector", my: "の (No) - Kepunyaan" },
        formation: "N1 + の + N2",
        explanation: { en: "の connects two nouns, showing that N2 belongs to N1.", my: "の menghubungkan dua kata nama, menunjukkan N2 milik N1." },
        examples: [
          { japanese: "先生の猫", romaji: "Sensei no neko", malay: "Kucing Cikgu" },
          { japanese: "日本語の教室", romaji: "Nihongo no kyoushitsu", malay: "Bilik Darjah Bahasa Jepun" }
        ],
        commonMistakes: { en: "の does not work like English 'of'.", my: "の tidak berfungsi seperti 'of'." }
      },
      {
        slug: "n5-wo",
        title: { en: "を (Wo) - Object Marker", my: "を (Wo) - Penanda Objek" },
        formation: "N + を + Verb",
        explanation: { en: "を marks the direct object of a verb.", my: "を menandakan objek langsung bagi kata kerja." },
        examples: [
          { japanese: "本を読みます。", romaji: "Hon o yomimasu.", malay: "Saya akan membaca buku." },
          { japanese: "映画を見ます。", romaji: "Eiga o mimasu.", malay: "Saya akan menonton filem." }
        ],
        commonMistakes: { en: "を is pronounced as 'o' in modern Japanese.", my: "を disebut sebagai 'o'." }
      },
      {
        slug: "n5-ni",
        title: { en: "に (Ni) - Location/Time/Direction", my: "に (Ni) - Lokasi/Masa/Arah" },
        formation: "N + に + Verb",
        explanation: { en: "に indicates location (existence), time, or direction toward something.", my: "に menunjukkan lokasi (keberadaan), masa, atau arah ke sesuatu." },
        examples: [
          { japanese: "学校に行きます。", romaji: "Gakkou ni ikimasu.", malay: "Saya akan pergi ke sekolah." },
          { japanese: "駅にいます。", romaji: "Eki ni imasu.", malay: "Saya di stesen." }
        ],
        commonMistakes: { en: "に is used for specific times (3時, 月曜日) but not for relative time (今日, 明日).", my: "に digunakan untuk masa tertentu." }
      },
      {
        slug: "n5-de",
        title: { en: "で (De) - Location of Action/Tool", my: "で (De) - Lokasi Tindakan/Alat" },
        formation: "N + で + Verb",
        explanation: { en: "で indicates the location where an action occurs or the tool used to do something.", my: "で menunjukkan lokasi di mana tindakan berlaku atau alat yang digunakan." },
        examples: [
          { japanese: "図書館で勉強します。", romaji: "Toshokan de benkyou shimasu.", malay: "Saya belajar di perpustakaan." },
          { japanese: "バスで行きます。", romaji: "Basu de ikimasu.", malay: "Saya akan pergi dengan bas." }
        ],
        commonMistakes: { en: "Use に for existence (います/あります), で for actions.", my: "Gunakan に untuk keberadaan, で untuk tindakan." }
      },
      {
        slug: "n5-e",
        title: { en: "へ (E) - Direction", my: "へ (E) - Arah" },
        formation: "N + へ + Verb",
        explanation: { en: "へ indicates direction toward a place. Read as 'e'.", my: "へ menunjukkan arah ke sesuatu tempat. Dibaca sebagai 'e'." },
        examples: [
          { japanese: "東京へ行きます。", romaji: "Toukyou e ikimasu.", malay: "Saya akan pergi ke Tokyo." }
        ],
        commonMistakes: { en: "へ is read as 'e' not 'he'.", my: "へ dibaca sebagai 'e'." }
      },
      {
        slug: "n5-to",
        title: { en: "と (To) - And/With", my: "と (To) - Dan/Dengan" },
        formation: "N + と + N / と + Verb",
        explanation: { en: "と connects nouns (and/with) or indicates with whom an action is done.", my: "と menghubungkan kata nama (dan/dengan) atau menunjukkan dengan siapa sesuatu tindakan dilakukan." },
        examples: [
          { japanese: "友達と話します。", romaji: "Tomodachi to hanashimasu.", malay: "Saya akan bercakap dengan kawan." }
        ],
        commonMistakes: { en: "と lists items completely unlike English 'and'.", my: "と menyenaraikan item sepenuhnya." }
      },
      {
        slug: "n5-ya",
        title: { en: "や (Ya) - And (Incomplete List)", my: "や (Ya) - Dan (Senarai Tidak Lengkap)" },
        formation: "N + や + N",
        explanation: { en: "や connects nouns implying 'and so on' without being exhaustive.", my: "や menghubungkan kata nama bermakna 'dan lain-lain' tanpa lengkap." },
        examples: [
          { japanese: "果物やお茶", romaji: "Kudamono ya ocha", malay: "buah-buahan dan teh dan lain-lain" }
        ],
        commonMistakes: { en: "や suggests there are other items not listed.", my: "や menunjukkan ada item lain yang tidak disenaraikan." }
      },
      {
        slug: "n5-desu",
        title: { en: "です - Polite Copula", my: "です - Kata Kerja Serpolite" },
        formation: "N / Adj + です",
        explanation: { en: "です is a polite copula, equivalent to 'is/am/are'.", my: "です adalah kata kerja serpolite, bersamaan dengan 'is/am/are'." },
        examples: [
          { japanese: "私は学生です。", romaji: "Watashi wa gakusei desu.", malay: "Saya pelajar." },
          { japanese: "これは本です。", romaji: "Kore wa hon desu.", malay: "Ini adalah buku." }
        ],
        commonMistakes: { en: "です does not mean 'to be' dynamically.", my: "です tidak bermakna 'to be' secara dinamik." }
      },
      {
        slug: "n5-deshou",
        title: { en: "でしょう - Conjecture", my: "でしょう - Tekaan" },
        formation: "Sentence + でしょう",
        explanation: { en: "でしょう expresses probability or asks for confirmation.", my: "でしょう menyatakan kebarangkalian atau meminta pengesahan." },
        examples: [
          { japanese: "明日雨でしょう。", romaji: "Ashita ame deshou.", malay: "Esok mungkin hujan." }
        ],
        commonMistakes: { en: "でしょう is softer than だらう.", my: "でしょう lebih lembut daripada だらう." }
      },
      // Verb Conjugations
      {
        slug: "n5-te-form",
        title: { en: "〜て (Te-form)", my: "〜て - Bentuk て" },
        formation: "Verb て-form",
        explanation: { en: "The te-form connects sentences, shows ongoing action, or gives commands.", my: "Bentuk て menyambung ayat, menunjukkan tindakan sedang berjalan, atau memberikan perintah." },
        examples: [
          { japanese: "食べてください。", romaji: "Tabete kudasai.", malay: "Sila makan." }
        ],
        commonMistakes: { en: "The te-form conjugation varies by verb group - masu → te, chi → tte, ri → tte, etc.", my: "Konjugasi bentuk て berbeza mengikut kumpulan kata kerja." }
      },
      {
        slug: "n5-tai",
        title: { en: "〜たい - Want to", my: "〜たい - Nak" },
        formation: "Verb(masu) + たい",
        explanation: { en: "Expresses wanting to do something. 'want to ~'.", my: "Meneritakan keinginan untuk melakukan sesuatu. 'nak ~'." },
        examples: [
          { japanese: "お寿司を食べたいです。", romaji: "O-sushi wo tabetai desu.", malay: "Saya nak makan sushi." },
          { japanese: "日本に行きたいです。", romaji: "Nihon ni ikitai desu.", malay: "Saya nak pergi ke Jepun." }
        ],
        commonMistakes: { en: "〜たい becomes 〜たくない for negatives.", my: "〜たい menjadi 〜たくない untuk negatif." }
      },
      {
        slug: "n5-masu",
        title: { en: "ます - Polite Form", my: "ます - Bentuk Sopan" },
        formation: "Verb stem + ます",
        explanation: { en: "ます is the polite/polite present/future form of verbs.", my: "ます adalah bentuk sopan untuk kata kerja." },
        examples: [
          { japanese: "話します。", romaji: "Hanashimasu.", malay: "Saya bercakap." },
          { japanese: "食べます。", romaji: "Tabemasu.", malay: "Saya makan." }
        ],
        commonMistakes: { en: "ます is for polite/formal contexts.", my: "ます untuk konteks sopan/formal." }
      },
      {
        slug: "n5-mashou",
        title: { en: "ましょう - Let's", my: "ましょう - Jom" },
        formation: "Verb(masu) + ましょう",
        explanation: { en: "Suggests doing something together. 'Let\\'s ~'.", my: "Mencadangkan melakukan sesuatu bersama. 'Jom ~'." },
        examples: [
          { japanese: "映画を見ましょう。", romaji: "Eiga wo mimashou.", malay: "Jom tengok movie." }
        ],
        commonMistakes: { en: "ましょう is more polite than しよう.", my: "ましょう lebih sopan daripada しよう." }
      },
      {
        slug: "n5-nai",
        title: { en: "ない - Negative Form", my: "ない - Bentuk Negatif" },
        formation: "Verb ない-form + ない",
        explanation: { en: "ない is the negative plain form. 'does not ~'.", my: "ない adalah bentuk negatif ringkas. 'tidak ~'." },
        examples: [
          { japanese: "食べない。", romaji: "Tabenai.", malay: "Tak makan." }
        ],
        commonMistakes: { en: "Use ません for polite negatives.", my: "Guna ません untuk negatif sopan." }
      },
      {
        slug: "n5-ta",
        title: { en: "た - Past Tense", my: "た - Bentuk Lampau" },
        formation: "Verb た-form",
        explanation: { en: "The past tense form. Expresses completed actions.", my: "Bentuk lampau. Meneritakan tindakan yang sudah siap." },
        examples: [
          { japanese: "食べた。", romaji: "Tabeta.", malay: "Saya sudah makan." }
        ],
        commonMistakes: { en: "Same conjugation pattern as て-form.", my: "Corak konjugasi yang sama seperti bentuk て." }
      },
      {
        slug: "n5-kudasai",
        title: { en: "ください - Please", my: "ください - Tolong" },
        formation: "Verb て-form + ください",
        explanation: { en: "ください means 'please' and is used to make polite requests.", my: "ください bermakna 'tolong' dan digunakan untuk membuat permintaan yang sopan." },
        examples: [
          { japanese: "水をください。", romaji: "Mizu o kudasai.", malay: "Tolong bagi air." },
          { japanese: "見てください。", romaji: "Mite kudasai.", malay: "Tolong lihat." }
        ],
        commonMistakes: { en: "ください is a request, not a command.", my: "ください adalah permintaan, bukan perintah." }
      },
      {
        slug: "n5-imasu",
        title: { en: "います/あります - Existence", my: "います/あります - Keberadaan" },
        formation: "N + に + います/あります",
        explanation: { en: "います is used for animate objects (people, animals), あります for inanimate objects.", my: "います digunakan untuk objek bernyawa (orang, haiwan), あります untuk objek tidak bernyawa." },
        examples: [
          { japanese: "猫がいます。", romaji: "Neko ga imasu.", malay: "Ada kucing." },
          { japanese: "机があります。", romaji: "Tsukue ga arimasu.", malay: "Ada meja." }
        ],
        commonMistakes: { en: "Use に for location marker with existence verbs.", my: "Gunakan に untuk penanda lokasi dengan kata kerja keberadaan." }
      },
      {
        slug: "n5-ka",
        title: { en: "か - Question Marker", my: "か - Penanda Soalan" },
        formation: "Sentence + か",
        explanation: { en: "か turns a statement into a yes/no question.", my: "か menukar kenyataan kepada soalan ya/tidak." },
        examples: [
          { japanese: "学生ですか。", romaji: "Gakusei desu ka?", malay: "Adakah anda pelajar?" }
        ],
        commonMistakes: { en: "Do not use a question mark with か - it\\'s redundant.", my: "Jangan gunakan tanda tanya dengan か." }
      },
      {
        slug: "n5-mo",
        title: { en: "も - Also/Too", my: "も - Juga" },
        formation: "N + も",
        explanation: { en: "も means 'also' or 'too', replacing は or が.", my: "も bermakna 'juga' atau 'pun', menggantikan は atau が." },
        examples: [
          { japanese: "私も学生です。", romaji: "Watashi mo gakusei desu.", malay: "Saya juga pelajar." }
        ],
        commonMistakes: { en: "も replaces the topic/object marker, not adding to it.", my: "も menggantikan penanda topik/objek." }
      },
      {
        slug: "n5-kara",
        title: { en: "から (Kara) - Because/From", my: "から - Kerana/Dari" },
        formation: "Sentence + から",
        explanation: { en: "から indicates reason or starting point. 'because' or 'from'.", my: "から menunjukkan sebab atau titik permulaan. 'kerana' atau 'dari'." },
        examples: [
          { japanese: "寒いから窓を閉めます。", romaji: "Samui kara mado wo shimemasu.", malay: "Saya tutup tingkap sebab sejuk." },
          { japanese: "学校から駅まで歩きます。", romaji: "Gakkou kara eki made arukimasu.", malay: "Saya berjalan dari sekolah ke stesen." }
        ],
        commonMistakes: { en: "から goes at the end of the reason clause, not the consequence.", my: "から letak di hujung klausa sebab." }
      },
      {
        slug: "n5-kore",
        title: { en: "これ (Kore) - This (near speaker)", my: "これ - Ini (dekat pencerita)" },
        formation: "これ + は/を/に",
        explanation: { en: "これ refers to something close to the speaker. 'this'.", my: "これ merujuk kepada sesuatu dekat dengan pencerita. 'ini'." },
        examples: [
          { japanese: "これは本です。", romaji: "Kore wa hon desu.", malay: "Ini adalah buku." }
        ],
        commonMistakes: { en: "これ is only for items near the speaker.", my: "これ hanya untuk barang dekat pencerita." }
      },
      {
        slug: "n5-sore",
        title: { en: "それ (Sore) - That (near listener)", my: "それ - Itu (dekat pendengar)" },
        formation: "それ + は/を/に",
        explanation: { en: "それ refers to something close to the listener. 'that'.", my: "それ merujuk kepada sesuatu dekat dengan pendengar. 'itu'." },
        examples: [
          { japanese: "それは本です。", romaji: "Sore wa hon desu.", malay: "Itu adalah buku." }
        ],
        commonMistakes: { en: "これ = near speaker, それ = near listener, あれ = far from both.", my: "これ = dekat pencerita, それ = dekat pendengar, あれ = jauh dari kedua-dua." }
      },
      {
        slug: "n5-are",
        title: { en: "あれ (Are) - That (far)", my: "あれ - Itu (jauh)" },
        formation: "あれ + は/を/に",
        explanation: { en: "あれ refers to something far from both speaker and listener. 'that (over there)'.", my: "あれ merujuk kepada sesuatu jauh dari kedua-dua pencerita dan pendengar. 'itu (situ sana)'." },
        examples: [
          { japanese: "あれは何ですか。", romaji: "Are wa nan desu ka?", malay: "Apa itu situ?" }
        ],
        commonMistakes: { en: "あれ is for things far from both people.", my: "あれ untuk barang jauh dari kedua-dua orang." }
      },
      {
        slug: "n5-dono",
        title: { en: "どの (Dono) - Which", my: "どの - Mana" },
        formation: "どの + N",
        explanation: { en: "どの asks which one from a known set. 'which'.", my: "どの tanya yang mana dari satu set yang diketahui. 'mana'." },
        examples: [
          { japanese: "どの猫が好きですか。", romaji: "Dono neko ga suki desu ka?", malay: "Kucing yang mana anda suka?" }
        ],
        commonMistakes: { en: "どの requires a following noun.", my: "どの memerlukan kata nama selepasnya." }
      },
      {
        slug: "n5-kono",
        title: { en: "この (Kono) - This (noun modifier)", my: "この - Ini (pengubah nama)" },
        formation: "この + N",
        explanation: { en: "この modifies a noun, referring to something near the speaker.", my: "この mengubah nama, merujuk kepada sesuatu dekat pencerita." },
        examples: [
          { japanese: "この本は面白いです。", romaji: "Kono hon wa omoshiroi desu.", malay: "Buku ini menarik." }
        ],
        commonMistakes: { en: "この is always followed by a noun.", my: "この sentiasa diikuti oleh kata nama." }
      },
      {
        slug: "n5-sono",
        title: { en: "その (Sono) - That (noun modifier)", my: "その - Itu (pengubah nama)" },
        formation: "その + N",
        explanation: { en: "その modifies a noun, referring to something near the listener.", my: "その mengubah nama, merujuk kepada sesuatu dekat pendengar." },
        examples: [
          { japanese: "その猫は可愛いですね。", romaji: "Sono neko wa kawaii desu ne.", malay: "Kucing itu comel ya." }
        ],
        commonMistakes: { en: "その is for things near the listener.", my: "その untuk barang dekat pendengar." }
      },
      {
        slug: "n5-ano",
        title: { en: "あの (Ano) - That (noun modifier, far)", my: "あの - Itu (pengubah nama, jauh)" },
        formation: "あの + N",
        explanation: { en: "あの modifies a noun, referring to something far from both.", my: "あの mengubah nama, merujuk kepada sesuatu jauh dari kedua-dua." },
        examples: [
          { japanese: "あの山は綺麗です。", romaji: "Ano yama wa kirei desu.", malay: "Gunung itu cantik." }
        ],
        commonMistakes: { en: "あの is for things far from both speaker and listener.", my: "あの untuk barang jauh dari kedua-dua." }
      },
      {
        slug: "n5-nani",
        title: { en: "何 (Nani) - What", my: "何 - Apa" },
        formation: "何 + が/を/に",
        explanation: { en: "何 asks about things. Read as なに before vowels, なん before だ/で/に.", my: "何 bertanya tentang barang. Dibaca なに sebelum vokal, なん sebelum だ/で/に." },
        examples: [
          { japanese: "これは何ですか。", romaji: "Kore wa nan desu ka?", malay: "Apa ini?" },
          { japanese: "何食べたいですか。", romaji: "Nani tabetai desu ka?", malay: "Nak makan apa?" }
        ],
        commonMistakes: { en: "何 reads as なに before vowels and なん before だ/で/に.", my: "何 dibaca なに sebelum vokal dan なん sebelum だ/で/に." }
      },
      {
        slug: "n5-dare",
        title: { en: "誰 (Dare) - Who", my: "誰 - Siapa" },
        formation: "誰 + が/を/に",
        explanation: { en: "誰 asks about people. 'who'.", my: "誰 bertanya tentang orang. 'siapa'." },
        examples: [
          { japanese: "誰がしますか。", romaji: "Dare ga shimasu ka?", malay: "Siapa yang akan buat?" }
        ],
        commonMistakes: { en: "誰 can also mean 'someone' in certain contexts.", my: "誰 boleh juga bermakna 'seseorang' dalam konteks tertentu." }
      },
      {
        slug: "n5-doko",
        title: { en: "どこ (Doko) - Where", my: "どこ - Mana" },
        formation: "どこ + に/で/へ",
        explanation: { en: "どこ asks about places. 'where'.", my: "どこ bertanya tentang tempat. 'mana'." },
        examples: [
          { japanese: "学校はどこですか。", romaji: "Gakkou wa doko desu ka?", malay: "Sekolah di mana?" }
        ],
        commonMistakes: { en: "どこ asks about locations, not people or things.", my: "どこ bertanya tentang lokasi, bukan orang atau barang." }
      },
      {
        slug: "n5-itsu",
        title: { en: "いつ (Itsu) - When", my: "いつ - Bila" },
        formation: "いつ + Verb",
        explanation: { en: "いつ asks about time. 'when'.", my: "いつ bertanya tentang masa. 'bila'." },
        examples: [
          { japanese: "試験はいつですか。", romaji: "Shiken wa itsu desu ka?", malay: "Bila exam?" }
        ],
        commonMistakes: { en: "いつ is only for questions about time.", my: "いつ hanya untuk soalan tentang masa." }
      },
      {
        slug: "n5-ikutsu",
        title: { en: "いくつ (Ikutsu) - How many/much", my: "いくつ - Berapa" },
        formation: "いくつ + Verb/Adjective",
        explanation: { en: "いくつ asks about quantity or age. 'how many' or 'how old'.", my: "いくつ bertanya tentang kuantiti atau umur. 'berapa' atau 'berumur berapa'." },
        examples: [
          { japanese: "子供がいくつですか。", romaji: "Kodomo ga ikutsu desu ka?", malay: "Berapa umur anak anda?" }
        ],
        commonMistakes: { en: "いくつ is for countable items and age.", my: "いくつ untuk barang yang boleh dikira dan umur." }
      },
      {
        slug: "n5-dou",
        title: { en: "どう (Dou) - How", my: "どう - Bagaimana" },
        formation: "どう + Verb/Adjective",
        explanation: { en: "どう asks about manner or condition. 'how'.", my: "どう bertanya tentang cara atau keadaan. 'bagaimana'." },
        examples: [
          { japanese: "日本語はどうですか。", romaji: "Nihongo wa dou desu ka?", malay: "Bahasa Jepun bagaimana?" }
        ],
        commonMistakes: { en: "どう asks 'how' about quality or condition, not time.", my: "どう tanya 'bagaimana' tentang kualiti atau keadaan, bukan masa." }
      },
      {
        slug: "n5-mou",
        title: { en: "もう (Mou) - Already/More", my: "もう - Sudah/Lagi" },
        formation: "もう + Verb/Adjective",
        explanation: { en: "もう means 'already' or 'more'. Expresses something completed or additional.", my: "もう bermakna 'sudah' atau 'lagi'. Menyatakan sesuatu yang sudah siap atau tambahan." },
        examples: [
          { japanese: "もう食べました。", romaji: "Mou tabemashita.", malay: "Saya sudah makan." },
          { japanese: "もう一杯いかがですか。", romaji: "Mou ippai ikaga desu ka?", malay: "Nak lagi satu?" }
        ],
        commonMistakes: { en: "もう expresses completion or request for more.", my: "もう menyatakan siap atau minta lagi." }
      },
      {
        slug: "n5-mada",
        title: { en: "まだ (Mada) - Still/Not yet", my: "まだ - Masih/Belum" },
        formation: "まだ + Verb ない / まだ + Adj",
        explanation: { en: "まだ means 'still' or 'not yet'. Used with negative or ongoing states.", my: "まだ bermakna 'masih' atau 'belum'. Digunakan dengan negatif atau keadaan yang sedang berjalan." },
        examples: [
          { japanese: "まだ食べていません。", romaji: "Mada tabete imasen.", malay: "Saya belum makan lagi." },
          { japanese: "まだ早いです。", romaji: "Mada hayai desu.", malay: "Masih awal." }
        ],
        commonMistakes: { en: "まだ is commonly used with negative forms.", my: "まだ selalu digunakan dengan bentuk negatif." }
      },
      {
        slug: "n5-ichiban",
        title: { en: "一番 (Ichiban) - Most/Number one", my: "一番 - Paling/Nombor satu" },
        formation: "一番 + Adj/Verb",
        explanation: { en: "一番 expresses the superlative. 'most' or 'the best'.", my: "一番 menyatakan superflatif. 'paling' atau 'yang terbaik'." },
        examples: [
          { japanese: "日本料理の中で寿司が一番好きです。", romaji: "Nihon ryouri no naka de sushi ga ichiban suki desu.", malay: "Antara makanan Jepun, sushi paling saya suka." }
        ],
        commonMistakes: { en: "一番 is used for superlative comparison.", my: "一番 digunakan untuk perbandingan superflatif." }
      },
      {
        slug: "n5-kata",
        title: { en: "方 (Kata) - Way/Method", my: "方 - Cara" },
        formation: "Verb て-form + 方",
        explanation: { en: "方 describes the way or method of doing something.", my: "方 menghuraikan cara atau kaedah melakukan sesuatu." },
        examples: [
          { japanese: "日本語の読み方を教えてください。", romaji: "Nihongo no yomikata wo oshiete kudasai.", malay: "Tolong ajar cara baca bahasa Jepun." }
        ],
        commonMistakes: { en: "方 means 'way to do' something, not 'direction'.", my: "方 bermakna 'cara buat' sesuatu, bukan 'arah'." }
      },
      {
        slug: "n5-nominalizer",
        title: { en: "の (No) - Nominalizer", my: "の - Pengkinian" },
        formation: "Sentence + の",
        explanation: { en: "の turns a sentence into a noun phrase.", my: "の menukarkan ayat kepada frasa nama." },
        examples: [
          { japanese: "食べるのは美味しいです。", romaji: "Taberu no wa oishii desu.", malay: "Makan itu sedap." }
        ],
        commonMistakes: { en: "の as nominalizer is often confused with の as possessive.", my: "の sebagai pengkinian sering dikelirukan dengan の sebagai kepunyaan." }
      },
      {
        slug: "n5-te-iru",
        title: { en: "〜ている - Progressive Action", my: "〜ている - Tindakan Sedang Berlangsung" },
        formation: "Verb て-form + いる",
        explanation: { en: "Expresses an action currently in progress.", my: "Meneritakan tindakan yang sedang berjalan sekarang." },
        examples: [
          { japanese: "今、日本語を勉強している。", romaji: "Ima Nihongo wo benkyou shite iru.", malay: "Sekarang saya sedang belajar bahasa Jepun." }
        ],
        commonMistakes: { en: "ている shows ongoing action, not just habit.", my: "ている menunjukkan tindakan yang sedang berjalan, bukan tabiat." }
      },
      {
        slug: "n5-ta-koto-ga-aru",
        title: { en: "〜たことがある - Past Experience", my: "〜たことがある - Pengalaman Lampau" },
        formation: "Verb た-form + ことがある",
        explanation: { en: "Expresses having done something before. 'have ~ed before'.", my: "Meneritakan pernah melakukan sesuatu sebelum ini. 'pernah ~ sebelumnya'." },
        examples: [
          { japanese: "日本に行ったことがあります。", romaji: "Nihon ni itta koto ga arimasu.", malay: "Saya pernah pergi ke Jepun." }
        ],
        commonMistakes: { en: "Use dictionary form + ことがある for habits.", my: "Guna bentuk kamus + ことがある untuk tabiat." }
      },
      {
        slug: "n5-koto-ga-aru",
        title: { en: "〜ことがある - Occasional Habit", my: "〜ことがある - Kadang-kadang" },
        formation: "Verb dict form + ことがある",
        explanation: { en: "Expresses something that happens occasionally.", my: "Meneritakan sesuatu yang berlaku kadang-kadang." },
        examples: [
          { japanese: "朝早く起きることがあります。", romaji: "Asa hayaku okiru koto ga arimasu.", malay: "Kadang-kadang saya bangun awal pagi." }
        ],
        commonMistakes: { en: "This is for occasional habits, not regular routines.", my: "Ini untuk tabiat sekali-sekala, bukan rutin biasa." }
      },
      {
        slug: "n5-soshite",
        title: { en: "そして (Soshite) - And then", my: "そして - Dan kemudian" },
        formation: "Sentence + そして + Sentence",
        explanation: { en: "Connects sentences with 'and then'. Shows sequence of actions.", my: "Menghubungkan ayat dengan 'dan kemudian'. Menunjukkan urutan tindakan." },
        examples: [
          { japanese: "学校に行きました。そして、図書館で勉強しました。", romaji: "Gakkou ni ikimashita. Soshite, toshokan de benkyou shimashita.", malay: "Saya pergi ke sekolah. Dan kemudian, saya belajar di perpustakaan." }
        ],
        commonMistakes: { en: "そして implies a sequence, unlike simple と.", my: "Dan kemudian menunjukkan urutan, tidak seperti simple と." }
      },
      {
        slug: "n5-soredemo",
        title: { en: "それでも (Soredemo) - But/Even so", my: "それでも - Tapi/Masih pun" },
        formation: "Sentence + それでも",
        explanation: { en: "Means 'but' or 'even so'. Introduces a contrasting result.", my: "Bermakna 'tapi' atau 'masih pun'. Memperkenalkan hasil yang berbeza." },
        examples: [
          { japanese: "雨でした。それでも、試合はありました。", romaji: "Ame deshita. Soredemo, shiai wa arimashita.", malay: "Hujan. Tapi, perlawanan masih ada." }
        ],
        commonMistakes: { en: "それでも has a stronger contrast than だが.", my: "それでも mempunyai kontras yang lebih kuat daripada だが." }
      },
      {
        slug: "n5-masenka",
        title: { en: "ませんか (Masenka) - Won't you? (Invitation)", my: "ませんか - Tidak nak? (Jemputan)" },
        formation: "Verb masu-form + ませんか",
        explanation: { en: "Polite invitation. 'Won't you ~?', 'Would you like to ~?'.", my: "Jemputan sopan. 'Tidak nak ~?', 'Nak ~?'." },
        examples: [
          { japanese: "映画を見ませんか。", romaji: "Eiga wo mimasen ka?", malay: "Nak tengok filem?" }
        ],
        commonMistakes: { en: "ません is negative, but ませんか is an invitation.", my: "ません adalah negatif, tapi ませんか adalah jemputan." }
      },
      {
        slug: "n5-tottemo",
        title: { en: "とても (Totemo) - Very", my: "とても - Sangat" },
        formation: "とても + Adj",
        explanation: { en: "とても intensifies adjectives. 'very'.", my: "とても mengintensifkan adjektif. 'sangat'." },
        examples: [
          { japanese: "今日はとても暑いです。", romaji: "Kyou wa totemo atsui desu.", malay: "Hari ini sangat panas." }
        ],
        commonMistakes: { en: "とても must be used with negative for 'not very'.", my: "とても mestilah digunakan dengan negatif untuk 'tidak sangat'." }
      },
      {
        slug: "n5-amari",
        title: { en: "あまり (Amari) - Very/Not very", my: "あまり - Sangat/Tidak sangat" },
        formation: "とても + Adj / あまり + Adj ない",
        explanation: { en: "あまり means 'very' with positives, but 'not very' with negatives.", my: "あまり bermakna 'sangat' dengan positif, tapi 'tidak sangat' dengan negatif." },
        examples: [
          { japanese: "あまり好きじゃないです。", romaji: "Amari suki ja nai desu.", malay: "Tidak sangat suka." }
        ],
        commonMistakes: { en: "あまり with negative means 'not very'. With positive it means 'too much'.", my: "あまり dengan negatif bermakna 'tidak sangat'. Dengan positif ia bermakna 'terlalu banyak'." }
      },
      {
        slug: "n5-kochira",
        title: { en: "こちら (Kochira) - This person/direction (polite)", my: "こちら - Orang/arah ini (sopan)" },
        formation: "こちら + は/です",
        explanation: { en: "Polite form of これ. Used in formal contexts.", my: "Bentuk sopan dari これ. Digunakan dalam konteks formal." },
        examples: [
          { japanese: "こちらは先生です。", romaji: "Kochira wa sensei desu.", malay: "Ini adalah cikgu." }
        ],
        commonMistakes: { en: "こちら is more polite than これ.", my: "こちら lebih sopan daripada これ." }
      },
      {
        slug: "n5-korekara",
        title: { en: "これから (Korekara) - From now on", my: "これから - Dari sekarang" },
        formation: "これから + Verb",
        explanation: { en: "これから means 'from now on' or 'from this point'.", my: "これから bermakna 'dari sekarang' atau 'dari titik ini'." },
        examples: [
          { japanese: "これから勉強します。", romaji: "Korekara benkyou shimasu.", malay: "Saya akan belajar dari sekarang." }
        ],
        commonMistakes: { en: "これから refers to the future from now.", my: "これから merujuk kepada masa depan dari sekarang." }
      },
      {
        slug: "n5-taihou",
        title: { en: "た-form + 方がより良い - Better to", my: "た-form + 方がより良い - Lebih baik" },
        formation: "Verb た-form + 方が良い",
        explanation: { en: "Expresses that doing something is better than the alternative.", my: "Meneritakan membuat sesuatu adalah lebih baik daripada alternatif." },
        examples: [
          { japanese: "予約した方がいいです。", romaji: "Yoyaku shita hou ga ii desu.", malay: "Lebih baik tempah dulu." }
        ],
        commonMistakes: { en: "Use past tense た for the suggestion.", my: "Guna lampau た untuk cadangan." }
      }
    ]
  },
  n4: {
    title: "JLPT N4 Grammar",
    description: "Elementary grammar building on N5. Learn more complex sentence structures.",
    grammar: [
      {
        slug: "n4-tara",
        title: { en: "〜たら (tara) - If/When", my: "〜たら - Kalau/Sebaik" },
        formation: "Verb た-form + ら",
        explanation: { en: "〜たら expresses a conditional meaning 'if' or 'when (something happened).'", my: "〜たら menyatakan syarat bermakna 'jika' atau 'bila (sesuatu berlaku).'" },
        examples: [
          { japanese: "日本に行ったら、お土産を買います。", romaji: "Nihon ni ittara, omiyage wo kaimasu.", malay: "Kalau saya pergi ke Jepun, saya akan membeli oleh-oleh." }
        ],
        commonMistakes: { en: "〜たら is for conditional, not general 'when'.", my: "〜たら untuk syarat, bukan 'bila' umum." }
      },
      {
        slug: "n4-ba",
        title: { en: "〜ば (ba) - If", my: "〜ば - Kalau" },
        formation: "Verb ば-form + ば",
        explanation: { en: "〜ば expresses a general conditional 'if'.", my: "〜ば menyatakan syarat umum 'jika'." },
        examples: [
          { japanese: "見れば、分かります。", romaji: "Mireba, wakarimasu.", malay: "Kalau tengok, anda akan faham." }
        ],
        commonMistakes: { en: "〜ば is for general/hypothetical conditions.", my: "〜ば untuk syarat umum/hipotesis." }
      },
      {
        slug: "n4-nara",
        title: { en: "〜なら (nara) - If it's the case that", my: "〜なら - Kalau" },
        formation: "N / Plain sentence + なら",
        explanation: { en: "〜なら is used when the condition is explicitly stated or assumed.", my: "〜なら digunakan bila syarat adalah explicitly stated atau diandaikan." },
        examples: [
          { japanese: "行くなら、連絡してください。", romaji: "Iku nara, renraku shite kudasai.", malay: "Kalau nak pergi, tolong hubungi saya." }
        ],
        commonMistakes: { en: "〜なら focuses on the topic being discussed.", my: "〜なら fokus pada topik yang dibincangkan." }
      },
      {
        slug: "n4-te-kureru",
        title: { en: "〜てくれる - Someone does for me", my: "〜てくれる - Seseorang buat untuk saya" },
        formation: "Verb て-form + くれる",
        explanation: { en: "Someone does something for me (favor given to speaker).", my: "Seseorang melakukan sesuatu untuk saya (kebaikan yang diberi kepada pencerita)." },
        examples: [
          { japanese: "先生が教えてくれた。", romaji: "Sensei ga oshiete kureta.", malay: "Guru saya telah ajar saya." }
        ],
        commonMistakes: { en: "Use てあげる when YOU do something for someone else.", my: "Guna てあげる apabila ANDA melakukan sesuatu untuk orang lain." }
      },
      {
        slug: "n4-te-ageru",
        title: { en: "〜てあげる - I do for someone", my: "〜てあげる - Saya buat untuk orang lain" },
        formation: "Verb て-form + あげる",
        explanation: { en: "I do something for someone else (giving a favor).", my: "Saya melakukan sesuatu untuk orang lain (memberi kebaikan)." },
        examples: [
          { japanese: "友達を助けた。", romaji: "Tomodachi wo tasuketa.", malay: "Saya tolong kawan." }
        ],
        commonMistakes: { en: "Be careful with あげる - it can sound like you\\'re superior.", my: "Berhati-hati dengan あげる." }
      },
      {
        slug: "n4-te-morau",
        title: { en: "〜てもらう - I receive a favor", my: "〜てもらう - Saya terima kebaikan" },
        formation: "Verb て-form + もらう",
        explanation: { en: "I receive a favor (someone does something for me, and I receive it).", my: "Saya menerima kebaikan (seseorang melakukan sesuatu untuk saya, dan saya menerimanya)." },
        examples: [
          { japanese: "友達に手紙を書いてもらった。", romaji: "Tomodachi ni tegami wo kaite moratta.", malay: "Kawan saya tulis surat untuk saya." }
        ],
        commonMistakes: { en: "Focus on WHO is receiving the favor - morau always focuses on the receiver.", my: "Fokus pada SIAPA yang menerima kebaikan." }
      },
      {
        slug: "n4-te-iru",
        title: { en: "〜ている - Progressive/Result", my: "〜ている - Sedang/Hasil" },
        formation: "Verb て-form + いる",
        explanation: { en: "Expresses ongoing action or resultant state.", my: "Meneritakan tindakan sedang berjalan atau keadaan hasil." },
        examples: [
          { japanese: "食べている。", romaji: "Tabete iru.", malay: "Sedang makan." }
        ],
        commonMistakes: { en: "Use ていました for past progressive.", my: "Gunakan ていました untuk lampau." }
      },
      {
        slug: "n4-te-aru",
        title: { en: "〜てある - Resultant State (Preparation)", my: "〜てある - Keadaan Hasil (Penyediaan)" },
        formation: "Verb て-form + ある",
        explanation: { en: "Expresses something has been done in preparation.", my: "Meneritakan sesuatu telah dilakukan sebagai penyediaan." },
        examples: [
          { japanese: "予約してある。", romaji: "Yoyaku shite aru.", malay: "Sudah ditempah." }
        ],
        commonMistakes: { en: "てある implies someone did it intentionally.", my: "てある membayangkan seseorang buat dengan sengaja." }
      },
      {
        slug: "n4-sou-desu",
        title: { en: "〜そうです - It seems/I heard", my: "〜そうです - Nampaknya" },
        formation: "Verb stem / Sentence + そう",
        explanation: { en: "Expresses appearance or hearsay.", my: "Meneritakan rupa atau khabar." },
        examples: [
          { japanese: "雨が降りそうです。", romaji: "Ame ga furi sou desu.", malay: "Nampaknya akan hujan." }
        ],
        commonMistakes: { en: "〜そう with adjectives drops いい → 良さそう.", my: "〜そう dengan adjektif tukar いい → 良さそう." }
      },
      {
        slug: "n4-mitai-desu",
        title: { en: "〜みたい - Like/Similar to", my: "〜みたい - macam" },
        formation: "N / Verb + みたい",
        explanation: { en: "Expresses similarity or appearance.", my: "Meneritakan persamaan atau rupa." },
        examples: [
          { japanese: "彼は約束を忘れたみたいです。", romaji: "Kare wa yakusoku o wasureta mitai desu.", malay: "Dia macam dah lupa janji." }
        ],
        commonMistakes: { en: "みたい is more casual than そうだ.", my: "みたい lebih casual daripada そうだ." }
      },
      {
        slug: "n4-sugiru",
        title: { en: "〜すぎる - Too much", my: "〜すぎる - Terlalu" },
        formation: "Verb stem / Adj + すぎる",
        explanation: { en: "Expresses something is too much/excessive.", my: "Meneritakan sesuatu terlalu banyak/berlebihan." },
        examples: [
          { japanese: "食べすぎました。", romaji: "Tabesugimashita.", malay: "Saya makan terlalu banyak." }
        ],
        commonMistakes: { en: "すぎる is used when something is excessive.", my: "すぎる digunakan bila sesuatu berlebihan." }
      },
      {
        slug: "n4-koto-ga-dekiru",
        title: { en: "ことができる - Can/Be able to", my: "ることができる - Boleh" },
        formation: "Verb dict + ことができる",
        explanation: { en: "Expresses ability or possibility.", my: "Meneritakan keupayaan atau kemungkinan." },
        examples: [
          { japanese: "日本語を話すことができます。", romaji: "Nihongo wo hanasu koto ga dekimasu.", malay: "Saya boleh berbahasa Jepun." }
        ],
        commonMistakes: { en: "Use the dictionary form before こと.", my: "Gunakan bentuk kamus sebelum こと." }
      },
      {
        slug: "n4-nakereba-narimasen",
        title: { en: "なければならない - Must/Necessary", my: "なければならない - Mesti" },
        formation: "Verb ない + なければならない",
        explanation: { en: "Expresses necessity or obligation.", my: "Meneritakan keperluan atau obligasi." },
        examples: [
          { japanese: "行かなければならない。", romaji: "Ik nakereba naranai.", malay: "Saya mestilah pergi." }
        ],
        commonMistakes: { en: "This is a strong obligation.", my: "Ini adalah obligasi yang kuat." }
      },
      {
        slug: "n4-hoshii",
        title: { en: "ほしい - Want (for things)", my: "ほしい - Nak (untuk barang)" },
        formation: "N + が + ほしい / Verb + ほしい",
        explanation: { en: "Expresses wanting something or wanting to do something.", my: "Meneritakan nak sesuatu atau nak buat sesuatu." },
        examples: [
          { japanese: "水がほしい。", romaji: "Mizu ga hoshii.", malay: "Saya nak air." }
        ],
        commonMistakes: { en: "Use 〜たい for wanting to do verbs.", my: "Guna 〜たい untuk kata kerja." }
      },
      {
        slug: "n4-ta-hou-ga-ii",
        title: { en: "〜た方ががいい - Better to", my: "〜た方ががいい - Lebih baik" },
        formation: "Verb た-form + 方 が いい",
        explanation: { en: "Expresses that doing something is better.", my: "Meneritakan membuat sesuatu adalah lebih baik." },
        examples: [
          { japanese: "行った方ががいい。", romaji: "Itta hou ga ii.", malay: "Lebih baik pergi." }
        ],
        commonMistakes: { en: "Use past tense た for the suggestion.", my: "Guna lampau た untuk cadangan." }
      },
      {
        slug: "n4-passive",
        title: { en: "〜れる/られる (Passive)", my: "〜れる/られる (Pasif)" },
        formation: "Verb passive form",
        explanation: { en: "Passive voice. Expresses when the subject receives an action.", my: "Suara pasif. Meneritakanapabila subjek menerima suatu tindakan." },
        examples: [
          { japanese: "先生が褒められました。", romaji: "Sensei ni homeraremashita.", malay: "Saya dipuji oleh guru." }
        ],
        commonMistakes: { en: "れる is for ichidan, られる for godan verbs.", my: "れる untuk kata kerja ichidan, られる untuk godan." }
      },
      {
        slug: "n4-potential",
        title: { en: "〜れる/られる (Potential) - Can/Be able to", my: "〜れる/られる (Keupayaan) - Boleh" },
        formation: "Verb potential form",
        explanation: { en: "Expresses ability. 'can', 'be able to'.", my: "Meneritakan keupayaan. 'boleh', 'mampu'." },
        examples: [
          { japanese: "日本語が話せます。", romaji: "Nihongo ga hanasemasu.", malay: "Saya boleh berbahasa Jepun." },
          { japanese: "食べられます。", romaji: "Taberaremasu.", malay: "Saya boleh makan." }
        ],
        commonMistakes: { en: "Potential form conjugates as a godan verb.", my: "Bentuk keupayaan berkonjugasi seperti kata kerja godan." }
      },
      {
        slug: "n4-te-aru",
        title: { en: "〜てある - Resultant State (Preparation)", my: "〜てある - Keadaan Hasil (Penyediaan)" },
        formation: "Verb て-form + ある",
        explanation: { en: "Expresses something has been done in preparation.", my: "Meneritakan sesuatu telah dilakukan sebagai penyediaan." },
        examples: [
          { japanese: "予約してある。", romaji: "Yoyaku shite aru.", malay: "Sudah ditempah." }
        ],
        commonMistakes: { en: "てある implies someone did it intentionally.", my: "てある membayangkan seseorang buat dengan sengaja." }
      },
      {
        slug: "n4-te-ok",
        title: { en: "〜ておく - Do in advance", my: "〜ておく - Buat dulu" },
        formation: "Verb て-form + おく",
        explanation: { en: "Expresses doing something in preparation or leaving something as is.", my: "Meneritakan melakukan sesuatu sebagai penyediaan atau biarkan sesuatu macam itu." },
        examples: [
          { japanese: "友達来るから、部屋を掃除しておく。", romaji: "Tomodachi kuru kara, heya wo souji shite oku.", malay: "Kawan nak datang, saya sapu rumah dulu." }
        ],
        commonMistakes: { en: "ておく shows preparation or leaving something in a state.", my: "ておく menunjukkan penyediaan atau membiarkan sesuatu dalam keadaan." }
      },
      {
        slug: "n4-te-shimau",
        title: { en: "〜てしまう - Finish/Regrettably", my: "〜てしまう - Habiskan/Malangnya" },
        formation: "Verb て-form + しまう",
        explanation: { en: "Expresses completing an action or doing something regrettably.", my: "Meneritakan melengkapkan tindakan atau buat sesuatu malangnya." },
        examples: [
          { japanese: "食べてしまった。", romaji: "Tabete shimatta.", malay: "Saya sudah habiskan (malangnya)." }
        ],
        commonMistakes: { en: "てしまう often implies regret or unintended result.", my: "てしまう sering imply menyesal atau keputusan yang tidak dimaksudkan." }
      },
      {
        slug: "n4-te-miseru",
        title: { en: "〜てみせる - Do and show/Prove", my: "〜てみせる - Buat dan tunjuk/Bukti" },
        formation: "Verb て-form + みせる",
        explanation: { en: "Expresses doing something to show or prove a point.", my: "Meneritakan melakukan sesuatu untuk menunjukkan atau membuktikan sesuatu." },
        examples: [
          { japanese: "必ず合格してみせる。", romaji: "Kanarazu goukaku shite miseru.", malay: "Saya akan lulus dan tunjuk." }
        ],
        commonMistakes: { en: "てみせる shows determination or intent to prove.", my: "てみせる menunjukkan keazaman atau niat untuk buktikan." }
      },
      {
        slug: "n4-nai-hou-ga-ii",
        title: { en: "〜ない方がいい - Better not to", my: "〜ない方がいい - Lebih baik jangan" },
        formation: "Verb ない-form + 方がいい",
        explanation: { en: "Expresses that it's better not to do something.", my: "Meneritakan lebih baik jangan buat sesuatu." },
        examples: [
          { japanese: "行かない方がいい。", romaji: "Ikanai hou ga ii.", malay: "Lebih baik jangan pergi." }
        ],
        commonMistakes: { en: "Use ない-form (not ない) before 方がいい.", my: "Guna bentuk ない-form (bukan ない) sebelum 方がいい." }
      },
      {
        slug: "n4-tari-suru",
        title: { en: "〜たりする - Do things like", my: "〜たりする - Buat barang seperti" },
        formation: "Verb た-form + りする",
        explanation: { en: "Expresses doing things like (giving examples of actions).", my: "Meneritakan buat barang seperti ( bagi contoh-contoh tindakan)." },
        examples: [
          { japanese: "日曜日、私は映画を見たり、本を読んだりします。", romaji: "Nichiyoubi, watashi wa eiga wo mitari, hon wo yondari shimasu.", malay: "Ahad, saya tengok filem, baca buku dan lain-lain." }
        ],
        commonMistakes: { en: "Use multiple 〜たり to list actions.", my: "Guna multiple 〜たり untuk senaraikan tindakan." }
      },
      {
        slug: "n4-te-kure",
        title: { en: "〜てくれる - Someone does for me", my: "〜てくれる - Seseorang buat untuk saya" },
        formation: "Verb て-form + くれる",
        explanation: { en: "Someone does something for me (favor given to speaker).", my: "Seseorang melakukan sesuatu untuk saya (kebaikan yang diberi kepada pencerita)." },
        examples: [
          { japanese: "先生が教えてくれた。", romaji: "Sensei ga oshiete kureta.", malay: "Guru saya telah ajar saya." }
        ],
        commonMistakes: { en: "Use てあげる when YOU do something for someone else.", my: "Guna てあげる apabila ANDA melakukan sesuatu untuk orang lain." }
      },
      {
        slug: "n4-mitai",
        title: { en: "〜みたい - Like/Similar to", my: "〜みたい - macam" },
        formation: "N / Verb + みたい",
        explanation: { en: "Expresses similarity or appearance.", my: "Meneritakan persamaan atau rupa." },
        examples: [
          { japanese: "彼は約束を忘れたみたいです。", romaji: "Kare wa yakusoku o wasureta mitai desu.", malay: "Dia macam dah lupa janji." }
        ],
        commonMistakes: { en: "みたい is more casual than ようだ.", my: "みたい lebih casual daripada ようだ." }
      },
      {
        slug: "n4-sugiru",
        title: { en: "〜すぎる - Too much", my: "〜すぎる - Terlalu" },
        formation: "Verb stem / Adj + すぎる",
        explanation: { en: "Expresses something is too much/excessive.", my: "Meneritakan sesuatu terlalu banyak/berlebihan." },
        examples: [
          { japanese: "食べすぎました。", romaji: "Tabesugimashita.", malay: "Saya makan terlalu banyak." }
        ],
        commonMistakes: { en: "すぎる is used when something is excessive.", my: "すぎる digunakan bila sesuatu berlebihan." }
      },
      {
        slug: "n4-hodo",
        title: { en: "〜ほど - To the extent that", my: "〜ほど - sehingga tahap" },
        formation: "Sentence + ほど",
        explanation: { en: "Expresses to such an extent that.", my: "Meneritakan sehingga tahap yang." },
        examples: [
          { japanese: "驚くほど上手になった。", romaji: "Odoroku hodo jouzu ni natta.", malay: "Dia menjadi pandai sehingga menakjubkan." }
        ],
        commonMistakes: { en: "ほど emphasizes the degree/extent of an action.", my: "ほど menekankan tahap/degri sesuatu tindakan." }
      },
      {
        slug: "n4-mam",
        title: { en: "〜まま - As is/While", my: "〜まま - Macam mana/Capture" },
        formation: "Verb て-form / Adj + まま",
        explanation: { en: "Expresses doing something as it is, leaving unchanged.", my: "Meneritakan buat sesuatu macam mana ia, biarkan tidak berubah." },
        examples: [
          { japanese: "靴のまま部屋に入った。", romaji: "Kutsu no mama de heya ni haitta.", malay: "Saya masuk bilik dengan kasut macam mana adanya." }
        ],
        commonMistakes: { en: "まま implies leaving something in its original state.", my: "まま imply membiarkan sesuatu dalam keadaan asal." }
      },
      {
        slug: "n4-tsutsu",
        title: { en: "〜つつある - In the process of", my: "〜つつある - Dalam proses" },
        formation: "Verb stem + つつある",
        explanation: { en: "Expresses something is gradually changing.", my: "Meneritakan sesuatu secara beransur berubah." },
        examples: [
          { japanese: "状況は改善されつつある。", romaji: "Joukyou wa kaizen saretsutsu aru.", malay: "Situasi secara beransur bertambah baik." }
        ],
        commonMistakes: { en: "つつある is used for gradual, ongoing change.", my: "つつある digunakan untuk perubahan beransur dan berterusan." }
      },
      {
        slug: "n4-darak",
        title: { en: "〜だらけ - Full of/Littered with", my: "〜だらけ - Penuh dengan" },
        formation: "N + だらけ",
        explanation: { en: "Expresses being full of something (usually negative).", my: "Meneritakan penuh dengan sesuatu (biasanya negatif)." },
        examples: [
          { japanese: "部屋はごみだらけだった。", romaji: "Heya wa gomi darake datta.", malay: "Bilik penuh dengan sampah." }
        ],
        commonMistakes: { en: "だらけ has a strong negative connotation.", my: "だらけ mempunyai konotasi negatif yang kuat." }
      },
      {
        slug: "n4-ppoi",
        title: { en: "〜っぽい - Looks like/Seems (casual)", my: "〜っぽい - Macam/Nampaknya (casual)" },
        formation: "N / Adj + っぽい",
        explanation: { en: "Expresses something seems or looks like (casual).", my: "Meneritakan sesuatu nampaknya atau rupanya (casual)." },
        examples: [
          { japanese: "男っぽい女の子", romaji: "Otoko ppoi onna no ko", malay: "Budak perempuan yang macam budak lelaki" }
        ],
        commonMistakes: { en: "っぽい is very casual and colloquial.", my: "っぽい sangat casual dan colloquial." }
      },
      {
        slug: "n4-rashii",
        title: { en: "〜らしい - Seems like/Appears", my: "〜らしい - Nampaknya/Rupanya" },
        formation: "N / Verb + らしい",
        explanation: { en: "Expresses something seems or appears to be typical of.", my: "Meneritakan sesuatu nampaknya atau rupanya tipikal bagi." },
        examples: [
          { japanese: "今日は雨らしい。", romaji: "Kyou wa ame rashii.", malay: "Hari ini nampaknya hujan." }
        ],
        commonMistakes: { en: "らしい shows something appears to be typical of its nature.", my: "らしい menunjukkan sesuatu nampaknya tipikal bagi sifatnya." }
      },
      {
        slug: "n4-beki",
        title: { en: "〜べきだ - Should/Ought to", my: "〜べきだ - Patut" },
        formation: "Verb plain form + べきだ",
        explanation: { en: "Should / ought to. Expresses moral obligation or strong recommendation.", my: "Patut / Seharusnya. Meneritakan obligasi moral atau cadangan kuat." },
        examples: [
          { japanese: "約束は守るべきだ。", romaji: "Yakusoku wa mamoru beki da.", malay: "Patut tunaikan janji." }
        ],
        commonMistakes: { en: "べきだ is quite strong - for lighter suggestions use 〜た方がいい.", my: "べきだ agak kuat - untuk cadangan ringan guna 〜た方がいい." }
      },
      {
        slug: "n4-koto-ga-dekiru",
        title: { en: "ことができる - Can/Be able to", my: "ることができる - Boleh" },
        formation: "Verb dict + ことができる",
        explanation: { en: "Expresses ability or possibility.", my: "Meneritakan keupayaan atau kemungkinan." },
        examples: [
          { japanese: "日本語を話すことができます。", romaji: "Nihongo wo hanasu koto ga dekimasu.", malay: "Saya boleh berbahasa Jepun." }
        ],
        commonMistakes: { en: "Use the dictionary form before こと.", my: "Guna bentuk kamus sebelum こと." }
      },
      {
        slug: "n4-node",
        title: { en: "〜ので - Because", my: "〜ので - sebab" },
        formation: "Plain sentence + ので",
        explanation: { en: "Expresses reason with a more objective feel than から.", my: "Meneritakan sebab dengan rasa yang lebih objektif." },
        examples: [
          { japanese: "眠いので先に寝ます。", romaji: "Nemui node saki ni nemasu.", malay: "Saya nak tidur dulu sebab mengantuk." }
        ],
        commonMistakes: { en: "ので has a softer, more objective tone than から.", my: "ので mempunyai nada yang lebih lembut dan objektif daripada から." }
      },
      {
        slug: "n4-no-nomi",
        title: { en: "〜のみ - Only (formal)", my: "〜のみ - Hanya (formal)" },
        formation: "N + のみ",
        explanation: { en: "Only, exclusively. More formal than だけ.", my: "Hanya, secara eksklusif. Lebih formal daripada だけ." },
        examples: [
          { japanese: "参加者のみ入場できます。", romaji: "Sankasha nomi nyuujou dekimasu.", malay: "Hanya peserta boleh masuk." }
        ],
        commonMistakes: { en: "のみ is a formal equivalent of だけ.", my: "のみ adalah formal equivalent bagi だけ." }
      },
      {
        slug: "n4-hoshii",
        title: { en: "ほしい - Want (for things)", my: "ほしい - Nak (untuk barang)" },
        formation: "N + が + ほしい / Verb + ほしい",
        explanation: { en: "Expresses wanting something or wanting to do something.", my: "Meneritakan nak sesuatu atau nak buat sesuatu." },
        examples: [
          { japanese: "水がほしい。", romaji: "Mizu ga hoshii.", malay: "Saya nak air." }
        ],
        commonMistakes: { en: "Use 〜たい for wanting to do verbs.", my: "Guna 〜たい untuk kata kerja." }
      },
      {
        slug: "n4-yasui",
        title: { en: "やすい (Yasui) - Easy to/Tends to", my: "やすい - Mudah/cendekiang" },
        formation: "Verb stem + やすい",
        explanation: { en: "Expresses something is easy to do or tends to happen.", my: "Meneritakan sesuatu senang buat atau cenderung berlaku." },
        examples: [
          { japanese: "この辞書は使いやすい。", romaji: "Kono jisho wa tsukaiyasui.", malay: "Kamus ini senang digunakan." }
        ],
        commonMistakes: { en: "やすい shows ease or tendency, not preference.", my: "やすい menunjukkan kemudahan atau kecenderungan, bukan keutamaan." }
      },
      {
        slug: "n4-nikui",
        title: { en: "にくい (Nikui) - Difficult to/Hard to", my: "にくい - Susah/Bermasalah" },
        formation: "Verb stem + にくい",
        explanation: { en: "Expresses something is difficult to do.", my: "Meneritakan sesuatu susah untuk buat." },
        examples: [
          { japanese: "この言葉は覚えにくい。", romaji: "Kono kotoba wa oboenikui.", malay: "Perkataan ini susah untuk ingat." }
        ],
        commonMistakes: { en: "にくい is for things that are intrinsically hard.", my: "にくい untuk barang yang susah secara semulajadi." }
      },
      {
        slug: "n4-kurai-gurai",
        title: { en: "くらい/っこう - About/Approximately", my: "くらい/っこう - Lebih kurang" },
        formation: "N / Verb + くらい",
        explanation: { en: "Expresses approximation of quantity or degree.", my: "Meneritakan penghampiran kuantiti atau tahap." },
        examples: [
          { japanese: "一週間くらいかかる。", romaji: "Isshuukan kurai kakaru.", malay: "Akan ambil masa lebih kurang seminggu." }
        ],
        commonMistakes: { en: "くらい emphasizes the approximate amount.", my: "くらい menekankan jumlah yang anggaran." }
      },
      {
        slug: "n4-dake",
        title: { en: "〜だけ - Only/Just", my: "〜だけ - Hanya" },
        formation: "N / Verb + だけ",
        explanation: { en: "Expresses limitation or exclusivity.", my: "Meneritakan had atau eksklusiviti." },
        examples: [
          { japanese: "それだけください。", romaji: "Sore dake kudasai.", malay: "Beri saya itu sahaja." }
        ],
        commonMistakes: { en: "だけ emphasizes limitation.", my: "だけ menekankan had." }
      },
      {
        slug: "n4-nakucha",
        title: { en: "〜なくちゃ - Must/Have to (casual)", my: "〜なくちゃ - Mesti (casual)" },
        formation: "Verb ない-form + なくちゃ",
        explanation: { en: "Casual form of 〜なければならない.", my: "Bentuk casual bagi 〜なければならない." },
        examples: [
          { japanese: "行かなくちゃ。", romaji: "Ikanakucha.", malay: "Saya mestilah pergi." }
        ],
        commonMistakes: { en: "なくちゃ is a casual contraction.", my: "なくちゃ adalah singkatan casual." }
      },
      {
        slug: "n4-nakya",
        title: { en: "〜なきゃ - Must/Have to (casual)", my: "〜なきゃ - Mesti (casual)" },
        formation: "Verb ない-form + なきゃ",
        explanation: { en: "Casual form of 〜なければならない.", my: "Bentuk casual bagi 〜なければならない." },
        examples: [
          { japanese: "食べなきゃ。", romaji: "Tabenakya.", malay: "Saya mestilah makan." }
        ],
        commonMistakes: { en: "なきゃ is a casual contraction.", my: "なきゃ adalah singkatan casual." }
      },
      {
        slug: "n4-kosya-kamoshirenai",
        title: { en: "〜かもしれない - Maybe/Possibly", my: "〜かもしれない - Mungkin" },
        formation: "Sentence + かもしれない",
        explanation: { en: "Expresses uncertainty or possibility.", my: "Meneritakan ketidakpastian atau kemungkinan." },
        examples: [
          { japanese: "明日雨かもしれない。", romaji: "Ashita ame kamo shirenai.", malay: "Esok mungkin hujan." }
        ],
        commonMistakes: { en: "かもしれない shows uncertainty, not strong probability.", my: "かもしれない menunjukkan ketidakpastian, bukan kebarangkalian yang kuat." }
      }
    ]
  },
  n3: {
    title: "JLPT N3 Grammar",
    description: "Intermediate grammar. Learn nuanced expressions and complex sentence structures.",
    grammar: [
      {
        slug: "n3-tame",
        title: { en: "〜ために (tame ni) - For/In order to", my: "〜ために - Untuk/Bagi pihak" },
        formation: "N + の + ために / Verb dict + ために",
        explanation: { en: "〜ために means 'for the sake of', 'for', or 'in order to'.", my: "〜ために bermakna 'untuk', 'bagi pihak', atau 'supaya'." },
        examples: [
          { japanese: "日本語を勉強するために、日本へ行きます。", romaji: "Nihongo o benkyou suru tame ni, Nihon e ikimasu.", malay: "Saya pergi ke Jepun untuk belajar bahasa Jepun." }
        ],
        commonMistakes: { en: "〜ために for purpose uses dictionary form + ために, NOT て-form.", my: "〜ために untuk tujuan gunakan bentuk kamus + ために." }
      },
      {
        slug: "n3-sou-desu",
        title: { en: "〜そうです - Looks like/Seems", my: "〜そうです - Nampaknya" },
        formation: "Verb stem/sentence + そうです",
        explanation: { en: "Looks like / seems that. Expresses hearsay or appearance.", my: "Nampaknya / Rupanya. Meneritakan khabar atau rupa." },
        examples: [
          { japanese: "雨が降りそうです。", romaji: "Ame ga furi sou desu.", malay: "Nampaknya akan hujan." }
        ],
        commonMistakes: { en: "〜そう with adjectives drops いい → 良さそう.", my: "〜そう dengan adjektif tukar いい → 良さそう." }
      },
      {
        slug: "n3-nai-kereba",
        title: { en: "〜なければ - If one doesn't/Must not", my: "〜なければ - Tidak boleh" },
        formation: "Verb ない-form + ければ",
        explanation: { en: "Must not / if one doesn't. Expresses necessity or conditional obligation.", my: "Tidak boleh / jika tidak. Meneritakan keperluan atau syarat obligasi." },
        examples: [
          { japanese: "食べなければ痩せられない。", romaji: "Tabenakereba yaserarenai.", malay: "Kalau tak makan, tak boleh kurus." }
        ],
        commonMistakes: { en: "Often combined with なりません: 〜なければなければなりません.", my: "Selalu digabungkan dengan なりません." }
      },
      {
        slug: "n3-wake-nai",
        title: { en: "〜わけがない - There\\'s no way/Impossible", my: "〜わけがない - Tak mungkin" },
        formation: "Plain sentence + わけがない",
        explanation: { en: "There's no way / impossible. Strong denial.", my: "Tak mungkin / Mustahil. Penafian yang kuat." },
        examples: [
          { japanese: "彼が嘘をつくわけがない。", romaji: "Kare ga uso wo tsuku wake ga nai.", malay: "Tak mungkin dia tipu." }
        ],
        commonMistakes: { en: "〜わけがない is stronger than 〜ない.", my: "〜わけがない lebih kuat daripada 〜ない." }
      },
      {
        slug: "n3-ni-kansuru",
        title: { en: "〜に関する - Regarding/Concerning", my: "〜に関する - Mengenai" },
        formation: "Noun + に関する",
        explanation: { en: "Regarding / concerning. Used to indicate the topic of discussion.", my: "Mengenai / Berkaitan. Digunakan untuk menunjukkan topik perbincangan." },
        examples: [
          { japanese: "日本文化に関する本を買いました。", romaji: "Nihon bunka ni kansuru hon wo kaimashita.", malay: "Saya beli buku mengenai budaya Jepun." }
        ],
        commonMistakes: { en: "に関する is a noun modifier - it must be followed by a noun.", my: "に関する adalah pengubahsuai noun." }
      },
      {
        slug: "n3-beki",
        title: { en: "〜べきだ - Should/Ought to", my: "〜べきだ - Patut" },
        formation: "Verb plain form + べきだ",
        explanation: { en: "Should / ought to. Expresses moral obligation or strong recommendation.", my: "Patut / Seharusnya. Meneritakan obligasi moral atau cadangan kuat." },
        examples: [
          { japanese: "約束は守るべきだ。", romaji: "Yakusoku wa mamoru beki da.", malay: "Patut tunaikan janji." }
        ],
        commonMistakes: { en: "べきだ is quite strong - for lighter suggestions use 〜た方がいい.", my: "べきだ agak kuat - untuk cadangan ringan guna 〜た方がいい." }
      },
      {
        slug: "n3-koto-ni-naru",
        title: { en: "〜ことになる - It has been decided that", my: "〜ことになる - Sudah decided bahawa" },
        formation: "Verb dictionary + ことになる",
        explanation: { en: "Expresses a decision has been made or something has been arranged.", my: "Meneritakan keputusan telah dibuat atau sesuatu telah diatur." },
        examples: [
          { japanese: "来月日本に行くことになった。", romaji: "Raigetsu Nihon ni iku koto ni natta.", malay: "Saya akan pergi ke Jepun bulan depan." }
        ],
        commonMistakes: { en: "This is for decisions made by others/circumstances, not personal volition.", my: "Ini untuk keputusan oleh orang lain/keadaan, bukan kehendak peribadi." }
      },
      {
        slug: "n3-koto-ni-suru",
        title: { en: "〜ことにする - Decide to", my: "〜ことにする - Buat keputusan untuk" },
        formation: "Verb dictionary + ことにする",
        explanation: { en: "Expresses making a personal decision to do something.", my: "Meneritakan membuat keputusan peribadi untuk melakukan sesuatu." },
        examples: [
          { japanese: "毎日運動することにした。", romaji: "Mainichi undou suru koto ni shita.", malay: "Saya buat keputusan untuk bersenam setiap hari." }
        ],
        commonMistakes: { en: "Use ことになる for decisions made for you by others.", my: "Gunakan ことになる untuk keputusan oleh orang lain." }
      },
      {
        slug: "n3-nakute-mo-ii",
        title: { en: "〜なくてもいい - Don\\'t have to", my: "〜なくてもいい - Tak perlu" },
        formation: "Verb ない-form + なくてもいい",
        explanation: { en: "Expresses that something is not necessary.", my: "Meneritakan sesuatu tidak diperlukan." },
        examples: [
          { japanese: "行かなくてもいい。", romaji: "Ik nakute mo ii.", malay: "Tak perlu pergi." }
        ],
        commonMistakes: { en: "This is permission to NOT do something.", my: "Ini adalah keizinan untuk TIDAK buat sesuatu." }
      },
      {
        slug: "n3-kurai",
        title: { en: "〜くらい - About/Approximately", my: "〜くらい - Lebih kurang" },
        formation: "N / Verb + くらい",
        explanation: { en: "Expresses approximation or extent.", my: "Meneritakan penghampiran atau tahap." },
        examples: [
          { japanese: "一週間くらいかかる。", romaji: "Isshuukan kurai kakaru.", malay: "Akan ambil masa lebih kurang seminggu." }
        ],
        commonMistakes: { en: "くらい emphasizes the extent of an action.", my: "くらい menekankan tahap sesuatu tindakan." }
      },
      {
        slug: "n3-made",
        title: { en: "〜まで - Until", my: "〜まで - Sampai" },
        formation: "N / Verb + まで",
        explanation: { en: "Expresses until a point in time or space.", my: "Meneritakan sehingga satu titik masa atau ruang." },
        examples: [
          { japanese: "朝まで待ってください。", romaji: "Asa made matte kudasai.", malay: "Tolong tunggu sehingga pagi." }
        ],
        commonMistakes: { en: "まで includes the endpoint.", my: "まで termasuk titik akhir." }
      },
      {
        slug: "n3-made-ni",
        title: { en: "〜までに - By (deadline)", my: "〜までに - Menjelang" },
        formation: "Verb + までに",
        explanation: { en: "Expresses a deadline - by when something must be done.", my: "Meneritakan deadline - menjelang bila sesuatu mestilah siap." },
        examples: [
          { japanese: "明日までに終わらせてください。", romaji: "Ashita made ni owirasete kudasai.", malay: "Tolong siap menjelang esok." }
        ],
        commonMistakes: { en: "までに emphasizes the deadline, not the duration.", my: "までに menekankan deadline." }
      },
      {
        slug: "n3-dake",
        title: { en: "〜だけ - Only/Just", my: "〜だけ - Hanya" },
        formation: "N / Verb + だけ",
        explanation: { en: "Expresses limitation or exclusivity.", my: "Meneritakan had atau eksklusiviti." },
        examples: [
          { japanese: "それだけください。", romaji: "Sore dake kudasai.", malay: "Beri saya itu sahaja." }
        ],
        commonMistakes: { en: "だけ emphasizes limitation.", my: "だけ menekankan had." }
      },
      {
        slug: "n3-hoshii",
        title: { en: "〜ほしい - Want (N3 level)", my: "〜ほしい - Nak" },
        formation: "Verb たい-form + ほしい",
        explanation: { en: "Expresses wanting someone else to do something.", my: "Meneritakan nak seseorang buat sesuatu." },
        examples: [
          { japanese: "もっと勉強してほしい。", romaji: "Motto benkyou shite hoshii.", malay: "Saya nak dia belajar lebih." }
        ],
        commonMistakes: { en: "Use 〜たい for personal wants.", my: "Guna 〜たい untuk keinginan peribadi." }
      },
      {
        slug: "n3-garu",
        title: { en: "〜がる - Feel/Want (observed)", my: "〜がる - Rasa/Nak (diobserv)" },
        formation: "Adj (い→〜)+がる / Adj (な→〜)+がる",
        explanation: { en: "Expresses that someone appears to feel or want something (observed).", my: "Meneritakan seseorang kelihatan rasa atau nak sesuatu (diobserv)." },
        examples: [
          { japanese: "彼が痛がっている。", romaji: "Kare ga itogatte iru.", malay: "Dia kelihatan sakit." }
        ],
        commonMistakes: { en: "〜がる is for observing others\\' feelings.", my: "〜がる untuk observasi perasaan orang lain." }
      },
      {
        slug: "n3-youda",
        title: { en: "〜ようだ (Youda) - It seems/Like", my: "〜ようだ - Nampaknya/Macam" },
        formation: "N + の + ようだ / Verb + ようだ",
        explanation: { en: "Expresses similarity or conjecture. 'it seems like', 'as if'.", my: "Meneritakan persamaan atau tekaan. 'nampaknya', 'macam'." },
        examples: [
          { japanese: "彼は日本人のようだ。", romaji: "Kare wa Nihonjin no youda.", malay: "Dia macam orang Jepun." }
        ],
        commonMistakes: { en: "よう，比喻性的/推断性的", my: "ようだ lebih formal daripada みたいだ." }
      },
      {
        slug: "n3-passive",
        title: { en: "〜れる/られる (Passive)", my: "〜れる/られる (Pasif)" },
        formation: "Verb passive form",
        explanation: { en: "Passive voice. The subject receives an action.", my: "Suara pasif. Subjek menerima suatu tindakan." },
        examples: [
          { japanese: "この本は很多人に読まれました。", romaji: "Kono hon wa takusennin ni yokaremashita.", malay: "Buku ini dibaca oleh ramai orang." }
        ],
        commonMistakes: { en: "れる is godan passive, られる is ichidan passive.", my: "れる adalah pasif godan, られる adalah pasif ichidan." }
      },
      {
        slug: "n3-causative",
        title: { en: "〜せる/させる (Causative)", my: "〜せる/させる (Kausatif)" },
        formation: "Verb causative form",
        explanation: { en: "Causative. Making or letting someone do something.", my: "Kausatif. Memaksa atau membiarkan seseorang melakukan sesuatu." },
        examples: [
          { japanese: "子供に野菜を食べさせた。", romaji: "Kodomo ni yasai wo tabesashita.", malay: "Saya paksa anak makan sayur." }
        ],
        commonMistakes: { en: "Causative form conjugates as a godan verb.", my: "Bentuk kausatif berkonjugasi seperti kata kerja godan." }
      },
      {
        slug: "n3-causative-passive",
        title: { en: "〜せられる/させられる (Causative Passive)", my: "〜せられる/させられる" },
        formation: "Verb causative passive form",
        explanation: { en: "Being made to do something against one's will.", my: "Dipaksa melakukan sesuatu menentang kehendak." },
        examples: [
          { japanese: "毎日残業させられた。", romaji: "Mainichi zangyou sasetareta.", malay: "Saya dipaksa buat overtime setiap hari." }
        ],
        commonMistakes: { en: "This form expresses being forced to do something.", my: "Bentuk ini menyatakan dipaksa buat sesuatu." }
      },
      {
        slug: "n3-non-demo",
        title: { en: "〜んだけど - мя/но (Background + contrast)", my: "〜んだけど - Tapi/Walau" },
        formation: "Sentence + んだけど",
        explanation: { en: "Provides background context then introduces a contrast or problem.", my: "Beri konteks latarbelakang kemudian perkenalkan kontras atau masalah." },
        examples: [
          { japanese: "日本に住んでいたんだけど、緑が恋しい。", romaji: "Nihon ni sunde ita n dakedo, midori ga koishii.", malay: "Saya duduk di Jepun, tapi rindu hijau." }
        ],
        commonMistakes: { en: "〜んだけど sets up expectation that is then contrasted.", my: "〜んだけど menyediakan jangkaan yang kemudian dikontraskan." }
      },
      {
        slug: "n3-mam",
        title: { en: "〜まま - As is/While", my: "〜まま - Capture/Lepas" },
        formation: "Verb て-form / Adj + まま",
        explanation: { en: "Leaving something in its original state.", my: "Membiarkan sesuatu dalam keadaan asal." },
        examples: [
          { japanese: "靴のまま部屋に入った。", romaji: "Kutsu no mama de heya ni haitta.", malay: "Saya masuk bilik dengan kasut seperti adanya." }
        ],
        commonMistakes: { en: "まま implies no change was made.", my: "まま imply tiada perubahan dibuat." }
      },
      {
        slug: "n3-tsutsu-nagara",
        title: { en: "〜つつ - While (literary)", my: "〜つつ - sambil" },
        formation: "Verb stem + つつ",
        explanation: { en: "While doing something. More literary than ながら.", my: "Sambil melakukan sesuatu. Lebih sastera daripada ながら." },
        examples: [
          { japanese: "考えつつ、歩く。", romaji: "Kangaetsutsu, aruku.", malay: "Berjalan sambil berfikir." }
        ],
        commonMistakes: { en: "つつ is more literary than ながら.", my: "つつ lebih sastera daripada ながら." }
      },
      {
        slug: "n3-darak",
        title: { en: "〜だらけ - Full of/Littered with", my: "〜だらけ - Penuh dengan" },
        formation: "N + だらけ",
        explanation: { en: "Full of something (usually negative).", my: "Penuh dengan sesuatu (biasanya negatif)." },
        examples: [
          { japanese: "部屋はごみだらけだった。", romaji: "Heya wa gomi darake datta.", malay: "Bilik penuh dengan sampah." }
        ],
        commonMistakes: { en: "だらけ has a strong negative connotation.", my: "だらけ mempunyai konotasi negatif yang kuat." }
      },
      {
        slug: "n3-ppoi",
        title: { en: "〜っぽい - Looks like (casual)", my: "〜っぽい - Macam (casual)" },
        formation: "N / Adj + っぽい",
        explanation: { en: "Seems like something (casual style).", my: "Macam sesuatu (gaya casual)." },
        examples: [
          { japanese: "男っぽい女の子", romaji: "Otoko ppoi onna no ko", malay: "Budak perempuan yang macam budak lelaki" }
        ],
        commonMistakes: { en: "っぽい is very casual and colloquial.", my: "っぽい sangat casual." }
      },
      {
        slug: "n3-rashii",
        title: { en: "〜らしい - Seems like/Appears", my: "〜らしい - Nampaknya" },
        formation: "N / Verb + らしい",
        explanation: { en: "Seems typical of something.", my: "Nampaknya tipikal bagi sesuatu." },
        examples: [
          { japanese: "今日は雨らしい。", romaji: "Kyou wa ame rashii.", malay: "Hari ini nampaknya hujan." }
        ],
        commonMistakes: { en: "らしい shows typical characteristics.", my: "らしい menunjukkan ciri-ciri tipikal." }
      },
      {
        slug: "n3-yasui",
        title: { en: "〜やすい - Easy to/Tends to", my: "〜やすい - Mudah/Cenderung" },
        formation: "Verb stem + やすい",
        explanation: { en: "Easy to do or tends to happen.", my: "Mudah buat atau cenderung berlaku." },
        examples: [
          { japanese: "この辞書は使いやすい。", romaji: "Kono jisho wa tsukaiyasui.", malay: "Kamus ini mudah digunakan." }
        ],
        commonMistakes: { en: "やすい shows ease or tendency.", my: "やすい menunjukkan kemudahan atau kecenderungan." }
      },
      {
        slug: "n3-nikui",
        title: { en: "〜にくい - Difficult to", my: "〜にくい - Susah/Bermasalah" },
        formation: "Verb stem + にくい",
        explanation: { en: "Difficult to do.", my: "Susah untuk buat." },
        examples: [
          { japanese: "この言葉は覚えにくい。", romaji: "Kono kotoba wa oboenikui.", malay: "Perkataan ini susah untuk diingat." }
        ],
        commonMistakes: { en: "にくい is for things intrinsically hard.", my: "にくい untuk barang yang susah secara semulajadi." }
      },
      {
        slug: "n3-koto",
        title: { en: "〜こと - Nominalizer", my: "〜こと - Pengkinian" },
        formation: "Verb + こと",
        explanation: { en: "Turns a verb into a noun phrase.", my: "Mengubah kata kerja kepada frasa nama." },
        examples: [
          { japanese: "日本語を勉強することは楽しい。", romaji: "Nihongo wo benkyou suru koto wa tanoshii.", malay: "Belajar bahasa Jepun adalah menyeronokkan." }
        ],
        commonMistakes: { en: "こと is used for general truths, の for specific.", my: "こと digunakan untuk kebenaran umum, の untuk spesifik." }
      },
      {
        slug: "n3-tame-ni",
        title: { en: "〜ために (tame ni) - For/In order to", my: "〜ために - Untuk/Bagi pihak" },
        formation: "N + の + ために / Verb dict + ために",
        explanation: { en: "For the sake of, in order to.", my: "Untuk, bagi pihak, supaya." },
        examples: [
          { japanese: "日本語を勉強するために、日本へ行きます。", romaji: "Nihongo o benkyou suru tame ni, Nihon e ikimasu.", malay: "Saya pergi ke Jepun untuk belajar bahasa Jepun." }
        ],
        commonMistakes: { en: "Use dictionary form before ために, NOT て-form.", my: "Guna bentuk kamus sebelum ために, BUKAN て-form." }
      },
      {
        slug: "n3-koto-ni-naru",
        title: { en: "〜ことになる - It has been decided that", my: "〜ことになる - Sudah decided bahawa" },
        formation: "Verb dictionary + ことになる",
        explanation: { en: "A decision has been made or something arranged.", my: "Keputusan telah dibuat atau sesuatu telah diatur." },
        examples: [
          { japanese: "来月日本に行くことになった。", romaji: "Raigetsu Nihon ni iku koto ni natta.", malay: "Saya akan pergi ke Jepun bulan depan." }
        ],
        commonMistakes: { en: "For decisions made by others/circumstances.", my: "Untuk keputusan oleh orang lain/keadaan." }
      },
      {
        slug: "n3-nakute-mo-ii",
        title: { en: "〜なくてもいい - Don\\'t have to", my: "〜なくてもいい - Tak perlu" },
        formation: "Verb ない-form + なくてもいい",
        explanation: { en: "Something is not necessary.", my: "Sesuatu tidak diperlukan." },
        examples: [
          { japanese: "行かなくてもいい。", romaji: "Ik nakute mo ii.", malay: "Tak perlu pergi." }
        ],
        commonMistakes: { en: "Permission to NOT do something.", my: "Keizinan untuk TIDAK buat sesuatu." }
      },
      {
        slug: "n3-hodo",
        title: { en: "〜ほど - To the extent that", my: "〜ほど - sehingga tahap" },
        formation: "Sentence + ほど",
        explanation: { en: "To such an extent that.", my: "Dengan tahap yang..." },
        examples: [
          { japanese: "驚くほど上手になった。", romaji: "Odoroku hodo jouzu ni natta.", malay: "Dia menjadi pandai sehingga menakjubkan." }
        ],
        commonMistakes: { en: "ほど emphasizes the degree of an action.", my: "ほど menekankan tahap sesuatu tindakan." }
      },
      {
        slug: "n3-sou-da",
        title: { en: "〜そうだ (sou da) - Looks like/I heard", my: "〜そうだ - Nampaknya/Saya dengar" },
        formation: "Verb stem / Sentence + そうだ",
        explanation: { en: "Appearance or hearsay.", my: "Rupa atau khabar." },
        examples: [
          { japanese: "雨が降りそうだ。", romaji: "Ame ga furi sou da.", malay: "Nampaknya akan hujan." }
        ],
        commonMistakes: { en: "〜そう with adjectives drops いい → 良さそう.", my: "〜そう dengan adjektif tukar いい → 良さそう." }
      },
      {
        slug: "n3-wake-da",
        title: { en: "〜わけだ - No wonder/Of course", my: "〜わけだ - Sudah tentu/Tentu saja" },
        formation: "Sentence + わけだ",
        explanation: { en: "Explains a logical result or understanding.", my: "Terangkan hasil logik atau pemahaman." },
        examples: [
          { japanese: "毎日勉強しているから、上手なわけだ。", romaji: "Mainichi benkyou shite iru kara, jouzu na wake da.", malay: "Sudah tentu pandai sebab belajar setiap hari." }
        ],
        commonMistakes: { en: "わけだ explains why something is true.", my: "わけだ terangkan mengapa sesuatu adalah benar." }
      },
      {
        slug: "n3-nakanaka",
        title: { en: "なかなか - Quite/Rather (with negative)", my: "なかなか - Agak/Sangat (dengan negatif)" },
        formation: "なかなか + ない",
        explanation: { en: "Expresses difficulty achieving something.", my: "Meneritakan kesukaran mencapai sesuatu." },
        examples: [
          { japanese: "簡単には治まらない。", romaji: "Kantan ni wa naorimasan.", malay: "Tidak mudah pulih." }
        ],
        commonMistakes: { en: "なかなか alone often implies negative difficulty.", my: "Sendiri, なかなか sering imply kesukaran negatif." }
      },
      {
        slug: "n3-kankei-ni",
        title: { en: "〜に関して - Regarding/Concerning", my: "〜に関して - Mengenai" },
        formation: "N + に関して",
        explanation: { en: "Regarding / concerning.", my: "Mengenai / Berkaitan." },
        examples: [
          { japanese: "環境に関して議論しました。", romaji: "Kankyou ni kanshite giron shimashita.", malay: "Saya berbincang mengenai alam sekitar." }
        ],
        commonMistakes: { en: "有关 is similar but より formal.", my: "有关 mirip tapi lebih formal." }
      },
      {
        slug: "n3-ni-tsuite",
        title: { en: "〜について - About/Regarding", my: "〜について - Mengenai" },
        formation: "N + について",
        explanation: { en: "About / concerning a topic.", my: "Mengenai / berkenaan satu topik." },
        examples: [
          { japanese: "日本の文化」について研究しています。", romaji: "Nihon no bunka ni tsuite kenkyuu shite imasu.", malay: "Saya mengkaji mengenai budaya Jepun." }
        ],
        commonMistakes: { en: "について focuses on the topic being discussed.", my: "について fokus pada topik yang dibincangkan." }
      },
      {
        slug: "n3-ni-kansuru",
        title: { en: "〜に関する - Regarding/Concerning", my: "〜に関する - Mengenai" },
        formation: "Noun + に関する",
        explanation: { en: "Regarding / concerning.", my: "Mengenai / Berkaitan." },
        examples: [
          { japanese: "日本文化に関する本を買いました。", romaji: "Nihon bunka ni kansuru hon wo kaimashita.", malay: "Saya beli buku mengenai budaya Jepun." }
        ],
        commonMistakes: { en: "に関する must be followed by a noun.", my: "に関する mestilah diikuti oleh kata nama." }
      },
      {
        slug: "n3-ta-koto-ga-aru",
        title: { en: "〜たことがある - Past Experience", my: "〜たことがある - Pernah" },
        formation: "Verb た-form + ことがある",
        explanation: { en: "Has done something before.", my: "Pernah melakukan sesuatu sebelumnya." },
        examples: [
          { japanese: "日本に行ったことがある。", romaji: "Nihon ni itta koto ga aru.", malay: "Saya pernah pergi ke Jepun." }
        ],
        commonMistakes: { en: "Dictionary form + ことがある for habits.", my: "Bentuk kamus + ことがある untuktabiat." }
      },
      {
        slug: "n3-koto-ga-aru",
        title: { en: "〜ことがある - Occasional Habit", my: "〜ことがある - Kadang-kadang" },
        formation: "Verb dict form + ことがある",
        explanation: { en: "Sometimes does something.", my: "Kadang-kadang buat sesuatu." },
        examples: [
          { japanese: "朝早く起きることがあります。", romaji: "Asa hayaku okiru koto ga arimasu.", malay: "Kadang-kadang saya bangun awal." }
        ],
        commonMistakes: { en: "Dictionary form for habits.", my: "Bentuk kamus untuktabiat." }
      },
      {
        slug: "n3-mitai-da",
        title: { en: "〜みたいだ - Seems like", my: "〜みたいだ - Macam" },
        formation: "N / Verb + みたいだ",
        explanation: { en: "Seems like, appears that.", my: "Macam, nampaknya." },
        examples: [
          { japanese: "雨みたいだ。", romaji: "Ame mitai da.", malay: "Macam hujan." }
        ],
        commonMistakes: { en: "みたいだ is casual, ようだ is more formal.", my: "みたいだ casual, ようだ lebih formal." }
      },
      {
        slug: "n3-beki",
        title: { en: "〜べきだ - Should/Ought to", my: "〜べきだ - Patut" },
        formation: "Verb plain form + べきだ",
        explanation: { en: "Should / ought to.", my: "Patut / Seharusnya." },
        examples: [
          { japanese: "約束は守るべきだ。", romaji: "Yakusoku wa mamoru beki da.", malay: "Patut tunaikan janji." }
        ],
        commonMistakes: { en: "べきだ is strong obligation.", my: "べきだ adalah obligasi yang kuat." }
      },
      {
        slug: "n3-nai-kereba-narimasen",
        title: { en: "〜なければならない - Must/Necessary", my: "〜なければならない - Mesti" },
        formation: "Verb ない + なければならない",
        explanation: { en: "Necessity or obligation.", my: "Keperluan atau obligasi." },
        examples: [
          { japanese: "行かなければならない。", romaji: "Ikanakereba naranai.", malay: "Saya mestilah pergi." }
        ],
        commonMistakes: { en: "This is a strong obligation.", my: "Ini adalah obligasi yang kuat." }
      },
      {
        slug: "n3-sou-desu",
        title: { en: "〜そうです - It seems/I heard", my: "〜そうです - Nampaknya" },
        formation: "Verb stem / Sentence + そう",
        explanation: { en: "Appearance or hearsay.", my: "Rupa atau khabar." },
        examples: [
          { japanese: "雨が降りそうです。", romaji: "Ame ga furi sou desu.", malay: "Nampaknya akan hujan." }
        ],
        commonMistakes: { en: "〜そう with adjectives drops いい → 良さそう.", my: "〜そう dengan adjektif tukar いい → 良さそう." }
      },
      {
        slug: "n3-wake-nai",
        title: { en: "〜わけがない - There\\'s no way/Impossible", my: "〜わけがない - Tak mungkin" },
        formation: "Plain sentence + わけがない",
        explanation: { en: "Strong denial. 'There's no way'.", my: "Penafian kuat. 'Tak mungkin'." },
        examples: [
          { japanese: "彼が嘘をつくわけがない。", romaji: "Kare ga uso wo tsuku wake ga nai.", malay: "Tak mungkin dia tipu." }
        ],
        commonMistakes: { en: "〜わけがない is stronger than 〜ない.", my: "〜わけがない lebih kuat daripada 〜ない." }
      },
      {
        slug: "n3-hito",
        title: { en: "〜人 (hito) - Person who does", my: "〜人 - Orang yang buat" },
        formation: "Verb dict form + 人",
        explanation: { en: "A person who does something.", my: "Orang yang buat sesuatu." },
        examples: [
          { japanese: "聞き取り", romaji: "Kikitori", malay: "Pendengar (orang yang mendengar)" }
        ],
        commonMistakes: { en: "聞き取り = listening (the act), 聞き取り上手 = good at listening.", my: "聞き取り = pendengaran (tindakan), 聞き取り上手 = pandai mendengar." }
      },
      {
        slug: "n3-you",
        title: { en: "〜ように (you ni) - So that/In order to", my: "〜ように - Supaya/Agar" },
        formation: "Verb dict / Verb ない-form + ように",
        explanation: { en: "In order to achieve something.", my: "Supaya/agar mencapai sesuatu." },
        examples: [
          { japanese: "合格できるように勉強している。", romaji: "Goukaku dekiru you ni benkyou shite iru.", malay: "Saya belajar supaya boleh lulus." }
        ],
        commonMistakes: { en: "ように uses dictionary/ない-form, not て-form.", my: "ように guna bentuk kamus/ない-form, bukan て-form." }
      },
      {
        slug: "n3-koto",
        title: { en: "〜こと - Nominalizer", my: "〜こと - Pengkinian" },
        formation: "Verb + こと",
        explanation: { en: "Turns a verb into a noun phrase.", my: "Mengubah kata kerja kepada frasa nama." },
        examples: [
          { japanese: "日本語を勉強することは楽しい。", romaji: "Nihongo wo benkyou suru koto wa tanoshii.", malay: "Belajar bahasa Jepun adalah menyeronokkan." }
        ]
      }
    ]
  },
  n2: {
    title: "JLPT N2 Grammar",
    description: "Upper intermediate grammar. Learn formal expressions and complex structures.",
    grammar: [
      {
        slug: "n2-passive",
        title: { en: "〜れる/られる (Passive)", my: "〜れる/られる (Pasif)" },
        formation: "Verb passive form",
        explanation: { en: "Passive voice. Expresses when the subject receives an action.", my: "Suara pasif. Meneritakanapabila subjek menerima suatu tindakan." },
        examples: [
          { japanese: "先生が褒められました。", romaji: "Sensei ni homeraremashita.", malay: "Saya dipuji oleh guru." }
        ]
      },
      {
        slug: "n2-causative",
        title: { en: "〜せる/させる (Causative)", my: "〜せる/させる (Kausatif)" },
        formation: "Verb causative form",
        explanation: { en: "Causative. Expresses making or letting someone do something.", my: "Kausatif. Meneritakan memaksa atau membiarkan seseorang melakukan sesuatu." },
        examples: [
          { japanese: "子供に野菜を食べさせた。", romaji: "Kodomo ni yasai wo tabesashita.", malay: "Saya paksa anak makan sayur." }
        ]
      },
      {
        slug: "n2-causative-passive",
        title: { en: "〜せられる/させられる (Causative Passive)", my: "〜せられる/させられる" },
        formation: "Verb causative passive form",
        explanation: { en: "Being made to do something against one\\'s will.", my: "Dipaksa melakukan sesuatu menentang kehendak." },
        examples: [
          { japanese: "毎日残業させられた。", romaji: "Mainichi zangyou sasetareta.", malay: "Saya dipaksa buat overtime setiap hari." }
        ]
      },
      {
        slug: "n2-nagara",
        title: { en: "〜ながら - While", my: "〜ながら - sambil" },
        formation: "Verb stem + ながら",
        explanation: { en: "Expresses doing two things simultaneously.", my: "Meneritakan melakukan dua cosa secara simultan." },
        examples: [
          { japanese: "音楽を聞きながら勉強する。", romaji: "Ongaku wo kikinagara benkyou suru.", malay: "Belajar sambil dengar muzik." }
        ]
      },
      {
        slug: "n2-tame",
        title: { en: "〜ために - Due to/Because of", my: "〜ために - Disebabkan" },
        formation: "N + の + ために / Adj + ために",
        explanation: { en: "Expresses reason or cause.", my: "Meneritakan sebab atau penyebab." },
        examples: [
          { japanese: "病気のために学校を休んだ。", romaji: "Byouki no tame ni gakkou wo yasunda.", malay: "Saya缺席 sekolah sebab sakit." }
        ]
      },
      {
        slug: "n2-node",
        title: { en: "〜ので - Because", my: "〜ので - sebab" },
        formation: "Plain sentence + ので",
        explanation: { en: "Expresses reason with a more客观 feel than から.", my: "Meneritakan sebab dengan rasa yang lebih objektif." },
        examples: [
          { japanese: "眠いので先に寝ます。", romaji: "Nemui node saki ni nemasu.", malay: "Saya nak tidur dulu sebab mengantuk." }
        ]
      },
      {
        slug: "n2-koto",
        title: { en: "〜こと - Nominalizer", my: "〜こと - Pengkinian" },
        formation: "Verb + こと",
        explanation: { en: "Turns a verb into a noun phrase.", my: "Mengubah kata kerja kepada frasa nama." },
        examples: [
          { japanese: "日本語を勉強することは楽しい。", romaji: "Nihongo wo benkyou suru koto wa tanoshii.", malay: "Belajar bahasa Jepun adalah menyeronokkan." }
        ]
      },
      {
        slug: "n2-nomi",
        title: { en: "〜のみ - Only (formal)", my: "〜のみ - Hanya (formal)" },
        formation: "N + のみ",
        explanation: { en: "Only, exclusively. More formal than だけ.", my: "Hanya, secara eksklusif. Lebih formal daripada だけ." },
        examples: [
          { japanese: "参加者のみ入場できます。", romaji: "Sankasha nomi nyuujou dekimasu.", malay: "Hanya peserta boleh masuk." }
        ]
      },
      {
        slug: "n2-dake-nomi",
        title: { en: "〜だけじゃない - Not only", my: "〜だけじゃない - Bukan sahaja" },
        formation: "N / Verb + だけじゃない",
        explanation: { en: "Expresses not only.", my: "Meneritakan bukan sahaja." },
        examples: [
          { japanese: "日本語だけじゃなくて、英語も話せます。", romaji: "Nihongo dake ja naku, eigo mo hanasemasu.", malay: "Bukan sahaja Jepun, saya boleh cakap English juga." }
        ]
      },
      {
        slug: "n2-kosya",
        title: { en: "〜もしかすると - Maybe", my: "〜もしかすると - Mungkin" },
        formation: "Sentence + かもしれない",
        explanation: { en: "Expresses uncertainty or possibility.", my: "Meneritakan ketidakpastian atau kemungkinan." },
        examples: [
          { japanese: "明日雨かもしれない。", romaji: "Ashita ame kamo shirenai.", malay: "Esok mungkin hujan." }
        ]
      },
      {
        slug: "n2-setumei",
        title: { en: "〜説明 - Explanation format", my: "〜説明 - Format penjelasan" },
        formation: "Verb + 説明",
        explanation: { en: "Used to give explanations.", my: "Digunakan untuk memberi penjelasan." },
        examples: [
          { japanese: "説明する", romaji: "Setsumei suru", malay: "Terangkan" }
        ]
      },
      {
        slug: "n2-ba",
        title: { en: "〜ば (ba) - If (general conditional)", my: "〜ば - Kalau" },
        formation: "Verb ば-form + ば",
        explanation: { en: "General conditional 'if'. Used for hypothetical or general conditions.", my: "Syarat umum 'jika'. Digunakan untuk syarat hipotesis atau umum." },
        examples: [
          { japanese: "見れば、分かります。", romaji: "Mireba, wakarimasu.", malay: "Kalau tengok, anda akan faham." }
        ],
        commonMistakes: { en: "〜ば is for general/hypothetical conditions, not specific events.", my: "〜ば untuk syarat umum/hipotesis, bukan peristiwa spesifik." }
      },
      {
        slug: "n2-tara",
        title: { en: "〜たら (tara) - If/When (specific conditional)", my: "〜たら - Kalau/Apabila" },
        formation: "Verb た-form + ら",
        explanation: { en: "Conditional for specific events or past hypothetical situations.", my: "Syarat untuk peristiwa spesifik atau situasi hipotesis lepas." },
        examples: [
          { japanese: "日本に行ったら、お土産を買います。", romaji: "Nihon ni ittara, omiyage wo kaimasu.", malay: "Kalau saya pergi ke Jepun, saya akan beli oleh-oleh." }
        ],
        commonMistakes: { en: "〜たら is for conditional on specific events.", my: "〜たら untuk syarat pada peristiwa spesifik." }
      },
      {
        slug: "n2-nara",
        title: { en: "〜なら (nara) - If it's the case that", my: "〜なら - Kalau" },
        formation: "N / Plain sentence + なら",
        explanation: { en: "Used when the condition is explicitly stated or assumed.", my: "Digunakan bila syarat adalah explicit stated atau diandaikan." },
        examples: [
          { japanese: "行くなら、連絡してください。", romaji: "Iku nara, renraku shite kudasai.", malay: "Kalau nak pergi, tolong hubungi saya." }
        ],
        commonMistakes: { en: "〜なら focuses on the topic being discussed.", my: "〜なら fokus pada topik yang dibincangkan." }
      },
      {
        slug: "n2-tara-ba",
        title: { en: "〜だったら - If it was/If it were", my: "〜だったら - Kalau itu" },
        formation: "N / Adj + だったら",
        explanation: { en: "Conditional 'if it were' for assumptions.", my: "Syarat 'kalau itu' untuk anggapan." },
        examples: [
          { japanese: "雨だったら、屋内に行きます。", romaji: "Ame datta ra, okunai ni ikimasu.", malay: "Kalau hujan, saya akan pergi ke dalam bangunan." }
        ],
        commonMistakes: { en: "〜だったら is for conditional on a past or assumed state.", my: "〜だったら untuk syarat pada keadaan lepas atau diandaikan." }
      },
      {
        slug: "n2-node-kara",
        title: { en: "〜のだから - Because of the fact that", my: "〜のだから - Oleh sebab" },
        formation: "Sentence + のだから",
        explanation: { en: "Emphasizes the reason is based on fact.", my: "Tekankan sebab adalah berdasarkan fakta." },
        examples: [
          { japanese: "初心者だから、丁寧に教えてください。", romaji: "Shoshinsha da kara, teinei ni oshiete kudasai.", malay: "Oleh sebab saya newbie, tolong ajar dengan terperinci." }
        ],
        commonMistakes: { en: "のだから emphasizes the factual basis of the reason.", my: "のだから tekankan asas fakta bagi sebab." }
      },
      {
        slug: "n2-you-da",
        title: { en: "〜ようだ (you da) - It seems/Like", my: "〜ようだ - Nampaknya/Macam" },
        formation: "N + の + ようだ / Verb + ようだ",
        explanation: { en: "Expresses similarity or conjecture.", my: "Meneritakan persamaan atau tekaan." },
        examples: [
          { japanese: "彼は日本人のようだ。", romaji: "Kare wa Nihonjin no you da.", malay: "Dia macam orang Jepun." }
        ],
        commonMistakes: { en: "ようだ is more formal than みたいだ.", my: "ようだ lebih formal daripada みたいだ." }
      },
      {
        slug: "n2-mitai-da",
        title: { en: "〜みたいだ (mitai da) - Seems like", my: "〜みたいだ - Macam" },
        formation: "N / Verb + みたいだ",
        explanation: { en: "Seems like, appears that.", my: "Macam, nampaknya." },
        examples: [
          { japanese: "雨みたいだ。", romaji: "Ame mitai da.", malay: "Macam hujan." }
        ],
        commonMistakes: { en: "みたいだ is casual, ようだ is more formal.", my: "みたいだ casual, ようだ lebih formal." }
      },
      {
        slug: "n2-rashii",
        title: { en: "〜らしい - Seems like/Appears", my: "〜らしい - Nampaknya" },
        formation: "N / Verb + らしい",
        explanation: { en: "Seems typical of something.", my: "Nampaknya tipikal bagi sesuatu." },
        examples: [
          { japanese: "今日は雨らしい。", romaji: "Kyou wa ame rashii.", malay: "Hari ini nampaknya hujan." }
        ],
        commonMistakes: { en: "らしい shows something appears typical of its nature.", my: "らしい menunjukkan sesuatu nampaknya tipikal bagi sifatnya." }
      },
      {
        slug: "n2-sou-da",
        title: { en: "〜そうだ (sou da) - Looks like/I hear", my: "〜そうだ - Nampaknya/Saya dengar" },
        formation: "Verb stem / Sentence + そうだ",
        explanation: { en: "Appearance or hearsay.", my: "Rupa atau khabar." },
        examples: [
          { japanese: "雨が降りそうだ。", romaji: "Ame ga furi sou da.", malay: "Nampaknya akan hujan." }
        ],
        commonMistakes: { en: "Adjectives: いい → 良さそう.", my: "Adjektif: いい → 良さそう." }
      },
      {
        slug: "n2-kosya-kamoshirenai",
        title: { en: "〜かもしれない - Maybe/Possibly", my: "〜かもしれない - Mungkin" },
        formation: "Sentence + かもしれない",
        explanation: { en: "Expresses uncertainty or possibility.", my: "Meneritakan ketidakpastian atau kemungkinan." },
        examples: [
          { japanese: "明日雨かもしれない。", romaji: "Ashita ame kamo shirenai.", malay: "Esok mungkin hujan." }
        ],
        commonMistakes: { en: "かもしれない shows uncertainty.", my: "かもしれない menunjukkan ketidakpastian." }
      },
      {
        slug: "n2-bakari",
        title: { en: "〜ばかり - Just only/Just did", my: "〜ばかり - Baru sahaja/Hanya" },
        formation: "Verb て-form / N + ばかり",
        explanation: { en: "Just did something or only.", my: "Baru sahaja buat sesuatu atau hanya." },
        examples: [
          { japanese: "来たばかりだ。", romaji: "Kita bakari da.", malay: "Baru sahaja datang." }
        ],
        commonMistakes: { en: "〜たばかり is 'just did', N+ばかり is 'only'.", my: "〜たばかり adalah 'baru sahaja buat', N+ばかり adalah 'hanya'." }
      },
      {
        slug: "n2-hodo",
        title: { en: "〜ほど - To the extent that", my: "〜ほど - sehingga tahap" },
        formation: "Sentence + ほど",
        explanation: { en: "To such an extent that.", my: "Dengan tahap yang..." },
        examples: [
          { japanese: "驚くほど上手になった。", romaji: "Odoroku hodo jouzu ni natta.", malay: "Dia menjadi pandai sehingga menakjubkan." }
        ],
        commonMistakes: { en: "ほど emphasizes degree of an action.", my: "ほど menekankan tahap sesuatu tindakan." }
      },
      {
        slug: "n2-kurai",
        title: { en: "〜くらい - About/Approximately", my: "〜くらい - Lebih kurang" },
        formation: "N / Verb + くらい",
        explanation: { en: "Approximation or extent.", my: "Penghampiran atau tahap." },
        examples: [
          { japanese: "一週間くらいかかる。", romaji: "Isshuukan kurai kakaru.", malay: "Akan ambil masa lebih kurang seminggu." }
        ],
        commonMistakes: { en: "くらい emphasizes approximate extent.", my: "くらい menekankan tahap anggaran." }
      },
      {
        slug: "n2-wake-da",
        title: { en: "〜わけだ - No wonder/Of course", my: "〜わけだ - Sudah tentu/Tentu saja" },
        formation: "Sentence + わけだ",
        explanation: { en: "Explains a logical result.", my: "Terangkan hasil logik." },
        examples: [
          { japanese: "毎日勉強しているから、上手なわけだ。", romaji: "Mainichi benkyou shite iru kara, jouzu na wake da.", malay: "Sudah tentu pandai sebab belajar setiap hari." }
        ],
        commonMistakes: { en: "わけだ explains why something is true.", my: "わけだ terangkan mengapa sesuatu adalah benar." }
      },
      {
        slug: "n2-wake-nai",
        title: { en: "〜わけがない - There's no way", my: "〜わけがない - Tak mungkin" },
        formation: "Plain sentence + わけがない",
        explanation: { en: "Strong denial. 'There's no way'.", my: "Penafian kuat. 'Tak mungkin'." },
        examples: [
          { japanese: "彼が嘘をつくわけがない。", romaji: "Kare ga uso wo tsuku wake ga nai.", malay: "Tak mungkin dia tipu." }
        ],
        commonMistakes: { en: "〜わけがない is stronger than 〜ない.", my: "〜わけがない lebih kuat daripada 〜ない." }
      },
      {
        slug: "n2-wake-niwa-ikanai",
        title: { en: "〜わけにはいかない - Can't in good conscience", my: "〜わけにはいかない - Tak boleh dengan hati nurani" },
        formation: "Verb + わけにはいかない",
        explanation: { en: "Cannot do something due to conscience or circumstances.", my: "Tidak boleh buat sesuatu kerana hati nurani atau keadaan." },
        examples: [
          { japanese: "嘘をつくわけにはいかない。", romaji: "Uso wo tsuku wake ni wa ikenai.", malay: "Saya tak boleh menipu." }
        ],
        commonMistakes: { en: "わけにはいかない is about moral impossibility.", my: "わけにはいかない adalah tentang ketidakmustahilan moral." }
      },
      {
        slug: "n2-mono-da",
        title: { en: "〜ものだ - General truth/Regret", my: "〜ものだ - Kebenaran umum/Penyesalan" },
        formation: "Sentence + ものだ",
        explanation: { en: "Expresses general truth or emotional reflection.", my: "Meneritakan kebenaran umum atau refleksi emosi." },
        examples: [
          { japanese: "子供は元気なものだ。", romaji: "Kodomo wa genki na mono da.", malay: "Kanak-kanak memang aktif." }
        ],
        commonMistakes: { en: "ものだ can express both general truths and nostalgia.", my: "ものだ bolehExpress kebenaran umum dan nostalgia." }
      },
      {
        slug: "n2-mono-nomi",
        title: { en: "〜ものではない - Not something one should", my: "〜ものではない - Bukan sesuatu yang patut" },
        formation: "Verb + ものではない",
        explanation: { en: "Expresses something that is not appropriate.", my: "Meneritakan sesuatu yang tidak sesuai." },
        examples: [
          { japanese: "子供がお酒を飲むものではない。", romaji: "Kodomo ga osake wo nomu mono dewa nai.", malay: "Kanak-kanak tidak seharusnya minum alkohol." }
        ],
        commonMistakes: { en: "ものではない is a normative statement.", my: "ものではない adalah kenyataan normatif." }
      },
      {
        slug: "n2-nakereba-narimasen",
        title: { en: "〜なければならない - Must/Necessary", my: "〜なければならない - Mesti" },
        formation: "Verb ない + なければならない",
        explanation: { en: "Necessity or strong obligation.", my: "Keperluan atau obligasi kuat." },
        examples: [
          { japanese: "行かなければならない。", romaji: "Ikanakereba naranai.", malay: "Saya mestilah pergi." }
        ],
        commonMistakes: { en: "This is a strong obligation.", my: "Ini adalah obligasi yang kuat." }
      },
      {
        slug: "n2-te-aru",
        title: { en: "〜てある - Resultant State (Preparation)", my: "〜てある - Keadaan Hasil (Penyediaan)" },
        formation: "Verb て-form + ある",
        explanation: { en: "Something has been done in preparation.", my: "Sesuatu telah dilakukan sebagai penyediaan." },
        examples: [
          { japanese: "予約してある。", romaji: "Yoyaku shite aru.", malay: "Sudah ditempah." }
        ],
        commonMistakes: { en: "てある implies someone did it intentionally.", my: "てある membayangkan seseorang buat dengan sengaja." }
      },
      {
        slug: "n2-te-kureru",
        title: { en: "〜てくれる - Someone does for me", my: "〜てくれる - Seseorang buat untuk saya" },
        formation: "Verb て-form + くれる",
        explanation: { en: "Someone does something for me.", my: "Seseorang lakukan sesuatu untuk saya." },
        examples: [
          { japanese: "先生が教えてくれた。", romaji: "Sensei ga oshiete kureta.", malay: "Guru saya telah ajar saya." }
        ],
        commonMistakes: { en: "Use てあげる when YOU do something for someone else.", my: "Guna てあげる apabila ANDA buat untuk orang lain." }
      },
      {
        slug: "n2-te-morau",
        title: { en: "〜てもらう - I receive a favor", my: "〜てもらう - Saya terima kebaikan" },
        formation: "Verb て-form + もらう",
        explanation: { en: "I receive a favor (someone does for me).", my: "Saya terima kebaikan (seseorang buat untuk saya)." },
        examples: [
          { japanese: "友達に手紙を書いてもらった。", romaji: "Tomodachi ni tegami wo kaite moratta.", malay: "Kawan saya tulis surat untuk saya." }
        ],
        commonMistakes: { en: "morau focuses on the receiver of the favor.", my: "morau fokus pada receiver kebaikan." }
      },
      {
        slug: "n2-te-shimau",
        title: { en: "〜てしまう - Finish/Regrettably", my: "〜てしまう - Habiskan/Malangnya" },
        formation: "Verb て-form + しまう",
        explanation: { en: "Complete an action or do something regrettably.", my: "Lengkapkan tindakan atau buat sesuatu malangnya." },
        examples: [
          { japanese: "食べてしまった。", romaji: "Tabete shimatta.", malay: "Saya sudah habiskan (malangnya)." }
        ],
        commonMistakes: { en: "てしまう often implies regret.", my: "てしまう sering imply menyesal." }
      },
      {
        slug: "n2-te-ok",
        title: { en: "〜ておく - Do in advance", my: "〜ておく - Buat dulu" },
        formation: "Verb て-form + おく",
        explanation: { en: "Do something in preparation.", my: "Buat sesuatu sebagai penyediaan." },
        examples: [
          { japanese: "予約しておきました。", romaji: "Yoyaku shite okimashita.", malay: "Saya dah tempah dulu." }
        ],
        commonMistakes: { en: "ておく shows preparation or leaving as is.", my: "ておく menunjukkan penyediaan atau membiarkan seperti sedia ada." }
      },
      {
        slug: "n2-passive-indirect",
        title: { en: "〜られる (Indirect Passive)", my: "〜られる (Pasif Tidak Langsung)" },
        formation: "Verb passive form",
        explanation: { en: "Indirect passive. Something affects the speaker indirectly.", my: "Pasif tidak langsung. Sesuatu mempengaruhi pencerita secara tidak langsung." },
        examples: [
          { japanese: "雨に降られて困った。", romaji: "Ame ni furarete komatta.", malay: "Saya tak kena hujan dan susah." }
        ],
        commonMistakes: { en: "Indirect passive shows something bad happened to the speaker.", my: "Pasif tidak langsung menunjukkan sesuatu buruk berlaku kepada pencerita." }
      },
      {
        slug: "n2-koto-ni",
        title: { en: "〜ことに - By the way/Actually", my: "〜ことに - Omong-omong/Sebenarnya" },
        formation: "Sentence + ことに",
        explanation: { en: "By the way, actually.", my: "Omong-omong, sebenarnya." },
        examples: [
          { japanese: "嬉しいことに、合格した。", romaji: "Shiawasenu koto ni, goukaku shita.", malay: "Sebenarnya, saya gembira sebab lulus." }
        ],
        commonMistakes: { en: "ことに adds emotional emphasis.", my: "ことに tambah tekanan emosi." }
      },
      {
        slug: "n2-kara",
        title: { en: "〜から (kara) - Because", my: "〜から - Kerana" },
        formation: "Sentence + から",
        explanation: { en: "Because (reason). Placed at end of reason clause.", my: "Kerana (sebab). Letak di hujung klausa sebab." },
        examples: [
          { japanese: "寒いから窓を閉めます。", romaji: "Samui kara mado wo shimemasu.", malay: "Saya tutup tingkap sebab sejuk." }
        ],
        commonMistakes: { en: "から goes at the end of the reason clause.", my: "から letak di hujung klausa sebab." }
      },
      {
        slug: "n2-sorekara",
        title: { en: "それから (sorekara) - And then/After that", my: "それから - Dan kemudian/Selepas itu" },
        formation: "Sentence + それから + Sentence",
        explanation: { en: "And then, after that.", my: "Dan kemudian, selepas itu." },
        examples: [
          { japanese: "学校に行った。それから、図書館で勉強した。", romaji: "Gakkou ni itta. Sorekara, toshokan de benkyou shita.", malay: "Saya pergi ke sekolah. Dan kemudian, saya belajar di perpustakaan." }
        ],
        commonMistakes: { en: "それから shows a sequence of events.", my: "それから menunjukkan urutan peristiwa." }
      },
      {
        slug: "n2-nagara",
        title: { en: "〜ながら - While doing (simultaneous)", my: "〜ながら - sambil" },
        formation: "Verb stem + ながら",
        explanation: { en: "Doing two things at the same time.", my: "Melakukan dua cosa pada masa yang sama." },
        examples: [
          { japanese: "音楽を聞きながら勉強する。", romaji: "Ongaku wo kikinagara benkyou suru.", malay: "Belajar sambil dengar muzik." }
        ],
        commonMistakes: { en: "ながら is for two simultaneous actions.", my: "ながら untuk dua tindakan simultan." }
      },
      {
        slug: "n2-you-ni",
        title: { en: "〜ように (you ni) - So that/In order to", my: "〜ように - Supaya/Agar" },
        formation: "Verb dict / Verb ない-form + ように",
        explanation: { en: "In order to achieve something.", my: "Supaya/agar mencapai sesuatu." },
        examples: [
          { japanese: "合格できるように勉強している。", romaji: "Goukaku dekiru you ni benkyou shite iru.", malay: "Saya belajar supaya boleh lulus." }
        ],
        commonMistakes: { en: "ように uses dictionary/ない-form, not て-form.", my: "ように guna bentuk kamus/ない-form, bukan て-form." }
      },
      {
        slug: "n2-koto",
        title: { en: "〜こと - Nominalizer", my: "〜こと - Pengkinian" },
        formation: "Verb + こと",
        explanation: { en: "Turns a verb into a noun phrase.", my: "Mengubah kata kerja kepada frasa nama." },
        examples: [
          { japanese: "日本語を勉強することは楽しい。", romaji: "Nihongo wo benkyou suru koto wa tanoshii.", malay: "Belajar bahasa Jepun adalah menyeronokkan." }
        ],
        commonMistakes: { en: "こと is for general truths, の for specific.", my: "こと untuk kebenaran umum, の untuk spesifik." }
      },
      {
        slug: "n2-tame",
        title: { en: "〜ために (tame) - For/In order to", my: "〜ために - Untuk/Bagi pihak" },
        formation: "N + の + ために / Verb dict + ために",
        explanation: { en: "For the sake of, in order to.", my: "Untuk, bagi pihak, supaya." },
        examples: [
          { japanese: "合格するために頑張ります。", romaji: "Goukaku suru tame ni ganbarimasu.", malay: "Saya akan bertungkus lumus untuk lulus." }
        ],
        commonMistakes: { en: "Use dictionary form before ために.", my: "Guna bentuk kamus sebelum ために." }
      },
      {
        slug: "n2-doushite",
        title: { en: "どうして (doushite) - Why", my: "どうして - Mengapa" },
        formation: "どうして + Verb",
        explanation: { en: "Why (asking for reason).", my: "Mengapa (minta sebab)." },
        examples: [
          { japanese: "どうして日本語を勉強していますか。", romaji: "Doushite Nihongo wo benkyou shite imasu ka?", malay: "Mengapa anda belajar bahasa Jepun?" }
        ],
        commonMistakes: { en: "どうして asks for a reason.", my: "どうして minta sebab." }
      },
      {
        slug: "n2-nante",
        title: { en: "なんて (nante) - Such as/Either", my: "なんて - Seperti/Malah" },
        formation: "N + なんて",
        explanation: { en: "Expresses emphasis or disdain.", my: "Menyatakan tekanan atau rasa kurang senang." },
        examples: [
          { japanese: "先生なんて嫌いだ。", romaji: "Sensei nante kirai da.", malay: "Saya bencicikgu langsung." }
        ],
        commonMistakes: { en: "なんて can express negative feelings toward something.", my: "なんて bolehExpress perasaan negatif terhadap sesuatu." }
      },
      {
        slug: "n2-koso",
        title: { en: "こそ (koso) - Emphasis", my: "こそ - Memang/Dirat" },
        formation: "N + こそ",
        explanation: { en: "Emphasizes the preceding word.", my: "Tekankan perkataan sebelumnya." },
        examples: [
          { japanese: "これが欲しいのです。", romaji: "Kore ga hoshii no desu.", malay: "Inilah yang saya nak." }
        ],
        commonMistakes: { en: "こそ strongly emphasizes.", my: "こそ tekankan dengan kuat." }
      },
      {
        slug: "n2-shikashi",
        title: { en: "しかしながら (shikashinagara) - However", my: "しかしながら -Namun/Walau bagaimanapun" },
        formation: "Sentence + しかしながら",
        explanation: { en: "However, but.", my: "Namun, tetapi." },
        examples: [
          { japanese: "好きだ。然而、できない。", romaji: "Suki da. Shikashinagara, dekinai.", malay: "Saya suka. Namun, saya tak boleh." }
        ],
        commonMistakes: { en: "然而 adalah penunjuk kontras.", my: "然而 adalah penunjuk kontras." }
      }
    ]
  },
  n1: {
    title: "JLPT N1 Grammar",
    description: "Advanced grammar. Learn sophisticated expressions for formal contexts.",
    grammar: [
      {
        slug: "n1-toka-iwanya",
        title: { en: "〜といった - And such/Things like", my: "〜といった - Dan sebagainya" },
        formation: "Noun + といった",
        explanation: { en: "And such / things like. Lists examples non-exhaustively.", my: "Dan sebagainya / Contoh-contoh. Senaraikan contoh tanpa lengkap." },
        examples: [
          { japanese: "日本語、投資、音楽といった趣味があります。", romaji: "Nihongo, toushi, ongaku to iu shumi ga arimasu.", malay: "Saya ada hobi seperti belajar Jepun, pelaburan, muzik." }
        ]
      },
      {
        slug: "n1-wake-niwa-ikanai",
        title: { en: "〜わけにはいかない - Can\\'t in good conscience", my: "〜わけにはいかない - Tak boleh dengan hati nurani" },
        formation: "Verb + わけにはいかない",
        explanation: { en: "Expresses that one cannot do something due to circumstances or conscience.", my: "Meneritakan seseorang tidak boleh melakukan sesuatu kerana keadaan atau hati nurani." },
        examples: [
          { japanese: "嘘をつくわけにはいかない。", romaji: "Uso wo tsuku wake ni wa ikenai.", malay: "Saya tak boleh menipu." }
        ]
      },
      {
        slug: "n1-koto-ni-oite",
        title: { en: "〜ことに置いて - In terms of/Regarding", my: "〜ことに置いて - Dari segi" },
        formation: "N + ことに置いて",
        explanation: { en: "Expresses in terms of or regarding something.", my: "Meneritakan dari segi atau mengenai sesuatu." },
        examples: [
          { japanese: "健康ことに置いて、最大の問題は睡眠です。", romaji: "Kenkou koto ni oite, saidai no mondai wa suimin desu.", malay: "Dari segi kesihatan, masalah terbesar adalah tidur." }
        ]
      },
      {
        slug: "n1-na-no-was",
        title: { en: "〜なのVS〜たんんだった - Contrast", my: "〜なのVS〜たんんだった - Kontras" },
        formation: "Various",
        explanation: { en: "Advanced contrastive expressions.", my: "Ungkapan kontras lanjutan." },
        examples: [
          { japanese: "行くなの 行きたかったんだけど", romaji: "Iku na no ikitakatta n dakedo", malay: "Nak pergi tapi..." }
        ]
      },
      {
        slug: "n1-souni-naru",
        title: { en: "〜そうになる - Almost/Nearly", my: "〜そうになる - Hampir" },
        formation: "Verb stem + そうになる",
        explanation: { en: "Expresses almost doing something (usually negative consequences).", my: "Meneritakan hampir melakukan sesuatu (biasanya akibat negatif)." },
        examples: [
          { japanese: "忘れそうになった。", romaji: "Wasure sou ni natta.", malay: "Saya hampir lupa." }
        ]
      },
      {
        slug: "n1-kya",
        title: { en: "〜なんか - Like/Such as", my: "〜なんか - macam" },
        formation: "N + なんか",
        explanation: { en: "Casual expression for giving examples.", my: "Ungkapan casual untuk bagi contoh." },
        examples: [
          { japanese: "映画なんか見たくない。", romaji: "Eiga nanka mitakunai.", malay: "Tak nak tengok filem pun." }
        ]
      },
      {
        slug: "n1-kurai",
        title: { en: "〜くらい - Extent/Degree", my: "〜くらい - Tahap" },
        formation: "Verb/Adj + くらい",
        explanation: { en: "Expresses the extent or degree of something.", my: "Meneritakan tahap atau darjat sesuatu." },
        examples: [
          { japanese: "疲れて立ち上がれないくらいだ。", romaji: "Tsukarete tachiagarenai kurai da.", malay: "Saya terlalu tiredness untuk berdiri." }
        ]
      },
      {
        slug: "n1-kokoro",
        title: { en: "〜心をこめて - With heart/Sincerely", my: "〜心をこめて - Dengan hati" },
        formation: "Phrase + を込めて",
        explanation: { en: "Expresses doing something with full effort or heart.", my: "Meneritakan melakukan sesuatu dengan penuh usaha atau hati." },
        examples: [
          { japanese: "心を込めて作る。", romaji: "Kokoro wo komete tsukuru.", malay: "Buat dengan hati." }
        ]
      },
      {
        slug: "n1-zuni",
        title: { en: "〜ずに - Without doing (N1)", my: "〜ずに - Tanpa buat" },
        formation: "Verb ない + ずに",
        explanation: { en: "Without doing something. More literary than ないで.", my: "Tanpa melakukan sesuatu. Lebih sastera daripada ないで." },
        examples: [
          { japanese: "食わずに三日間過ごした。", romaji: "Kuawazu ni mikkakan sugoshita.", malay: "Saya habiskan tiga hari tanpa makan." }
        ]
      },
      {
        slug: "n1-tsutsu",
        title: { en: "〜つつある - In the process of", my: "〜つつある - Dalam proses" },
        formation: "Verb stem + つつある",
        explanation: { en: "Expresses something is gradually changing.", my: "Meneritakan sesuatu secara beransur berubah." },
        examples: [
          { japanese: "状況は改善されつつある。", romaji: "Joukyou wa kaizen saretsutsu aru.", malay: "Situasi secara beransur bertambah baik." }
        ]
      },
      {
        slug: "n1-no-kokoro",
        title: { en: "〜心のままに - As one pleases", my: "〜心のままに - Sesuka hati" },
        formation: "Phrase + 心のままに",
        explanation: { en: "As the heart desires / freely.", my: "Sesuka hati / dengan bebas." },
        examples: [
          { japanese: "心のままに生きる。", romaji: "Kokoro no mama ni ikiru.", malay: "Hidup sesuka hati." }
        ]
      },
      {
        slug: "n1-hodo",
        title: { en: "〜ほど - To the extent that", my: "〜ほど - sehingga tahap" },
        formation: "Sentence + ほど",
        explanation: { en: "Expresses to such an extent that.", my: "Meneritakan sehingga tahap yang" },
        examples: [
          { japanese: "驚くほど上手になった。", romaji: "Odoroku hodo jouzu ni natta.", malay: "Dia menjadi pandai sehingga menakjubkan." }
        ]
      },
      {
        slug: "n1-yeba",
        title: { en: "〜えば - Conditional (literary)", my: "〜えば - Bersyarat (sastera)" },
        formation: "Adj ば-form + ば",
        explanation: { en: "Literary conditional form.", my: "Bentuk bersyarat sastera." },
        examples: [
          { japanese: "早ければ早いほどいい。", romaji: "Hayakereba hayai hodo ii.", malay: "Semakin awal semakin baik." }
        ]
      },
      {
        slug: "n1-nare",
        title: { en: "〜ならいい - If only it were", my: "〜ならいい - Kalau jadi" },
        formation: "Verb/Adj + ならいい",
        explanation: { en: "Expresses wishing something were different.", my: "Meneritakan berharap sesuatu lain." },
        examples: [
          { japanese: "時間があればいいのに。", romaji: "Jikan ga areba ii noni.", malay: "Kalau ada masa, kenapa tak ada." }
        ]
      },
      {
        slug: "n1-uga",
        title: { en: "〜うが〜うが - Whether or not", my: "〜うが〜うが - Samurai" },
        formation: "Verb/modal う + が + Verb/modal う + が",
        explanation: { en: "Expresses regardless of whether one does something or not.", my: "Meneritakan tanpa mengira sama ada sesuatu berlaku atau tidak." },
        examples: [
          { japanese: "結果が 어떻든、挑戦し続けるべきだ。", romaji: "Kekka ga doutatte, chousen shi tsuzukeru beki da.", malay: "Tidak kisah keputusan apa,应该继续挑战。" }
        ]
      },
      {
        slug: "n1-mai",
        title: { en: "〜まい - Will not / probably not", my: "〜まい - Tak akan" },
        formation: "Verb dictionary form + まい",
        explanation: { en: "Expresses strong determination of not doing or doubt about doing.", my: "Meneritakan keazaman kuat untuk tidak melakukan atau keraguan." },
        examples: [
          { japanese: "二度とそんなことはあるまい。", romaji: "Nido to sonna koto wa aru mai.", malay: "Tak akan ada lagi hal seperti itu." }
        ]
      },
      {
        slug: "n1-nakuzuni",
        title: { en: "〜なくして - Without", my: "〜なくして - Tanpa" },
        formation: "Noun + なくして",
        explanation: { en: "Without something essential.", my: "Tanpa sesuatu yang penting." },
        examples: [
          { japanese: "努力なくして成功はない。", romaji: "Douryoku nakushite seichou wa nai.", malay: "Tanpa usaha, tiada kejayaan." }
        ]
      },
      {
        slug: "n1-zuha",
        title: { en: "〜ずにはいられない - Cannot help but", my: "〜ずにはいられない - Tak dapat tidak" },
        formation: "Verb ない + ずにはいられない",
        explanation: { en: "Cannot help doing something; irresistibly compelled.", my: "Tidak dapat menahan diri daripada melakukan sesuatu." },
        examples: [
          { japanese: "それを見ると、笑わずにはいられない。", romaji: "Sore wo miru to, warawazu ni wa hairarenai.", malay: "Bila melihat itu, saya tidak dapat tidak ketawa." }
        ]
      },
      {
        slug: "n1-okata",
        title: { en: "〜大方 - Probably / most likely", my: "〜大方 - Mungkin" },
        formation: "Verb/modal + 方だ",
        explanation: { en: "Expresses a guess or estimate.", my: "Meneritakan jangkaan atau anggapan." },
        examples: [
          { japanese: "彼はもう帰った大方だ。", romaji: "Kare wa mou kaetta okata da.", malay: "Dia mungkin dah balik." }
        ]
      },
      {
        slug: "n1-ueha",
        title: { en: "〜上は - Now that / since", my: "〜上は - Oleh kerana" },
        formation: "Verb dictionary form + 上は",
        explanation: { en: "Since it has been decided or established.", my: "Oleh kerana sesuatu telah ditetapkan." },
        examples: [
          { japanese: "决心した上は、全力を尽くすべきだ。", romaji: "Ketsui shita ueha, zenryoku wo tsukushube ki da.", malay: "Oleh sebab telah berazam, saya harus beri sepenuh usaha." }
        ]
      },
      {
        slug: "n1-saeba",
        title: { en: "〜さえ〜ば - If only", my: "〜さえ〜ば - Cukuplah" },
        formation: "Noun/Verb stem + さえ + ば",
        explanation: { en: "If only this condition is met.", my: "Hanya syarat ini dipenuhi." },
        examples: [
          { japanese: "時間さえあれば、日本語が話せる。", romaji: "Jikan sae areba, nihongo ga hanaseru.", malay: "Hanya jika ada masa, saya boleh bercakap Jepun." }
        ]
      },
      {
        slug: "n1-sei",
        title: { en: "〜性 - Nature / property of", my: "〜性 - Sifat" },
        formation: "Noun + 性",
        explanation: { en: "Suffix meaning the nature or property of something.", my: "Akhiran bermaksud sifat atau cirinya sesuatu." },
        examples: [
          { japanese: "国際性", romaji: "Kokusai-sei", malay: "Sifat antarabangsa" }
        ]
      },
      {
        slug: "n1-teki",
        title: { en: "〜的 - -tic / -ical", my: "〜的 - Secara" },
        formation: "Noun + 的",
        explanation: { en: "Suffix forming adjectives meaning regarding or characterized by.", my: "Akhiran membentuk adjektif bermaksud mengenai atau dicirikan oleh." },
        examples: [
          { japanese: "具体的な計画", romaji: "Gutai-teki na keikaku", malay: "Rancangan yang konkret" }
        ]
      },
      {
        slug: "n1-kanousei",
        title: { en: "〜可能性 - Possibility of", my: "〜可能性 - Kemungkinan" },
        formation: "Verb/Noun + 可能性",
        explanation: { en: "The possibility or likelihood of something.", my: "Kemungkinan atau kebarangkalian sesuatu." },
        examples: [
          { japanese: "成功の可能性が高い。", romaji: "Seichou no kanousei ga takai.", malay: "Kemungkinan berjaya adalah tinggi." }
        ]
      },
      {
        slug: "n1-teiyou",
        title: { en: "〜亭佳 - Nicely done / well", my: "〜亭佳 - Cantik" },
        formation: "Adj + 亭佳",
        explanation: { en: "Expression of admiration for how something is done.", my: "Ungkapan kagum bagaimana sesuatu dilakukan." },
        examples: [
          { japanese: "見事だ。", romaji: "Migoto da.", malay: "Hebat sekali." }
        ]
      },
      {
        slug: "n1-yousuru",
        title: { en: "〜ようとする - To attempt to", my: "〜ようとする - Cuba untuk" },
        formation: "Verb dictionary form + ようとする",
        explanation: { en: "To try to do something; to be about to do.", my: "Cuba untuk melakukan sesuatu; sedang akan melakukan." },
        examples: [
          { japanese: "彼は言おうとしたが、止めた。", romaji: "Kare wa iou to shita ga, yametha.", malay: "Dia Cuba nakcakap tapi berhenti." }
        ]
      },
      {
        slug: "n1-kanjite",
        title: { en: "〜を感じて - Feeling / sensing", my: "〜を感じて - Merasa" },
        formation: "Noun + を感じて",
        explanation: { en: "To feel or sense something emotionally.", my: "Merasa atau percepul emotionally sesuatu." },
        examples: [
          { japanese: "孤独を感じていた。", romaji: "Kodoku wo kanjite ita.", malay: "Saya terasa kesunyian." }
        ]
      },
      {
        slug: "n1-shikata",
        title: { en: "〜しかた - Way of doing", my: "〜しかた - Cara buat" },
        formation: "Verb ます stem + しかた",
        explanation: { en: "The way/method to do something.", my: "Cara atau kaedah untuk melakukan sesuatu." },
        examples: [
          { japanese: "読み方が分からない。", romaji: "Yomikata ga wakaranai.", malay: "Cara baca tak tahu." }
        ]
      },
      {
        slug: "n1-koto",
        title: { en: "〜のこと - About / regarding", my: "〜のこと - Tentang" },
        formation: "Noun + のこと",
        explanation: { en: "Refers to something or someone.", my: "Merujuk kepada sesuatu atau seseorang." },
        examples: [
          { japanese: "日本ることは面白い。", romaji: "Nihongo no koto wa omoshiroi.", malay: "Tentang bahasa Jepun, ia menarik." }
        ]
      },
      {
        slug: "n1-kuse",
        title: { en: "〜に決まっている - Must be / certainly", my: "〜に決まっている - Tentu" },
        formation: "Noun/Adj + に決まっている",
        explanation: { en: "Expresses strong certainty.", my: "Meneritakan keyakinan yang kuat." },
        examples: [
          { japanese: "それは正しいに決まっている。", romaji: "Sore wa tadashii ni kimatte iru.", malay: "Ia tentu sekali benar." }
        ]
      },
      {
        slug: "n1-tsumori",
        title: { en: "〜积もり - Intend to", my: "〜积もり - Berazam" },
        formation: "Verb dictionary form + 积もり",
        explanation: { en: "One's intention or plan to do something.", my: "Niat atau rancangan seseorang untuk melakukan sesuatu." },
        examples: [
          { japanese: "明日行く积もりです。", romaji: "Ashita iku tsumori desu.", malay: "Rancang nak pergi esok." }
        ]
      },
      {
        slug: "n1-dake",
        title: { en: "〜だけに - precisely because", my: "〜だけに -正因为" },
        formation: "Noun/Adj + だけに",
        explanation: { en: "Precisely because of that reason.", my: "正是因为那个理由。" },
        examples: [
          { japanese: "有名だけに、注意が必要だ。", romaji: "Yuumei dake ni wa, chuui ga hitsuyou da.", malay: "正因为有名，需要注意。" }
        ]
      },
      {
        slug: "n1-kara-nare",
        title: { en: "〜으로부터 - From / since (cause)", my: "〜으로부터 - Dari" },
        formation: "Noun + から見ると",
        explanation: { en: "From the perspective of.", my: "Dari sudut pandangan." },
        examples: [
          { japanese: "私の立場から見ると、この案は問題がある。", romaji: "Watashi no tachiba kara miru to, kono an wa mondai ga aru.", malay: "Dari sudut saya, cadangan ini ada masalah。" }
        ]
      },
      {
        slug: "n1-mite",
        title: { en: "〜見つつ - While doing", my: "〜見つつ - Semasa lakukan" },
        formation: "Verb ます stem + 見つつ",
        explanation: { en: "While doing two things simultaneously (literary).", my: "Semasa melakukan dua things secara simultan (sastera)." },
        examples: [
          { japanese: "歩き見つつ考える。", romaji: "Aruki mitsutsu kangaeru.", malay: "Beri fikir sambil berjalan." }
        ]
      },
      {
        slug: "n1-nagara",
        title: { en: "〜ながら - While doing", my: "〜ながら - Sambil" },
        formation: "Verb stem + ながら",
        explanation: { en: "While doing something.", my: "Sambil melakukan sesuatu." },
        examples: [
          { japanese: "音楽を聞きながら勉强する。", romaji: "Ongaku wo kiki nagara benkyou suru.", malay: "Saya belajar sambil dengar lagu." }
        ]
      },
      {
        slug: "n1-fuu",
        title: { en: "〜風に - In the style of", my: "〜風に - Dengan gaya" },
        formation: "Noun + 風に",
        explanation: { en: "In the manner or style of.", my: "Dalam cara atau gaya sesuatu." },
        examples: [
          { japanese: "教授風に説明する。", romaji: "Kyouju fuu ni setsumei suru.", malay: "Jelaskan dengan gaya professor." }
        ]
      },
      {
        slug: "n1-kusai",
        title: { en: "〜くさい - Smells like / seems like", my: "〜くさい - Berbau" },
        formation: "Noun + くさい",
        explanation: { en: "Seems like; gives off the impression of.", my: "Nampaknya; memberikan imej seperti." },
        examples: [
          { japanese: "彼は学者くさい。", romaji: "Kare wa gakusha kusai.", malay: "Dia macam scholar." }
        ]
      },
      {
        slug: "n1ppoi",
        title: { en: "〜っぽい - Looks like / tends to", my: "〜っぽい - Macam" },
        formation: "Noun/Adj stem + っぽい",
        explanation: { en: "Tends to be; has the quality of.", my: "Cenderung untuk; ada kualiti." },
        examples: [
          { japanese: "子供っぽい考え方", romaji: "Kodomo ppoi kangae kata", malay: "Cara berfikir macam budak kecil" }
        ]
      },
      {
        slug: "n1-gotoshi",
        title: { en: "〜如し - Like / as if", my: "〜如し - Seperti" },
        formation: "Noun + の如し",
        explanation: { en: "Literary comparison meaning like or as if.", my: "Perbandingan sastera bermaksud seperti atau seolah-olah." },
        examples: [
          { japanese: "影の如く現れた。", romaji: "Kage no gotoku arawareta.", malay: "Muncul seperti bayang." }
        ]
      },
      {
        slug: "n1-gotoku",
        title: { en: "〜如く - Like / as (literary)", my: "〜如く - Seperti" },
        formation: "Noun + の如く",
        explanation: { en: "Literary form of like or as.", my: "Bentuk sastera untuk seperti." },
        examples: [
          { japanese: "闪电の如く走った。", romaji: "Shinden no gotoku hashitta.", malay: "Lari seperti kilat." }
        ]
      },
      {
        slug: "n1-nari",
        title: { en: "〜なり - As soon as / the moment", my: "〜なり - Sebaik sahaja" },
        formation: "Verb dictionary form + なり",
        explanation: { en: "As soon as one does something.", my: "Sebaik sahaja seseorang melakukan sesuatu." },
        examples: [
          { japanese: "彼女はそれを見るなり、泣き出した。", romaji: "Kanojo wa sore wo miru nari, nakidashita.", malay: "Sebaik sahaja dia melihat itu, dia menangis." }
        ]
      },
      {
        slug: "n1-tachi",
        title: { en: "〜足chu - Means to / way to", my: "〜足chu - Cara untuk" },
        formation: "Verb ます stem + 方",
        explanation: { en: "The way/method to do something.", my: "Cara atau kaedah untuk melakukan sesuatu." },
        examples: [
          { japanese: "読み方", romaji: "Yomikata", malay: "Cara untuk membaca" }
        ]
      },
      {
        slug: "n1-dokoro",
        title: { en: "〜どころか - Far from / not only", my: "〜どころか - Bukan sahaja" },
        formation: "Noun/Verb + どころか",
        explanation: { en: "Far from being; not only...but also.", my: "Bukan sahaja... malah." },
        examples: [
          { japanese: "英語どころか、日本語も話せない。", romaji: "Eigo dokoro ka, nihongo mo hanasenai.", malay: "Bukan sahaja English, Japon pun tak boleh cakap." }
        ]
      },
      {
        slug: "n1-kurai",
        title: { en: "〜くらい - About / to the extent", my: "〜くらい - Tentang" },
        formation: "Sentence + くらい",
        explanation: { en: "Approximately; to such an extent.", my: "Kira-kira; sehingga tahap tertentu." },
        examples: [
          { japanese: "死ぬくらい怖かった。", romaji: "Shinu kurai kowakatta.", malay: "Saya terlalu takut sehingga hampir mati." }
        ]
      },
      {
        slug: "n1-hodo",
        title: { en: "〜ほど - To the degree that", my: "〜ほど - Sehinggakan" },
        formation: "Sentence + ほど",
        explanation: { en: "To such a degree that.", my: "Sehinggakan sesuatu." },
        examples: [
          { japanese: "喉が渇くほど走った。", romaji: "Nodo ga kawaku hodo hashitta.", malay: "Saya lari sehinggakan tekak kering." }
        ]
      },
      {
        slug: "n1-keba",
        title: { en: "〜けば - If one does", my: "〜けば - Kalau" },
        formation: "Verb ば-form + ば",
        explanation: { en: "Conditional 'if' form.", my: "Bentuk bersyarat 'jika'." },
        examples: [
          { japanese: "食べければ食べるほど太る。", romaji: "Tabereba taberu hodo futoru.", malay: "Kalau makan lagi, lagilah gemuk." }
        ]
      },
      {
        slug: "n1-nakutewa",
        title: { en: "〜なければ - If not / must", my: "〜なければ - Kalau tidak" },
        formation: "Verb ない + ければ",
        explanation: { en: "If one does not do; must.", my: "Jika tidak melakukan; wajib." },
        examples: [
          { japanese: "完成しなければ、出去玩っちゃだめ。", romaji: "Kanisei shinakereba, dekakeru chatte dame.", malay: "Kalau tidak siap, tak boleh keluar main." }
        ]
      },
      {
        slug: "n1-baai",
        title: { en: "〜場合 - In case / if", my: "〜場合 - Kalau" },
        formation: "Verb/Noun + 場合",
        explanation: { en: "In the case that; if.", my: "Dalam kes bahawa; jika." },
        examples: [
          { japanese: "雨の場合、試合は中止です。", romaji: "Ame no baai, shiai wa chuushi desu.", malay: "Kalau hujan, perlawanan dibatalkan." }
        ]
      },
      {
        slug: "n1-toki",
        title: { en: "〜とき - When / at the time of", my: "〜とき - Apabila" },
        formation: "Verb/Noun + とき",
        explanation: { en: "When; at the time of.", my: "Apabila; pada masa." },
        examples: [
          { japanese: "日本に行ったとき、寿司を食べた。", romaji: "Nihongo ni itta toki, sushi wo tabeta.", malay: "Apabila pergi Jepun, saya makan sushi." }
        ]
      },
      {
        slug: "n1-aida",
        title: { en: "〜間 - While / during", my: "〜間 - Semasa" },
        formation: "Verb dictionary form / Noun + 間",
        explanation: { en: "While; during the time that.", my: "Semasa; dalam masa." },
        examples: [
          { japanese: "勉强している間、静かにしてください。", romaji: "Benkyou shite iru aida, shizuka ni shite kudasai.", malay: "Sila diam semasa saya belajar." }
        ]
      },
      {
        slug: "n1-made",
        title: { en: "〜まで - Until / up to", my: "〜まで - Sehinggakan" },
        formation: "Noun/Verb + まで",
        explanation: { en: "Until; up to.", my: "Sehinggakan; sehingga." },
        examples: [
          { japanese: "夜まで待った。", romaji: "Yoru made matta.", malay: "Saya tunggu hingga malam." }
        ]
      },
      {
        slug: "n1-yori",
        title: { en: "〜より - More than / rather than", my: "〜より - Lebih" },
        formation: "Noun/Adj + より",
        explanation: { en: "More than; rather than.", my: "Lebih daripada; berbanding." },
        examples: [
          { japanese: "日本語は英語より難しい。", romaji: "Nihongo wa eigo yori muzukashii.", malay: "Bahasa Jepun lebih susah daripada English." }
        ]
      },
      {
        slug: "n1-datte",
        title: { en: "〜だって - Even / also", my: "〜だって - Malah" },
        formation: "Noun + だって",
        explanation: { en: "Even; also; because.", my: "Malah; juga; kerana." },
        examples: [
          { japanese: "子供だってみできる。", romaji: "Kodomo datte dekiru.", malay: "Budak pun boleh buat." }
        ]
      },
      {
        slug: "n1-sashi",
        title: { en: "〜差し - Honorific prefix", my: "〜差し - Awalan hormat" },
        formation: "Verb stem + 差し",
        explanation: { en: "Polite/honorific prefix for actions.", my: "Awalan sopan/hormat untuk tindakan." },
        examples: [
          { japanese: "お絞り差し上げます。", romaji: "Oshibori sashi agemasu.", malay: "Saya tawarkan tuala." }
        ]
      },
      {
        slug: "n1-itadaku",
        title: { en: "〜顶く - To humbly receive", my: "〜顶く - Menerima dengan rendah diri" },
        formation: "Verb ます stem + 顶く",
        explanation: { en: "Humbly receiving; to have something done for one.", my: "Menerima dengan rendah diri; untuk membuat sesuatu untuk seseorang." },
        examples: [
          { japanese: "先生にお教え顶く。", romaji: "Sensei ni ooshie itadaku.", malay: "Saya diajar oleh guru dengan rendah hati." }
        ]
      },
      {
        slug: "n1-kureru",
        title: { en: "〜呉れる - To give (for someone doing for me)", my: "〜呉れる - Memberi" },
        formation: "Verb ます stem + 呉れる",
        explanation: { en: "Someone does something for the speaker.", my: "Seseorang melakukan sesuatu untuk saya." },
        examples: [
          { japanese: "友達が助けてくれた。", romaji: "Tomodachi ga tasukete kureta.", malay: "Kawan tolong saya." }
        ]
      },
      {
        slug: "n1-moru",
        title: { en: "〜もらす - To let leak / to miss", my: "〜もらす - Membiarkan leak" },
        formation: "Verb stem + もらす",
        explanation: { en: "To let slip; to miss an opportunity.", my: "Membiarkan terlepas; untuk terlepas peluang." },
        examples: [
          { japanese: "笑いもらす。", romaji: "Warai morasu.", malay: "Ketawa terbaharu." }
        ]
      },
      {
        slug: "n1-nasaru",
        title: { en: "〜なさる - Honorific do", my: "〜なさる - Hormat buat" },
        formation: "Verb stem + なさる",
        explanation: { en: "Honorific form of する.", my: "Bentuk hormat untuk する." },
        examples: [
          { japanese: "先生は何をなさいますか。", romaji: "Sensei wa nan wo nasaimasu ka.", malay: "Cikgu buat apa?" }
        ]
      },
      {
        slug: "n1-kudasaru",
        title: { en: "〜くださる - Honorific give", my: "〜くださる - Hormat give" },
        formation: "Verb stem + くださる",
        explanation: { en: "Honorific 'to give' (someone gives to superior).", my: "Bentuk hormat 'memberi' (seseorang memberi kepada yang lebih tinggi)." },
        examples: [
          { japanese: "先生がお教えくださる。", romaji: "Sensei ga ooshie kudasaru.", malay: "GuruEDA memberi ajaran." }
        ]
      },
      {
        slug: "n1-no-goto",
        title: { en: "〜のこと - Regarding someone", my: "〜のこと - Tentang seseorang" },
        formation: "Person + のこと",
        explanation: { en: "About / regarding a person.", my: "Tentang / mengenai seseorang." },
        examples: [
          { japanese: "山田さんのことは何も知らない。", romaji: "Yamada san no koto wa nani mo shiranai.", malay: "Saya tak tahu langsung tentang Yamada-san." }
        ]
      },
      {
        slug: "n1-nomi",
        title: { en: "〜のみ - Only / merely", my: "〜のみ - Hanya" },
        formation: "Noun/Verb + のみ",
        explanation: { en: "Only; merely (formal).", my: "Hanya; semata-mata (rasmi)." },
        examples: [
          { japanese: "結果は成功のみ。", romaji: "Kekka wa seichou nomi.", malay: "Keputusan hanyalah berjaya." }
        ]
      },
      {
        slug: "n1-katsute",
        title: { en: "〜かつて - Once / formerly", my: "〜かつて - Dulu pernah" },
        formation: "かつて",
        explanation: { en: "Once; formerly; at some point in the past.", my: "Dulu; pernah; pada satu masa di masa lalu." },
        examples: [
          { japanese: "かつてないeiを見た。", romaji: "Katsute nai koto wo mita.", malay: "Saya pernah melihat sesuatu yang tidak pernah berlaku." }
        ]
      },
      {
        slug: "n1-shiken",
        title: { en: "〜しか - Only / nothing but", my: "〜しか - Hanya" },
        formation: "Noun + しか + negative",
        explanation: { en: "Only; nothing but (with negative).", my: "Hanya; tidak ada... selain (dengan negatif)." },
        examples: [
          { japanese: "日本語しか知らない。", romaji: "Nihongo shika shiranai.", malay: "Saya cuma tahu bahasa Jepun." }
        ]
      },
      {
        slug: "n1-koso",
        title: { en: "〜こそ - Exactly / precisely", my: "〜こそ - Justeru" },
        formation: "Noun + こそ",
        explanation: { en: "Exactly; precisely; emphasized.", my: "Justeru; sebenarnya; yang ditekankan." },
        examples: [
          { japanese: "これが欲しいのだ。", romaji: "Kore ga hoshii no da.", malay: "Inilah yang saya mahu." }
        ]
      },
      {
        slug: "n1-hotondo",
        title: { en: "〜ほとんど - Almost / mostly", my: "〜ほとんど - Hampir" },
        formation: "Verb/Noun + ほとんど",
        explanation: { en: "Almost; mostly; nearly.", my: "Hampir; kebanyakannya; nyaris." },
        examples: [
          { japanese: "ほとんど完成した。", romaji: "Hotondo kansei shita.", malay: "Hampir siap." }
        ]
      },
      {
        slug: "n1-minna",
        title: { en: "〜みんな - Everyone / all", my: "〜みんな - Semua" },
        formation: "Noun + みんな",
        explanation: { en: "Everyone; all of them.", my: "Semua orang; semuanya." },
        examples: [
          { japanese: "みんなの意見が欲しい。", romaji: "Minna no iken ga hoshii.", malay: "Saya mahu pendapat semua orang." }
        ]
      },
      {
        slug: "n1-donna",
        title: { en: "〜どんな - What kind of", my: "〜どんな - Jenis apa" },
        formation: "どんな + Noun",
        explanation: { en: "What kind of; what sort of.", my: "Jenis apa; macam mana." },
        examples: [
          { japanese: "どんな食べ物が高い？", romaji: "Donna tabemono ga takai?", malay: "Jenis makanan apa yang mahal?" }
        ]
      },
      {
        slug: "n1-dore",
        title: { en: "〜どれ - Which one", my: "〜どれ - Yang mana" },
        formation: "どれ + Noun",
        explanation: { en: "Which one (of three or more).", my: "Yang mana (daripada tiga atau lebih)." },
        examples: [
          { japanese: "どれが新しい？", romaji: "Dore ga atarashii?", malay: "Yang mana baharu?" }
        ]
      },
      {
        slug: "n1-ikura",
        title: { en: "〜いくら - How much", my: "〜いくら - Berapa" },
        formation: "いくら + Verb/Adj",
        explanation: { en: "How much; to what extent.", my: "Berapa banyak; sehingga tahap mana." },
        examples: [
          { japanese: "いくら好きでも、毎日は続かない。", romaji: "Ikura suki de mo, mainichi wa tsuzukanai.", malay: "Betapa suka pun, setiap hari tak akan bertahan." }
        ]
      },
      {
        slug: "n1-naze",
        title: { en: "〜なぜ - Why", my: "〜なぜ - Mengapa" },
        formation: "なぜ + Verb/Adj",
        explanation: { en: "Why; for what reason.", my: "Mengapa; dengan sebab apa." },
        examples: [
          { japanese: "なぜ日本語を勉强するの？", romaji: "Naze nihongo wo benkyou suru no?", malay: "Mengapa anda belajar bahasa Jepun?" }
        ]
      },
      {
        slug: "n1-dou",
        title: { en: "〜どう - How / what way", my: "〜どう - Bagaimana" },
        formation: "どう + Verb/Adj",
        explanation: { en: "How; in what way.", my: "Bagaimana; dengan cara apa." },
        examples: [
          { japanese: "どうしますか？", romaji: "Dou shimasu ka?", malay: "Apa nak buat?" }
        ]
      },
      {
        slug: "n1-ima",
        title: { en: "〜いま - Now / currently", my: "〜いま - Sekarang" },
        formation: "いま",
        explanation: { en: "Now; at this time.", my: "Sekarang; pada masa ini." },
        examples: [
          { japanese: "いま日本語を勉强している。", romaji: "Ima nihongo wo benkyou shite iru.", malay: "Sekarang saya sedang belajar bahasa Jepun." }
        ]
      },
      {
        slug: "n1-kyou",
        title: { en: "〜今日 - Today", my: "〜今日 - Hari ini" },
        formation: "今日",
        explanation: { en: "Today.", my: "Hari ini." },
        examples: [
          { japanese: "今日は良い天気だ。", romaji: "Kyou wa yoi tenki da.", malay: "Hari ini cuaca baik." }
        ]
      },
      {
        slug: "n1-kinou",
        title: { en: "〜昨日 - Yesterday", my: "〜昨日 - Semalam" },
        formation: "昨日",
        explanation: { en: "Yesterday.", my: "Semalam." },
        examples: [
          { japanese: "昨日は忙しかった。", romaji: "Kinou was isogashikatta.", malay: "Semalam saya sibuk." }
        ]
      },
      {
        slug: "n1-ashita",
        title: { en: "〜明日 - Tomorrow", my: "〜明日 - Esok" },
        formation: "明日",
        explanation: { en: "Tomorrow.", my: "Esok." },
        examples: [
          { japanese: "明日また来て。", romaji: "Ashita mata kite.", malay: "JanganEsok datang lagi." }
        ]
      },
      {
        slug: "n1-raishuu",
        title: { en: "〜来週 - Next week", my: "〜来週 - Minggu depan" },
        formation: "来週",
        explanation: { en: "Next week.", my: "Minggu depan." },
        examples: [
          { japanese: "来週の会議は火曜日です。", romaji: "Raishuu no kaigi wa kayoubi desu.", malay: "Mesyuarat minggu depan adalah hari Selasa." }
        ]
      },
      {
        slug: "n1-sengetsu",
        title: { en: "〜先月 - Last month", my: "〜先月 - Bulan lepas" },
        formation: "先月",
        explanation: { en: "Last month.", my: "Bulan lepas." },
        examples: [
          { japanese: "先月日本に行った。", romaji: "Sengetsu nihon ni itta.", malay: "Bulan lepas saya pergi Jepun." }
        ]
      },
      {
        slug: "n1-raigetsu",
        title: { en: "〜来月 - Next month", my: "〜来月 - Bulan depan" },
        formation: "来月",
        explanation: { en: "Next month.", my: "Bulan depan." },
        examples: [
          { japanese: "来月試験を受ける。", romaji: "Raigetsu shiken wo ukeru.", malay: "Bulan depan saya ambil peperiksaan." }
        ]
      },
      {
        slug: "n1-kotoshi",
        title: { en: "〜今年 - This year", my: "〜今年 - Tahun ini" },
        formation: "今年",
        explanation: { en: "This year.", my: "Tahun ini." },
        examples: [
          { japanese: "今年中に日本語を完成させたい。", romaji: "Kotoshi chuu ni nihongo wo kansei sasetai.", malay: "Saya nak siapkan bahasa Jepun dalam tahun ini." }
        ]
      },
      {
        slug: "n1-yoku",
        title: { en: "〜よく - Often / well", my: "〜よく - Selalu / baik" },
        formation: "よく",
        explanation: { en: "Often; frequently; well.", my: "Selalu; kerap; baik." },
        examples: [
          { japanese: "彼女はよく映画を見る。", romaji: "Kanojo wa yoku eiga wo miru.", malay: "Dia selalu tengok电影." }
        ]
      },
      {
        slug: "n1-taihen",
        title: { en: "〜大変 - Very / a lot", my: "〜大変 - Sangat" },
        formation: "大変",
        explanation: { en: "Very; a great deal; terrible.", my: "Sangat; banyak; teruk." },
        examples: [
          { japanese: "それは大変だった。", romaji: "Sore wa taihen datta.", malay: "Ia sangat susah." }
        ]
      },
      {
        slug: "n1-tottemo",
        title: { en: "〜とても - Very / really", my: "〜とても - Sangat" },
        formation: "とても",
        explanation: { en: "Very; really (with negative: cannot).", my: "Sangat; benar (dengan negatif: tidak boleh)." },
        examples: [
          { japanese: "とても美味しい。", romaji: "Tottemo oishii.", malay: "Sangat sedap." }
        ]
      },
      {
        slug: "n1-choudo",
        title: { en: "〜ちょうど - Exactly / just", my: "〜ちょうど - Serta-merta" },
        formation: "ちょうど",
        explanation: { en: "Exactly; just; precisely.", my: " Serta-merta; tepat; jitu." },
        examples: [
          { japanese: "ちょうど百円。", romaji: "Choudo hyappen.", malay: " tepat seratus yen." }
        ]
      },
      {
        slug: "n1-sugu",
        title: { en: "〜すぐ - Immediately / soon", my: "〜すぐ - Serta-merta" },
        formation: "すぐ",
        explanation: { en: "Immediately; right away; soon.", my: "Serta-merta; segera; tidak lama." },
        examples: [
          { japanese: "すぐ帰ってください。", romaji: "Sugu kaette kudasai.", malay: "Sila balik sekarang juga." }
        ]
      },
      {
        slug: "n1-mou",
        title: { en: "〜もう - Already / more", my: "〜もう - Sudah / lagi" },
        formation: "もう",
        explanation: { en: "Already; more; another.", my: "Sudah; lagi; satu lagi." },
        examples: [
          { japanese: "もう時間がない。", romaji: "Mou jikan ga nai.", malay: "Sudah tak ada masa." }
        ]
      },
      {
        slug: "n1-mada",
        title: { en: "〜まだ - Still / yet", my: "〜まだ - Masih" },
        formation: "まだ",
        explanation: { en: "Still; yet; not yet.", my: "Masih; belum." },
        examples: [
          { japanese: "まだ終わってない。", romaji: "Mada owattenai.", malay: "Masih belum siap." }
        ]
      },
      {
        slug: "n1-karoku",
        title: { en: "〜過年度 - Last year", my: "〜過年度 - Tahun lepas" },
        formation: "過年度",
        explanation: { en: "Last fiscal year.", my: "Tahun fiskal lepas." },
        examples: [
          { japanese: "過年度の問題はまだ解決していない。", romaji: "Kakunendo no mondai wa mada kaiketsu shite inai.", malay: "Masalah tahun lepas masih belum diselesaikan." }
        ]
      },
      {
        slug: "n1-henji",
        title: { en: "〜返事 - Reply / response", my: "〜返事 - Jawapan" },
        formation: "返事",
        explanation: { en: "Reply; response.", my: "Jawapan; gerak balas." },
        examples: [
          { japanese: "返事が遅くなってごめんなさい。", romaji: "Henji ga osoku natte gomen nasai.", malay: "Maaf lambat balas mesej." }
        ]
      },
      {
        slug: "n1-kanji",
        title: { en: "〜漢字 - Kanji / Chinese characters", my: "〜漢字 - Aksara Cina" },
        formation: "漢字",
        explanation: { en: "Chinese characters used in Japanese.", my: "Aksara Cina yang digunakan dalam bahasa Jepun." },
        examples: [
          { japanese: "漢字は難しいが面白い。", romaji: "Kanji wa muzukashii ga omoshiroi.", malay: "Kanji susah tapi menarik." }
        ]
      },
      {
        slug: "n1-hiragana",
        title: { en: "〜ひらがな - Hiragana script", my: "〜ひらがな - Tulisan Hiragana" },
        formation: "ひらがな",
        explanation: { en: "Japanese syllabary script.", my: "Tulisan suku kata Jepun." },
        examples: [
          { japanese: "ひらがなを勉强している。", romaji: "Hiragana wo benkyou shite iru.", malay: "Saya sedang belajar hiragana." }
        ]
      },
      {
        slug: "n1-katakana",
        title: { en: "〜カタカナ - Katakana script", my: "〜カタカナ - Tulisan Katakana" },
        formation: "カタカナ",
        explanation: { en: "Japanese syllabary used for foreign words.", my: "Tulisan suku kata Jepun untuk perkataan asing." },
        examples: [
          { japanese: "カタカナで書けない。", romaji: "Katakana de kakenai.", malay: "Saya tak boleh tulis katakana." }
        ]
      },
      {
        slug: "n1-romaji",
        title: { en: "〜ローマ字 - Romaji / Roman letters", my: "〜ローマ字 - Huruf Rumi" },
        formation: "ローマ字",
        explanation: { en: "Roman alphabet representation of Japanese.", my: "Abjad Rumi untuk mewakili bahasa Jepun." },
        examples: [
          { japanese: "ローマ字で名前書いてください。", romaji: "Romaji de namae kaite kudasai.", malay: "Sila tulis nama dalam romaji." }
        ]
      }
    ]
  }
};
