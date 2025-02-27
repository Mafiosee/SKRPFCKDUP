import { Lot } from '../../../shared/Auction/Lot'
import { LotType } from '../../../shared/Auction/LotType'
import { Sort } from '../types/Sort'

export const getFilteredLots = (
  lots: Lot[],
  activeFilter: LotType | null,
  activeSort: Sort,
  activeLocation: string | null,
) => {
  let list = [...lots]
  if (activeFilter != null) {
    list = list.filter((lot) => lot.type === activeFilter)
  }
  if (activeLocation != null) {
    list = list.filter((lot) => lot.location === activeLocation)
  }
  list.sort((lotA, lotB) => {
    switch (activeSort) {
      case Sort.Popularity: {
        const betsAmountA = lotA.bets.filter(
          (bet, index, bets) =>
            index === bets.findIndex(({ name }) => name === bet.name),
        ).length
        const betsAmountB = lotB.bets.filter(
          (bet, index, bets) =>
            index === bets.findIndex(({ name }) => name === bet.name),
        ).length
        return betsAmountB - betsAmountA
      }
      case Sort.Price: {
        return lotB.currentBet - lotA.currentBet
      }
      case Sort.Location: {
        return lotA.location.localeCompare(lotB.location)
      }
      default: {
        return 0
      }
    }
  })
  return list
}
