import React, { useMemo } from 'react'
import './styles.sass'
import { TabId } from '../../types/Tabs'
import { useAppSelector } from '../../../../hooks/redux'
import { LotTypeName } from '../../types/LotType'
import { getTimeString } from '../../../../utils/time'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'
import {
  AuctionEvents,
  AuctionPayloads,
} from '../../../../shared/Auction/events'
import { callClient } from '../../../../utils/api'

type Props = {
  activeTabId: TabId
  activeLotId: number | null
  openBet: () => void
}

const LotInfo: React.FC<Props> = ({ activeTabId, activeLotId, openBet }) => {
  const { lots, selfBets } = useAppSelector((state) => state.auction)

  const lot = useMemo(() => {
    switch (activeTabId) {
      case TabId.SelfBets: {
        const bet = selfBets.find((bet) => bet.id === activeLotId)
        return lots.find((lot) => lot.id === bet?.lotId)
      }
      default: {
        return lots.find((lot) => lot.id === activeLotId)
      }
    }
  }, [activeTabId, activeLotId, lots, selfBets])

  const number = useMemo(() => {
    if (!lot) {
      return ''
    }
    let number = lot.id.toString()

    while (number.length < 4) {
      number = `0${number}`
    }

    return number
  }, [lot])

  const handleMark = () => {
    const payload: AuctionPayloads[AuctionEvents.PointRequest] = {
      lotId: lot?.id ?? -1,
    }
    callClient(AuctionEvents.PointRequest, payload)
  }

  return lot ? (
    <div className="LotInfo">
      <div className="info">
        <div className="number">
          <div className="title">Лот:</div>
          <div className="value">{number}</div>
        </div>
        <div className="name">{lot.name}</div>
        <div className="separator" />
        <div className="helpers">
          <div className="helper">
            <div className="title">Тип:</div>
            <div className="value">{LotTypeName[lot.type]}</div>
          </div>
          <div className="helper">
            <div className="title">Владелец:</div>
            <div className="value">{lot.owner}</div>
          </div>
        </div>
      </div>

      {activeTabId !== TabId.SelfLots && lot.opened && lot.secondsLeft > 0 && (
        <div className="bet">
          <div className="title">Сделать ставку</div>
          <div className="timer">
            <div className="title">До окончания:</div>
            <div className="value">
              {getTimeString(lot.secondsLeft * 1000, {
                hours: true,
                minutes: true,
                seconds: true,
                separator: ':',
              })}
            </div>
          </div>
          <div className="separator" />
          <div className="bets">
            <div className="bet">
              <div className="title">Текущая ставка:</div>
              <div className="value">
                {numberWithSeparator(lot.currentBet, ' ')}
              </div>
            </div>
            <div className="bet">
              <div className="title">Стартовая ставка:</div>
              <div className="value">
                {numberWithSeparator(lot.startBet, ' ')}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="button -bet" onClick={openBet}>
              Сделать ставку
            </div>
            <div className="button -mark" onClick={handleMark} />
          </div>
        </div>
      )}
    </div>
  ) : null
}

export default LotInfo
