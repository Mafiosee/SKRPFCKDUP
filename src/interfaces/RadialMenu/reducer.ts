import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Piece } from './types'

type RadialMenuState = {
	isOpen: boolean
	pieces: Piece[]
	category: string | null
}

const initialState: RadialMenuState = {
	isOpen: false,
	pieces: [],
	category: null,
}

export const radialMenuSlice = createSlice({
	name: 'radialMenu',
	initialState,
	reducers: {
		show(state, action: PayloadAction<{ pieces: Piece[]; category: string | null }>) {
			state.isOpen = true
			state.pieces = action.payload.pieces
			state.category = action.payload.category
		},
		hide(state) {
			state.isOpen = false
		},
		setPieces(state, action: PayloadAction<Piece[]>) {
			state.pieces = action.payload
		},
	},
})

export const radialMenuReducer = radialMenuSlice.reducer
export const radialMenuActions = radialMenuSlice.actions
