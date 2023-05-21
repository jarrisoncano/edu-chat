import { createSlice } from '@reduxjs/toolkit'
import { type SelectedEvent } from '../../types/Group'

interface EventsState {
	selectedEvent: SelectedEvent | null
}
const initialState: EventsState = {
	selectedEvent: null
}

export const eventsSlice = createSlice({
	name: 'events',
	initialState,
	reducers: {
		handleSelectedEvent: (state, action) => {
			state.selectedEvent = action.payload
		},
		handleResetEvents: () => {
			return initialState
		}
	}
})

export const { handleSelectedEvent, handleResetEvents } = eventsSlice.actions

export default eventsSlice.reducer
