import React, { useMemo } from 'react'
import './styles.sass'
import { UIKitTooltipAlign, UIKitTooltipAlignClass } from './data/align'

type Props = {
  className?: string
  text: string
  align?: UIKitTooltipAlign
}

const UIKitTooltip: React.FC<Props> = ({
  className,
  text,
  align = UIKitTooltipAlign.Center,
}) => {
  const classes = useMemo(
    () => [className, UIKitTooltipAlignClass[align]].join(' '),
    [className, align],
  )

  return (
    <div className={`UI-Kit_Tooltip ${classes}`}>
      <div className="triangle">
        <svg viewBox="0 0 14 4">
          <path d="M7 0L14 4H0L7 0Z" fill="#525252" />
        </svg>
      </div>
      {text}
    </div>
  )
}

export default UIKitTooltip
