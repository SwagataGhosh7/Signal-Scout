
-- Targets: companies/domains a user monitors
CREATE TABLE public.targets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  domain TEXT,
  industry TEXT,
  notes TEXT,
  last_harvested_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.targets TO authenticated;
GRANT ALL ON public.targets TO service_role;
ALTER TABLE public.targets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own targets" ON public.targets FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Signals: raw harvested events
CREATE TABLE public.signals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  target_id UUID REFERENCES public.targets ON DELETE CASCADE,
  signal_type TEXT NOT NULL, -- hiring, funding, product_launch, leadership_change, social, website_change, partnership
  title TEXT NOT NULL,
  summary TEXT,
  source TEXT, -- linkedin, twitter, news, jobs, web
  source_url TEXT,
  intent TEXT, -- buying, hiring, partnership, expansion, creator
  detected_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  raw JSONB
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.signals TO authenticated;
GRANT ALL ON public.signals TO service_role;
ALTER TABLE public.signals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own signals" ON public.signals FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE INDEX ON public.signals (user_id, detected_at DESC);
CREATE INDEX ON public.signals (target_id);

-- Leads: prioritized opportunities derived from signals
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  target_id UUID REFERENCES public.targets ON DELETE CASCADE,
  title TEXT NOT NULL,
  rationale TEXT,
  score INT NOT NULL DEFAULT 0, -- 0-100
  urgency TEXT NOT NULL DEFAULT 'medium', -- low, medium, high
  intent TEXT,
  status TEXT NOT NULL DEFAULT 'new', -- new, contacted, qualified, won, lost
  signal_ids UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own leads" ON public.leads FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE INDEX ON public.leads (user_id, score DESC);

-- Outreach drafts
CREATE TABLE public.outreach_drafts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  lead_id UUID REFERENCES public.leads ON DELETE CASCADE,
  channel TEXT NOT NULL DEFAULT 'email',
  subject TEXT,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.outreach_drafts TO authenticated;
GRANT ALL ON public.outreach_drafts TO service_role;
ALTER TABLE public.outreach_drafts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own drafts" ON public.outreach_drafts FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
