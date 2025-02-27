import React, { useEffect, useRef, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CSSTransition } from 'react-transition-group'
import Frame from '../../components/Frame'
import { fractionActions } from './reducer'
import { FractionEvents } from '../../shared/Fraction/events'
import Navbar from './components/Navbar'
import Player from './components/Player'
import { PageType } from '../../shared/Fraction/PageType'
import PageInfo from './Pages/Info'
import PageNews from './Pages/News'
import PageStaff from './Pages/Staff'
import PageControl from './Pages/Control'
import PageContracts from './Pages/Contracts'
import { TimeoutRef } from '../../types/timeoutRef'
import PageUpgrades from './Pages/Upgrades'
import PageBank from './Pages/Bank'
import PageEvents from './Pages/Events'
import PageHistory from './Pages/History'
import { Backgrounds } from './assets/backgrounds'
import PageAds from './Pages/Ads'
import PageCivilWar from './Pages/CivilWar'
import { FactionConfig } from '../../shared/Fraction/FactionConfig'
import PageWanted from './Pages/Wanted'
import { useEscClose } from '../../hooks/useEscClose'

const Fraction = () => {
  const dispatch = useAppDispatch()
  const { isOpen, title, factionHash, pages } = useAppSelector(
    (state) => state.fraction,
  )
  const nodeRef = useRef(null)
  const [page, setPage] = useState<PageType | null>(null)
  const timeoutRef = useRef<TimeoutRef>(null)
  const [tick, setTick] = useState(false)

  useEscClose({ isOpenInterface: isOpen, closeEvent: FractionEvents.Close })

  useEffect(() => {
    if (
      page === PageType.Info ||
      pages.find((page) => page.type === PageType.Info) == null
    ) {
      return
    }
    setPage(PageType.Info)
  }, [isOpen])

  useEffect(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
    }
    if (!isOpen) {
      return
    }
    dispatch(fractionActions.decrementTimes())
    if (isOpen) {
      timeoutRef.current = setTimeout(() => setTick((prev) => !prev), 1000)
    }
  }, [dispatch, isOpen, tick])

  return (
    <CSSTransition
      in={isOpen}
      timeout={0}
      mountOnEnter
      unmountOnExit
      classNames="Fraction"
      nodeRef={nodeRef}
    >
      <div className="Fraction" ref={nodeRef}>
        <div className="window">
          <Frame
            imageUrl={Backgrounds[`${FactionConfig[factionHash].bg}.png`]}
            color={FactionConfig[factionHash].color}
            title={title}
            closeEvent={FractionEvents.Close}
          />
          <div className="content">
            <div className="row">
              <Navbar page={page} setPage={setPage} />
              <Player />
            </div>
            <div className="page">
              {page === PageType.Info && <PageInfo />}
              {page === PageType.News && <PageNews />}
              {page === PageType.Staff && <PageStaff />}
              {page === PageType.Control && <PageControl />}
              {page === PageType.Contracts && <PageContracts />}
              {page === PageType.Upgrades && <PageUpgrades />}
              {page === PageType.Bank && <PageBank />}
              {page === PageType.Events && <PageEvents />}
              {page === PageType.History && <PageHistory />}
              {page === PageType.Ads && <PageAds />}
              {page === PageType.CivilWar && <PageCivilWar />}
              {page === PageType.Wanted && <PageWanted />}
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}

export default Fraction
