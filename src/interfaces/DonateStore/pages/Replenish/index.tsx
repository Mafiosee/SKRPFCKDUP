import './styles.sass'
import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { Tab } from '../../enums/Tabs'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'
import { ApiFunctions } from '../../api'
import { DonateStoreEvents } from '../../../../shared/DonateStore/events'
import { donateStoreActions } from '../../reducer'

const PageReplenish: React.FC = () => {
  const dispatch = useAppDispatch()
  const {
    tab,
    giftPlayer,
    replenishPage: { bonuses, replenishBlock, exchangeBlock },
  } = useAppSelector((state) => state.donateStore)
  const [replenish, setReplenish] = useState<{
    isOpen: boolean
    sum: number | ''
    input: string
  }>({ isOpen: false, sum: '', input: '' })
  const [exchange, setExchange] = useState<{
    isOpen: boolean
    sum: number | ''
    input: string
  }>({ isOpen: false, sum: '', input: '' })

  const isOpen = useMemo(() => tab === Tab.Replenish, [tab])

  useEffect(() => {
    dispatch(donateStoreActions.setGiftPlayer(null))
  }, [dispatch, replenish.isOpen, exchange.isOpen])

  return (
    <div
      className="_PageReplenish"
      style={{
        transform: `translateX(-${tab * 100}%)`,
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
      }}
    >
      <div className="col -blocks">
        <div className="block -replenish">
          <div className="title">Пополнение</div>
          <div className="row">
            <input
              type="text"
              placeholder="Введите сумму"
              value={replenish.sum}
              onChange={({ target: { value } }) => {
                let newSum: number | '' = ''
                if (value.length) {
                  const intValue = parseInt(value)
                  if (isNaN(intValue) || intValue < 0) {
                    return
                  }
                  if (intValue > 500000) {
                    newSum = 500000
                  } else {
                    newSum = intValue
                  }
                }
                setReplenish((prev) => ({ ...prev, sum: newSum }))
              }}
            />
            <div className="info">
              <div className="title">
                {+replenish.sum < replenishBlock.minSum
                  ? 'Курс пополнения:'
                  : 'Сумма пополнения:'}
              </div>
              <div className="value">
                {+replenish.sum < replenishBlock.minSum ? (
                  <>
                    <div className="block">1₽</div>
                    <div className="block">=</div>
                    <div className="block -coin -donate">
                      {numberWithSeparator(replenishBlock.rate, '.')}
                    </div>
                  </>
                ) : (
                  <div className="block -coin -donate">
                    {numberWithSeparator(+replenish.sum, '.')}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="minSum">
            Сумма должна быть не менее{' '}
            {numberWithSeparator(replenishBlock.minSum, '.')}₽
          </div>
          <div className="buttons">
            <div
              className={`button ${+replenish.sum >= replenishBlock.minSum && +replenish.sum <= 500000 && '-active'}`}
              onClick={() => {
                if (
                  +replenish.sum < replenishBlock.minSum ||
                  +replenish.sum > 500000
                ) {
                  return
                }
                ApiFunctions[DonateStoreEvents.Replenish]({
                  sum: +replenish.sum,
                })
              }}
            >
              Пополнить
            </div>
            <div
              className={`button -gift ${+replenish.sum >= replenishBlock.minSum && +replenish.sum <= 500000 && '-active'}`}
              onClick={() => {
                if (
                  +replenish.sum < replenishBlock.minSum &&
                  +replenish.sum > 500000
                ) {
                  return
                }
                setReplenish((prev) => ({ ...prev, isOpen: true, input: '' }))
              }}
            >
              Подарить игроку
            </div>
          </div>
        </div>

        <div className="block -exchange">
          <div className="title">Обмен валюты</div>
          <div className="row">
            <input
              type="text"
              placeholder="Введите сумму"
              value={exchange.sum}
              onChange={({ target: { value } }) => {
                let newSum: number | '' = ''
                if (value.length) {
                  const intValue = parseInt(value)
                  if (isNaN(intValue) || intValue < 0) {
                    return
                  }
                  newSum = intValue
                }
                setExchange((prev) => ({ ...prev, sum: newSum }))
              }}
            />
            <div className="icon" />
            <div className="info">
              <div className="title">Курс обмена:</div>
              <div className="value">
                <div className="block -coin -donate">1</div>
                <div className="block">=</div>
                <div className="block -coin -ingame">
                  {numberWithSeparator(exchangeBlock.rate, '.')}
                </div>
              </div>
            </div>
          </div>
          <div className="minSum">
            Сумма должна быть не менее{' '}
            {numberWithSeparator(exchangeBlock.minSum, '.')}₽
          </div>
          <div className="buttons">
            <div
              className={`button ${+exchange.sum >= exchangeBlock.minSum && '-active'}`}
              onClick={() => {
                if (+exchange.sum < exchangeBlock.minSum) {
                  return
                }
                ApiFunctions[DonateStoreEvents.Exchange]({
                  sum: +exchange.sum,
                })
              }}
            >
              Обменять
            </div>
            <div
              className={`button -gift ${+exchange.sum >= exchangeBlock.minSum && '-active'}`}
              onClick={() => {
                if (+exchange.sum < exchangeBlock.minSum) {
                  return
                }
                setExchange((prev) => ({ ...prev, isOpen: true, input: '' }))
              }}
            >
              Подарить игроку
            </div>
          </div>
        </div>
      </div>
      <div className="col -bonuses">
        <div className="bonus -green">
          <div className="title">
            <div className="colored">{bonuses.small.percent}%</div>
            <div className="text">в подарок от</div>
            <div className="colored">
              {numberWithSeparator(bonuses.small.sum, '.')} ₽
            </div>
          </div>
          <div className="description">
            Пополните баланс на сумму от{' '}
            {numberWithSeparator(bonuses.small.sum, '.')} ₽<br />и получите{' '}
            {bonuses.small.percent}% в подарок
          </div>
        </div>
        <div className="bonus -yellow">
          <div className="title">
            <div className="colored">{bonuses.medium.percent}%</div>
            <div className="text">в подарок от</div>
            <div className="colored">
              {numberWithSeparator(bonuses.medium.sum, '.')} ₽
            </div>
          </div>
          <div className="description">
            Пополните баланс на сумму от{' '}
            {numberWithSeparator(bonuses.medium.sum, '.')} ₽<br />и получите{' '}
            {bonuses.medium.percent}% в подарок
          </div>
        </div>
        <div className="bonus -red">
          <div className="title">
            <div className="colored">{bonuses.large.percent}%</div>
            <div className="text">в подарок от</div>
            <div className="colored">
              {numberWithSeparator(bonuses.large.sum, '.')} ₽
            </div>
          </div>
          <div className="description">
            Пополните баланс на сумму от{' '}
            {numberWithSeparator(bonuses.large.sum, '.')} ₽<br />и получите{' '}
            {bonuses.large.percent}% в подарок
          </div>
        </div>
      </div>

      <div className={`giftReplenish ${replenish.isOpen && '-show'}`}>
        <div className="shadow" />
        <div className="window">
          <div className="title">Подарок игроку</div>
          <div
            className="close"
            onClick={() => setReplenish((prev) => ({ ...prev, isOpen: false }))}
          />
          <div className="helper">Вы дарите:</div>
          <div className="sum">
            {numberWithSeparator(+replenish.sum * replenishBlock.rate, '.')}
          </div>
          <div className="helper">Введите UID игрока:</div>
          <div className="input">
            <div
              className={`block ${(giftPlayer != null || replenish.input.length) && '-active'}`}
            >
              {giftPlayer ? (
                <div className="player">
                  {giftPlayer.name} (UID: {giftPlayer.uid})
                </div>
              ) : (
                <input
                  type="text"
                  placeholder="Например: AB1"
                  value={replenish.input}
                  onChange={(event) =>
                    setReplenish((prev) => ({
                      ...prev,
                      input: event.target.value,
                    }))
                  }
                />
              )}
            </div>
            <div
              className={`button ${giftPlayer != null && '-cancel'} ${replenish.input.length && '-active'}`}
              onClick={() => {
                if (giftPlayer != null) {
                  dispatch(donateStoreActions.setGiftPlayer(null))
                } else if (replenish.input.length) {
                  ApiFunctions[DonateStoreEvents.RequestGiftPlayer]({
                    uid: replenish.input,
                  })
                }
              }}
            />
          </div>
          <div className="buttons">
            <div
              className={`button -gift ${giftPlayer != null && '-active'}`}
              onClick={() => {
                if (giftPlayer != null) {
                  ApiFunctions[DonateStoreEvents.ReplenishGift]({
                    sum: +replenish.sum,
                    playerUid: giftPlayer.uid,
                  })
                }
                setReplenish((prev) => ({ ...prev, isOpen: false }))
              }}
            >
              <div className="content">
                <div className="text">Подарить</div>
                <div className="price">
                  {numberWithSeparator(
                    +replenish.sum * replenishBlock.rate,
                    '.',
                  )}
                </div>
              </div>
            </div>
            <div
              className="button -cancel"
              onClick={() =>
                setReplenish((prev) => ({ ...prev, isOpen: false }))
              }
            >
              Отмена
            </div>
          </div>
        </div>
      </div>

      <div className={`giftExchange ${exchange.isOpen && '-show'}`}>
        <div className="shadow" />
        <div className="window">
          <div className="title">Подарок игроку</div>
          <div
            className="close"
            onClick={() => setExchange((prev) => ({ ...prev, isOpen: false }))}
          />
          <div className="helper">Вы дарите:</div>
          <div className="sum">
            {numberWithSeparator(+exchange.sum * exchangeBlock.rate, '.')}
          </div>
          <div className="helper">Введите UID игрока:</div>
          <div className="input">
            <div
              className={`block ${(giftPlayer != null || exchange.input.length) && '-active'}`}
            >
              {giftPlayer ? (
                <div className="player">
                  {giftPlayer.name} (UID: {giftPlayer.uid})
                </div>
              ) : (
                <input
                  type="text"
                  placeholder="Например: AB1"
                  value={exchange.input}
                  onChange={(event) =>
                    setExchange((prev) => ({
                      ...prev,
                      input: event.target.value,
                    }))
                  }
                />
              )}
            </div>
            <div
              className={`button ${giftPlayer != null && '-cancel'} ${exchange.input.length && '-active'}`}
              onClick={() => {
                if (giftPlayer != null) {
                  dispatch(donateStoreActions.setGiftPlayer(null))
                } else if (exchange.input.length) {
                  ApiFunctions[DonateStoreEvents.RequestGiftPlayer]({
                    uid: exchange.input,
                  })
                }
              }}
            />
          </div>
          <div className="buttons">
            <div
              className={`button -gift ${giftPlayer != null && '-active'}`}
              onClick={() => {
                if (giftPlayer != null) {
                  ApiFunctions[DonateStoreEvents.ExchangeGift]({
                    sum: +exchange.sum,
                    playerUid: giftPlayer.uid,
                  })
                }
                setExchange((prev) => ({ ...prev, isOpen: false }))
              }}
            >
              <div className="content">
                <div className="text">Подарить</div>
                <div className="price">
                  {numberWithSeparator(+exchange.sum * exchangeBlock.rate, '.')}
                </div>
              </div>
            </div>
            <div
              className="button -cancel"
              onClick={() =>
                setExchange((prev) => ({ ...prev, isOpen: false }))
              }
            >
              Отмена
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageReplenish
