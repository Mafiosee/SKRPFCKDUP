import React, { useMemo, useState } from 'react'
import './styles.sass'
import { UIKitInputSize, UIKitInputSizeClass } from './data/Size'
import { Icon, IconComponent } from '../Icons'

type Props = {
  width?: string
  className?: string
  size?: UIKitInputSize
  disabled?: boolean
  title?: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  helper?: {
    text?: string
    icon?: Icon
  }
  warning?: string
}

const UIKitInput: React.FC<Props> = ({
  width,
  className,
  size = UIKitInputSize.Large,
  disabled = false,
  title,
  placeholder,
  value,
  onChange,
  helper,
  warning,
}) => {
  const [focused, setFocused] = useState(false)

  const classes = useMemo(
    () => [className, UIKitInputSizeClass[size]].join(' '),
    [className, size],
  )

  const inputClasses = useMemo(
    () =>
      [disabled && 'disabled', focused && 'focused', warning && 'warning'].join(
        ' ',
      ),
    [disabled, focused, value],
  )

  const renderedHelperWarning = useMemo(() => {
    if (warning == null) {
      return null
    }
    return (
      <div className="warning">
        <div className="icon" />
        <div className="tooltip">{warning}</div>
      </div>
    )
  }, [warning])

  const renderedHelperText = useMemo(() => {
    if (helper == null || helper.text == null) {
      return null
    }
    return <div className="text">{helper.text}</div>
  }, [helper?.text])

  const renderedHelperIcon = useMemo(() => {
    if (helper == null || helper.icon == null) {
      return null
    }
    const Component = IconComponent[helper.icon]
    return (
      <div className="icon">
        <Component />
      </div>
    )
  }, [helper?.icon])

  return (
    <div className={`UI-Kit_Input ${classes}`} style={{ width }}>
      {title != null && <div className="title">{title}</div>}
      <div className={`input ${inputClasses}`}>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {helper != null && (
          <div className="helpers">
            {renderedHelperWarning}
            <div className="separator" />
            {renderedHelperText}
            {renderedHelperIcon}
          </div>
        )}
      </div>
    </div>
  )
}

export default UIKitInput
