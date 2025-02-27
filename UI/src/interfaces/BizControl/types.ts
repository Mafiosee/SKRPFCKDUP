import { Period } from "../../shared/ProductBusiness/Statistic"

export enum Page {
  Bank,
  Rent,
  Statistic,
  StaffList,
  StaffControl,
}

export enum StaffType {
  Employee,
  Worker,
}

export type ChartItem = {
  time: string
  balance: number
  diff: number
}

export type RentItem = {
  datetime: string
  sum: number
}

export type StatisticItem = {
  name: string
  role: string
  profitFaction: number
  profitBiz: number
  period: Period
}

export type StaffListItem = {
  name: string
  type: StaffType
}

export type StaffControlItem = {
  id: any
  name: string
  rank: { title: string; number: number }
}
