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

export const publicationsAPI = {
  getAll:  (params) => api.get('/publications', { params }),
  getById: (id)     => api.get(`/publications/${id}`),
}

export const productsAPI = {
  getAll:  (params) => api.get('/products', { params }),
  getById: (id)     => api.get(`/products/${id}`),
}

export const caseStudiesAPI = {
  getAll: (params) => api.get('/case-studies', { params }),
}

export const coursesAPI = {
  getAll:  (params) => api.get('/courses', { params }),
  getById: (id)     => api.get(`/courses/${id}`),
}

function adminHeaders(adminKey) {
  return adminKey ? { 'x-admin-api-key': adminKey } : {}
}

export const adminAPI = {
  listProducts: (adminKey, params) => api.get('/admin/products', {
    params,
    headers: adminHeaders(adminKey),
  }),
  saveProduct: (adminKey, data) => {
    const headers = adminHeaders(adminKey)
    if (data._id) return api.put(`/admin/products/${data._id}`, data, { headers })
    return api.post('/admin/products', data, { headers })
  },
  deleteProduct: (adminKey, id) => api.delete(`/admin/products/${id}`, {
    headers: adminHeaders(adminKey),
  }),
  listCaseStudies: (adminKey, params) => api.get('/admin/case-studies', {
    params,
    headers: adminHeaders(adminKey),
  }),
  saveCaseStudy: (adminKey, data) => {
    const headers = adminHeaders(adminKey)
    if (data._id) return api.put(`/admin/case-studies/${data._id}`, data, { headers })
    return api.post('/admin/case-studies', data, { headers })
  },
  deleteCaseStudy: (adminKey, id) => api.delete(`/admin/case-studies/${id}`, {
    headers: adminHeaders(adminKey),
  }),
  listInsights: (adminKey, params) => api.get('/admin/insights', {
    params,
    headers: adminHeaders(adminKey),
  }),
  saveInsight: (adminKey, data) => {
    const headers = adminHeaders(adminKey)
    if (data._id) return api.put(`/admin/insights/${data._id}`, data, { headers })
    return api.post('/admin/insights', data, { headers })
  },
  deleteInsight: (adminKey, id) => api.delete(`/admin/insights/${id}`, {
    headers: adminHeaders(adminKey),
  }),
  listPublications: (adminKey, params) => api.get('/admin/publications', {
    params,
    headers: adminHeaders(adminKey),
  }),
  savePublication: (adminKey, data) => {
    const headers = adminHeaders(adminKey)
    if (data._id) return api.put(`/admin/publications/${data._id}`, data, { headers })
    return api.post('/admin/publications', data, { headers })
  },
  deletePublication: (adminKey, id) => api.delete(`/admin/publications/${id}`, {
    headers: adminHeaders(adminKey),
  }),
  listCourses: (adminKey, params) => api.get('/admin/courses', {
    params,
    headers: adminHeaders(adminKey),
  }),
  saveCourse: (adminKey, data) => {
    const headers = adminHeaders(adminKey)
    if (data._id) return api.put(`/admin/courses/${data._id}`, data, { headers })
    return api.post('/admin/courses', data, { headers })
  },
  deleteCourse: (adminKey, id) => api.delete(`/admin/courses/${id}`, {
    headers: adminHeaders(adminKey),
  }),
  uploadAsset: async (adminKey, file) => {
    const buffer = await file.arrayBuffer()
    const response = await api.post('/admin/uploads', buffer, {
      headers: {
        ...adminHeaders(adminKey),
        'Content-Type': file.type || 'application/octet-stream',
        'x-file-name': file.name,
      },
      timeout: 60000,
    })
    return response.asset
  },
}

export default api
