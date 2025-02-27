import './styles.sass'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useAppDispatch } from '../../../../hooks/redux'
import { MouseButton } from '../../../../types/mouseButton'
import { fishingGameActions } from '../../reducer'
import { FishingGameCondition } from '../../types'
import { callClient } from '../../../../utils/api'
import { FishingGameEvents } from '../../api'
import { TimeoutRef } from '../../../../types/timeoutRef'

const MAX_CLICK_AMOUNT = 6
const TIMEOUT = 2000

const Hooking: React.FC = () => {
	const dispatch = useAppDispatch()
	const [clickAmount, setClickAmount] = useState(0)
	const timeoutRef = useRef<TimeoutRef>(null)
	const [isFail, setIsFail] = useState(false)

	useEffect(() => {
		timeoutRef.current = setTimeout(() => {
			setIsFail(true)
			callClient(FishingGameEvents.Fail)
		}, TIMEOUT)
		return () => {
			if (timeoutRef.current != null) {
				clearTimeout(timeoutRef.current)
			}
		}
	}, [])

	const clickHandler = useCallback(
		(event: MouseEvent) => {
			if (event.button !== MouseButton.Left) {
				return
			}
			setClickAmount(prev => prev + 1)
		},
		[setClickAmount],
	)

	useEffect(() => {
		document.removeEventListener('click', clickHandler)
		if (clickAmount < MAX_CLICK_AMOUNT) {
			if (!isFail) {
				document.addEventListener('click', clickHandler)
			}
		} else {
			if (timeoutRef.current != null) {
				clearTimeout(timeoutRef.current)
			}
			dispatch(fishingGameActions.setCondition(FishingGameCondition.Fishing))
		}
		return () => {
			document.removeEventListener('click', clickHandler)
		}
	}, [clickAmount, clickHandler, dispatch, isFail])

	return (
		<div className='_Hooking'>
			<div className='title'>Похоже у вас клюёт! Тяните!</div>
			<div className='circle'>
				<div className='bobber' />
				<div className='wave' />
			</div>
			<div className='helper'>Для того, чтобы подсечь рыбу быстро нажимайте ЛКМ</div>
		</div>
	)
}

export default Hooking
