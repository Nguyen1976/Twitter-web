export type RegisterData = {
  username: string
  email: string
  birthDate: string
  password: string
}

export type RegisterResponse = {
  success: boolean
  data: string // user ID or other data
}


export type sendVerificationEmailResponse = {
  success: boolean
  data: {
    createdAt: number
  }
}

export type VerifyEmailResponse = {
  success: boolean
  data: boolean // true if verification is successful, false otherwise
}