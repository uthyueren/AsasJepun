-- Create class_signups table in Supabase
CREATE TABLE IF NOT EXISTS class_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  age TEXT NOT NULL,
  phone TEXT NOT NULL,
  level TEXT,
  class_type TEXT,
  schedule TEXT[],
  studied_before TEXT,
  studied_duration TEXT,
  studied_methods TEXT[],
  studied_methods_other TEXT,
  jlpt_taken TEXT,
  jlpt_level TEXT,
  exposure TEXT[],
  why_japanese TEXT[],
  why_japanese_other TEXT,
  goal TEXT,
  goal_other TEXT,
  study_hours TEXT,
  activities TEXT[],
  quit_before TEXT,
  quit_reason TEXT[],
  quit_reason_other TEXT,
  challenges TEXT[],
  challenges_other TEXT,
  expectations TEXT[],
  expectations_other TEXT,
  referral TEXT,
  referral_other TEXT,
  questions TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE class_signups ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for admin)
CREATE POLICY "Allow admin read" ON class_signups
  FOR SELECT USING (true);

-- Allow public inserts (for students signing up)
CREATE POLICY "Allow public insert" ON class_signups
  FOR INSERT WITH CHECK (true);

-- Allow admin deletes
CREATE POLICY "Allow admin delete" ON class_signups
  FOR DELETE USING (true);

-- Create blog_posts table in Supabase
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  author TEXT DEFAULT 'Admin',
  tags TEXT[],
  publish_date DATE DEFAULT CURRENT_DATE,
  reading_time INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read" ON blog_posts
  FOR SELECT USING (true);

-- Allow authenticated inserts (for admin)
CREATE POLICY "Allow admin insert" ON blog_posts
  FOR INSERT WITH CHECK (true);

-- Allow authenticated updates (for admin)
CREATE POLICY "Allow admin update" ON blog_posts
  FOR UPDATE USING (true);

-- Allow authenticated deletes (for admin)
CREATE POLICY "Allow admin delete" ON blog_posts
  FOR DELETE USING (true);

-- Insert sample blog posts
INSERT INTO blog_posts (slug, title, excerpt, content, tags, reading_time) VALUES
('getting-started-japanese', 'Getting Started with Japanese', 'Your complete guide to beginning your Japanese learning journey.', '<p>Welcome to your Japanese learning journey! This guide will help you get started...</p>', ARRAY['guide', 'beginner'], 5),
('hiragana-basics', 'Hiragana Basics: The Foundation of Japanese', 'Learn the fundamental hiragana characters and master their pronunciation.', '<p>Hiragana is one of the three writing systems in Japanese...</p>', ARRAY['hiragana', 'basics'], 8),
('japanese-culture-essentials', '10 Essential Japanese Cultural Customs', 'Understanding Japanese culture is key to mastering the language.', '<p>Japanese culture has many unique customs that are important to understand...</p>', ARRAY['culture', 'etiquette'], 10)
ON CONFLICT (slug) DO NOTHING;
