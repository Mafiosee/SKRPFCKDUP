import React, { useMemo } from 'react'
import './styles.sass'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { Tab, TabName } from '../../types/Tabs'
import { auctionActions } from '../../reducer'
import { LotType } from '../../../../shared/Auction/LotType'

type Props = {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
}

const Header: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const dispatch = useAppDispatch()
  const { balance, property } = useAppSelector((state) => state.auction)

  const filteredLotTypesByProperty = useMemo(
    () =>
      Object.values(LotType).filter((lotType) =>
        property.some((property) => property.type === lotType),
      ),
    [property],
  )

  const renderedTabs = useMemo(
    () =>
      Object.values(Tab).map((tab) => {
        const isActive = activeTab === tab
        const setActive = () => setActiveTab(tab)

        return (
          <div
            key={tab}
            className={`tab ${isActive && '-active'}`}
            onClick={setActive}
          >
            {TabName[tab]}
          </div>
        )
      }),
    [activeTab],
  )

  return (
    <div className="Header">
      <div className="logo">
        <div className="image" />
        <div className="text" />
      </div>
      <div
        className={`create ${!filteredLotTypesByProperty.length && '-disabled'}`}
        onClick={() => {
          if (!filteredLotTypesByProperty.length) {
            return
          }
          dispatch(auctionActions.setOpenedCreateLot(true))
        }}
      />
      <div className="tabs">
        <div className="helper -key-q" />
        <div className="list">{renderedTabs}</div>
        <div className="helper -key-e" />
      </div>
      <div className="info">
        <div className="balance">
          <div className="item -cash">
            {numberWithSeparator(balance.bank, '.')}
          </div>
          <div className="item -bank">
            {numberWithSeparator(balance.cash, '.')}
          </div>
        </div>
        <div className="exit">Выйти</div>
      </div>
    </div>
  )
}

export default Header
