import './styles.sass'
import React, { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

type Props = { isShow: boolean }

const Logo: React.FC<Props> = ({ isShow }) => {
	const nodeRef = useRef(null)

	return (
		<CSSTransition
			in={isShow}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='_Logo'
			nodeRef={nodeRef}
		>
			<div className='_Logo' ref={nodeRef} />
		</CSSTransition>
	)
}

export default Logo
