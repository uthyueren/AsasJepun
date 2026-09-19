const EDGE_FUNCTION_URL = 'https://cctnkujlnhcqwbgekibq.supabase.co/functions/v1/admin-auth';
const ADMIN_PASSWORD = 'asasjepun123';

const POSTS = [
  {
    slug: 'why-n3-feels-like-a-wall',
    title: JSON.stringify({ en: 'Why N3 Feels Like a Wall (And How to Push Through)', my: 'Mengapa N3 Rasanya Seperti Dinding (Dan Cara Mengatasinya)' }),
    excerpt: JSON.stringify({ en: "After mastering N4 grammar patterns, many learners hit a frustrating plateau at N3. Here's why it happens and the mindset shift you need to break through.", my: 'Selepas kuasai corak tatabahasa N4, ramai pelajar jumpa plateau yang frustrating di N3.' }),
    content: JSON.stringify({ en: 'Why N3 Feels Like a Wall...', my: 'Mengapa N3 Rasanya Seperti Dinding...' }),
    author: 'Admin',
    tags: ['n3', 'mindset', 'grammar'],
    publish_date: '2024-01-15',
    reading_time: 8,
    type: 'blog',
    published: true
  },
  {
    slug: 'learning-through-hololive',
    title: JSON.stringify({ en: 'Why Learning Japanese Through Hololive Actually Works', my: 'Mengapa Belajar Jepun Melalui Hololive Sesungguhnya Berfungsi' }),
    excerpt: JSON.stringify({ en: 'Vtuber content is not just entertaining. It is a goldmine for comprehensible input.', my: 'Kandungan Vtuber bukan sekadar entertaining. Ia adalah lombong emas untuk comprehensible input.' }),
    content: JSON.stringify({ en: 'Learning Japanese Through Hololive...', my: 'Belajar Jepun Melalui Hololive...' }),
    author: 'Admin',
    tags: ['culture', 'motivation', 'input'],
    publish_date: '2024-02-20',
    reading_time: 6,
    type: 'blog',
    published: true
  },
  {
    slug: 'self-study-vs-class',
    title: JSON.stringify({ en: 'Self-Study vs. Formal Classes: Finding Your Path', my: 'Self-Study vs. Kelas Formal: Mencari Jalan Anda' }),
    excerpt: JSON.stringify({ en: 'Should you learn Japanese alone or in a classroom? The answer is not either/or.', my: 'Patut ke belajar Jepun sorang atau dalam classroom? Jawapan bukan salah satu.' }),
    content: JSON.stringify({ en: 'Self-Study vs. Formal Classes...', my: 'Self-Study vs. Kelas Formal...' }),
    author: 'Admin',
    tags: ['mindset', 'methodology'],
    publish_date: '2024-03-10',
    reading_time: 5,
    type: 'blog',
    published: true
  },
  {
    slug: 'hololive-vocabulary',
    title: JSON.stringify({ en: 'Watching Hololive: Essential Vocabulary for Newcomers', my: 'Menonton Hololive: Vocabulary Penting untuk Pemula' }),
    excerpt: JSON.stringify({ en: 'Learn Japanese through the world of Vtubers.', my: 'Belajar Jepun melalui dunia Vtuber.' }),
    content: JSON.stringify({ vocabList: [{ word: '配信', furigana: 'はいしん', romaji: 'haishin', meaning: 'Stream/Live broadcast' }] }),
    author: 'Admin',
    tags: ['entertainment', 'vocabulary', 'culture'],
    publish_date: '2024-01-01',
    reading_time: 5,
    type: 'culture',
    published: true
  },
  {
    slug: 'j-drama-vocabulary',
    title: JSON.stringify({ en: 'J-Drama Expressions: Words from Your Favorite Shows', my: 'Ungkapan Drama Jepun: Perkataan dari Rancangan Kegemaran' }),
    excerpt: JSON.stringify({ en: 'Expand your vocabulary with words from Japanese dramas.', my: 'Perluas vocabulary dengan perkataan dari drama Jepun.' }),
    content: JSON.stringify({}),
    author: 'Admin',
    tags: ['entertainment', 'vocabulary', 'drama'],
    publish_date: '2024-01-01',
    reading_time: 5,
    type: 'culture',
    published: true
  },
  {
    slug: 'convenience-store',
    title: JSON.stringify({ en: 'Convenience Store Life: コンビニ Shopping Vocabulary', my: 'Kehidupan Kedai Runcit: Vocabulary Membeli-belah di コンビニ' }),
    excerpt: JSON.stringify({ en: 'Master the art of shopping at Japanese convenience stores.', my: 'Kuasai seni membeli-belah di kedai runcit Jepun.' }),
    content: JSON.stringify({}),
    author: 'Admin',
    tags: ['food', 'vocabulary', 'daily-life'],
    publish_date: '2024-01-01',
    reading_time: 5,
    type: 'culture',
    published: true
  },
  {
    slug: 'tanabata',
    title: JSON.stringify({ en: 'Tanabata Festival: The Star Festival Vocabulary', my: 'Pesta Tanabata: Vocabulary Pesta Bintang' }),
    excerpt: JSON.stringify({ en: 'Learn about Tanabata, the Japanese star festival.', my: 'Ketahui tentang Tanabata, pesta bintang Jepun.' }),
    content: JSON.stringify({}),
    author: 'Admin',
    tags: ['seasonal', 'vocabulary', 'culture'],
    publish_date: '2024-01-01',
    reading_time: 5,
    type: 'culture',
    published: true
  },
  {
    slug: 'izakaya',
    title: JSON.stringify({ en: 'Izakaya Etiquette: Japanese Pub Vocabulary', my: 'Etiket Izakaya: Vocabulary Pub Jepun' }),
    excerpt: JSON.stringify({ en: 'Navigate the exciting world of Japanese izakayas.', my: 'Menavigasi dunia menarik izakaya Jepun.' }),
    content: JSON.stringify({}),
    author: 'Admin',
    tags: ['food', 'vocabulary', 'culture'],
    publish_date: '2024-01-01',
    reading_time: 5,
    type: 'culture',
    published: true
  },
  {
    slug: 'daily-greetings',
    title: JSON.stringify({ en: 'Japanese Greetings: From Casual to Formal', my: 'Ucaptama Jepun: Dari Relaxed ke Formal' }),
    excerpt: JSON.stringify({ en: 'Master Japanese greetings for every situation.', my: 'Kuasai ucaptama Jepun untuk setiap situasi.' }),
    content: JSON.stringify({}),
    author: 'Admin',
    tags: ['daily', 'vocabulary', 'culture'],
    publish_date: '2024-01-01',
    reading_time: 5,
    type: 'culture',
    published: true
  }
];

async function seed() {
  console.log('Seeding with correct schema...\n');
  let ok = 0, fail = 0;
  for (const post of POSTS) {
    try {
      const res = await fetch(EDGE_FUNCTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'upsert_post', password: ADMIN_PASSWORD, postData: post })
      });
      const result = await res.json();
      if (result.error) {
        console.log(`FAIL: ${post.slug} - ${result.error}`);
        fail++;
      } else {
        console.log(`OK: ${post.slug}`);
        ok++;
      }
    } catch (e) {
      console.log(`ERROR: ${post.slug} - ${e.message}`);
      fail++;
    }
  }
  console.log(`\nDone: ${ok} ok, ${fail} failed`);
}
seed();
