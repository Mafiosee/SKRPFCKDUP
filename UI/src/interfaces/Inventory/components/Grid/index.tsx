import './styles.sass'
import React, { useEffect, useRef, useState } from 'react'
import { ItemImagesInventory } from '../../assets/items'
import { calcVh } from '../../../../utils/calcVh'
import { MouseButton } from '../../../../types/mouseButton'
import { callClient } from '../../../../utils/api'
import { useAppSelector } from '../../../../hooks/redux'
import { SlotsIds } from '../Char'
import { QualitiesList, TypesList } from '../BlockHeader'
import { Cords, ItemDto, ItemType, Quality } from '../../../../shared/inventory/itemType'
import {
	HalfSplitItemData,
	InventoryEvents,
	MoveItemData,
	StackItemData,
	TakeOffEquipItemData,
} from '../../../../shared/inventory/events'
import { Grids, GridType } from '../../../../shared/inventory/inventoryType'
import { ActionsList, cellCurrentSize, cellSize, ControlsType, DragInfo, HoverInfo, Sorts } from '../../types'
import { QualityGradients } from '../../data'
import { TimeoutRef } from '../../../../types/timeoutRef'
import { KeyCodes } from '../../../../utils/keyCodes'
import useSound from 'use-sound'

type PropsType = {
	grid: GridType;
	gridId: Grids;
	drag?: {
		info: DragInfo;
		set: (info: DragInfo) => void;
	};
	hover: {
		info: HoverInfo;
		set: (info: HoverInfo) => void;
	};
	noInfo?: {
		icon: string;
		title: string;
		helper: string;
	};
	maxHeight: number;
	controls?: ControlsType;
	setActionsList?: (info: ActionsList) => void;
};

type CellItem = {
	isAvailable: boolean | null;
	itemId?: any;
	startCell?: Cords;
};
type CellsType = CellItem[][];

type ControlledCell = null | false | Pick<ItemDto, 'id' | 'size' | 'isTurned'>;
type ControlledCells = ControlledCell[][];

