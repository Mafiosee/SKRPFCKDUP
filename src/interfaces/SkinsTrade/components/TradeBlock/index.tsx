import React, { useMemo, useState } from 'react'
import './styles.sass'
import { TradeType, TradeTypeConfig } from './types'
import { useAppSelector } from '../../../../hooks/redux'
import MoneyInput from '../MoneyInput'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'
import { Skin } from '../../../../shared/Skins/Skin'
import { SkinQualityColor } from '../../../DonateStore/data/quality'
import { SkinImages } from '../../../Skins/assets/SkinImages'
import {
  SkinsTradeEvents,
  SkinsTradePayloads,
} from '../../../../shared/SkinsTrade/events'
import { callClient } from '../../../../utils/api'

type Props = {
  type: TradeType
}

const TradeBlock: React.FC<Props> = ({ type }) => {
  const { tradeStatus, giveSkins, receiveSkins } = useAppSelector(
    (state) => state.skinsTrade,
  )
  const [sum, setSum] = useState<number | ''>('')

  const renderedSkins = useMemo(() => {
    let skins: Skin[] = []

    switch (type) {
      case TradeType.Give: {
        skins = [...giveSkins]
        break
      }
      case TradeType.Receive: {
        skins = [...receiveSkins]
        break
      }
    }

    const renderedList = skins.map((skin) => (
      <div
        key={skin.id}
        className="skin"
        onClick={() => {
          const payload: SkinsTradePayloads[SkinsTradeEvents.RemoveSkinFromTrade] =
            { skinId: skin.id }
          callClient(SkinsTradeEvents.RemoveSkinFromTrade, payload)
        }}
      >
        <div className="center">
          <div
            className="color"
            style={{ backgroundColor: SkinQualityColor[skin.quality] }}
          />
          <div
            className="image"
            style={{
              backgroundImage: `url(${SkinImages[`${skin.image}.png`]})`,
            }}
          />
        </div>
        <div className="takeOff" />
      </div>
    ))

    while (renderedList.length < 21) {
      renderedList.push(
        <div key={`empty-${renderedList.length}`} className="skin -empty">
          <div className="center" />
        </div>,
      )
    }

    return renderedList
  }, [type, giveSkins, receiveSkins])

  return (
    <div className="TradeBlock">
      <div className="header">
        <div className="title">
          <div
            className="icon"
            style={{ backgroundImage: `url(${TradeTypeConfig[type].iconUrl})` }}
          />
          {TradeTypeConfig[type].title}
        </div>
        <div className="line" />
        <div className="controls">
          {type === TradeType.Give && (
            <>
              {tradeStatus.giveConfirmed ? (
                <>
                  <div className="money">
                    {numberWithSeparator(tradeStatus.giveMoney, ' ')}
                  </div>
                  <div
                    className="button -cancel"
                    onClick={() => callClient(SkinsTradeEvents.CancelTrade)}
                  >
                    Отменить ({giveSkins.length})
                  </div>
                </>
              ) : (
                <>
                  <MoneyInput value={sum} setValue={setSum} />
                  <div
                    className="button -confirm"
                    onClick={() => {
                      const payload: SkinsTradePayloads[SkinsTradeEvents.ConfirmTrade] =
                        {
                          sum: +sum || 0,
                        }
                      callClient(SkinsTradeEvents.ConfirmTrade, payload)
                    }}
                  >
                    Подтвердить
                  </div>
                </>
              )}
            </>
          )}
          {type === TradeType.Receive && (
            <>
              {tradeStatus.receiveConfirmed ? (
                <>
                  <div className="money">
                    {numberWithSeparator(tradeStatus.receiveMoney, ' ')}
                  </div>
                  <div className="receive -confirmed">Игрок готов к обмену</div>
                </>
              ) : (
                <>
                  <div className="money">0</div>
                  <div className="receive">Игрок не подтвердил</div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div className={`skins ${type === TradeType.Give && '-active'}`}>
        {renderedSkins}
      </div>
    </div>
  )
}

export default TradeBlock
