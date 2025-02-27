import React, { useMemo } from 'react'
import './styles.sass'

export enum HelperType {
  Move = 'Move',
  Warning = 'Warning',
}

type ConfigItem = {
  iconUrl: string
  text: string
}

const Config: Record<HelperType, ConfigItem> = {
  [HelperType.Move]: {
    iconUrl: require('../../assets/images/blockHelperIcons/move.svg'),
    text: 'Перетащите скин из коллекции в секцию, чтобы применить его.',
  },
  [HelperType.Warning]: {
    iconUrl: require('../../assets/images/blockHelperIcons/warning.svg'),
    text: 'У вас еще нет предметов данной категории.',
  },
}

type Props = {
  className?: string
  type: HelperType
}

const BlockHelper: React.FC<Props> = ({ className = '', type }) => {
  const config = useMemo(() => Config[type], [type])

  return (
    <div className={`BlockHelper ${className}`}>
      <div
        className="icon"
        style={{ backgroundImage: `url(${config.iconUrl})` }}
      />
      <div className="text">{config.text}</div>
    </div>
  )
}

export default BlockHelper
