import React from 'react'
import './styles.sass'

type Props = {
  className?: string
  children: React.ReactNode
}

const BlockFrame: React.FC<Props> = ({ className = '', children }) => {
  return (
    <div className={`BlockFrame ${className}`}>
      <div className="center">
        <div className="vector" />
        <div className="content">{children}</div>
      </div>
    </div>
  )
}

export default BlockFrame
