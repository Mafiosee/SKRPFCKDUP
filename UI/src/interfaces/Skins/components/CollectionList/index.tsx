import React, { useMemo } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import {
  QualityIconShadow,
  QualityNoShadowIcon,
  SkinQualityColor,
} from '../../../DonateStore/data/quality'
import { SkinImages } from '../../assets/SkinImages'
import { Sort } from '../../../../shared/Skins/Sort'
import { SkinSlot } from '../../../../shared/Skins/SkinSlot'
import { SkinId } from '../../../../shared/Skins/Skin'
import { DragInfo } from '../../index'
import { MouseButton } from '../../../../types/mouseButton'
import { SkinsEvents, SkinsPayloads } from '../../../../shared/Skins/events'
import { callClient } from '../../../../utils/api'
import { escMenuActions } from '../../../EscMenu/reducer'
import { NavId } from '../../../EscMenu/types'
import { donateStoreActions } from '../../../DonateStore/reducer'
import { Tab } from '../../../DonateStore/enums/Tabs'
import { skinsActions } from '../../reducer'

type Props = {
  activeSkinSlot: SkinSlot | null
  sortType: Sort
  searchValue: string
  startDrag: (dragInfo: DragInfo) => void
  dragSkinId: SkinId | null
}

const CollectionList: React.FC<Props> = ({
  activeSkinSlot,
  sortType,
  searchValue,
  startDrag,
  dragSkinId,
}) => {
  const dispatch = useAppDispatch()
  const { slots, skins } = useAppSelector((state) => state.skins)

  const renderedSkins = useMemo(() => {
    const skinsList = skins
      .filter((skin) => skin.slot === activeSkinSlot)
      .filter(
        (skin) =>
          skin.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1,
      )

    switch (sortType) {
      case Sort.Name: {
        skinsList.sort((a, b) => a.name.localeCompare(b.name))
        break
      }
      case Sort.Quality: {
        skinsList.sort((a, b) => b.quality - a.quality)
        break
      }
    }

    if (activeSkinSlot == null) {
      return []
    }

    return skinsList.map((skin) => {
      const isActive = skin.id === slots[activeSkinSlot]
      const isDrag = skin.id === dragSkinId

      return (
        <div
          key={skin.id}
          className={`skin ${isActive && '-active'} ${isDrag && '-drag'}`}
          onMouseDown={(event) => {
            if (isActive || event.button !== MouseButton.Left) {
              return
            }

            const rect = (
              event.target as HTMLDivElement
            ).getBoundingClientRect()

            startDrag({
              skinId: skin.id,
              mousePosition: { x: event.clientX, y: event.clientY },
              offset: { x: event.clientX - rect.x, y: event.clientY - rect.y },
              isActive: false,
            })
          }}
          onContextMenu={() => {
            const payload: SkinsPayloads[SkinsEvents.PutOn] = {
              slot: skin.slot,
              skinId: skin.id,
            }
            callClient(SkinsEvents.PutOn, payload)
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
    })
  }, [activeSkinSlot, skins, sortType, searchValue, dragSkinId, slots])

  const renderedFormattedSkins = useMemo(() => {
    const list = [...renderedSkins]
    while (list.length < 9) {
      list.push(<div key={`empty-${list.length}`} className={`skin -empty`} />)
    }
    return list
  }, [renderedSkins])

  return (
    <div className="CollectionList">
      <div className="list">{renderedFormattedSkins}</div>
      {renderedSkins.length === 0 && (
        <div className="empty">
          <div className="background" />
          <div className="content">
            <div className="title">Похоже здесь пусто</div>
            <div className="description">
              У вас еще нет скинов для данного типа предметов.
              <br />
              Приобрести скины вы можете в «Магазине» в разделе «Скины».
            </div>
            <div
              className="button"
              onClick={() => {
                dispatch(escMenuActions.show({ navId: NavId.DonateStore }))
                dispatch(donateStoreActions.setTab(Tab.Store))
                dispatch(skinsActions.hide())
              }}
            >
              Перейти в магазин
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CollectionList
