import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Member } from '../../shared/ManufacturingBusiness/Member'
import { Info } from '../../shared/ManufacturingBusiness/Info'
import { Interval } from '../../shared/ManufacturingBusiness/Interval'
import { Tax } from '../../shared/ManufacturingBusiness/Tax'

type ManufacturingBusinessState = {
  isOpen: boolean
  backgroundImage: string
  info: Info
  members: Member[]
  tax: Tax
}

const initialState: ManufacturingBusinessState = {
  isOpen: false,
  backgroundImage: 'test',
  info: {
    title: 'Лесопилка',
    contracts: {
      [Interval.Day]: 1,
      [Interval.Week]: 22,
      [Interval.Month]: 333,
      [Interval.Year]: 4444,
    },
    profit: {
      [Interval.Day]: 1000,
      [Interval.Week]: 22000,
      [Interval.Month]: 333000,
      [Interval.Year]: 4444000,
    },
    maxMembers: 35,
    taxDatetime: '02.02.2025',
  },
  members: [
    {
      id: 0,
      name: 'Луцио Серая Грива',
      contracts: 999,
      profit: 100000,
      join: '01.01.2025 12:00',
      online: '01.01.2025 12:00',
    },
  ],
  tax: {
    days: { min: 1, max: 30 },
    price: 999,
  },
}

export const manufacturingBusinessSlice = createSlice({
  name: 'manufacturingBusiness',
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
    setMembers(state, action: PayloadAction<Member[]>) {
      state.members = action.payload
    },
    setTax(state, action: PayloadAction<Tax>) {
      state.tax = action.payload
    },
  },
})

export const manufacturingBusinessReducer = manufacturingBusinessSlice.reducer
export const manufacturingBusinessActions = manufacturingBusinessSlice.actions
