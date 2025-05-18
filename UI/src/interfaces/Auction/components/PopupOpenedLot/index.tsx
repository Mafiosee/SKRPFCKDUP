import React, { useEffect, useMemo, useRef, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'
import { getImageByLotType } from '../../assets/LotImages'
import { LotTypeName } from '../../types/LotTypeName'
import { calcVh } from '../../../../utils/calcVh'
import { auctionActions } from '../../reducer'
import {
  AuctionEvents,
  AuctionPayloads,
} from '../../../../shared/Auction/events'
import { callClient } from '../../../../utils/api'

const PopupOpenedLot: React.FC = () => {
  const dispatch = useAppDispatch()
  const { balance, lots, openedLotId } = useAppSelector(
    (state) => state.auction,
  )
  const [sum, setSum] = useState<number | ''>('')
  const lastBetRef = useRef<HTMLDivElement>(null)

  const lot = useMemo(
    () => lots.find((lot) => lot.id === openedLotId),
    [openedLotId, lots],
  )

  const number = useMemo(() => {
    if (!lot) {
      return undefined
    }
    const number = lot.id.toString()
    return `${new Array(5 - number.length).fill(0).join('')}${number}`
  }, [lot])

  const mapOffset: { top: number; left: number } = useMemo(() => {
    const positionRatio = 127.8
    const centerOffset = 2048
    if (!lot) {
      return { top: 0, left: 0 }
    }
    return {
      top: -centerOffset + lot.position.y / positionRatio,
      left: -centerOffset - lot.position.x / positionRatio,
    }
  }, [lot])

  useEffect(() => {
    if (!lastBetRef.current) {
      return
    }
    lastBetRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [lastBetRef.current])

  const handleChangeSum = (value: string) => {
    value = value.replace(/\./g, '')
    if (!value.length) {
      return setSum('')
    }
    const intValue = parseInt(value)
    if (isNaN(intValue) || intValue < 0) {
      return
    }
    if (intValue > 4_000_000_000) {
      return setSum(4_000_000_000)
    }
    setSum(intValue)
  }

  const renderedHistory = useMemo(() => {
    if (!lot) {
      return []
    }
    return lot.bets.map((bet, index) => (
      <div key={index} className="bet" ref={lastBetRef}>
        <div className="value -name">{bet.name}</div>
        <div className="value -sum">{numberWithSeparator(bet.bet, '.')}</div>
        <div className="value -datetime">{bet.datetime}</div>
      </div>
    ))
  }, [lot])

  const handleCreateBet = () => {
    if (!lot || +sum < lot.minimalBet) {
      return
    }
    const payload: AuctionPayloads[AuctionEvents.CreateBet] = {
      lotId: lot.id,
      sum: +sum,
    }
    callClient(AuctionEvents.CreateBet, payload)
  }

  return !lot ? null : (
    <div className="PopupOpenedLot">
      <div className="window">
        <div className="header">
          <div className="title">Информация о лоте</div>
          <div className="row">
            <div className="balance">
              <div className="item -bank">
                {numberWithSeparator(balance.bank, '.')}
              </div>
              <div className="separator" />
              <div className="item -cash">
                {numberWithSeparator(balance.cash, '.')}
              </div>
            </div>
            <div
              className="close"
              onClick={() => dispatch(auctionActions.setOpenedLotId(null))}
            />
          </div>
        </div>
        <div className="body">
          <div className="info">
            <div
              className="image"
              style={{
                backgroundImage: `url(${getImageByLotType(lot.type)[`${lot.image}.png`]})`,
              }}
            />
            <div className="content">
              <div className="info">
                <div className="lot">
                  <div className="main">
                    <div className="number">Лот #{number}</div>
                    <div className="name">{lot.name}</div>
                    <div className="location">{lot.location}</div>
                  </div>
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
                <div className="bets">
                  <div className="bet -current">
                    <div className="title">Текущая ставка</div>
                    <div className="value">
                      {numberWithSeparator(lot.currentBet, '.')}
                    </div>
                  </div>
                  <div className="bet">
                    <div className="title">Базовая стоимость</div>
                    <div className="value">
                      {numberWithSeparator(lot.statePrice, '.')}
                    </div>
                  </div>
                </div>
                <div className="datetime">
                  <div className="title">Дата размещения:</div>
                  <div className="value">{lot.createdAt}</div>
                </div>
              </div>
              <div className="map">
                <div
                  className="layout"
                  style={{
                    transform: `translate(${calcVh(mapOffset.left)}, ${calcVh(mapOffset.top)})`,
                  }}
                />
              </div>
              <div
                className="locate"
                onClick={() => {
                  const payload: AuctionPayloads[AuctionEvents.PointRequest] = {
                    lotId: lot.id,
                  }
                  callClient(AuctionEvents.PointRequest, payload)
                }}
              >
                Отметить на карте
              </div>
            </div>
          </div>
          <div className="col">
            <div className="history">
              <div className="title">История торгов</div>
              <div className="helpers">
                <div className="helper -name">Участник</div>
                <div className="helper -sum">Ставка</div>
                <div className="helper -datetime">Дата и время</div>
              </div>
              <div className="list">{renderedHistory}</div>
            </div>
            <div className="bet">
              <div className="content">
                <div className="block">
                  <div className="title">Сумма ставки</div>
                  <div className="input">
                    <input
                      type="text"
                      placeholder="0"
                      value={sum === '' ? sum : numberWithSeparator(sum, '.')}
                      onChange={(event) => handleChangeSum(event.target.value)}
                    />
                  </div>
                </div>
                <div className="helpers">
                  <div className="helper">
                    <div className="title">Минимальная сумма ставки:</div>
                    <div className="value">
                      {numberWithSeparator(lot.minimalBet, '.')}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`button ${+sum < lot.minimalBet && '-disabled'}`}
                onClick={handleCreateBet}
              >
                Сделать ставку
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopupOpenedLot
