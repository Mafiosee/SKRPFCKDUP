import { Size } from '../inventoryType'
import { ItemHashes } from '../ItemHashes'
import { ItemActionConfig, ItemActionType, ItemInfo, ItemType, Quality } from '../itemType'
import { ItemConfig, ItemConfigOption } from './ItemConfig'

type RodItemConfigOptions = {
	id: ItemHashes
	size: Size
	type: ItemType
	image: string
	weight: number
	itemId: string
	info: ItemInfo
	option?: ItemConfigOption
}

type RodInfoOptions = {
	quality: Quality
	name: string
	weight: number
	description: string
}

export class RodItemConfig extends ItemConfig {
	constructor(rodItemConfigOptions: RodItemConfigOptions) {
		super(
			rodItemConfigOptions.id,
			rodItemConfigOptions.size,
			rodItemConfigOptions.type,
			rodItemConfigOptions.image,
			rodItemConfigOptions.weight,
			rodItemConfigOptions.info,
			rodItemConfigOptions.option,
			rodItemConfigOptions.itemId,
		)
	}

	public getData(): null {
		return null
	}

	public static getInfo(infoOptions: RodInfoOptions): ItemInfo {
		return {
			quality: infoOptions.quality,
			name: infoOptions.name,
			parameters: [{ title: 'Вес', value: `${infoOptions.weight} кг.` }],
			description: infoOptions.description,
			actions: [ItemActionConfig[ItemActionType.USE_ROD], ItemActionConfig[ItemActionType.SPLIT], ItemActionConfig[ItemActionType.DROP]],
		}
	}
}
