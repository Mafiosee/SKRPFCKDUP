export type AnimationsSetPayload = {
	pieceId: any
	animationId: any
}

export enum AnimationsMenuEvents {
	Exit = 'animationsMenu:exit',
	Set = 'animationsMenu:set',
	Play = 'animationsMenu:play',
	PlayFromRadial = 'animationsMenu:playFromRadial',
	SetIsFavorite = 'animationsMenu:setIsFavorite',
	Remove = 'animationsMenu:remove'
}

export enum AnimationsEvents {
	Play = 'animations:play',
	PlayTwo = 'animations:playTwo',
	Stop = 'animations:stop',
}

export enum AnimationSyncEvents {
	SyncAnim = 'animations:syncAnim',
	SendDataAnimation = 'animations:sendDataAnimation',
}