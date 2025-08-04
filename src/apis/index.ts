import axios from 'axios'
import { config } from '~/constants'

export const checkEmailExistsAPI = async (email: string) => {
  const response = await axios.post(`${config.API_ROOT}/auth/check-email`, {
    email
  })
  return response.data
}
export const checkUsernameExistsAPI = async (username: string) => {
  const response = await axios.post(`${config.API_ROOT}/auth/check-username`, {
    username
  })
  return response.data
}
