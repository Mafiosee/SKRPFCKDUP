import './styles.sass'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { calcVh } from '../../../../utils/calcVh'
import {
  EquipItemDto,
  ItemDto,
  Quality,
} from '../../../../shared/inventory/itemType'
import { RecipeDTO } from '../../../../shared/Crafts/types'
import { QualityColors, QualityNames } from '../../data'
import { TypeImages } from '../../assets/types'
import { TimeoutRef } from '../../../../types/timeoutRef'
import { QualityNoShadowIcon } from '../../../DonateStore/data/quality'
import { DragInfo, HoverInfo } from '../../types'

const Backgrounds: Record<Quality, string> = {
  [Quality.Unusual]: require('../../assets/images/hover/bg-unusual.png'),
  [Quality.Normal]: require('../../assets/images/hover/bg-normal.png'),
  [Quality.Rare]: require('../../assets/images/hover/bg-rare.png'),
  [Quality.Epic]: require('../../assets/images/hover/bg-epic.png'),
  [Quality.Legendary]: require('../../assets/images/hover/bg-legendary.png'),
}

const Icons: Record<Quality, string> = {
  [Quality.Unusual]: require('../../assets/images/hover/icon-unusual.svg'),
  [Quality.Normal]: require('../../assets/images/hover/icon-normal.svg'),
  [Quality.Rare]: require('../../assets/images/hover/icon-rare.svg'),
  [Quality.Epic]: require('../../assets/images/hover/icon-epic.svg'),
  [Quality.Legendary]: require('../../assets/images/hover/icon-legendary.svg'),
}

type PropsType = {
  info: HoverInfo
  items: (ItemDto | EquipItemDto | RecipeDTO)[]
  drag?: {
    info: DragInfo
    set: (info: DragInfo) => void
  }
}

const offset = 15

const Hover: React.FC<PropsType> = ({ info: { itemId }, items, drag }) => {
  const [item, setItem] = useState<ItemDto | EquipItemDto | RecipeDTO | null>(
    null,
  )
  const hoverRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isDebounced, setIdDebounced] = useState(false)
  const debounceRef = useRef<TimeoutRef>(null)

  useEffect(() => {
    const el = items.find(
      (el: ItemDto | EquipItemDto | RecipeDTO) => el?.id === itemId,
    )
    if (!el || itemId == null) {
      return
    }
    setItem(el)
  }, [itemId, items])

  const isOpen = item != null && itemId != null

  const mouseMoveHandler = useCallback(
    (event: MouseEvent) => {
      if (isDebounced) {
        return
      }

      setIdDebounced(true)

      if (debounceRef.current != null) {
        clearTimeout(debounceRef.current)
      }

      debounceRef.current = setTimeout(() => setIdDebounced(false), 10)

      setMousePosition({ x: event.clientX, y: event.clientY })
    },

    [isDebounced],
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousemove', mouseMoveHandler)
    }

    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler)
    }
  }, [isOpen, mouseMoveHandler])

  const hoverRect = hoverRef.current?.getBoundingClientRect()
  let bottomOffset = 0
  let rightOffset = 0
  if (hoverRect) {
    bottomOffset =
      window.screen.height - (mousePosition.y + hoverRect.height) - offset
    rightOffset =
      window.screen.width - (mousePosition.x + hoverRect.width) - offset
  }
  if (bottomOffset > 0) {
    bottomOffset = 0
  }
  if (rightOffset > 0) {
    rightOffset = 0
  }

  return (
    <div
      className="_Inventory_Hover"
      style={{
        top: `calc(${mousePosition.y}px + ${calcVh(offset)} + ${bottomOffset}px)`,
        left: `calc(${mousePosition.x}px + ${calcVh(offset)} + ${rightOffset}px)`,
        transform: `scale(${isOpen && mousePosition.x && mousePosition.y ? 1 : 0})`,
        // transform: `scale(${isOpen ? 1 : 0}) translateY(${calcVh(
        // 	bottomOffset < 0 ? bottomOffset : 0,
        // )})`,
        backgroundImage: `url(${Backgrounds[item?.info?.quality ?? Quality.Unusual]})`,
      }}
      ref={hoverRef}
    >
      <div
        className="type"
        style={{
          backgroundImage: item ? `url(${Icons[item.info.quality]})` : 'none',
          backgroundSize: '100% 100%',
        }}
      >
        <div
          className="icon"
          style={{
            backgroundImage: item ? `url(${TypeImages[item?.type]})` : 'none',
          }}
        />
      </div>

      <div className="name">{item?.info?.name}</div>
      <div className="quality">
        <div
          className="icon"
          style={{
            backgroundImage: `urL(${QualityNoShadowIcon[item?.info?.quality ?? Quality.Unusual]})`,
          }}
        />
        <div
          className="name"
          style={{
            color: QualityColors[item?.info?.quality ?? Quality.Unusual],
          }}
        >
          {QualityNames[item?.info?.quality ?? Quality.Unusual]}
        </div>
      </div>
      <div className="line" />
      {item?.info.parameters && (
        <div className="parameters">
          {item.info.parameters.map((parameter, idx) => (
            <div key={idx} className="parameter">
              <div className="title">{parameter.title}:</div>
              <div className="value">{parameter.value}</div>
            </div>
          ))}
        </div>
      )}
      <div className="line" />
      {item?.info.description && (
        <div className="description">{item.info.description}</div>
      )}
      {/*{isOpen && (*/}
      {/*	<>*/}
      {/*		<div className='header' style={{ background: QualityBgGradients[item.info.quality] }}>*/}
      {/*			<div className='frame'>*/}
      {/*				<div*/}
      {/*					className='image'*/}
      {/*					style={{*/}
      {/*						backgroundImage: `url(${TypeImages[item.type]})`,*/}
      {/*					}}*/}
      {/*				/>*/}
      {/*			</div>*/}
      {/*			<div className='name'>{item.info.name}</div>*/}
      {/*		</div>*/}
      {/*	</>*/}
      {/*)}*/}
    </div>
  )
}

export default Hover
