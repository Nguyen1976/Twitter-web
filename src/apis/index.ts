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

export const sendVerificationEmailAPI = async (email: string, username: string) => {
  const response = await axios.post(`${config.API_ROOT}/auth/send-verification`, {
    email,
    username
  })
  return response.data
}

export const verifyEmailAPI = async (email: string, otp: string) => {
  const response = await axios.post(`${config.API_ROOT}/auth/verify-otp`, {
    email,
    otp
  })
  return response.data
}

export type RegisterData = {
  username: string
  email: string
  birthDate: string
  password: string
}

export const registerAPI = async (data: RegisterData) => {
  const response = await axios.post(`${config.API_ROOT}/auth/register`, data)
  return response.data
}
