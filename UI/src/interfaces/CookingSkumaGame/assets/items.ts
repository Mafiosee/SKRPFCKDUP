import { ItemId } from '../types/ItemId'

export const ItemImages: Record<ItemId, string> = {
	[ItemId.Sugar]: require('./images/items/sugar.png'),
	[ItemId.Pestle]: require('./images/items/pestle.png'),
}
