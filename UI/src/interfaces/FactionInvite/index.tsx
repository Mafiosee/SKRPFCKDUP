import React, { useMemo } from 'react'
import './styles.sass'
import { useAppSelector } from '../../hooks/redux'
import { Config } from './config'
import { callClient } from '../../utils/api'
import { FactionInviteEvents } from '../../shared/FactionInvite/events'
import { numberWithSeparator } from '../../utils/numberWithSeparator'

const FactionInvite: React.FC = () => {
  const { isOpen, factionHash, price } = useAppSelector(
    (state) => state.factionInvite,
  )

  const config = useMemo(() => Config[factionHash], [factionHash])

  return isOpen ? (
    <div className="FactionInvite">
      <div className="background">
        <div
          className="blur"
          style={{ backgroundColor: config.screenBlurColor }}
        />
      </div>
      <div className="window">
        <div
          className="close"
          onClick={() => callClient(FactionInviteEvents.Decline)}
        />
        <div className="body">
          <div className="background">
            <div
              className="blur"
              style={{ backgroundColor: config.windowBlurColor }}
            />
          </div>
          <div className="content">
            <div
              className="ped"
              style={{ backgroundImage: `url(${config.pedImageUrl})` }}
            />
            <div
              className="title"
              style={{ backgroundColor: config.textBackground }}
            >
              Вам приглашение
            </div>
            <div className="name">{config.name}</div>
            <div className="description">{config.description}</div>
            <div className="price">
              <div className="block -title">Сумма взноса:</div>
              <div className="block -sum">
                {numberWithSeparator(price, '.')}
              </div>
            </div>
            <div className="buttons">
              <div
                className="button -accept"
                onClick={() => callClient(FactionInviteEvents.Accept)}
              >
                Принять приглашение
              </div>
              <div
                className="button -decline"
                onClick={() => callClient(FactionInviteEvents.Decline)}
              >
                Отказаться
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default FactionInvite
