export enum RadialMenuEvents {
	Open = 'radialMenu:open',
	Select = 'radialMenu:select',
	Close = 'radialMenu:close',
	Back = 'radialMenu:back',
}

export type RadialMenuSelectPayload = {
	pieceId: any
}

export type RadialMenuOpenData = {
	targetId: number
}

export const RADIAL_MAX_DISTANCE_INTERACTION = 100