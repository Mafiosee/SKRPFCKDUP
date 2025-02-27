import './styles.sass'
import React, { useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useAppSelector } from '../../../../hooks/redux'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'
import { abbrNum } from '../../../../utils/abbrNum'
import { PeriodList, PeriodName } from '../../types/Period'
import { Period } from '../../../../shared/ProductBusiness/Statistic'

const ProfitChart: React.FC = () => {
  const { profit } = useAppSelector((state) => state.productBusinesses)
  const [activePeriod, setActivePeriod] = useState(Period.Day)
  const [openedPeriods, setOpenedPeriods] = useState(false)

  const profitChartData = profit[activePeriod]

  const TickIcon = (props) => {
    // eslint-disable-next-line react/prop-types
    const { x, y, payload } = props

    return (
      <svg
        width="44"
        height="18"
        viewBox="0 0 44 18"
        x={x - 40}
        y={y - 6}
        fill="black"
        xmlns="http://www.w3.org/2000/svg"
      >
        <image
          href={require('../../assets/images/coin.png')}
          height="12"
          width="12"
          x="3"
          y="0"
        />
        <text x="18" y="11" fill="#A3A3A3" fontWeight={500} fontSize={16}>
          {/* eslint-disable-next-line react/prop-types */}
          {abbrNum(payload.value, 3)}
        </text>
      </svg>
    )
  }

  return (
    <div className="_ProfitChart">
      <div className="header">
        <div className="title">Доходность</div>
        <div className="line" />
        <div
          className="select"
          onClick={() => setOpenedPeriods((prev) => !prev)}
        >
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
      </div>
      <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart width={750} data={profitChartData}>
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fff" stopOpacity={0.05} />
                <stop offset="100%" stopColor="#fff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255, 255, 255, .04)" strokeWidth={1} />
            <XAxis
              dataKey="time"
              orientation="bottom"
              axisLine={false}
              padding={{ left: 16, right: 16 }}
              stroke="#A3A3A3"
              fontWeight={500}
              fontSize={16}
            />
            <YAxis
              dataKey="profit"
              axisLine={false}
              padding={{ top: 9, bottom: 24 }}
              tick={<TickIcon />}
            />
            <Tooltip
              cursor={false}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const sum = payload[0]?.payload?.profit
                  return (
                    <div className="tooltip">
                      <div className="helper">Доход:</div>
                      <div className="sum">{numberWithSeparator(sum, ',')}</div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Area
              type="linear"
              dataKey="profit"
              stroke="#B2B2B2"
              strokeWidth={1}
              fill="url(#gradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ProfitChart
