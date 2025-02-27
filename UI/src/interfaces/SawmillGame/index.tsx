import './styles.sass'
import React, { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CSSTransition } from 'react-transition-group'
import { sawmillGameActions } from './reducer'
import Felling from './components/Felling'
import Cutting from './components/Cutting'
import Loading from './components/Loading'
import { GameType } from '../../shared/Work/Sawmill'
import { KeyCodes } from '../../utils/keyCodes'
import { callClient } from '../../utils/api'
import { SawmillGameEvents } from './api'

const SawmillGame: React.FC = () => {
	const dispatch = useAppDispatch()
	const { isOpen, gameType } = useAppSelector(state => state.sawmillGame)
	const nodeRef = useRef(null)

	// useEffect(() => {
	// 	setTimeout(() => dispatch(sawmillGameActions.show(GameType.Cutting)), 150)
	// }, [dispatch])

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			switch (event.keyCode) {
				case KeyCodes.Esc: {
					callClient(SawmillGameEvents.Loose)
					break
				}
			}
		}
		if (isOpen) {
			document.addEventListener('keydown', handleKeyDown)
		}
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [isOpen])

	return (
		<CSSTransition
			in={isOpen}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='SawmillGame'
			nodeRef={nodeRef}
		>
			<div className='SawmillGame' ref={nodeRef}>
				{gameType === GameType.Felling && <Felling />}
				{gameType === GameType.Cutting && <Cutting />}
				{gameType === GameType.Loading && <Loading />}
			</div>
		</CSSTransition>
	)
}

export default SawmillGame
