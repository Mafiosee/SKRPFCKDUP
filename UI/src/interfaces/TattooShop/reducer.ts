import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { Quality } from '../../shared/inventory/itemType'
import { Category } from '../../shared/TattooShop/Category'
import { Color } from '../../shared/TattooShop/Color'
import { Product } from '../../shared/TattooShop/Product'

type TattooShopState = {
	isOpen: boolean;
	balance: number;
	storeName: string;
	products: Product[];
	colors: Color[];
};

const initialState: TattooShopState = {
	isOpen: false,
	balance: 15224,
	storeName: 'Название магазина',
	products: [
		{
			id: 0,
			quality: Quality.Unusual,
			name: 'Виндхельмская 0',
			price: 100,
			category: Category.LeftHand,
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

export const tattooShopSlice = createSlice({
	name: 'tattooShop',
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

export const tattooShopReducer = tattooShopSlice.reducer
export const tattooShopActions = tattooShopSlice.actions
