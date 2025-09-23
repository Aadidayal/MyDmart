// API configuration that adapts to environment
const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Browser environment
    if (window.location.hostname === 'localhost') {
      return 'http://localhost:5000';
    } else {
      // Production - use same domain with /api prefix
      return window.location.origin;
    }
  }
  // Server-side rendering or build time
  return process.env.VITE_API_URL || 'http://localhost:5000';
};

export const API_BASE_URL = getApiBaseUrl();
export const API_URL = `${API_BASE_URL}/api`;

export default {
  API_BASE_URL,
  API_URL
};