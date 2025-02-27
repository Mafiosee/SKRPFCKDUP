import React, { useEffect, useState } from 'react'
import './styles.sass'
import { useAppSelector } from '../../hooks/redux'
import { BankEvents } from '../../shared/Bank/events'
import { useEscClose } from '../../hooks/useEscClose'
import useSound from 'use-sound'
import MainWindow from './components/MainWindow'
import { Modal } from './types/Modal'
import ModalReplenish from './components/ModalReplenish'
import ModalWithdraw from './components/ModalWithdraw'
import ModalHouse from './components/ModalHouse'
import ModalBusiness from './components/ModalBusiness'
import ModalFaction from './components/ModalFaction'
import UIKitScreenBackground from '../../ui-kit/ScreenBackground'

const Bank: React.FC = () => {
  const { isOpen } = useAppSelector((state) => state.bank)
  const { sfxBase } = useAppSelector((state) => state.volume)
  const [playOpenCloseInterfaceSfx] = useSound(
    require('../../assets/sounds/open-close_interface_2.mp3'),
    { volume: sfxBase },
  )
  useEscClose({ isOpenInterface: isOpen, closeEvent: BankEvents.Close })
  const [openedModal, setOpenedModal] = useState<Modal | null>(null)

  useEffect(() => {
    playOpenCloseInterfaceSfx()
  }, [isOpen])

  const closeModal = () => setOpenedModal(null)

  const getOpenedModal = () => {
    switch (openedModal) {
      case Modal.Replenish: {
        return <ModalReplenish close={closeModal} />
      }
      case Modal.Withdraw: {
        return <ModalWithdraw close={closeModal} />
      }
      case Modal.House: {
        return <ModalHouse close={closeModal} />
      }
      case Modal.Business: {
        return <ModalBusiness close={closeModal} />
      }
      case Modal.Faction: {
        return <ModalFaction close={closeModal} />
      }
      default: {
        return null
      }
    }
  }

  return !isOpen ? null : (
    <div className="Bank">
      <UIKitScreenBackground />
      <MainWindow
        openModal={(modal: Modal) => setOpenedModal(modal)}
        covered={openedModal !== null}
      />

      {getOpenedModal()}
    </div>
  )
}

export default Bank
