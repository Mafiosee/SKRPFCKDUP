import { InputDeviceType } from '../../shared/binder/InputDeviceType'
import { ReportReason } from '../../shared/Tickets/type'

export enum EscMenuEvents {
	RequestMap = 'escMenu:requestMap',
	RequestExit = 'escMenu:requestExit',
	UpdateSettingValue = 'escMenu:updateSettingValue',
	SendReport = 'escMenu:sendReport',
	RequestClose = 'escMenu:requestClose',

	CreateTicket = 'escMenu:createTicket',
	SetCurrentTicket = 'escMenu:setCurrentTicket',
	AddTicketMessage = 'escMenu:addTicketMessage',
}

export type UpdateSettingValuePayload = {
	settingId: any
	newValue: any
	device?: InputDeviceType
}

// export type SendReportPayload = ReportTicketData

/** *** Report Payloads *** */

/** Информация о создоваемом тикете */
export type SendReportPayload = {
	type: ReportReason
	title?: string | null
	description?: string | null
	proofs?: string[] | null
}

/** Номер тикета, на который нажали */
export type SetCurrentTicketPayload = {
	id: any
}

/** Отправить сообщение */
export type AddTicketMessagePayload = {
	ticketId: any
	value: string
}
