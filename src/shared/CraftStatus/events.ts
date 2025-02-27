export enum CraftStatusEvents {
	Cancel = 'craftConfirm:cancel',
	Confirm = 'craftConfirm:confirm',
	Finish = 'craftConfirm:finish',
}

export type CraftStatusPayloads = {
	[CraftStatusEvents.Cancel]: unknown
	[CraftStatusEvents.Confirm]: {
		amount: number
	}
	[CraftStatusEvents.Finish]: unknown
}