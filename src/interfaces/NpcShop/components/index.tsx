import React, { ChangeEvent, useRef, useState } from 'react'
import './styles.sass'
import { numberWithSeparator } from '../../../utils/numberWithSeparator'
import { ItemInfo } from '../../SellResource'
import { ButtonTypes } from '../../../shared/NpcShop/type'
import { ColorClassName } from '../index'

type PropsType = {
  blockName: string
  text: string
  item: ItemInfo
  exit: () => void
  confirm: (amount: number) => void
  confirmText: string
  buttonType: ButtonTypes
}
const ConfirmBuyWindow: React.FC<PropsType> = ({
  blockName,
  exit,
  item,
  text,
  confirm,
  confirmText,
  buttonType,
}) => {
  const [isActive, setIsActive] = useState(false)
  const [amount, setAmount] = useState('')

  const inputRef = useRef(null)

  const handleFocus = () => setIsActive(true)
  const handleBlur = () => setIsActive(false)
  const handleClick = () => inputRef.current.focus()

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (isNaN(+value)) {
      return
    }
    if (+value < 0) {
      return
    }
    if (value.length === 0) {
      setAmount('')
    }

    setAmount(value)
  }

  const getAmount = () => numberWithSeparator(+amount * +item.price, ' ')

  return (
    <div className={`_ConfirmBuyWindow`}>
      <div className="block-info">
        <div className="name">{blockName}</div>
        <div className="exit" onClick={exit} />
      </div>
      <div className="input-amount-block">
        <div className="text">{text}</div>
        <div
          className={`input-container ${isActive && '-active'}`}
          onClick={handleClick}
        >
          <input
            value={amount}
            ref={inputRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={'Кол-во'}
            className={'input-block'}
            onChange={onChangeInput}
          />
        </div>
        <div className="price-result">
          <div>Итого к оплате:</div>
          <div className="price">
            <div className="icon" />
            <div className="amount">{getAmount()}</div>
          </div>
        </div>
      </div>

      <div className="buttons">
        <div
          className={`btn -confirm ${ColorClassName[buttonType]}`}
          onClick={() => confirm(+amount)}
        >
          {confirmText}
        </div>
        <div className={`btn -cancel -secondary`} onClick={exit}>
          {'Отмена'}
        </div>
      </div>
    </div>
  )
}

export default ConfirmBuyWindow
