import './styles.sass'
import React, { ReactNode } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'

type Props = {
	filledBottles: number
	dragBottleIdx: number
	setDragBottleIdx: (bottleIdx: number) => void
}

const Items: React.FC<Props> = ({ filledBottles, dragBottleIdx, setDragBottleIdx }) => {
	const getItems = () =>
		new Array(3).fill(null).map((_, idx) => {
			const isShowItem = filledBottles - 1 < idx
			const isDrag = dragBottleIdx === idx

			return (
				<div
					key={idx}
					className={`item ${isShowItem && '-show'}`}
					onMouseDown={() => setDragBottleIdx(idx)}
				>
					<div className={`image -active ${(isDrag || !isShowItem) && '-hidden'}`} />
				</div>
			)
		})

	return <div className='_Items'>{getItems()}</div>
}

export default Items
