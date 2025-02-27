import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { Tab } from './types/Tabs'
import { Sort } from './types/Sort'
import { LotType } from '../../shared/Auction/LotType'
import { Lot } from '../../shared/Auction/Lot'
import { SelfBet } from '../../shared/Auction/SelfBet'
import { LotId } from '../../shared/Auction/LotId'
import { Property } from '../../shared/Auction/Property'

type State = {
  isOpen: boolean
  balance: {
    cash: number
    bank: number
  }
  lots: Lot[]
  selfBets: SelfBet[]
  mostPopularLotId: LotId | null
  property: Property[]

  /** Only Front */
  activeTab: Tab
  activeFilter: LotType | null
  activeSort: Sort
  locations: string[]
  activeLocationIndex: number | null
  openedLotId: LotId | null
  openedCreateLot: boolean
}

const initialState: State = {
  isOpen: false,
  balance: {
    cash: 0,
    bank: 0,
  },
  lots: [
    // {
    //   id: 0,
    //   image: 'alchemyShop_2',
    //   location: 'Вильхейм',
    //   position: {
    //     x: 22053,
    //     y: -41355,
    //   },
    //   name: 'Торговая лавка',
    //   type: LotType.Business,
    //   owner: 'Дольвази Саретари',
    //   secondsLeft: 8 * 60 * 60 + 38 * 60,
    //   currentBet: 101000000,
    //   startBet: 90000000,
    //   minimalBet: 105000000,
    //   statePrice: 9000000,
    //   bets: [
    //     { bet: 91000000, name: 'Серая Грива', datetime: '31.01.2025 12:51' },
    //     { bet: 92000000, name: 'Красный Хвост', datetime: '31.01.2025 12:54' },
    //     { bet: 93000000, name: 'Серая Грива', datetime: '31.01.2025 12:58' },
    //   ],
    //   createdAt: '31.01.2025 12:49',
    //   isSelf: true,
    // },
    // {
    //   id: 1,
    //   image: 'alchemyShop_1',
    //   location: 'Рифтен',
    //   position: {
    //     x: 20000,
    //     y: -6000,
    //   },
    //   name: 'Торговая лавка 1',
    //   type: LotType.Business,
    //   owner: 'Дольвази Саретари',
    //   secondsLeft: 8 * 60 * 60 + 38 * 60,
    //   currentBet: 100000000,
    //   startBet: 90000000,
    //   minimalBet: 105000000,
    //   statePrice: 9000000,
    //   bets: [
    //     { bet: 91000000, name: 'Серая Грива', datetime: '31.01.2025 12:51' },
    //     { bet: 92000000, name: 'Красный Хвост', datetime: '31.01.2025 12:54' },
    //     { bet: 93000000, name: 'Синий Воротник', datetime: '31.01.2025 12:56' },
    //   ],
    //   createdAt: '31.01.2025 12:48',
    //   isFavorite: true,
    // },
  ],
  selfBets: [
    // {
    //   id: 1,
    //   lotId: 1,
    //   sum: 92000000,
    //   lost: true,
    // },
  ],
  mostPopularLotId: 0,
  property: [
    // {
    //   id: 0,
    //   image: 'test-1',
    //   type: LotType.Business,
    //   name: 'Торговая лавка #1',
    //   statePrice: 120000000,
    // },
    // {
    //   id: 1,
    //   image: 'test-0',
    //   type: LotType.Business,
    //   name: 'Торговая лавка #2',
    //   statePrice: 90000000,
    // },
    // {
    //   id: 2,
    //   image: 'test-1',
    //   type: LotType.House,
    //   name: 'Дом #444',
    //   statePrice: 36000000,
    // },
  ],

  /** Only Front */
  activeTab: Tab.Lots,
  activeFilter: null,
  activeSort: Sort.Popularity,
  locations: [],
  activeLocationIndex: null,
  openedLotId: null,
  openedCreateLot: false,
}

