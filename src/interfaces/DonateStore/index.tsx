import './styles.sass'
import React, { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import PlayerInfo from './components/PlayerInfo'
import Balance from './components/Balance'
import Navbar from './components/Navbar'
import PageStore from './pages/Store'
import OpenedProduct from './components/OpenedProduct'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import PageCases from './pages/Cases'
import OpenedCase from './components/OpenedCase'
import PageReplenish from './pages/Replenish'
import PageVips from './pages/Vips'
import PageServices from './pages/Services'
import PageWarehouse from './pages/Warehouse'

type Props = {
  isShow: boolean
}

const DonateStore: React.FC<Props> = ({ isShow }) => {
  const dispatch = useAppDispatch()
  const { tab } = useAppSelector((state) => state.donateStore)
  const [openedProductId, setOpenedProductId] = useState(null)
  const [openedCaseId, setOpenedCaseId] = useState(null)

  useEffect(() => {
    setOpenedProductId(null)
    setOpenedCaseId(null)
  }, [dispatch, isShow, tab])

  return (
    <CSSTransition
      in={isShow}
      timeout={0}
      mountOnEnter
      unmountOnExit
      classNames="DonateStore"
    >
      <div className="DonateStore">
        <div className="title">Магазин</div>
        <div className="content">
          <div
            className={`body ${(openedProductId != null || openedCaseId != null) && '-hidden'}`}
          >
            <div className="header">
              <PlayerInfo />
              <Navbar />
              <Balance />
            </div>
            <div className="pages">
              <PageStore setOpenedProductId={setOpenedProductId} />
              <PageCases setOpenedCaseId={setOpenedCaseId} />
              <PageReplenish />
              <PageServices />
              <PageVips />
              <PageWarehouse />
            </div>
          </div>

          <OpenedProduct
            isShow={openedProductId !== null}
            productId={openedProductId}
            close={() => setOpenedProductId(null)}
          />

          <OpenedCase
            isShow={openedCaseId !== null}
            caseId={openedCaseId}
            close={() => setOpenedCaseId(null)}
          />
        </div>
      </div>
    </CSSTransition>
  )
}

export default DonateStore
