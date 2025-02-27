import React, { useCallback, useEffect, useRef, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CSSTransition } from 'react-transition-group'
import { deathScreenActions } from './reducer'
import { callClient } from '../../utils/api'
import { DeathScreenEvents } from '../../shared/DeathScreen/events'
import { calcVh } from '../../utils/calcVh'
import { KeyCodes } from '../../utils/keyCodes'
import { escMenuActions } from '../EscMenu/reducer'

const FeaturesTextInfo = {
  title: 'Вы тяжело ранены',
}

const DeathScreen: React.FC = () => {
  const dispatch = useAppDispatch()
  const { isOpen, lifeTime, showWaitBtn } = useAppSelector(
    (state) => state.deathScreen,
  )
  const { isOpen: escMenuIsOpen } = useAppSelector((state) => state.escMenu)
  const [seconds, setSeconds] = useState(0)
  const nodeRef = useRef(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 0) {
          clearInterval(timer)
          return 0
        }
        return prevSeconds - 1
      })
      dispatch(deathScreenActions.timerLifeTime())
    }, 1000)

    return () => clearInterval(timer)
  }, [isOpen, lifeTime])

  useEffect(() => {
    setSeconds(lifeTime)
  }, [lifeTime])

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (
        !isOpen ||
        escMenuIsOpen ||
        event.keyCode !== KeyCodes.Esc ||
        window.globalBlocked
      ) {
        return
      }
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

  const onClickDie = () => {
    if (seconds > 0) {
      return
    }
    callClient(DeathScreenEvents.Die)
  }

  const onClickWait = () => {
    // dispatch(deathScreenActions.setShowWaitBtn(false));
    callClient(DeathScreenEvents.Wait)
  }

  return (
    <CSSTransition
      in={isOpen}
      timeout={0}
      mountOnEnter
      unmountOnExit
      classNames="DeathScreen"
      nodeRef={nodeRef}
    >
      <div
        className={`DeathScreen ${escMenuIsOpen && '-hidden'}`}
        ref={nodeRef}
      >
        <div className="bg" />
        <div className="content">
          <div className={`shadow hearth-animate`} />
          <div className="content">
            <div className="icon" />
            <div className="title">{FeaturesTextInfo.title}</div>
            <div className="btns">
              <div
                style={{ width: `${!showWaitBtn && calcVh(370)}` }}
                className={`btn ${showWaitBtn && '-primary'} ${!showWaitBtn && '-large-primary'} ${seconds > 0 && '-disabled'}`}
                onClick={onClickDie}
              >
                Умереть
              </div>
              {showWaitBtn && (
                <div className={`btn -secondary`} onClick={onClickWait}>
                  Ждать помощь
                </div>
              )}
            </div>
            {seconds > 0 && (
              <div className="info">
                <div>Смерть наступит через</div>{' '}
                <div>{seconds > 0 ? seconds : '...'}</div>{' '}
              </div>
            )}
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}

export default DeathScreen
