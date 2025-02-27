import './styles.sass'
import React, { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

type Props = { isShow: boolean }

const Title: React.FC<Props> = ({ isShow }) => {
	const nodeRef = useRef(null)

	return (
		<CSSTransition
			in={isShow}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='_Title'
			nodeRef={nodeRef}
		>
			<div className='_Title' ref={nodeRef}>Выберите персонажа</div>
		</CSSTransition>
	)
}

export default Title
