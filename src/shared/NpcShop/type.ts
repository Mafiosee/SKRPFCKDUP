import { Quality } from '../../shared/inventory/itemType'

export type Category = {
  id: any
  name: string
}

export type Product = {
  categoryId: any
  price: number
  amount: number | null
}

export type ProductDTO = {
  id: any
  categoryId: any
  price: number
  amount?: number | null
  image: string
  quality: Quality
  name: string
  description: string
}

export enum ButtonTypes {
  Primary,
  Secondary,
  Warning,
}
