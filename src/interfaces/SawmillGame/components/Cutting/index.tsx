import './styles.sass'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { calcVh } from '../../../../utils/calcVh'
import {
	DIFFICULT_OFFSET,
	FAIL_AMOUNT,
	PROGRESS_LIMIT,
	PROGRESS_SPEED,
	PROGRESS_SUCCESS,
	SUCCESS_AMOUNT,
} from './Config'
import { callClient } from '../../../../utils/api'
import { SawmillGameEvents } from '../../api'

const Cutting = () => {
	const [progress, setProgress] = useState(0)
	const progressTimeout = useRef(null)
	const [successAmount, setSuccessAmount] = useState(0)
	const [failAmount, setFailAmount] = useState(0)
	const [isFailActive, setIsFailActive] = useState(false)

	const success = useCallback(() => {
		const newSuccessAmount = successAmount + 1
		clearTimeout(progressTimeout.current)
		if (newSuccessAmount >= SUCCESS_AMOUNT) {
			return callClient(SawmillGameEvents.Win)
		} else {
			setSuccessAmount(newSuccessAmount)
			setProgress(prev => (prev === 0 ? 1 : 0))
		}
	}, [successAmount, progress])

	const fail = useCallback(() => {
		const newFailAmount = failAmount + 1
		setFailAmount(newFailAmount)
		setIsFailActive(true)
		clearTimeout(progressTimeout.current)
		setTimeout(() => {
			setIsFailActive(false)
			if (newFailAmount >= FAIL_AMOUNT) {
				callClient(SawmillGameEvents.Loose)
			} else {
				setProgress(prev => (prev === 0 ? 1 : 0))
			}
		}, 1000)
	}, [failAmount, progress])

	const onClickHandler = useCallback(() => {
		if (
			progress - DIFFICULT_OFFSET >= PROGRESS_SUCCESS.MIN &&
			progress + DIFFICULT_OFFSET <= PROGRESS_SUCCESS.MAX
		) {
			success()
		} else {
			fail()
		}
	}, [progress, success, fail])

	useEffect(() => {
		addEventListener('click', onClickHandler)
		return () => {
			removeEventListener('click', onClickHandler)
		}
	}, [onClickHandler])

	useEffect(() => {
		clearTimeout(progressTimeout.current)
		if (progress < PROGRESS_LIMIT) {
			progressTimeout.current = setTimeout(() => setProgress(progress + PROGRESS_SPEED), 50)
		}
	}, [progress])

	useEffect(() => {
		if (progress >= PROGRESS_LIMIT) {
			fail()
		}
	}, [progress])

	return (
		<div className='_Cutting'>
			<div className='title'>Рубка бревен</div>
			<div className='description'>
				Чтобы успешно разрубить бревно, дождитесь пока красный круг будет находиться в зеленом
			</div>
			<div className='game'>
				<div className='green' />
				<div
					className='red'
					style={{
						width: calcVh(40 + progress),
						height: calcVh(40 + progress),
						borderWidth: calcVh(10 + progress / 2),
					}}
				/>
				<div className='axe' />
				<div className={`fail ${isFailActive && '-show'}`}>Промах</div>
			</div>
			<div className='helper'>Для того, чтобы рубить нажмите ЛКМ</div>
		</div>
	)
}

export default Cutting
