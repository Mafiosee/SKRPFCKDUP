import { Size } from '../inventoryType'
import { ItemHashes } from '../ItemHashes'
import { ItemActionConfig, ItemActionType, ItemInfo, ItemType, Quality } from '../itemType'
import { ItemConfig, ItemConfigOption } from './ItemConfig'

type ShovelItemConfigOptions = {
	id: ItemHashes
	size: Size
	type: ItemType
	image: string
	weight: number
	itemId: string
	info: ItemInfo
	option?: ItemConfigOption
}

type ShoveInfoOptions = {
	quality: Quality
	name: string
	weight: number
	description: string
}

export class ShovelItemConfig extends ItemConfig {
	constructor(shovelItemConfigOptions: ShovelItemConfigOptions) {
		super(
			shovelItemConfigOptions.id,
			shovelItemConfigOptions.size,
			shovelItemConfigOptions.type,
			shovelItemConfigOptions.image,
			shovelItemConfigOptions.weight,
			shovelItemConfigOptions.info,
			shovelItemConfigOptions.option,
			shovelItemConfigOptions.itemId,
		)
	}

	public getData(): null {
		return null
	}

	public static getInfo(infoOptions: ShoveInfoOptions): ItemInfo {
		return {
			quality: infoOptions.quality,
			name: infoOptions.name,
			parameters: [{ title: 'Вес', value: `${infoOptions.weight} кг.` }],
			description: infoOptions.description,
			actions: [ItemActionConfig[ItemActionType.USE_SHOVEL], ItemActionConfig[ItemActionType.SPLIT], ItemActionConfig[ItemActionType.DROP]],
		}
	}
}
