import { type User } from '../../types/user'
import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
  user: User | null
}
const initialState: AuthState = {
  user: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    handleSetUser: (state, action) => {
      state.user = action.payload
    }
  }
})

export const { handleSetUser } = userSlice.actions

export default userSlice.reducer
