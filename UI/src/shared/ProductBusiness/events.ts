export enum ProductBusinessesEvents {
	Close = 'productBusinesses:close',
	LoadMaterials = 'productBusinesses:loadMaterials',
	PayTax = 'productBusinesses:payTax',
	ChangePriceMarkup = 'productBusinesses:changePriceMarkup',
}

export type ProductBusinessesPayloads = {
	[ProductBusinessesEvents.Close]: undefined
	[ProductBusinessesEvents.LoadMaterials]: { value: number }
	[ProductBusinessesEvents.PayTax]: {
		days: number
	}
	[ProductBusinessesEvents.ChangePriceMarkup]: {
		productId: any
		priceMarkup: number
	}
}
