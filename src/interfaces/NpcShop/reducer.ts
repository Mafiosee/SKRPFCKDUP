import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Category, Product } from './types'
import { Quality } from '../../shared/inventory/itemType'

type NpcShopState = {
  isOpen: boolean
  categories: Category[]
  products: Product[]
}

const initialState: NpcShopState = {
  isOpen: false,
  categories: [
    {
      id: 'rods',
      name: 'Удочки',
    },
    {
      id: 'bait',
      name: 'Наживки',
    },
    {
      id: 'items',
      name: 'Предметы',
    },
  ],
  products: [
    {
      id: 'beginner_rod',
      categoryId: 'rods',
      price: 500,
      amount: 1,
      image: 'rod',
      quality: 1,
      name: 'Удочка новичка',
      description:
        'Идеальный выбор для начинающих рыболовов, эта удочка прощает ошибки и помогает освоить азы рыбной ловли.',
    },
    {
      id: 'rod_experienced',
      categoryId: 'rods',
      price: 2000,
      amount: 1,
      image: 'rod',
      quality: 0,
      name: 'Удочка опытного',
      description:
        'Сбалансированное сочетание гибкости и силы делает эту удочку отличным инструментом для рыболовов, стремящихся к мастерству.',
    },
    {
      id: 'master_rod',
      categoryId: 'rods',
      price: 5000,
      amount: 1,
      image: 'rod',
      quality: 3,
      name: 'Удочка мастера',
      description:
        'Для рыболовов-мастеров, ценящих точность и долговечность – удочка, подобная этой, позволит покорять самые капризные рыбные места.',
    },
    {
      id: 'bait',
      categoryId: 'bait',
      price: 5,
      amount: 1,
      image: 'bait',
      quality: 0,
      name: 'Наживка ',
      description: 'Приманка для рыбы. Используется для рыбалки',
    },
    {
      id: 'shovel',
      categoryId: 'items',
      price: 1000,
      image: 'shovel',
      quality: 1,
      name: 'Лопата ',
      description:
        'Прочный и надежный инструмент, необходимый для добычи наживки.',
    },
  ],
}

export const npcShopSlice = createSlice({
  name: 'npcShop',
  initialState,
  reducers: {
    show(state) {
      state.isOpen = true
    },
    hide(state) {
      state.isOpen = false
    },
    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload
    },
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload
    },
  },
})

export const npcShopReducer = npcShopSlice.reducer
export const npcShopActions = npcShopSlice.actions
