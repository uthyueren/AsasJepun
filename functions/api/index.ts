// functions/api/index.ts
// Cloudflare Pages Function — replaces Supabase admin-auth edge function + direct table access

import bcrypt from 'bcryptjs';

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Helper: run D1 query
  async function d1(query, ...params) {
    const result = await env.DB.prepare(query).bind(...params).run();
    return result;
  }

  // Helper: fetch all rows
  async function d1All(query, ...params) {
    const result = await env.DB.prepare(query).bind(...params).all();
    return result.results;
  }

  // JSON response
  function json(data, status = 200) {
    return new Response(JSON.stringify(data), {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Auth: verify session cookie
  function getSession(request) {
    const cookie = request.headers.get('Cookie') || '';
    const match = cookie.match(/admin_session=([^;]+)/);
    return match ? match[1] : null;
  }

  try {
    // Route: POST /api/admin — admin actions
    if (url.pathname === '/api/admin' && request.method === 'POST') {
      const body = await request.json();
      const { action, password, ...data } = body;

      // Login action — verify password, set cookie
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
        const res = new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Set-Cookie': `admin_session=verified; Path=/; HttpOnly; SameSite=Strict` },
        });
        return res;
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
            // Update
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
            // Insert
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
    }

    // Route: GET /api/posts — public blog posts
    if (url.pathname === '/api/posts' && request.method === 'GET') {
      const posts = await d1All('SELECT * FROM blog_posts WHERE published=1 ORDER BY created_at DESC');
      return json({ posts: posts.map(p => ({ ...p, tags: p.tags ? JSON.parse(p.tags) : [] })) });
    }

    // Route: GET /api/posts/:slug — single post
    if (url.pathname.startsWith('/api/posts/') && request.method === 'GET') {
      const slug = url.pathname.replace('/api/posts/', '');
      const posts = await d1All('SELECT * FROM blog_posts WHERE slug=? AND published=1', slug);
      if (!posts.length) {
        return json({ error: 'Not found' }, 404);
      }
      return json({ post: { ...posts[0], tags: posts[0].tags ? JSON.parse(posts[0].tags) : [] } });
    }

    // Route: POST /api/signups — class signup form
    if (url.pathname === '/api/signups' && request.method === 'POST') {
      const body = await request.json();
      const {
        name, age, phone, level, class_type,
        schedule, studied_before, studied_duration,
        studied_methods, studied_methods_other,
        jlpt_taken, jlpt_level,
        exposure, why_japanese, why_japanese_other,
        goal, goal_other, study_hours,
        activities, quit_before, quit_reason, quit_reason_other,
        challenges, challenges_other,
        expectations, expectations_other,
        referral, referral_other,
        questions, notes
      } = body;

      await d1(
        `INSERT INTO class_signups (
          name, age, phone, level, class_type, schedule,
          studied_before, studied_duration, studied_methods, studied_methods_other,
          jlpt_taken, jlpt_level, exposure, why_japanese, why_japanese_other,
          goal, goal_other, study_hours, activities,
          quit_before, quit_reason, quit_reason_other,
          challenges, challenges_other, expectations, expectations_other,
          referral, referral_other, questions, notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        name, age, phone, level, class_type,
        schedule ? JSON.stringify(schedule) : null,
        studied_before, studied_duration,
        studied_methods ? JSON.stringify(studied_methods) : null,
        studied_methods_other,
        jlpt_taken, jlpt_level,
        exposure ? JSON.stringify(exposure) : null,
        why_japanese ? JSON.stringify(why_japanese) : null,
        why_japanese_other,
        goal, goal_other, study_hours,
        activities ? JSON.stringify(activities) : null,
        quit_before,
        quit_reason ? JSON.stringify(quit_reason) : null,
        quit_reason_other,
        challenges ? JSON.stringify(challenges) : null,
        challenges_other,
        expectations ? JSON.stringify(expectations) : null,
        expectations_other,
        referral, referral_other, questions, notes
      );

      return json({ success: true });
    }

    return json({ error: 'Not found' }, 404);
  } catch (err) {
    return json({ error: err.message }, 500);
  }
}
