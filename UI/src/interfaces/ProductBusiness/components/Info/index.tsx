import './styles.sass'
import React from 'react'
import { useAppSelector } from '../../../../hooks/redux'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'

type Props = {
  openLoadMaterials: () => void
}

const Info: React.FC<Props> = ({ openLoadMaterials }) => {
  const { info } = useAppSelector((state) => state.productBusinesses)
  return (
    <div className="_Info">
      <div className="content">
        <div className="col">
          <div className="row">
            <div className="title -contracts">Продажи:</div>
            <div className="value">{info.sales}</div>
          </div>
          <div className="row">
            <div className="title -materials">Материалы:</div>
            <div className="value -materials">
              <div className="amount">
                {info.materials.current} / {info.materials.max} КГ
              </div>
              {info.materials.current < info.materials.max && (
                <div className="button" onClick={openLoadMaterials}>
                  Пополнить
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="line" />
        <div className="col">
          <div className="row">
            <div className="title -money">Баланс:</div>
            <div className="value -money">
              {numberWithSeparator(info.balance, '.')}
            </div>
          </div>
          <div className="row">
            <div className="title -tax">Налог оплачен до:</div>
            <div className="value -tax">
              <div className="datetime">{info.taxDatetime}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Info
