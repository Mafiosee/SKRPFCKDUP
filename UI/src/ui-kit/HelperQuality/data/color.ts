import { Quality } from '../../../shared/inventory/itemType'

export const Color: Record<Quality, string> = {
  [Quality.Unusual]: '#8F8F8F',
  [Quality.Normal]: '#399241',
  [Quality.Rare]: '#3381C5',
  [Quality.Epic]: '#8336B0',
  [Quality.Legendary]: '#CBB332',
}
