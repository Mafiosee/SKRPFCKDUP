import './styles.sass'
import React, { ReactNode } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { ItemId } from '../../types/ItemId'
import { ItemImages } from '../../assets/items'
import { Step } from '../../types/Step'

type ItemInfo = {
	id: ItemId
	step: Step
	helper: ReactNode
}

const List: ItemInfo[] = [
	{
		id: ItemId.Sugar,
		step: Step.MoveSugar,
		helper: (
			<>
				Перенесите лунный сахар
				<br />в котел
			</>
		),
	},
	{
		id: ItemId.Pestle,
		step: Step.MovePestle,
		helper: (
			<>
				А теперь давайте
				<br />
				перемешаем это, берите
				<br />
				пестик и положите
				<br />в ступку
			</>
		),
	},
]

type Props = {
	dragItemId: ItemId
	setDragItemId: (itemId: ItemId) => void
}

const Items: React.FC<Props> = ({ dragItemId, setDragItemId }) => {
	const { step } = useAppSelector(state => state.cookingSkumaGame)

	const getItems = () =>
		List.map(({ id, step: itemStep, helper }, idx) => {
			const isShowItem = step <= itemStep
			const isActive = step === itemStep
			const backgroundImage = `url(${ItemImages[id]})`
			const number = idx + 1
			const isDrag = dragItemId === id

			return (
				<div
					key={idx}
					className={`item ${isShowItem && '-show'}`}
					onMouseDown={() => {
						if (!isActive) return
						setDragItemId(id)
					}}
				>
					<div className='number'>{number}</div>
					<div
						className={`image ${isActive && '-active'} ${(isDrag || !isShowItem) && '-hidden'}`}
						style={{ backgroundImage }}
					/>
					<div className={`helper ${isActive && '-show'} ${isDrag && '-hidden'}`}>{helper}</div>
				</div>
			)
		})

	return <div className='_Items'>{getItems()}</div>
}

export default Items
