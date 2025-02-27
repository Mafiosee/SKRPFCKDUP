import { ItemHashes } from '../ItemHashes'
import { Size } from '../inventoryType'
import { ItemType, ItemInfo, Quality, ItemActionConfig, ItemActionType } from '../itemType'
import { ItemConfig, ItemConfigOption } from './ItemConfig'

type CommonItemConfigOptions = {
	id: ItemHashes
	size: Size
	type: ItemType
	image: string
	weight: number
	itemId: string
	info: ItemInfo
	option?: ItemConfigOption
}

type CommonItemInfoOptions = {
	quality: Quality
	name: string
	weight: number
	description: string
}

export class CommonItemConfig extends ItemConfig {
	constructor(commonItemConfigOptions: CommonItemConfigOptions) {
		super(
			commonItemConfigOptions.id,
			commonItemConfigOptions.size,
			commonItemConfigOptions.type,
			commonItemConfigOptions.image,
			commonItemConfigOptions.weight,
			commonItemConfigOptions.info,
			commonItemConfigOptions.option,
			commonItemConfigOptions.itemId,
		)
	}

	public getData(): null {
		return null
	}

	public static getInfo(infoOptions: CommonItemInfoOptions): ItemInfo {
		return {
			quality: infoOptions.quality,
			name: infoOptions.name,
			parameters: [{ title: 'Вес', value: `${infoOptions.weight} кг.` }],
			description: infoOptions.description,
			actions: [ItemActionConfig[ItemActionType.SPLIT], ItemActionConfig[ItemActionType.DROP]],
		}
	}
}
