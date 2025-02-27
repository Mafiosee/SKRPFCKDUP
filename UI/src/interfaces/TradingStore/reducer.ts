import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { Category } from '../../shared/TradingStore/Category'
import { Product } from '../../shared/TradingStore/Product'
import { Quality } from '../../shared/inventory/itemType'

type TradingStoreState = {
	isOpen: boolean;
	categories: Category[];
	products: Product[];
};

const initialState: TradingStoreState = {
	isOpen: false,
	categories: [
		{ id: 0, name: 'Еда' },
		{ id: 1, name: 'Напитки' },
		{ id: 2, name: 'Ингридиенты' },
	],
	products: [
		{
			id: 0,
			categoryId: 0,
			quality: Quality.Unusual,
			image: 'rod',
			name: 'Unusual',
			price: 20,
			maxAmount: 3,
		},
		{
			id: 1,
			categoryId: 1,
			quality: Quality.Normal,
			image: 'rod',
			name: 'Normal',
			price: 60,
		},
		{
			id: 2,
			categoryId: 1,
			quality: Quality.Rare,
			image: 'rod',
			name: 'Rare',
			price: 60,
		},
		{
			id: 3,
			categoryId: 1,
			quality: Quality.Epic,
			image: 'rod',
			name: 'Epic',
			price: 60,
		},
		{
			id: 4,
			categoryId: 1,
			quality: Quality.Legendary,
			image: 'rod',
			name: 'Legendary',
			price: 60,
		},
	],
}

export const tradingStoreSlice = createSlice({
	name: 'tradingStore',
	initialState,
	reducers: {
		show(state) {
			state.isOpen = true
		},
		hide(state) {
			state.isOpen = false
		},
		setCategories(state, action: PayloadAction<Category[]>) {
			state.categories = action.payload
		},
		setProducts(state, action: PayloadAction<Product[]>) {
			state.products = action.payload
		},
	},
})

export const tradingStoreReducer = tradingStoreSlice.reducer
export const tradingStoreActions = tradingStoreSlice.actions
