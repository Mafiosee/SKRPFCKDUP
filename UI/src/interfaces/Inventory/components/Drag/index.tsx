import './styles.sass'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { calcVh } from '../../../../utils/calcVh'
import { ItemImagesInventory } from '../../assets/items'
import {
	CraftItemDto,
	EquipItemDto,
	ItemDto,
} from '../../../../shared/inventory/itemType'
import { TimeoutRef } from '../../../../types/timeoutRef'
import { DragInfo } from '../../types'

type PropsType = {
	info: DragInfo;
	items: (ItemDto | EquipItemDto | CraftItemDto)[];
};

const cellSize = 64

const Drag: React.FC<PropsType> = ({
																		 info: { itemId, offset, isTurned },
																		 items,
																	 }) => {
	const [item, setItem] = useState<ItemDto | EquipItemDto | null>(null)
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
	const [isDebounced, setIdDebounced] = useState(false)
	const debounceRef = useRef<TimeoutRef>(null)

	useEffect(() => {
		const el = items.find((el) => el?.id === itemId)
		// @ts-expect-error qwe
		setItem(el ?? null)
	}, [itemId, items])

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
		document.addEventListener('mousemove', mouseMoveHandler)

		return () => {
			document.removeEventListener('mousemove', mouseMoveHandler)
		}
	}, [item, mouseMoveHandler])

	return (
		(item !== null &&
			offset.y !== 0 &&
			offset.x !== 0) ? (
			<div
				className='_Inventory_Drag'
				style={{
					width: calcVh(item.size.width * cellSize),
					height: calcVh(item.size.height * cellSize),
					top: `${mousePosition.y - offset.y}px`,
					left: `${mousePosition.x - offset.x}px`,
					transformOrigin: `${calcVh(offset.x)} ${calcVh(offset.y)}`,
					transform: `${isTurned ? 'rotate(90deg)' : ''}`,
				}}
			>
				<div
					className='image'
					style={{
						backgroundImage: `url(${
							ItemImagesInventory[`${item.image}.png`]
						})`,
					}}
				/>
			</div>
		) : null
	)
}

export default Drag
