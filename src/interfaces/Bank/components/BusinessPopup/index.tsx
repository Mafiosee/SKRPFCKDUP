import './styles.sass'
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { Tab, TabName } from './types'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'

type PropsType = {
  opened: boolean
  close: () => void
  info: {
    name: string
    has: boolean
    date: string
    rent: number
    balance: number
  }
  payRent: (days: number) => void
  openReplenish: () => void
  openWithdraw: () => void
}

const BusinessPopup: React.FC<PropsType> = ({
  opened,
  close,
  info,
  payRent,
  openReplenish,
  openWithdraw,
}) => {
  const [activeTabId, setActiveTabId] = useState(Tab.Balance)
  const [days, setDays] = useState('')

  useEffect(() => {
    setActiveTabId(Tab.Balance)
    setDays('')
  }, [opened])

  const handleInputDays = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value.length) {
      return setDays('')
    }

    let intValue = parseInt(event.target.value)

    if (isNaN(intValue) || intValue < 0) {
      return
    }

    if (intValue > 30) {
      intValue = 30
    }

    setDays(intValue.toString())
  }

  const renderedTabs = useMemo(
    () =>
      Object.values(Tab).map((tabId) => {
        const isActive = tabId === activeTabId
        const setActive = () => setActiveTabId(tabId)
        const name = TabName[tabId]

        return (
          <div
            key={tabId}
            className={`tab ${isActive && '-active'}`}
            onClick={setActive}
          >
            {name}
          </div>
        )
      }),
    [activeTabId],
  )

  const handlePayRent = () => {
    const intDays = parseInt(days)
    if (isNaN(intDays) || intDays < 0) {
      return
    }
    payRent(intDays)
    setDays('')
  }

  return (
    <div className={`_BusinessPopup ${opened && '-show'}`}>
      <div className="window">
        <div className="info">
          <div className="name">Бизнес</div>
          <div className="cross" onClick={close} />
        </div>
        <div className="bg" />

        <div className="content">
          <div className="tabs">
            <div className="content">{renderedTabs}</div>
          </div>

          {activeTabId === Tab.Balance && (
            <div className="tab">
              <div className="name">{info.name}</div>
              <div className="info">
                <div className="title">Баланс бизнеса:</div>
                <div className="value">
                  {numberWithSeparator(info.balance, '.')}
                </div>
              </div>
              <div className="buttons">
                <div className="button" onClick={openReplenish}>
                  Пополнить
                </div>
                <div className="button" onClick={openWithdraw}>
                  Снять
                </div>
              </div>
            </div>
          )}
          {activeTabId === Tab.Rent && (
            <div className="tab">
              <div className="name">{info.name}</div>
              <div className="helper">Оплачен до: {info.date}</div>
              <div className="line" />
              <div className="info">
                <div className="title">Стоимость аренды:</div>
                <div className="value">
                  {numberWithSeparator(info.rent, '.')} / час
                </div>
              </div>
              <div className="input">
                <input
                  className={`${days.length && '-filled'}`}
                  type="text"
                  placeholder="Кол-во часов"
                  value={days}
                  onChange={handleInputDays}
                />
                <div className="button" onClick={handlePayRent}>
                  <div className="title">Продлить</div>
                  <div className="value">
                    {numberWithSeparator((+days ?? 0) * info.rent, '.')}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BusinessPopup
