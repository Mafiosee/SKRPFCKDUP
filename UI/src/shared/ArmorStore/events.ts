export enum ArmorStoreEvents {
	Close = 'armorStore:close',
	SetActiveProduct = 'armorStore:setActiveProduct',
	BuyProduct = 'armorStore:buyProduct',
}

export enum ArmorWeaponEvents {
	OpenArmor = 'armorWeapon:openArmor',
	OpenWeapon = 'armorWeapon:openWeapon',
}

export type ArmorStorePayloads = {
	[ArmorStoreEvents.SetActiveProduct]: {
		productId: any
	}
	[ArmorStoreEvents.BuyProduct]: {
		productId: any
	}
}
