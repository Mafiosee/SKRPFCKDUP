import { Size } from '../inventoryType'
import { ItemHashes } from '../ItemHashes'
import { ArmorItemType, Cords, ItemActionConfig, ItemActionType, ItemDto, ItemInfo, ItemType, Quality } from '../itemType'
import { ItemConfig, ItemConfigOption } from './ItemConfig'

type ClothesItemConfigOptions = {
	id: ItemHashes
	size: Size
	type: ItemType
	itemId: string
	image: string
	weight: number
	info: ItemInfo
	option?: ItemConfigOption
}

type ClothesInfoOptions = {
	quality: Quality
	name: string
	weight: number
	type: ArmorItemType
	description: string
}

export class ClothesItemConfig extends ItemConfig {
	constructor(armorItemConfigOption: ClothesItemConfigOptions) {
		super(
			armorItemConfigOption.id,
			armorItemConfigOption.size,
			armorItemConfigOption.type,
			armorItemConfigOption.image,
			armorItemConfigOption.weight,
			armorItemConfigOption.info,
			armorItemConfigOption.option,
			armorItemConfigOption.itemId,
		)
	}

	public getData(): null {
		return null
	}

	public getDTO(id: number, position: Cords, isTurned: boolean, amount: number): ItemDto {
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
		}
	}

	public static getInfo(infoOption: ClothesInfoOptions): ItemInfo {
		return {
			quality: infoOption.quality,
			name: infoOption.name,
			parameters: [
				{ title: 'Одежда', value: infoOption.type },
				{ title: 'Вес', value: `${infoOption.weight}кг.` },
			],
			description: infoOption.description,
			actions: [ItemActionConfig[ItemActionType.PUT_ON], ItemActionConfig[ItemActionType.SPLIT], ItemActionConfig[ItemActionType.DROP]],
		}
	}
}
