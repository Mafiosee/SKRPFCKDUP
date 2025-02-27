import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { Lot } from '../../shared/Auction/Lot'
import { SelfBet } from '../../shared/Auction/SelfBet'
import { LotType } from '../../shared/Auction/LotType'
import { Property } from '../../shared/Auction/Property'

type State = {
  isOpen: boolean
  lots: Lot[]
  selfBets: SelfBet[]
  property: Property[]
}

const initialState: State = {
  isOpen: false,
  lots: [],
  selfBets: [],
  property: [],
}

export const auctionSlice = createSlice({
  name: 'auction',
  initialState,
  reducers: {
    show(state) {
      state.isOpen = true
    },
    hide(state) {
      state.isOpen = false
    },

    /** Lots */
    setLots(state, action: PayloadAction<Lot[]>) {
      state.lots = action.payload
    },
    addLot(state, action: PayloadAction<Lot>) {
      state.lots.push(action.payload)
    },
    updateLot(state, action: PayloadAction<Lot>) {
      const lotIndex = state.lots.findIndex(
        (lot) => lot.id === action.payload.id,
      )
      if (!~lotIndex) {
        return
      }
      state.lots[lotIndex] = {
        ...state.lots[lotIndex],
        ...action.payload,
      }
    },
    removeLot(state, action: PayloadAction<{ lotId: number }>) {
      const lotIndex = state.lots.findIndex(
        (lot) => lot.id === action.payload.lotId,
      )
      if (!~lotIndex) {
        return
      }
      state.lots.splice(lotIndex, 1)
    },

    /** SelfBets */
    setSelfBets(state, action: PayloadAction<SelfBet[]>) {
      state.selfBets = action.payload
    },
    addSelfBets(state, action: PayloadAction<SelfBet>) {
      state.selfBets.push(action.payload)
    },
    updateSelfBets(state, action: PayloadAction<SelfBet>) {
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
    removeSelfBets(state, action: PayloadAction<{ betId: number }>) {
      const betIndex = state.selfBets.findIndex(
        (bet) => bet.id === action.payload.betId,
      )
      if (!~betIndex) {
        return
      }
      state.selfBets.splice(betIndex, 1)
    },

    /** Property */
    setProperty(state, action: PayloadAction<Property[]>) {
      state.property = action.payload
    },

    /** Only front */
    decrementTimers(state) {
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
