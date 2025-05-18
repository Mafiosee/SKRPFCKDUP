import './styles.sass'
import React from 'react'
import { useAppSelector } from '../../hooks/redux'
import { useEscClose } from '../../hooks/useEscClose'
import { FactionWarehouseEvents } from '../../shared/FactionWarehouse/events'
import UIKitScreenBackground from '../../ui-kit/ScreenBackground'
import UIKitWindowMain from '../../ui-kit/WindowMain'
import { callClient } from '../../utils/api'
import Warehouse from './components/Warehouse'
import Sidebar from './components/Sidebar'

const FactionWarehouse: React.FC = () => {
  const { isOpen } = useAppSelector((state) => state.factionWarehouse)
  useEscClose({
    isOpenInterface: isOpen,
    closeEvent: FactionWarehouseEvents.Close,
  })

  return !isOpen ? null : (
    <div className="FactionWarehouse">
      <UIKitScreenBackground />
      <UIKitWindowMain
        size={{ width: 1244, height: 720 }}
        title="Склад фракции"
        handleClose={() => callClient(FactionWarehouseEvents.Close)}
      >
        <div className="window-main-content">
          <Warehouse />
          <Sidebar />
        </div>
      </UIKitWindowMain>
    </div>
  )
}

export default FactionWarehouse
