import './styles.sass'
import React, { useMemo, useState } from 'react'
import { useAppSelector } from '../../../../hooks/redux'
import { PeriodList, PeriodName } from '../../types/Period'
import { StatisticIcons } from '../../assets/StatisticIcons'
import { Period } from '../../../../shared/ProductBusiness/Statistic'

const Statistics: React.FC = () => {
  const { statistics } = useAppSelector((state) => state.productBusinesses)
  const [activePeriod, setActivePeriod] = useState(Period.Day)
  const [openedPeriods, setOpenedPeriods] = useState(false)

  const renderedStatistics = useMemo(
    () =>
      statistics.map((statistic) => (
        <div key={statistic.id} className="statistic">
          <div className="name">{statistic.name}</div>
          <div className="row">
            <div
              className="icon"
              style={{
                backgroundImage: `url(${StatisticIcons[`${statistic.icon}.svg`]})`,
              }}
            />
            <div className="value">{statistic.value[activePeriod]}</div>
          </div>
        </div>
      )),
    [statistics, activePeriod],
  )

  return (
    <div className="_Statistics">
      <div className="title">Показатели</div>
      <div className="select" onClick={() => setOpenedPeriods((prev) => !prev)}>
        <div className={`current ${openedPeriods && '-opened'}`}>
          {PeriodName[activePeriod]}
        </div>
        <div className={`list ${openedPeriods && '-opened'}`}>
          {PeriodList.map((period: Period) => {
            const setActive = () => setActivePeriod(period)

            return (
              <div key={period} className="period" onClick={setActive}>
                {PeriodName[period]}
              </div>
            )
          })}
        </div>
      </div>
      <div className="list">{renderedStatistics}</div>
    </div>
  )
}

export default Statistics
