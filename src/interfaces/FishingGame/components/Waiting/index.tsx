import './styles.sass'
import React, { useEffect, useRef } from 'react'
import { useAppDispatch } from '../../../../hooks/redux'
import { fishingGameActions } from '../../reducer'
import { FishingGameCondition } from '../../types'
import { getRandomInt } from '../../../../utils/getRandomInt'

const MIN_TIME = 2000
const MAX_TIME = 6000

const Waiting = () => {
	const dispatch = useAppDispatch()
	const timeoutRef = useRef(null)

	useEffect(() => {
		timeoutRef.current = setTimeout(
			() => dispatch(fishingGameActions.setCondition(FishingGameCondition.Hooking)),
			getRandomInt(MIN_TIME, MAX_TIME)
		)
		return () => {
			clearTimeout(timeoutRef.current)
		}
	}, [])

	return (
		<div className='_Waiting'>
			<div className='title'>Ожидайте клёва...</div>
			<div className='circle'>
				<div className='bobber' />
				<div className='wave' />
			</div>
		</div>
	)
}

export default Waiting
