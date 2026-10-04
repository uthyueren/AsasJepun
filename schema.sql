-- D1 schema for asasjepun-db
-- Adapted from supabase-schema.sql for SQLite compatibility

CREATE TABLE IF NOT EXISTS class_signups (
  id TEXT DEFAULT (lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))),2) || '-' || substr('89ab',abs(random()) % 4, 1) || substr(lower(hex(randomblob(2))),2) || '-' || lower(hex(randomblob(6)))) PRIMARY KEY,
  name TEXT NOT NULL,
  age TEXT NOT NULL,
  phone TEXT NOT NULL,
  level TEXT,
  class_type TEXT,
  schedule TEXT,
  studied_before TEXT,
  studied_duration TEXT,
  studied_methods TEXT,
  studied_methods_other TEXT,
  jlpt_taken TEXT,
  jlpt_level TEXT,
  exposure TEXT,
  why_japanese TEXT,
  why_japanese_other TEXT,
  goal TEXT,
  goal_other TEXT,
  study_hours TEXT,
  activities TEXT,
  quit_before TEXT,
  quit_reason TEXT,
  quit_reason_other TEXT,
  challenges TEXT,
  challenges_other TEXT,
  expectations TEXT,
  expectations_other TEXT,
  referral TEXT,
  referral_other TEXT,
  questions TEXT,
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT DEFAULT (lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))),2) || '-' || substr('89ab',abs(random()) % 4, 1) || substr(lower(hex(randomblob(2))),2) || '-' || lower(hex(randomblob(6)))) PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  author TEXT DEFAULT 'Admin',
  tags TEXT,
  publish_date TEXT DEFAULT (date('now')),
  reading_time INTEGER DEFAULT 5,
  published INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Insert sample blog posts
INSERT OR IGNORE INTO blog_posts (slug, title, excerpt, content, tags, reading_time) VALUES
('getting-started-japanese', 'Getting Started with Japanese', 'Your complete guide to beginning your Japanese learning journey.', '<p>Welcome to your Japanese learning journey! This guide will help you get started...</p>', '["guide","beginner"]', 5),
('hiragana-basics', 'Hiragana Basics: The Foundation of Japanese', 'Learn the fundamental hiragana characters and master their pronunciation.', '<p>Hiragana is one of the three writing systems in Japanese...</p>', '["hiragana","basics"]', 8),
('japanese-culture-essentials', '10 Essential Japanese Cultural Customs', 'Understanding Japanese culture is key to mastering the language.', '<p>Japanese culture has many unique customs that are important to understand...</p>', '["culture","etiquette"]', 10);

-- Admin users table (for password-based auth)
CREATE TABLE IF NOT EXISTS admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL DEFAULT 'admin',
  password_hash TEXT NOT NULL
);

-- Insert default admin (password: asasjepun123 - MUST BE REPLACED with bcrypt hash)
INSERT OR IGNORE INTO admin_users (username, password_hash) VALUES ('admin', '$2b$10$placeholder_hash_generate_with_bcrypt');
