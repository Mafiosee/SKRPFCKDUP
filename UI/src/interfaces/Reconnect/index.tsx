import './styles.sass'
import React from 'react'
import { useAppSelector } from '../../hooks/redux'

const Reconnect: React.FC = () => {
  const { isOpen } = useAppSelector((state) => state.reconnect)

  return !isOpen ? null : (
    <div id="Reconnect">
      <div className="shadow" />
      <div className="frame" />
      <div className="vectors" />
      <div className="frame" />
      <div className="loader">
        <div className="cover" />
      </div>
      <div className="text">Переподключение...</div>
    </div>
  )
}

export default Reconnect
