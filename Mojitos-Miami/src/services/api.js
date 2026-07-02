import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || 'Error de conexión'
    return Promise.reject(new Error(message))
  },
)

export async function getMenu() {
  const { data } = await api.get('/menu', { timeout: 2500 })
  return data
}

export async function sendContactForm(payload) {
  const { data } = await api.post('/contact', payload)
  return data
}

export default api
