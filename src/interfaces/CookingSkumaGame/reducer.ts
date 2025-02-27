import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Step } from './types/Step'

type CookingSkumaGameState = {
	isOpen: boolean
	step: Step
}

const initialState: CookingSkumaGameState = {
	isOpen: false,
	step: Step.MoveSugar,
}

export const cookingSkumaGameSlice = createSlice({
	name: 'cookingSkumaGame',
	initialState,
	reducers: {
		show(state) {
			state.isOpen = true
			state.step = Step.MoveSugar
		},
		hide(state) {
			state.isOpen = false
		},
		setStep(state, action: PayloadAction<Step>) {
			state.step = action.payload
		},
	},
})

export const cookingSkumaGameReducer = cookingSkumaGameSlice.reducer
export const cookingSkumaGameActions = cookingSkumaGameSlice.actions
