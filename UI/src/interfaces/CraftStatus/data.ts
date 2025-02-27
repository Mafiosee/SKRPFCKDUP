import { Quality } from '../../shared/inventory/itemType'

export const QualityBackgrounds = {
	[Quality.Unusual]: '#4E4E4E',
	[Quality.Normal]: '#284F2C',
	[Quality.Rare]: '#385773',
	[Quality.Epic]: '#764792',
	[Quality.Legendary]: '#9E8A24',
}

export const QualityBackgroundRadial = {
	[Quality.Unusual]: {
		color:
			'radial-gradient(50% 50% at 50% 50%, rgba(127, 127, 127, 0.79) 0%, rgba(127, 127, 127, 0) 100%)',
		opacity: 0.5,
	},
	[Quality.Normal]: {
		color:
			'radial-gradient(50% 50% at 50% 50%, rgba(43, 210, 57, 0.4) 0%, rgba(37, 204, 52, 0) 100%)',
		opacity: 1,
	},
	[Quality.Rare]: {
		color:
			'background: radial-gradient(50% 50% at 50% 50%, rgba(56, 152, 236, 0.6) 0%, rgba(68, 112, 150, 0) 100%)',
		opacity: 0.9,
	},
	[Quality.Epic]: {
		color:
			'radial-gradient(50% 50% at 50% 50%, rgba(146, 67, 193, 0.73) 0%, rgba(107, 46, 143, 0) 100%)',
		opacity: 0.5,
	},
	[Quality.Legendary]: {
		color:
			'radial-gradient(50% 50% at 50% 50%, rgba(231, 198, 32, 0.4) 0%, rgba(133, 115, 25, 0) 100%)',
		opacity: 1,
	},
}
