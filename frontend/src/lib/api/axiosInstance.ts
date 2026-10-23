import axios from 'axios'

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL+"/api/v1/ems"}`, 
  withCredentials: true,
})

export { apiClient }


