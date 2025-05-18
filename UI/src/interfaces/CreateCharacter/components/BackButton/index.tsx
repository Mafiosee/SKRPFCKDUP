import './styles.sass'
import React from 'react'
import { callClient } from '../../../../utils/api'
import { CreateCharacterEvents } from '../../../../shared/characterEditor/events'

const BackButton = () => {
	return (
		<div className='_BackButton' onClick={() => callClient(CreateCharacterEvents.Back)}>
			Вернуться назад
		</div>
	)
}

export default BackButton
