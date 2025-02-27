import React, { useMemo } from 'react'
import './styles.sass'
import { SkinSlot } from '../../../../shared/Skins/SkinSlot'
import { useAppSelector } from '../../../../hooks/redux'
import { SkinQualityColor } from '../../../DonateStore/data/quality'
import { SkinImages } from '../../assets/SkinImages'
import { SkinsEvents, SkinsPayloads } from '../../../../shared/Skins/events'
import { callClient } from '../../../../utils/api'
import { SkinId } from '../../../../shared/Skins/Skin'

type Props = {
  className?: string
  skinSlot: SkinSlot
  setDragIsActive: (isActive: boolean) => void
  dragSkinId: SkinId | null
}

const BlockSkinSlot: React.FC<Props> = ({
  className = '',
  skinSlot,
  setDragIsActive,
  dragSkinId,
}) => {
  const { slots, skins } = useAppSelector((state) => state.skins)

  const skinId = useMemo(() => slots[skinSlot], [slots, skinSlot])
  const skin = useMemo(
    () => skins.find((skin) => skin.id === skinId),
    [skins, skinId],
  )

  return (
    <div className={`BlockSkinSlot ${className}`}>
      <div
        className="slot"
        onMouseOver={() => setDragIsActive(true)}
        onMouseOut={() => setDragIsActive(false)}
        onClick={() => {
          if (skin == null) {
            return
          }
          const payload: SkinsPayloads[SkinsEvents.TakeOff] = {
            slot: skinSlot,
          }
          callClient(SkinsEvents.TakeOff, payload)
        }}
        onMouseUp={() => {
          if (dragSkinId == null) {
            return
          }
          const dragSkin = skins.find((skin) => skin.id === dragSkinId)
          if (!dragSkin || dragSkin.slot !== skinSlot) {
            return
          }
          const payload: SkinsPayloads[SkinsEvents.PutOn] = {
            slot: skinSlot,
            skinId: dragSkinId,
          }
          callClient(SkinsEvents.PutOn, payload)
        }}
      >
        <div className="center">
          {skin == null ? (
            <div className="empty" />
          ) : (
            <div className="content">
              <div
                className="circle"
                style={{ backgroundColor: SkinQualityColor[skin.quality] }}
              />
              <div
                className="image"
                style={{
                  backgroundImage: `url(${SkinImages[`${skin.image}.png`]})`,
                }}
              />
            </div>
          )}
        </div>
        {skin != null && <div className="takeOff" />}
      </div>
      <div className="helper">{skin ? 'Текущий скин' : 'Скин не выбран'}</div>
    </div>
  )
}

export default BlockSkinSlot
