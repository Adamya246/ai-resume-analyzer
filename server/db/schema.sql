CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS resume_analyses (
  id                      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename                VARCHAR(255) NOT NULL,
  raw_text                TEXT NOT NULL,
  summary                 TEXT,
  skills_found            JSONB,
  strengths               JSONB,
  weaknesses              JSONB,
  recommended_roles       JSONB,
  resume_score            INTEGER,
  interview_questions     JSONB,
  improvement_suggestions JSONB,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
