import './styles.sass'
import React, { useMemo } from 'react'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'
import { Icon, IconComponent } from '../../../../ui-kit/Icons'

const IconCoinSeptimComponent = IconComponent[Icon.CoinSeptim]

type Props = {
  has: boolean
  empty: {
    imageUrl: string
    name: string
    helper?: string
  }
  name: string
  date?: string
  balance?: number
  imageUrl: string
  onClick: () => void
}

const Card: React.FC<Props> = ({
  has,
  empty,
  name,
  date,
  balance,
  imageUrl,
  onClick,
}) => {
  const currentImageUrl = useMemo(() => {
    if (!has) {
      return empty.imageUrl
    }
    return imageUrl
  }, [has])

  return (
    <div
      className={`Card ${!has && '-locked'}`}
      onClick={has ? onClick : () => {}}
    >
      <div
        className="image"
        style={{ backgroundImage: `url(${currentImageUrl})` }}
      />
      <div className="content">
        {has ? (
          <>
            <div className="name">{name}</div>
            {date != null && (
              <div className="info">
                <div className="title">Аренда до:</div>
                <div className="value">{date}</div>
              </div>
            )}
            {balance != null && (
              <div className="info">
                <div className="title">Баланс хранилища:</div>
                <div className="coin">
                  <IconCoinSeptimComponent />
                </div>
                <div className="value">{numberWithSeparator(balance, '.')}</div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="name">{empty.name}</div>
            <div className="info">
              <div className="title">{empty?.helper ?? 'Отсутствует'}</div>
            </div>
            <div className="lock" />
          </>
        )}
      </div>
    </div>
  )
}

export default Card
