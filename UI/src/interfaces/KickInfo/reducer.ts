import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type Info = {
	name: string
	type: string
	admin: string
	reason: string
}

type KickInfoState = {
	isOpen: boolean
	info: Info
}

const initialState: KickInfoState = {
	isOpen: false,
	info: {
		name: 'Брауни Младший',
		type: 'Кик',
		admin: 'Луцио Серая Грива',
		reason: 'Многократное нарушение правил по ОПС 12.3. Для подробной информации постетите форму, Раздел - “Общие правила сервера”',
	},
}

export const kickInfoSlice = createSlice({
	name: 'kickInfo',
	initialState,
	reducers: {
		show(state) {
			state.isOpen = true
		},
		hide(state) {
			state.isOpen = false
		},
		setInfo(state, action: PayloadAction<Info>) {
			state.info = action.payload
		},
	},
})

export const kickInfoReducer = kickInfoSlice.reducer
export const kickInfoActions = kickInfoSlice.actions
