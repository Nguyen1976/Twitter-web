import axios from 'axios'
import { config } from '~/constants'
import { RegisterData, RegisterResponse, sendVerificationEmailResponse, VerifyEmailResponse } from '~/types'

// export const checkEmailExistsAPI = async (email: string) => {
//   const response = await axios.post(`${config.API_ROOT}/auth/check-email`, {
//     email
//   })
//   return response.data
// }
// export const checkUsernameExistsAPI = async (username: string) => {
//   const response = await axios.post(`${config.API_ROOT}/auth/check-username`, {
//     username
//   })
//   return response.data
// }

export const sendVerificationEmailAPI = async (
  email: string,
  username: string
): Promise<sendVerificationEmailResponse> => {
  const response = await axios.post(`${config.API_ROOT}/auth/send-verification`, {
    email,
    username
  })
  return response.data as sendVerificationEmailResponse
}

export const verifyEmailAPI = async (email: string, otp: string): Promise<VerifyEmailResponse> => {
  const response = await axios.post(`${config.API_ROOT}/auth/verify-otp`, {
    email,
    otp
  })
  return response.data as VerifyEmailResponse
}

export const registerAPI = async (data: RegisterData): Promise<RegisterResponse> => {
  const response = await axios.post(`${config.API_ROOT}/auth/register`, data)
  return response.data as RegisterResponse
}
