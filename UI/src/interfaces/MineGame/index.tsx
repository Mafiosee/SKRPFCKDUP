import React, { useCallback, useEffect, useRef, useState } from 'react'
import './styles.sass'
import { useAppSelector } from '../../hooks/redux'
import { calcVh } from '../../utils/calcVh'
import { getRandomInt } from '../../utils/getRandomInt'
import {
  ACTIVE_TIME,
  CLICKS_LIMITS,
  DECREASE_STEP,
  INACTIVE_TIME,
  PROGRESS_STEP,
} from './config'
import { MouseButton } from '../../types/mouseButton'
import { callClient } from '../../utils/api'
import { TimeoutRef } from '../../types/timeoutRef'
import { MineGameEvents } from '../../shared/Work/events'

const MineGame = () => {
  const { isOpen } = useAppSelector((state) => state.mineGame)
  const [progress, setProgress] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const clicksLimit = useRef(1)
  const activeTimeout = useRef<TimeoutRef>(null)
  const decreaseTimeout = useRef<TimeoutRef>(null)

  useEffect(() => {
    if (!isOpen) {
      setProgress(0)
      setIsActive(true)
    }
    if (activeTimeout.current != null) {
      clearTimeout(activeTimeout.current)
    }
    if (isActive) {
      const time = getRandomInt(ACTIVE_TIME.MIN, ACTIVE_TIME.MAX)
      activeTimeout.current = setTimeout(() => setIsActive(false), time)
      clicksLimit.current = getRandomInt(
        CLICKS_LIMITS.MIN,
        CLICKS_LIMITS.MAX + 1,
      )
    } else {
      const time = getRandomInt(INACTIVE_TIME.MIN, INACTIVE_TIME.MAX)
      activeTimeout.current = setTimeout(() => setIsActive(true), time)
    }
  }, [isOpen, isActive])

  const clickHandler = useCallback(
    (event: MouseEvent) => {
      if (!isOpen || event.button !== MouseButton.Left || progress >= 100) {
        return
      }
      if (!isActive) {
        return callClient(MineGameEvents.Loose)
      }
      setProgress((prev) => {
        prev += PROGRESS_STEP
        if (prev > 100) {
          prev = 100
        }
        return prev
      })
    },
    [isActive, progress, isOpen],
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', clickHandler)
    }
    return () => {
      document.removeEventListener('click', clickHandler)
    }
  }, [isOpen, clickHandler])

  useEffect(() => {
    if (clicksLimit.current <= 0) {
      return setIsActive(false)
    }
    clicksLimit.current -= 1
    if (decreaseTimeout.current != null) {
      clearTimeout(decreaseTimeout.current)
    }
    decreaseTimeout.current = setTimeout(
      () =>
        setProgress((prev) => {
          prev -= DECREASE_STEP
          if (prev < 0) {
            prev = 0
          }
          return prev
        }),
      80,
    )
    if (progress >= 100) {
      if (activeTimeout.current != null) {
        clearTimeout(activeTimeout.current)
      }
      clearTimeout(decreaseTimeout.current)
      callClient(MineGameEvents.Win)
    }
  }, [progress])

  return !isOpen ? null : (
    <div className="MineGame">
      <div className="title">Добыча руды</div>
      <div className="helper">
        Разбейте породу, нажимая лкм в необходимые моменты
      </div>
      <div className="game">
        <div className="progress">
          <div className="line" style={{ width: `${progress}%` }} />
        </div>
        <div className="stone" />
        <div
          className="pickaxe"
          style={{ left: calcVh((374 / 100) * progress - 18) }}
        />
      </div>
      <div className={`mouse ${isActive && '-active'}`} />
    </div>
  )
}

export default MineGame
