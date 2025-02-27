import React, { useEffect, useRef } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CSSTransition } from 'react-transition-group'
import { kickInfoActions } from './reducer'

const KickInfo: React.FC = () => {
	const dispatch = useAppDispatch()
	const { isOpen, info } = useAppSelector(
		state => state.kickInfo,
	)
	const nodeRef = useRef(null)

	// useEffect(() => {
	// 	setTimeout(() => dispatch(kickInfoActions.show()), 150)
	// }, [])

	return (
		<CSSTransition
			in={isOpen}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='KickInfo'
			nodeRef={nodeRef}
		>
			<div className='KickInfo' ref={nodeRef}>
				<div className='title'>Аккаунт кикнут</div>
				<div className='block'>
					<div className='title'>Аккаунт:</div>
					<div className='value'>{info.name}</div>
				</div>
				<div className='block'>
					<div className='title'>Тип:</div>
					<div className='value'>{info.type}</div>
				</div>
				<div className='block'>
					<div className='title'>Администратор:</div>
					<div className='value'>{info.admin}</div>
				</div>
				<div className='block'>
					<div className='title'>Причина:</div>
					<div className='value'>{info.reason}</div>
				</div>
			</div>
		</CSSTransition>
	)
}

export default KickInfo
