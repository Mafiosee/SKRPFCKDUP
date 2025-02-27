import { NavId } from './types'
import { EscMenuEvents } from './api'
import { SettingsTabId } from '../../shared/settings/SettingsTabId'
import { Quality } from '../../shared/inventory/itemType'
import { ReportTicketCondition } from '../../shared/Tickets/type'

export const NavData = {
	[NavId.Map]: {
		title: 'Карта',
		isButton: true,
		event: EscMenuEvents.RequestMap,
	},
	[NavId.DonateStore]: {
		title: 'Магазин',
		isButton: false,
		event: '',
	},
	[NavId.Help]: { title: 'Помощь', isButton: false, event: '' },
	[NavId.Promo]: { title: 'Промокод', isButton: false, event: '' },
	[NavId.Report]: { title: 'Техническая поддержка', isButton: false, event: '' },
	[NavId.Settings]: { title: 'Настройки', isButton: false, event: '' },
	[NavId.Exit]: {
		title: 'Покинуть игру',
		isButton: true,
		event: EscMenuEvents.RequestExit,
	},
}

export const SettingsTabData = {
	[SettingsTabId.Sound]: { title: 'Звук' },
	[SettingsTabId.Keyboard]: { title: 'Клавиатура' },
	[SettingsTabId.Graphics]: { title: 'Графика' },
	[SettingsTabId.Account]: { title: 'Аккаунт' },
	[SettingsTabId.GameProcess]: { title: 'Игровой процесс' },
	[SettingsTabId.Chat]: { title: 'Чат' },
}

export const ReportTicketConditionData = {
	[ReportTicketCondition.InProcess]: {
		color: '#C9C32D',
		title: 'В обработке',
		iconUrl: require('./assets/images/condition-process.svg'),
	},
	[ReportTicketCondition.Completed]: {
		color: '#42A23A',
		title: 'Завершено',
		iconUrl: require('./assets/images/condition-check.svg'),
	},
}

export const QualityGiftColor: Record<Quality, string> = {
	[Quality.Unusual]: '#4E4E4E',
	[Quality.Normal]: '#2DA439',
	[Quality.Rare]: '#385773',
	[Quality.Epic]: '#9D46D2',
	[Quality.Legendary]: '#9E8A24',
}
