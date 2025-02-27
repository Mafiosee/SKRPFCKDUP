import { useAppSelector } from './redux'
import { useEffect } from 'react'
import { KeyCodes } from '../utils/keyCodes'
import { callClient } from '../utils/api'

type Props = {
  isOpenInterface: boolean
  closeEvent?: string
  closeFunc?: () => void
}

export const useEscClose = ({
  isOpenInterface,
  closeEvent,
  closeFunc,
}: Props) => {
  const { isOpen: isOpenModal } = useAppSelector((state) => state.modal)
  const { isOpen: isOpenCraftStatus } = useAppSelector(
    (state) => state.craftStatus,
  )

  useEffect(() => {
    if (!isOpenModal && !isOpenCraftStatus && isOpenInterface) {
      const handleKeyDown = (event: KeyboardEvent) => {
        switch (event.keyCode) {
          case KeyCodes.Esc: {
            if (closeFunc != null) {
              closeFunc()
            }
            if (closeEvent != null) {
              callClient(closeEvent)
            }
            break
          }
        }
      }

      document.removeEventListener('keydown', handleKeyDown)
      document.addEventListener('keydown', handleKeyDown)
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [closeEvent, isOpenInterface, isOpenModal])

  return false
}
