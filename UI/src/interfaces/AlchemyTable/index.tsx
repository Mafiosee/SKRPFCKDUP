import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CSSTransition } from 'react-transition-group'
import Frame from '../Inventory/components/Frame'
import GridBlock from '../Inventory/components/GridBlock'
import { BlockIcons } from '../Inventory/assets/icons'
import Drag from '../Inventory/components/Drag'
import Hover from '../Inventory/components/Hover'
import Recipes from '../Inventory/components/Recipes'
import { KeyCodes } from '../../utils/keyCodes'
import ActionsListC from '../Inventory/components/ActionsList'
import { alchemyTableActions } from './reducer'
import Craft from './components/Craft'
import { notificationsActions } from '../Notifications/reducer'
import { InterfacesId } from '../../utils/interfacesId'
import { Grids } from '../../shared/inventory/inventoryType'
import { TimeoutRef } from '../../types/timeoutRef'
import { AlchemyTableEvents } from '../../shared/Crafts/events'
import { useEscClose } from '../../hooks/useEscClose'
import {
  ActionsList,
  DragInfo,
  dragInfoDefault,
  HoverInfo,
  hoverInfoDefault,
} from '../Inventory/types'

const AlchemyTable = () => {
  const dispatch = useAppDispatch()
  const { isOpen, recipes, currentCraft } = useAppSelector(
    (state) => state.alchemyTable,
  )
  const { inventory, hasBackpack, backpack } = useAppSelector(
    (state) => state.inventory,
  )
  const nodeRef = useRef(null)
  const [dragInfo, setDragInfo] = useState<DragInfo>({ ...dragInfoDefault })
  const [hoverInfo, setHoverInfo] = useState<HoverInfo>({ ...hoverInfoDefault })
  const [actionsList, setActionsList] = useState<ActionsList>({
    itemId: null,
    from: { gridId: Grids.Inventory, position: { x: 0, y: 0 } },
    actions: [],
    position: { x: 0, y: 0 },
  })
  const progressTimeIncrementTimeout = useRef<TimeoutRef>(null)
  useEscClose({ isOpenInterface: isOpen, closeEvent: AlchemyTableEvents.Close })

  // useEffect(() => {
  // 	setTimeout(() => dispatch(alchemyTableActions.show()), 150)
  // }, [])

  useEffect(() => {
    if (!isOpen) {
      if (progressTimeIncrementTimeout.current != null) {
        clearTimeout(progressTimeIncrementTimeout.current)
      }
      dispatch(
        notificationsActions.removeFromInterface(InterfacesId.Blacksmith),
      )
    }
  }, [dispatch, isOpen])

  useEffect(() => {
    if (progressTimeIncrementTimeout.current != null) {
      clearTimeout(progressTimeIncrementTimeout.current)
    }
    if (
      currentCraft != null &&
      (currentCraft.progress.time.current >= currentCraft.progress.time.max ||
        !currentCraft.progress.isStarted)
    ) {
      return
    }
    progressTimeIncrementTimeout.current = setTimeout(
      () => dispatch(alchemyTableActions.incrementCurrentCraftTime()),
      1000,
    )
  }, [currentCraft?.progress.time])

  useEffect(() => {
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
    }
    return () => {
      document.removeEventListener('mouseup', mouseUpHandler)
      document.removeEventListener('click', clickHandler)
    }
  }, [isOpen])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const { keyCode } = event
      switch (keyCode) {
        case KeyCodes.R: {
          if (dragInfo.itemId === null) {
            return
          }
          setDragInfo((prev) => ({ ...prev, isTurned: !prev.isTurned }))
        }
      }
    },
    [dragInfo],
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keyup', handleKeyDown)
    }
    return () => {
      document.removeEventListener('keyup', handleKeyDown)
    }
  }, [handleKeyDown, isOpen])

  const drag = {
    info: dragInfo,
    set: (info: DragInfo) => setDragInfo(info),
  }
  const hover = {
    info: hoverInfo,
    set: (info: HoverInfo) => setHoverInfo(info),
  }
  const FullItems = [
    ...inventory.items,
    ...(hasBackpack && backpack != null ? backpack.items : []),
    ...(currentCraft
      ? currentCraft.components.filter((el) => el !== null)
      : []),
    ...(currentCraft && currentCraft.result !== null
      ? [currentCraft.result]
      : []),
  ]

  return (
    <CSSTransition
      in={isOpen}
      timeout={0}
      mountOnEnter
      unmountOnExit
      classNames="AlchemyTable"
      nodeRef={nodeRef}
    >
      <div className="AlchemyTable" ref={nodeRef}>
        <Drag info={dragInfo} items={FullItems} />
        <Hover
          info={hoverInfo}
          items={[...FullItems, ...recipes]}
          drag={drag}
        />
        <div className="window">
          <div className="body">
            <Frame
              title="Алхимический стол"
              closeEvent={AlchemyTableEvents.Close}
            />
            <div className="content">
              <div className="col -inventory">
                <GridBlock
                  icon={BlockIcons.Inventory}
                  title="Инвентарь"
                  grid={inventory}
                  gridId={Grids.Inventory}
                  maxHeight={9}
                  drag={drag}
                  hover={hover}
                  setActionsList={setActionsList}
                />
              </div>
              <div className="center">
                <Craft hover={hover} drag={drag} />
              </div>
              <div className="col">
                {useMemo(
                  () => (
                    <Recipes
                      recipes={recipes}
                      hover={hover}
                      chooseEvent={AlchemyTableEvents.ChooseRecipe}
                    />
                  ),
                  [recipes],
                )}
              </div>
            </div>
          </div>
        </div>
        <ActionsListC
          actionsList={actionsList}
          eventName={AlchemyTableEvents.ItemAction}
        />
      </div>
    </CSSTransition>
  )
}

export default AlchemyTable
