import { ItemId } from '../types/ItemId'

export const ItemImages: Record<ItemId, string> = {
	[ItemId.Reed]: require('./images/items/reed.png'),
	[ItemId.Pestle]: require('./images/items/pestle.png'),
}
