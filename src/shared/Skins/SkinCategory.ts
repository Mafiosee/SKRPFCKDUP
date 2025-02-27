import { SkinSlot } from './SkinSlot'

export enum SkinCategory {
  Armor = 'Armor',
  Accessory = 'Accessory',
  Bag = 'Bag',
  MaskAndGlasses = 'MaskAndGlasses',
  Weapon = 'Weapon',
}

export type SkinCategoryConfigItem = {
  name: string
  order: number
  slots: SkinSlot[]
}

export const SkinCategoryConfig: Record<SkinCategory, SkinCategoryConfigItem> =
  {
    [SkinCategory.Armor]: {
      name: 'Броня',
      order: 0,
      slots: [
        SkinSlot.Headdress,
        SkinSlot.Outerwear,
        SkinSlot.Bracers,
        SkinSlot.Shoes,
      ],
    },
    [SkinCategory.Accessory]: {
      name: 'Украшения',
      order: 1,
      slots: [
        SkinSlot.Earrings,
        SkinSlot.Amulet,
        SkinSlot.Scarf,
        SkinSlot.Cloak,
        SkinSlot.Ring,
        SkinSlot.Belt,
      ],
    },
    [SkinCategory.Bag]: {
      name: 'Сумки',
      order: 2,
      slots: [SkinSlot.Bag],
    },
    [SkinCategory.MaskAndGlasses]: {
      name: 'Маски и очки',
      order: 3,
      slots: [SkinSlot.Mask, SkinSlot.Glasses],
    },
    [SkinCategory.Weapon]: {
      name: 'Оружие',
      order: 4,
      slots: [
        SkinSlot.Dagger,
        SkinSlot.Sword,
        SkinSlot.GreatSword,
        SkinSlot.Mace,
        SkinSlot.WarAxe,
        SkinSlot.BattleAxe,
        SkinSlot.WarHammer,
        SkinSlot.Bow,
      ],
    },
  }

export const SkinCategories = Object.values(SkinCategory).sort(
  (a, b) => SkinCategoryConfig[a].order - SkinCategoryConfig[b].order,
)
