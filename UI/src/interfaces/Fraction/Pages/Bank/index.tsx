import './styles.sass'
import React, { useState } from 'react'
import { useAppSelector } from '../../../../hooks/redux'
import { PageType } from '../../../../shared/Fraction/PageType'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'
import { callClient } from '../../../../utils/api'
import {
  FractionEvents,
  FractionSetWarehouseIsOpenPayload,
} from '../../../../shared/Fraction/events'
import { LogType } from '../../../../shared/Fraction/page/PageBank'

type Filter = {
  id: LogType
  name: string
}

const Filters: Filter[] = [
  { id: LogType.Take, name: 'Изъятие из хранилища' },
  { id: LogType.Put, name: 'Добавление в хранилище' },
  { id: LogType.Tax, name: 'Пополнение казны' },
]

const PageBank = () => {
  const [isOpenFilters, setIsOpenFilters] = useState(false)
  const [activeFilterIds, setActiveFilterIds] = useState<any[]>([
    LogType.Take,
    LogType.Put,
    LogType.Tax,
  ])

  const { pages } = useAppSelector((state) => state.fraction)
  const info = pages.find((el) => el.type === PageType.Bank)
  if (!info || info.type !== PageType.Bank) {
    return null
  }
  const { balance, isWarehouseOpen, logs } = info

  const renderFilters = () =>
    Filters.map(({ id, name }) => {
      const isActive = activeFilterIds.includes(id)
      const toggle = () => {
        if (isActive) {
          setActiveFilterIds((prev) => prev.filter((el) => el !== id))
        } else {
          setActiveFilterIds((prev) => [...prev, id])
        }
      }

      return (
        <div key={id} className="filter" onClick={toggle}>
          <div className={`checkbox ${isActive && '-active'}`} />
          <div className="name">{name}</div>
        </div>
      )
    })

  const renderList = () =>
    logs.map(({ datetime, action, type }, index) => {
      if (!activeFilterIds.includes(type)) {
        return null
      }
      return (
        <div key={index} className="log">
          <div className="block -datetime">{datetime}</div>
          <div className="block -action">{action}</div>
        </div>
      )
    })

  return (
    <div className="_PageBank">
      <div className="block -balance">
        <div className="title">Хранилище</div>
        <div className="balance">{numberWithSeparator(balance, ' ')}</div>
      </div>

      <div className="block -warehouse">
        <div className="title">Склад</div>
        <div className="switch">
          <div
            className={`item ${isWarehouseOpen && '-active'}`}
            onClick={() => {
              const payload: FractionSetWarehouseIsOpenPayload = {
                isOpen: true,
              }
              callClient(FractionEvents.SetWarehouseIsOpen, payload)
            }}
          >
            <div className="background" />
            <div className="active" />
            <div className="content">Открыто</div>
          </div>
          <div
            className={`item ${!isWarehouseOpen && '-active'}`}
            onClick={() => {
              const payload: FractionSetWarehouseIsOpenPayload = {
                isOpen: false,
              }
              callClient(FractionEvents.SetWarehouseIsOpen, payload)
            }}
          >
            <div className="background" />
            <div className="active" />
            <div className="content">Закрыто</div>
          </div>
        </div>
      </div>

      <div className="logs">
        <div className="header">
          <div className="title">Журнал событий</div>
          <div
            className="filter"
            onClick={() => setIsOpenFilters((prev: boolean) => !prev)}
          >
            Фильтр
          </div>
          <div className={`filters ${isOpenFilters && '-opened'}`}>
            {renderFilters()}
          </div>
        </div>
        <div className="titles">
          <div className="title -datetime">Дата / Время</div>
          <div className="title -actions">Действие</div>
        </div>
        <div className="list">{renderList()}</div>
      </div>
    </div>
  )
}

export default PageBank
