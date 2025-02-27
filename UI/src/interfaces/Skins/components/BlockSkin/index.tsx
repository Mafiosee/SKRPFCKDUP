import React from 'react'
import './styles.sass'

type Props = {
  className?: string
  imageUrl: string
  name: string
}

const BlockSkin: React.FC<Props> = ({ className = '', imageUrl, name }) => {
  return (
    <div className={`BlockSkin ${className}`}>
      <div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="name">{name}</div>
    </div>
  )
}

export default BlockSkin
