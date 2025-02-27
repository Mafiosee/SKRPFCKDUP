import React from 'react'
import './styles.sass'
import LotsBlock from '../LotsBlock'
import MostPopularLot from '../MostPopularLot'

const TabLots: React.FC = () => {
  return (
    <div className="TabLots">
      <MostPopularLot />
      <LotsBlock />
    </div>
  )
}

export default TabLots
