import { MapCellOrWorld } from './MapCellOrWorld'
import { MapType } from './MapType'

export const MapTypeByWorldOrCell: Record<MapCellOrWorld, MapType> = {
	[MapCellOrWorld.GlobalCellOrlWorld]: MapType.Global,
}