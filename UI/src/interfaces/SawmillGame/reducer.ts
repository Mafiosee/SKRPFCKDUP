import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GameType } from '../../shared/Work/Sawmill'

type SawmillGameState = {
	isOpen: boolean
	gameType: GameType | null
}

const initialState: SawmillGameState = {
	isOpen: false,
	gameType: null,
}

export const sawmillGameSlice = createSlice({
	name: 'sawmillGame',
	initialState,
	reducers: {
		show(state, action: PayloadAction<GameType>) {
			state.isOpen = true
			state.gameType = action.payload
		},
		hide(state) {
			state.isOpen = false
			state.gameType = null
		},
	},
})

export const sawmillGameReducer = sawmillGameSlice.reducer
export const sawmillGameActions = sawmillGameSlice.actions
