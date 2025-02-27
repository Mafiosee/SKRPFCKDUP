import './styles.sass'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ExitHelper from '../ExitHelper'
import { useAppDispatch } from '../../../../hooks/redux'
import { KeyCodes } from '../../../../utils/keyCodes'
import { calcVh } from '../../../../utils/calcVh'
import { FILL_STEP, TICK_TIME_MS } from './config'
import { honeyFactoryActions } from '../../reducer'

const GameBottles = () => {
  const dispatch = useAppDispatch()
  const [isKeyPressed, setIsKeyPressed] = useState(false)
  const [isKeyBlocked, setIsKeyBlocked] = useState(false)
  const [state, setState] = useState({ bottleIdx: 0, fill: 0 })
  const [tick, setTick] = useState(false)
  const tickTimeout = useRef(null)
  const [isDebounced, setIsDebounced] = useState(false)
  const debounceTimeout = useRef(null)

  const keyDownHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.keyCode !== KeyCodes.E || isKeyBlocked) {
        return
      }
      setIsKeyPressed(true)
      setIsKeyBlocked(true)
    },
    [isKeyBlocked],
  )

  useEffect(() => {
    const keyUpHandler = (event: KeyboardEvent) => {
      if (event.keyCode !== KeyCodes.E) {
        return
      }
      setIsKeyPressed(false)
      setIsKeyBlocked(false)
    }

    document.addEventListener('keyup', keyUpHandler)
    return () => {
      document.removeEventListener('keyup', keyUpHandler)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keyup', keyDownHandler)
    return () => {
      document.removeEventListener('keyup', keyDownHandler)
    }
  }, [keyDownHandler])

  useEffect(() => {
    clearTimeout(tickTimeout.current)
    if (state.bottleIdx > 2) {
      dispatch(
        honeyFactoryActions.setFinishScreen({
          isWin: true,
          text: 'У вас получилось наполнить все бутылки!',
          helper: null,
        }),
      )
    }
    tickTimeout.current = setTimeout(
      () => setTick((prev) => !prev),
      TICK_TIME_MS,
    )
  }, [tick])

  useEffect(() => {
    if (isDebounced || state.bottleIdx > 2 || !isKeyPressed) {
      return
    }
    let newFill = state.fill + FILL_STEP
    if (newFill > 100) {
      newFill = 100
    }
    setState((prev) => ({ ...prev, fill: newFill }))
  }, [tick])

  useEffect(() => {
    if (state.bottleIdx > 2) {
      return
    }
    if (state.fill >= 100) {
      setIsDebounced(true)
      clearTimeout(debounceTimeout.current)
      debounceTimeout.current = setTimeout(() => setIsDebounced(false), 600)
      setIsKeyPressed(false)
      setIsKeyBlocked(false)
      setState((prev) => ({ bottleIdx: ++prev.bottleIdx, fill: 0 }))
    }
  }, [state])

  const getBottle = (bottleIdx: number, className: string) => {
    const isActive = state.bottleIdx === bottleIdx
    const isFilled = state.bottleIdx > bottleIdx

    let fill = 0
    if (isActive) {
      fill = state.fill
    } else if (isFilled) {
      fill = 100
    }

    return (
      <div
        className={`bottle ${className} -idx-${bottleIdx} ${isActive && '-active'} ${isFilled && '-filled'}`}
      >
        <div
          className="fluid"
          style={{
            height: calcVh((463 * fill) / 100),
            transition: `all ${TICK_TIME_MS}ms linear`,
          }}
        />
      </div>
    )
  }

  return (
    <div className="_GameBottles">
      <ExitHelper />
      <div className="cistern">
        <div className="cran">
          <div className={`fluid ${isKeyPressed && !isDebounced && '-show'}`} />
        </div>
        <div
          className={`cranHelper ${(!isKeyPressed || isDebounced) && '-show'}`}
        >
          Для открытия крана нажмите
        </div>
        <div className="info">
          <div className="title">
            Разлитие по
            <br />
            бутылкам
          </div>
          <div className="text">
            Ваша задача наполнить бутылки вкуснейшей медовухой.
            <br />
            Делайте это аккуратно, постарайтесь не проливать!
          </div>
        </div>
      </div>

      <div className="bottles">
        {getBottle(2, '-blue')}
        {getBottle(1, '-orange')}
        {getBottle(0, '-blue')}
      </div>
    </div>
  )
}

export default GameBottles
