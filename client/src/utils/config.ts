/**
 * Get the API base URL
 * - In production (Coolify): uses empty string (same domain)
 * - In development: uses localhost:4001
 * - Can be overridden with VITE_API_URL env var
 */
export const getApiUrl = (): string => {
  // If VITE_API_URL is explicitly set, use it
  const envApiUrl = (import.meta as any).env?.VITE_API_URL;
  if (envApiUrl !== undefined && envApiUrl !== null) {
    return envApiUrl;
  }

  // In development mode, use localhost
  if ((import.meta as any).env?.DEV) {
    return 'http://localhost:4001';
  }

  // In production, use empty string (same domain)
  return '';
};

export const API_URL = getApiUrl();




