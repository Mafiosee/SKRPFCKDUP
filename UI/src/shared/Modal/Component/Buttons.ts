import { ComponentBase } from './base'
import { ComponentType } from './type'

export enum ButtonColor {
	White,
	Red,
	Transparent,
}

export type Button = {
	id: any
	color: ButtonColor
	icon?: string
	isMain?: boolean
	text: string
}

export type ComponentButtons = ComponentBase & {
	type: ComponentType.Buttons
	buttons: Button[]
}