const Grid: React.FC<PropsType> = ({
																		 grid: { size, items },
																		 gridId,
																		 drag,
																		 hover,
																		 noInfo,
																		 maxHeight,
																		 controls,
																		 setActionsList,
																	 }) => {
	const { equipment } = useAppSelector((state) => state.inventory)
	const { sfxBase } = useAppSelector(state => state.volume)
	const [cellsState, setCellsState] = useState<CellsType>([])
	const hoverCellTimeout = useRef<TimeoutRef>(null)
	const hoverItemTimeout = useRef<TimeoutRef>(null)
	const [controlledItems, setControlledItems] = useState<ControlledCells>([])
	const [isPressedShift, setIsPressedShift] = useState(false)
	const [playItemInteractionDrinks] = useSound(require('../../../../assets/sounds/item-interaction_drinks.mp3'), { volume: sfxBase })
	const [playItemInteractionFood] = useSound(require('../../../../assets/sounds/item-interaction_food.mp3'), { volume: sfxBase })
	const [playItemInteractionWeapon] = useSound(require('../../../../assets/sounds/item-interaction_weapon.mp3'), { volume: sfxBase })
	const [playItemInteractionArmor] = useSound(require('../../../../assets/sounds/item-interaction_armor.mp3'), { volume: sfxBase })
	const [playItemInteractionPotions] = useSound(require('../../../../assets/sounds/item-interaction_potions.mp3'), { volume: sfxBase })
	const [playItemInteractionClothes] = useSound(require('../../../../assets/sounds/item-interaction_clothes.mp3'), { volume: sfxBase })
	const [playItemInteractionManuscripts] = useSound(require('../../../../assets/sounds/item-interaction_manuscripts.mp3'), { volume: sfxBase })
	const [playItemInteractionResources] = useSound(require('../../../../assets/sounds/item-interaction_resources.mp3'), { volume: sfxBase })

	const hasControlledState =
		controls &&
		(controls.sort !== Sorts.None ||
			Object.values(controls.filters.type).includes(true) ||
			Object.values(controls.filters.quality).includes(true) ||
			(controls.isOpenSearch && controls.search.trim().length))

	useEffect(() => {
		if (!items.length || !hasControlledState) {
			setControlledItems([])
			return
		}
		const newControlledItems: ControlledCells = []
		for (let y = 0; y < size.height; y++) {
			newControlledItems.push([])
			for (let x = 0; x < size.width; x++) {
				newControlledItems[y].push(null)
			}
		}
		let cItems = [...items]

		if (controls.isOpenSearch && controls.search.length) {
			const searchString = controls.search.trim().toLowerCase()
			cItems = cItems.filter(
				(el) => ~el.info.name.toLowerCase().indexOf(searchString),
			)
		} else {
			// -start- Фильтрация
			const types: ItemType[] = []
			for (let i = 0; i < TypesList.length; i++) {
				const type = TypesList[i]
				if (!controls.filters.type[type]) {
					continue
				}
				types.push(type)
			}
			if (types.length) {
				cItems = cItems.filter((el) => types.includes(el.type))
			}

			const qualities: Quality[] = []
			for (let i = 0; i < QualitiesList.length; i++) {
				const quality = QualitiesList[i]
				if (!controls.filters.quality[quality]) {
					continue
				}
				qualities.push(quality)
			}
			if (qualities.length) {
				cItems = cItems.filter((el) => qualities.includes(el.info.quality))
			}

			// -end- Фильтрация

			// -start- Сортировка
			if (controls.sort !== Sorts.None) {
				switch (controls.sort) {
					case Sorts.Amount: {
						cItems.sort((a, b) => {
							const aAmount = a?.amount ?? 1
							const bAmount = b?.amount ?? 1
							return bAmount - aAmount
						})
						break
					}
					case Sorts.Name: {
						cItems.sort((a, b) =>
							a.info.name
								.toLowerCase()
								.localeCompare(b.info.name.toLowerCase()),
						)
						break
					}
					case Sorts.Quality: {
						cItems.sort((a, b) => b.info.quality - a.info.quality)
					}
				}
			}
			// -end- Сортировка
		}

		let itemIdx = 0
		for (let y = 0; y < size.height; y++) {
			for (let x = 0; x < size.width; x++) {
				if (cItems.length <= itemIdx) {
					break
				}
				const cellInfo: ControlledCell = newControlledItems[y][x]
				if (cellInfo) {
					continue
				}
				let { size: itemSize } = cItems[itemIdx]
				const { id, isTurned } = cItems[itemIdx]
				if (isTurned) {
					itemSize = {
						height: +itemSize.width,
						width: +itemSize.height,
					}
				}
				if (
					x + itemSize.width > size.width ||
					y + itemSize.height > size.height
				) {
					continue
				}

				let hasCollision = false
				for (let subY = +y; subY < y + itemSize.height; subY++) {
					for (let subX = +x; subX < x + itemSize.width; subX++) {
						if (newControlledItems[subY][subX] === null) {
							continue
						}
						hasCollision = true
						break
					}
				}
				if (hasCollision) {
					continue
				}

				for (let subY = +y; subY < y + itemSize.height; subY++) {
					for (let subX = +x; subX < x + itemSize.width; subX++) {
						newControlledItems[subY][subX] = false
					}
				}
				newControlledItems[y][x] = {
					id,
					size: itemSize,
					isTurned,
				}
				itemIdx++
			}
		}
		setControlledItems(newControlledItems)
	}, [controls, items])

	useEffect(() => {
		const cells: CellsType = []
		for (let y = 0; y < size.height; y++) {
			cells.push([])
			for (let x = 0; x < size.width; x++) {
				cells[y].push({ isAvailable: null })
			}
		}
		for (let itemIdx = 0; itemIdx < items.length; itemIdx++) {
			const { size, position, isTurned, id } = items[itemIdx]
			const currentSize = {
				width: isTurned ? size.height : size.width,
				height: isTurned ? size.width : size.height,
			}
			for (let y = position.y; y < position.y + currentSize.height; y++) {
				for (let x = position.x; x < position.x + currentSize.width; x++) {
					cells[y][x].itemId = id
					cells[y][x].startCell = { ...position }
				}
			}
		}
		setCellsState(cells)
	}, [items, drag?.info])

	useEffect(() => {
		const handleKeyDown =
			(event: KeyboardEvent) => {
				const { keyCode } = event
				switch (keyCode) {
					case KeyCodes.LeftShift: {
						setIsPressedShift(true)
						break
					}
				}
			}

		const handleKeyUp =
			(event: KeyboardEvent) => {
				const { keyCode } = event
				switch (keyCode) {
					case KeyCodes.LeftShift: {
						setIsPressedShift(false)
						break
					}
				}
			}

		document.addEventListener('keydown', handleKeyDown)
		document.addEventListener('keyup', handleKeyUp)
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
			document.removeEventListener('keyup', handleKeyUp)
		}
	}, [])

	const getClearedCellsState = () => {
		const cells = [...cellsState]
		for (let y = 0; y < cells.length; y++) {
			for (let x = 0; x < cells[y].length; x++) {
				cells[y][x].isAvailable = null
			}
		}
		return cells
	}

	useEffect(() => {
		if (
			!drag ||
			drag.info.itemId === null ||
			drag.info.hoveredCell.x < 0 ||
			drag.info.hoveredCell.y < 0
		) {
			return
		}

		const cells = getClearedCellsState()

		let cellsOffset = {
			x: Math.floor(drag.info.offset.x / cellCurrentSize),
			y: Math.floor(drag.info.offset.y / cellCurrentSize),
		}
		if (drag.info.isTurned) {
			cellsOffset = {
				x: drag.info.size.height - cellsOffset.y - 1,
				y: +cellsOffset.x,
			}
		}

		const startCellPosition = {
			x: drag.info.hoveredCell.x - cellsOffset.x,
			y: drag.info.hoveredCell.y - cellsOffset.y,
		}

		const endCellPosition = {
			x:
				startCellPosition.x +
				(drag.info.isTurned ? drag.info.size.height : drag.info.size.width),
			y:
				startCellPosition.y +
				(drag.info.isTurned ? drag.info.size.width : drag.info.size.height),
		}

		const cellsToUpdate: {
			position: Cords;
			hasItem: boolean;
		}[] = []

		let hasCollision = false

		const isOutOfGrid =
			startCellPosition.x < 0 ||
			startCellPosition.y < 0 ||
			endCellPosition.x > size.width ||
			endCellPosition.y > size.height

		const item = isOutOfGrid ? undefined : items.find(item => item.id === cellsState[drag.info.hoveredCell.y][drag.info.hoveredCell.x]?.itemId)
		// @ts-expect-error qwe
		if (item != null && drag.info.itemId != null && item.id !== drag.info.itemId && item.itemHash && drag.info.item?.itemHash && item.itemHash === drag.info.item?.itemHash) {
			for (let x = item.position.x; x < item.position.x + item.size.width; x++) {
				for (let y = item.position.y; y < item.position.y + item.size.height; y++) {
					const cell = { ...cells[y][x] }
					cells[y][x] = { ...cell, isAvailable: true }
				}
			}
			setCellsState(cells)
			return
		}

		for (let y = startCellPosition.y; y < endCellPosition.y; y++) {
			if (!cells[y]) {
				continue
			}
			for (let x = startCellPosition.x; x < endCellPosition.x; x++) {
				if (!cells[y][x]) {
					continue
				}
				const hasItem =
					cells[y][x]?.itemId != null &&
					cells[y][x].itemId !== drag.info.itemId
				if (hasItem) {
					hasCollision = true
				}
				cellsToUpdate.push({
					position: { x, y },
					hasItem,
				})
			}
		}
		for (let i = 0; i < cellsToUpdate.length; i++) {
			const data = cellsToUpdate[i]
			const cell = { ...cells[data.position.y][data.position.x] }
			// const hasItem =
			// 	cell?.itemId != null && cell.itemId !== drag.info.itemId
			let isAvailable = null

			if (hasCollision) {
				// if (hasItem) {
				isAvailable = false
				// }
			} else {
				isAvailable = !isOutOfGrid
			}

			cells[data.position.y][data.position.x] = {
				...cell,
				isAvailable,
			}
		}

		setCellsState(cells)
	}, [drag?.info])

	const getCells = () => {
		return new Array(size.height).fill(null).map((_, rowIdx) => {
			if (cellsState.length <= rowIdx) {
				return null
			}
			return (
				<div key={rowIdx} className='row'>
					{new Array(size.width).fill(null).map((_, colIdx) => {
						if (cellsState[rowIdx].length <= colIdx) {
							return null
						}
						const state = cellsState[rowIdx][colIdx]
						let stateClassName = ''
						if (!drag || drag.info.hoverGridId !== gridId) {
							stateClassName = ''
						} else if (state.isAvailable === null) {
							stateClassName = ''
						} else if (state.isAvailable) {
							stateClassName = '-available'
						} else {
							stateClassName = '-unavailable'
						}
						return (
							<div
								key={`${rowIdx}-${colIdx}`}
								className={`cell ${stateClassName}`}
								onMouseEnter={() => {
									if (!drag || noInfo) {
										return
									}
									drag.set({
										...drag.info,
										hoverGridId: gridId,
										hoveredCell: { x: colIdx, y: rowIdx },
									})
									if (hoverCellTimeout.current != null) {
										clearTimeout(hoverCellTimeout.current)
									}
								}}
								onMouseLeave={() => {
									if (!drag) {
										return
									}
									hoverCellTimeout.current = setTimeout(() => {
										drag.set({
											...drag.info,
											hoveredCell: { x: -1, y: -1 },
										})
									}, 50)
								}}
								onMouseUp={() => {
									if (
										!drag ||
										drag.info.itemId == null ||
										!drag.info.item ||
										drag.info.gridId == null
									) {
										return
									}
									if (drag.info.gridId === Grids.Equipment) {
										let slotId = null
										for (let i = 0; i < SlotsIds.length; i++) {
											// @ts-expect-error qwe
											if (equipment[SlotsIds[i]]?.id !== drag.info.itemId) {
												continue
											}
											slotId = SlotsIds[i]
											break
										}
										if (slotId === null) {
											return
										}
										const data: TakeOffEquipItemData = {
											itemId: drag.info.itemId,
											slotId,
											to: {
												gridId,
												position: {
													x: colIdx - Math.floor(drag.info.offset.x / 64),
													y: rowIdx - Math.floor(drag.info.offset.y / 64),
												},
											},
											isTurned: drag.info.isTurned,
										}
										if (drag.info.isTurned) {
											data.to.position = {
												x:
													colIdx -
													Math.floor(
														(drag.info.item.size.height * 64 -
															drag.info.offset.y) /
														64,
													),
												y: rowIdx - Math.floor(drag.info.offset.x / 64),
											}
										}

										let isAvailable = true
										for (let row = 0; row < cellsState.length; row++) {
											for (let col = 0; col < cellsState[row].length; col++) {
												if (cellsState[row][col].isAvailable === false) {
													isAvailable = false
													break
												}
											}
											if (!isAvailable) {
												break
											}
										}
										if (!isAvailable) {
											return
										}
										if (data.to.position.x < 0 || data.to.position.y < 0) {
											return
										}

										callClient(InventoryEvents.TakeOffEquipItem, data)
									} else {
										const item = items.find(item => item.id === state?.itemId)
										// @ts-expect-error qwe
										if (item != null && drag.info.itemId != null && item.id !== drag.info.itemId && item.itemHash != null && drag.info.item?.itemHash != null && item.itemHash === drag.info.item?.itemHash) {
											const payload: StackItemData = {
												from: {
													gridId: drag.info.gridId,
													itemId: drag.info.itemId,
												},
												to: {
													gridId,
													itemId: item.id,
												},
											}
											callClient(InventoryEvents.StackItem, payload)
											return
										}
										const data: MoveItemData = {
											itemId: drag.info.itemId,
											isTurned: drag.info.isTurned,
											from: {
												gridId: drag.info.gridId,
												position: drag.info.from,
											},
											to: {
												gridId,
												position: {
													x: colIdx - Math.floor(drag.info.offset.x / 64),
													y: rowIdx - Math.floor(drag.info.offset.y / 64),
												},
											},
										}
										if (drag.info.isTurned) {
											data.to.position = {
												x:
													colIdx -
													Math.floor(
														(drag.info.item.size.height * 64 -
															drag.info.offset.y) /
														64,
													),
												y: rowIdx - Math.floor(drag.info.offset.x / 64),
											}
										}

										let isAvailable = true
										for (let row = 0; row < cellsState.length; row++) {
											for (let col = 0; col < cellsState[row].length; col++) {
												if (cellsState[row][col].isAvailable === false) {
													isAvailable = false
													break
												}
											}
											if (!isAvailable) {
												break
											}
										}
										if (!isAvailable) {
											return
										}
										if (data.to.position.x < 0 || data.to.position.y < 0) {
											return
										}
										if (data.from.gridId === Grids.Nearby && data.to.gridId === Grids.Nearby) {
											return
										}
										callClient(InventoryEvents.MoveItem, data)
									}
								}}
							/>
						)
					})}
				</div>
			)
		})
	}

	const getControlledCells = () => {
		return new Array(controlledItems.length).fill(null).map((_, rowIdx) => {
			return (
				<div key={rowIdx} className='row'>
					{new Array(controlledItems[rowIdx].length)
						.fill(null)
						.map((_, colIdx) => {
							const isVisible = controlledItems[rowIdx][colIdx] !== null
							return (
								<div
									key={`${rowIdx}-${colIdx}`}
									className={`cell ${!isVisible && '-invisible'}`}
								/>
							)
						})}
				</div>
			)
		})
	}

	const playDragStartSound = (itemType: ItemType) => {
		switch (itemType) {
			case ItemType.Weapon:
				playItemInteractionWeapon()
				break
			case ItemType.Armor:
				playItemInteractionArmor()
				break
			case ItemType.Backpack:
				playItemInteractionArmor()
				break
			case ItemType.Potions:
				playItemInteractionPotions()
				break
			case ItemType.Manuscripts:
				playItemInteractionManuscripts()
				break
			case ItemType.Food:
				playItemInteractionFood()
				break
			case ItemType.Drinks:
				playItemInteractionDrinks()
				break
			case ItemType.Ingredients:
				playItemInteractionResources()
				break
			case ItemType.Resources:
				playItemInteractionResources()
				break
			case ItemType.Other:
				playItemInteractionResources()
				break
			case ItemType.Accessories:
				playItemInteractionClothes()
				break
			case ItemType.Clothes:
				playItemInteractionClothes()
				break
		}
	}

	const getItems = () => {
		return items.map((item) => {
			const { id, type, size, position, image, isTurned, amount, info } = item
			if (drag && drag.info.itemId === id) {
				return null
			}
			const imageUrl = ItemImagesInventory[`${image}.png`]
			return (
				<div
					key={id}
					className={`item ${isTurned && '-turned'} ${drag?.info?.itemId == null && '-hoverable'}`}
					style={{
						width: calcVh(size.width * cellSize),
						height: calcVh(size.height * cellSize),
						top: calcVh(position.y * cellSize),
						left: calcVh(position.x * cellSize),
					}}
					onMouseDown={(event: React.MouseEvent<HTMLDivElement>) => {
						if (isPressedShift) {
							return
						}
						playDragStartSound(type)
						if (setActionsList) {
							setActionsList({
								itemId: null,
								from: { gridId: Grids.Inventory, position: { x: 0, y: 0 } },
								actions: [],
								position: { x: 0, y: 0 },
							})
						}

						switch (event.button) {
							case MouseButton.Left: {
								const targetRect = (
									event.target as HTMLDivElement
								).getBoundingClientRect()
								const offset = {
									x: Math.abs(Math.round(event.clientX - targetRect.x)),
									y: Math.abs(Math.round(event.clientY - targetRect.y)),
								}
								if (isTurned) {
									const temp = +offset.y
									offset.y = size.height * cellCurrentSize - offset.x
									offset.x = temp
								}
								if (drag != null) {
									drag.set({
										...drag.info,
										gridId,
										from: position,
										itemId: id,
										item,
										isTurned,
										size,
										offset,
									})
								}
								hover.set({ ...hover.info, itemId: null })
								break
							}
						}
					}}
					onContextMenu={(event) => {
						event.preventDefault()
						event.stopPropagation()
						if (!setActionsList || isPressedShift) {
							return
						}
						setActionsList({
							itemId: id,
							from: {
								gridId,
								position,
							},
							actions: info.actions ? [...info.actions] : [],
							position: { x: event.clientX + 5, y: event.clientY + 5 },
						})
					}}
					onMouseEnter={() => {
						if (noInfo) {
							return
						}
						hover.set({ ...hover.info, itemId: id })
						if (hoverItemTimeout.current != null) {
							clearTimeout(hoverItemTimeout.current)
						}
					}}
					onMouseLeave={() => {
						hoverItemTimeout.current = setTimeout(() => {
							hover.set({ ...hover.info, itemId: null })
						}, 50)
					}}
					onClick={() => {
						if (!isPressedShift) {
							return
						}
						const payload: HalfSplitItemData = {
							from: {
								gridId,
								itemId: id,
							},
						}
						callClient(InventoryEvents.HalfSplitItem, payload)
					}}
				>
					<div
						className='gradient'
						style={{ background: QualityGradients[info.quality] }}
					/>
					<div
						className='image'
						style={{ backgroundImage: `url(${imageUrl})` }}
					/>
					{amount != null && amount > 1 && (
						<div className='amount'>x{amount}</div>
					)}
				</div>
			)
		})
	}

	const getControlledItems = () => {
		const array = []

		for (let y = 0; y < controlledItems.length; y++) {
			for (let x = 0; x < controlledItems[y].length; x++) {
				const cell = controlledItems[y][x]
				if (!cell) {
					continue
				}
				array.push({ ...cell, position: { y, x } })
			}
		}

		return array.map(({ id, isTurned, position }) => {
			const item = items.find((el) => el.id === id)
			if (!item || !drag || drag.info.itemId === id) {
				return null
			}
			const { amount, image, size, position: itemPosition } = item
			const imageUrl = ItemImagesInventory[`${image}.png`]
			return (
				<div
					key={id}
					className={`item ${isTurned && '-turned'} ${drag.info.itemId === null && '-hoverable'}`}
					style={{
						width: calcVh(size.width * cellSize),
						height: calcVh(size.height * cellSize),
						top: calcVh(position.y * cellSize),
						left: calcVh(position.x * cellSize),
					}}
					onMouseEnter={() => {
						hover.set({ ...hover.info, itemId: id })
						if (hoverItemTimeout.current) {
							clearTimeout(hoverItemTimeout.current)
						}
					}}
					onMouseLeave={() => {
						hoverItemTimeout.current = setTimeout(() => {
							hover.set({ ...hover.info, itemId: null })
						}, 50)
					}}
					onMouseDown={(event: React.MouseEvent<HTMLDivElement>) => {
						if (event.button !== MouseButton.Left || isPressedShift) {
							return
						}
						const targetRect = (
							event.target as HTMLDivElement
						).getBoundingClientRect()
						const offset = {
							x: Math.abs(Math.round(event.clientX - targetRect.x)),
							y: Math.abs(Math.round(event.clientY - targetRect.y)),
						}
						if (isTurned) {
							const temp = +offset.y
							offset.y = (size.width - 1) * cellCurrentSize - offset.x
							offset.x = temp
						}
						drag.set({
							...drag.info,
							gridId,
							from: itemPosition,
							itemId: id,
							item,
							isTurned,
							size,
							offset,
						})
					}}
					onClick={() => {
						if (!isPressedShift) {
							return
						}
						const payload: HalfSplitItemData = {
							from: {
								gridId,
								itemId: id,
							},
						}
						callClient(InventoryEvents.HalfSplitItem, payload)
					}}
				>
					<div
						className='image'
						style={{ backgroundImage: `url(${imageUrl})` }}
					/>
					{amount != null && amount > 1 && (
						<div className='amount'>x{amount}</div>
					)}
				</div>
			)
		})
	}

	const getCover = () =>
		noInfo ? (
			<div className='cover'>
				<div
					className='icon'
					style={{ backgroundImage: `url(${noInfo.icon})` }}
				/>
				<div className='title'>{noInfo.title}</div>
				<div className='helper'>{noInfo.helper}</div>
			</div>
		) : null

	return (
		<div
			className='_Inventory_Grid'
			style={{
				height: `${maxHeight ? calcVh(cellSize * maxHeight) : 'auto'}`,
			}}
		>
			{hasControlledState ? getControlledCells() : getCells()}
			{hasControlledState ? getControlledItems() : getItems()}
			{getCover()}
		</div>
	)
}

export default Grid
