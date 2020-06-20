import axios, { AxiosRequestConfig } from "axios";
import { message } from "antd";
axios.defaults.baseURL = 'http://localhost:8888'

axios.defaults.headers.post['COntent-Type'] = 'application/json;charset=UTF-8'

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  let access_token = sessionStorage.getItem('access_token')
  if (access_token) {
    config.headers['Authorization'] = `Bearer ${access_token}`
  }
  return config
}, (error: any) => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response.data
}, error => {
  message.error(error.message)
  return Promise.reject(error)
})

export default axios