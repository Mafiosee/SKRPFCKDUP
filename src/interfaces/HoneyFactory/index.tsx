import React, { useEffect, useRef } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CSSTransition } from 'react-transition-group'
import { honeyFactoryActions } from './reducer'
import GameCollecting from './components/GameCollecting'
import FinishScreen from './components/FinishScreen'
import GameBarrels from './components/GameBarrels'
import GameBottles from './components/GameBottles'
import { GameType } from '../../shared/Work/HoneyFactory'

const HoneyFactory = () => {
	const dispatch = useAppDispatch()
	const { isOpen, gameType } = useAppSelector(state => state.honeyFactory)
	const nodeRef = useRef(null)

	// useEffect(() => {
	//   setTimeout(() => dispatch(honeyFactoryActions.show(GameType.Bottles)), 150)
	// }, [])

	return (
		<CSSTransition
			in={isOpen}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='HoneyFactory'
			nodeRef={nodeRef}
		>
			<div className='HoneyFactory' ref={nodeRef}>
				{gameType === GameType.Collecting && <GameCollecting />}
				{gameType === GameType.Barrels && <GameBarrels />}
				{gameType === GameType.Bottles && <GameBottles />}
				<FinishScreen />
			</div>
		</CSSTransition>
	)
}

export default HoneyFactory
