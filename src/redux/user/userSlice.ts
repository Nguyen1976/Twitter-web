import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import axios from 'axios'
import { config } from '~/constants'
import { loginResponse } from '~/types/apis'

interface UserState {
  id: string
  username: string
  email: string
  birthDate: string
}

const intialState: UserState = {
  id: '',
  username: '',
  email: '',
  birthDate: ''
}

export const loginUserAPI = createAsyncThunk(
  'user/login',
  async (payload: { email: string; password: string }): Promise<loginResponse> => {
    const { email, password } = payload
    const response = await axios.post(`${config.API_ROOT}/auth/login`, { email, password })
    return response.data as loginResponse
  }
)

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
        state = { ...state, ...data.user }
        localStorage.setItem('accessToken', data.accessToken)
        localStorage.setItem('refreshToken', data.refreshToken)
        return state
      } else {
        console.error('Login failed')
      }
    })
  }
})

export const selectUser = (state: RootState) => state.users

export const { setUser } = userSlice.actions

export default userSlice.reducer
