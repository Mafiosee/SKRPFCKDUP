import './styles.sass'
import React, { useMemo } from 'react'
import { useAppSelector } from '../../../../hooks/redux'
import { ItemImagesSquad } from '../../../Inventory/assets/items'
import Slot from '../../../Inventory/components/Slot'
import { DragInfo, HoverInfo } from '../../../Inventory'
import { callClient } from '../../../../utils/api'
import { Grids } from '../../../../shared/inventory/inventoryType'
import { AlchemyTableEvents } from '../../../../shared/Crafts/events'
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
	const { currentCraft } = useAppSelector(state => state.alchemyTable)

	const getComponents = () => {
		const list = [
			<Slot key={0} className='component -empty' hover={hover} />,
			<Slot key={1} className='component -empty' hover={hover} />,
			<Slot key={2} className='component -empty' hover={hover} />,
			<Slot key={3} className='component -empty' hover={hover} />,
			<Slot key={4} className='component -empty' hover={hover} />,
			<Slot key={5} className='component -empty' hover={hover} />,
			<Slot key={6} className='component -empty' hover={hover} />,
			<Slot key={7} className='component -empty' hover={hover} />,
			<Slot key={8} className='component -empty' hover={hover} />,
		]

		if (currentCraft != null) {
			currentCraft.components.forEach((component, idx) => {
				list[idx] = (
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

		return list
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

	let progressMultiple =
		currentCraft == null ? 0 : currentCraft.progress.time.current / currentCraft.progress.time.max
	if (!progressMultiple) {
		progressMultiple = 0
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
							<svg
								width='100%'
								height='100%'
								viewBox='0 0 332 369'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<mask
									id='mask0_969_51167'
									style={{ maskType: 'alpha' }}
									maskUnits='userSpaceOnUse'
									x='0'
									y='0'
									width='332'
									height='369'
								>
									<path
										fillRule='evenodd'
										clipRule='evenodd'
										d='M167 66C184.673 66 199 51.6731 199 34C199 16.3269 184.673 2 167 2C149.327 2 135 16.3269 135 34C135 51.6731 149.327 66 167 66ZM167 68C185.778 68 201 52.7777 201 34C201 15.2223 185.778 0 167 0C148.222 0 133 15.2223 133 34C133 52.7777 148.222 68 167 68Z'
										fill='white'
									/>
									<path
										fillRule='evenodd'
										clipRule='evenodd'
										d='M167 367C184.673 367 199 352.673 199 335C199 317.327 184.673 303 167 303C149.327 303 135 317.327 135 335C135 352.673 149.327 367 167 367ZM167 369C185.778 369 201 353.778 201 335C201 316.222 185.778 301 167 301C148.222 301 133 316.222 133 335C133 353.778 148.222 369 167 369Z'
										fill='white'
									/>
									<path
										fillRule='evenodd'
										clipRule='evenodd'
										d='M167 142C184.673 142 199 127.673 199 110C199 92.3269 184.673 78 167 78C149.327 78 135 92.3269 135 110C135 127.673 149.327 142 167 142ZM167 144C185.778 144 201 128.778 201 110C201 91.2223 185.778 76 167 76C148.222 76 133 91.2223 133 110C133 128.778 148.222 144 167 144Z'
										fill='white'
									/>
									<path
										fillRule='evenodd'
										clipRule='evenodd'
										d='M36 123C53.6731 123 68 108.673 68 91C68 73.3269 53.6731 59 36 59C18.3269 59 4 73.3269 4 91C4 108.673 18.3269 123 36 123ZM36 125C54.7777 125 70 109.778 70 91C70 72.2223 54.7777 57 36 57C17.2223 57 2 72.2223 2 91C2 109.778 17.2223 125 36 125Z'
										fill='white'
									/>
									<path
										fillRule='evenodd'
										clipRule='evenodd'
										d='M96 284C113.673 284 128 269.673 128 252C128 234.327 113.673 220 96 220C78.3269 220 64 234.327 64 252C64 269.673 78.3269 284 96 284ZM96 286C114.778 286 130 270.778 130 252C130 233.222 114.778 218 96 218C77.2223 218 62 233.222 62 252C62 270.778 77.2223 286 96 286Z'
										fill='white'
									/>
									<path
										fillRule='evenodd'
										clipRule='evenodd'
										d='M167 240C190.748 240 210 220.748 210 197C210 173.252 190.748 154 167 154C143.252 154 124 173.252 124 197C124 220.748 143.252 240 167 240ZM167 242C191.853 242 212 221.853 212 197C212 172.147 191.853 152 167 152C142.147 152 122 172.147 122 197C122 221.853 142.147 242 167 242Z'
										fill='white'
									/>
									<path
										fillRule='evenodd'
										clipRule='evenodd'
										d='M237 285C254.673 285 269 270.673 269 253C269 235.327 254.673 221 237 221C219.327 221 205 235.327 205 253C205 270.673 219.327 285 237 285ZM237 287C255.778 287 271 271.778 271 253C271 234.222 255.778 219 237 219C218.222 219 203 234.222 203 253C203 271.778 218.222 287 237 287Z'
										fill='white'
									/>
									<path
										fillRule='evenodd'
										clipRule='evenodd'
										d='M298 334C315.673 334 330 319.673 330 302C330 284.327 315.673 270 298 270C280.327 270 266 284.327 266 302C266 319.673 280.327 334 298 334ZM298 336C316.778 336 332 320.778 332 302C332 283.222 316.778 268 298 268C279.222 268 264 283.222 264 302C264 320.778 279.222 336 298 336Z'
										fill='white'
									/>
									<path d='M166 241H168V302H166V241Z' fill='white' />
									<path d='M166 143H168V153H166V143Z' fill='white' />
									<path d='M166 67H168V77H166V67Z' fill='white' />
									<path
										d='M60.957 112.225L62.2157 110.67L133.454 168.358L132.196 169.912L60.957 112.225Z'
										fill='white'
									/>
									<path
										d='M200.536 225.256L201.795 223.702L211.966 231.938L210.708 233.493L200.536 225.256Z'
										fill='white'
									/>
									<path
										d='M261.613 274.713L262.872 273.159L272.649 281.076L271.391 282.63L261.613 274.713Z'
										fill='white'
									/>
									<path
										fillRule='evenodd'
										clipRule='evenodd'
										d='M297 123C314.673 123 329 108.673 329 91C329 73.3269 314.673 59 297 59C279.327 59 265 73.3269 265 91C265 108.673 279.327 123 297 123ZM297 125C315.778 125 331 109.778 331 91C331 72.2223 315.778 57 297 57C278.222 57 263 72.2223 263 91C263 109.778 278.222 125 297 125Z'
										fill='white'
									/>
									<path
										fillRule='evenodd'
										clipRule='evenodd'
										d='M34 334C51.6731 334 66 319.673 66 302C66 284.327 51.6731 270 34 270C16.3269 270 2 284.327 2 302C2 319.673 16.3269 334 34 334ZM34 336C52.7777 336 68 320.778 68 302C68 283.222 52.7777 268 34 268C15.2223 268 0 283.222 0 302C0 320.778 15.2223 336 34 336Z'
										fill='white'
									/>
									<path
										d='M271.251 110.863L272.51 112.418L201.42 169.985L200.161 168.431L271.251 110.863Z'
										fill='white'
									/>
									<path
										d='M132.243 223.428L133.502 224.982L123.217 233.31L121.959 231.756L132.243 223.428Z'
										fill='white'
									/>
									<path
										d='M70.9443 273.066L72.203 274.621L60.9218 283.756L59.6632 282.202L70.9443 273.066Z'
										fill='white'
									/>
								</mask>
								<g mask='url(#mask0_969_51167)'>
									<circle
										cx='167'
										cy='197'
										r={204 - 164 * progressMultiple} // max: 204 | min: 40
										fill='#343434'
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
								>
									<div className='circle' />
								</div>
							)}
						</div>
					</div>
				</div>
				{!currentCraft?.progress.isStarted && (
					<div className='start' onClick={() => callClient(AlchemyTableEvents.Start)}>
						Начать изготовление
					</div>
				)}
				{currentCraft?.progress.isStarted && !currentCraft?.progress.isCompleted && (
					<>
						<div className='cancel' onClick={() => callClient(AlchemyTableEvents.Cancel)}>
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
