import { Quality } from '../../../shared/inventory/itemType'

export const ArmorStatusImages: Record<Quality, string> = {
	[Quality.Unusual]: require('./images/armorStatus/unusual.svg'),
	[Quality.Normal]: require('./images/armorStatus/normal.svg'),
	[Quality.Rare]: require('./images/armorStatus/rare.svg'),
	[Quality.Epic]: require('./images/armorStatus/epic.svg'),
	[Quality.Legendary]: require('./images/armorStatus/legendary.svg'),
}
