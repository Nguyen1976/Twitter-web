import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

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
  birthDate: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState: intialState,
  reducers: {
    setUser: (state, action) => {
      const payload = action.payload
      state = { ...state, ...payload }
      return state
    }
  }
})

export const selectUser = (state: RootState) => state.users

export const { setUser } = userSlice.actions

export default userSlice.reducer
