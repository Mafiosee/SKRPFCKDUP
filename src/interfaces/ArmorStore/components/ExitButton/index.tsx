import './styles.sass'
import React from 'react'
import { callClient } from '../../../../utils/api'
import { ArmorStoreEvents } from '../../../../shared/ArmorStore/events'

const ExitButton: React.FC = () => {
	return (
		<div
			className='_ExitButton'
			onClick={() => callClient(ArmorStoreEvents.Close)}
		>
			<div className='text'>Выйти</div>
			<div className='key' />
		</div>
	)
}

export default ExitButton
