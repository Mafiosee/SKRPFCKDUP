import './styles.sass'
import React, { useCallback, useEffect } from 'react'
import { useAppSelector } from '../../../../hooks/redux'
import { KeyCodes } from '../../../../utils/keyCodes'
import { callClient } from '../../../../utils/api'
import { HoneyFactoryEvents } from '../../../../shared/Work/events'

const FinishScreen = () => {
	const { finishScreen } = useAppSelector(state => state.honeyFactory)

	const keyDownHandler = useCallback(
		(event: KeyboardEvent) => {
			switch (event.keyCode) {
				case KeyCodes.Space:
					return callClient(finishScreen?.isWin ? HoneyFactoryEvents.Win : HoneyFactoryEvents.Loose)
			}
		},
		[finishScreen]
	)

	useEffect(() => {
		document.addEventListener('keyup', keyDownHandler)
		return () => {
			document.removeEventListener('keyup', keyDownHandler)
		}
	}, [keyDownHandler])

	if (!finishScreen) {return null}

	return (
		<div className='_FinishScreen'>
			<div className={`bg ${finishScreen?.isWin && '-win'}`}>
				<div className='blur' />
				<div className='image' />
			</div>
			<div className='content'>
				<div className='title'>{finishScreen?.isWin ? 'Отлично!' : 'Упс, не получилось'}</div>
				<div className='text'>{finishScreen?.text}</div>
				<div className='sep' />
				<div className='next'>Для продолжения нажмите</div>
				{finishScreen?.helper && (
					<div className='helper'>
						<div className='title'>Подсказка:</div>
						<div className='text'>{finishScreen?.helper}</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default FinishScreen
