import React, { useEffect } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import Card from './components/Card'
import { InterfacesId } from '../../utils/interfacesId'
import { notificationsActions } from '../Notifications/reducer'
import { Points } from './types'

const SelectSpawn: React.FC = () => {
  const dispatch = useAppDispatch()
  const { isOpen } = useAppSelector((state) => state.selectSpawn)

  useEffect(() => {
    if (!isOpen) {
      dispatch(
        notificationsActions.removeFromInterface(InterfacesId.SelectSpawn),
      )
    }
  }, [dispatch, isOpen])

  return !isOpen ? null : (
    <div className="SelectSpawn">
      {/*<BackButton />*/}
      <div className="logo" />
      <div className="title">Выберите место появления</div>
      <div className="cards">
        <Card pointId={Points.Exit} />
        <Card pointId={Points.Start} />
        <Card pointId={Points.House} />
        <Card pointId={Points.Faction} />
      </div>
    </div>
  )
}

export default SelectSpawn
