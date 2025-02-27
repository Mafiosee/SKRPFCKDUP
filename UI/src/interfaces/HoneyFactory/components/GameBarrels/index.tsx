import './styles.sass'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ExitHelper from '../ExitHelper'
import { useAppDispatch } from '../../../../hooks/redux'
import { Step } from './types'
import { calcVh } from '../../../../utils/calcVh'
import {
	DIFFICULT_OFFSET,
	FILLING_STEP,
	FINISH_HAMMER_STEP,
	FINISH_POSITION,
	TICK_TIME_MS,
} from './config'
import { getRandomInt } from '../../../../utils/getRandomInt'
import { MouseButton } from '../../../../types/mouseButton'
import { honeyFactoryActions } from '../../reducer'

const GameBarrels = () => {
	const dispatch = useAppDispatch()
	const [step, setStep] = useState(Step.Fill)
	const [isFilling, setIsFilling] = useState(false)
	const [level, setLevel] = useState(0)
	const fillingTimeout = useRef(null)
	const [isDragCap, setIsDragCap] = useState(false)
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
	const [isInCapZone, setIsInCapZone] = useState(false)
	const [isDragHammer, setIsDragHammer] = useState(false)
	const [isInHammerZone, setIsInHammerZone] = useState(false)
	const [finishBarrelPosition, setFinishBarrelPosition] = useState(
		getRandomInt(FINISH_POSITION.MIN, FINISH_POSITION.MAX)
	)
	const [finishHammerPosition, setFinishHammerPosition] = useState(
		getRandomInt(FINISH_POSITION.MIN, FINISH_POSITION.MAX)
	)
	const [tick, setTick] = useState(false)
	const tickTimeout = useRef(null)
	const isRight = useRef(false)
	const [isAnim, setIsAnim] = useState(false)
	const [isEnd, setIsEnd] = useState(false)

	const mouseDownHandler = useCallback(
		(event: MouseEvent) => {
			if (event.button !== MouseButton.Left || step !== Step.Finish || isEnd) {return}
			setIsEnd(true)
			if (
				finishHammerPosition >= finishBarrelPosition - DIFFICULT_OFFSET &&
				finishHammerPosition <= finishBarrelPosition + 20 + DIFFICULT_OFFSET
			) {
				setIsAnim(true)
			} else {
				dispatch(
					honeyFactoryActions.setFinishScreen({
						isWin: false,
						text: 'Вы не смогли закупорить бочку',
						helper: 'Нажимайте лкм, когда молот будет находится в зеленой зоне',
					})
				)
			}
		},
		[finishBarrelPosition, finishHammerPosition, step, isEnd]
	)

	useEffect(() => {
		document.addEventListener('mousedown', mouseDownHandler)
		return () => {
			document.removeEventListener('mousedown', mouseDownHandler)
		}
	}, [mouseDownHandler])

	useEffect(() => {
		clearTimeout(tickTimeout.current)
		if (step !== Step.Finish) {return}
		tickTimeout.current = setTimeout(() => setTick(prev => !prev), TICK_TIME_MS)
	}, [tick, step])

	useEffect(() => {
		if (isEnd) {return}
		const newFinishHammerPosition =
			finishHammerPosition + FINISH_HAMMER_STEP * (isRight.current ? 1 : -1)
		if (newFinishHammerPosition > FINISH_POSITION.MAX) {isRight.current = false}
		else if (newFinishHammerPosition < FINISH_POSITION.MIN) {isRight.current = true}
		setFinishHammerPosition(newFinishHammerPosition)
	}, [tick])

	useEffect(() => {
		clearTimeout(fillingTimeout.current)
		if (!isFilling) {return}
		let newLevel = level + FILLING_STEP
		if (newLevel > 100) {newLevel = 100}
		fillingTimeout.current = setTimeout(() => setLevel(newLevel), 100)
	}, [isFilling, level])

	const mouseUpHandler = useCallback(() => {
		if (step === Step.Cap && isDragCap && isInCapZone) {setStep(Step.Hammer)}
		if (step === Step.Hammer && isDragHammer && isInHammerZone) {setStep(Step.Finish)}
		setIsFilling(false)
		setIsDragCap(false)
		setIsInCapZone(false)
		setIsDragHammer(false)
		setIsInHammerZone(false)
	}, [step, isDragCap, isInCapZone, isDragHammer, isInHammerZone])

	useEffect(() => {
		document.addEventListener('mouseup', mouseUpHandler)
		return () => {
			document.removeEventListener('mouseup', mouseUpHandler)
		}
	}, [mouseUpHandler])

	useEffect(() => {
		if (level >= 100) {
			clearTimeout(fillingTimeout.current)
			setIsFilling(false)
			setStep(Step.Cap)
		}
	}, [level])

	return (
		<div
			className='_GameBarrels'
			onMouseMove={event => setMousePosition({ x: event.clientX - 150, y: event.clientY - 50 })}
		>
			<ExitHelper />
			<div className='info'>
				<div className='title'>Закупоривание бочек</div>
				<div className='text'>Для закупорования бочки, следуйте указаниям на экране</div>
			</div>
			<div className='cistern'>
				<div className={`cran ${step === Step.Fill && '-active'}`}>
					<div
						className='elem'
						onMouseDown={() => {
							if (step !== Step.Fill) {return}
							setIsFilling(true)
						}}
					/>
					<div className='helper'>Давайте откроем кран и выльем медовуху</div>
				</div>
			</div>
			<div className='barrel'>
				<div className={`filling ${isFilling && '-active'}`} />
				<div className='front' />
				<div
					className={`level ${step === Step.Fill && '-show'}`}
					style={{ height: calcVh(5.6 * level) }}
				/>
				<div
					className={`levelCap ${step === Step.Fill && '-show'}`}
					style={{
						transform: `translateY(${calcVh(47 - (level < 80 ? 0 : ((level - 80) / 20) * 47))})`,
					}}
				/>
				<div
					className={`capZone ${step === Step.Cap && '-active'}`}
					onMouseEnter={() => {
						if (!isDragCap) {return}
						setIsInCapZone(true)
					}}
					onMouseLeave={() => setIsInCapZone(false)}
				/>
				<div
					className={`hammerZone ${step === Step.Hammer && '-active'}`}
					onMouseEnter={() => {
						if (!isDragHammer) {return}
						setIsInHammerZone(true)
					}}
					onMouseLeave={() => setIsInHammerZone(false)}
				/>
			</div>
			<div
				className={`cap ${step === Step.Cap && '-active'} ${isDragCap && '-drag'} ${isInCapZone && '-success'} ${isAnim && '-animate'}`}
				style={{
					top: isDragCap ? mousePosition.y : step > Step.Cap ? calcVh(286) : 'auto',
					bottom: isDragCap || step > Step.Cap ? 'auto' : calcVh(192),
					left: isDragCap
						? mousePosition.x
						: step > Step.Cap
							? '50%'
							: `calc(50% + ${calcVh(120)})`,
					transform: `rotate(${isDragCap || step > Step.Cap ? 0 : 73}deg) translateX(${step > Step.Cap ? '-50%' : 0})`,
				}}
				onMouseDown={() => {
					if (step !== Step.Cap) {return}
					setIsDragCap(true)
				}}
			/>
			<div className={`capHelper ${step === Step.Cap && !isDragCap && '-show'}`}>
				<div className='text'>Возьмите крышку</div>
			</div>
			<div
				className={`hammer ${step === Step.Hammer && '-active'} ${isDragHammer && '-drag'} ${isInHammerZone && '-success'} ${isAnim && '-animate'}`}
				style={{
					top: isDragHammer ? mousePosition.y : step === Step.Finish ? calcVh(100) : 'auto',
					bottom: isDragHammer || step === Step.Finish ? 'auto' : calcVh(20),
					left: isDragHammer
						? mousePosition.x
						: step === Step.Finish
							? `calc(50% + ${calcVh(220)})`
							: `calc(50% - ${calcVh(530)})`,
					transform: step === Step.Finish ? null : `rotate(${isDragHammer ? 0 : 170}deg)`,
				}}
				onMouseDown={() => {
					if (step !== Step.Hammer) {return}
					setIsDragHammer(true)
				}}
				onAnimationEnd={() => {
					dispatch(
						honeyFactoryActions.setFinishScreen({
							isWin: true,
							text: 'У вас получилось закупорить бочку!',
							helper: null,
						})
					)
				}}
			/>
			<div className={`hammerHelper ${step === Step.Hammer && !isDragHammer && '-show'}`}>
				<div className='arrow' />
				<div className='text'>Настало время молота</div>
			</div>
			<div className={`finishHelper ${step === Step.Finish && '-show'}`}>
				<div className='arrow' />
				<div className='text'>
					Давайте шандарахнем
					<br />
					молотом!
				</div>
			</div>
			<div className={`finish ${step === Step.Finish && '-show'}`}>
				<div className='game'>
					<div className='barrel' style={{ left: calcVh(finishBarrelPosition) }} />
					<div
						className='hammer'
						style={{
							left: calcVh(finishHammerPosition),
							transition: `all ${TICK_TIME_MS}ms linear`,
						}}
					/>
				</div>
				<div className='helper'>Для удара, в нужный момент нажмите лкм</div>
			</div>
		</div>
	)
}

export default GameBarrels
