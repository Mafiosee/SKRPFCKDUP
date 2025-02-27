import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Character, SelectCharacterActionShowPayload } from './types'
import { Gender } from '../../types/gender'
import { Race } from '../../types/race'

type SelectCharacterState = {
	id: number
	isOpen: boolean
	characters: Character[]
	unlockPrice: number
	isOpenPopupExit: boolean
}

const initialState: SelectCharacterState = {
	id: 0,
	isOpen: false,
	characters: [],
	unlockPrice: 0,
	isOpenPopupExit: false,
}

export const selectCharacterSlice = createSlice({
	name: 'selectCharacter',
	initialState,
	reducers: {
		show(state, action: PayloadAction<SelectCharacterActionShowPayload>) {
			state.id = 0
			state.isOpen = true
			const { characters, unlockPrice } = action.payload
			state.characters = characters
			state.unlockPrice = unlockPrice
		},
		hide(state) {
			state.isOpen = false
		},
		updateCard(state, action: PayloadAction<{ index: number; card: Character }>) {
			const { index, card } = action.payload
			state.characters[index] = card
		},
		setIsOpenPopupExit(state, action: PayloadAction<boolean>) {
			state.isOpenPopupExit = action.payload
		},
	},
})

export const selectCharacterReducer = selectCharacterSlice.reducer
export const selectCharacterActions = selectCharacterSlice.actions
