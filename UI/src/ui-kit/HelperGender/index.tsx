import React from 'react'
import './styles.sass'
import UIKitTooltip from '../Tooltip'
import { UIKitTooltipAlign } from '../Tooltip/data/align'
import { GenderNames } from '../../interfaces/SelectCharacter/components/Character'
import { Gender } from '../../shared/characterEditor/enums/Genders'
import { IconUrl } from './assets/icons'

type Props = {
  className?: string
  gender: Gender
  hasTooltip?: boolean
  tooltipAlign?: UIKitTooltipAlign
}

const UIKitHelperGender: React.FC<Props> = ({
  className,
  gender,
  hasTooltip,
  tooltipAlign,
}) => {
  return (
    <div
      className={`UI-Kit_HelperGender ${className}`}
      style={{ backgroundImage: `url(${IconUrl[gender]})` }}
    >
      {hasTooltip != null && (
        <UIKitTooltip
          className="tooltip"
          text={GenderNames[gender]}
          align={tooltipAlign}
        />
      )}
    </div>
  )
}

export default UIKitHelperGender
