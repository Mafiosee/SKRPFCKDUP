import React, { useMemo } from 'react'
import './styles.sass'
import {
  QualityIconShadow,
  QualityNoShadowIcon,
  SkinQualityColor,
} from '../../../DonateStore/data/quality'
import { SkinImages } from '../../assets/SkinImages'
import { DragInfo } from '../../index'
import { useAppSelector } from '../../../../hooks/redux'

type Props = {
  info: DragInfo
}

const BlockSkin: React.FC<Props> = ({ info }) => {
  const { skins } = useAppSelector((state) => state.skins)

  const skin = useMemo(
    () => skins.find((skin) => skin.id === info.skinId),
    [skins, info.skinId],
  )

  return skin == null ? null : (
    <div
      className={`Drag ${info.isActive && '-active'}`}
      style={{
        top: info.mousePosition.y,
        left: info.mousePosition.x,
        transform: `translate(${-info.offset.x}px, ${-info.offset.y}px)`,
      }}
    >
      <div className="center">
        <div
          className="color"
          style={{ backgroundColor: SkinQualityColor[skin.quality] }}
        />
        <div className="content">
          <div
            className="image"
            style={{
              backgroundImage: `url(${SkinImages[`${skin.image}.png`]})`,
            }}
          />
          <div className="name">{skin.name}</div>
          <div
            className="quality"
            style={{
              backgroundImage: `url(${QualityIconShadow[skin.quality]})`,
            }}
          >
            <div
              className="icon"
              style={{
                backgroundImage: `url(${QualityNoShadowIcon[skin.quality]})`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlockSkin
