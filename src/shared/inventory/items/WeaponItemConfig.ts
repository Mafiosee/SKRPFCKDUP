import { ItemHashes } from '../ItemHashes'
import { Size } from '../inventoryType'
import { ItemType, ItemInfo, Quality, ItemActionConfig, ItemActionType, WeaponItemType, Cords, ItemDto } from '../itemType'
import { ItemConfig, ItemConfigOption } from './ItemConfig'
import { DamageConfig } from '../../DamageSystem/config'

export enum WeaponRange {
	MELEE = 'MELEE',
	RANGE = 'RANGE',
}

export enum WeaponCategory {
	None = 'none',
	Dagger = 'Dagger',
	Sword = 'Sword',
	GreatSword = 'GreatSword',
	Mace = 'Mace',
	WarAxe = 'WarAxe',
	BattleAxe = 'BattleAxe',
	WarHammer = 'WarHammer',
	Bow = 'Bow',
}

type WeaponItemConfigOptions = {
	id: ItemHashes
	size: Size
	type: ItemType
	category: WeaponCategory
	itemId: string
	image: string
	weight: number
	info: ItemInfo
	option?: ItemConfigOption
	weaponRange: WeaponRange
}

type WeaponInfoOptions = {
	quality: Quality
	name: string
	weight: number
	type: WeaponItemType
	description: string
}

export class WeaponItemConfig extends ItemConfig {
	private readonly weaponRange: WeaponRange

	constructor(weaponItemConfigOptions: WeaponItemConfigOptions) {
		super(
			weaponItemConfigOptions.id,
			weaponItemConfigOptions.size,
			weaponItemConfigOptions.type,
			weaponItemConfigOptions.image,
			weaponItemConfigOptions.weight,
			weaponItemConfigOptions.info,
			weaponItemConfigOptions.option,
			weaponItemConfigOptions.itemId,
		)
		this.weaponRange = weaponItemConfigOptions.weaponRange
	}

	public getData(): number {
		return 0
	}

	public getWeaponRange(): WeaponRange {
		return this.weaponRange
	}

	public getDTO(id: number, position: Cords, isTurned: boolean, amount: number): ItemDto {
		const info = this.info

		if (!info.parameters) {
			info.parameters = []
		}

		if (info.parameters.every(param => param.title !== 'Урон')) {
			info.parameters.splice(1, 0, { title: 'Урон', value: `${DamageConfig[this.id].standard}` })
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
			info: info,
			wearable: this.option?.wearable,
		}
	}

	public static getInfo(infoOptions: WeaponInfoOptions): ItemInfo {
		return {
			quality: infoOptions.quality,
			name: infoOptions.name,
			parameters: [
				{ title: 'Тип Оружия', value: infoOptions.type },
				{ title: 'Состояние', value: `${100}%` },
				{ title: 'Вес', value: `${infoOptions.weight}кг.` },
			],
			description: infoOptions.description,
			actions: [ItemActionConfig[ItemActionType.PUT_ON], ItemActionConfig[ItemActionType.SPLIT], ItemActionConfig[ItemActionType.DROP]],
		}
	}
}
