-- Supabase PostgreSQL Schema for Chroma Chords Multi-User Cloud Sync

CREATE TABLE IF NOT EXISTS sets (
  user_id UUID NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  genre TEXT NOT NULL,
  mood TEXT NOT NULL,
  key TEXT NOT NULL,
  scale_type TEXT NOT NULL,
  bpm INTEGER NOT NULL DEFAULT 120,
  show_theory BOOLEAN NOT NULL DEFAULT true,
  deleted_at TIMESTAMPTZ NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, id)
);

CREATE TABLE IF NOT EXISTS set_chords (
  user_id UUID NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  set_id TEXT NOT NULL,
  position INTEGER NOT NULL,
  name TEXT NOT NULL,
  tag TEXT NOT NULL DEFAULT '',
  roman TEXT NOT NULL DEFAULT '',
  color TEXT NOT NULL DEFAULT '',
  function_label TEXT NOT NULL DEFAULT '',
  notes TEXT[] NOT NULL DEFAULT '{}',
  scale_label TEXT NOT NULL DEFAULT '',
  "desc" TEXT NOT NULL DEFAULT '',
  degree TEXT NOT NULL DEFAULT '',
  scale_key TEXT NOT NULL DEFAULT '',
  tension NUMERIC NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, set_id, position),
  FOREIGN KEY (user_id, set_id) REFERENCES sets (user_id, id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_sets_user_id ON sets (user_id);
CREATE INDEX IF NOT EXISTS idx_sets_user_updated ON sets (user_id, updated_at);
CREATE INDEX IF NOT EXISTS idx_set_chords_user_set ON set_chords (user_id, set_id);

ALTER TABLE sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE set_chords ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own sets"
  ON sets
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage own set_chords"
  ON set_chords
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
