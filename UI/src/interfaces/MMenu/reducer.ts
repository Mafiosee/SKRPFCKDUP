import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Button } from '../../shared/MMenu/Button'

type MMenuState = {
	isOpen: boolean;
	buttons: Button[]
};

const initialState: MMenuState = {
	isOpen: false,
	buttons: [
		{ id: 0, icon: 'menu', name: 'Меню персонажа' },
		{ id: 1, icon: 'business', name: 'Управление бизнесом' },
		{ id: 2, icon: 'faction', name: 'Управление фракцией' },
	],
}

export const mMenuSlice = createSlice({
	name: 'mMenu',
	initialState,
	reducers: {
		show(state) {
			state.isOpen = true
		},
		hide(state) {
			state.isOpen = false
		},
		setButtons(state, action: PayloadAction<Button[]>) {
			state.buttons = action.payload
		},
	},
})

export const mMenuReducer = mMenuSlice.reducer
export const mMenuActions = mMenuSlice.actions
