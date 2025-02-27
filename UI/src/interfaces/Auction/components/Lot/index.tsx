import React, { useMemo } from 'react'
import './styles.sass'
import { Lot as LotType } from '../../../../shared/Auction/Lot'
import { getImageByLotType } from '../../assets/LotImages'
import { LotTypeName } from '../../types/LotTypeName'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'
import { getTimeString } from '../../../../utils/time'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { Tab } from '../../types/Tabs'
import { auctionActions } from '../../reducer'
import {
  AuctionEvents,
  AuctionPayloads,
} from '../../../../shared/Auction/events'
import { callClient } from '../../../../utils/api'

type Props = {
  isEmpty?: boolean
  lot?: LotType
}

const Lot: React.FC<Props> = ({ isEmpty, lot }) => {
  const dispatch = useAppDispatch()
  const { activeTab, selfBets } = useAppSelector((state) => state.auction)

  const number = useMemo(() => {
    if (!lot) {
      return undefined
    }
    const number = lot.id.toString()
    return `${new Array(5 - number.length).fill(0).join('')}${number}`
  }, [lot])

  const selfBet = useMemo(() => {
    if (!lot) {
      return undefined
    }
    return selfBets.find((bet) => bet.lotId === lot.id)
  }, [lot, selfBets])

  const isSelfBet = useMemo(
    () => activeTab === Tab.SelfBets && selfBet != null,
    [activeTab, selfBets],
  )

  const currentBet = useMemo(() => {
    if (!lot) {
      return 0
    }
    if (lot.currentBet !== 0) {
      return lot.currentBet
    }
    return lot.minimalBet
  }, [lot])

  return (
    <div
      className={`Lot ${isEmpty && '-empty'} ${activeTab === Tab.Lots && '-small'}`}
    >
      {isEmpty && (
        <div className="empty">
          <div className="mark" />
          <div className="value -location" />
          <div className="info">
            <div className="col">
              <div className="value -name" />
              <div className="value -type" />
              <div className="value -bet" />
            </div>
            <div className="col">
              <div className="value -number" />
              <div className="value -bets" />
              <div className="value -time" />
            </div>
          </div>
        </div>
      )}
      {lot != null && (
        <div
          className="lot"
          onClick={() => dispatch(auctionActions.setOpenedLotId(lot?.id))}
        >
          <div className="background">
            <div
              className="image"
              style={{
                backgroundImage: `url(${getImageByLotType(lot.type)[`${lot.image}.png`]})`,
              }}
            />
            <div className="shadow" />
          </div>
          <div className="content">
            <div
              className={`mark ${lot?.isFavorite && '-active'}`}
              onClick={(event) => {
                event.stopPropagation()
                const payload: AuctionPayloads[AuctionEvents.ToggleFavoriteLot] =
                  {
                    lotId: lot.id,
                  }
                callClient(AuctionEvents.ToggleFavoriteLot, payload)
              }}
            />
            <div className="location">{lot.location}</div>
            <div className="info">
              <div className="col -primary">
                <div className="name">{lot.name}</div>
                <div className={`type ${isSelfBet && '-small'}`}>
                  {LotTypeName[lot.type]}
                </div>
                {isSelfBet ? (
                  <div className="bets">
                    <div className="bet">
                      <div className="title">Текущая ставка</div>
                      <div className="value">
                        {numberWithSeparator(currentBet, '.')}
                      </div>
                    </div>
                    <div className="bet">
                      <div className="title">Ваша ставка</div>
                      <div
                        className={`value -self ${selfBet?.lost ? '-lost' : '-active'}`}
                      >
                        {numberWithSeparator(selfBet?.sum ?? 0, '.')}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bet">
                    {numberWithSeparator(currentBet, '.')}
                  </div>
                )}
              </div>
              <div className="col -helpers">
                <div className="number -helper">Лот #{number}</div>
                <div className="popularity -helper -with-icon">
                  {
                    lot.bets.filter(
                      (bet, index, bets) =>
                        index ===
                        bets.findIndex(({ name }) => name === bet.name),
                    ).length
                  }
                </div>
                <div className="time -helper -with-icon">
                  {getTimeString(lot?.secondsLeft * 1000, {
                    hours: true,
                    minutes: true,
                    seconds: true,
                    separator: ':',
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Lot
