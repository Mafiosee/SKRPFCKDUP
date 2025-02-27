import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { Button } from './types'
// import { ButtonTypes } from '../../shared/modalDialog'

type NpcDialogState = {
	isOpen: boolean;
	name: string;
	text: string;
	buttons: Button[];
	mainButtons: Button[];
};

const initialState: NpcDialogState = {
	isOpen: false,
	name: 'Скупщик рыбы',
	text: 'Привет, вновь рыба? Когда-нибудь я перестану ей заниматься, но если хочешь мне ее продать, то ее я обязательно куплю.',
	buttons: [
		// {
		// 	text: 'Чешуйчатка',
		// 	amount: null,
		// 	disabled: true,
		// 	icon: null,
		// 	price: 4,
		// 	color: 2,
		// 	event: 'sell_fish_0',
		// },
		// {
		// 	text: 'Остроперка',
		// 	amount: null,
		// 	disabled: true,
		// 	icon: null,
		// 	price: 6,
		// 	color: 2,
		// 	event: 'sell_fish_1',
		// },
		// {
		// 	text: 'Язь',
		// 	amount: null,
		// 	disabled: true,
		// 	icon: null,
		// 	price: 15,
		// 	color: 2,
		// 	event: 'sell_fish_2',
		// },
		// {
		// 	text: 'Голец',
		// 	amount: null,
		// 	disabled: true,
		// 	icon: null,
		// 	price: 20,
		// 	color: 2,
		// 	event: 'sell_fish_3',
		// },
		// {
		// 	text: 'Толстолобик',
		// 	amount: null,
		// 	disabled: true,
		// 	icon: null,
		// 	price: 26,
		// 	color: 2,
		// 	event: 'sell_fish_4',
		// },
		// {
		// 	text: 'Лосось',
		// 	amount: null,
		// 	disabled: false,
		// 	icon: null,
		// 	price: 50,
		// 	color: ButtonColor.White,
		// 	event: 'sell_fish_5',
		// },
		// {
		// 	text: 'Ловецкий лосось',
		// 	amount: null,
		// 	disabled: false,
		// 	icon: null,
		// 	price: 152,
		// 	color: ButtonColor.White,
		// 	event: 'sell_fish_6',
		// },
		// {
		// 	text: 'Хаосовая рыба',
		// 	amount: null,
		// 	disabled: true,
		// 	icon: null,
		// 	price: 270,
		// 	color: ButtonColor.Transparent,
		// 	event: 'sell_fish_7',
		// },
		// {
		// 	text: 'Чешуйчатка',
		// 	amount: null,
		// 	disabled: true,
		// 	icon: null,
		// 	price: 4,
		// 	color: 2,
		// 	event: 'sell_fish_0',
		// },
		// {
		// 	text: 'Остроперка',
		// 	amount: null,
		// 	disabled: true,
		// 	icon: null,
		// 	price: 6,
		// 	color: 2,
		// 	event: 'sell_fish_1',
		// },
		// {
		// 	text: 'Язь',
		// 	amount: null,
		// 	disabled: true,
		// 	icon: null,
		// 	price: 15,
		// 	color: 2,
		// 	event: 'sell_fish_2',
		// },
		// {
		// 	text: 'Голец',
		// 	amount: null,
		// 	disabled: true,
		// 	icon: null,
		// 	price: 20,
		// 	color: 2,
		// 	event: 'sell_fish_3',
		// },
		// {
		// 	text: 'Толстолобик',
		// 	amount: null,
		// 	disabled: true,
		// 	icon: null,
		// 	price: 26,
		// 	color: 2,
		// 	event: 'sell_fish_4',
		// },
		// {
		// 	text: 'Лосось',
		// 	amount: null,
		// 	disabled: false,
		// 	icon: null,
		// 	price: 50,
		// 	color: ButtonColor.Transparent,
		// 	event: 'sell_fish_5',
		// },
		// {
		// 	text: 'Ловецкий лосось',
		// 	amount: null,
		// 	disabled: false,
		// 	icon: null,
		// 	price: 152,
		// 	color: ButtonColor.Transparent,
		// 	event: 'sell_fish_6',
		// },
		// {
		// 	text: 'Хаосовая рыба',
		// 	amount: null,
		// 	disabled: true,
		// 	icon: null,
		// 	price: 270,
		// 	color: ButtonColor.Transparent,
		// 	event: 'sell_fish_7',
		// },
	],
	mainButtons: [
		// {
		// 	text: 'Продать все',
		// 	amount: null,
		// 	disabled: true,
		// 	icon: 'sell',
		// 	price: 0,
		// 	color: 0,
		// 	event: 'sell_all_fishes',
		// },
		// {
		// 	text: 'Я пойду, всего доброго!',
		// 	amount: null,
		// 	disabled: false,
		// 	icon: 'exit',
		// 	price: null,
		// 	color: 1,
		// 	event: 'exit_fishSell',
		// },
	],
}

export const npcDialogSlice = createSlice({
	name: 'npcDialog',
	initialState,
	reducers: {
		show(state) {
			state.isOpen = true
		},
		hide(state) {
			state.isOpen = false
		},
		setName(state, action: PayloadAction<string>) {
			state.name = action.payload
		},
		setText(state, action: PayloadAction<string>) {
			state.text = action.payload
		},
		setButtons(state, action: PayloadAction<Button[]>) {
			state.buttons = action.payload
		},
		setMainButtons(state, action: PayloadAction<Button[]>) {
			state.mainButtons = action.payload
		},
	},
})

export const npcDialogReducer = npcDialogSlice.reducer
export const npcDialogActions = npcDialogSlice.actions
