import React, { useMemo } from 'react'
import './styles.sass'
import { useAppSelector } from '../../../../hooks/redux'
import Lot from '../Lot'
import { Tab } from '../../types/Tabs'
import { getFilteredLots } from '../../utils/getFilteredLots'

const LotsList: React.FC = () => {
  const {
    activeTab,
    activeFilter,
    activeSort,
    lots,
    selfBets,
    locations,
    activeLocationIndex,
  } = useAppSelector((state) => state.auction)

  const renderedLots = useMemo(() => {
    const list = getFilteredLots(
      lots,
      activeFilter,
      activeSort,
      // @ts-expect-error qwe
      locations[activeLocationIndex] ?? activeLocationIndex,
    )
      .filter((lot) => {
        switch (activeTab) {
          case Tab.SelfBets:
            return selfBets.find((bet) => bet.lotId === lot.id) != null
          case Tab.SelfLots:
            return lot?.isSelf
          case Tab.Favorites:
            return lot?.isFavorite
          default:
            return true
        }
      })
      .map((lot) => <Lot key={lot.id} lot={lot} />)
    let minAmount = 15
    if (activeTab === Tab.Lots) {
      minAmount = 12
    }
    if (list.length < minAmount) {
      list.push(
        ...new Array(minAmount - list.length)
          .fill(null)
          .map((_, index) => <Lot key={`empty-${index}`} isEmpty={true} />),
      )
    }
    return list
  }, [
    lots,
    activeTab,
    selfBets,
    activeFilter,
    activeSort,
    locations,
    activeLocationIndex,
  ])

  return (
    <div className={`LotsList ${activeTab === Tab.Lots && '-small'}`}>
      {renderedLots}
    </div>
  )
}

export default LotsList
