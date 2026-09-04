const API_BASE = import.meta.env.VITE_API_URL || '/api';

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('ip_sakti_token');
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(options.headers || {}) },
    ...options,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || `Request failed: ${response.status}`);
  return data;
}

export const backendHealth = () => apiRequest('/health');
export const login = (email, password) => apiRequest('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
export const register = (payload) => apiRequest('/auth/register', { method: 'POST', body: JSON.stringify(payload) });
export const getProducts = () => apiRequest('/products');
export const getReports = () => apiRequest('/reports');
export const getEvidence = (q = '') => apiRequest(`/evidence${q ? `?q=${encodeURIComponent(q)}` : ''}`);
export const getDashboard = () => apiRequest('/dashboard/overview');
export const runAnalysis = (payload) => apiRequest('/analysis', { method: 'POST', body: JSON.stringify(payload) });
export const generateReport = (payload) => apiRequest('/reports', { method: 'POST', body: JSON.stringify(payload) });
export const translate = (payload) => apiRequest('/language/translate', { method: 'POST', body: JSON.stringify(payload) });

export const askAssistant = (payload) => apiRequest('/assistant/message', { method: 'POST', body: JSON.stringify(payload) });
export const getAnalysis = (id) => apiRequest(`/analysis/${id}`);
