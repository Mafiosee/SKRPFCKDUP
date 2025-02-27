import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Info } from '../../shared/ProductBusiness/Info'
import { Product } from '../../shared/ProductBusiness/Product'
import { ProfitChartItem } from '../../shared/ProductBusiness/ProfitChartItem'
import { Period, Statistic } from '../../shared/ProductBusiness/Statistic'

type ProductBusinessesState = {
  isOpen: boolean
  backgroundImage: string
  info: Info
  products: Product[]
  profit: Record<Period, ProfitChartItem[]>
  statistics: Statistic[]
}

const initialState: ProductBusinessesState = {
  isOpen: false,
  backgroundImage: 'test',
  info: {
    title: 'Лесопилка',
    sales: 22,
    balance: 1000,
    materials: { current: 50, max: 100, price: 20 },
    taxDatetime: '02.02.2025',
  },
  products: [
    {
      id: 1,
      image: 'test',
      name: 'Сладкий рулет 1',
      sales: 99,
      profit: 10400,
      priceMarkup: 10,
    },
  ],
  profit: {
    [Period.Day]: [
      { time: '00:00', profit: 1000 },
      { time: '04:00', profit: 2500 },
      { time: '08:00', profit: 26500 },
      { time: '12:00', profit: 22000 },
      { time: '06:00', profit: 32000 },
      { time: '20:00', profit: 25000 },
    ],
    [Period.Week]: [
      { time: '00:00', profit: 1000 },
      { time: '04:00', profit: 2500 },
      { time: '08:00', profit: 26500 },
      { time: '12:00', profit: -22000 },
      { time: '06:00', profit: 32000 },
      { time: '20:00', profit: -25000 },
    ],
    [Period.Month]: [],
  },
  statistics: [
    {
      id: 0,
      name: 'Средний чек',
      icon: 'money',
      value: {
        [Period.Day]: '2.500',
        [Period.Week]: '4.700',
        [Period.Month]: '10.200',
      },
    },
    {
      id: 1,
      name: 'Посетители',
      icon: 'people',
      value: {
        [Period.Day]: '3',
        [Period.Week]: '18',
        [Period.Month]: '146',
      },
    },
  ],
}

export const productBusinessesSlice = createSlice({
  name: 'productBusinesses',
  initialState,
  reducers: {
    show(state) {
      state.isOpen = true
    },
    hide(state) {
      state.isOpen = false
    },
    setInfo(state, action: PayloadAction<Info>) {
      state.info = action.payload
    },
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload
    },
    setProfit(state, action: PayloadAction<Record<Period, ProfitChartItem[]>>) {
      state.profit = action.payload
    },
    setStatistics(state, action: PayloadAction<Statistic[]>) {
      state.statistics = action.payload
    },
  },
})

export const productBusinessesReducer = productBusinessesSlice.reducer
export const productBusinessesActions = productBusinessesSlice.actions
