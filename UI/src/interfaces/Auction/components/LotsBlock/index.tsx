import React from 'react'
import './styles.sass'
import Controls from '../Controls'
import EmptyCover from '../EmptyCover'
import LotsList from '../LotsList'

const LotsBlock: React.FC = () => {
  return (
    <div className="LotsBlock">
      <Controls />
      <div className="lots">
        <LotsList />
        <EmptyCover />
      </div>
    </div>
  )
}

export default LotsBlock
