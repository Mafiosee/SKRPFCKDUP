import React, { useMemo } from 'react'
import './styles.sass'

export type UIKitCheckboxProps = {
  checked: boolean
  toggle?: () => void
  className?: string
  disabled?: boolean
}

const UIKitCheckbox: React.FC<UIKitCheckboxProps> = ({
  checked,
  toggle,
  className,
  disabled,
}) => {
  const classes = useMemo(
    () => [checked && 'checked', className, disabled && 'disabled'].join(' '),
    [checked, className, disabled],
  )

  return (
    <div
      className={`UI-Kit_Checkbox ${classes}`}
      onClick={disabled || !toggle ? () => {} : toggle}
    >
      <div className="tick" />
    </div>
  )
}

export default UIKitCheckbox
