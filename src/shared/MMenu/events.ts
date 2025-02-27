export enum MMenuEvents {
	ClickButton = 'mMenu:clickButton',
}

export type MMenuPayloads = {
	[MMenuEvents.ClickButton]: {
		buttonId: any
	}
}