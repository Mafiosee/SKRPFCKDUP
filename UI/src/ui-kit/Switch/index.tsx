import React, { useMemo } from 'react'
import './styles.sass'

export type UIKitSwitchProps = {
  checked: boolean
  setChecked: (checked: boolean) => void
  className?: string
  disabled?: boolean
}

const UIKitSwitch: React.FC<UIKitSwitchProps> = ({
  checked,
  setChecked,
  className,
  disabled,
}) => {
  const classes = useMemo(
    () => [checked && 'checked', className, disabled && 'disabled'].join(' '),
    [checked, className, disabled],
  )

  return (
    <div
      className={`UI-Kit_Switch ${classes}`}
      onClick={disabled ? () => {} : () => setChecked(!checked)}
    ></div>
  )
}

export default UIKitSwitch
