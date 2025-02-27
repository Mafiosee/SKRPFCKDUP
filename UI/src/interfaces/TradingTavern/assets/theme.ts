import { Type } from '../../../shared/TradingTavern/Type'

export const HeadImages: Record<Type, string> = {
	[Type.Light]: require('./images/theme/head-light.png'),
	[Type.Dark]: require('./images/theme/head-dark.png'),
}

export const TableImages: Record<Type, string> = {
	[Type.Light]: require('./images/theme/table-light.png'),
	[Type.Dark]: require('./images/theme/table-dark.png'),
}

export const TableNameColor: Record<Type, string> = {
	[Type.Light]: '#fff',
	[Type.Dark]: '#39E4DA',
}

export const BodyImages: Record<Type, string> = {
	[Type.Light]: require('./images/theme/body-light.png'),
	[Type.Dark]: require('./images/theme/body-dark.png'),
}

export const ThemeClass: Record<Type, string> = {
	[Type.Light]: '-light',
	[Type.Dark]: '-dark',
}
