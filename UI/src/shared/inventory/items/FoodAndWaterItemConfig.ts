import { Size } from '../inventoryType'
import { ItemHashes } from '../ItemHashes'
import { ItemActionConfig, ItemActionType, ItemInfo, ItemType, Quality } from '../itemType'
import { ItemConfig, ItemConfigOption } from './ItemConfig'

export type HungersThirstValue = { thirstValue: number; hungersValue: number }

type FoodAndWaterItemConfigOptions = {
	id: ItemHashes
	size: Size
	type: ItemType
	image: string
	value: HungersThirstValue
	weight: number
	info: ItemInfo
	itemId: string
	option?: ItemConfigOption
}

type FoodAndWaterInfoOptions = {
	quality: Quality
	name: string
	value: HungersThirstValue
	weight: number
	description: string
}

export class FoodAndWaterItemConfig extends ItemConfig {
	private readonly hungersThirstValue: HungersThirstValue

	constructor(foodAndWaterItemConfigOptions: FoodAndWaterItemConfigOptions) {
		super(
			foodAndWaterItemConfigOptions.id,
			foodAndWaterItemConfigOptions.size,
			foodAndWaterItemConfigOptions.type,
			foodAndWaterItemConfigOptions.image,
			foodAndWaterItemConfigOptions.weight,
			foodAndWaterItemConfigOptions.info,
			foodAndWaterItemConfigOptions.option,
			foodAndWaterItemConfigOptions.itemId,
		)
		this.hungersThirstValue = foodAndWaterItemConfigOptions.value
	}

	public getData(): HungersThirstValue {
		return this.hungersThirstValue
	}

	public static getInfo(infoOptions: FoodAndWaterInfoOptions): ItemInfo {
		return {
			quality: infoOptions.quality,
			name: infoOptions.name,
			parameters: [
				{ title: 'Восполняет', value: `${infoOptions.value.thirstValue} ед. жажды` },
				{ title: 'Восполняет', value: `${infoOptions.value.hungersValue} ед. еды` },
				{ title: 'Вес', value: `${infoOptions.weight} кг.` },
			],
			description: infoOptions.description,
			actions: [ItemActionConfig[ItemActionType.FOOD_AND_WATER], ItemActionConfig[ItemActionType.SPLIT], ItemActionConfig[ItemActionType.DROP]],
		}
	}
}
