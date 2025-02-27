import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './styles.sass'
import { useAppSelector } from '../../hooks/redux'
import {
  SkinCategories,
  SkinCategory,
  SkinCategoryConfig,
} from '../../shared/Skins/SkinCategory'
import WeaponsBlock from './components/weaponsBlock'
import ArmorBlock from './components/ArmorBlock'
import AccessoryBlock from './components/AccessoryBlock'
import BagBlock from './components/BagBlock'
import CollectionHeader from './components/CollectionHeader'
import { Sort } from '../../shared/Skins/Sort'
import CollectionList from './components/CollectionList'
import MaskAndGlassesBlock from './components/MaskAndGlassesBlock'
import SelectSkinCategory from './components/SelectSkinCategory'
import { SkinSlot } from '../../shared/Skins/SkinSlot'
import { SkinId } from '../../shared/Skins/Skin'
import Drag from './components/Drag'
import { callClient } from '../../utils/api'
import { SkinsEvents } from '../../shared/Skins/events'
import { useEscClose } from '../../hooks/useEscClose'

export type DragInfo = {
  skinId: null | SkinId
  mousePosition: { x: number; y: number }
  offset: { x: number; y: number }
  isActive: boolean
}

const Skins: React.FC = () => {
  const { isOpen } = useAppSelector((state) => state.skins)
  const [activeSkinCategoryIndex, setActiveSkinCategoryIndex] = useState(0)
  const [activeSkinSlot, setActiveSkinSlot] = useState<SkinSlot>(
    SkinSlot.Headdress,
  )
  const [searchValue, setSearchValue] = useState('')
  const [sortType, setSortType] = useState<Sort>(Sort.Name)
  const [drag, setDrag] = useState<DragInfo>({
    skinId: null,
    mousePosition: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
    isActive: false,
  })
  const debounceRef = useRef(false)
  useEscClose({ isOpenInterface: isOpen, closeEvent: SkinsEvents.Close })

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (debounceRef.current || drag.skinId == null) {
        return
      }
      setDrag((prev) => ({
        ...prev,
        mousePosition: { x: event.clientX, y: event.clientY },
      }))
    },
    [drag.skinId],
  )

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove])

  useEffect(() => {
    const handleMouseUp = () =>
      setDrag((prev) => ({ ...prev, skinId: null, isActive: false }))
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  const activeSkinCategory = useMemo(
    () => SkinCategories[activeSkinCategoryIndex],
    [activeSkinCategoryIndex],
  )

  useEffect(() => {
    setActiveSkinSlot(SkinCategoryConfig[activeSkinCategory].slots[0])
  }, [activeSkinCategory])

  const renderSkinCategoryBlocks = () => {
    const BlockBySkinCategory: Record<SkinCategory, React.FC> = {
      [SkinCategory.Armor]: ArmorBlock,
      [SkinCategory.Accessory]: AccessoryBlock,
      [SkinCategory.Bag]: BagBlock,
      [SkinCategory.MaskAndGlasses]: MaskAndGlassesBlock,
      [SkinCategory.Weapon]: WeaponsBlock,
    }
    return SkinCategories.map((category) => {
      const Component = BlockBySkinCategory[category]
      return (
        <Component
          key={category}
          // @ts-expect-error qwerty
          activeSkinSlot={activeSkinSlot}
          setActiveSkinSlot={setActiveSkinSlot}
          setDragIsActive={(isActive: boolean) =>
            setDrag((prev) => ({ ...prev, isActive }))
          }
          dragSkinId={drag.skinId}
        />
      )
    })
  }

  return isOpen ? (
    <div id="Skins">
      <div className="background" />
      <div className="window">
        <div className="title">Скины</div>
        <div className="close" onClick={() => callClient(SkinsEvents.Close)} />

        <div className="col -items">
          <SelectSkinCategory
            activeSkinCategoryIndex={activeSkinCategoryIndex}
            setActiveSkinCategoryIndex={setActiveSkinCategoryIndex}
          />
          <div className="content">
            <div
              className="blocks"
              style={{
                transform: `translateX(-${activeSkinCategoryIndex}00%)`,
              }}
            >
              {renderSkinCategoryBlocks()}
            </div>
          </div>
        </div>

        <div className="col -collection">
          <CollectionHeader
            search={{
              value: searchValue,
              setValue: (value: string) => setSearchValue(value),
            }}
            sort={{
              type: sortType,
              setType: (sortType: Sort) => setSortType(sortType),
            }}
          />
          <CollectionList
            activeSkinSlot={activeSkinSlot}
            searchValue={searchValue}
            sortType={sortType}
            startDrag={(dragInfo: DragInfo) => setDrag(dragInfo)}
            dragSkinId={drag.skinId}
          />
        </div>
      </div>
      <Drag info={drag} />
    </div>
  ) : null
}

export default Skins
