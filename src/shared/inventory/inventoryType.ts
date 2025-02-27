import type { ItemDto } from './itemType'

export type Size = {
	width: number
	height: number
}

export enum Grids {
	Inventory,
	Backpack,
	Container,
	Equipment,
	TradeGive,
	TradeReceive,
	Trade,
	Craft,
	SkinsInventory,
	Skins,
	Search,
	Nearby,
}

export type GridType = {
	title?: string
	size: Size
	maxWeight?: number
	items: ItemDto[]
}
