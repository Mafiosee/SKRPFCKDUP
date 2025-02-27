import React, { useEffect, useRef, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CSSTransition } from 'react-transition-group'
import { callClient } from '../../utils/api'
import { WeddingResponseEvents } from '../../shared/WeddingResponse/events'
import { weddingResponseActions } from './reducer'

const WeddingResponse: React.FC = () => {
	const dispatch = useAppDispatch()
	const { isOpen, senderName } = useAppSelector(
		(state) => state.weddingResponse,
	)
	const nodeRef = useRef(null)

	// useEffect(() => {
	//   setTimeout(() => dispatch(weddingResponseActions.show()), 150);
	// }, [dispatch]);

	return (
		<CSSTransition
			in={isOpen}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='WeddingResponse'
			nodeRef={nodeRef}
		>
			<div className='WeddingResponse' ref={nodeRef}>
				<div className='window'>
					<div className='title'>Вам сделали предложение!</div>
					<div className='request'>
						<span>{senderName}</span>
						сделал(а) вам предложение
					</div>
					<div className='line' />
					<div className='description'>
						Желаете создать брак, жить долго и счастливо?
					</div>
					<div className='buttons'>
						<div
							className='button -accept'
							onClick={() => callClient(WeddingResponseEvents.Accept)}
						>
							Я согласен(а)
						</div>
						<div
							className='button -deny'
							onClick={() => callClient(WeddingResponseEvents.Deny)}
						>
							Отказаться
						</div>
					</div>
				</div>
			</div>
		</CSSTransition>
	)
}

export default WeddingResponse
