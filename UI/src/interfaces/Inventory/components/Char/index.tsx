import './styles.sass'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { CharSlotsIcons } from '../../assets/charSlots'
import { callClient } from '../../../../utils/api'
import { useAppSelector } from '../../../../hooks/redux'
import { ItemImagesSquad } from '../../assets/items'
import { MouseButton } from '../../../../types/mouseButton'
import {
  EquipItemData,
  FastTakeOffEquipItemData,
  InventoryEvents,
} from '../../../../shared/inventory/events'
import {
  CharSlots,
  EquipItemDto,
  ItemDto,
  Quality,
} from '../../../../shared/inventory/itemType'
import { Grids } from '../../../../shared/inventory/inventoryType'
import { ArmorStatusColor, ArmorStatusLimits, QualityColors } from '../../data'
import { ArmorStatusImages } from '../../assets/armorStatus'
import { TimeoutRef } from '../../../../types/timeoutRef'
import { calcVhNum } from '../../../../utils/calcVh'
import { cellCurrentSize, DragInfo, HoverInfo } from '../../types'

type PropsType = {
  drag: {
    info: DragInfo
    set: (info: DragInfo) => void
  }
  hover: {
    info: HoverInfo
    set: (info: HoverInfo) => void
  }
  items: (ItemDto | EquipItemDto)[]
}

export const SlotClassNames = {
  [CharSlots.Backpack]: 'Backpack',
  [CharSlots.Headdress]: 'Headdress',
  [CharSlots.Amulet]: 'Amulet',
  [CharSlots.Outerwear]: 'Outerwear',
  [CharSlots.Shoes]: 'Shoes',
  [CharSlots.Bracers]: 'Bracers',
  [CharSlots.Ring]: 'Ring',
  [CharSlots.FirstHand]: 'FirstHand',
  [CharSlots.SecondHand]: 'SecondHand',
}

