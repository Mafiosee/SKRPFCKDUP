import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Step } from './types/Step'

type MoonReedGameState = {
	isOpen: boolean
	step: Step
}

const initialState: MoonReedGameState = {
	isOpen: false,
	step: Step.MoveReed,
}

export const moonReedGameSlice = createSlice({
	name: 'moonReedGame',
	initialState,
	reducers: {
		show(state) {
			state.isOpen = true
			state.step = Step.MoveReed
		},
		hide(state) {
			state.isOpen = false
		},
		setStep(state, action: PayloadAction<Step>) {
			state.step = action.payload
		},
	},
})

export const moonReedGameReducer = moonReedGameSlice.reducer
export const moonReedGameActions = moonReedGameSlice.actions
