import { type User } from '../../types/user'
import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
	user: User | null
	users: User[]
}
const initialState: AuthState = {
	user: null,
	users: []
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		handleSetUser: (state, action) => {
			state.user = action.payload
		},
		handleAddUsers: (state, action) => {
			state.users = action.payload
		},
		handleLogout: () => {
			return initialState
		}
	}
})

export const { handleSetUser, handleLogout, handleAddUsers } = userSlice.actions

export default userSlice.reducer
