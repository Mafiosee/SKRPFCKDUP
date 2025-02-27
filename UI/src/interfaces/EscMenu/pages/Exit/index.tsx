import './styles.sass'
import React, { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { useAppSelector } from '../../../../hooks/redux'
import { callClient } from '../../../../utils/api'
import { EscMenuEvents } from '../../api'

type Props = {
	isShow: boolean
	cancel: () => void
}

const Exit: React.FC<Props> = ({ isShow, cancel }) => {
	const nodeRef = useRef()
	const { exit } = useAppSelector(state => state.escMenu)

	return (
		<CSSTransition
			in={isShow}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='_PageExit'
			nodeRef={nodeRef}
		>
			<div className='_PageExit' ref={nodeRef}>
				<div className='frame'>
					<div className='top' />
					<div className='right' />
					<div className='bottom' />
					<div className='left' />
				</div>
				<div className='content'>
					<div className='title'>Выход из игры</div>
					<div className='text'>
						<div className='line'>Вы действительно хотите выйти из игры?</div>
						{exit.helper !== null && <div className='line'>{exit.helper}</div>}
					</div>
					<div className='buttons'>
						<div className='button exit' onClick={() => callClient(EscMenuEvents.RequestExit)}>
							Выйти
						</div>
						<div className='button cancel' onClick={cancel}>
							Отмена
						</div>
					</div>
				</div>
			</div>
		</CSSTransition>
	)
}

export default Exit
