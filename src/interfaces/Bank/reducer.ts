import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type BankState = {
  isOpen: boolean
  balance: number
  house: {
    name: string
    has: boolean
    date: string
    rent: number
  }
  business: {
    name: string
    has: boolean
    date: string
    rent: number
    balance: number
  }
  faction: {
    name: string
    has: boolean
    balance: number
  }
}

const initialState: BankState = {
  isOpen: false,
  balance: 25000,
  house: {
    name: 'Дом #52',
    has: true,
    date: '23.12.2023',
    rent: 700,
  },
  business: {
    name: 'Ферма',
    has: true,
    date: '25.12.2023',
    rent: 2000,
    balance: 325600,
  },
  faction: {
    name: 'Тёмное братство',
    has: true,
    balance: 250000,
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
    setBalance(state, action: PayloadAction<{ value: number }>) {
      state.balance = action.payload.value
    },
    setHouse(
      state,
      action: PayloadAction<{
        name: string
        has: boolean
        date: string
        rent: number
      }>,
    ) {
      state.house = action.payload
    },
    setBusiness(
      state,
      action: PayloadAction<{
        name: string
        has: boolean
        date: string
        rent: number
        balance: number
      }>,
    ) {
      state.business = action.payload
    },
    setFaction(
      state,
      action: PayloadAction<{ name: string; has: boolean; balance: number }>,
    ) {
      state.faction = action.payload
    },
  },
})

export const bankReducer = bankSlice.reducer
export const bankActions = bankSlice.actions
