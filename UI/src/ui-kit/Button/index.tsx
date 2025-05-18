import React, { useMemo } from 'react'
import './styles.sass'
import { UIKitButtonType, UIKitButtonTypeClass } from './data/Type'
import { Icon, IconComponent } from '../Icons'
import { UIKitSize, UIKitSizeClass } from '../types/Size'

export type UIKitButtonProps = {
  className?: string
  type?: UIKitButtonType
  size?: UIKitSize
  disabled?: boolean
  text?: string
  iconBefore?: Icon
  iconAfter?: Icon
  onClick: () => void
}

const UIKitButton: React.FC<UIKitButtonProps> = ({
  className,
  size = UIKitSize.Large,
  type = UIKitButtonType.Primary,
  disabled = false,
  text,
  iconBefore,
  iconAfter,
  onClick,
}) => {
  const classes = useMemo(
    () =>
      [
        UIKitSizeClass[size],
        UIKitButtonTypeClass[type],
        disabled && 'disabled',
        className,
        !text && 'iconOnly',
      ].join(' '),
    [size, type, disabled, text],
  )

  const getIcon = (icon: Icon | undefined) => {
    if (icon == null) {
      return null
    }
    const Component = IconComponent[icon]
    let iconColor = '#fff'
    if (type === UIKitButtonType.Primary) {
      iconColor = '#000'
    }
    return (
      <div className="icon">
        <Component color={iconColor} />
      </div>
    )
  }

  return (
    <div
      className={`UI-Kit_Button ${classes}`}
      onClick={disabled ? () => {} : onClick}
    >
      {getIcon(iconBefore)}
      {text != null && <div className="text">{text}</div>}
      {getIcon(iconAfter)}
    </div>
  )
}

export default UIKitButton
