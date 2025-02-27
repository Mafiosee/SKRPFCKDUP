import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { ItemType, Quality } from '../../shared/inventory/itemType'
import { StartCraftDTO } from '../../shared/CraftStatus/StartCraft'
import { FinishCraftDTO } from '../../shared/CraftStatus/FinishCraft'

type CraftConfirmState = {
	isOpen: boolean
	startCraft?: StartCraftDTO
	finishCraft?: FinishCraftDTO,
}

const initialState: CraftConfirmState = {
	isOpen: false,
	startCraft: {
		image: 'ale',
		name: 'Name',
		quality: Quality.Legendary,
		items: [
			{
				id: 0,
				amount: 25,
				has: 12,
				type: ItemType.Ingredients,
				image: 'ale',
				info: {
					actions: [],
					name: 'ingr',
					quality: Quality.Epic,
					description: '',
					parameters: [],
				},
				size: { width: 2, height: 2 },
			},
		],
		maxAmount: 100,
		timeSec: 60 * 60 * 3.5,
		isButtonActive: false,
	},
	// finishCraft: {
	// 	image: 'ale',
	// 	name: 'Бутылка',
	// 	quality: Quality.Legendary,
	// 	amount: 25,
	// },
}

export const craftStatusSlice = createSlice({
	name: 'craftStatus',
	initialState,
	reducers: {
		show(state) {
			state.isOpen = true
		},
		hide(state) {
			state.isOpen = false
		},
		setStartCraft(state, action: PayloadAction<StartCraftDTO>) {
			state.finishCraft = undefined
			state.startCraft = action.payload
		},
		setFinishCraft(state, action: PayloadAction<FinishCraftDTO>) {
			state.startCraft = undefined
			state.finishCraft = action.payload
		},
	},
})

export const craftStatusReducer = craftStatusSlice.reducer
export const craftStatusActions = craftStatusSlice.actions
