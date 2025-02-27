import { Size } from './inventoryType'
import { ItemHashes } from './ItemHashes'

export type Cords = {
  x: number
  y: number
}

export type ItemAction = {
  type: string
  name: string
}

export type Parameter = {
  title: string
  value: string
}

export type ItemInfo = {
  quality: Quality
  name: string
  parameters?: Parameter[]
  description?: string
  actions?: ItemAction[]
}

export type Wearable = {
  slot: CharSlots[]
  blockSlots?: CharSlots[]
}

export type ItemDto = {
  id: any
  size: Size
  position: Cords
  image: string
  isTurned: boolean
  amount?: number
  type: ItemType
  weight: number
  info: ItemInfo
  wearable?: Wearable
  armor?: number
  itemHash?: ItemHashes
  durability?: number
}

export type EquipItemDto =
  | (Pick<
      ItemDto,
      'id' | 'type' | 'size' | 'image' | 'info' | 'wearable' | 'durability'
    > & {
      armor: number
    })
  | null

export type CraftItemDto = Pick<
  ItemDto,
  'id' | 'image' | 'type' | 'amount' | 'info' | 'size'
> | null

export type NearbyItemDto = Omit<ItemDto, 'position' | 'isTurned'>

export enum ItemType {
  Weapon = 'ItemTypeWeapon',
  Armor = 'ItemTypeArmor',
  Backpack = 'ItemTypeBackpack',
  Potions = 'ItemTypePotions',
  Manuscripts = 'ItemTypeManuscripts',
  Food = 'ItemTypeFood',
  Drinks = 'ItemTypeDrinks',
  Ingredients = 'ItemTypeIngredients',
  Resources = 'ItemTypeResources',
  Other = 'ItemTypeOther',
  Accessories = 'ItemTypeAccessories',
  Clothes = 'ItemTypeClothes',
}

export enum WeaponItemType {
  OneHanded = 'Одноручное',
  TwoHanded = 'Двуручное',
  Bow = 'Лук',
}

export enum ArmorItemType {
  Light = 'Легкая',
  Medium = 'Средняя',
  Heavy = 'Тяжелая',
  Clothes = 'Одежда',
  Shield = 'Щит',
}

export enum Quality {
  Unusual,
  Normal,
  Rare,
  Epic,
  Legendary,
}

export enum CharSlots {
  Backpack = 'CharSlotBackpack',
  Headdress = 'CharSlotHeaddress',
  Amulet = 'CharSlotAmulet',
  Outerwear = 'CharSlotOuterwear',
  Shoes = 'CharSlotShoes',
  Bracers = 'CharSlotBracers',
  Ring = 'CharSlotRing',
  FirstHand = 'CharSlotFirstHand',
  SecondHand = 'CharSlotSecondHand',
}

export enum ItemActionType {
  DROP = 'drop',
  TAKE = 'take',
  SPLIT = 'split',
  EAT = 'eat',
  DRINK = 'drink',
  DRINK_ALCOHOL = 'drink_alcohol',
  FOOD_AND_WATER = 'food_and_water',
  PUT_ON = 'put_on',
  USE_ROD = 'use_rod',
  USE_SHOVEL = 'use_shovel',
  USE_POTION = 'use_potion',
  CONFISCATE = 'confiscate',
  REPAIR = 'repair',
}

export const ItemActionConfig: Record<ItemActionType, ItemAction> = {
  [ItemActionType.DROP]: { type: ItemActionType.DROP, name: 'Выбросить' },
  [ItemActionType.TAKE]: { type: ItemActionType.TAKE, name: 'Подобрать' },
  [ItemActionType.SPLIT]: { type: ItemActionType.SPLIT, name: 'Разделить' },
  [ItemActionType.EAT]: { type: ItemActionType.EAT, name: 'Съесть' },
  [ItemActionType.DRINK]: { type: ItemActionType.DRINK, name: 'Выпить' },
  [ItemActionType.DRINK_ALCOHOL]: {
    type: ItemActionType.DRINK,
    name: 'Выпить',
  },
  [ItemActionType.USE_POTION]: {
    type: ItemActionType.USE_POTION,
    name: 'Выпить',
  },
  [ItemActionType.FOOD_AND_WATER]: {
    type: ItemActionType.FOOD_AND_WATER,
    name: 'Использовать',
  },
  [ItemActionType.USE_ROD]: {
    type: ItemActionType.USE_ROD,
    name: 'Использовать',
  },
  [ItemActionType.PUT_ON]: { type: ItemActionType.PUT_ON, name: 'Надеть' },
  [ItemActionType.USE_SHOVEL]: {
    type: ItemActionType.USE_SHOVEL,
    name: 'Использовать',
  },
  [ItemActionType.CONFISCATE]: {
    type: ItemActionType.CONFISCATE,
    name: 'Изъять',
  },
  [ItemActionType.REPAIR]: { type: ItemActionType.REPAIR, name: 'Починить' },
}
