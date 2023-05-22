import { createSlice } from '@reduxjs/toolkit'
import { type User, type Contact } from '../../types/user'

interface AuthState {
	user: User | null
	contacts: Contact[]
	users: User[]
}
const initialState: AuthState = {
	user: null,
	contacts: [],
	users: []
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		handleSetUser: (state, action) => {
			state.user = action.payload
		},
		handleAddContacts: (state, action) => {
			state.contacts = action.payload
		},
		handleAddUsers: (state, action) => {
			state.users = action.payload
		},
		handleLogout: () => {
			return initialState
		}
	}
})

export const { handleSetUser, handleAddContacts, handleLogout, handleAddUsers } = userSlice.actions

export default userSlice.reducer
