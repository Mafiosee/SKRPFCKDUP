import React, { useEffect, useRef } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CSSTransition } from 'react-transition-group'
import { fishingGameActions } from './reducer'
import { FishingGameCondition } from './types'
import Waiting from './components/Waiting'
import Hooking from './components/Hooking'
import Fishing from './components/Fishing'
import { KeyCodes } from '../../utils/keyCodes'
import { callClient } from '../../utils/api'
import { ModalClickButtonPayload, ModalEvents } from '../../shared/Modal/events'
import { ComponentType } from '../../shared/Modal/Component/type'
import { FishingGameEvents } from '../../shared/Work/events'
import { useEscClose } from '../../hooks/useEscClose'

const FishingGame = () => {
	const dispatch = useAppDispatch()
	const { isOpen, condition } = useAppSelector(state => state.fishingGame)
	const nodeRef = useRef(null)

	useEscClose({ isOpenInterface: isOpen, closeEvent: FishingGameEvents.Fail })

	// useEffect(() => {
	// 	setTimeout(() => dispatch(fishingGameActions.show()), 150)
	// }, [])

	return (
		<CSSTransition
			in={isOpen}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='FishingGame'
			nodeRef={nodeRef}
		>
			<div className='FishingGame' ref={nodeRef}>
				{condition === FishingGameCondition.Waiting && <Waiting />}
				{condition === FishingGameCondition.Hooking && <Hooking />}
				{condition === FishingGameCondition.Fishing && <Fishing />}
			</div>
		</CSSTransition>
	)
}

export default FishingGame
