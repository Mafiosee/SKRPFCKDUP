import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Contract } from './types'

type ContractsState = {
	isOpen: boolean
	contracts: Contract[]
}

const initialState: ContractsState = {
	isOpen: false,
	contracts: [
		{
			id: 0,
			bgImage: 'test-0',
			job: 'Лесопилка',
			location: 'Ривервед',
			icon: 'sawmill',
			progress: { current: 21, max: 48 },
			reward: 'Меч кладенец',
		},
		{
			id: 1,
			bgImage: 'test-0',
			job: 'Лесопилка',
			location: 'Солитьюд',
			icon: 'sawmill',
			progress: { current: 14, max: 25 },
			reward: 'Шапка мономаха',
		},
		{
			id: 2,
			bgImage: 'test-0',
			job: 'Лесопилка',
			location: 'Деревня анга',
			icon: 'sawmill',
			progress: { current: 3, max: 32 },
			reward: 'Кроксы со шрэком',
		},
	],
}

export const contractsSlice = createSlice({
	name: 'contracts',
	initialState,
	reducers: {
		show(state) {
			state.isOpen = true
		},
		hide(state) {
			state.isOpen = false
		},
		setContracts(state, action: PayloadAction<Contract[]>) {
			state.contracts = action.payload
		},
	},
})

export const contractsReducer = contractsSlice.reducer
export const contractsActions = contractsSlice.actions
