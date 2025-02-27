import './styles.sass'
import React, { useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../../hooks/redux'
import { getRandomInt } from '../../utils/getRandomInt'
import { TimeoutRef } from '../../types/timeoutRef'

const Config = {
  steps: [20, 40, 60, 80, 100],
  moveLimits: { min: 2000, max: 6000 },
  stopLimits: { min: 1000, max: 4000 },
}

type Step = {
  value: number
  moveTime: number
  stopTime: number
}

const Disclaimer: React.FC = () => {
  const { isOpen } = useAppSelector((state) => state.disclaimer)
  const [opened, setOpened] = useState(false)
  const [steps, setSteps] = useState<Step[]>([])
  const [value, setValue] = useState(0)
  const [step, setStep] = useState(0)
  const timeoutRef = useRef<TimeoutRef>(null)

  useEffect(() => {
    if (isOpen) {
      setValue(0)
      setOpened(true)
    } else {
      if (timeoutRef.current != null) {
        clearTimeout(timeoutRef.current)
      }
      setValue(100)
      setTimeout(() => setOpened(false), 2000)
      return
    }
  }, [isOpen])

  useEffect(() => {
    const steps: Step[] = []
    let value = 0
    Config.steps.forEach((valueLimit) => {
      steps.push({
        value: getRandomInt(value, valueLimit),
        moveTime: getRandomInt(Config.moveLimits.min, Config.moveLimits.max),
        stopTime: getRandomInt(Config.stopLimits.min, Config.stopLimits.max),
      })
      value = valueLimit
    })
    setSteps(steps)
  }, [opened])

  useEffect(() => {
    setValue(0)
    setStep(0)
  }, [steps])

  useEffect(() => {
    if (step > steps.length - 1) {
      return
    }
    setValue(steps[step].value)
    if (timeoutRef.current != null) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      if (step === steps.length - 1) {
        return
      }
      setStep((prev) => prev + 1)
    }, steps[step].moveTime + steps[step].stopTime)
  }, [step, steps])

  return !opened ? null : (
    <div id="Disclaimer">
      <div className="background">
        <div className="image" />
        <div className="frame" />
      </div>
      <div className="content">
        <div className="logo" />
        <div className="text">
          Skyrim Role Play никак не связан с Bethesda Game Studios, ZeniMax
          Media или любым другим правообладателем
          <br />
          и не поддерживается ими. Все используемые торговые марки принадлежат
          соответствующим владельцам
          <br />и не связаны с Bethesda Game Studios, ZeniMax Media и не
          поддерживаются ими.
        </div>
        <div className="progress">
          <div className="bar">
            <div
              className="line"
              style={{
                width: `${value}%`,
                transitionDuration: `${(isOpen ? steps[step]?.moveTime : 2000) ?? 0}ms`,
              }}
            />
          </div>
          <div className="helper">Идёт загрузка...</div>
        </div>
      </div>
    </div>
  )
}

export default Disclaimer
