import { CharSlots, ItemType } from '../inventory/itemType'

export enum ArmorStoreEvents {
  Close = 'armorStore:close',
  SetActiveProduct = 'armorStore:setActiveProduct',
  BuyProduct = 'armorStore:buyProduct',
  ChangeCategory = 'armorStore:changeCategory',
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
  [ArmorStoreEvents.ChangeCategory]: {
    categoryId: CharSlots | ItemType | null
  }
}
