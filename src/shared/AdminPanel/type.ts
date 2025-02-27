import { ReportReason, UserMessageType } from '../Tickets/type'
import { SendReportPayload } from '../Tickets/events'

export type AdminInfoType = {
	name: string
	uid: string
	lvl: number
}

export enum AdminPanelSections {
	Tickets = 'Tickets',
	Commands = 'Commands',
	Settings = 'Settings',
	LeadersFactions = 'LeadersFactions',
	MyStat = 'MyStat',
	AdminsStat = 'AdminsStat',
	PunishedPlayers = 'PunishedPlayers',
}

export type APanelSection = {
	id: AdminPanelSections
	name: string
	hasNotify?: boolean
}

export type AdminCommandInfo = {
	command: string
	description: string
}

export type AdminLvlInfo = {
	lvl: number
	commands: AdminCommandInfo[]
}

export enum AdminPanelSettingsTypes {
	Button,
	Switch,
	Key,
}

export type SettingsInfoContentType = boolean | string | number | null

export type SettingInfo = {
	id: any
	type: AdminPanelSettingsTypes
	text: string
	content: SettingsInfoContentType
}

export type ProblemType = {
	header: string
	description: string
	proofs: string[]
}

export type BugType = {
	id: number
	date: string
	isRead: boolean
	playerName: string
	playerUID: string
	problem: ProblemType
}

export enum PunishedTypes {
	banned,
	muted,
	demorgan,
}

export type PunishedPlayerType = {
	id: number
	type: PunishedTypes
	date: string
	playerName: string
	playerUID: string
	adminName: string
	adminUID: string
	endPunished: string
	reason: string
}

/** report */

export type ReportCategories = ReportReason[]

export type UserInfo = {
	name: string
	uid: string
	id?: number
}

export enum FactionLeadersColor {
	SignalBlue = '#183854',
	Red = '#5E0D0D',
	Grey = '#777478',
	Brawn = '#A05117',
	GreyGreen = '#485E2C',
	Sand = '#918764',
}

export type FactionLeaders = {
	leaderName: string
	factionName: string
	lastOnline?: string
	color: FactionLeadersColor
}

export type MyStatDayType = {
	date: string
	time: number
	tickets: number
	reports: number
	demorgans: number
	mutes: number
	warns: number
	bans: number
}

export type TicketType = {
	id: any
	isPrivate?: boolean
	isClosed?: boolean
	type: ReportReason
	senderInfo: UserInfo
	datetime: string
	amountNotification: number
}

export type TicketMessage = UserMessageType | string

export enum ButtonTypes {
	TeleportToPlayer = 'TeleportToPlayer',
	TeleportPlayer = 'TeleportPlayer',
	Spectre = 'Spectre',
	TicketHistory = 'TicketHistory',
	Leave = 'Leave',
	Close = 'Close',
}

export enum SenderStatus {
	Player,
	Admin,
}

export type TicketContentType = {
	id: number
	senderLastOnline?: string
	isPrivate?: boolean
	isClosed?: boolean
	type: ReportReason
	playerInfo: UserInfo
	suspectInfo?: UserInfo
	messages: TicketMessage[]
	ticketInfo: Omit<SendReportPayload, 'type'> & Omit<UserMessageType, 'message'>
}

export type FastAnswerType = {
	id: number
	name: string
	value: string
}

export type AdminInfo = {
	name: string
	uid: string | null
	lvl?: number
}
