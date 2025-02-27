import { Coordinates } from '../Map/Coordinates'

export enum WorldMapEvents {
	CloseRequest = 'worldMap:closeRequest',
	SetMarker = 'worldMap:setMarker',
}

export type WorldMapPayloads = {
	[WorldMapEvents.CloseRequest]: undefined
	[WorldMapEvents.SetMarker]: Coordinates | null
}
