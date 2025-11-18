'use client';

// Helper to make authenticated API requests
export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  // Lazy import to avoid SSR issues
  const { getSupabaseBrowserClient } = await import('./supabase-client');
  const supabase = getSupabaseBrowserClient();
  const { data: { session } } = await supabase.auth.getSession();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  // Add auth token if available
  if (session?.access_token) {
    headers['Authorization'] = `Bearer ${session.access_token}`;
  }

  const response = await fetch(endpoint, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// API methods
export const projectsApi = {
  getAll: () => apiRequest('/api/projects'),
  getById: (id: string) => apiRequest(`/api/projects/${id}`),
  create: (data: { name: string; type: string; description?: string; config?: any }) =>
    apiRequest('/api/projects', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) =>
    apiRequest(`/api/projects/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: string) =>
    apiRequest(`/api/projects/${id}`, { method: 'DELETE' }),
};

export const contentApi = {
  getAll: (params?: { type?: string; project_id?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return apiRequest(`/api/content${query ? `?${query}` : ''}`);
  },
  getById: (id: string) => apiRequest(`/api/content/${id}`),
  create: (data: { type: string; title?: string; content?: string; project_id?: string; metadata?: any; storage_url?: string }) =>
    apiRequest('/api/content', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) =>
    apiRequest(`/api/content/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: string) =>
    apiRequest(`/api/content/${id}`, { method: 'DELETE' }),
};

export const agentsApi = {
  getAll: () => apiRequest('/api/agents'),
  getById: (id: string) => apiRequest(`/api/agents/${id}`),
  create: (data: { name: string; type: string; description?: string; config?: any }) =>
    apiRequest('/api/agents', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) =>
    apiRequest(`/api/agents/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: string) =>
    apiRequest(`/api/agents/${id}`, { method: 'DELETE' }),
};

export const profileApi = {
  get: () => apiRequest('/api/profile'),
  update: (data: any) =>
    apiRequest('/api/profile', { method: 'PATCH', body: JSON.stringify(data) }),
};

export const statsApi = {
  get: () => apiRequest('/api/stats'),
};

export const analyticsApi = {
  getAll: (params?: { event_type?: string; project_id?: string; limit?: number }) => {
    const query = new URLSearchParams(params as any).toString();
    return apiRequest(`/api/analytics${query ? `?${query}` : ''}`);
  },
  track: (data: { event_type: string; event_data?: any; project_id?: string }) =>
    apiRequest('/api/analytics', { method: 'POST', body: JSON.stringify(data) }),
};

export const componentsApi = {
  trackUsage: (data: { component_id: string; component_type?: string; project_id?: string }) =>
    apiRequest('/api/components/usage', { method: 'POST', body: JSON.stringify(data) }),
  getUsage: (params?: { project_id?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return apiRequest(`/api/components/usage${query ? `?${query}` : ''}`);
  },
};

