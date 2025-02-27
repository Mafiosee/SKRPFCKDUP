import React, { useCallback, useEffect, useRef } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { AuctionEvents } from '../../shared/Auction/events'
import Header from './components/Header'
import { Tab } from './types/Tabs'
import { KeyCodes } from '../../utils/keyCodes'
import TabLots from './components/TabLots'
import LotsBlock from './components/LotsBlock'
import { auctionActions } from './reducer'
import PopupOpenedLot from './components/PopupOpenedLot'
import PopupCreateLot from './components/PopupCreateLot'
import { IntervalRef } from '../../types/intervalRef'
import { callClient } from '../../utils/api'

const Auctions: React.FC = () => {
  const dispatch = useAppDispatch()
  const { isOpen, activeTab, openedLotId, openedCreateLot, lots, locations } =
    useAppSelector((state) => state.auction)
  const intervalRef = useRef<IntervalRef>(null)

  useEffect(() => {
    if (intervalRef.current != null) {
      clearInterval(intervalRef.current)
    }
    if (!isOpen) {
      return
    }
    intervalRef.current = setInterval(
      () => dispatch(auctionActions.decrementSecondsLeft()),
      1000,
    )
  }, [isOpen, lots])

  useEffect(() => {
    const newLocations: string[] = []
    lots.forEach((lot) => {
      if (!newLocations.includes(lot.location)) {
        newLocations.push(lot.location)
      }
    })
    newLocations.sort((a, b) => a.localeCompare(b))
    if (JSON.stringify(locations) === JSON.stringify(newLocations)) {
      return
    }
    dispatch(auctionActions.setLocations(newLocations))
    dispatch(auctionActions.setActiveLocationIndex(null))
  }, [lots])

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen) {
        return
      }
      switch (event.keyCode) {
        case KeyCodes.Q: {
          const tabsList = Object.values(Tab)
          const activeTabIndex = tabsList.findIndex((tab) => tab === activeTab)
          let newActiveTabIndex = activeTabIndex - 1
          if (newActiveTabIndex < 0) {
            newActiveTabIndex = 0
          }
          dispatch(auctionActions.setActiveTab(tabsList[newActiveTabIndex]))
          break
        }
        case KeyCodes.E: {
          const tabsList = Object.values(Tab)
          const activeTabIndex = tabsList.findIndex((tab) => tab === activeTab)
          let newActiveTabIndex = activeTabIndex + 1
          const maxIndex = tabsList.length - 1
          if (newActiveTabIndex > maxIndex) {
            newActiveTabIndex = maxIndex
          }
          dispatch(auctionActions.setActiveTab(tabsList[newActiveTabIndex]))
          break
        }
        case KeyCodes.Esc: {
          if (openedLotId != null) {
            dispatch(auctionActions.setOpenedLotId(null))
          } else if (openedCreateLot) {
            dispatch(auctionActions.setOpenedCreateLot(false))
          } else {
            callClient(AuctionEvents.CloseRequest)
          }
        }
      }
    },
    [activeTab, isOpen, openedLotId, openedCreateLot],
  )

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp)
    return () => {
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyUp])

  const getCurrentTab = () => {
    switch (activeTab) {
      case Tab.Lots:
        return <TabLots />
      default:
        return <LotsBlock />
    }
  }

  return isOpen ? (
    <div className="Auction">
      <div className="background" />
      <div className="content">
        <Header
          activeTab={activeTab}
          setActiveTab={(tab: Tab) =>
            dispatch(auctionActions.setActiveTab(tab))
          }
        />
        {getCurrentTab()}
      </div>
      <PopupOpenedLot />
      <PopupCreateLot />
    </div>
  ) : null
}

export default Auctions
