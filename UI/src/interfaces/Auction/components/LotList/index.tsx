import React, { useEffect, useMemo, useRef } from 'react'
import './styles.sass'
import { TabId } from '../../types/Tabs'
import { useAppSelector } from '../../../../hooks/redux'
import { LotType } from '../../../../shared/Auction/LotType'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'
import { Lot } from '../../../../shared/Auction/Lot'
import { SelfBet } from '../../../../shared/Auction/SelfBet'

type Props = {
  activeTabId: TabId
  activeCategoryId: LotType | null
  activeLotId: number | null
  setActiveLotId: (lotId: number | null) => void
}

const LotList: React.FC<Props> = ({
  activeTabId,
  activeCategoryId,
  activeLotId,
  setActiveLotId,
}) => {
  const { lots, selfBets } = useAppSelector((state) => state.auction)
  const activeLotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimeout(() => {
      if (activeLotRef.current == null) {
        return
      }
      activeLotRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'center',
      })
    }, 100)
  }, [activeLotRef.current])

  const lotList = useMemo(() => {
    let list: (Lot & { bet?: SelfBet })[] = []

    if (activeTabId === TabId.SelfBets) {
      selfBets.forEach((bet) => {
        const lot = lots.find((lot) => lot.id === bet.lotId)
        if (lot != null) {
          list.push({ ...lot, bet })
        }
      })
    } else {
      list = lots.filter((lot) => {
        switch (activeTabId) {
          case TabId.SelfLots:
            return lot?.isSelf
          default: {
            return lot.opened
          }
        }
      })
    }

    return list.filter((lot) => {
      if (activeCategoryId == null) {
        return true
      } else {
        return activeCategoryId === lot.type
      }
    })
  }, [activeCategoryId, activeTabId, lots, selfBets])

  const activeLotIndex = useMemo(
    () => lotList.findIndex((lot) => lot.id === activeLotId),
    [activeLotId, lotList],
  )

  useEffect(() => {
    if (!lotList.length) {
      setActiveLotId(null)
      return
    }

    const activeLot = lotList.find((lot) => lot.id === activeLotId)

    if (activeLot) {
      return
    }

    setActiveLotId(lotList[0]?.bet ? lotList[0].bet.id : lotList[0].id)
  }, [activeLotId, lotList, setActiveLotId])

  const renderedLots = useMemo(
    () =>
      lotList.map((lot) => {
        const isActive = activeLotId === (lot.bet?.id ?? lot.id)
        const setActive = () => setActiveLotId(lot.bet?.id ?? lot.id)

        let number = lot.id.toString()
        while (number.length < 4) {
          number = `0${number}`
        }

        let betTitle = 'Текущая ставка'
        switch (activeTabId) {
          case TabId.SelfBets: {
            betTitle = 'Ваша ставка'
            break
          }
          case TabId.SelfLots: {
            betTitle = lot.opened ? 'Идут торги' : 'Продано за'
            break
          }
        }

        return (
          <div
            key={lot.bet?.id ?? lot.id}
            className={`lot ${isActive && '-active'}`}
            onClick={setActive}
            ref={isActive ? activeLotRef : undefined}
          >
            <div className="content">
              <div className="header">
                <div className="row">
                  <div className="number">
                    <div className="title">Лот:</div>
                    <div className="value">{number}</div>
                  </div>
                  {activeTabId !== TabId.Main && (
                    <>
                      <div className="separator" />
                      <div className="status">
                        {lot.opened ? 'Открыт' : 'Закрыт'}
                      </div>
                    </>
                  )}
                </div>
                {lot.bets.length > 0 && (
                  <div className="bets-amount">
                    {
                      lot.bets.filter(
                        (bet, index, bets) =>
                          index ===
                          bets.findIndex(({ name }) => name === bet.name),
                      ).length
                    }
                  </div>
                )}
              </div>
              <div className="info">
                <div className="name">{lot.name}</div>
                <div className="bet">
                  <div className="title">{betTitle}:</div>
                  <div
                    className={`value ${activeTabId === TabId.SelfBets && '-win'} ${lot.bet?.lost && '-lost'}`}
                  >
                    {numberWithSeparator(
                      activeTabId === TabId.SelfBets
                        ? lot.bet?.sum ?? 0
                        : lot.currentBet,
                      '.',
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }),
    [activeLotId, activeTabId, lotList, setActiveLotId],
  )

  const changeActiveLot = (diff: number) => {
    const currentLotIndex = lotList.findIndex((lot) => lot.id === activeLotId)
    let newLotIndex = currentLotIndex + diff
    const lastIndex = lotList.length - 1
    if (newLotIndex < 0) {
      newLotIndex = lastIndex
    }
    if (newLotIndex > lastIndex) {
      newLotIndex = 0
    }
    const newActiveLotId = lotList.length ? lotList[newLotIndex].id : null
    setActiveLotId(newActiveLotId)
  }

  return activeTabId === TabId.SelfLots && !lotList.length ? null : (
    <div className="LotList">
      {!lotList.length && (
        <div className="empty">Лоты в данной категории отсутствуют</div>
      )}
      <div
        className={`list ${lotList.length > 3 && lotList.length - activeLotIndex > 2 && '-mask'}`}
      >
        <div className="line">
          <div className="lots">{renderedLots}</div>
        </div>
      </div>
      <div className="arrows">
        <div className="arrow" onClick={() => changeActiveLot(-1)} />
        <div className="arrow" onClick={() => changeActiveLot(1)} />
      </div>
    </div>
  )
}

export default LotList
