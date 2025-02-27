import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Ad } from '../../shared/AdBoard/Ad'

type AdBoardState = {
	isOpen: boolean
	price: number
	playerName: string
	list: Ad[]
}

const initialState: AdBoardState = {
	isOpen: false,
	price: 1000,
	playerName: 'Люцио Серая Грива',
	list: [
		{
			id: 0,
			title: 'Огненный смерч',
			description: 'Продаю уникальный меч “Огненный смерч”, созданный древним кузнецом. Это реликвия нашей семьи!',
			position: { x: 300, y: 170 },
			rotate: 4,
		},
	],
}

export const adBoardSlice = createSlice({
	name: 'adBoard',
	initialState,
	reducers: {
		show(state) {
			state.isOpen = true
		},
		hide(state) {
			state.isOpen = false
		},
		setPrice(state, action: PayloadAction<{ value: number }>) {
			state.price = action.payload.value
		},
		setList(state, action: PayloadAction<Ad[]>) {
			state.list = action.payload
		},
	},
})

export const adBoardReducer = adBoardSlice.reducer
export const adBoardActions = adBoardSlice.actions
