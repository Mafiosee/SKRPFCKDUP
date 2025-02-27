import { PageType } from '../PageType'

export enum LogType {
	Take,
	Put,
	Tax,
}

export type BankLog = {
	datetime: string
	action: string
	type: LogType
}

export type PageBank = {
	type: PageType.Bank
	name: string
	balance: number
	isWarehouseOpen: boolean
	logs: BankLog[]
}