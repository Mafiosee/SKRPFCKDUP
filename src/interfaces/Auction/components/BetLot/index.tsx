import React, { useEffect, useMemo, useState } from 'react'
import './styles.sass'
import { useAppSelector } from '../../../../hooks/redux'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'
import {
  AuctionEvents,
  AuctionPayloads,
} from '../../../../shared/Auction/events'
import { callClient } from '../../../../utils/api'

type Props = {
  openedBetLotId: number | null
  close: () => void
}

const BetLot: React.FC<Props> = ({ openedBetLotId, close }) => {
  const { lots } = useAppSelector((state) => state.auction)
  const [sum, setSum] = useState('')

  useEffect(() => {
    setSum('')
  }, [openedBetLotId])

  const lot = useMemo(
    () => lots.find((lot) => lot.id === openedBetLotId),
    [lots, openedBetLotId],
  )

  const number = useMemo(() => {
    if (!lot) {
      return null
    }

    let number = lot.id.toString()

    while (number.length < 4) {
      number = `0${number}`
    }

    return number
  }, [lot])

  const renderedBets = useMemo(
    () =>
      !lot
        ? []
        : lot.bets.map((bet, index) => (
            <div key={index} className="bet">
              <div className="block -name">{bet.name}</div>
              <div className="block -bet">
                {numberWithSeparator(bet.bet, ' ')}
              </div>
              <div className="block -datetime">{bet.datetime}</div>
            </div>
          )),
    [lot],
  )

  const handleBet = () => {
    const payload: AuctionPayloads[AuctionEvents.CreateBet] = {
      lotId: openedBetLotId ?? -1,
      sum: +sum,
    }
    callClient(AuctionEvents.CreateBet, payload)
    setSum('')
  }

  return !lot ? null : (
    <div className="BetLot">
      <div className="window">
        <div className="col">
          <div className="number">
            <div className="title">Лот:</div>
            <div className="value">{number}</div>
          </div>
          <div className="name">{lot.name}</div>
          <div className="input">
            <div className="helper">Введите сумму ставки</div>
            <input
              type="text"
              placeholder="Сумма"
              value={sum}
              onChange={(event) => {
                if (!event.target.value.length) {
                  return setSum('')
                }
                const intValue = parseInt(event.target.value)
                if (isNaN(intValue) || intValue < 0) {
                  return
                }
                setSum(intValue.toString())
              }}
            />
          </div>
          <div className="helpers">
            <div className="helper">
              <div className="title">Минимальная сумма ставки:</div>
              <div className="value">
                {numberWithSeparator(lot.minimalBet, ' ')}
              </div>
            </div>
            <div
              className="helper"
              style={{ opacity: 0, pointerEvents: 'none' }}
            >
              <div className="title">Комиссия:</div>
              <div className="value">
                {+sum ?? 0
                  ? numberWithSeparator(
                      Math.round((1 + lot.commission) * (+sum ?? 0)),
                      ' ',
                    )
                  : '(?)'}
              </div>
            </div>
          </div>
          <div className="button" onClick={handleBet}>
            Сделать ставку
          </div>
        </div>

        <div className="history">
          <div className="title">История ставок</div>
          <div className="helpers">
            <div className="helper -name">Участник</div>
            <div className="helper -bet">Ставка</div>
            <div className="helper -datetime">Дата и время</div>
          </div>
          <div className="list">{renderedBets}</div>
        </div>

        <div className="title">Новая ставка</div>
        <div className="close" onClick={close} />
      </div>
    </div>
  )
}

export default BetLot
