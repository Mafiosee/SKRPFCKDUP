import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CSSTransition } from 'react-transition-group'
import { InterfacesId } from '../../utils/interfacesId'
import { notificationsActions } from '../Notifications/reducer'
import Frame from '../Inventory/components/Frame'
import GridBlock from '../Inventory/components/GridBlock'
import { BlockIcons } from '../Inventory/assets/icons'
import {
	ActionsList,
	DragInfo,
	dragInfoDefault,
	HoverInfo,
	hoverInfoDefault,
	noBackpackGrid,
} from '../Inventory/types'
import Drag from '../Inventory/components/Drag'
import Hover from '../Inventory/components/Hover'
import Recipes from '../Inventory/components/Recipes'
import { KeyCodes } from '../../utils/keyCodes'
import { callClient } from '../../utils/api'
import ActionsListC from '../Inventory/components/ActionsList'
import { enchantTableActions } from './reducer'
import Craft from './components/Craft'
import { Grids } from '../../shared/inventory/inventoryType'
import { TimeoutRef } from '../../types/timeoutRef'
import { AlchemyTableEvents, EnchantTableEvents } from '../../shared/Crafts/events'
import { useEscClose } from '../../hooks/useEscClose'

const EnchantTable: React.FC = () => {
	const dispatch = useAppDispatch()
	const { isOpen, recipes, currentCraft } = useAppSelector(
		state => state.enchantTable,
	)
	const { inventory, hasBackpack, backpack } = useAppSelector(
		state => state.inventory,
	)
	const nodeRef = useRef(null)
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
	const [isDebounced, setIdDebounced] = useState(false)
	const debounceRef = useRef<TimeoutRef>(null)
	const [dragInfo, setDragInfo] = useState<DragInfo>({ ...dragInfoDefault })
	const [hoverInfo, setHoverInfo] = useState<HoverInfo>({ ...hoverInfoDefault })
	const [actionsList, setActionsList] = useState<ActionsList>({
		itemId: null,
		from: { gridId: Grids.Inventory, position: { x: 0, y: 0 } },
		actions: [],
		position: { x: 0, y: 0 },
	})
	const progressTimeIncrementTimeout = useRef<TimeoutRef>(null)

	useEscClose({ isOpenInterface: isOpen, closeEvent: EnchantTableEvents.Close })

	// useEffect(() => {
	// 	setTimeout(() => dispatch(enchantTableActions.show()), 150)
	// }, [])

	useEffect(() => {
		if (!isOpen) {
			if (progressTimeIncrementTimeout.current != null) {
				clearTimeout(progressTimeIncrementTimeout.current)
			}
			dispatch(
				notificationsActions.removeFromInterface(InterfacesId.EnchantTable),
			)
		}
	}, [dispatch, isOpen])

	useEffect(() => {
		if (progressTimeIncrementTimeout.current != null) {
			clearTimeout(progressTimeIncrementTimeout.current)
		}
		if (
			currentCraft != null &&
			currentCraft.progress.time.current >= currentCraft.progress.time.max
		) {
			return
		}
		progressTimeIncrementTimeout.current = setTimeout(
			() => dispatch(enchantTableActions.incrementCurrentCraftTime()),
			1000,
		)
	}, [currentCraft?.progress.time, dispatch])

	const mouseMoveHandler = useCallback(
		(event: MouseEvent) => {
			if (isDebounced) {
				return
			}
			setIdDebounced(true)
			if (debounceRef.current != null) {
				clearTimeout(debounceRef.current)
			}
			debounceRef.current = setTimeout(() => setIdDebounced(false), 15)
			setMousePosition({ x: event.clientX, y: event.clientY })
		},
		[isDebounced],
	)

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
					setDragInfo(prev => ({ ...prev, isTurned: !prev.isTurned }))
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

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousemove', mouseMoveHandler)
		}
		return () => {
			document.removeEventListener('mousemove', mouseMoveHandler)
		}
	}, [isOpen, mouseMoveHandler])

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
		...(currentCraft ? currentCraft.components.filter(el => el !== null) : []),
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
			classNames='EnchantTable'
			nodeRef={nodeRef}
		>
			<div className='EnchantTable' ref={nodeRef}>
				<Drag info={dragInfo} items={FullItems} />
				<Hover
					info={hoverInfo}
					items={[...FullItems, ...recipes]}
					drag={drag}
				/>
				<div className='window'>
					<div className='body'>
						<Frame
							title='Стол зачарований'
							closeEvent={EnchantTableEvents.Close}
						/>
						<div className='content'>
							<div className='col -inventory'>
								<GridBlock
									icon={BlockIcons.Inventory}
									title='Инвентарь'
									grid={inventory}
									gridId={Grids.Inventory}
									maxHeight={4}
									drag={drag}
									hover={hover}
									setActionsList={setActionsList}
								/>
								<GridBlock
									icon={BlockIcons.Backpack}
									title='Рюкзак'
									grid={
										hasBackpack && backpack != null
											? backpack
											: noBackpackGrid
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
							<div className='center'>
								<Craft hover={hover} drag={drag} />
							</div>
							<div className='col'>

								{useMemo(() => <Recipes
									recipes={recipes}
									hover={hover}
									chooseEvent={EnchantTableEvents.ChooseRecipe}
								/>, [recipes])}
							</div>
						</div>
					</div>
				</div>
				<ActionsListC
					actionsList={actionsList}
					eventName={EnchantTableEvents.ItemAction}
				/>
			</div>
		</CSSTransition>
	)
}

export default EnchantTable
