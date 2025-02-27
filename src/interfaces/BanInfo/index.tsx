import React, { useEffect, useRef } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CSSTransition } from 'react-transition-group'
import { banInfoActions } from './reducer'

const BanInfo: React.FC = () => {
	const dispatch = useAppDispatch()
	const { isOpen, info } = useAppSelector(
		state => state.banInfo,
	)
	const nodeRef = useRef(null)

	// useEffect(() => {
	// 	setTimeout(() => dispatch(banInfoActions.show()), 150)
	// }, [])

	return (
		<CSSTransition
			in={isOpen}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='BanInfo'
			nodeRef={nodeRef}
		>
			<div className='BanInfo' ref={nodeRef}>
				<div className='window'>
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
					<div className='block'>
						<div className='title'>Дата блокировки:</div>
						<div className='value'>{info.banDatetime}</div>
					</div>
					<div className='block'>
						<div className='title'>Дата разблокировки:</div>
						<div className='value'>{info.unbanDatetime}</div>
					</div>
				</div>
			</div>
		</CSSTransition>
	)
}

export default BanInfo
