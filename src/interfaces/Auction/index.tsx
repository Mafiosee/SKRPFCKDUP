import React, { useEffect, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useEscClose } from '../../hooks/useEscClose'
import { AuctionEvents } from '../../shared/Auction/events'
import { callClient } from '../../utils/api'
import { TabId } from './types/Tabs'
import Header from './components/Header'
import Categories from './components/Categories'
import { LotType } from '../../shared/Auction/LotType'
import LotList from './components/LotList'
import LotInfo from './components/LotInfo'
import { auctionActions } from './reducer'
import BetLot from './components/BetLot'
import CreateLot from './components/CreateLot'

const Auctions: React.FC = () => {
  const dispatch = useAppDispatch()
  const { isOpen, lots } = useAppSelector((state) => state.auction)
  useEscClose({
    isOpenInterface: isOpen,
    closeEvent: AuctionEvents.CloseRequest,
  })
  const [activeTabId, setActiveTabId] = useState(TabId.Main)
  const [activeCategoryId, setActiveCategoryId] = useState<LotType | null>(null)
  const [activeLotId, setActiveLotId] = useState<number | null>(null)
  const [tick, setTick] = useState(false)
  const [openedBetLotId, setOpenedBetLotId] = useState<number | null>(null)
  const [openedCreateLot, setOpenedCreateLot] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      return
    }
    setTimeout(() => {
      setTick((prev) => !prev)
      dispatch(auctionActions.decrementTimers())
    }, 1000)
  }, [isOpen, tick])

  useEffect(() => {
    setActiveTabId(TabId.Main)
    setActiveCategoryId(null)
    setOpenedBetLotId(null)
    setOpenedCreateLot(false)
  }, [isOpen])

  const isOpenEmptySelfLots =
    activeTabId === TabId.SelfLots && !lots.filter((lot) => lot.isSelf).length

  return isOpen ? (
    <div className="Auction">
      <div className="background">
        <div className="shadow" />
        <div className="image" />
      </div>
      <div className={`window ${isOpenEmptySelfLots && '-empty'}`}>
        <div className="content">
          <Header
            activeTabId={activeTabId}
            setActiveTabId={(tabId: TabId) => setActiveTabId(tabId)}
            openCreateLot={() => setOpenedCreateLot(true)}
          />
          <LotInfo
            activeTabId={activeTabId}
            activeLotId={activeLotId}
            openBet={() => setOpenedBetLotId(activeLotId)}
          />
          <Categories
            activeTabId={activeTabId}
            activeCategoryId={activeCategoryId}
            setActiveCategoryId={(categoryId: LotType | null) =>
              setActiveCategoryId(categoryId)
            }
          />
          <LotList
            activeTabId={activeTabId}
            activeCategoryId={activeCategoryId}
            activeLotId={activeLotId}
            setActiveLotId={(lotId: number | null) => setActiveLotId(lotId)}
          />
          {isOpenEmptySelfLots && (
            <div className="empty">
              <div className="icon" />
              <div className="text">
                у вас еще нет созданных лотов, но вы можете
                <span>создать первый</span>
              </div>
            </div>
          )}
        </div>
        <div className="title">Аукцион</div>
        <div
          className="close"
          onClick={() => callClient(AuctionEvents.CloseRequest)}
        />
      </div>

      <BetLot
        openedBetLotId={openedBetLotId}
        close={() => setOpenedBetLotId(null)}
      />
      <CreateLot
        opened={openedCreateLot}
        close={() => setOpenedCreateLot(false)}
      />
    </div>
  ) : null
}

export default Auctions
