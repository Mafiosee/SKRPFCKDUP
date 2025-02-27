import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CSSTransition } from 'react-transition-group'
import { InterfacesId } from '../../utils/interfacesId'
import { notificationsActions } from '../Notifications/reducer'
import GridBlock from './components/GridBlock'
import { BlockIcons } from './assets/icons'
import Frame from './components/Frame'
import Drag from './components/Drag'
import { KeyCodes } from '../../utils/keyCodes'
import Char from './components/Char'
import Hover from './components/Hover'
import { callClient } from '../../utils/api'
import ActionsListC from './components/ActionsList'
import {
  DropItemData,
  InventoryEvents,
  SetShowHelmetData,
} from '../../shared/inventory/events'
import { Grids, GridType } from '../../shared/inventory/inventoryType'
import Search from './components/Search'
import { useEscClose } from '../../hooks/useEscClose'
import useSound from 'use-sound'
import {
  ActionsList,
  DragInfo,
  dragInfoDefault,
  HoverInfo,
  hoverInfoDefault,
  noBackpackGrid,
} from './types'
import { ItemDto } from '../../shared/inventory/itemType'

const Inventory: React.FC = () => {
  const dispatch = useAppDispatch()
  const {
    isOpen,
    inventory,
    hasBackpack,
    backpack,
    hasContainer,
    container,
    nearbyItems,
    equipment,
    showHelmet,
    search,
  } = useAppSelector((state) => state.inventory)
  const { sfxBase } = useAppSelector((state) => state.volume)
  const nodeRef = useRef(null)
  const [dragInfo, setDragInfo] = useState<DragInfo>({ ...dragInfoDefault })
  const [hoverInfo, setHoverInfo] = useState<HoverInfo>({
    ...hoverInfoDefault,
  })
  const [actionsList, setActionsList] = useState<ActionsList>({
    itemId: null,
    from: { gridId: Grids.Inventory, position: { x: 0, y: 0 } },
    actions: [],
    position: { x: 0, y: 0 },
  })
  const [gridNearby, setGridNearby] = useState<GridType | null>(null)
  const [playOpenInterfaceSfx] = useSound(
    require('../../assets/sounds/open_interface_0.mp3'),
    { volume: sfxBase },
  )
  const [playCloseInterfaceSfx] = useSound(
    require('../../assets/sounds/close_interface_0.mp3'),
    { volume: sfxBase },
  )

  useEscClose({ isOpenInterface: isOpen, closeEvent: InventoryEvents.Close })

  useEffect(() => {
    setHoverInfo({ ...hoverInfoDefault })
    setDragInfo({ ...dragInfoDefault })

    const mouseUpHandler = () => {
      setDragInfo({ ...dragInfoDefault })
      setHoverInfo({ ...hoverInfoDefault })
    }
    const clickHandler = () => {
      setActionsList({
        itemId: null,
        from: { gridId: Grids.Inventory, position: { x: 0, y: 0 } },
        actions: [],
        position: { x: 0, y: 0 },
      })
    }

    if (isOpen) {
      document.addEventListener('mouseup', mouseUpHandler)
      document.addEventListener('click', clickHandler)
      playOpenInterfaceSfx()
    } else {
      playCloseInterfaceSfx()
    }
    return () => {
      setHoverInfo({ ...hoverInfoDefault })
      setDragInfo({ ...dragInfoDefault })
      document.removeEventListener('mouseup', mouseUpHandler)
      document.removeEventListener('click', clickHandler)
    }
  }, [isOpen])

  useEffect(() => {
    if (!nearbyItems) {
      setGridNearby(null)
    } else {
      const items: ItemDto[] = []
      const gridWidth = 7
      const grid: boolean[][] = []

      nearbyItems.forEach((item) => {
        grid.push(
          ...new Array(item.size.height).fill(new Array(gridWidth).fill(false)),
        )
        for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
          const row = grid[rowIndex]
          for (let colIndex = 0; colIndex < row.length; colIndex++) {
            const cell = row[colIndex]
            const isCellEmpty = !cell
            if (!isCellEmpty) {
              continue
            }
            let isEnoughSpace = colIndex + item.size.width <= gridWidth
            if (!isEnoughSpace) {
              continue
            }
            for (
              let itemHeightIndex = 0;
              itemHeightIndex < item.size.height;
              itemHeightIndex++
            ) {
              for (
                let itemWidthIndex = 0;
                itemWidthIndex < item.size.width;
                itemWidthIndex++
              ) {
                const cell =
                  grid[rowIndex + itemHeightIndex][colIndex + itemWidthIndex]
                const isCellEmpty = !cell
                if (!isCellEmpty) {
                  isEnoughSpace = false
                  break
                }
              }
              if (!isEnoughSpace) {
                break
              }
            }
            if (!isEnoughSpace) {
              continue
            }
            items.push({
              ...item,
              position: {
                x: colIndex,
                y: rowIndex,
              },
              isTurned: false,
            })
            for (
              let itemHeightIndex = 0;
              itemHeightIndex < item.size.height;
              itemHeightIndex++
            ) {
              for (
                let itemWidthIndex = 0;
                itemWidthIndex < item.size.width;
                itemWidthIndex++
              ) {
                grid[rowIndex + itemHeightIndex][colIndex + itemWidthIndex] =
                  true
              }
            }
            return
          }
        }
      })

      let gridHeight = grid.filter((row) => row.indexOf(true) !== -1).length
      if (gridHeight < 20) {
        gridHeight = 20
      }

      setGridNearby({
        size: {
          width: 7,
          height: gridHeight,
        },
        items,
      })
    }
  }, [nearbyItems])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const { keyCode } = event
      switch (keyCode) {
        case KeyCodes.R: {
          if (dragInfo.itemId === null) {
            return
          }
          setDragInfo((prev) => ({ ...prev, isTurned: !prev.isTurned }))
          break
        }
      }
    },
    [dragInfo],
  )

  useEffect(() => {
    document.removeEventListener('keydown', handleKeyDown)
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown, isOpen])

  useEffect(() => {
    if (!isOpen) {
      dispatch(notificationsActions.removeFromInterface(InterfacesId.Inventory))
    }
  }, [dispatch, isOpen])

  const handleDropZoneMouseUp = () => {
    if (dragInfo.gridId == null || dragInfo.itemId == null) {
      return
    }

    const payload: DropItemData = {
      from: {
        gridId: dragInfo.gridId,
        itemId: dragInfo.itemId,
      },
    }
    callClient(InventoryEvents.DropItem, payload)
  }

  const drag = {
    info: dragInfo,
    set: (info: DragInfo) => setDragInfo(info),
  }
  const hover = {
    info: hoverInfo,
    set: (info: HoverInfo) => setHoverInfo(info),
  }
  const FullItems = useMemo(
    () => [
      ...inventory.items,
      ...(hasBackpack && backpack != null ? backpack.items : []),
      ...(hasContainer && container != null ? container.items : []),
      ...Object.values(equipment).filter((el) => el !== null),
      ...(search != null ? search.grid.items : []),
      ...(gridNearby != null ? gridNearby.items : []),
    ],
    [
      backpack,
      container,
      equipment,
      hasBackpack,
      hasContainer,
      inventory.items,
      search,
      gridNearby,
    ],
  )

  useEffect(() => {
    if (hoverInfo.itemId != null) {
      const hasItem = FullItems.some((item) => item?.id === hoverInfo.itemId)
      if (!hasItem) {
        setHoverInfo((prev) => ({ ...prev, itemId: null }))
      }
    }
  }, [FullItems, hoverInfo.itemId])

  return (
    <CSSTransition
      in={isOpen}
      timeout={0}
      mountOnEnter
      unmountOnExit
      classNames="Inventory"
      nodeRef={nodeRef}
    >
      <div className="Inventory" ref={nodeRef}>
        <div className="dropZone" onMouseUp={handleDropZoneMouseUp} />
        <Drag info={dragInfo} items={FullItems} />
        <Hover info={hoverInfo} items={FullItems} drag={drag} />
        <div className="window">
          <div className="body">
            <Frame title="Инвентарь" closeEvent={InventoryEvents.Close} />
            <div className="content">
              {!nearbyItems && hasContainer && container != null && (
                <div className="col">
                  <GridBlock
                    icon={BlockIcons.Container}
                    title="Контейнер"
                    grid={container}
                    gridId={Grids.Container}
                    maxHeight={9}
                    drag={drag}
                    hover={hover}
                    hasControls
                    setActionsList={setActionsList}
                  />
                </div>
              )}

              {nearbyItems != null && gridNearby != null && (
                <div className="col">
                  <GridBlock
                    icon={BlockIcons.Nearby}
                    title="Окружение"
                    grid={gridNearby}
                    gridId={Grids.Nearby}
                    maxHeight={9}
                    drag={drag}
                    hover={hover}
                    setActionsList={setActionsList}
                  />
                </div>
              )}

              <div className="center">
                <div className="tabs">
                  <div className="list">
                    <div className="tab">
                      <div className="background" />
                      <div className="content">Броня</div>
                    </div>
                  </div>
                </div>
                <Char drag={drag} items={FullItems} hover={hover} />
                <div className="row">
                  <div
                    className="offHead"
                    onClick={() => {
                      const payload: SetShowHelmetData = {
                        isShow: !showHelmet,
                      }
                      callClient(InventoryEvents.SetShowHelmet, payload)
                    }}
                  >
                    <div className={`checkbox ${showHelmet && '-checked'}`} />
                    <div className="helper">Отображать шлем</div>
                  </div>
                </div>
              </div>

              <div className="col">
                <GridBlock
                  icon={BlockIcons.Inventory}
                  title="Инвентарь"
                  grid={inventory}
                  gridId={Grids.Inventory}
                  maxHeight={4}
                  drag={drag}
                  hover={hover}
                  setActionsList={setActionsList}
                />
                <GridBlock
                  icon={BlockIcons.Backpack}
                  title="Рюкзак"
                  grid={
                    hasBackpack && backpack != null ? backpack : noBackpackGrid
                  }
                  gridId={Grids.Backpack}
                  maxHeight={4}
                  drag={drag}
                  hover={hover}
                  noInfo={
                    hasBackpack && backpack != null
                      ? undefined
                      : {
                          icon: BlockIcons.NoBackpack,
                          title: 'Рюкзак отсутствует',
                          helper: 'Его можно приобрести в магазине',
                        }
                  }
                  setActionsList={setActionsList}
                />
              </div>
            </div>
          </div>
        </div>
        <Search drag={drag} hover={hover} />
        <ActionsListC
          actionsList={actionsList}
          eventName={InventoryEvents.ItemAction}
        />
      </div>
    </CSSTransition>
  )
}

export default Inventory
