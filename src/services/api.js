/**
 * Public API Service for Main Website
 * Read-only access to backend data
 * Data is managed through the Admin Portal
 */
import axios from 'axios'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.response?.data?.message || error.message)
    return Promise.reject(error)
  }
)

// ============================================
// PUBLIC READ-ONLY API METHODS
// ============================================

export const moviesAPI = {
  getAll: (params = {}) => api.get('/movies', { params }),
  getFeatured: () => api.get('/movies/featured'),
  getBySlug: (slug) => api.get(`/movies/slug/${slug}`)
}

export const newsAPI = {
  getAll: (params = {}) => api.get('/news', { params }),
  getDashboard: () => api.get('/news/dashboard'),
  getBySlug: (slug) => api.get(`/news/slug/${slug}`)
}

// Team API
export const teamAPI = {
  getAll: (params = {}) => api.get('/team', { params }),
  getHomepage: (limit = 10) => api.get('/team/homepage', { params: { limit } }),
  getByRole: (role) => api.get(`/team/by-role/${encodeURIComponent(role)}`),
  getRoles: () => api.get('/team/roles'),
  getBySlug: (slug) => api.get(`/team/slug/${slug}`)
}

export const companyAPI = {
  getInfo: () => api.get('/company')
}

export const navigationAPI = {
  get: () => api.get('/navigation')
}

export const licensingAPI = {
  get: () => api.get('/licensing')
}

export const marketingAPI = {
  get: () => api.get('/marketing')
}

export const settingsAPI = {
  get: () => api.get('/settings')
}

export const messagesAPI = {
  send: (data) => api.post('/messages', data)
}

export const seoAPI = {
  getBySlug: (slug) => api.get(`/seo/slug/${slug}`),
  getAll: () => api.get('/seo'),
  getSitemapData: () => api.get('/seo/sitemap/data')
}

export const careersAPI = {
  getAll: () => api.get('/careers/public'),
  getById: (id) => api.get(`/careers/public/${id}`)
}

export default api
