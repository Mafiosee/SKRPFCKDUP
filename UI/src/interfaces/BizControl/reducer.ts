import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  ChartItem,
  RentItem,
  StaffControlItem,
  StaffListItem,
  StaffType,
  StatisticItem,
} from './types'
import { Period } from '../../shared/ProductBusiness/Statistic'

type BizControlState = {
  isOpen: boolean
  bgImage: string
  owner: string
  balance: number
  charts: {
    [Period.Day]: ChartItem[]
    [Period.Week]: ChartItem[]
    [Period.Month]: ChartItem[]
  }
  rentSum: number
  rentList: RentItem[]
  statistic: StatisticItem[]
  staffList: StaffListItem[]
  staffControl: StaffControlItem[]
}

const initialState: BizControlState = {
  isOpen: false,
  bgImage: 'Sawmill',
  owner: 'Люцио Серая Грива',
  balance: 999999,
  charts: {
    [Period.Day]: [
      { time: '00:00', balance: 1000, diff: -1000 },
      { time: '04:00', balance: 3500, diff: 2500 },
      { time: '08:00', balance: 30000, diff: 26500 },
      { time: '12:00', balance: 8000, diff: -22000 },
      { time: '06:00', balance: 40000, diff: 32000 },
      { time: '20:00', balance: 15000, diff: -25000 },
    ],
    [Period.Week]: [],
    [Period.Month]: [],
  },
  rentSum: 3000,
  rentList: [{ datetime: '03.11.2023 12:32', sum: 3000 }],
  statistic: [
    {
      name: 'Люцио Серая Грива',
      role: 'Роль игрока',
      profitFaction: 999999,
      profitBiz: 999999,
      period: Period.Day,
    },
    {
      name: 'Люцио Серая Грива',
      role: 'Роль игрока',
      profitFaction: 888888,
      profitBiz: 888888,
      period: Period.Week,
    },
    {
      name: 'Люцио Серая Грива',
      role: 'Роль игрока',
      profitFaction: 777777,
      profitBiz: 777777,
      period: Period.Month,
    },
  ],
  staffList: [
    { name: 'Люцио Серая Грива', type: StaffType.Employee },
    { name: 'Люцио Серая Грива', type: StaffType.Worker },
  ],
  staffControl: [
    {
      id: 0,
      name: 'Люцио Серая Грива',
      rank: { title: 'Руководитель', number: 12 },
    },
  ],
}

export const bizControlSlice = createSlice({
  name: 'bizControl',
  initialState,
  reducers: {
    show(state) {
      state.isOpen = true
    },
    hide(state) {
      state.isOpen = false
    },
    setBgImage(state, action: PayloadAction<string>) {
      state.bgImage = action.payload
    },
    setOwner(state, action: PayloadAction<string>) {
      state.owner = action.payload
    },
    setBalance(state, action: PayloadAction<{ value: number }>) {
      state.balance = action.payload.value
    },
    setRentSum(state, action: PayloadAction<{ value: number }>) {
      state.rentSum = action.payload.value
    },
    setRentList(state, action: PayloadAction<RentItem[]>) {
      state.rentList = action.payload
    },
    addRentItem(state, action: PayloadAction<RentItem>) {
      state.rentList.unshift(action.payload)
    },
    setStatistic(state, action: PayloadAction<StatisticItem[]>) {
      state.statistic = action.payload
    },
    setStaffList(state, action: PayloadAction<StaffListItem[]>) {
      state.staffList = action.payload
    },
    setStaffControl(state, action: PayloadAction<StaffControlItem[]>) {
      state.staffControl = action.payload
    },
    setChart(
      state,
      action: PayloadAction<{ period: Period; chart: ChartItem[] }>,
    ) {
      const { period, chart } = action.payload
      state.charts[period] = chart
    },
  },
})

export const bizControlReducer = bizControlSlice.reducer
export const bizControlActions = bizControlSlice.actions
