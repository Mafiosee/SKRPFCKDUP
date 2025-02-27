import React, { useEffect, useRef, useState } from 'react'
import './styles.sass'
import { useAppSelector } from '../../hooks/redux'
import { CSSTransition } from 'react-transition-group'
import {
	ChooseWorkDismissPayload,
	ChooseWorkStartPayload,
	ChooseWorkTypeEvents,
} from '../../shared/Work/events'
import { ButtonClassName } from './data'
import { callClient } from '../../utils/api'
import { importAllImagesFromFolder } from '../../utils/images'
import { chooseWorkTypeActions } from './reducer'
import { useDispatch } from 'react-redux'
import { KeyCodes } from '../../utils/keyCodes'
import { WorkStatus } from '../../shared/Work/Work'
import { useEscClose } from '../../hooks/useEscClose'

const IconImages = importAllImagesFromFolder(
	require.context('./assets/images/icons', false, /.svg$/),
)
const WorkImages = importAllImagesFromFolder(
	require.context('./assets/images/works', false, /.png$/),
)

const WorkBackgroundImages = importAllImagesFromFolder(
	require.context('./assets/images/backgrounds/', false, /.png$/),
)

const ChooseWorkType = () => {
	const dispatch = useDispatch()
	const { isOpen, title, levelHelper, works, image } = useAppSelector(
		(state) => state.chooseWorkType,
	)
	const nodeRef = useRef(null)
	const [selectedId, setSelectedId] = useState(0)

	const selectedIdx = works.findIndex((el) => el.id === selectedId)

	const worksRef = useRef<HTMLDivElement>(null)
	const [isDragging, setIsDragging] = useState(false)
	const [startX, setStartX] = useState(0)
	const [scrollLeft, setScrollLeft] = useState(0)

	useEscClose({ isOpenInterface: isOpen, closeEvent: ChooseWorkTypeEvents.Close })

	const handleMouseDown = (e: React.MouseEvent) => {
		setIsDragging(true)
		if (worksRef.current) {
			setStartX(e.pageX - worksRef.current.offsetLeft)
			setScrollLeft(worksRef.current.scrollLeft)
		}
	}

	const handleMouseUp = () => {
		setIsDragging(false)
	}

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isDragging) {
			return
		}
		if (worksRef.current) {
			const x = e.pageX - worksRef.current.offsetLeft
			const walk = (x - startX) * 0.5
			worksRef.current.scrollLeft = scrollLeft - walk
		}
	}

	const onClickExit = () => {
		return callClient(ChooseWorkTypeEvents.Close)
	}

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		dispatch(chooseWorkTypeActions.show())
	// 		dispatch(chooseWorkTypeActions.setTitle('Лесопилка Ривервуда'))
	// 		dispatch(chooseWorkTypeActions.setImage('forest'))
	// 		dispatch(chooseWorkTypeActions.setLevelHelper('Уровень Лесорубства'))
	// 		dispatch(chooseWorkTypeActions.setWorks([
	// 			{
	// 				id: 0,
	// 				level: 1,
	// 				name: 'Носильщик',
	// 				description: 'Носильщик доставляет бревна от места их добычи к лесопилке. Обычно эту часть заготовки леса перекладывают на новичков, как самую тяжелую и не требующую опыта. Для такой работы нужны крепкая спина, сильные ноги и очень большое желание стать лесорубом.',
	// 				status: 1,
	// 				icon: 'wood',
	// 				progress: {
	// 					current: 0,
	// 					max: 0,
	// 				},
	// 				image: 'forest_0',
	// 			},
	// 			{
	// 				id: 1,
	// 				level: 3,
	// 				name: 'Распиловщик',
	// 				description: 'Распиловщик обрабатывает бревна, превращая их в заготовки. Это требует знаний о типах древесины и методах распила. Хороший распиловщик должен быть ловким и уметь концентрироваться, чтобы не испортить ценное сырье.',
	// 				status: 1,
	// 				icon: 'wood',
	// 				progress: {
	// 					current: 0,
	// 					max: 0,
	// 				},
	// 				image: 'forest_1',
	// 			},
	// 			{
	// 				id: 2,
	// 				level: 6,
	// 				name: 'Лесоруб',
	// 				description: 'Лесоруб знает лес, как свои пять пальцев. Он отвечает за поиск подходящих деревьев в лесу, их вырубку и первичную обработку на месте. Лесоруб отлично разбирается в сортах древесины, может определить возраст дерева и даже качество будущих заготовок. От его работы зависят поставки для лесопилки.',
	// 				status: 2,
	// 				icon: 'wood',
	// 				progress: {
	// 					current: 0,
	// 					max: 0,
	// 				},
	// 				image: 'forest_2',
	// 			},
	// 		]))
	// 	}, 150)
	// }, [dispatch])

	useEffect(() => {
		setSelectedId(works.length ? works[0]?.id : null)

		if (works.length) {
			const currentJob = works.find(work => work.status === WorkStatus.Working)
			if (!currentJob) {
				setSelectedId(works[0].id)
			} else {
				setSelectedId(currentJob.id)
			}
		} else {
			setSelectedId(0)
		}
	}, [works])

	useEffect(() => {
		if (worksRef.current) {
			const selectedElement = worksRef.current.children[
				selectedIdx
				] as HTMLElement | null
			if (selectedElement) {
				selectedElement.scrollIntoView({
					behavior: 'smooth',
					block: 'nearest',
				})
			}
		}
	}, [selectedIdx])

	const getInfo = () => {
		if (selectedId === null) {
			return null
		}
		const work = works.find((el) => el.id === selectedId)
		if (!work) {
			return null
		}
		const { id, level, name, description, status, icon, progress } = work

		return (
			<div className='info'>
				<div className='level'>
					Уровень {levelHelper}: {level}
				</div>
				<div className='name'>{name}</div>
				<div className='description'>{description}</div>
				<div className='row'>
					<div
						className={`btn ${ButtonClassName[status]}`}
						onClick={() => {
							switch (status) {
								case WorkStatus.Unavailable: {
									return
								}
								case WorkStatus.Available: {
									const payload: ChooseWorkStartPayload = { workId: id }
									return callClient(ChooseWorkTypeEvents.Start, payload)
								}
								case WorkStatus.Working: {
									const payload: ChooseWorkDismissPayload = { workId: id }
									return callClient(ChooseWorkTypeEvents.Dismiss, payload)
								}
							}
						}}
					>
						{status === WorkStatus.Unavailable && `Требуется уровень: ${level}`}
						{status === WorkStatus.Available && 'Начать работу'}
						{status === WorkStatus.Working && 'Закончить работу'}
					</div>
					{status !== WorkStatus.Unavailable &&
						progress.current < progress.max &&
						id !== works.length - 1 && (
							<div className='progress'>
								<div className='lvl'>
									До уровня {levelHelper}: {level + 1}
								</div>
								<div className='info'>
									<div
										className='icon'
										style={{
											backgroundImage: `url(${IconImages[`${icon}.svg`]})`,
										}}
									/>
									<div className='amount'>
										{progress.current}/{progress.max}
									</div>
								</div>
							</div>
						)}
				</div>
			</div>
		)
	}

	// нажатие стрелок <- и ->
	const onClickArrow = (step: 'next' | 'prev') => {
		if (step === 'next' && selectedId !== works.length - 1) {
			setSelectedId(selectedId + 1)
		} else if (step === 'prev' && selectedId > 0) {
			setSelectedId(selectedId - 1)
		}
	}

	// вывести список занятий
	const getTasksList = () => {
		return works.map(({ id, level, name, image }, idx) => {
			if (selectedId === null || !~selectedIdx) {
				return null
			}
			const isSelected = selectedId === +id

			return (
				<div
					key={idx}
					className={`work ${isSelected && '-selected'}`}
					onClick={() => {
						setSelectedId(+id)
					}}
				>
					<div
						className='icon'
						style={{ backgroundImage: `url(${WorkImages[`${image}.png`]})` }}
					/>

					<div className='info'>
						<div className='name'>{name}</div>
						<div className='lvl'>
							Уровень {levelHelper}: {level}
						</div>
					</div>
				</div>
			)
		})
	}

	return (
		<CSSTransition
			in={isOpen}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='ChooseWorkType'
			nodeRef={nodeRef}
		>
			<div className='ChooseWorkType' ref={nodeRef}>
				<div className='bg' />
				<div className='watermark' />
				<div className='blur' />
				<div className='window'>
					<div
						className='bg'
						style={{
							backgroundImage: `url(${WorkBackgroundImages[`${image}.png`]})`,
						}}
					/>
					<div className='frame' />

					<div className='content'>
						{getInfo()}
						<div className='tasks-list'>
							<div className='info'>
								<div className='name'>Список занятий</div>
								{works.length > 3 && (
									<div className='arrows'>
										<div
											className='arrow'
											onClick={() => onClickArrow('prev')}
										/>
										<div
											className='arrow'
											onClick={() => onClickArrow('next')}
										/>
									</div>
								)}
							</div>
							<div
								className='works'
								ref={worksRef}
								onMouseDown={handleMouseDown}
								onMouseUp={handleMouseUp}
								onMouseMove={handleMouseMove}
							>
								{getTasksList()}
							</div>
							{/*<div className="works-shadow" />*/}
						</div>
					</div>
					<div className='other'>
						<div className='work-name'>{title}</div>
						<div className='cross' onClick={onClickExit} />
					</div>
				</div>
			</div>
		</CSSTransition>
	)
}

export default ChooseWorkType
