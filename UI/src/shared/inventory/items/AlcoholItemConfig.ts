import { Size } from '../inventoryType'
import { ItemHashes } from '../ItemHashes'
import { ItemActionConfig, ItemActionType, ItemInfo, ItemType, Quality } from '../itemType'
import { ItemConfig, ItemConfigOption } from './ItemConfig'

type AlcoholsItemConfigOptions = {
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

type AlcoholsItemInfoOptions = {
	quality: Quality
	name: string
	thirstValue: number
	weight: number
	description: string
}

export class AlcoholsItemConfig extends ItemConfig {
	private readonly thirstValue: number

	constructor(alcoholsItemConfigOptions: AlcoholsItemConfigOptions) {
		super(
			alcoholsItemConfigOptions.id,
			alcoholsItemConfigOptions.size,
			alcoholsItemConfigOptions.type,
			alcoholsItemConfigOptions.image,
			alcoholsItemConfigOptions.weight,
			alcoholsItemConfigOptions.info,
			alcoholsItemConfigOptions.option,
			alcoholsItemConfigOptions.itemId,
		)
		this.thirstValue = alcoholsItemConfigOptions.thirstValue
	}

	public getData(): number {
		return this.thirstValue
	}

	public static getInfo(infoOptions: AlcoholsItemInfoOptions): ItemInfo {
		return {
			quality: infoOptions.quality,
			name: infoOptions.name,
			parameters: [
				{ title: 'Восполняет', value: `${infoOptions.thirstValue} ед. жажды` },
				{ title: 'Вес', value: `${infoOptions.weight} кг.` },
			],
			description: infoOptions.description,
			actions: [ItemActionConfig[ItemActionType.DRINK_ALCOHOL], ItemActionConfig[ItemActionType.SPLIT], ItemActionConfig[ItemActionType.DROP]],
		}
	}
}
