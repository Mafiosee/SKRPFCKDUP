import React, { useEffect, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { InterfacesId } from '../../utils/interfacesId'
import { notificationsActions } from '../Notifications/reducer'
import Navbar from './components/Navbar'
import { NavId } from './types'
import Settings from './pages/Settings'
import Exit from './pages/Exit'
import Report from './pages/Report'
import { KeyCodes } from '../../utils/keyCodes'
import { callClient } from '../../utils/api'
import { EscMenuEvents } from './api'
import { escMenuActions } from './reducer'
import DonateStore from '../DonateStore'
import Promo from './pages/Promo'
import Help from './pages/Help'
import useSound from 'use-sound'
import { DonateStoreEvents } from '../../shared/DonateStore/events'

const EscMenu: React.FC = () => {
  const dispatch = useAppDispatch()
  const { isOpen, changedSettings, requiredNavId } = useAppSelector(
    (state) => state.escMenu,
  )
  const { isOpen: isOpenBuyCases } = useAppSelector((state) => state.buyCases)
  const { sfxBase } = useAppSelector((state) => state.volume)
  const [nav, setNav] = useState<NavId | null>(null)
  const [playOpenSfx] = useSound(
    require('../../assets/sounds/open-close_interface_1.mp3'),
    { volume: sfxBase },
  )

  useEffect(() => {
    if (!isOpen) {
      return
    }
    if (nav === NavId.DonateStore) {
      callClient(DonateStoreEvents.Opened)
    }
  }, [nav])

  useEffect(() => {
    playOpenSfx()
    if (!isOpen) {
      setNav(null)
      dispatch(notificationsActions.removeFromInterface(InterfacesId.EscMenu))
    }
  }, [dispatch, isOpen])

  useEffect(() => {
    if (requiredNavId == null) {
      return
    }
    setNav(requiredNavId)
  }, [requiredNavId])

  useEffect(() => {
    const onKeyDownHandler = ({ keyCode }: KeyboardEvent) => {
      switch (keyCode) {
        case KeyCodes.Esc: {
          // @ts-expect-error qwe
          if (window.globalBlocked || isOpenBuyCases) {
            return
          }
          if (changedSettings) {
            dispatch(escMenuActions.setShowSettingsConfirmWindow(true))
            break
          } else {
            callClient(EscMenuEvents.RequestClose)
          }
          break
        }
      }
    }
    if (isOpen) {
      document.addEventListener('keyup', onKeyDownHandler)
    }
    return () => {
      document.removeEventListener('keyup', onKeyDownHandler)
    }
  }, [isOpen, changedSettings])

  const changeNavId = () => {
    dispatch(escMenuActions.setShowSettingsConfirmWindow(changedSettings))
  }

  return !isOpen ? null : (
    <div className="EscMenu">
      <Navbar
        nav={nav}
        setNav={setNav}
        changedSettings={{ changed: changedSettings, onClick: changeNavId }}
      />
      <div className="content">
        <Help isShow={nav === NavId.Help} />
        <Report isShow={nav === NavId.Report} />
        <Settings isShow={nav === NavId.Settings} />
        <DonateStore isShow={nav === NavId.DonateStore} />
        <Promo isShow={nav === NavId.Promo} />
        <Exit isShow={nav === NavId.Exit} cancel={() => setNav(null)} />
      </div>
    </div>
  )
}

export default EscMenu
