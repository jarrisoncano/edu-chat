import { createSlice } from '@reduxjs/toolkit'
import { type User, type Contact } from '../../types/user'

interface AuthState {
	user: User | null
	contacts: Contact[]
}
const initialState: AuthState = {
	user: null,
	contacts: []
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
		}
	}
})

export const { handleSetUser, handleAddContacts } = userSlice.actions

export default userSlice.reducer
