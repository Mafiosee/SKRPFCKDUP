export enum FishingGameEvents {
	Fail = 'fishingGame:fail',
	Win = 'fishingGame:win',
}

export enum FishingWorkEvents {
	StartFishing = 'fishingWork:startFishing',
	StopFishing = 'fishingWork:stopFishing',
}

export enum ChooseWorkTypeEvents {
	Close = 'chooseWorkType:close',
	Start = 'chooseWorkType:start',
	Dismiss = 'chooseWorkType:dismiss',
}

export type ChooseWorkStartPayload = {
	workId: any
}

export type ChooseWorkDismissPayload = {
	workId: any
}

export enum SawmillGameEvents {
	Win = 'sawmillGame:win',
	Loose = 'sawmillGame:loose',
}

export enum HoneyFactoryEvents {
	Exit = 'honeyFactory:exit',
	Win = 'honeyFactory:win',
	Loose = 'honeyFactory:loose',
}

export enum MineGameEvents {
	Win = 'mineGame:win',
	Loose = 'mineGame:loose',
}