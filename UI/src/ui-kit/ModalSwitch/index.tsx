import React, { useMemo } from 'react'
import './styles.sass'
import UIKitSwitch from '../Switch'

type Props = {
  className?: string
  title: string
  checked: boolean
  setChecked: (checked: boolean) => void
  disabled?: boolean
}

const UIKitModalSwitch: React.FC<Props> = ({
  className,
  title,
  checked,
  setChecked,
  disabled,
}) => {
  const classes = useMemo(
    () => [className, disabled && 'disabled'].join(' '),
    [className, disabled],
  )

  return (
    <div
      className={`UI-Kit_ModalSwitch ${classes}`}
      onClick={(event) => {
        event.preventDefault()
        if (disabled) {
          return
        }
        setChecked(!checked)
      }}
    >
      <div className="title">{title}</div>
      <UIKitSwitch
        checked={checked}
        setChecked={setChecked}
        disabled={disabled}
      />
    </div>
  )
}

export default UIKitModalSwitch
