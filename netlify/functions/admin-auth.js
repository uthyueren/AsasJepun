const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'asaspw2024';

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { action, password, id, postData } = body;

  // Validate password server-side
  if (password !== ADMIN_PASSWORD) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }

  // Use service role key to bypass RLS for admin operations
  const { createClient } = require('@supabase/supabase-js');
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  // Handle different admin actions
  if (action === 'delete_signup') {
    const { error } = await supabase.from('class_signups').delete().eq('id', id);
    if (error) return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  }

  if (action === 'upsert_post') {
    const { error } = await supabase.from('blog_posts').upsert([{
      ...postData,
      updated_at: new Date().toISOString()
    }]);
    if (error) return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  }

  if (action === 'delete_post') {
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (error) return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  }

  return { statusCode: 400, body: JSON.stringify({ error: 'Unknown action' }) };
};
