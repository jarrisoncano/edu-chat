import userSlice from './user/userSlice'
import groupsSlice from './groups/groupsSlice'
import eventsSlice from './events/eventsSlice'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const resetStateMiddleware = () => (next: any) => (action: any) => {
	if (action.type === 'user/handleLogout') {
		store.dispatch({ type: 'groups/handleResetGroups' })
		store.dispatch({ type: 'events/handleResetEvents' })
	}
	next(action)
}

const rootReducer = combineReducers({
	userSlice,
	groupsSlice,
	eventsSlice
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false
		}).concat(resetStateMiddleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
