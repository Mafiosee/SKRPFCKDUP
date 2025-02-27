import { createSlice } from '@reduxjs/toolkit'

type MineGameState = {
	isOpen: boolean
}

const initialState: MineGameState = {
	isOpen: false,
}

export const mineGameSlice = createSlice({
	name: 'mineGame',
	initialState,
	reducers: {
		show(state) {
			state.isOpen = true
		},
		hide(state) {
			state.isOpen = false
		},
	},
})

export const mineGameReducer = mineGameSlice.reducer
export const mineGameActions = mineGameSlice.actions
