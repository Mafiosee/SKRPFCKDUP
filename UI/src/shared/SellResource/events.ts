export enum SellResourceEvents {
	Cancel = 'sellResource:cancel',
	Sell = 'sellResource:sell',
}

export type SellPayload = {
	amount: number
}