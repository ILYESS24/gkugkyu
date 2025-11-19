-- Extension du schéma AURION pour workflows, recommandations IA et temps réel

-- Table des outils/projets intégrés
CREATE TABLE IF NOT EXISTS integrated_tools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tool_name VARCHAR(100) NOT NULL CHECK (tool_name IN ('sandpack', 'langchain', 'aieditor', 'bolt.new', 'open-agent-builder', 'open-webui', 'mochi', 'open-sora', 'wan', 'vetra')),
  tool_type VARCHAR(50) NOT NULL CHECK (tool_type IN ('code-editor', 'ai-framework', 'agent-builder', 'website-builder', 'automation', 'ai-chat', 'video-generation')),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  config JSONB DEFAULT '{}',
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
  last_used_at TIMESTAMP WITH TIME ZONE,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Workflows entre outils
CREATE TABLE IF NOT EXISTS workflows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  steps JSONB NOT NULL DEFAULT '[]', -- [{tool: 'sandpack', action: 'create', data: {...}}, ...]
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed')),
  current_step INTEGER DEFAULT 0,
  execution_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recommandations de l'assistant IA
CREATE TABLE IF NOT EXISTS ai_recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL CHECK (type IN ('next-step', 'tool-suggestion', 'optimization', 'workflow', 'tutorial')),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  action JSONB, -- {tool: 'sandpack', action: 'create', params: {...}}
  priority INTEGER DEFAULT 5 CHECK (priority BETWEEN 1 AND 10),
  context JSONB DEFAULT '{}', -- Contexte qui a généré la recommandation
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'viewed', 'accepted', 'dismissed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Activité temps réel
CREATE TABLE IF NOT EXISTS realtime_activity (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tool_name VARCHAR(100),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  activity_type VARCHAR(50) NOT NULL CHECK (activity_type IN ('tool-switch', 'project-created', 'workflow-started', 'recommendation-accepted', 'code-saved', 'agent-deployed')),
  activity_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sessions utilisateur (pour tracking fluide)
CREATE TABLE IF NOT EXISTS user_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  current_tool VARCHAR(100),
  current_project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  session_data JSONB DEFAULT '{}',
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE
);

-- Conversations avec l'assistant IA
CREATE TABLE IF NOT EXISTS ai_assistant_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  response TEXT,
  context JSONB DEFAULT '{}',
  tool_suggested VARCHAR(100),
  action_taken JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_integrated_tools_user_id ON integrated_tools(user_id);
CREATE INDEX IF NOT EXISTS idx_integrated_tools_tool_name ON integrated_tools(tool_name);
CREATE INDEX IF NOT EXISTS idx_workflows_user_id ON workflows(user_id);
CREATE INDEX IF NOT EXISTS idx_workflows_status ON workflows(status);
CREATE INDEX IF NOT EXISTS idx_recommendations_user_id ON ai_recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_status ON ai_recommendations(status);
CREATE INDEX IF NOT EXISTS idx_realtime_activity_user_id ON realtime_activity(user_id);
CREATE INDEX IF NOT EXISTS idx_realtime_activity_created_at ON realtime_activity(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_user_id ON ai_assistant_conversations(user_id);

-- Table des jobs vidéo (Mochi / Open Sora / Wan)
CREATE TABLE IF NOT EXISTS video_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tool VARCHAR(50) NOT NULL CHECK (tool IN ('mochi', 'open-sora', 'wan')),
  prompt TEXT NOT NULL,
  config JSONB DEFAULT '{}',
  status VARCHAR(50) NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'processing', 'completed', 'failed')),
  result_url TEXT,
  thumbnail_url TEXT,
  metadata JSONB DEFAULT '{}',
  error TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_video_jobs_user_id ON video_jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_video_jobs_status ON video_jobs(status);

-- RLS Policies
ALTER TABLE integrated_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE realtime_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_assistant_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_jobs ENABLE ROW LEVEL SECURITY;

-- Policies pour integrated_tools
CREATE POLICY "Users can view own tools" ON integrated_tools
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own tools" ON integrated_tools
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own tools" ON integrated_tools
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own tools" ON integrated_tools
  FOR DELETE USING (auth.uid() = user_id);

-- Policies pour workflows
CREATE POLICY "Users can view own workflows" ON workflows
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own workflows" ON workflows
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own workflows" ON workflows
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own workflows" ON workflows
  FOR DELETE USING (auth.uid() = user_id);

-- Policies pour ai_recommendations
CREATE POLICY "Users can view own recommendations" ON ai_recommendations
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own recommendations" ON ai_recommendations
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own recommendations" ON ai_recommendations
  FOR UPDATE USING (auth.uid() = user_id);

-- Policies pour realtime_activity
CREATE POLICY "Users can view own activity" ON realtime_activity
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own activity" ON realtime_activity
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies pour user_sessions
CREATE POLICY "Users can view own sessions" ON user_sessions
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own sessions" ON user_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own sessions" ON user_sessions
  FOR UPDATE USING (auth.uid() = user_id);

-- Policies pour ai_assistant_conversations
CREATE POLICY "Users can view own conversations" ON ai_assistant_conversations
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own conversations" ON ai_assistant_conversations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies pour video_jobs
CREATE POLICY "Users can view own video jobs" ON video_jobs
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own video jobs" ON video_jobs
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own video jobs" ON video_jobs
  FOR UPDATE USING (auth.uid() = user_id);

-- Triggers pour updated_at
CREATE TRIGGER update_integrated_tools_updated_at BEFORE UPDATE ON integrated_tools
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_workflows_updated_at BEFORE UPDATE ON workflows
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_video_jobs_updated_at BEFORE UPDATE ON video_jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Fonction pour nettoyer les activités anciennes (plus de 30 jours)
CREATE OR REPLACE FUNCTION cleanup_old_activity()
RETURNS void AS $$
BEGIN
  DELETE FROM realtime_activity 
  WHERE created_at < NOW() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql;

