import './styles.sass'
import React, { useState } from 'react'
import { useAppSelector } from '../../../../hooks/redux'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'
import { callClient } from '../../../../utils/api'
import { BizControlEvents } from '../../api'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Period } from '../../../../shared/ProductBusiness/Statistic'

type PropsType = {}

const PageBank: React.FC<PropsType> = ({}) => {
  const { balance, charts } = useAppSelector((state) => state.bizControl)
  const [activePeriod, setActivePeriod] = useState<Period>(Period.Day)

  const data = charts[activePeriod]

  return (
    <div className="_PageBank">
      <div className="block">
        <div className="col">
          <div className="title">Текущий капитал</div>
          <div className="value">{numberWithSeparator(balance, ' ')}</div>
        </div>
        <div
          className="button"
          onClick={() => callClient(BizControlEvents.Withdraw)}
        >
          Снять
        </div>
      </div>

      <div className="row">
        <div className="helper">Статистика доходов</div>
        <div className="period">
          <div
            className={`item ${activePeriod === Period.Day && '-active'}`}
            onClick={() => setActivePeriod(Period.Day)}
          >
            День
          </div>
          <div
            className={`item ${activePeriod === Period.Week && '-active'}`}
            onClick={() => setActivePeriod(Period.Week)}
          >
            Неделя
          </div>
          <div
            className={`item ${activePeriod === Period.Month && '-active'}`}
            onClick={() => setActivePeriod(Period.Month)}
          >
            Месяц
          </div>
        </div>
      </div>

      <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart width={500} height={200} data={data}>
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fff" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#fff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#1B1B1B" strokeWidth={1} />
            <XAxis
              dataKey="time"
              orientation="top"
              axisLine={false}
              padding={{ left: 10, right: 10 }}
              stroke="#9E9E9E"
              fontWeight={500}
              fontSize={16}
            />
            <YAxis
              dataKey="balance"
              axisLine={false}
              padding={{ top: 10, bottom: 10 }}
              stroke="#9E9E9E"
              fontWeight={500}
              fontSize={16}
            />
            <Tooltip
              animationEasing="linear"
              animationDuration={300}
              cursor={false}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const sum = payload[0]?.payload?.diff
                  return (
                    <div className="tooltip">
                      <div className="sum">
                        {sum < 0 ? '-' : '+'}
                        {numberWithSeparator(sum, ' ')}
                      </div>
                      <div className={`tr ${sum < 0 ? '-down' : '-up'}`} />
                    </div>
                  )
                }
                return null
              }}
            />
            <Area
              type="linear"
              dataKey="balance"
              stroke="#fff"
              strokeWidth={2}
              fill="url(#gradient)"
              dot={(props) => {
                const { cx, cy } = props
                return (
                  <svg
                    key={`${cx}${cy}`}
                    x={cx - 10}
                    y={cy - 10}
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                  >
                    <circle
                      cx={10}
                      cy={10}
                      r={5}
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  </svg>
                )
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default PageBank
