import { LotType } from './LotType'

export enum AuctionEvents {
	CloseRequest = 'auction:closeRequest',
	PointRequest = 'auction:pointRequest',
	CreateBet = 'auction:createBet',
	CreateLot = 'auction:createLot',
}

export type AuctionPayloads = {
	[AuctionEvents.CloseRequest]: undefined
	[AuctionEvents.PointRequest]: {
		lotId: number
	}
	[AuctionEvents.CreateBet]: {
		lotId: number,
		sum: number
	}
	[AuctionEvents.CreateLot]: {
		lotType: LotType
		name: string
		sum: number
		hours: number
		propertyId: any
	}
};
