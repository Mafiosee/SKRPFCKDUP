import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FishingGameCondition } from './types'

type FishingGameState = {
	isOpen: boolean
	condition: FishingGameCondition
}

const initialState: FishingGameState = {
	isOpen: false,
	condition: FishingGameCondition.Fishing,
}

export const fishingGameSlice = createSlice({
	name: 'fishingGame',
	initialState,
	reducers: {
		show(state) {
			state.isOpen = true
			state.condition = FishingGameCondition.Waiting
		},
		hide(state) {
			state.isOpen = false
		},
		// Не для бэка
		setCondition(state, action: PayloadAction<FishingGameCondition>) {
			state.condition = action.payload
		},
	},
})

export const fishingGameReducer = fishingGameSlice.reducer
export const fishingGameActions = fishingGameSlice.actions
