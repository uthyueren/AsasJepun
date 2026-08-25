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
