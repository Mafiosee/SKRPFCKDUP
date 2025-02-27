import React, { useEffect, useState } from 'react'
import './styles.sass'
import { useAppSelector } from '../../hooks/redux'
import Frame from './components/Frame'
import { numberWithSeparator } from '../../utils/numberWithSeparator'
import { Interval } from '../../shared/ManufacturingBusiness/Interval'
import { IntervalName } from './data/Interval'
import {
  ManufacturingBusinessEvents,
  ManufacturingBusinessPayloads,
} from '../../shared/ManufacturingBusiness/events'
import { callClient } from '../../utils/api'
import { enumerate } from '../../utils/enumerate'
import Slider from 'rc-slider'
import { useEscClose } from '../../hooks/useEscClose'

const ManufacturingBusiness: React.FC = () => {
  const { isOpen, info, members, tax } = useAppSelector(
    (state) => state.manufacturingBusinesses,
  )
  const [interval, setInterval] = useState<Interval>(Interval.Day)
  const [isOpenIntervals, setIsOpenIntervals] = useState(false)
  const [taxInfo, setTaxInfo] = useState({ isOpen: false, days: 0 })

  useEscClose({
    isOpenInterface: isOpen,
    closeEvent: ManufacturingBusinessEvents.Close,
  })

  useEffect(() => {
    setTaxInfo((prev) => ({ ...prev, days: tax.days.min }))
  }, [tax.days.min])

  const reset = () => {
    setInterval(Interval.Day)
    setIsOpenIntervals(false)
    setTaxInfo((prev) => ({ ...prev, isOpen: false }))
  }

  useEffect(() => {
    reset()
  }, [isOpen])

  const getIntervals = () =>
    [Interval.Day, Interval.Week, Interval.Month, Interval.Year].map(
      (interval, idx) => (
        <div
          key={idx}
          className="interval"
          onClick={() => setInterval(interval)}
        >
          {IntervalName[interval]}
        </div>
      ),
    )

  const getList = () =>
    members.map(({ id, name, contracts, profit, join, online }) => (
      <div key={id} className="member">
        <div className="block -name">{name}</div>
        <div className="block -contracts">{contracts}</div>
        <div className="block -profit">{numberWithSeparator(profit, '.')}</div>
        <div className="block -join">{join}</div>
        <div className="block -online">{online}</div>
        <div className="block -action">
          <div
            className="button"
            onClick={() => {
              const payload: ManufacturingBusinessPayloads[ManufacturingBusinessEvents.KickMember] =
                { memberId: id }
              callClient(ManufacturingBusinessEvents.KickMember, payload)
            }}
          >
            Уволить
          </div>
        </div>
      </div>
    ))

  return !isOpen ? null : (
    <div
      className="ManufacturingBusiness"
      onClick={() => setIsOpenIntervals(false)}
    >
      <div className="window">
        <Frame />
        <div className="content">
          <div className="row">
            <div className="title">{info.title}</div>
            <div className="select">
              <div
                className={`current ${isOpenIntervals && '-opened'}`}
                onClick={(event) => {
                  event.stopPropagation()
                  setIsOpenIntervals((prev) => !prev)
                }}
              >
                {IntervalName[interval]}
              </div>
              <div className={`list ${isOpenIntervals && '-opened'}`}>
                {getIntervals()}
              </div>
            </div>
          </div>
          <div className="info">
            <div className="content">
              <div className="col">
                <div className="row">
                  <div className="title -contracts">Выполненно контрактов:</div>
                  <div className="value">{info.contracts[interval]}</div>
                </div>
                <div className="row">
                  <div className="title -members">Работников:</div>
                  <div className="value">
                    {members.length}/{info.maxMembers}
                  </div>
                </div>
              </div>
              <div className="line" />
              <div className="col">
                <div className="row">
                  <div className="title -money">Прибыль:</div>
                  <div className="value -money">
                    {numberWithSeparator(info.profit[interval], '.')}
                  </div>
                </div>
                <div className="row">
                  <div className="title -tax">Налог оплачен до::</div>
                  <div className="value -tax">
                    <div className="datetime">{info.taxDatetime}</div>
                    <div
                      className="button"
                      onClick={() =>
                        setTaxInfo((prev) => ({ ...prev, isOpen: true }))
                      }
                    >
                      Оплатить
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="helper">Популярность товаров</div>
          <div className="titles">
            <div className="title -name">Наименование товара</div>
            <div className="title -contracts">Выполнено контрактов</div>
            <div className="title -profit">Прибыль</div>
            <div className="title -join">Принят на работу</div>
            <div className="title -online">Был онлайн</div>
            <div className="title -action">Действие</div>
          </div>
          <div className="list">
            <div className="content">{getList()}</div>
            {members.length > 5 && <div className="shadow" />}
          </div>
        </div>
      </div>

      <div className={`tax ${taxInfo.isOpen && '-opened'}`}>
        <div className="window">
          <div className="title">Оплата налога</div>
          <div
            className="close"
            onClick={() => setTaxInfo((prev) => ({ ...prev, isOpen: false }))}
          />
          <div className="row">
            <div className="block">
              <div className="title">Выбрано дней:</div>
              <div className="value">{taxInfo.days}</div>
            </div>
            <div className="separator" />
            <div className="block">
              <div className="title">Стоимость:</div>
              <div className="value -money">
                {numberWithSeparator(tax.price * taxInfo.days, '.')}
              </div>
            </div>
          </div>
          <div className="control">
            <div className="helper">
              {tax.days.min} {enumerate(tax.days.min, ['день', 'дня', 'дней'])}
            </div>
            <div className="slider">
              <Slider
                min={tax.days.min}
                max={tax.days.max}
                step={1}
                value={taxInfo.days}
                onChange={(newValue) => {
                  if (Array.isArray(newValue)) {
                    return
                  }
                  setTaxInfo((prev) => ({ ...prev, days: newValue }))
                }}
                keyboard={false}
              />
            </div>
            <div className="helper">
              {tax.days.max} {enumerate(tax.days.max, ['день', 'дня', 'дней'])}
            </div>
          </div>
          <div className="buttons">
            <div
              className="button -accept"
              onClick={() => {
                setTaxInfo((prev) => ({ ...prev, isOpen: false }))
                const payload: ManufacturingBusinessPayloads[ManufacturingBusinessEvents.PayTax] =
                  { days: taxInfo.days }
                callClient(ManufacturingBusinessEvents.PayTax, payload)
              }}
            >
              Применить
            </div>
            <div
              className="button -cancel"
              onClick={() => setTaxInfo((prev) => ({ ...prev, isOpen: false }))}
            >
              Отмена
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManufacturingBusiness
