import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

// Request interceptor
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong'
    return Promise.reject(new Error(message))
  }
)

export const contactAPI = {
  submit: (data) => api.post('/contact', data),
}

export const newsletterAPI = {
  subscribe: (email) => api.post('/newsletter', { email }),
}

export const insightsAPI = {
  getAll:  (params) => api.get('/insights', { params }),
  getById: (id)     => api.get(`/insights/${id}`),
}

export default api
