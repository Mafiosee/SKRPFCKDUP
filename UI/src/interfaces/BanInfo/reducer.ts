import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type Info = {
	name: string
	type: string
	admin: string
	reason: string
	banDatetime: string
	unbanDatetime: string
}

type BanInfoState = {
	isOpen: boolean
	info: Info
}

const initialState: BanInfoState = {
	isOpen: false,
	info: {
		name: 'Брауни Младший',
		type: 'Кик',
		admin: 'Луцио Серая Грива',
		reason: 'Многократное нарушение правил по ОПС 12.3. Для подробной информации постетите форму, Раздел - “Общие правила сервера”',
		banDatetime: '12.02.2024 11:35',
		unbanDatetime: '27.02.2024 17:16',
	},
}

export const banInfoSlice = createSlice({
	name: 'banInfo',
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

export const banInfoReducer = banInfoSlice.reducer
export const banInfoActions = banInfoSlice.actions
