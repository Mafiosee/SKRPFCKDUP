import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { Component } from '../../shared/Modal/Component'
import { ComponentType } from '../../shared/Modal/Component/type'
import { ModalId } from '../../shared/Modal/types'
import { InputMode } from '../../shared/Modal/Component/Input'

type ModalState = {
	isOpen: boolean;
	modalId: ModalId;
	title: string;
	components: Component[];
};

const initialState: ModalState = {
	isOpen: false,
	modalId: 'anyModal',
	title: 'Авторизация',
	components: [
		// {
		// 	id: 'admin_password',
		// 	type: 3,
		// 	mode: 0,
		// 	lengthLimit: undefined,
		// 	title: 'Введите пароль',
		// 	placeholder: 'Пароль',
		// 	isPassword: true,
		// 	marginBottom: 20,
		// },
		// {
		// 	id: 'admin_buttons',
		// 	type: 6,
		// 	marginBottom: 20,
		// 	buttons: [
		// 		{
		// 			id: 'PreparedButtonAccept',
		// 			color: 0,
		// 			icon: null,
		// 			isMain: true,
		// 			text: 'Подтвердить',
		// 		},
		// 		{
		// 			id: 'PreparedButtonCancel',
		// 			color: 2,
		// 			icon: null,
		// 			isMain: null,
		// 			text: 'Отмена',
		// 		},
		// 	],
		// },
	],
}

export const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		show(state) {
			state.isOpen = true
		},
		hide(state) {
			state.isOpen = false
		},
		setModalId(state, action: PayloadAction<ModalId>) {
			state.modalId = action.payload
		},
		setTitle(state, action: PayloadAction<string>) {
			state.title = action.payload
		},
		setComponents(state, action: PayloadAction<Component[]>) {
			state.components = action.payload
		},
	},
})

export const modalReducer = modalSlice.reducer
export const modalActions = modalSlice.actions
