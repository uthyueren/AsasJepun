// supabase/functions/admin-auth/index.ts
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const ADMIN_PASSWORD = Deno.env.get('ADMIN_PASSWORD') || 'asasjepun123';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || 'https://cctnkujlnhcqwbgekibq.supabase.co';
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { action, password, ...data } = await req.json();

    // Validate password
    if (password !== ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create Supabase admin client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    let result;

    switch (action) {
      case 'delete_signup': {
        const { id } = data;
        const { error } = await supabase.from('signups').delete().eq('id', id);
        result = error ? { error: error.message } : { success: true };
        break;
      }
      case 'upsert_post': {
        const { postData } = data;
        const { data: resultData, error } = await supabase
          .from('blog_posts')
          .upsert(postData)
          .select()
          .single();
        result = error ? { error: error.message } : { success: true, post: resultData };
        break;
      }
      case 'delete_post': {
        const { id } = data;
        const { error } = await supabase.from('blog_posts').delete().eq('id', id);
        result = error ? { error: error.message } : { success: true };
        break;
      }
      default:
        result = { error: 'Unknown action' };
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
