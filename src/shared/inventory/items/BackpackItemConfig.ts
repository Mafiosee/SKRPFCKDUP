import { ItemHashes } from '../ItemHashes'
import { Size } from '../inventoryType'
import { ItemType, ItemInfo, Quality, ItemActionConfig, ItemActionType, CharSlots } from '../itemType'
import { ItemConfig, ItemConfigOption } from './ItemConfig'

type BackpackItemConfigOptions = {
	id: ItemHashes
	size: Size
	type: ItemType
	image: string
	weight: number
	itemId: string
	info: ItemInfo
	option?: ItemConfigOption
}

type BackpackInfoOptions = {
	quality: Quality
	name: string
	weight: number
	description: string
}
export class BackpackItemConfig extends ItemConfig {
	constructor(backpackItemConfigOptions: BackpackItemConfigOptions) {
		super(
			backpackItemConfigOptions.id,
			backpackItemConfigOptions.size,
			backpackItemConfigOptions.type,
			backpackItemConfigOptions.image,
			backpackItemConfigOptions.weight,
			backpackItemConfigOptions.info,
			{ maxStack: 1, wearable: { slot: [CharSlots.Backpack] } },
			backpackItemConfigOptions.itemId,
		)
	}

	public getData(): number {
		return 0
	}

	public static getInfo(infoOptions: BackpackInfoOptions): ItemInfo {
		return {
			quality: infoOptions.quality,
			name: infoOptions.name,
			parameters: [
				{ title: 'Вместимость', value: 'Средняя' },
				{ title: 'Вес', value: `${infoOptions.weight} кг.` },
			],
			description: infoOptions.description,
			actions: [ItemActionConfig[ItemActionType.PUT_ON], ItemActionConfig[ItemActionType.SPLIT], ItemActionConfig[ItemActionType.DROP]],
		}
	}
}
