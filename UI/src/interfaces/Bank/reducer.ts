import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Balance } from '../../shared/Bank/Balance'
import { Limits } from '../../shared/Bank/Limits'

type BankState = {
  isOpen: boolean
  title: string
  balance: Balance
  limits: Limits
  house: {
    name: string
    has: boolean
    date: string
    rent: number
    image: string
  }
  business: {
    name: string
    has: boolean
    date: string
    rent: number
    balance: number
    image: string
  }
  faction: {
    name: string
    has: boolean
    balance: number
    image: string
  }
}

const initialState: BankState = {
  isOpen: false,
  title: '',
  balance: {
    cash: 0,
    bank: 0,
  },
  limits: {
    replenishMin: 0,
    withdrawMin: 0,
    houseDaysMax: 0,
    businessReplenishMin: 0,
    businessWithdrawMin: 0,
    businessDaysMax: 0,
    factionReplenishMin: 0,
    factionWithdrawMin: 0,
  },
  house: {
    name: '',
    has: false,
    date: '',
    rent: 0,
    image: '',
  },
  business: {
    name: '',
    has: false,
    date: '',
    rent: 0,
    balance: 0,
    image: '',
  },
  faction: {
    name: '',
    has: false,
    balance: 0,
    image: '',
  },
}

export const bankSlice = createSlice({
  name: 'bank',
  initialState,
  reducers: {
    show(state) {
      state.isOpen = true
    },
    hide(state) {
      state.isOpen = false
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload
    },
    setBalance(state, action: PayloadAction<typeof initialState.balance>) {
      state.balance = action.payload
    },
    setLimits(state, action: PayloadAction<typeof initialState.limits>) {
      state.limits = action.payload
    },
    setHouse(state, action: PayloadAction<typeof initialState.house>) {
      state.house = action.payload
    },
    setBusiness(state, action: PayloadAction<typeof initialState.business>) {
      state.business = action.payload
    },
    setFaction(state, action: PayloadAction<typeof initialState.faction>) {
      state.faction = action.payload
    },
  },
})

export const bankReducer = bankSlice.reducer
export const bankActions = bankSlice.actions
