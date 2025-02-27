import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { InterfacesId } from '../../utils/interfacesId'
import { NotificationsActionSend } from '../../shared/Notification/events'

type NotificationsState = {
	iterator: number
	list: Notification[]
	rendered: number[]
}

const initialState: NotificationsState = {
	iterator: 0,
	list: [],
	rendered: [],
}

export const notificationsSlice = createSlice({
	name: 'notifications',
	initialState,
	reducers: {
		send(state, action: PayloadAction<NotificationsActionSend>) {
			const { position, type, text, template, params, duration, interfaceId } = action.payload

			if (state.list.some(notify => notify.text === text)) {
				return
			}

			const id = state.iterator++
			state.list.push({ position, id, type, text, template, params, duration, interfaceId })
			state.rendered.push(id)
			setTimeout(() => {
				// @ts-expect-error qwe
				window.removeNotify(id)
			}, duration * 1000)
		},
		removeFromRendered(state, action: PayloadAction<{ value: number }>) {
			const id = action.payload.value
			const index = state.rendered.indexOf(id)
			if (!~index) {
				return
			}
			state.rendered.splice(index, 1)
		},
		removeFromList(state, action: PayloadAction<{ value: number }>) {
			const id = action.payload.value
			const index = state.list.findIndex(notify => notify.id === id)
			if (!~index) {
				return
			}
			state.list.splice(index, 1)
		},
		removeFromInterface(state, action: PayloadAction<InterfacesId>) {
			const targetId = action.payload
			state.list.forEach(({ id, interfaceId }) => {
				// @ts-expect-error qwe
				if (targetId === interfaceId) {
					window.removeNotify(id)
				}
			})
		},
	},
})

export const notificationsReducer = notificationsSlice.reducer
export const notificationsActions = notificationsSlice.actions