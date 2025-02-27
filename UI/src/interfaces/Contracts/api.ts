export enum ContractsEvents {
	Close = 'contracts:close',
	Select = 'contracts:select',
}

export type SelectPayload = {
	contractId: any
}
