import React, { useMemo } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { getImageByLotType } from '../../assets/LotImages'
import { LotTypeName } from '../../types/LotTypeName'
import { getTimeString } from '../../../../utils/time'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'
import { auctionActions } from '../../reducer'
import { callClient } from '../../../../utils/api'
import {
  AuctionEvents,
  AuctionPayloads,
} from '../../../../shared/Auction/events'

const MostPopularLot: React.FC = () => {
  const dispatch = useAppDispatch()
  const { mostPopularLotId, lots } = useAppSelector((state) => state.auction)

  const lot = useMemo(
    () => lots.find((lot) => lot.id === mostPopularLotId),
    [mostPopularLotId, lots],
  )

  const number = useMemo(() => {
    if (!lot) {
      return undefined
    }
    const number = lot.id.toString()
    return `${new Array(5 - number.length).fill(0).join('')}${number}`
  }, [lot])

  return lot == null ? null : (
    <div className="MostPopularLot">
      <div
        className="image"
        style={{ backgroundImage: `url(${getImageByLotType(lot.type)[`${lot.image}.png`]})` }}
      />
      <div className="content">
        <div
          className={`mark ${lot?.isFavorite && '-active'}`}
          onClick={(event) => {
            event.stopPropagation()
            const payload: AuctionPayloads[AuctionEvents.PointRequest] = {
              lotId: lot.id,
            }
            callClient(AuctionEvents.PointRequest, payload)
          }}
        />
        <div className="block">
          <div className="header">
            <div className="info">
              <div className="number">Лот #{number}</div>
              <div className="name">{lot.name}</div>
            </div>
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
        <div className="block -primary">
          <div className="body">
            <div className="title">Сделать ставку</div>
            <div className="info">
              <div className="row">
                <div className="title">До окончания торгов:</div>
                <div className="value -time">
                  {getTimeString(lot?.secondsLeft * 1000, {
                    hours: true,
                    minutes: true,
                    seconds: true,
                    separator: ':',
                  })}
                </div>
              </div>
              <div className="separator" />
              <div className="row">
                <div className="title">Текущая ставка:</div>
                <div className="value -sum">
                  {numberWithSeparator(lot.currentBet, '.')}
                </div>
              </div>
              <div className="row">
                <div className="title">Стартовая ставка:</div>
                <div className="value -sum">
                  {numberWithSeparator(lot.startBet, '.')}
                </div>
              </div>
            </div>
          </div>
          <div className="buttons">
            <div
              className="button -bet"
              onClick={() => dispatch(auctionActions.setOpenedLotId(lot.id))}
            >
              Сделать ставку
            </div>
            <div
              className="button -location"
              onClick={() => {
                const payload: AuctionPayloads[AuctionEvents.PointRequest] = {
                  lotId: lot.id,
                }
                callClient(AuctionEvents.PointRequest, payload)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MostPopularLot
