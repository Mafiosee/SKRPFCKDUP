import { SenderStatus } from '../AdminPanel/type'
import { AdminColors } from './config'
import { SendReportPayload } from './events'

export enum ReportTicketCondition {
	InProcess = 'InProcess',
	Completed = 'Completed',
}

export enum ReportStatus {
	Closed = 'Closed',
	InProcess = 'InProcess',
}

export type ReportTicket = {
	id: any
	type: ReportReason
	datetime: string
	reportStatus: ReportStatus
	title: string
	adminName: string | null
	adminColor: AdminColors
	amountNotifications: number
}

export enum ReportReason {
	reportPlayer = 'reportPlayer',
	reportAdmin = 'reportAdmin',
	help = 'help',
	question = 'question',
	bag = 'bag',
}

export type ReportRulesType = {
	id: any
	type: ReportReason
	title: string
	text: string[]
}

export type ReportTicketData = {
	reason: ReportReason | null
	playerId: string
	description: string
}

export type UserMessageType = {
	date: string
	senderName: string
	message: string
	senderStatus: SenderStatus
	senderColor?: AdminColors
}

export type MessageType = UserMessageType | string

export type UserInfoType = {
	name: string
	color: string
}

export type CurrentTicketType = {
	id: number
	status: ReportStatus
	ticketInfo: Omit<SendReportPayload, 'type'> & Omit<UserMessageType, 'message'>
	adminInfo: UserInfoType | null
	messages: MessageType[]
}

export type TicketMessageType = Pick<UserMessageType, 'message'> &
	Pick<UserMessageType, 'senderName'> &
	Pick<UserMessageType, 'senderStatus'> & {
		date: Date
		isRead: boolean
		isSystemMessage?: boolean
	}
