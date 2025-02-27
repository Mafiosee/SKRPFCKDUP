import { Grids } from '../inventory/inventoryType'

export enum SmelterEvents {
	Close = 'smelter:close',
	Move = 'smelter:move',
	Start = 'smelter:start',
	Cancel = 'smelter:cancel',
}

export type SmelterPayloads = {
	[SmelterEvents.Close]: unknown
	[SmelterEvents.Move]: {
		gridId: Grids
		itemId: any
	}
	[SmelterEvents.Start]: unknown
	[SmelterEvents.Cancel]: unknown
}