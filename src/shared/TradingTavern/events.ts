export enum TradingTavernEvents {
	Close = 'tradingTavern:close',
	Buy = 'tradingTavern:buy',
}

export type TradingTavernPayloads = {
	[TradingTavernEvents.Close]: undefined
	[TradingTavernEvents.Buy]: {
		productId: any
		amount: number
	}
};
