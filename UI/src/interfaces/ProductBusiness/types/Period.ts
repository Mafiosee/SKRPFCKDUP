import { Period } from "../../../shared/ProductBusiness/Statistic"

export const PeriodName: Record<Period, string> = {
  [Period.Day]: 'День (по часам)',
  [Period.Week]: 'Неделя',
  [Period.Month]: 'Месяц',
}

export const PeriodList = [Period.Day, Period.Week, Period.Month]
