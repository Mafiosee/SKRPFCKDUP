import React, { useMemo, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { numberWithSeparator } from '../../utils/numberWithSeparator'
import { callClient } from '../../utils/api'
import { QualityColors } from '../Inventory/data'
import Frame from '../Inventory/components/Frame'
import { buyCasesActions } from './reducer'
import { getImageUrlBySourceType } from '../../utils/getImageUrlBySourceType'
import {
  DonateStoreEvents,
  DonateStorePayloads,
} from '../../shared/DonateStore/events'
import { useEscClose } from '../../hooks/useEscClose'

const BuyCases = () => {
  const dispatch = useAppDispatch()
  const { isOpen, caseItem, balance } = useAppSelector(
    (state) => state.buyCases,
  )
  const [amount, setAmount] = useState(1)
  useEscClose({
    isOpenInterface: isOpen,
    closeFunc: () => dispatch(buyCasesActions.hide()),
  })

  const onChangeBuyAmount = (diff: number) => {
    const newAmount = amount + diff
    if (newAmount < 1 || newAmount > 999) {
      return
    }
    setAmount(newAmount)
  }

  const isActiveBuyBtn = useMemo(() => {
    return caseItem.price * amount <= balance
  }, [caseItem, amount, balance])

  return !isOpen ? null : (
    <div id="BuyCases">
      <div className="window">
        <Frame
          title="Купить кейс"
          closeFunc={() => dispatch(buyCasesActions.hide())}
        />
        <div className="product">
          <div className="image">
            <div
              className="quality"
              style={{
                backgroundColor: QualityColors[caseItem.quality],
              }}
            />
            <div className="bg" />
            <div
              className="item"
              style={{
                backgroundImage: `url(${getImageUrlBySourceType(caseItem.image.name, caseItem.image.sourceType)})`,
              }}
            />
          </div>
          <div className="col">
            <div className="name">{caseItem.name}</div>
            <div className="amount">
              <div
                className="btn -minus"
                onClick={() => onChangeBuyAmount(-1)}
              />
              <div className="current">{amount}</div>
              <div className="btn -plus" onClick={() => onChangeBuyAmount(1)} />
            </div>
          </div>
        </div>
        <div className="line" />
        <div className="sumToPay">
          <div className="title">Итого к оплате:</div>
          <div className="sum">
            {numberWithSeparator(caseItem.price * amount, ' ')}
          </div>
          <div className="balance">
            <div className="title">Баланс:</div>
            <div className="value">{numberWithSeparator(balance, ' ')}</div>
          </div>
        </div>
        <div
          className={`-button2 ${isActiveBuyBtn && '-active'}`}
          onClick={() => {
            if (!isActiveBuyBtn) {
              return
            }
            const payload: DonateStorePayloads[DonateStoreEvents.CaseBuy] = {
              caseId: caseItem.id,
              amount,
            }
            callClient(DonateStoreEvents.CaseBuy, payload)
            dispatch(buyCasesActions.hide())
          }}
        >
          Купить
        </div>
      </div>
    </div>
  )
}

export default BuyCases
