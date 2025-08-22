import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { config } from '~/constants'
import { loginResponse } from '~/types/apis'
import authorizeAxiosInstance from '~/utils/authorizeAxiosInstance'

interface UserState {
  id: string
  userId: string
  username: string
  email: string
  birthDate: string
  displayName: string
  bio: string
  location: string
  website: string
  avatarUrl: string
  headerImageUrl: string
  followerCount: number
  followingCount: number
  createdAt?: Date
  updatedAt?: Date
}

const intialState: UserState = {
  id: '',//id trong này sẽ là id của bảng profile
  userId: '',
  username: '',
  email: '',
  birthDate: '',
  displayName: '',
  bio: '',
  location: '',
  website: '',
  avatarUrl: '',
  headerImageUrl: '',
  followerCount: 0,
  followingCount: 0,
  createdAt: undefined,
  updatedAt: undefined
}

export const loginUserAPI = createAsyncThunk(
  'user/login',
  async (payload: { email: string; password: string }): Promise<loginResponse> => {
    const { email, password } = payload
    const response = await authorizeAxiosInstance.post(`${config.API_ROOT}/auth/login`, { email, password })
    return response.data as loginResponse
  }
)

export const logoutUserAPI = createAsyncThunk('user/logoutUserAPI', async () => {
  const response = await authorizeAxiosInstance.delete(`${config.API_ROOT}/auth/logout`)
  return response.data
})

export const updateUserProfileAPI = createAsyncThunk('user/updateProfile', async (payload: FormData): Promise<any> => {
  const response = await authorizeAxiosInstance.patch(`${config.API_ROOT}/user/profile`, payload)
  return response.data as any
})

export const userSlice = createSlice({
  name: 'user',
  initialState: intialState,
  reducers: {
    setUser: (state, action) => {
      const payload = action.payload
      state = { ...state, ...payload }
      return state
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      const { success, data } = action.payload
      if (success) {
        state = { ...state, ...data }
        state.userId = data.id
        return state
      } else {
        console.error('Login failed')
      }
    })
    builder.addCase(logoutUserAPI.fulfilled, (state) => {
      state = { ...intialState }
      return state
    })
    builder.addCase(updateUserProfileAPI.fulfilled, (state, action) => {
      const { success, data } = action.payload
      if (success) {
        state = { ...state, ...data }
        return state
      } else {
        console.error('Update profile failed')
      }
    })
  }
})

export const selectUser = (state: RootState) => state.user

export const { setUser } = userSlice.actions

export default userSlice.reducer
