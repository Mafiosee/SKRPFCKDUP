import React, { useEffect, useRef, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CSSTransition } from 'react-transition-group'
import { contractActions } from './reducer'
import { callClient } from '../../utils/api'
import { ContractEvents } from './api'
import { MouseButton } from '../../types/mouseButton'
import { KeyCodes } from '../../utils/keyCodes'
import { useEscClose } from '../../hooks/useEscClose'

const Contract = () => {
	const dispatch = useAppDispatch()
	const { isOpen, title, header, description } = useAppSelector(state => state.contract)
	const nodeRef = useRef(null)
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const [isMouseActive, setIsMouseActive] = useState(false)
	const [mousePosition, setMousePosition] = useState({ x: -1, y: -1 })

	useEscClose({ isOpenInterface: isOpen, closeEvent: ContractEvents.Close })

	// useEffect(() => {
	// 	setTimeout(() => dispatch(contractActions.show()), 150)
	// }, [])

	useEffect(() => {
		const mouseDownHandler = (event: MouseEvent) => {
			if (event.button === MouseButton.Left) {
				setIsMouseActive(true)
			}
		}
		const mouseUpHandler = (event: MouseEvent) => {
			setIsMouseActive(false)
			callClient(ContractEvents.Accept)
		}

		document.removeEventListener('mousedown', mouseDownHandler)
		document.removeEventListener('mouseup', mouseUpHandler)
		if (isOpen) {
			document.addEventListener('mousedown', mouseDownHandler)
			document.addEventListener('mouseup', mouseUpHandler)
		}
		return () => {
			document.removeEventListener('mousedown', mouseDownHandler)
			document.removeEventListener('mouseup', mouseUpHandler)
		}
	}, [isOpen])

	return (
		<CSSTransition
			in={isOpen}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='Contract'
			nodeRef={nodeRef}
		>
			<div className='Contract' ref={nodeRef}>
				<div className='paper'>
					<div className='close' onClick={() => callClient(ContractEvents.Close)}
							 onMouseUp={(event) => event.stopPropagation()} />
					<div className='title'>{title}</div>
					<div className='header'>{header}</div>
					<div className='description'>{description}</div>
					<div className='sign'>
						<div className='block'>
							<canvas
								ref={canvasRef}
								width={(177 / 1080) * window.screen.height}
								height={(116 / 1080) * window.screen.height}
								onMouseMove={(
									event: React.MouseEvent<HTMLCanvasElement> & { target: HTMLCanvasElement },
								) => {
									if (!canvasRef.current || !isMouseActive) {
										return
									}
									const rect = event.target.getBoundingClientRect()
									const coords = {
										x: event.clientX - rect.left,
										y: event.clientY - rect.top,
									}

									const ctx = canvasRef.current.getContext('2d')
									if (ctx === null) {
										return
									}
									ctx.beginPath()
									ctx.lineWidth = 2
									ctx.lineCap = 'round'
									ctx.strokeStyle = '#000'
									ctx.moveTo(
										mousePosition.x < 0 ? coords.x : mousePosition.x,
										mousePosition.y < 0 ? coords.y : mousePosition.y,
									)
									ctx.lineTo(coords.x, coords.y)
									ctx.stroke()
									setMousePosition(coords)
								}}
							/>
						</div>
						<div className='helper'>Подпись</div>
					</div>
				</div>
			</div>
		</CSSTransition>
	)
}

export default Contract
