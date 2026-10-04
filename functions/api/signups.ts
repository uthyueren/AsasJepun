// functions/api/signups.ts
// Cloudflare Pages Function — handles /api/signups routes

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

  if (url.pathname !== '/api/signups') {
    return new Response('Not found', { status: 404 });
  }

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  async function d1(query, ...params) {
    const result = await env.DB.prepare(query).bind(...params).run();
    return result;
  }

  function json(data, status = 200) {
    return new Response(JSON.stringify(data), {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
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
  } catch (err) {
    return json({ error: err.message }, 500);
  }
}
