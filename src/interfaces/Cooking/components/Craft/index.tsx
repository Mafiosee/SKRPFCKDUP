import './styles.sass'
import React, { useMemo } from 'react'
import { useAppSelector } from '../../../../hooks/redux'
import { ItemImagesSquad } from '../../../Inventory/assets/items'
import Slot from '../../../Inventory/components/Slot'
import { DragInfo, HoverInfo } from '../../../Inventory'
import { callClient } from '../../../../utils/api'
import { Grids } from '../../../../shared/inventory/inventoryType'
import { CookingEvents } from '../../../../shared/Crafts/events'
import { calcVh } from '../../../../utils/calcVh'

type PropsType = {
	hover: {
		info: HoverInfo
		set: (info: HoverInfo) => void
	}
	drag: {
		info: DragInfo
		set: (info: DragInfo) => void
	}
}

const Craft: React.FC<PropsType> = ({ hover, drag }) => {
	const { currentCraft } = useAppSelector(state => state.cooking)

	const getComponents = () => {
		if (currentCraft == null) {
			return [
				<Slot key={0} className='component -empty' hover={hover} />,
				<Slot key={1} className='component -empty' hover={hover} />,
				<Slot key={2} className='component -empty' hover={hover} />,
				<Slot key={3} className='component -empty' hover={hover} />,
			]
		}
		return currentCraft.components.map((component, idx) => {
			return (
				<Slot
					key={idx}
					className='component'
					bgImageUrl={
						component == null ? undefined : ItemImagesSquad[`${component.image}.png`]
					}
					amount={component == null ? undefined : component?.amount}
					hover={hover}
					itemId={component ? component.id : null}
					info={component ? component.info : undefined}
				/>
			)
		})
	}

	const maxTime = useMemo(() => {
		if (currentCraft == null) {
			return null
		}
		const time = currentCraft.progress.time.max
		const minutes = Math.floor(time / 60)
		const seconds = time % 60
		const result: string[] = []
		if (minutes) {
			result.push(`${minutes} мин`)
		}
		if (seconds) {
			result.push(`${seconds} сек`)
		}
		return result.join(' ')
	}, [currentCraft])

	const getProgressTime = () => {
		if (currentCraft == null) {
			return null
		}
		const time = currentCraft.progress.time.max - currentCraft.progress.time.current
		const minutes = Math.floor(time / 60)
		const seconds = time % 60
		return [minutes, seconds].map(el => `${el < 10 ? '0' : ''}${el}`).join(':')
	}

	const getHelper = () => {
		if (currentCraft == null || currentCraft.result == null) {
			return (
				<>
					<div className='icon -choose' />
					<div className='title'>Выберите рецепт в списке справа</div>
				</>
			)
		}
		if (currentCraft.progress.isCompleted) {
			return null
		}
		return (
			<>
				<div className='icon -time' />
				<div className='title'>Время изготовления:</div>
				<div className='value'>{maxTime}</div>
			</>
		)
	}

	return (
		<div className='_Craft'>
			<div className='header'>
				<div className='title'>
					{currentCraft == null || currentCraft.result == null
						? 'Нет рецепта'
						: currentCraft.result.info.name}
				</div>
				<div className='line' />
				<div className='helper'>{getHelper()}</div>
			</div>
			<div className='content'>
				<div className='blur'>
					<div className='circle -large' />
					<div className='circle -small' />
				</div>
				<div className='image' />
				<div className='craft'>
					{currentCraft != null && (
						<div className='progress'>
							<svg width='100%' height='100%' viewBox='0 0 268 231' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<mask id='mask0_30_8386' style={{ maskType: 'alpha' }} maskUnits='userSpaceOnUse' x='0' y='0'
											width='268'
											height='231'>
									<path
										d='M134 142H178V230H90V142H134ZM134 142L143 68M134 142L125 67M134 142C111.667 134.667 67 107 67 107M134 142L201 107M143 68H209V2H143V68ZM125 67V1H59V67H125ZM67 107V74H1V140H67V107ZM201 107V74H267V140H201V107Z'
										stroke='white' strokeWidth='2' />
								</mask>
								<g mask='url(#mask0_30_8386)'>
									<rect
										width='100%'
										height={`${currentCraft.progress.isCompleted ? 0 : ((currentCraft.progress.time.current / currentCraft.progress.time.max) * 100)}%`}
										fill='white'
										style={{ transition: 'all 1s linear' }}
									/>
								</g>
							</svg>

						</div>
					)}
					<div className='content'>
						<div className='components'>{getComponents()}</div>
						<div className='result'>
							<Slot
								className={`result ${!currentCraft?.result && '-empty'}`}
								item={
									currentCraft != null && currentCraft.progress.isCompleted
										? currentCraft.result
										: null
								}
								bgImageUrl={
									currentCraft == null || currentCraft.result == null
										? undefined
										: ItemImagesSquad[`${currentCraft.result.image}.png`]
								}
								hover={hover}
								drag={drag}
								itemId={
									currentCraft == null || currentCraft.result == null
										? undefined
										: currentCraft.result.id
								}
								info={
									currentCraft == null || currentCraft.result == null
										? undefined
										: currentCraft.result.info
								}
								gridId={Grids.Craft}
								style={currentCraft != null && currentCraft.result != null && currentCraft.progress.isCompleted ? { border: `${calcVh(2)} solid #fff` } : undefined}
							/>
							{currentCraft != null && (
								<div
									className='progress'
									style={{
										height: `${currentCraft.progress.isCompleted ? 0 : ((currentCraft.progress.time.current / currentCraft.progress.time.max) * 100)}%`,
									}}
								/>
							)}
						</div>
					</div>
				</div>
				{!currentCraft?.progress.isStarted && (
					<div className='start' onClick={() => callClient(CookingEvents.Start)}>
						Начать изготовление
					</div>
				)}
				{currentCraft?.progress.isStarted && !currentCraft?.progress.isCompleted && (
					<>
						<div className='cancel' onClick={() => callClient(CookingEvents.Cancel)}>
							Отменить
						</div>
						<div className='time'>До завершения: {getProgressTime()}</div>
					</>
				)}
			</div>
		</div>
	)
}

export default Craft
