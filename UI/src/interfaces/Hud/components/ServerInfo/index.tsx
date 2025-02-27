import React from 'react'
import './styles.sass'
import { useAppSelector } from '../../../../hooks/redux'

export const ServerInfo: React.FC = () => {
  const { serverInfo } = useAppSelector((state) => state.hud)
  return (
    serverInfo &&
    serverInfo.show && (
      <div className={`_ServerInfo`}>
        <div className="container">
          <div className="server-name">{serverInfo.serverName}</div>
          <div className="skyrim-rp" />
          <div className="line" />
          <div className="id-info">
            <div>{serverInfo?.playerID && serverInfo.playerID}</div>
            <div className="line" />
            <div>{serverInfo?.playerUID && `#${serverInfo.playerUID}`}</div>
          </div>
        </div>
        <div className="coat-of-arms">
          <div className="logo" />
          <div className="players-online">
            <div className="icon" />
            <div className="amount">
              {serverInfo?.online && serverInfo.online}
            </div>
          </div>
        </div>
      </div>
    )
  )
}
