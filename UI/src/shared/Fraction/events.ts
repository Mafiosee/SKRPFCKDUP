import { StaffActions } from './StaffActions'

export enum FractionEvents {
	//CEF_EVENTS
	Close = 'fraction:close',
	AddNews = 'fraction:addNews',
	RemoveNews = 'fraction:removeNews',
	StaffAction = 'fraction:staffAction',
	RankAdd = 'fraction:rankAdd',
	RankUpdate = 'fraction:rankUpdate',
	RankRemove = 'fraction:rankRemove',
	ContractStart = 'fraction:contractStart',
	ContractFinish = 'fraction:contractFinish',
	SetWarehouseIsOpen = 'fraction:setWarehouseIsOpen',
	AdClick = 'fraction:adClick',
	StartCapt = 'fraction:startCapt',
	RemoveWanted = 'fraction:removeWanted',
	ReleaseEarly = 'fraction:releaseEarly',
	//SERVER_EVENTS
	LoadPlayerAsMember = 'fraction:loadPlayerAsMember',
	UnloadPlayerAsMember = 'fraction:UnloadPlayerAsMember',
	PlayerHired = 'fraction:PlayerHired',
	PlayerFiredOnline = 'fraction:PlayerFiredOnline',
	PlayerFiredOffline = 'fraction:PlayerFiredOffline',
}

export type FractionRemoveNewsPayload = {
	newsId: any
}

export type FractionStaffActionPayload = {
	actionId: StaffActions
	staffId: any
}

export type FractionRankUpdatePayload = {
	rankId: any
}

export type FractionRankRemovePayload = {
	rankId: any
}

export type FractionContractActionPayload = {
	contractId: any
}

export type FractionSetWarehouseIsOpenPayload = {
	isOpen: boolean
}

export type FractionAdActionPayload = {
	adId: any
}

export type FractionStartCapt = {
	zoneId: any
}

export type FractionRemoveWanted = {
	peopleId: any
}

export type FractionReleaseEarly = {
	peopleId: any
}
