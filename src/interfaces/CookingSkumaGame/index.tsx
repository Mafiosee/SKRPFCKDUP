import React, { useCallback, useEffect, useRef, useState } from 'react'
import './styles.sass'
import { CSSTransition } from 'react-transition-group'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { cookingSkumaGameActions } from './reducer'
import Info from './components/Info'
import Exit from './components/Exit'
import Items from './components/Items'
import { DragType } from './types/Drag'
import { ItemId } from './types/ItemId'
import Drag from './components/Drag'
import { Step } from './types/Step'
import { MouseButton } from '../../types/mouseButton'
import { getMouseAngle } from '../../utils/getMouseAngle'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { KeyCodes } from '../../utils/keyCodes'
import { callClient } from '../../utils/api'
import { CookingSkumaGameEvents } from '../../shared/CookingSkumaGame/events'

const CookingSkumaGame = () => {
	const dispatch = useAppDispatch()
	const { isOpen, step } = useAppSelector(state => state.cookingSkumaGame)
	const nodeRef = useRef(null)
	const [drag, setDrag] = useState<DragType>({
		itemId: null,
		position: { x: 0, y: 0 },
		isSuccess: false,
	})
	const [isMouseDebounced, setIsMouseDebounced] = useState(false)
	const [mouseAngle, setMouseAngle] = useState(0)
	const [prevMouseAngle, setPrevMouseAngle] = useState(0)
	const [isLmb, setIsLmb] = useState(false)
	const [progress, setProgress] = useState(0)
	const [isRightVector, setIsRightVector] = useState(false)
	const [tick, setTick] = useState(false)
	const [isMouseMoving, setIsMouseMoving] = useState(false)
	const mouseMovingTimeout = useRef(null)

	// useEffect(() => {
	//   setTimeout(() => dispatch(cookingSkumaGameActions.show()), 150)
	// }, [])

	useEffect(() => {
		if (!isOpen) {return}
		setDrag(prev => ({ ...prev, itemId: null }))
		setIsMouseDebounced(false)
		setIsLmb(false)
		setProgress(0)
		setIsMouseMoving(false)
	}, [isOpen])

	useEffect(() => {
		if (!isLmb || step !== Step.Crush) {return}
		if (prevMouseAngle > 350 && mouseAngle < 10) {return setIsRightVector(true)}
		setIsRightVector(prevMouseAngle < mouseAngle)
	}, [mouseAngle])

	useEffect(() => {
		if (!isOpen) {return}
		setTimeout(() => setTick(prev => !prev), 250)
	}, [tick, isOpen])

	useEffect(() => {
		if (isMouseMoving && isRightVector && progress < 100) {setProgress(prev => prev + 4)}
	}, [tick])

	useEffect(() => {
		if (progress === 100) {setIsLmb(false)}
	}, [progress])

	const keyDownHandler = useCallback(
		(event: KeyboardEvent) => {
			switch (event.keyCode) {
				case KeyCodes.Space:
					if (progress < 100) {return}
					callClient(CookingSkumaGameEvents.Finish)
					break
			}
		},
		[progress],
	)

	useEffect(() => {
		document.removeEventListener('keyup', keyDownHandler)
		if (isOpen) {document.addEventListener('keyup', keyDownHandler)}
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
			classNames='CookingSkumaGame'
			nodeRef={nodeRef}
		>
			<div
				className='CookingSkumaGame'
				ref={nodeRef}
				onMouseMove={event => {
					setIsMouseMoving(true)
					clearTimeout(mouseMovingTimeout.current)
					mouseMovingTimeout.current = setTimeout(() => setIsMouseMoving(false), 500)
					if (isMouseDebounced) {return}
					setIsMouseDebounced(true)
					setTimeout(() => setIsMouseDebounced(false), 15)
					setDrag(prev => ({
						...prev,
						position: { x: event.clientX, y: event.clientY },
					}))

					const angle = getMouseAngle(event)

					setPrevMouseAngle(mouseAngle)
					setMouseAngle(angle)
				}}
				onMouseDown={event => {
					if (event.button !== MouseButton.Left || progress === 100) {return}
					setIsLmb(true)
				}}
				onMouseUp={event => {
					setDrag(prev => ({ ...prev, itemId: null, isSuccess: false }))
					if (event.button === MouseButton.Left) {
						setIsLmb(false)
						if (step === Step.Crush && progress < 100) {setProgress(0)}
					}
				}}
			>
				<Info />

				<Exit />

				<Items
					dragItemId={drag.itemId}
					setDragItemId={(itemId: ItemId) => setDrag(prev => ({ ...prev, itemId }))}
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
								switch (step) {
									case Step.MoveSugar:
										if (drag.itemId !== ItemId.Sugar) {return}
										setDrag(prev => ({ ...prev, itemId: null }))
										dispatch(cookingSkumaGameActions.setStep(Step.MovePestle))
										break

									case Step.MovePestle:
										if (drag.itemId !== ItemId.Pestle) {return}
										setDrag(prev => ({ ...prev, itemId: null }))
										dispatch(cookingSkumaGameActions.setStep(Step.Crush))
										break
								}
							}}
						/>
						<div className='fluid -start' />
						<div className='fluid -result' style={{ opacity: progress / 100 }} />
						<div className={`bubbles ${step > Step.MoveSugar && '-show'}`}>
							{new Array(10).fill(null).map((_, idx) => (
								<div key={idx} className={`bubble -idx-${idx}`} />
							))}
						</div>
						<div className={`progress ${step === Step.Crush && '-show'}`}>
							<CircularProgressbar
								value={progress}
								strokeWidth={5.5}
								styles={buildStyles({
									strokeLinecap: 'butt',
									pathTransition: `all .5s linear`,
									pathColor: '#fff',
									trailColor: 'rgba(255, 255, 255, .2)',
								})}
							/>
						</div>
						<div
							className={`pestle ${step > Step.MovePestle && '-show'}`}
							style={
								isLmb
									? {
										transform: `rotate(${mouseAngle - 40}deg)`,
									}
									: {}
							}
						/>
					</div>
				</div>

				<div className={`crushHelper ${step === Step.Crush && '-show'}`} />

				<Drag info={drag} />

				<div className={`finish ${progress === 100 && '-show'}`}>
					<div className='center'>
						<div className='background' />
						<div className='content'>
							<div className='title'>Отлично!</div>
							<div className='description'>У вас получилось сварить напиток “Скума”!</div>
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

export default CookingSkumaGame
