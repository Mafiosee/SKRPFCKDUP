import './styles.sass'
import React from 'react'
import { Item } from '../../../../shared/FactionWarehouse/Item'

type Props = {
  item: Item
}

const ItemParameters: React.FC<Props> = ({ item }) => {
  return (
    <div className="ItemParameters">
      <div className="parameter">{item.amount} шт</div>
      <div className="separator" />
      <div className="parameter -icon -weight">{item.weight} кг</div>
      {item?.condition != null && (
        <>
          <div className="separator" />
          <div className="parameter -icon -condition">
            {item.condition.current}/{item.condition.max}
          </div>
        </>
      )}
    </div>
  )
}

export default ItemParameters
