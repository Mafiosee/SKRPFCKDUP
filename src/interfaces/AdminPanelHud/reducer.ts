import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import {
	ActiveMode,
	AdminPanelHudActiveModes,
	ButtonType,
	MovingElement,
	MovingElementTypes,
	NotificationsType,
	PlayerInfoType,
} from '../../shared/AdminPanelHud/type'
import { FactionLeadersColor } from '../../shared/AdminPanel/type'
import { callClient } from '../../utils/api'

type AdminPanelHud = {
	isOpen: boolean
	activeMode: ActiveMode
	playerInfo: PlayerInfoType
	notifications: NotificationsType[]
	buttons: ButtonType[]
	movingElements: MovingElement[]
}

const initialState: AdminPanelHud = {
	isOpen: false,
	activeMode: AdminPanelHudActiveModes.Spectre,
	playerInfo: {
		playerName: 'Эльдис Ловящий-Лучи',
		playerID: 1,
		playerUID: '80',
	},
	notifications: [
		// {
		// 	id: 1,
		// 	name: 'Репорты',
		// 	value: 999,
		// },
		// {
		// 	id: 2,
		// 	name: 'Баги',
		// 	value: 99,
		// },
	],
	buttons: [
		// {
		// 	id: 0,
		// 	name: 'ban',
		// 	description: 'забанить игрока',
		// 	time: {
		// 		fastTime: [1, 3, 7, 30, 60, 180, 90, 20],
		// 		timeUnits: [
		// 			{
		// 				name: 'мин',
		// 				value: 60,
		// 			},
		// 			{
		// 				name: 'час',
		// 				value: 3600,
		// 			},
		// 			{
		// 				name: 'день',
		// 				value: 216000,
		// 			},
		// 		],
		// 	},
		// 	pointsInfo: {
		// 		name: 'Тип блокировки',
		// 		points: [
		// 			{
		// 				name: 'По логину',
		// 				id: 2,
		// 			},
		// 			{
		// 				name: 'По серийному номеру',
		// 				id: 3,
		// 			},
		// 		],
		// 	},
		// 	otherPoints: [
		// 		{
		// 			id: 2,
		// 			name: 'Выдать скрытно',
		// 		},
		// 	],
		// },
		// {
		// 	id: 1,
		// 	name: 'kick',
		// 	description: 'Кикнуть игрока',
		// },
		// {
		// 	id: 2,
		// 	name: 'hp',
		// 	description: 'Изменить количество HP',
		// 	inputPercent: {
		// 		name: 'Введите уровень здоровья [0-100]',
		// 		fastPercent: [100, 25, 50],
		// 	},
		// },
		// {
		// 	id: 3,
		// 	name: 'slap',
		// 	description: 'Пнуть игрока',
		// },
		// {
		// 	id: 4,
		// 	name: 'spawn',
		// 	description: 'Заспавнить',
		// },
		// {
		// 	id: 5,
		// 	name: 'mute',
		// 	description: 'Заспавнить',
		// 	time: {
		// 		fastTime: [1, 3, 7, 15, 30],
		// 		timeUnits: [
		// 			{
		// 				name: 'мин',
		// 				value: 60,
		// 			},
		// 			{
		// 				name: 'час',
		// 				value: 3600,
		// 			},
		// 			{
		// 				name: 'день',
		// 				value: 216000,
		// 			},
		// 		],
		// 	},
		// },
		// {
		// 	id: 6,
		// 	name: 'demorgan',
		// 	description: 'Посадить',
		// 	time: {
		// 		fastTime: [1, 3, 7, 15, 30],
		// 		timeUnits: [
		// 			{
		// 				name: 'мин',
		// 				value: 60,
		// 			},
		// 			{
		// 				name: 'час',
		// 				value: 3600,
		// 			},
		// 			{
		// 				name: 'день',
		// 				value: 216000,
		// 			},
		// 		],
		// 	},
		// 	pointsInfo: {
		// 		name: 'Место',
		// 		points: [
		// 			{
		// 				name: 'Тюрьма #1',
		// 				id: 0,
		// 			},
		// 			{
		// 				name: 'Тюрьма #2',
		// 				id: 1,
		// 			},
		// 		],
		// 	},
		// },
		// {
		// 	id: 7,
		// 	name: 'reoff',
		// 	description: 'Переподключить',
		// 	pointsInfo: {
		// 		name: 'Через сколько:',
		// 		points: [
		// 			{
		// 				name: 'Сейчас',
		// 				id: 0,
		// 			},
		// 			{
		// 				name: 'Через час',
		// 				id: 1,
		// 			},
		// 		],
		// 	},
		// 	otherPoints: [
		// 		{
		// 			name: 'Сделать тихо',
		// 			id: 0,
		// 		},
		// 	],
		// },
	],
	movingElements: [
		// {
		// 	id: 0,
		// 	type: MovingElementTypes.ClanWar,
		// 	positions: {
		// 		x: 0,
		// 		y: 0,
		// 	},
		// 	content: {
		// 		time: '12:35',
		// 		firstName: 'Клан Воронов',
		// 		firstScore: 10,
		// 		firstColor: FactionLeadersColor.Sand,
		// 		secondName: 'Клан Гигантов',
		// 		secondScore: 23,
		// 		secondColor: FactionLeadersColor.SignalBlue,
		// 	},
		// },
		// {
		// 	id: 1,
		// 	type: MovingElementTypes.ClanWar,
		// 	positions: {
		// 		x: 15,
		// 		y: 15,
		// 	},
		// 	content: {
		// 		time: '12:38',
		// 		firstName: 'Клан Воронов',
		// 		firstScore: 25,
		// 		firstColor: FactionLeadersColor.Brawn,
		// 		secondName: 'Клан Гигантов',
		// 		secondScore: 34,
		// 		secondColor: FactionLeadersColor.GreyGreen,
		// 	},
		// },
	],
}

export const adminPanelHudSlice = createSlice({
	name: 'adminPanelHud',
	initialState,
	reducers: {
		show(state) {
			state.isOpen = true
		},
		hide(state) {
			state.isOpen = false
		},
		/** Обновить всю информаицю кнопок */
		setButtons(state, action: PayloadAction<ButtonType[]>) {
			state.buttons = action.payload
		},
		/** Обновить всю информацию уведомлений */
		setNotifications(state, action: PayloadAction<NotificationsType[]>) {
			state.notifications = action.payload
		},
		/** Информация о игроке за которым следят */
		setPlayerData(state, action: PayloadAction<PlayerInfoType>) {
			// callClient('logger', JSON.stringify(action.payload))
			state.playerInfo = action.payload
		},
		/** Обновить состояние количества уведомлений по id*/
		updateNotification(state, action: PayloadAction<NotificationsType>) {
			const { id } = action.payload
			const findIndex = state.notifications.findIndex(notify => notify.id === id)

			if (findIndex === -1) {
				return
			}

			state.notifications[findIndex] = action.payload
		},
		setActiveMode(state, action: PayloadAction<AdminPanelHudActiveModes>) {
			state.activeMode = action.payload
		},
	},
})

export const adminPanelHudReducer = adminPanelHudSlice.reducer
export const adminPanelHudActions = adminPanelHudSlice.actions
