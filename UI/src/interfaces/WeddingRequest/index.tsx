import React, { useEffect, useRef, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CSSTransition } from 'react-transition-group'
import { weddingRequestActions } from './reducer'
import { callClient } from '../../utils/api'
import {
  WeddingRequestEvents,
  WeddingRequestPayloads,
} from '../../shared/WeddingRequest/events'
import { KeyCodes } from '../../utils/keyCodes'
import { useEscClose } from '../../hooks/useEscClose'

const WeddingRequest: React.FC = () => {
  const dispatch = useAppDispatch()
  const { isOpen, players } = useAppSelector((state) => state.weddingRequest)
  const nodeRef = useRef(null)
  const [activePlayerId, setActivePlayerId] = useState(null)

  useEscClose({
    isOpenInterface: isOpen,
    closeEvent: WeddingRequestEvents.Close,
  })

  useEffect(() => {
    setActivePlayerId(null)
  }, [players, isOpen])

  const renderPlayers = () =>
    players.map(({ id, name }) => {
      const isActive = activePlayerId === id
      const setActive = () => setActivePlayerId(id)

      return (
        <div
          key={id}
          className={`player ${isActive && '-active'}`}
          onClick={setActive}
        >
          {name}
        </div>
      )
    })

  return (
    <CSSTransition
      in={isOpen}
      timeout={0}
      mountOnEnter
      unmountOnExit
      classNames="WeddingRequest"
      nodeRef={nodeRef}
    >
      <div className="WeddingRequest" ref={nodeRef}>
        <div className="window">
          <div className="title">Бракосочетание</div>
          <div
            className="close"
            onClick={() => callClient(WeddingRequestEvents.Close)}
          />
          <div className="description">
            Бракосочетание позволяет игрокам связать себя узами брака с
            персонажем, создавая семью в игровом мире и предоставляя различные
            преимущества.
          </div>
          <div className="row">
            <div className="title">Выберите игрока</div>
            <div className="helper">(На расстоянии 100м)</div>
          </div>
          <div className="players">{renderPlayers()}</div>
          <div className="button-container">
            <div
              className={`button ${activePlayerId == null && '-disabled'}`}
              onClick={() => {
                if (activePlayerId == null) {
                  return
                }
                const payload: WeddingRequestPayloads[WeddingRequestEvents.Request] =
                  { playerId: activePlayerId }
                callClient(WeddingRequestEvents.Request, payload)
              }}
            >
              Сделать предложение
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}

export default WeddingRequest
