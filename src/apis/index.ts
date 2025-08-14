import axios from 'axios'
import { config } from '~/constants'
import {
  getUserResponse,
  loginResponse,
  RegisterData,
  RegisterResponse,
  sendVerificationEmailResponse,
  VerifyEmailResponse
} from '~/types'
import authorizeAxiosInstance from '~/utils/authorizeAxiosInstance'


export const sendVerificationEmailAPI = async (
  email: string,
  username: string
): Promise<sendVerificationEmailResponse> => {
  const response = await authorizeAxiosInstance.post(`${config.API_ROOT}/auth/send-verification`, {
    email,
    username
  })
  return response.data as sendVerificationEmailResponse
}

export const verifyEmailAPI = async (email: string, otp: string): Promise<VerifyEmailResponse> => {
  const response = await authorizeAxiosInstance.post(`${config.API_ROOT}/auth/verify-otp`, {
    email,
    otp
  })
  return response.data as VerifyEmailResponse
}

export const registerAPI = async (data: RegisterData): Promise<RegisterResponse> => {
  const response = await authorizeAxiosInstance.post(`${config.API_ROOT}/auth/register`, data)
  return response.data as RegisterResponse
}

export const loginAPI = async (email: string, password: string): Promise<loginResponse> => {
  const response = await authorizeAxiosInstance.post(`${config.API_ROOT}/auth/login`, {
    email,
    password
  })
  return response.data as loginResponse
}

export const refreshTokenAPI = async (): Promise<{ accessToken: string }> => {
  const response = await authorizeAxiosInstance.post(`${config.API_ROOT}/auth/refresh-token`)
  return response.data as { accessToken: string }
}

export const getUserProfileAPI = async (userId: string): Promise<getUserResponse> => {
  const response = await authorizeAxiosInstance.get(`${config.API_ROOT}/user/profile/${userId}`)
  return response.data as getUserResponse
} 