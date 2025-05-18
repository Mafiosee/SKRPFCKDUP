import { UIKitSelectItem } from '../../../ui-kit/Select/data/Item'
import { ItemType } from '../../../shared/inventory/itemType'

export const ItemTypeName = {
  [ItemType.Weapon]: 'Оружие',
  [ItemType.Armor]: 'Броня',
  [ItemType.Backpack]: 'Рюкзаки',
  [ItemType.Potions]: 'Зелья',
  [ItemType.Manuscripts]: 'Манускрипты',
  [ItemType.Food]: 'Еда',
  [ItemType.Drinks]: 'Напитки',
  [ItemType.Ingredients]: 'Ингридиенты',
  [ItemType.Resources]: 'Ресурсы',
  [ItemType.Other]: 'Другое',
  [ItemType.Accessories]: 'Аксессуары',
  [ItemType.Clothes]: 'Одежда',
}

export const ItemTypeList: UIKitSelectItem[] = Object.values(ItemType).map(
  (itemType) => ({
    id: itemType,
    name: ItemTypeName[itemType],
  }),
)
