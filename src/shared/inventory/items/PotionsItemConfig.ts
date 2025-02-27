import { ItemHashes } from '../ItemHashes'
import { Size } from '../inventoryType'
import { ItemType, ItemInfo, Quality, ItemActionConfig, ItemActionType } from '../itemType'
import { ItemConfig, ItemConfigOption } from './ItemConfig'
import { PotionsActionType } from '../../PotionSystem/PotionActionType'

export type PotionAction = {
	type: PotionsActionType
	value?: number | null
	time?: number | null
}

type PotionActionInfo = {
	title: string
	value: string
}

type PotionsItemConfigOptions = {
	id: ItemHashes
	size: Size
	type: ItemType
	image: string
	action: PotionAction
	weight: number
	itemId: string
	info: ItemInfo
	option?: ItemConfigOption
}

type PotionsItemInfoOptions = {
	quality: Quality
	action: PotionActionInfo
	name: string
	weight: number
	description: string
}

export class PotionsItemConfig extends ItemConfig {
	private readonly action: PotionAction

	constructor(potionsItemConfigOptions: PotionsItemConfigOptions) {
		super(
			potionsItemConfigOptions.id,
			potionsItemConfigOptions.size,
			potionsItemConfigOptions.type,
			potionsItemConfigOptions.image,
			potionsItemConfigOptions.weight,
			potionsItemConfigOptions.info,
			potionsItemConfigOptions.option,
			potionsItemConfigOptions.itemId,
		)

		this.action = potionsItemConfigOptions.action
	}

	public getData(): PotionAction {
		return this.action
	}

	public static getInfo(infoOptions: PotionsItemInfoOptions): ItemInfo {
		return {
			quality: infoOptions.quality,
			name: infoOptions.name,
			parameters: [
				{ title: 'Вес', value: `${infoOptions.weight} кг.` },
				{ title: infoOptions.action.title, value: infoOptions.action.value },
			],
			description: infoOptions.description,
			actions: [ItemActionConfig[ItemActionType.USE_POTION], ItemActionConfig[ItemActionType.SPLIT], ItemActionConfig[ItemActionType.DROP]],
		}
	}
}
