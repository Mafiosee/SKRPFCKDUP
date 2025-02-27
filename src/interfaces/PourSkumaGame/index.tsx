import React, { useCallback, useEffect, useRef, useState } from 'react'
import './styles.sass'
import { CSSTransition } from 'react-transition-group'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import Info from './components/Info'
import Exit from './components/Exit'
import { DragType } from './types/Drag'
import Drag from './components/Drag'
import { KeyCodes } from '../../utils/keyCodes'
import { callClient } from '../../utils/api'
import { pourSkumaGameActions } from './reducer'
import { PourSkumaGameEvents } from '../../shared/PourSkumaGame/events'
import Items from './components/Items'

const PourSkumaGame = () => {
	const dispatch = useAppDispatch()
	const { isOpen } = useAppSelector(state => state.pourSkumaGame)
	const nodeRef = useRef(null)
	const [drag, setDrag] = useState<DragType>({
		bottleIdx: null,
		position: { x: 0, y: 0 },
		isSuccess: false,
	})
	const [isMouseDebounced, setIsMouseDebounced] = useState(false)
	const [filledBottles, setFilledBottles] = useState(0)
	const [isFilling, setIsFilling] = useState(false)
	const [progress, setProgress] = useState(0)
	const [tick, setTick] = useState(false)

	// useEffect(() => {
	// 	setTimeout(() => dispatch(pourSkumaGameActions.show()), 150)
	// }, [])

	useEffect(() => {
		if (!isOpen) {
			return
		}
		setDrag(prev => ({ ...prev, itemId: null }))
		setIsMouseDebounced(false)
		setFilledBottles(0)
		setIsFilling(false)
		setProgress(0)
	}, [isOpen])

	useEffect(() => {
		if (!isOpen) {
			return
		}
		setTimeout(() => setTick(prev => !prev), 250)
	}, [tick, isOpen])

	useEffect(() => {
		if (isFilling && progress < 100) {
			setProgress(prev => prev + 10)
		}
	}, [tick])

	useEffect(() => {
		if (progress < 100) {
			return
		}
		setFilledBottles(prev => prev + 1)
		setIsFilling(false)
		setProgress(0)
	}, [progress])

	const keyDownHandler = useCallback(
		(event: KeyboardEvent) => {
			switch (event.keyCode) {
				case KeyCodes.Space:
					if (filledBottles < 3) {
						return
					}
					callClient(PourSkumaGameEvents.Finish)
					break
			}
		},
		[filledBottles],
	)

	useEffect(() => {
		document.removeEventListener('keyup', keyDownHandler)
		if (isOpen) {
			document.addEventListener('keyup', keyDownHandler)
		}
		return () => {
			document.removeEventListener('keyup', keyDownHandler)
		}
	}, [keyDownHandler, isOpen])

	return (
		<CSSTransition
			in={isOpen}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='PourSkumaGame'
			nodeRef={nodeRef}
		>
			<div
				className='PourSkumaGame'
				ref={nodeRef}
				onMouseMove={event => {
					if (isMouseDebounced) {
						return
					}
					setIsMouseDebounced(true)
					setTimeout(() => setIsMouseDebounced(false), 15)
					setDrag(prev => ({
						...prev,
						position: { x: event.clientX, y: event.clientY },
					}))
				}}
				onMouseUp={() => setDrag(prev => ({ ...prev, bottleIdx: null }))}
			>
				<Info />

				<Exit />

				<Items
					filledBottles={filledBottles}
					dragBottleIdx={drag.bottleIdx}
					setDragBottleIdx={(bottleIdx: null) => setDrag(prev => ({ ...prev, bottleIdx }))}
				/>

				<div
					className={`helper ${filledBottles < 3 && !isFilling && drag.bottleIdx === null && '-show'}`}
				/>

				<div className='mortar'>
					<div className='shadow' />
					<div className='content'>
						<div
							className='zone'
							onMouseEnter={() => {
								setDrag(prev => ({ ...prev, isSuccess: true }))
							}}
							onMouseLeave={() => {
								setDrag(prev => ({ ...prev, isSuccess: false }))
							}}
							onMouseUp={() => {
								if (drag.bottleIdx === null) {
									return
								}
								setIsFilling(true)
							}}
						/>
						<div
							className='fluid'
							style={{
								transform: `scale(${0.33 * (3 - filledBottles) - 0.33 * (progress / 100)})`,
							}}
						/>
					</div>
				</div>

				<div className={`filling ${isFilling && '-show'}`}>
					<div className='progress'>
						<div className='bar' style={{ width: `${progress}%` }} />
					</div>
					<div className='helper'>Идет наполнение, ожидайте...</div>
				</div>

				<Drag info={drag} />

				<div
					className={`bottle -idx-0 ${isFilling && filledBottles === 0 && '-filling'} ${filledBottles <= 0 && !(isFilling && filledBottles === 0) && '-hidden'}`}
				>
					<div className='fluid'>
						<div
							className='content'
							style={{ height: `${isFilling && filledBottles === 0 ? progress : 100}%` }}
						/>
					</div>
					<div className='cup' />
				</div>

				<div
					className={`bottle -idx-1 ${isFilling && filledBottles === 1 && '-filling'} ${filledBottles <= 1 && !(isFilling && filledBottles === 1) && '-hidden'}`}
				>
					<div className='fluid'>
						<div
							className='content'
							style={{ height: `${isFilling && filledBottles === 1 ? progress : 100}%` }}
						/>
					</div>
					<div className='cup' />
				</div>

				<div
					className={`bottle -idx-2 ${isFilling && filledBottles === 2 && '-filling'} ${filledBottles <= 2 && !(isFilling && filledBottles === 2) && '-hidden'}`}
				>
					<div className='fluid'>
						<div
							className='content'
							style={{ height: `${isFilling && filledBottles === 2 ? progress : 100}%` }}
						/>
					</div>
					<div className='cup' />
				</div>

				<div className={`finish ${filledBottles === 3 && '-show'}`}>
					<div className='center'>
						<div className='background' />
						<div className='content'>
							<div className='title'>Отлично!</div>
							<div className='description'>У вас получилось разлить напиток “Скума”!</div>
							<div className='separator' />
							<div className='helper'>
								<div className='text'>Для продолжения нажмите</div>
								<div className='key' />
							</div>
						</div>
					</div>
				</div>
			</div>
		</CSSTransition>
	)
}

export default PourSkumaGame
