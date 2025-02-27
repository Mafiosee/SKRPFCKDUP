import './styles.sass'
import React, { useEffect, useState } from 'react'
import ExitHelper from '../ExitHelper'
import { getRandomInt } from '../../../../utils/getRandomInt'
import { TAINTED_AMOUNT } from './config'
import { useAppDispatch } from '../../../../hooks/redux'
import { honeyFactoryActions } from '../../reducer'

enum CellCondition {
	Tainted,
	Filled,
	Collected,
}

const CELLS_AMOUNT = 21

const GameCollecting = () => {
	const dispatch = useAppDispatch()
	const [cells, setCells] = useState<CellCondition[]>([])
	const [progress, setProgress] = useState({ current: 0, max: CELLS_AMOUNT })

	useEffect(() => {
		const newCells: CellCondition[] = new Array(CELLS_AMOUNT).fill(CellCondition.Filled)
		const taintedAmount = getRandomInt(TAINTED_AMOUNT.MIN, TAINTED_AMOUNT.MAX)
		for (let i = 0; i < taintedAmount; i++) {
			let position = getRandomInt(0, CELLS_AMOUNT)
			while (newCells[position] === CellCondition.Tainted) {position = getRandomInt(0, CELLS_AMOUNT)}
			newCells[position] = CellCondition.Tainted
		}
		setCells(newCells)
		setProgress({ current: 0, max: CELLS_AMOUNT - taintedAmount })
	}, [])

	useEffect(() => {
		if (progress.current >= progress.max) {
			dispatch(
				honeyFactoryActions.setFinishScreen({
					isWin: true,
					text: 'У вас получилось собрать качественный мед!',
					helper: null,
				})
			)
		}
	}, [progress])

	const getCells = () =>
		cells.map((condition, idx) => {
			let className = '-filled'
			if (condition === CellCondition.Tainted) {className = '-tainted'}
			else if (condition === CellCondition.Collected) {className = '-collected'}

			return (
				<div
					key={idx}
					className={`cell ${className} -idx-${idx}`}
					onClick={() => {
						switch (condition) {
							case CellCondition.Filled:
								setCells(prev => {
									prev[idx] = CellCondition.Collected
									return [...prev]
								})
								setProgress(prev => ({ ...prev, current: ++prev.current }))
								break
							case CellCondition.Tainted:
								return dispatch(
									honeyFactoryActions.setFinishScreen({
										isWin: false,
										text: 'Вы собрали некачественный мед!',
										helper: 'Нажимая только на качественные соты, вы сможете собрать хороший мед!',
									})
								)
							default:
								return
						}
					}}
				/>
			)
		})

	return (
		<div className='_GameCollecting'>
			<ExitHelper />
			<div className='board'>
				<div className='info'>
					<div className='title'>Сбор меда</div>
					<div className='text'>Ваша задача наполнить ведро медом, собирая его из сот.</div>
					<div className='sep' />
					<div className='warning'>
						Нажимая только на качественные соты, вы сможете собрать хороший мед!
					</div>
				</div>
				<div className='helper'>
					<div className='text'>Для сбора меда, нажимайте на медовые соты используя лкм</div>
					<div className='lmb' />
				</div>
				<div className='bee -idx-0' />
				<div className='bee -idx-1' />
				<div className='bee -idx-2' />
				<div className='cells'>{getCells()}</div>
			</div>
			<div className='bucket' />
		</div>
	)
}

export default GameCollecting
