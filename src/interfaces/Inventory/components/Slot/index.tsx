import './styles.sass'
import React, { useRef } from 'react'
import { CraftItemDto, ItemInfo } from '../../../../shared/inventory/itemType'
import { MouseButton } from '../../../../types/mouseButton'
import { Grids } from '../../../../shared/inventory/inventoryType'
import { QualityGradients } from '../../data'
import { DragInfo, HoverInfo } from '../../types'

type PropsType = {
	className: string
	bgImageUrl?: string
	amount?: number
	hover?: {
		info: HoverInfo
		set: (info: HoverInfo) => void
	}
	drag?: {
		info: DragInfo
		set: (info: DragInfo) => void
	}
	item?: CraftItemDto
	itemId?: any
	info?: ItemInfo
	gridId?: Grids
	onMouseUp?: () => void
	style?: Record<string, string>
}

const Slot: React.FC<PropsType> = ({
																		 className,
																		 bgImageUrl = null,
																		 amount = null,
																		 hover = null,
																		 item = null,
																		 itemId = null,
																		 info = null,
																		 drag = null,
																		 gridId = null,
																		 onMouseUp,
																		 style = {},
																	 }) => {
	const hoverItemTimeout = useRef(null)

	return (
		<div
			className={`_Inventory_Slot ${className} ${onMouseUp != null && drag != null && drag.info.itemId != null && '-available'}`}
			onMouseEnter={() => {
				if (itemId == null || hover == null) {
					return
				}
				hover.set({ ...hover.info, itemId })
				if (hoverItemTimeout.current != null) {
					clearTimeout(hoverItemTimeout.current)
				}
			}}
			onMouseLeave={() => {
				// @ts-expect-error qwe
				// hoverItemTimeout.current = setTimeout(() => {
				// 	if (hover == null) {
				// 		return
				// 	}
				// 	hover.set({ ...hover.info, itemId: null })
				// }, 50)
				hover.set({ ...hover.info, itemId: null })
			}}
			onMouseDown={(event: React.MouseEvent<HTMLDivElement>) => {
				if (!drag || !item) {
					return
				}
				switch (event.button) {
					case MouseButton.Left: {
						const targetRect = (event.target as HTMLDivElement).getBoundingClientRect()
						const offset = gridId === Grids.Craft || gridId === Grids.Equipment ? {
							x: 32,
							y: 32,
						} : {
							x: Math.abs(Math.round(event.clientX - targetRect.x)),
							y: Math.abs(Math.round(event.clientY - targetRect.y)),
						}
						console.log(offset)
						drag.set({
							...drag.info,
							gridId,
							from: { x: 0, y: 0 },
							itemId,
							item,
							isTurned: false,
							size: item.size,
							offset,
						})
						break
					}
				}
			}}
			onMouseUp={onMouseUp}
			style={style}
		>
			{info !== null && (
				<div className='gradient' style={{ background: QualityGradients[info.quality] }} />
			)}
			<div
				className='image'
				style={{ backgroundImage: !bgImageUrl ? 'none' : `url(${bgImageUrl})` }}
			/>
			{amount && <div className='amount'>x{amount}</div>}
		</div>
	)
}

export default Slot
