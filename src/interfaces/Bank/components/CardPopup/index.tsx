import './styles.sass'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'

type HBInfoType = {
  name: string
  has: boolean
  date: string
  rent: number
}

type FInfoType = {
  name: string
  has: boolean
  balance: number
}

export enum RealtyCards {
  House,
  Business,
  Faction,
}

const PopupBackgrounds: Record<RealtyCards, string> = {
  [RealtyCards.House]: require('../../assets/images/popups/house-bg.png'),
  [RealtyCards.Business]: require('../../assets/images/popups/business-bg.png'),
  [RealtyCards.Faction]: require('../../assets/images/popups/faction-bg.png'),
}

const PopupNames = {
  [RealtyCards.House]: 'Оплата дома',
  [RealtyCards.Business]: 'Оплата бизнеса',
  [RealtyCards.Faction]: 'Хранилище фракции',
}

type PropsType = {
  isShow: boolean
  onClickClose: () => void
  realty: RealtyCards
  info: HBInfoType | FInfoType
  send: (sum: number) => void
}

const hPoint = 0.09259
const CardPopup: React.FC<PropsType> = ({
  isShow,
  onClickClose,
  realty,
  info,
  send,
}) => {
  const backgroundImage = `url(${PopupBackgrounds[realty]})`
  const [isActive, setIsActive] = useState(false)
  const [sum, setSum] = useState('')

  useEffect(() => {
    setSum('')
  }, [isShow])

  const inputRef = useRef<HTMLInputElement>(null)

  const handleFocus = () => setIsActive(true)
  const handleBlur = () => setIsActive(false)
  const handleClick = () => {
    if (inputRef.current == null) {
      return
    }
    inputRef.current.focus()
  }

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (isNaN(+value)) {
      return
    }
    if (+value < 0) {
      return
    }
    if (value.length === 0) {
      setSum('')
    }

    setSum(value)
  }

  return (
    <div className={`_CardPopup ${isShow && '-show'}`}>
      <div className="window">
        <div className="info">
          <div className="name">{PopupNames[realty]}</div>
          <div className="cross" onClick={onClickClose} />
        </div>
        <div className="bg" style={{ backgroundImage }} />

        <div className="content">
          <div
            className="name"
            style={{
              marginTop: `${realty === RealtyCards.Faction ? 288 * hPoint : 264 * hPoint}vh`,
            }}
          >
            {info.name}
          </div>
          {'rent' in info && info.has && (
            <>
              <div className="date">Оплачено до: {info.date}</div>
              <div className="line" />
              <div className="price">
                <span>Стоимость аренды:</span>
                <div className="icon" />
                <span>{info.rent} / час</span>
              </div>
              <div className="extend">
                <div
                  className={`input-container ${isActive && '-active'}`}
                  onClick={handleClick}
                >
                  <input
                    value={sum}
                    ref={inputRef}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={'Кол-во часов'}
                    className={'input-block'}
                    style={{
                      paddingLeft: `${isActive ? '1.1111vh' : '3.7036vh'}`,
                    }}
                    onChange={onChangeInput}
                  />
                  {!isActive && <div className="icon" />}
                </div>
                <div className="btn">
                  {sum.length === 0 && (
                    <div className={'btn-inactive'}>Продлить</div>
                  )}
                  {+sum > 0 && (
                    <div
                      className={'btn-active'}
                      onClick={() => {
                        send(+sum)
                        onClickClose()
                      }}
                    >
                      <span>Продлить</span>
                      <div className="icon" />
                      <span>{numberWithSeparator(+sum * info.rent, '.')}</span>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {'balance' in info && info.has && (
            <>
              <div className="balance">
                <div className="icon" />
                <div>{numberWithSeparator(info.balance, '.')}</div>
              </div>
              <div className="extend">
                <div
                  className={`input-container ${isActive && '-active'}`}
                  onClick={handleClick}
                >
                  <input
                    value={sum}
                    ref={inputRef}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={'Сумма'}
                    className={'input-block'}
                    style={{
                      paddingLeft: `${isActive ? '1.1111vh' : '3.7036vh'}`,
                    }}
                    onChange={onChangeInput}
                  />
                  {!isActive && <div className="icon" />}
                </div>
                <div className="btn">
                  {sum.length === 0 && (
                    <div className={'btn-inactive'}>Снять</div>
                  )}
                  {+sum > 0 && (
                    <div
                      className={'btn-active'}
                      onClick={() => {
                        send(+sum)
                        onClickClose()
                      }}
                    >
                      <span>Снять</span>
                      <div className="icon" />
                      <span>{numberWithSeparator(+sum, '.')}</span>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CardPopup
