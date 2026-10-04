// functions/api/posts.ts
// Cloudflare Pages Function — handles /api/posts routes

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  async function d1All(query, ...params) {
    const result = await env.DB.prepare(query).bind(...params).all();
    return result.results;
  }

  function json(data, status = 200) {
    return new Response(JSON.stringify(data), {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    // GET /api/posts — all published posts
    if (url.pathname === '/api/posts' && request.method === 'GET') {
      const posts = await d1All('SELECT * FROM blog_posts WHERE published=1 ORDER BY created_at DESC');
      return json({ posts: posts.map(p => ({ ...p, tags: p.tags ? JSON.parse(p.tags) : [] })) });
    }

    // GET /api/posts/:slug — single post
    const postsMatch = url.pathname.match(/^\/api\/posts\/(.+)$/);
    if (postsMatch && request.method === 'GET') {
      const slug = postsMatch[1];
      const posts = await d1All('SELECT * FROM blog_posts WHERE slug=? AND published=1', slug);
      if (!posts.length) {
        return json({ error: 'Not found' }, 404);
      }
      return json({ post: { ...posts[0], tags: posts[0].tags ? JSON.parse(posts[0].tags) : [] } });
    }

    return json({ error: 'Not found' }, 404);
  } catch (err) {
    return json({ error: err.message }, 500);
  }
}
