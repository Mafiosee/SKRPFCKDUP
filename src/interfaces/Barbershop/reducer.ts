import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { Product } from '../../shared/Barbershop/Product'
import { Category } from '../../shared/Barbershop/Category'
import { Quality } from '../../shared/inventory/itemType'
import { Color } from '../../shared/Barbershop/Color'

type BarbershopState = {
	isOpen: boolean;
	balance: number;
	storeName: string;
	products: Product[];
	colors: Color[];
};

const initialState: BarbershopState = {
	isOpen: false,
	balance: 15224,
	storeName: 'Название магазина',
	products: [
		{
			id: 0,
			quality: Quality.Unusual,
			name: 'Виндхельмская 0',
			price: 100,
			category: Category.Beard,
		},
	],
	colors: [
		{ id: 0, value: '#383B2C' },
		{ id: 1, value: '#433D2E' },
		{ id: 2, value: '#393728' },
		{ id: 3, value: '#514D39' },
		{ id: 4, value: '#42352D' },
		{ id: 5, value: 'rgb(255, 255, 122)' },
	],
}

export const barbershopSlice = createSlice({
	name: 'barbershop',
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
		setColors(state, action: PayloadAction<Color[]>) {
			state.colors = action.payload
		},
	},
})

export const barbershopReducer = barbershopSlice.reducer
export const barbershopActions = barbershopSlice.actions
