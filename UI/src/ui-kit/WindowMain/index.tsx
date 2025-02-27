import React from 'react'
import './styles.sass'
import { calcVh } from '../../utils/calcVh'

type Props = {
  size: {
    width: number
    height: number
  }
  title: string
  handleClose: () => void
  covered?: boolean
  children: React.ReactNode
}

const UIKitWindowMain: React.FC<Props> = ({
  size,
  title,
  handleClose,
  covered,
  children,
}) => {
  return (
    <div
      className="UI-Kit_WindowMain"
      style={{ width: calcVh(size.width), height: calcVh(size.height) }}
    >
      <div className={`window-content ${covered && 'covered'}`}>{children}</div>

      <div className="title">{title}</div>
      <div className="close" onClick={handleClose} />
    </div>
  )
}

export default UIKitWindowMain
