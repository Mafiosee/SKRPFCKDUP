import React from 'react'
import './styles.sass'
import { useAppSelector } from '../../../../hooks/redux'

export const InteractNotification: React.FC = () => {
	const { interactNotification } = useAppSelector(state => state.hud)
	const { button, text, show } = interactNotification
	return (
		show && (
			<div className={'_InteractNotification'}>
				<div className='content'>
					<div className='text'>{text}</div>
					<div className='button'>
						<div className='button'>{button}</div>
					</div>
					<div className='bg' />
				</div>
			</div>
		)
	)
}
