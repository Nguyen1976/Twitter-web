import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface UserState {
  id?: string
  username?: string
  email?: string
  birthDate?: string
}
//Tạm thời sẽ là như này và sau này sẽ update thêm các trường khác vì vẫn còn user profile vì để dữ liệu linh hoạt lên các trường sẽ có thể null

const intialState: UserState = {
  id: '',
  username: '',
  email: '',
  birthDate: undefined,
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
