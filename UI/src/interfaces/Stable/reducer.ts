import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { Product } from '../../shared/Stable/Product'
import { Quality } from '../../shared/inventory/itemType'

type StableState = {
	isOpen: boolean;
	balance: number;
	storeName: string;
	products: Product[];
};

const initialState: StableState = {
	isOpen: false,
	balance: 15224,
	storeName: 'Название магазина',
	products: [
		{
			id: 0,
			quality: Quality.Unusual,
			name: 'Виндхельмская 0',
			price: 100,
			speed: 3,
			health: 6,
			weight: 50,
		},
		{
			id: 1,
			quality: Quality.Normal,
			name: 'Виндхельмская 1',
			price: 1111,
			speed: 5,
			health: 2,
			weight: 25,
		},
	],
}

export const stableSlice = createSlice({
	name: 'stable',
	initialState,
	reducers: {
		show(state) {
			state.isOpen = true
		},
		hide(state) {
			state.isOpen = false
		},
		setBalance(state, action: PayloadAction<{ value: number }>) {
			state.balance = action.payload.value
		},
		setStoreName(state, action: PayloadAction<string>) {
			state.storeName = action.payload
		},
		setProducts(state, action: PayloadAction<Product[]>) {
			state.products = action.payload
		},
	},
})

export const stableReducer = stableSlice.reducer
export const stableActions = stableSlice.actions
