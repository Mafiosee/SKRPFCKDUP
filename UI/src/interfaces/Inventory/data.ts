import { ItemType, Quality } from '../../shared/inventory/itemType'

export const QualityGradients = {
  [Quality.Unusual]: 'none',
  [Quality.Normal]:
    'radial-gradient(71.08% 70.71% at 50% 50%, rgba(62, 127, 69, .90), #0000)',
  [Quality.Rare]:
    'radial-gradient(71.08% 70.71% at 50% 50%, rgba(71, 106, 173, .48), #0000)',
  [Quality.Epic]:
    'radial-gradient(71.08% 70.71% at 50% 50%, rgba(110, 51, 144, .90), #0000)',
  [Quality.Legendary]:
    'radial-gradient(71.08% 70.71% at 50% 50%, rgba(173, 157, 71, .48), #0000)',
}

export const QualityColors: Record<Quality, string> = {
  [Quality.Unusual]: '#7F7F7F',
  [Quality.Normal]: '#2BD239',
  [Quality.Rare]: '#3898EC',
  [Quality.Epic]: '#9243C1',
  [Quality.Legendary]: '#E7C620',
}

export const QualityNames: Record<Quality, string> = {
  [Quality.Unusual]: 'Простое',
  [Quality.Normal]: 'Обычное',
  [Quality.Rare]: 'Редкое',
  [Quality.Epic]: 'Эпический',
  [Quality.Legendary]: 'Легендарное',
}

export const ArmorStatusColor = {
  [Quality.Unusual]: '#757575',
  [Quality.Normal]: '#399241',
  [Quality.Rare]: '#4C80AE',
  [Quality.Epic]: '#6A2A8F',
  [Quality.Legendary]: '#BDA527',
}

export const ArmorStatusLimits = {
  [Quality.Unusual]: { Min: 0, Max: 59 },
  [Quality.Normal]: { Min: 60, Max: 119 },
  [Quality.Rare]: { Min: 120, Max: 179 },
  [Quality.Epic]: { Min: 180, Max: 239 },
  [Quality.Legendary]: { Min: 240, Max: 300 },
}

export const QualityName = {
  [Quality.Unusual]: 'Бесполезный',
  [Quality.Normal]: 'Обычный',
  [Quality.Rare]: 'Редкий',
  [Quality.Epic]: 'Эпический',
  [Quality.Legendary]: 'Легендарный',
}

export const ItemTypeName = {
  [ItemType.Weapon]: 'Оружие',
  [ItemType.Armor]: 'Броня',
  [ItemType.Backpack]: 'Рюкзак',
  [ItemType.Potions]: 'Зелье',
  [ItemType.Manuscripts]: 'Манускрипт',
  [ItemType.Food]: 'Еда',
  [ItemType.Drinks]: 'Напиток',
  [ItemType.Ingredients]: 'Ингридиент',
  [ItemType.Resources]: 'Ресурс',
  [ItemType.Other]: 'Другое',
  [ItemType.Accessories]: 'Аксессуар',
  [ItemType.Clothes]: 'Одежда',
}
