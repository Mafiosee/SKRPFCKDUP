import React, { useMemo } from 'react'
import './styles.sass'
import { Icon, IconComponent } from '../Icons'

export type UIKitParametersParameter = {
  title: string
  value: string
  icon?: Icon
  helper?: string
}

type Props = {
  className?: string
  parameters: UIKitParametersParameter[]
}

const UIKitModalParameters: React.FC<Props> = ({ className, parameters }) => {
  const renderedParameters = useMemo(
    () =>
      parameters.map((parameter, index) => {
        const Icon =
          parameter.icon != null ? IconComponent[parameter.icon] : null

        return (
          <div className="parameter" key={index}>
            <div className="title">{parameter.title}:</div>
            <div className="value">
              {Icon != null && (
                <div className="icon">
                  <Icon />
                </div>
              )}
              <div className="text">{parameter.value}</div>
              {parameter.helper != null && (
                <div className="helper">{parameter.helper}</div>
              )}
            </div>
          </div>
        )
      }),
    [parameters],
  )

  return (
    <div className={`UI-Kit_ModalParameters ${className}`}>
      {renderedParameters}
    </div>
  )
}

export default UIKitModalParameters