export const auctionSlice = createSlice({
  name: 'auction',
  initialState,
  reducers: {
    show(state) {
      state.isOpen = true
      state.activeTab = Tab.Lots
      state.activeFilter = null
      state.activeSort = Sort.Popularity
      state.openedLotId = null
      state.openedCreateLot = false
    },
    hide(state) {
      state.isOpen = false
    },
    setBalance(state, action: PayloadAction<typeof initialState.balance>) {
      state.balance = action.payload
    },
    setLots(state, action: PayloadAction<Lot[]>) {
      state.lots = action.payload
    },
    addLot(state, action: PayloadAction<Lot>) {
      state.lots.push(action.payload)
    },
    removeLot(state, action: PayloadAction<{ lotId: LotId }>) {
      const lotIndex = state.lots.findIndex(
        (lot) => lot.id === action.payload.lotId,
      )
      if (!~lotIndex) {
        return
      }
      state.lots.splice(lotIndex, 1)
    },
    updateLot(state, action: PayloadAction<Partial<Lot>>) {
      const lotIndex = state.lots.findIndex(
        (lot) => lot.id === action.payload.id,
      )
      if (!~lotIndex) {
        return
      }
      state.lots[lotIndex] = { ...state.lots[lotIndex], ...action.payload }
    },
    setSelfBets(state, action: PayloadAction<typeof initialState.selfBets>) {
      state.selfBets = action.payload
    },
    addSelfBet(state, action: PayloadAction<SelfBet>) {
      state.selfBets.push(action.payload)
    },
    removeBet(state, action: PayloadAction<{ betId: any }>) {
      const betIndex = state.selfBets.findIndex(
        (bet) => bet.id === action.payload.betId,
      )
      if (!~betIndex) {
        return
      }
      state.selfBets.splice(betIndex, 1)
    },
    updateBet(state, action: PayloadAction<Partial<SelfBet>>) {
      const betIndex = state.selfBets.findIndex(
        (bet) => bet.id === action.payload.id,
      )
      if (!~betIndex) {
        return
      }
      state.selfBets[betIndex] = {
        ...state.selfBets[betIndex],
        ...action.payload,
      }
    },
    setMostPopularLotId(
      state,
      action: PayloadAction<typeof initialState.mostPopularLotId>,
    ) {
      state.mostPopularLotId = action.payload
    },
    setProperty(state, action: PayloadAction<typeof initialState.property>) {
      state.property = action.payload
    },

    /** Only Front */
    setActiveTab(state, action: PayloadAction<typeof initialState.activeTab>) {
      state.activeTab = action.payload
      state.activeFilter = null
      state.activeSort = Sort.Popularity
    },
    setActiveFilter(
      state,
      action: PayloadAction<typeof initialState.activeFilter>,
    ) {
      state.activeFilter = action.payload
    },
    setActiveSort(
      state,
      action: PayloadAction<typeof initialState.activeSort>,
    ) {
      state.activeSort = action.payload
    },
    setLocations(state, action: PayloadAction<typeof initialState.locations>) {
      state.locations = action.payload
    },
    setActiveLocationIndex(
      state,
      action: PayloadAction<typeof initialState.activeLocationIndex>,
    ) {
      state.activeLocationIndex = action.payload
    },
    setOpenedLotId(
      state,
      action: PayloadAction<typeof initialState.openedLotId>,
    ) {
      state.openedLotId = action.payload
    },
    setOpenedCreateLot(
      state,
      action: PayloadAction<typeof initialState.openedCreateLot>,
    ) {
      state.openedCreateLot = action.payload
    },
    decrementSecondsLeft(state) {
      state.lots.forEach((lot, index) => {
        if (lot.secondsLeft > 0) {
          state.lots[index].secondsLeft--
        }
      })
    },
  },
})

export const auctionReducer = auctionSlice.reducer
export const auctionActions = auctionSlice.actions
