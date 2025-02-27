import React from 'react'
import './styles.sass'
import { useAppSelector } from '../../../../hooks/redux'

export const AcceptCancelNotification: React.FC = () => {
	const { acceptCancelNotification } = useAppSelector(state => state.hud)
	return (
		acceptCancelNotification.show && (
			<div className={'_AcceptCancelNotification'}>
				<div className='content'>
					<div className='text'>{acceptCancelNotification.text}</div>
					<div className='line' />
					<div className='buttons'>
						<div className='action'>
							<div className='button'>
								<div className='button'>{acceptCancelNotification.buttonAccept}</div>
							</div>
							<div className='text'>Принять</div>
						</div>

						<div className='action'>
							<div className='button'>
								<div className='button'>{acceptCancelNotification.buttonCancel}</div>
							</div>
							<div className='text'>Отклонить</div>
						</div>
					</div>
				</div>
			</div>
		)
	)
}
