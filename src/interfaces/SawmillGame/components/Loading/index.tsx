import './styles.sass'
import React, { useCallback, useEffect, useState } from 'react'
import { AVAILABLE_KEYS, FAIL_AMOUNT, PROGRESS_STEP } from './Config'
import { getRandomInt } from '../../../../utils/getRandomInt'
import { KeyNames } from '../../../../utils/keyNames'
import { callClient } from '../../../../utils/api'
import { SawmillGameEvents } from '../../api'

const Loading = () => {
	const [progress, setProgress] = useState(0)
	const [key, setKey] = useState(null)
	const [failAmount, setFailAmount] = useState(0)
	const [isFinish, setIsFinish] = useState(false)

	useEffect(() => {
		setIsFinish(false)
	}, [])

	useEffect(() => {
		setKey(getRandomInt(0, AVAILABLE_KEYS.length))
	}, [progress])

	const success = () => {
		if (progress >= 100 && isFinish) {return}
		let newProgress = progress + PROGRESS_STEP
		if (newProgress >= 100) {
			newProgress = 100
			setIsFinish(true)
			callClient(SawmillGameEvents.Win)
		}
		setProgress(newProgress)
	}

	const fail = () => {
		const newFailAmount = failAmount + 1
		if (newFailAmount >= FAIL_AMOUNT) {callClient(SawmillGameEvents.Loose)}
		else {setFailAmount(newFailAmount)}
	}

	const keyDownHandler = useCallback(
		({ keyCode }: KeyboardEvent) => {
			if (failAmount >= FAIL_AMOUNT) {return}
			if (keyCode === AVAILABLE_KEYS[key]) {success()}
			else {fail()}
		},
		[progress, key, failAmount],
	)

	useEffect(() => {
		addEventListener('keyup', keyDownHandler)
		return () => {
			removeEventListener('keyup', keyDownHandler)
		}
	}, [keyDownHandler])

	return (
		<div className='_Loading'>
			<div className='title'>Погрузка бревен</div>
			<div className='description'>Нажимайте на появившиеся клавиши для погрузки бревен</div>
			<div className='key'>{key === null ? null : KeyNames[AVAILABLE_KEYS[key]]}</div>
			<div className='progress'>
				<div className='line' style={{ width: `${progress}%` }} />
			</div>
		</div>
	)
}

export default Loading
