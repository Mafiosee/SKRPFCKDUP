export enum NpcShopEvents {
	Close = 'npcShop:close',
	Buy = 'npcShop:buy',
}

export type BuyPayload = {
	productId: any
	amount: number | null
}
