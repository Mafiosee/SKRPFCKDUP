import { Size } from '../inventoryType'
import { ItemHashes } from '../ItemHashes'
import { ItemActionConfig, ItemActionType, ItemInfo, ItemType, Quality } from '../itemType'
import { ItemConfig, ItemConfigOption } from './ItemConfig'

type FoodItemConfigOptions = {
	id: ItemHashes
	size: Size
	type: ItemType
	image: string
	eatValue: number
	weight: number
	itemId: string
	info: ItemInfo
	option?: ItemConfigOption
}

type FoodItemInfoOptions = {
	quality: Quality
	name: string
	eatValue: number
	weight: number
	description: string
}

export class FoodItemConfig extends ItemConfig {
	private readonly eatValue: number

	constructor(foodItemConfigOptions: FoodItemConfigOptions) {
		super(
			foodItemConfigOptions.id,
			foodItemConfigOptions.size,
			foodItemConfigOptions.type,
			foodItemConfigOptions.image,
			foodItemConfigOptions.weight,
			foodItemConfigOptions.info,
			foodItemConfigOptions.option,
			foodItemConfigOptions.itemId,
		)
		this.eatValue = foodItemConfigOptions.eatValue
	}

	public getData(): number {
		return this.eatValue
	}

	public static getInfo(infoOptions: FoodItemInfoOptions): ItemInfo {
		return {
			quality: infoOptions.quality,
			name: infoOptions.name,
			parameters: [
				{ title: 'Восполняет', value: `${infoOptions.eatValue} ед. еды` },
				{ title: 'Вес', value: `${infoOptions.weight} кг.` },
			],
			description: infoOptions.description,
			actions: [ItemActionConfig[ItemActionType.EAT], ItemActionConfig[ItemActionType.SPLIT], ItemActionConfig[ItemActionType.DROP]],
		}
	}
}
