import React, { useCallback, useEffect, useRef, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { deathScreenActions } from './reducer'
import { callClient } from '../../utils/api'
import { DeathScreenEvents } from '../../shared/DeathScreen/events'
import { KeyCodes } from '../../utils/keyCodes'
import { escMenuActions } from '../EscMenu/reducer'
import { TimeoutRef } from '../../types/timeoutRef'

const DeathScreen: React.FC = () => {
  const dispatch = useAppDispatch()
  const { isOpen, info, secondsLeft, enabledDieButton } = useAppSelector(
    (state) => state.deathScreen,
  )
  const { isOpen: escMenuIsOpen } = useAppSelector((state) => state.escMenu)
  const [enabledWaitButton, setEnabledWaitButton] = useState(true)
  const timeoutRef = useRef<TimeoutRef>(null)

  useEffect(() => {
    if (timeoutRef.current != null) {
      clearTimeout(timeoutRef.current)
    }
    if (!isOpen) {
      return
    }
    timeoutRef.current = setTimeout(() => {
      dispatch(deathScreenActions.decrementSecondsLeft())
    }, 1000)
  }, [isOpen, secondsLeft])

  useEffect(() => {
    setEnabledWaitButton(true)
  }, [isOpen])

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (
        !isOpen ||
        escMenuIsOpen ||
        event.keyCode !== KeyCodes.Esc ||
        // @ts-expect-error qwe
        window.globalBlocked
      ) {
        return
      }
      // @ts-expect-error qwe
      dispatch(escMenuActions.show())
    },
    [escMenuIsOpen, isOpen],
  )

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp)
    return () => {
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyUp])

  const handleClickDie = () => {
    if (!enabledDieButton) {
      return
    }
    callClient(DeathScreenEvents.Die)
  }

  const handleClickWait = () => {
    if (!enabledWaitButton) {
      return
    }
    setEnabledWaitButton(false)
    callClient(DeathScreenEvents.Wait)
  }

  return !isOpen ? null : (
    <div className={`DeathScreen ${escMenuIsOpen && '-hidden'}`}>
      <div className="background">
        <div className="decoration -sword" />
        <div className="decoration -blood-left" />
        <div className="decoration -blood-right" />
      </div>
      <div className="content">
        <div className="header">
          <div className="title">На грани смерти</div>
          <div className="info">
            {info.killer.length > 0 && (
              <div className="block">
                <div className="title">Вас атаковал:</div>
                <div className="value">{info.killer}</div>
              </div>
            )}
            <div className="separator" />
            <div className="block">
              <div className="title">Дата и время:</div>
              <div className="value">{info.datetime}</div>
            </div>
            <div className="separator" />
            {info.weapon.length > 0 && (
              <div className="block">
                <div className="title">Оружие:</div>
                <div className="value">{info.weapon}</div>
              </div>
            )}
          </div>
        </div>
        <div className="helper">
          Вы еще живы, поэтому можете подождать помощи или
          <br />
          смириться и покинуть этот бренный мир.
        </div>
        <div className="controls">
          <div className="buttons">
            <div
              className={`button -die ${!enabledDieButton && '-disabled'}`}
              onClick={handleClickDie}
            >
              Умереть
            </div>
            <div
              className={`button -wait ${!enabledWaitButton && '-hidden'}`}
              onClick={handleClickWait}
            >
              Ждать помощи
            </div>
          </div>
          <div className={`timer ${secondsLeft <= 0 && '-hidden'}`}>
            <div className="title">Смерть наступит через:</div>
            <div className="value">{secondsLeft} сек</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeathScreen
