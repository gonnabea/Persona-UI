import axios from 'axios'
import { toast } from 'react-toastify'

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

axiosClient.interceptors.response.use(
  (res) => res,
  (error) => {
    const { response } = error

    if (response) {
      const {
        data: { error: message, status },
      } = response
      toast(`${status} ${message}`)
    }

    return Promise.reject(error)
  },
)
