export enum BizControlEvents {
	Close = 'bizControl:close',
	Withdraw = 'bizControl:withdraw',
	PayRent = 'bizControl:payRent',
	StaffKick = 'bizControl:staffKick',
	StaffRankUp = 'bizControl:staffRankUp',
}

export type StaffKickPayload = {
	staffId: any
}

export type StaffRankUpPayload = {
	staffId: any
}
