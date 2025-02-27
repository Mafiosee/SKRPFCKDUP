import React from 'react'
import './styles.sass'

type Props = {
  className?: string
  text: string
}

const UIKitModalInfo: React.FC<Props> = ({ className, text }) => {
  return <div className={`UI-Kit_ModalInfo ${className}`}>{text}</div>
}

export default UIKitModalInfo
