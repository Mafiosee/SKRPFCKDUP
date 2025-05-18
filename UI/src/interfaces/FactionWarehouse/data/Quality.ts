import { Quality } from '../../../shared/inventory/itemType'

export const QualityColor: Record<Quality, string> = {
  [Quality.Unusual]: '#8F8F8F',
  [Quality.Normal]: '#399241',
  [Quality.Rare]: '#3381C5',
  [Quality.Epic]: '#6A2A8F',
  [Quality.Legendary]: '#CBB332',
}
