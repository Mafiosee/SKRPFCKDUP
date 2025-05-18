import React, { useEffect, useRef } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CSSTransition } from 'react-transition-group'
import { ServerInfo } from './components/ServerInfo'
import { UserInfo } from './components/UserInfo'
import { Task } from './components/Task'
import { Punishment } from './components/Punishment'
import { KillList } from './components/KillList'
import { InteractNotification } from './components/InteractNotification'
import { AcceptCancelNotification } from './components/AcceptCancelNotification'
import { Chat } from './components/Chat'
import { Keys } from './components/Keys'
import { Minimap } from './components/Minimap'
import { Jail } from './components/Jail'

const Hud = () => {
  const dispatch = useAppDispatch()
  const { isOpen, serverInfo, userInfo } = useAppSelector((state) => state.hud)

  return isOpen ? (
    <div className="Hud">
      {/*{userInfo.show && (*/}
      <div className={`shadow-block left-bottom`}>
        <div className="container">
          <div className="shadow" />
          <div className="shadow2" />
          <div className="vector"></div>
        </div>
      </div>
      {/*)}*/}
      {serverInfo.show && (
        <div className={`shadow-block right-top`}>
          <div className="container">
            <div className="shadow" />
            <div className="shadow2" />
            <div className="vector"></div>
          </div>
        </div>
      )}
      <ServerInfo />
      <UserInfo />
      <Task />
      <Punishment />
      <KillList />
      <InteractNotification />
      <AcceptCancelNotification />
      <Chat />
      <Keys />
      <Jail />
      <Minimap />
    </div>
  ) : null
}

export default Hud
