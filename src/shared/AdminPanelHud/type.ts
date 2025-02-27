import { FactionLeadersColor } from '../AdminPanel/type'

export type NotificationsType = {
	name: string
	value: number
	id: any
}

export type PlayerInfoType = {
	playerName: string
	playerID: number
	playerUID: string
}

export type PointInfoType = {
	id: any
	name: string
}

export type PointsInfoType = {
	name: string
	points: PointInfoType[]
}

export type TimeUnitType = {
	name: string
	value: number
}

export type TimeType = {
	timeUnits: TimeUnitType[]
	fastTime: number[]
}

export type InputPercentType = {
	name: string
	fastPercent: number[]
}

export type OtherPointsType = {
	id: any
	name: string
}

export type ButtonType = {
	id: any
	name: string
	description: string
	actionName?: string
	time?: TimeType
	inputPercent?: InputPercentType
	pointsInfo?: PointsInfoType
	otherPoints?: OtherPointsType[]
	skipConfirm?: boolean
}

/** Moving Elements Types */

export type PositionType = {
	x: number
	y: number
}

export enum MovingElementTypes {
	ClanWar,
}

export type ClanWarType = {
	time: string
	firstName: string // полное название фракции, пример: Клан Воронов
	firstScore: number
	firstColor: FactionLeadersColor
	secondName: string // полное название фракции, пример: Клан Воронов
	secondScore: number
	secondColor: FactionLeadersColor
}

export type ClanWType = {
	time: string
}

export type MovingElementContentType = {
	[MovingElementTypes.ClanWar]: ClanWarType
}

export type MovingElementBase = {
	id: any
	positions: PositionType
}

export type MovingElementClanWar = MovingElementBase & {
	type: MovingElementTypes.ClanWar
	content: ClanWarType
}

export type MovingElement = MovingElementClanWar

export enum AdminPanelHudActiveModes {
	Spectre = 'specter',
	Edit = 'edit',
}

export type ActiveMode = AdminPanelHudActiveModes | null
