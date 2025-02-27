import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ContractState = {
	isOpen: boolean
	title: string
	header: string
	description: string
}

const initialState: ContractState = {
	isOpen: false,
	title: 'Трудовой контракт',
	header: 'Должность Шахтер',
	description:
		'Настоящим я, нижеподписавшийся, соглашаюсь работать на предприятии в качестве шахтера согласно установленному графику работы и условиям, оговоренным предприятием. Обязуюсь выполнять все указания и требования безопасности, предоставленные работодателем, соблюдать регламент внутреннего трудового распорядка и поддерживать чистоту на рабочем месте. Принимаю на себя ответственность за сохранность предоставленного оборудования, соблюдение техники безопасности и своевременное информирование руководства о любых аварийных ситуациях.',
}

export const contractSlice = createSlice({
	name: 'contract',
	initialState,
	reducers: {
		show(state) {
			state.isOpen = true
		},
		hide(state) {
			state.isOpen = false
		},
		setTitle(state, action: PayloadAction<string>) {
			state.title = action.payload
		},
		setHeader(state, action: PayloadAction<string>) {
			state.header = action.payload
		},
		setDescription(state, action: PayloadAction<string>) {
			state.description = action.payload
		},
	},
})

export const contractReducer = contractSlice.reducer
export const contractActions = contractSlice.actions
