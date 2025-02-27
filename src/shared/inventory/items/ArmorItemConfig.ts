import { ArmorConfig } from '../../ArmorSystem/config'
import { Size } from '../inventoryType'
import { ItemHashes } from '../ItemHashes'
import { ArmorItemType, Cords, ItemActionConfig, ItemActionType, ItemDto, ItemInfo, ItemType, Quality } from '../itemType'
import { ItemConfig, ItemConfigOption } from './ItemConfig'

type ArmorItemConfigOptions = {
	id: ItemHashes
	size: Size
	type: ItemType
	itemId: string
	image: string
	weight: number
	info: ItemInfo
	option?: ItemConfigOption
}

type ArmorInfoOptions = {
	quality: Quality
	name: string
	weight: number
	type: ArmorItemType
	description: string
}

export class ArmorItemConfig extends ItemConfig {
	constructor(armorItemConfigOption: ArmorItemConfigOptions) {
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

	public getData(): number {
		return ArmorConfig[this.id]?.physical == null ? 0 : ArmorConfig[this.id]?.physical
	}

	public getDTO(id: number, position: Cords, isTurned: boolean, amount: number): ItemDto {
		const info = this.info

		if (!info.parameters) {
			info.parameters = []
		}

		if (info.parameters.every(param => param.title !== 'Физическая Защита' && param.title !== 'Магическая Защита')) {
			info.parameters.splice(1, 0, {
				title: 'Физическая Защита',
				value: `${ArmorConfig[this.id]?.physical == null ? 0 : ArmorConfig[this.id]?.physical}`,
			})
			info.parameters.splice(2, 0, {
				title: 'Магическая Защита',
				value: `${ArmorConfig[this.id]?.magic == null ? 0 : ArmorConfig[this.id]?.magic}`,
			})
		}

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
			armor: ArmorConfig[this.id]?.physical ?? 0 + ArmorConfig[this.id]?.magic ?? 0,
		}
	}

	public static getInfo(infoOption: ArmorInfoOptions): ItemInfo {
		return {
			quality: infoOption.quality,
			name: infoOption.name,
			parameters: [
				{ title: 'Броня', value: infoOption.type },
				{ title: 'Состояние', value: `${100}%` },
				{ title: 'Вес', value: `${infoOption.weight}кг.` },
			],
			description: infoOption.description,
			actions: [ItemActionConfig[ItemActionType.PUT_ON], ItemActionConfig[ItemActionType.SPLIT], ItemActionConfig[ItemActionType.DROP]],
		}
	}
}
