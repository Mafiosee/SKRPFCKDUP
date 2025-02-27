import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Quality } from '../../shared/inventory/itemType'

type SellResourceState = {
	isOpen: boolean
	title: string
	quality: Quality
	image: string
	name: string
	amount: number
	price: number
}

const initialState: SellResourceState = {
	isOpen: false,
	title: 'Продажа рыбы',
	quality: Quality.Epic,
	image: 'fish-test',
	name: 'Карпус',
	amount: 12,
	price: 500,
}

export const sellResourceSlice = createSlice({
	name: 'sellResource',
	initialState,
	reducers: {
		show(state) {
			state.isOpen = true
		},
		hide(state) {
			state.isOpen = false
		},
		setTitle(state, action: PayloadAction<string>) {
			state.title = action.payload
		},
		setQuality(state, action: PayloadAction<Quality>) {
			state.quality = action.payload
		},
		setImage(state, action: PayloadAction<string>) {
			state.image = action.payload
		},
		setName(state, action: PayloadAction<string>) {
			state.name = action.payload
		},
		setAmount(state, action: PayloadAction<{ value: number }>) {
			state.amount = action.payload.value
		},
		setPrice(state, action: PayloadAction<{ value: number }>) {
			state.price = action.payload.value
		},
	},
})

export const sellResourceReducer = sellResourceSlice.reducer
export const sellResourceActions = sellResourceSlice.actions
