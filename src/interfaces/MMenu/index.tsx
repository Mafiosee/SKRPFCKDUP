import React, { useEffect, useRef, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CSSTransition } from 'react-transition-group'
import { mMenuActions } from './reducer'
import { MMenuEvents, MMenuPayloads } from '../../shared/MMenu/events'
import { callClient } from '../../utils/api'
import { importAllImagesFromFolder } from '../../utils/images'
import { KeyCodes } from '../../utils/keyCodes'

const ButtonIcons = importAllImagesFromFolder(
	require.context('./assets/images/icons/', false, /.svg$/),
)

const MMenu = () => {
	const dispatch = useAppDispatch()
	const { isOpen, buttons } = useAppSelector(
		(state) => state.mMenu,
	)
	const nodeRef = useRef(null)

	// useEffect(() => {
	// 	setTimeout(() => dispatch(mMenuActions.show()), 150)
	// }, [dispatch])

	const renderButtons = () => buttons.map(({ id, icon, name }) => {
		const onClick = () => {
			const payload: MMenuPayloads[MMenuEvents.ClickButton] = {
				buttonId: id,
			}
			callClient(MMenuEvents.ClickButton, payload)
		}

		return (
			<div className='button' onClick={onClick} key={id}>
				<div className='shadow' />
				<div className='bg' />
				<div className='icon' style={{ backgroundImage: `url(${ButtonIcons[`${icon}.svg`]})` }} />
				<div className='name'>{name}</div>
			</div>
		)
	})

	return (
		<CSSTransition
			in={isOpen}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='MMenu'
			nodeRef={nodeRef}
		>
			<div className='MMenu' ref={nodeRef}>
				<div className='close'>
					<div className='title'>Закрыть</div>
					<div className='key'>M</div>
				</div>
				<div className='buttons'>
					{renderButtons()}
				</div>
			</div>
		</CSSTransition>
	)
}

export default MMenu
