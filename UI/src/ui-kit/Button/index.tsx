import React, { useMemo } from 'react'
import './styles.sass'
import { UIKitButtonSize, UIKitButtonSizeClass } from './data/Size'
import { UIKitButtonType, UIKitButtonTypeClass } from './data/Type'
import { Icon, IconComponent } from '../Icons'

export type UIKitButtonProps = {
  className?: string
  type?: UIKitButtonType
  size?: UIKitButtonSize
  disabled?: boolean
  text?: string
  iconBefore?: Icon
  iconAfter?: Icon
  onClick: () => void
}

const UIKitButton: React.FC<UIKitButtonProps> = ({
  className,
  size = UIKitButtonSize.Large,
  type = UIKitButtonType.Primary,
  disabled = false,
  text = '',
  iconBefore,
  iconAfter,
  onClick,
}) => {
  const classes = useMemo(
    () =>
      [
        UIKitButtonSizeClass[size],
        UIKitButtonTypeClass[type],
        disabled && 'disabled',
        className,
      ].join(' '),
    [size, type, disabled],
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
      <div className="text">{text}</div>
      {getIcon(iconAfter)}
    </div>
  )
}

export default UIKitButton
