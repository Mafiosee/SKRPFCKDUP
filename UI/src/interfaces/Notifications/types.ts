import { InterfacesId } from '../../utils/interfacesId'

export enum NotificationTypes {
	Info = 'Info',
	Error = 'Error',
	Warning = 'Warning',
	Success = 'Success',
}

export enum NotificationPositions {
	Auth = 'Auth',
	Bottom = 'Bottom',
}

export type Notification = {
	position: NotificationPositions
	id: number
	interfaceId?: InterfacesId | null
	type: NotificationTypes
	text?: string
	template?: string
	duration: number
}

export interface NotificationsActionSend {
	position: NotificationPositions
	interfaceId?: InterfacesId | null
	type: NotificationTypes
	text: string
	duration: number
}
