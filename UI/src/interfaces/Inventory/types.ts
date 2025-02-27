import { Grids, GridType, Size } from '../../shared/inventory/inventoryType'
import {
	Cords,
	CraftItemDto,
	EquipItemDto,
	ItemAction,
	ItemDto,
	ItemType,
	Quality,
} from '../../shared/inventory/itemType'
import { calcVhNum } from '../../utils/calcVh'
import { Position } from '../../shared/inventory/events'
import { FiltersType } from './components/BlockHeader'

export enum Sorts {
	None,
	Name,
	Amount,
	Quality,
}

export type DragInfo = {
	gridId: Grids | null;
	hoverGridId: Grids | null;
	itemId: any;
	item: ItemDto | EquipItemDto | CraftItemDto;
	from: Cords;
	isTurned: boolean;
	size: Size;
	offset: Cords;
	hoveredCell: Cords;
};
export const dragInfoDefault: DragInfo = {
	gridId: null,
	hoverGridId: null,
	itemId: null,
	item: null,
	from: { x: 0, y: 0 },
	isTurned: false,
	size: { width: 0, height: 0 },
	offset: { x: 0, y: 0 },
	hoveredCell: { x: -1, y: -1 },
}

export type HoverInfo = {
	itemId: any;
};
export const hoverInfoDefault: HoverInfo = {
	itemId: null,
}

export const noBackpackGrid: GridType = {
	size: {
		width: 7,
		height: 4,
	},
	items: [],
}
export const cellSize = 64
export const cellCurrentSize = Math.round(
	(window.screen.height / 100) * calcVhNum(cellSize),
)
export type ActionsList = {
	itemId: any;
	from: Position;
	actions: ItemAction[];
	position: Cords;
};

export type ControlsType = {
	sort: Sorts;
	isOpenSortsList: boolean;
	filters: FiltersType;
	isOpenFiltersList: boolean;
	search: string;
	isOpenSearch: boolean;
};
export const ControlsDefault: ControlsType = {
	sort: Sorts.None,
	isOpenSortsList: false,
	filters: {
		type: {
			[ItemType.Weapon]: false,
			[ItemType.Armor]: false,
			[ItemType.Potions]: false,
			[ItemType.Manuscripts]: false,
			[ItemType.Food]: false,
			[ItemType.Ingredients]: false,
			[ItemType.Resources]: false,
			[ItemType.Other]: false,
			[ItemType.Drinks]: false,
			[ItemType.Backpack]: false,
			[ItemType.Accessories]: false,
			[ItemType.Clothes]: false,
		},
		quality: {
			[Quality.Normal]: false,
			[Quality.Unusual]: false,
			[Quality.Rare]: false,
			[Quality.Epic]: false,
			[Quality.Legendary]: false,
		},
	},
	isOpenFiltersList: false,
	search: '',
	isOpenSearch: false,
}