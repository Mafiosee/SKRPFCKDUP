import React from 'react'
import './styles.sass'
import UIKitButton from '../Button'
import { UIKitButtonType } from '../Button/data/Type'
import { UIKitSize } from '../types/Size'
import { Icon } from '../Icons'
import UIKitInput from '../Input'
import { handleChangeNumberInput } from '../../utils/handleChangeNumberInput'

type Props = {
  className?: string
  size?: UIKitSize
  disabled?: boolean
  amount: number | ''
  setAmount: (amount: number | '') => void
  max?: number
}

const UIKitAmountSelector: React.FC<Props> = ({
  className,
  size = UIKitSize.Large,
  disabled = false,
  amount,
  setAmount,
  max,
}) => {
  return (
    <div className={`UI-Kit_AmountSelector ${className}`}>
      <UIKitButton
        className="button"
        type={UIKitButtonType.Secondary}
        size={size}
        disabled={disabled}
        iconBefore={Icon.Minus}
        onClick={() => {
          const newAmount = +amount - 1
          if (newAmount < 0) {
            return
          }
          setAmount(newAmount)
        }}
      />
      <UIKitInput
        className="input"
        size={size}
        placeholder="1"
        value={amount.toString()}
        onChange={(value: string) =>
          handleChangeNumberInput({ value, max, setValue: setAmount })
        }
      />
      <UIKitButton
        className="button"
        type={UIKitButtonType.Secondary}
        size={size}
        disabled={disabled}
        iconBefore={Icon.Plus}
        onClick={() => {
          const newAmount = +amount + 1
          if (max != null && newAmount > max) {
            return setAmount(max)
          }
          setAmount(newAmount)
        }}
      />
    </div>
  )
}

export default UIKitAmountSelector
