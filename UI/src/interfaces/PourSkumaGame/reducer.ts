import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type PourSkumaGameState = {
	isOpen: boolean
}

const initialState: PourSkumaGameState = {
	isOpen: false,
}

export const pourSkumaGameSlice = createSlice({
	name: 'pourSkumaGame',
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

export const pourSkumaGameReducer = pourSkumaGameSlice.reducer
export const pourSkumaGameActions = pourSkumaGameSlice.actions