export const SlotsIds = [
  CharSlots.Backpack,
  CharSlots.Headdress,
  CharSlots.Amulet,
  CharSlots.Outerwear,
  CharSlots.Shoes,
  CharSlots.Bracers,
  CharSlots.Ring,
  CharSlots.FirstHand,
  CharSlots.SecondHand,
]
const Char: React.FC<PropsType> = ({ drag, items, hover }) => {
  const { equipment, stats } = useAppSelector((state) => state.inventory)
  const [dragItem, setDragItem] = useState<ItemDto | EquipItemDto | null>(null)
  const [blockedSlots, setBlockedSlots] = useState<CharSlots[]>([])
  const hoverItemTimeout = useRef<TimeoutRef>(null)

  useEffect(() => {
    const el = items.find((el) => el?.id === drag.info.itemId)
    setDragItem(el ?? null)
  }, [drag.info.itemId, items])

  useEffect(() => {
    setBlockedSlots(() => {
      const newArray: CharSlots[] = []
      Object.values(equipment).forEach((equip) => {
        if (equip && equip?.wearable?.blockSlots?.length) {
          newArray.push(...equip.wearable.blockSlots)
        }
      })
      return newArray
    })
  }, [equipment])

  const getSlots = () =>
    SlotsIds.map((slotId) => {
      const equip = equipment[slotId]

      let slotState: boolean | null = null
      if (dragItem) {
        if (!dragItem.wearable) {
          slotState = false
        } else {
          slotState = dragItem.wearable?.slot.includes(slotId)
        }
      }
      if (blockedSlots.includes(slotId)) {
        slotState = false
      }

      let stateClassName = ''
      if (slotState) {
        stateClassName = 'available'
      } else if (dragItem || slotState === false) {
        stateClassName = 'unavailable'
      }

      return (
        <div
          key={slotId}
          className={`slot -${SlotClassNames[slotId]} -${stateClassName}`}
          onMouseDown={(event: React.MouseEvent<HTMLDivElement>) => {
            if (event.button !== MouseButton.Left || !equip) {
              return
            }
            drag.set({
              ...drag.info,
              gridId: Grids.Equipment,
              from: { x: -1, y: -1 },
              itemId: equip.id,
              item: equip,
              isTurned: false,
              size: {
                width: equip.size.width,
                height: equip.size.height,
              },
              offset: {
                x: cellCurrentSize / 3,
                y: cellCurrentSize / 3,
              },
            })
          }}
          onMouseUp={() => {
            if (!dragItem || !slotState || drag?.info?.gridId == null) {
              return
            }
            const data: EquipItemData = {
              itemId: dragItem.id,
              from: {
                gridId: drag.info.gridId,
                position: drag.info.from,
              },
              slotId,
            }
            callClient(InventoryEvents.EquipItem, data)
          }}
          onMouseEnter={() => {
            if (!equip) {
              return
            }
            hover.set({ ...hover.info, itemId: equip.id })
            if (hoverItemTimeout.current != null) {
              clearTimeout(hoverItemTimeout.current)
            }
          }}
          onMouseLeave={() => {
            hoverItemTimeout.current = setTimeout(() => {
              hover.set({ ...hover.info, itemId: null })
            }, 50)
          }}
          onContextMenu={(event) => {
            event.preventDefault()
            if (!equip) {
              return
            }
            const payload: FastTakeOffEquipItemData = {
              itemId: equip.id,
              slotId,
            }
            callClient(InventoryEvents.FastTakeOffEquipItem, payload)
          }}
        >
          {equip !== null && (
            <div
              className="gradient"
              style={{
                background: `radial-gradient(50% 50% at 50% 50%, ${QualityColors[equip.info.quality]}, #0000)`,
              }}
            />
          )}
          <div
            className="image"
            style={{
              backgroundImage: `url(${
                equip
                  ? ItemImagesSquad[`${equip.image}.png`]
                  : CharSlotsIcons[slotId]
              })`,
            }}
          />
        </div>
      )
    })

  const armorStatusValue = useMemo(
    () =>
      Object.values(equipment)
        .filter((el) => el !== null)
        .reduce((acc, item) => {
          if (!item?.armor || !item?.durability) {
            return acc
          }
          return acc + item.armor
        }, 0),
    [equipment],
  )

  const armorStatus = useMemo(() => {
    let status = Quality.Unusual

    for (
      let quality = Quality.Unusual;
      quality <= Quality.Legendary;
      quality++
    ) {
      const limits = ArmorStatusLimits[quality]
      if (armorStatusValue >= limits.Min && armorStatusValue <= limits.Max) {
        status = quality
        break
      }
    }

    return status
  }, [armorStatusValue])

  return (
    <div className="_Char">
      <div
        className="armorStatus"
        style={{ backgroundImage: `url(${ArmorStatusImages[armorStatus]})` }}
      >
        <div className="title">Защита</div>
        <div className="value">
          <div
            className="shadow"
            style={{ background: ArmorStatusColor[armorStatus] }}
          />
          <div className="numbers">{armorStatusValue}</div>
        </div>
      </div>
      {getSlots()}
      <div className="stats">
        <div className="stat -thirst">
          <div
            className="progress"
            style={{ height: `${calcVhNum(72) * (stats.thirst / 100)}vh` }}
          >
            <div className="svg">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 73 73"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_926_44002)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M36.5 0L0 36.5L36.5 73L73 36.5L36.5 0ZM36.5 4L4 36.5L36.5 69L69 36.5L36.5 4Z"
                    fill="#34778D"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_926_44002">
                    <rect width="73" height="73" fill="#34778D" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div className="value">{Math.round(stats.thirst)}%</div>
        </div>
        <div className="stat -hungry">
          <div
            className="progress"
            style={{ height: `${calcVhNum(72) * (stats.hungry / 100)}vh` }}
          >
            <div className="svg">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 73 73"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_926_44002)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M36.5 0L0 36.5L36.5 73L73 36.5L36.5 0ZM36.5 4L4 36.5L36.5 69L69 36.5L36.5 4Z"
                    fill="#CB8430"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_926_44002">
                    <rect width="73" height="73" fill="#CB8430" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div className="value">{Math.round(stats.hungry)}%</div>
        </div>
      </div>
    </div>
  )
}

export default Char
