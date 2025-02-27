import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Member } from '../../shared/HouseSystem/Member'
import { Interior } from '../../shared/HouseSystem/Interior'
import { Upgrade } from '../../shared/HouseSystem/Upgrade'

type HouseSystemState = {
	isOpen: boolean;
	image: string;
	owner: string | null;
	name: string;
	number: number;
	level: string;
	district: string;
	price: number;
	tax: number;
	isOwner: boolean;
	members: Member[];
	interiors: Interior[];
	upgrades: Upgrade[];
	locked: boolean;
};

const initialState: HouseSystemState = {
	isOpen: false,
	image: '0',
	owner: 'Mason Dookee',
	name: 'медовик',
	number: 536,
	level: 'Средний',
	district: 'Вайтран',
	price: 180000,
	tax: 2500,
	isOwner: true,
	members: [{ id: 0, name: 'Люцио Серая Грива', datetime: '05.01.2024 17:39' }],
	interiors: [
		{ id: 0, image: '0', name: 'Стандартный 0', price: 0, bought: false },
		{ id: 1, image: '0', name: 'Стандартный 1', price: 0, bought: false },
		{ id: 2, image: '0', name: 'Стандартный 2', price: 0, bought: true },
	],
	upgrades: [
		{ id: 0, name: 'Склад', price: 2500, bought: false },
		{ id: 1, name: 'Склад 1', price: 3500, bought: true },
		{ id: 2, name: 'Склад 2', price: 4500, bought: false },
		{ id: 3, name: 'Склад 3', price: 5500, bought: true },
	],
	locked: false,
}

export const houseSystemSlice = createSlice({
	name: 'houseSystem',
	initialState,
	reducers: {
		show(state) {
			state.isOpen = true
		},
		hide(state) {
			state.isOpen = false
		},
		setImage(state, action: PayloadAction<string>) {
			state.image = action.payload
		},
		setOwner(state, action: PayloadAction<string | null>) {
			state.owner = action.payload
		},
		setName(state, action: PayloadAction<string>) {
			state.name = action.payload
		},
		setNumber(state, action: PayloadAction<{ value: number }>) {
			state.number = action.payload.value
		},
		setLevel(state, action: PayloadAction<string>) {
			state.level = action.payload
		},
		setDistrict(state, action: PayloadAction<string>) {
			state.district = action.payload
		},
		setPrice(state, action: PayloadAction<{ value: number }>) {
			state.price = action.payload.value
		},
		setTax(state, action: PayloadAction<{ value: number }>) {
			state.tax = action.payload.value
		},
		setIsOwner(state, action: PayloadAction<boolean>) {
			state.isOwner = action.payload
		},
		setMembers(state, action: PayloadAction<Member[]>) {
			state.members = action.payload
		},
		setInteriors(state, action: PayloadAction<Interior[]>) {
			state.interiors = action.payload
		},
		setUpgrades(state, action: PayloadAction<Upgrade[]>) {
			state.upgrades = action.payload
		},
		setLocked(state, action: PayloadAction<boolean>) {
			state.locked = action.payload
		},
		setFullInfo(
			state,
			action: PayloadAction<{
				image?: string;
				owner?: string | null;
				name?: string;
				number?: number;
				level?: string;
				district?: string;
				price?: number;
				tax?: number;
				isOwner?: boolean;
				members?: Member[];
				interiors?: Interior[];
				upgrades?: Upgrade[];
				locked: boolean;
			}>,
		) {
			for (const key of Object.keys(action.payload)) {
				// @ts-expect-error qwe
				state[key] = action.payload[key]
			}
		},
	},
})

export const houseSystemReducer = houseSystemSlice.reducer
export const houseSystemActions = houseSystemSlice.actions
