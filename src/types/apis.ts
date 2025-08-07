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

export type loginResponse = {
  status(arg0: string, status: any): unknown
  success: boolean
  data: {
    accessToken: string
    refreshToken: string
    user: {
      id: string
      username: string
      email: string
      birthDate: string
    }
  }
}