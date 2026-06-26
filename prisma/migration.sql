-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Categories
CREATE TABLE IF NOT EXISTS categories (
  id    TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  name  TEXT NOT NULL,
  slug  TEXT NOT NULL UNIQUE,
  "order" INTEGER NOT NULL DEFAULT 0
);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id               TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  title            TEXT NOT NULL,
  title_en         TEXT,
  slug             TEXT NOT NULL UNIQUE,
  description      TEXT NOT NULL,
  description_long TEXT,
  cover_image      TEXT,
  category_id      TEXT NOT NULL REFERENCES categories(id),
  live_url         TEXT,
  github_url       TEXT,
  featured         BOOLEAN NOT NULL DEFAULT false,
  hidden           BOOLEAN NOT NULL DEFAULT false,
  "order"          INTEGER NOT NULL DEFAULT 0,
  color            TEXT NOT NULL DEFAULT '#1a3a5c',
  accent           TEXT NOT NULL DEFAULT '#4a9eff',
  year             TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Project images (gallery)
CREATE TABLE IF NOT EXISTS project_images (
  id         TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  url        TEXT NOT NULL,
  alt        TEXT,
  "order"    INTEGER NOT NULL DEFAULT 0,
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE
);

-- Project tech
CREATE TABLE IF NOT EXISTS project_tech (
  id         TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE
);

-- Skill groups
CREATE TABLE IF NOT EXISTS skill_groups (
  id      TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  name    TEXT NOT NULL,
  slug    TEXT NOT NULL UNIQUE,
  "order" INTEGER NOT NULL DEFAULT 0
);

-- Skills
CREATE TABLE IF NOT EXISTS skills (
  id       TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  name     TEXT NOT NULL,
  level    INTEGER NOT NULL DEFAULT 80,
  "order"  INTEGER NOT NULL DEFAULT 0,
  group_id TEXT NOT NULL REFERENCES skill_groups(id)
);

-- Experiences
CREATE TABLE IF NOT EXISTS experiences (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  role        TEXT NOT NULL,
  company     TEXT NOT NULL,
  period      TEXT NOT NULL,
  description TEXT NOT NULL,
  tech        TEXT[] NOT NULL DEFAULT '{}',
  "order"     INTEGER NOT NULL DEFAULT 0
);

-- Stats
CREATE TABLE IF NOT EXISTS stats (
  id      TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  label   TEXT NOT NULL,
  value   INTEGER NOT NULL,
  suffix  TEXT NOT NULL DEFAULT '+',
  "order" INTEGER NOT NULL DEFAULT 0
);

-- Settings (key-value)
CREATE TABLE IF NOT EXISTS settings (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Messages
CREATE TABLE IF NOT EXISTS messages (
  id         TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  subject    TEXT,
  message    TEXT NOT NULL,
  read       BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS projects_updated_at ON projects;
CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
