
-- AI Talent Intelligence & Hiring Agent tables

CREATE TABLE public.talent_candidates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  email TEXT,
  location TEXT NOT NULL DEFAULT '',
  remote_preference TEXT NOT NULL DEFAULT 'Remote',
  years_experience INT NOT NULL DEFAULT 0,
  expected_salary TEXT,
  industry TEXT NOT NULL DEFAULT '',
  availability TEXT NOT NULL DEFAULT 'Immediate',
  education TEXT NOT NULL DEFAULT '',
  skills JSONB NOT NULL DEFAULT '{}',
  analysis JSONB NOT NULL DEFAULT '{}',
  pipeline_stage TEXT NOT NULL DEFAULT 'sourced',
  sources JSONB NOT NULL DEFAULT '[]',
  github_url TEXT,
  portfolio_url TEXT,
  resume_text TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.talent_candidates TO authenticated;
GRANT ALL ON public.talent_candidates TO service_role;
ALTER TABLE public.talent_candidates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own talent_candidates" ON public.talent_candidates FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE INDEX ON public.talent_candidates (user_id, created_at DESC);
CREATE INDEX ON public.talent_candidates (user_id, pipeline_stage);

CREATE TABLE public.talent_resumes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  candidate_id UUID REFERENCES public.talent_candidates ON DELETE SET NULL,
  file_name TEXT NOT NULL,
  resume_text TEXT NOT NULL,
  analysis JSONB NOT NULL DEFAULT '{}',
  job_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.talent_resumes TO authenticated;
GRANT ALL ON public.talent_resumes TO service_role;
ALTER TABLE public.talent_resumes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own talent_resumes" ON public.talent_resumes FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE INDEX ON public.talent_resumes (user_id, created_at DESC);

CREATE TABLE public.talent_interviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  candidate_id UUID REFERENCES public.talent_candidates ON DELETE CASCADE,
  role TEXT NOT NULL,
  plan JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.talent_interviews TO authenticated;
GRANT ALL ON public.talent_interviews TO service_role;
ALTER TABLE public.talent_interviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own talent_interviews" ON public.talent_interviews FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE INDEX ON public.talent_interviews (user_id, created_at DESC);

CREATE TABLE public.talent_searches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  query TEXT NOT NULL,
  filters JSONB NOT NULL DEFAULT '{}',
  result_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.talent_searches TO authenticated;
GRANT ALL ON public.talent_searches TO service_role;
ALTER TABLE public.talent_searches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own talent_searches" ON public.talent_searches FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
