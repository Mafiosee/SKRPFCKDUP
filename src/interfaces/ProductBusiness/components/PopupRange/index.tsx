import './styles.sass'
import React, { useEffect, useState } from 'react'
import Slider from 'rc-slider'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'

type Props = {
  opened: boolean
  title: string
  close: () => void
  text: string
  helper?: string | number
  limits: { min: number; max: number }
  step?: number
  current: number
  helpers: { min: string | number; max: string | number }
  accept: (value: number) => void
  price?: number
}

const PopupRange: React.FC<Props> = ({
  opened,
  title,
  close,
  text,
  helper,
  limits,
  step = 1,
  current,
  helpers,
  accept,
  price,
}) => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    setValue(current)
  }, [opened, current])

  return !opened ? null : (
    <div className="_PopupRange">
      <div className="window">
        <div className="title">{title}</div>
        <div className="close" onClick={close} />

        <div className="header">
          <div className="text">{text}</div>
          {helper != null && <div className="helper">{helper}</div>}
        </div>

        <div className="control">
          <div className="helper">{helpers.min}</div>
          <div className="slider">
            <Slider
              min={limits.min}
              max={limits.max}
              step={step}
              value={value}
              onChange={(newValue) => {
                if (Array.isArray(newValue)) {
                  return
                }
                setValue(newValue)
              }}
              keyboard={false}
            />
            <div
              className="value"
              style={{
                left: `${((value - limits.min) / (limits.max - limits.min)) * 100}%`,
              }}
            >
              {value}
            </div>
          </div>
          <div className="helper">{helpers.max}</div>
        </div>

        <div className="buttons">
          <div
            className="button -accept"
            onClick={() => {
              accept(value)
              close()
            }}
          >
            Применить
            {price != null && (
              <div className="price">
                {numberWithSeparator(value * price, '.')}
              </div>
            )}
          </div>
          <div className="button -cancel" onClick={close}>
            Отмена
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopupRange
