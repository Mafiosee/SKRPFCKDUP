import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Message, MessageType } from './types'
import { callClient } from '../../utils/api'
import { DevConsoleEvents } from './api'

type DevConsoleState = {
	isOpen: boolean
	isFullSize: boolean
	isOpacity: boolean
	list: Message[]
}

const initialState: DevConsoleState = {
	isOpen: false,
	isFullSize: false,
	isOpacity: false,
	list: [
		// {
		// 	type: MessageType.Info,
		// 	text: 'Resource chat is already started',
		// 	datetime: '22:55:38',
		// },
		// {
		// 	type: MessageType.Warning,
		// 	text: 'Load resource core',
		// 	datetime: '22:56:38',
		// },
		// {
		// 	type: MessageType.Info,
		// 	text: 'Load resource core',
		// 	datetime: '22:57:38',
		// },
		// {
		// 	type: MessageType.Error,
		// 	text: 'This message is from console.error()',
		// 	datetime: '22:58:38',
		// },
		// {
		// 	type: MessageType.Error,
		// 	text: 'This message is from console.error()',
		// 	datetime: '22:58:38',
		// },
		// {
		// 	type: MessageType.Info,
		// 	text: 'Resource chat is already started',
		// 	datetime: '22:55:38',
		// },
		// {
		// 	type: MessageType.Warning,
		// 	text: 'Load resource core',
		// 	datetime: '22:56:38',
		// },
		// {
		// 	type: MessageType.Info,
		// 	text: 'Load resource core',
		// 	datetime: '22:57:38',
		// },
		// {
		// 	type: MessageType.Error,
		// 	text: 'This message is from console.error()',
		// 	datetime: '22:58:38',
		// },
		// {
		// 	type: MessageType.Error,
		// 	text: 'This message is from console.error()',
		// 	datetime: '22:58:38',
		// },
		// {
		// 	type: MessageType.Info,
		// 	text: 'Resource chat is already started',
		// 	datetime: '22:55:38',
		// },
		// {
		// 	type: MessageType.Warning,
		// 	text: 'Load resource core',
		// 	datetime: '22:56:38',
		// },
		// {
		// 	type: MessageType.Info,
		// 	text: 'Load resource core',
		// 	datetime: '22:57:38',
		// },
		// {
		// 	type: MessageType.Error,
		// 	text: 'This message is from console.error()',
		// 	datetime: '22:58:38',
		// },
		// {
		// 	type: MessageType.Error,
		// 	text: 'This message is from console.error()',
		// 	datetime: '22:58:38',
		// },
		// {
		// 	type: MessageType.Info,
		// 	text: 'Resource chat is already started',
		// 	datetime: '22:55:38',
		// },
		// {
		// 	type: MessageType.Warning,
		// 	text: 'Load resource core',
		// 	datetime: '22:56:38',
		// },
		// {
		// 	type: MessageType.Info,
		// 	text: 'Load resource core',
		// 	datetime: '22:57:38',
		// },
		// {
		// 	type: MessageType.Error,
		// 	text: 'This message is from console.error()',
		// 	datetime: '22:58:38',
		// },
		// {
		// 	type: MessageType.Error,
		// 	text: 'This message is from console.error()',
		// 	datetime: '22:58:38',
		// },
		// {
		// 	type: MessageType.Info,
		// 	text: 'Resource chat is already started',
		// 	datetime: '22:55:38',
		// },
		// {
		// 	type: MessageType.Warning,
		// 	text: 'Load resource core',
		// 	datetime: '22:56:38',
		// },
		// {
		// 	type: MessageType.Info,
		// 	text: 'Load resource core',
		// 	datetime: '22:57:38',
		// },
		// {
		// 	type: MessageType.Error,
		// 	text: 'This message is from console.error()',
		// 	datetime: '22:58:38',
		// },
		// {
		// 	type: MessageType.Error,
		// 	text: 'This message is from console.error()',
		// 	datetime: '22:58:38',
		// },
	],
}

export const devConsoleSlice = createSlice({
	name: 'devConsole',
	initialState,
	reducers: {
		show(state) {
			state.isOpen = true
			state.isFullSize = true
		},
		hide(state) {
			state.isOpen = false
		},
		addMessage(state, action: PayloadAction<Message>) {
			state.list.push(action.payload)
		},
		setIsFullSize(state, action: PayloadAction<boolean>) {
			state.isFullSize = action.payload
		},
		setIsOpacity(state, action: PayloadAction<boolean>) {
			const isOpacity = action.payload
			state.isOpacity = isOpacity
			callClient(DevConsoleEvents.SetIsOpacity, { isOpacity })
		},
		clearList(state) {
			state.list = []
		},
	},
})

export const devConsoleReducer = devConsoleSlice.reducer
export const devConsoleActions = devConsoleSlice.actions
