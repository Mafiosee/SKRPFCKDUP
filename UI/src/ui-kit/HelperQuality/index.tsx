import React from 'react'
import './styles.sass'
import { Quality } from '../../shared/inventory/itemType'
import { Color } from './data/color'
import UIKitTooltip from '../Tooltip'
import { QualityName } from '../../interfaces/Inventory/data'
import { UIKitTooltipAlign } from '../Tooltip/data/align'

type Props = {
  className?: string
  quality: Quality
  hasTooltip?: boolean
  tooltipAlign?: UIKitTooltipAlign
}

const UIKitHelperQuality: React.FC<Props> = ({
  className,
  quality,
  hasTooltip,
  tooltipAlign,
}) => {
  return (
    <div className={`UI-Kit_HelperQuality ${className}`}>
      <svg viewBox="0 0 20 20">
        <path
          d="M0.625 10L10 0.625L19.375 10L10 19.375L0.625 10Z"
          stroke="white"
          strokeOpacity="0.16"
          strokeWidth="0.5"
        />
        <path
          d="M1.25 10L10 1.25L18.75 10L10 18.75L1.25 10Z"
          fill={Color[quality]}
        />
        <path
          d="M12.1562 7.29619C10.7507 7.2804 7.81183 7.27271 7.81183 7.27271L5.90918 9.57287L9.98754 14.0909L14.091 9.57476C14.091 9.57476 12.7343 7.96637 12.1562 7.29619ZM11.414 8.91038L10.4881 7.79943C10.9241 7.79565 11.3599 7.79174 11.7969 7.78634L11.414 8.91038ZM10.9224 9.26126C10.6316 9.26531 10.3421 9.26936 10.0525 9.27611L8.92143 9.29905L9.98047 7.91037L10.9224 9.26126ZM12.3074 8.29053C12.5394 8.60822 12.7715 8.92307 13.0026 9.23468L12.7059 9.23832L11.9814 9.24777L12.3074 8.29053ZM8.04706 7.81198C8.53514 7.81171 9.02296 7.80928 9.51079 7.80659L8.50966 9.11821L8.14936 8.13439L7.84825 8.56895L8.12234 9.31659L7.31294 9.33954L7.15724 9.56491L7.30007 9.78894L8.28318 9.81728L10.0525 9.85371C10.6419 9.86721 11.2325 9.87126 11.8219 9.87936L12.7059 9.8915L12.9357 9.89434L10.8998 12.245L11.7266 10.2275L11.0356 10.2032L9.9766 12.7876L8.78889 10.1223L8.32308 10.1047L9.19707 12.43L6.60366 9.55695L8.04706 7.81198Z"
          fill="white"
        />
      </svg>
      {hasTooltip != null && (
        <UIKitTooltip
          className="tooltip"
          text={QualityName[quality]}
          align={tooltipAlign}
        />
      )}
    </div>
  )
}

export default UIKitHelperQuality
