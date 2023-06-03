import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export enum Theme {
	DARK = 'dark',
	LIGHT = 'light'
}

export enum Language {
	EN = 'en',
	ES = 'es',
	FR = 'fr'
}

interface UtilsState {
	theme: Theme
	language: Language
}
const initialState: UtilsState = {
	theme: Theme.DARK,
	language: Language.EN
}

export const utilsSlice = createSlice({
	name: 'utils',
	initialState,
	reducers: {
		handleChangeLanguage: (state, action: PayloadAction<Language>) => {
			state.language = action.payload
		},
		handleChangeTheme: (state, action: PayloadAction<Theme>) => {
			state.theme = action.payload
		}
	}
})

export const { handleChangeLanguage, handleChangeTheme } = utilsSlice.actions

export default utilsSlice.reducer
