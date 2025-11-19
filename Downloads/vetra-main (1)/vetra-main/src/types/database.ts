export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          type: 'website' | 'app' | 'content' | 'agent';
          description: string | null;
          status: 'draft' | 'building' | 'published' | 'archived';
          config: Record<string, any>;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          type: 'website' | 'app' | 'content' | 'agent';
          description?: string | null;
          status?: 'draft' | 'building' | 'published' | 'archived';
          config?: Record<string, any>;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          type?: 'website' | 'app' | 'content' | 'agent';
          description?: string | null;
          status?: 'draft' | 'building' | 'published' | 'archived';
          config?: Record<string, any>;
          created_at?: string;
          updated_at?: string;
        };
      };
      content_items: {
        Row: {
          id: string;
          user_id: string;
          project_id: string | null;
          type: 'text' | 'image' | 'video';
          title: string | null;
          content: string | null;
          metadata: Record<string, any>;
          storage_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          project_id?: string | null;
          type: 'text' | 'image' | 'video';
          title?: string | null;
          content?: string | null;
          metadata?: Record<string, any>;
          storage_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          project_id?: string | null;
          type?: 'text' | 'image' | 'video';
          title?: string | null;
          content?: string | null;
          metadata?: Record<string, any>;
          storage_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      ai_agents: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          type: 'support' | 'automation' | 'content' | 'custom';
          config: Record<string, any>;
          status: 'active' | 'inactive' | 'training';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          description?: string | null;
          type: 'support' | 'automation' | 'content' | 'custom';
          config?: Record<string, any>;
          status?: 'active' | 'inactive' | 'training';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          description?: string | null;
          type?: 'support' | 'automation' | 'content' | 'custom';
          config?: Record<string, any>;
          status?: 'active' | 'inactive' | 'training';
          created_at?: string;
          updated_at?: string;
        };
      };
      user_profiles: {
        Row: {
          id: string;
          name: string | null;
          avatar_url: string | null;
          plan: 'basic' | 'starter' | 'pro';
          usage_stats: Record<string, any>;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name?: string | null;
          avatar_url?: string | null;
          plan?: 'basic' | 'starter' | 'pro';
          usage_stats?: Record<string, any>;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string | null;
          avatar_url?: string | null;
          plan?: 'basic' | 'starter' | 'pro';
          usage_stats?: Record<string, any>;
          created_at?: string;
          updated_at?: string;
        };
      };
      integrated_tools: {
        Row: {
          id: string;
          user_id: string;
          tool_name: string;
          tool_type: string;
          project_id: string | null;
          config: Record<string, any>;
          status: string;
          last_used_at: string | null;
          usage_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          tool_name: string;
          tool_type: string;
          project_id?: string | null;
          config?: Record<string, any>;
          status?: string;
          last_used_at?: string | null;
          usage_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          tool_name?: string;
          tool_type?: string;
          project_id?: string | null;
          config?: Record<string, any>;
          status?: string;
          last_used_at?: string | null;
          usage_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      workflows: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          steps: any[];
          status: string;
          current_step: number;
          execution_data: Record<string, any>;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          description?: string | null;
          steps: any[];
          status?: string;
          current_step?: number;
          execution_data?: Record<string, any>;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          description?: string | null;
          steps?: any[];
          status?: string;
          current_step?: number;
          execution_data?: Record<string, any>;
          created_at?: string;
          updated_at?: string;
        };
      };
      ai_recommendations: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          title: string;
          description: string;
          action: any | null;
          priority: number;
          context: Record<string, any>;
          status: string;
          created_at: string;
          expires_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: string;
          title: string;
          description: string;
          action?: any | null;
          priority?: number;
          context?: Record<string, any>;
          status?: string;
          created_at?: string;
          expires_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: string;
          title?: string;
          description?: string;
          action?: any | null;
          priority?: number;
          context?: Record<string, any>;
          status?: string;
          created_at?: string;
          expires_at?: string | null;
        };
      };
      realtime_activity: {
        Row: {
          id: string;
          user_id: string;
          tool_name: string | null;
          project_id: string | null;
          activity_type: string;
          activity_data: Record<string, any>;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          tool_name?: string | null;
          project_id?: string | null;
          activity_type: string;
          activity_data?: Record<string, any>;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          tool_name?: string | null;
          project_id?: string | null;
          activity_type?: string;
          activity_data?: Record<string, any>;
          created_at?: string;
        };
      };
      video_jobs: {
        Row: {
          id: string;
          user_id: string;
          tool: 'mochi' | 'open-sora' | 'wan';
          prompt: string;
          config: Record<string, any>;
          status: 'queued' | 'processing' | 'completed' | 'failed';
          result_url: string | null;
          thumbnail_url: string | null;
          metadata: Record<string, any>;
          error: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          tool: 'mochi' | 'open-sora' | 'wan';
          prompt: string;
          config?: Record<string, any>;
          status?: 'queued' | 'processing' | 'completed' | 'failed';
          result_url?: string | null;
          thumbnail_url?: string | null;
          metadata?: Record<string, any>;
          error?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          tool?: 'mochi' | 'open-sora' | 'wan';
          prompt?: string;
          config?: Record<string, any>;
          status?: 'queued' | 'processing' | 'completed' | 'failed';
          result_url?: string | null;
          thumbnail_url?: string | null;
          metadata?: Record<string, any>;
          error?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

