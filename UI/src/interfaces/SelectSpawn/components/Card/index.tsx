import './styles.sass'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { Points } from '../../types'
import { callClient } from '../../../../utils/api'
import { SelectSpawnEvents } from '../../api'
import useSound from 'use-sound'
import { selectSpawnActions } from '../../reducer'

type PropsType = {
  pointId: Points
}

type ImageType = {
  disabled: string
  active: string
}
type ImagesType = {
  [Points.Exit]: ImageType
  [Points.Start]: ImageType
  [Points.House]: ImageType
  [Points.Faction]: ImageType
}
const Images: ImagesType = {
  [Points.Exit]: {
    disabled: require('../../assets/images/exit.png'),
    active: require('../../assets/images/exit-active.png'),
  },
  [Points.Start]: {
    disabled: require('../../assets/images/start.png'),
    active: require('../../assets/images/start-active.png'),
  },
  [Points.House]: {
    disabled: require('../../assets/images/house.png'),
    active: require('../../assets/images/house-active.png'),
  },
  [Points.Faction]: {
    disabled: require('../../assets/images/faction.png'),
    active: require('../../assets/images/faction-active.png'),
  },
}

const Titles = {
  [Points.Exit]: 'Место выхода',
  [Points.Start]: 'Начальное место',
  [Points.House]: 'Жилище',
  [Points.Faction]: 'Фракция',
}

type InfoType = {
  disabled: string
  active: string
}
type InfosType = {
  [Points.Exit]: InfoType
  [Points.Start]: InfoType
  [Points.House]: InfoType
  [Points.Faction]: InfoType
}
const Infos: InfosType = {
  [Points.Exit]: {
    active: 'Продолжите там, где закончили',
    disabled: 'Выбор данной точки сейчас недоступен',
  },
  [Points.Start]: {
    active: 'То самое место, с которого все только начинается',
    disabled: 'Выбор данной точки сейчас недоступен',
  },
  [Points.House]: {
    active: 'Ваш личный дом, уютный и безопасный',
    disabled: 'У вас отсутствует личный дом',
  },
  [Points.Faction]: {
    active: 'Организация, в которой вы состоите',
    disabled: 'Вы еще не состоите в организации',
  },
}

const Card: React.FC<PropsType> = ({ pointId }) => {
  const dispatch = useAppDispatch()
  const { points } = useAppSelector((state) => state.selectSpawn)
  const { sfxBase } = useAppSelector((state) => state.volume)
  const [playButtonHoverSfx] = useSound(
    require('../../../../assets/sounds/button_hover_0.mp3'),
    { volume: sfxBase },
  )
  const [playSpawnSfx] = useSound(
    require('../../../../assets/sounds/spawn.mp3'),
    { volume: sfxBase },
  )

  const point = points[pointId]
  const isDisabled = typeof point === 'string'
  let backgroundImage = `url(${Images[pointId].active})`
  if (isDisabled) {
    backgroundImage = `url(${Images[pointId].disabled})`
  }
  const cardInfo = isDisabled ? Infos[pointId].disabled : Infos[pointId].active

  return (
    <div className="_Card">
      <div className="bg">
        <div className="image" style={{ backgroundImage }} />
        <div className="styles" />
        {!isDisabled && <div className="hovered" />}
        <div className="content">
          <div className="title">{Titles[pointId]}</div>
          <div className={`info ${isDisabled && '-disabled'}`}>{cardInfo}</div>
          <div
            className={`btn ${isDisabled && '-unavailable'}`}
            onClick={() => {
              if (isDisabled) {
                return
              }
              playSpawnSfx()
              callClient(SelectSpawnEvents.Select, { pointId })
            }}
            onMouseOver={() => {
              if (isDisabled) {
                return
              }
              playButtonHoverSfx()
            }}
          >
            {isDisabled ? 'Недоступно' : 'Выбрать'}
          </div>
        </div>
      </div>
      {isDisabled && <div className={'lock'} />}
    </div>
  )
}

export default Card
