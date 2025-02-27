export enum Period {
  Day,
  Week,
  Month,
}

export type Statistic = {
  id: any
  name: string
  icon: string
  value: Record<Period, string>
}
