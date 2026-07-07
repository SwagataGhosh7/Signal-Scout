CREATE TABLE IF NOT EXISTS targets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name VARCHAR(255) NOT NULL,
  domain VARCHAR(255) NOT NULL UNIQUE,
  industry VARCHAR(100) NOT NULL,
  priority VARCHAR(20) NOT NULL CHECK (priority IN ('High', 'Medium', 'Low')),
  owner VARCHAR(20) NOT NULL CHECK (owner IN ('Self', 'Team')),
  status VARCHAR(50) NOT NULL CHECK (status IN ('Active Scanning', 'Paused')),
  icp_context TEXT NOT NULL,
  ai_intent_level SMALLINT DEFAULT 0 CHECK (ai_intent_level >= 0 AND ai_intent_level <= 100),
  calculated_risk SMALLINT DEFAULT 0 CHECK (calculated_risk >= 0 AND calculated_risk <= 100),
  last_harvested TIMESTAMP NULL,
  actions_queue INTEGER DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_targets_priority ON targets(priority);
CREATE INDEX IF NOT EXISTS idx_targets_status ON targets(status);
CREATE INDEX IF NOT EXISTS idx_targets_created_at ON targets(created_at DESC);
