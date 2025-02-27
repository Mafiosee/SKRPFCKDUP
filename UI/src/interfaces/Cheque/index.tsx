import React, { useRef, useState } from 'react'
import './styles.sass'
import { useAppSelector } from '../../hooks/redux'
import { CSSTransition } from 'react-transition-group'
import { callClient } from '../../utils/api'
import { ChequeAcceptPayload, ChequeEvents } from '../../shared/Cheque/events'
import { onChangeInput } from '../../utils/onChangeInput'
import { numberWithSeparator } from '../../utils/numberWithSeparator'
import { useEscClose } from '../../hooks/useEscClose'

const Cheque = () => {
  const { isOpen, from, to } = useAppSelector((state) => state.cheque)
  const nodeRef = useRef(null)
  const [sum, setSum] = useState<number | string>('')

  useEscClose({ isOpenInterface: isOpen, closeEvent: ChequeEvents.Cancel })

  return (
    <CSSTransition
      in={isOpen}
      timeout={0}
      mountOnEnter
      unmountOnExit
      classNames="Cheque"
      nodeRef={nodeRef}
    >
      <div className="Cheque" ref={nodeRef}>
        <div className="window">
          <div
            className="close"
            onClick={() => callClient(ChequeEvents.Cancel)}
          />

          <div className="title">Центральный банк Скайрима</div>

          <div className="info">
            <div className="row">
              <div className="title">От кого:</div>
              <div className="value">{from}</div>
            </div>
            <div className="row">
              <div className="title">Получатель:</div>
              <div className="value">{to}</div>
            </div>
          </div>

          <input
            type="text"
            placeholder="Введите сумму"
            value={+sum > 0 ? numberWithSeparator(+sum, ' ') : sum}
            onChange={(event) =>
              onChangeInput({
                value: event.target.value.replace(/\s/g, ''),
                setFunc: setSum,
              })
            }
          />

          <div className="buttons">
            <div
              className="button -accept"
              onClick={() => {
                let intSum = typeof sum === 'string' ? parseInt(sum) : sum
                if (isNaN(intSum) || intSum < 0) {
                  intSum = 0
                }
                const payload: ChequeAcceptPayload = { sum: intSum }
                callClient(ChequeEvents.Accept, payload)
              }}
            >
              Выписать чек
            </div>
            <div
              className="button -cancel"
              onClick={() => callClient(ChequeEvents.Cancel)}
            >
              Отмена
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}

export default Cheque
