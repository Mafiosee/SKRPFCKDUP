import { Quality } from '../inventory/itemType'
import { Image } from '../Images/Image'

export enum ProductMark {
  Discount,
  New,
  Popular,
  Gift,
}

export type Product = {
  id: any
  categoryIds: any[]
  type: string
  price: number
  discount: number | null
  quality: Quality
  name: string
  description: {
    small: string
    large: string
  }
  image: Image
  mark: ProductMark | null
  giftFrom?: string
}
