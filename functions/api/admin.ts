// functions/api/admin.ts
// Cloudflare Pages Function — handles /api/admin routes

import bcrypt from 'bcryptjs';

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

  if (url.pathname !== '/api/admin') {
    return new Response('Not found', { status: 404 });
  }

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  async function d1(query, ...params) {
    const result = await env.DB.prepare(query).bind(...params).run();
    return result;
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

  function getSession(request) {
    const cookie = request.headers.get('Cookie') || '';
    const match = cookie.match(/admin_session=([^;]+)/);
    return match ? match[1] : null;
  }

  try {
    const body = await request.json();
    const { action, password, ...data } = body;

    // Login action
    if (!action || action === 'login') {
      const rows = await d1All('SELECT password_hash FROM admin_users LIMIT 1');
      if (!rows.length) {
        return json({ error: 'Unauthorized' }, 401);
      }
      const stored = rows[0].password_hash;
      const passwordMatch = await bcrypt.compare(password, stored);
      if (!passwordMatch) {
        return json({ error: 'Unauthorized' }, 401);
      }
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Set-Cookie': `admin_session=verified; Path=/; HttpOnly; SameSite=Strict` },
      });
    }

    // All other actions require session
    const session = getSession(request);
    if (!session) {
      return json({ error: 'Unauthorized' }, 401);
    }

    switch (action) {
      case 'get_posts': {
        const posts = await d1All('SELECT * FROM blog_posts ORDER BY created_at DESC');
        return json({ posts: posts.map(p => ({ ...p, tags: p.tags ? JSON.parse(p.tags) : [] })) });
      }
      case 'upsert_post': {
        const { postData } = data;
        const now = new Date().toISOString();
        if (postData.id) {
          await d1(
            `UPDATE blog_posts SET slug=?, title=?, excerpt=?, content=?, author=?, tags=?, publish_date=?, reading_time=?, published=?, updated_at=? WHERE id=?`,
            postData.slug, postData.title, postData.excerpt, postData.content,
            postData.author || 'Admin',
            postData.tags ? JSON.stringify(postData.tags) : null,
            postData.publish_date, postData.reading_time || 5,
            postData.published !== undefined ? (postData.published ? 1 : 0) : 1,
            now, postData.id
          );
          return json({ success: true });
        } else {
          const id = crypto.randomUUID();
          await d1(
            `INSERT INTO blog_posts (id, slug, title, excerpt, content, author, tags, publish_date, reading_time, published, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            id, postData.slug, postData.title, postData.excerpt, postData.content,
            postData.author || 'Admin',
            postData.tags ? JSON.stringify(postData.tags) : null,
            postData.publish_date || new Date().toISOString().split('T')[0],
            postData.reading_time || 5,
            postData.published !== undefined ? (postData.published ? 1 : 0) : 1,
            now, now
          );
          return json({ success: true, post: { id, ...postData } });
        }
      }
      case 'delete_post': {
        await d1('DELETE FROM blog_posts WHERE id=?', data.id);
        return json({ success: true });
      }
      case 'toggle_publish': {
        const { id, published } = data;
        await d1('UPDATE blog_posts SET published=?, updated_at=? WHERE id=?', published ? 1 : 0, new Date().toISOString(), id);
        return json({ success: true });
      }
      case 'get_signups': {
        const signups = await d1All('SELECT * FROM class_signups ORDER BY created_at DESC');
        return json({ signups });
      }
      case 'delete_signup': {
        await d1('DELETE FROM class_signups WHERE id=?', data.id);
        return json({ success: true });
      }
      default:
        return json({ error: 'Unknown action' }, 400);
    }
  } catch (err) {
    return json({ error: err.message }, 500);
  }
}
