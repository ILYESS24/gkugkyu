-- Schéma pour le chiffrement et la protection des données

-- Table des secrets utilisateur (API keys, tokens, etc.)
CREATE TABLE IF NOT EXISTS user_secrets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  encrypted_value TEXT NOT NULL, -- Valeur chiffrée
  type VARCHAR(50) NOT NULL CHECK (type IN ('api_key', 'token', 'password', 'credential')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, name)
);

CREATE INDEX IF NOT EXISTS idx_user_secrets_user_id ON user_secrets(user_id);
CREATE INDEX IF NOT EXISTS idx_user_secrets_name ON user_secrets(name);

ALTER TABLE user_secrets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own secrets" ON user_secrets
  FOR ALL USING (auth.uid() = user_id);

-- Table des tokens API
CREATE TABLE IF NOT EXISTS api_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  token_hash VARCHAR(255) NOT NULL UNIQUE, -- Hash du token (jamais le token en clair)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  revoked BOOLEAN DEFAULT FALSE,
  revoked_at TIMESTAMP WITH TIME ZONE,
  last_used_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_api_tokens_user_id ON api_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_api_tokens_token_hash ON api_tokens(token_hash);
CREATE INDEX IF NOT EXISTS idx_api_tokens_revoked ON api_tokens(revoked);

ALTER TABLE api_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own API tokens" ON api_tokens
  FOR ALL USING (auth.uid() = user_id);

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_user_secrets_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_secrets_updated_at
  BEFORE UPDATE ON user_secrets
  FOR EACH ROW
  EXECUTE FUNCTION update_user_secrets_updated_at();

-- Ajouter des colonnes chiffrées aux tables existantes si nécessaire
-- (Optionnel: migrer les données existantes vers le chiffrement)

-- Exemple: Ajouter une colonne pour stocker les API keys chiffrées dans projects
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'projects' AND column_name = 'encrypted_api_keys'
  ) THEN
    ALTER TABLE projects ADD COLUMN encrypted_api_keys TEXT;
  END IF;
END $$;

-- Exemple: Ajouter une colonne pour stocker les credentials chiffrées dans ai_agents
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'ai_agents' AND column_name = 'encrypted_credentials'
  ) THEN
    ALTER TABLE ai_agents ADD COLUMN encrypted_credentials TEXT;
  END IF;
END $$;

