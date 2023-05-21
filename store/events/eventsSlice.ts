import { type Event } from '../../types/Group'
import { createSlice } from '@reduxjs/toolkit'

interface EventsState {
	selectedEvent: Event | null
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
