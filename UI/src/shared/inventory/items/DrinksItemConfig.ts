import { Size } from '../inventoryType'
import { ItemHashes } from '../ItemHashes'
import { ItemActionConfig, ItemActionType, ItemInfo, ItemType, Quality } from '../itemType'
import { ItemConfig, ItemConfigOption } from './ItemConfig'

type DrinksItemConfigOptions = {
	id: ItemHashes
	size: Size
	type: ItemType
	image: string
	thirstValue: number
	weight: number
	itemId: string
	info: ItemInfo
	option?: ItemConfigOption
}

type DrinksItemInfoOptions = {
	quality: Quality
	name: string
	thirstValue: number
	weight: number
	description: string
}

export class DrinksItemConfig extends ItemConfig {
	private readonly thirstValue: number

	constructor(drinksItemConfigOptions: DrinksItemConfigOptions) {
		super(
			drinksItemConfigOptions.id,
			drinksItemConfigOptions.size,
			drinksItemConfigOptions.type,
			drinksItemConfigOptions.image,
			drinksItemConfigOptions.weight,
			drinksItemConfigOptions.info,
			drinksItemConfigOptions.option,
			drinksItemConfigOptions.itemId,
		)
		this.thirstValue = drinksItemConfigOptions.thirstValue
	}

	public getData(): number {
		return this.thirstValue
	}

	public static getInfo(infoOptions: DrinksItemInfoOptions): ItemInfo {
		return {
			quality: infoOptions.quality,
			name: infoOptions.name,
			parameters: [
				{ title: 'Восполняет', value: `${infoOptions.thirstValue} ед. жажды` },
				{ title: 'Вес', value: `${infoOptions.weight} кг.` },
			],
			description: infoOptions.description,
			actions: [ItemActionConfig[ItemActionType.DRINK], ItemActionConfig[ItemActionType.SPLIT], ItemActionConfig[ItemActionType.DROP]],
		}
	}
}
