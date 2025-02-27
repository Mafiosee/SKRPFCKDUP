import { Quality } from '../../../shared/inventory/itemType'

export const QualityIcons: Record<Quality, string> = {
	[Quality.Normal]: require('./images/qualityIcons/normal.svg'),
	[Quality.Unusual]: require('./images/qualityIcons/unusual.svg'),
	[Quality.Rare]: require('./images/qualityIcons/rare.svg'),
	[Quality.Epic]: require('./images/qualityIcons/Epic.svg'),
	[Quality.Legendary]: require('./images/qualityIcons/legendary.svg'),
}
