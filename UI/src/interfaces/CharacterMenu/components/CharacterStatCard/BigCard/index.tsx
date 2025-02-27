import React from 'react'
import './styles.sass'
import { Icons, IconsNames } from '../../../assets/icons'
import { callClient } from '../../../../../utils/api'
import { CharacterMenuEvents } from '../../../../../shared/CharacterMenu/events'
import { VipType } from '../../../../../shared/Vip/types'

type PropsType = {
  image: {
    [key: string]: any
  }
  blockIcon: IconsNames
  blockName: string
  name?: string
  description?: string
  status?: VipType | string
  timeUntilEndRent?: string
}

const VipNames = {
  [VipType.BASIC]: 'started',
  [VipType.ADVANCED]: 'limited',
  [VipType.MAXIMUM]: 'legendary',
}

export const BigCard: React.FC<PropsType> = ({
  image,
  blockIcon,
  blockName,
  name,
  description,
  status,
  timeUntilEndRent,
}) => {
  const getBackground = () => {
    if (status != null) {
      console.log(image, status)
      return `url(${image[status]})`
    } else {
      return `url(${name ? image.active : image.inactive})`
    }
  }

  const onClickBuy = () => {
    callClient(CharacterMenuEvents.BuyVip)
  }

  return (
    <div className={`big-card`}>
      <div
        className="bg"
        style={{
          backgroundImage: getBackground(),
        }}
      />
      <div className="content">
        <div className="block-info">
          <div
            className="icon"
            style={{ backgroundImage: `url(${Icons[blockIcon]})` }}
          />
          <div className="name">{blockName}</div>
        </div>
        {timeUntilEndRent && (
          <div className="time-block">
            <div className="title">Окончание аренды через:</div>
            <div className="value">{timeUntilEndRent}</div>
          </div>
        )}
        <div className="name-block">
          {name != null && (
            <div className="text">{name ? name : 'Отсутствует'}</div>
          )}
          {name == null && (
            <>
              <div className="title">
                {status === 'inactive'
                  ? 'Отсутствует'
                  : VipNames[status ?? VipType.BASIC]}
              </div>
              {status === 'inactive' && (
                <div className="btn" onClick={onClickBuy}>
                  Приобрести
                </div>
              )}
            </>
          )}
          {description !== undefined && description != null && (
            <div className={'subtitle'}>
              {name || status || status === VipType.BASIC ? description : ''}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
