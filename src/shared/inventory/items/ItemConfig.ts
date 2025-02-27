import { ItemHashes } from '../ItemHashes'
import { Size } from '../inventoryType'
import { Cords, ItemAction, ItemDto, ItemInfo, ItemType, NearbyItemDto, Wearable } from '../itemType'

export type ItemConfigOption = {
	maxStack?: number
	wearable?: Wearable
}

export class ItemConfig {
	constructor(
		private readonly _id: ItemHashes,
		private readonly _size: Size,
		private readonly _type: ItemType,
		private readonly _image: string,
		private readonly _weight: number,
		private readonly _info: ItemInfo,
		private readonly _option?: ItemConfigOption,
		private readonly _itemId?: string,
	) {}

	public get id() {
		return this._id
	}

	public get size() {
		return this._size
	}

	public get type() {
		return this._type
	}

	public get itemId() {
		return this._itemId
	}

	public get weight() {
		return this._weight
	}

	public get info() {
		return this._info
	}

	public get image() {
		return this._image
	}

	public get option() {
		if (!this._option) {
			return { maxStack: 1 }
		} else {
			if (this._option.maxStack == null) {
				return {
					...this._option,
					maxStack: 1,
				}
			}
			return this._option
		}
	}

	public getAction(): ItemAction[] | undefined {
		return this.info.actions
	}

	public getData(): any | null {
		return null
	}

	public getDropDTO(id: string, amount: number): NearbyItemDto {
		return {
			id: id,
			size: this.size,
			image: this.image,
			amount: amount,
			type: this.type,
			weight: this.weight,
			info: this.info,
			wearable: this.option?.wearable,
			itemHash: this.id,
		}
	}

	public getDTO(id: any, position: Cords, isTurned: boolean, amount: number): ItemDto {
		return {
			id: id,
			size: this.size,
			position: position,
			image: this.image,
			isTurned: isTurned,
			amount: amount,
			type: this.type,
			weight: this.weight,
			info: this.info,
			wearable: this.option?.wearable,
			itemHash: this.id,
		}
	}
}
