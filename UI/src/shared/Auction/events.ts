import { LotType } from './LotType'
import { LotId } from './LotId'

export enum AuctionEvents {
	CloseRequest = 'auction:closeRequest',
	PointRequest = 'auction:pointRequest',
	CreateBet = 'auction:createBet',
	CreateLot = 'auction:createLot',
	ToggleFavoriteLot = 'auction:toggleFavoriteLot',
}

export type AuctionPayloads = {
	[AuctionEvents.CloseRequest]: undefined
	[AuctionEvents.PointRequest]: {
		lotId: LotId
	}
	[AuctionEvents.CreateBet]: {
		lotId: LotId
		sum: number
	}
	[AuctionEvents.CreateLot]: {
		lotType: LotType
		sum: number
		hours: number
		propertyId: any
	}
	[AuctionEvents.ToggleFavoriteLot]: {
		lotId: LotId
	}
}
