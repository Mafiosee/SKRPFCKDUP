import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Coordinates } from '../../shared/Map/Coordinates'
import { ItemHashes } from '../../shared/inventory/ItemHashes'

type PickupItemState = {
	isOpen: boolean
	position: Coordinates
	itemHash: ItemHashes
	itemAmount: number
}

const initialState: PickupItemState = {
	isOpen: false,
	position: {
		x: 960,
		y: 540,
	},
	itemHash: ItemHashes.APPLE_PIE,
	itemAmount: 4,
}

export const pickupItemSlice = createSlice({
	name: 'pickupItem',
	initialState,
	reducers: {
		show(state) {
			state.isOpen = true
		},
		hide(state) {
			state.isOpen = false
		},
		setPosition(state, action: PayloadAction<Coordinates>) {
			state.position = action.payload
		},
		setItemHash(state, action: PayloadAction<ItemHashes>) {
			state.itemHash = action.payload
		},
		setItemAmount(state, action: PayloadAction<number>) {
			state.itemAmount = action.payload
		},
	},
})

export const pickupItemReducer = pickupItemSlice.reducer
export const pickupItemActions = pickupItemSlice.actions
