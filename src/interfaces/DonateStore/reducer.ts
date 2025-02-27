import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { Tab } from './enums/Tabs'
import { DonateStorePlayerInfo } from '../../shared/DonateStore/PlayerInfo'
import { StorePage } from '../../shared/DonateStore/StorePage'
import { GiftPlayer } from '../../shared/DonateStore/GiftPlayer'
import { CasesPage } from '../../shared/DonateStore/CasesPage'
import { ReplenishPage } from '../../shared/DonateStore/ReplenishPage'
import { VipsPage } from '../../shared/DonateStore/VipsPage'
import { PageWarehouse } from '../../shared/DonateStore/PageWarehouse'
import { PageServices } from '../../shared/DonateStore/PageServices'
import { VipType } from '../../shared/Vip/types'

type DonateStoreState = {
  tab: Tab
  playerInfo: DonateStorePlayerInfo
  giftPlayer: GiftPlayer
  balance: number
  storePage: StorePage
  casesPage: CasesPage
  replenishPage: ReplenishPage
  servicesPage: PageServices
  vipsPage: VipsPage
  pageWarehouse: PageWarehouse
}

const initialState: DonateStoreState = {
  tab: Tab.Store,
  playerInfo: {
    name: '',
    vip: {
      type: null,
      endDateTime: '',
    },
  },
  giftPlayer: null,
  balance: 32000,
  storePage: {
    categories: [
      // { id: 0, name: 'Все' }
    ],
    products: [
      // {
      //   id: 0,
      //   name: 'Test Product',
      //   price: 499,
      //   image: {
      //     name: 'moragtonggrandmaster-store',
      //     sourceType: SourceType.DonateStore,
      //   },
      //   description: {
      //     small: 'Small description',
      //     large: 'Large description',
      //   },
      //   type: 'Any type',
      //   categoryIds: [0],
      //   discount: null,
      //   mark: null,
      //   quality: Quality.Epic,
      // },
      // {
      //   id: 1,
      //   name: 'Test Product',
      //   price: 499,
      //   image: {
      //     name: 'Sithis_Armour',
      //     sourceType: SourceType.DonateStore,
      //   },
      //   description: {
      //     small: 'Small description',
      //     large: 'Large description',
      //   },
      //   type: 'Any type',
      //   categoryIds: [0],
      //   discount: null,
      //   mark: null,
      //   quality: Quality.Rare,
      // },
    ],
  },
  casesPage: {
    categories: [],
    cases: [],
  },
  replenishPage: {
    bonuses: {
      small: { percent: 5, sum: 5000 },
      medium: { percent: 15, sum: 25000 },
      large: { percent: 25, sum: 50000 },
    },
    replenishBlock: { rate: 10, minSum: 100 },
    exchangeBlock: { rate: 100, minSum: 200 },
  },
  servicesPage: {
    services: [
      // {
      //   id: 0,
      //   name: 'Изменить никнейм',
      //   title: 'Ник не должен содержать',
      //   description:
      //     'По своей сути рыбатекст является альтернативой традиционному lorem ipsum, который вызывает у некторых людей недоумение при попытках прочитать рыбу текст. В отличии от lorem ipsum, текст рыба на русском языке наполнит любой макет непонятным смыслом и придаст неповторимый колорит советских времен.',
      //   input: {
      //     helper: 'Введите новый ник',
      //     placeholder: 'Никнейм',
      //   },
      //   button: 'Изменить',
      //   price: 250,
      // },
    ],
  },
  vipsPage: {
    [VipType.BASIC]: {
      description: ['1', '2', '3'],
      durations: [
        { id: 0, days: 7, price: 1000 },
        { id: 1, days: 30, price: 2000 },
        { id: 2, days: 180, price: 5000 },
      ],
    },
    [VipType.ADVANCED]: {
      description: ['1', '2', '3'],
      durations: [
        { id: 0, days: 7, price: 1000 },
        { id: 1, days: 30, price: 2000 },
        { id: 2, days: 180, price: 5000 },
      ],
    },
    [VipType.MAXIMUM]: {
      description: ['1', '2', '3'],
      durations: [
        { id: 0, days: 7, price: 1000 },
        { id: 1, days: 30, price: 2000 },
        { id: 2, days: 180, price: 5000 },
      ],
    },
  },
  pageWarehouse: {
    categories: [],
    items: [],
  },
}

export const donateStoreSlice = createSlice({
  name: 'donateStore',
  initialState,
  reducers: {
    setTab(state, action: PayloadAction<Tab>) {
      state.tab = action.payload
    },
    setPlayerInfo(state, action: PayloadAction<DonateStorePlayerInfo>) {
      state.playerInfo = action.payload
    },
    setGiftPlayer(state, action: PayloadAction<GiftPlayer>) {
      state.giftPlayer = action.payload
    },
    setBalance(state, action: PayloadAction<{ value: number }>) {
      state.balance = action.payload.value
    },
    setStorePage(state, action: PayloadAction<StorePage>) {
      state.storePage = action.payload
    },
    setCasesPage(state, action: PayloadAction<CasesPage>) {
      state.casesPage = action.payload
    },
    setReplenishPage(state, action: PayloadAction<ReplenishPage>) {
      state.replenishPage = action.payload
    },
    setServicesPage(state, action: PayloadAction<PageServices>) {
      state.servicesPage = action.payload
    },
    setVipsPage(state, action: PayloadAction<VipsPage>) {
      state.vipsPage = action.payload
    },
    setWarehousePage(state, action: PayloadAction<PageWarehouse>) {
      state.pageWarehouse = action.payload
    },
  },
})

export const donateStoreReducer = donateStoreSlice.reducer
export const donateStoreActions = donateStoreSlice.actions
