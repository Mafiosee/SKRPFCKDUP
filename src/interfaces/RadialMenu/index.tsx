import React, { useCallback, useEffect, useRef, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CSSTransition } from 'react-transition-group'
import { InterfacesId } from '../../utils/interfacesId'
import { radialMenuActions } from './reducer'
import { notificationsActions } from '../Notifications/reducer'
import { Icons } from './assets/icons'
import { KeyCodes } from '../../utils/keyCodes'
import { callClient } from '../../utils/api'
import { Paths } from './paths'
import {
	RadialMenuEvents,
	RadialMenuSelectPayload,
} from '../../shared/RadialMenu/events'
import { useEscClose } from '../../hooks/useEscClose'
import useSound from 'use-sound'

type MouseInfo = {
	lastPosition: { x: number; y: number }
	angle: number
}

type Point = { x: number; y: number }

const PieceRotate: { [key: number]: number } = {
	1: 0,
	2: 180,
	3: 120,
	4: 90,
	5: 72,
	6: 60,
	7: 51,
	8: 45,
	9: 40,
}

const RadialMenu = () => {
	const dispatch = useAppDispatch()
	const { isOpen, pieces, category } = useAppSelector(state => state.radialMenu)
	const { sfxBase } = useAppSelector(state => state.volume)
	const nodeRef = useRef(null)
	const [mouseInfo, setMouseInfo] = useState<MouseInfo>({
		lastPosition: { x: 0, y: 0 },
		angle: 0,
	})
	const [isDebounced, setIsDebounced] = useState(false)
	const [activePiece, setActivePiece] = useState<number | null>(null)
	const [playOpenSfx] = useSound(require('../../assets/sounds/open-close_interface_0.mp3'), { volume: sfxBase })
	const [playButtonHoverSfx] = useSound(require('../../assets/sounds/button_hover_0.mp3'), { volume: sfxBase })
	const [playButtonClickSfx] = useSound(require('../../assets/sounds/button_click_2.mp3'), { volume: sfxBase })

	useEscClose({ isOpenInterface: isOpen, closeEvent: RadialMenuEvents.Close })

	// useEffect(() => {
	// 	setTimeout(
	// 		() => {
	// 			dispatch(
	// 				radialMenuActions.show({
	// 					pieces: [
	// 						{
	// 							id: 1,
	// 							icon: 'category_faction',
	// 							name: 'Эмоционально жестикулировать стоя',
	// 						},
	// 						{
	// 							id: 2,
	// 							icon: 'category_faction',
	// 							name: 'Эмоционально жестикулировать стоя',
	// 						},
	// 						{
	// 							id: 3,
	// 							icon: 'category_faction',
	// 							name: 'Эмоционально жестикулировать стоя',
	// 						},
	// 						{
	// 							id: 4,
	// 							icon: 'category_faction',
	// 							name: 'Эмоционально жестикулировать стоя',
	// 							helper: 'С другим игроком',
	// 						},
	// 						// { id: 5, icon: 'test', name: 'Эмоционально жестикулировать стоя' },
	// 						// { id: 6, icon: 'test', name: 'Эмоционально жестикулировать стоя' },
	// 						// { id: 7, icon: 'test', name: 'Эмоционально жестикулировать стоя' },
	// 						// { id: 8, icon: 'test', name: 'Эмоционально жестикулировать стоя' },
	// 						// { id: 9, icon: 'test', name: 'Эмоционально жестикулировать стоя' },
	// 					],
	// 					category: null,
	// 				}),
	// 			)
	//
	// 			// setTimeout(
	// 			// 	() =>
	// 			// 		dispatch(
	// 			// 			radialMenuActions.hide(),
	// 			// 		),
	// 			// 	5000,
	// 			// )
	// 		},
	// 		500,
	// 	)
	// }, [dispatch])

	useEffect(() => {
		playOpenSfx()
		if (!isOpen) {
			dispatch(
				notificationsActions.removeFromInterface(InterfacesId.RadialMenu),
			)
		}
	}, [isOpen])

	useEffect(() => {
		playButtonHoverSfx()
	}, [activePiece])

	const handleMouseMove = useCallback(
		(event: MouseEvent) => {
			if (!isOpen || isDebounced) {
				return
			}
			setIsDebounced(true)
			setTimeout(() => setIsDebounced(false), 15)

			const currentX = event.clientX
			const currentY = event.clientY

			const A: Point = { x: currentX, y: window.screen.height - currentY }
			const B: Point = {
				x: window.screen.width / 2,
				y: window.screen.height / 2,
			}
			let C: Point
			let quarter: number

			// Верхний правый угол
			if (A.x >= B.x && A.y >= B.y) {
				C = { x: window.screen.width, y: window.screen.height / 2 }
				quarter = 0
				// Правый нижний угол
			} else if (A.x >= B.x && A.y <= B.y) {
				C = { x: window.screen.width / 2, y: 0 }
				quarter = 1
				// Нижный левый угол
			} else if (A.x < B.x && A.y <= B.y) {
				C = { x: 0, y: window.screen.height / 2 }
				quarter = 2
				// Верхний левый угол
			} else if (A.x <= B.x && A.y >= B.y) {
				C = { x: window.screen.width / 2, y: window.screen.height }
				quarter = 3
			} else {
				return
			}

			const AB = Math.sqrt(Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2))
			const BC = Math.sqrt(Math.pow(B.x - C.x, 2) + Math.pow(B.y - C.y, 2))
			const AC = Math.sqrt(Math.pow(C.x - A.x, 2) + Math.pow(C.y - A.y, 2))
			const angle =
				90 -
				(Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB)) * 180) /
				Math.PI +
				quarter * 90

			const diff = angle - mouseInfo.angle

			setMouseInfo(prev => ({
				lastPosition: { x: currentX, y: currentY },
				angle: angle,
			}))
		},
		[isOpen, isDebounced, mouseInfo],
	)

	const onContextMenu = useCallback(
		(event: MouseEvent) => {
			event.preventDefault()
			if (!category) {
				return
			}
			callClient(RadialMenuEvents.Back)
		},
		[category],
	)

	const onClickHandler = useCallback(() => {
		if (activePiece == null) {
			return
		}
		playButtonClickSfx()
		const payload: RadialMenuSelectPayload = {
			pieceId: pieces[activePiece]?.id,
		}
		callClient(RadialMenuEvents.Select, payload)
	}, [activePiece, pieces])

	useEffect(() => {
		document.removeEventListener('mousemove', handleMouseMove)
		document.removeEventListener('contextmenu', onContextMenu)
		document.removeEventListener('click', onClickHandler)
		if (isOpen) {
			document.addEventListener('mousemove', handleMouseMove)
			document.addEventListener('contextmenu', onContextMenu)
			document.addEventListener('click', onClickHandler)
		}
		return () => {
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('contextmenu', onContextMenu)
			document.removeEventListener('click', onClickHandler)
		}
	}, [handleMouseMove, isOpen, onClickHandler, onContextMenu])

	useEffect(() => {
		if (activePiece !== null && activePiece >= pieces.length) {
			setActivePiece(null)
		}
	}, [activePiece, pieces])

	useEffect(() => {
		if (!pieces.length) {
			return
		}
		let newActivePiece: number | null = 0
		if (pieces.length === 1) {
			newActivePiece = 0
		} else {
			const length = pieces.length
			for (let i = 0; i < pieces.length; i++) {
				let startAngle =
					i * PieceRotate[length] -
					PieceRotate[length] / 2 +
					PieceRotate[length] / 2
				let endAngle =
					i * PieceRotate[length] +
					PieceRotate[length] / 2 +
					PieceRotate[length] / 2
				if (startAngle < 0) {
					startAngle = 360 + startAngle
				}
				if (endAngle < 0) {
					endAngle = 360 + endAngle
				}
				const angle = (mouseInfo.angle + PieceRotate[length] / 2) % 360
				if (angle > startAngle && angle < endAngle) {
					newActivePiece = i
					break
				}
			}
		}
		if (newActivePiece >= pieces.length) {
			return
		}
		setActivePiece(newActivePiece)
	}, [mouseInfo.angle, pieces])

	const renderPieces = () =>
		pieces.map(({ id, icon }, idx) => {
			const paths = Paths[pieces.length]
			const rotate = PieceRotate[pieces.length]
			const isActive = activePiece === idx
			return (
				<div
					key={id}
					className={`piece`}
					style={{ transform: `rotate(${idx * rotate}deg)` }}
				>
					<svg
						width='100%'
						height='100%'
						viewBox='0 0 500 500'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d={paths.fill}
							fill='url(#paint0_radial_929_50432)'
							style={{ transition: 'all .5s ease', opacity: isActive ? 1 : 0 }}
						/>
						{paths.border && (
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d={paths.border}
								fill='#fff'
								fillOpacity='.08'
							/>
						)}
						<defs>
							<radialGradient
								id='paint0_radial_929_50432'
								cx='0'
								cy='0'
								r='1'
								gradientUnits='userSpaceOnUse'
								gradientTransform='translate(250 250) rotate(90) scale(246)'
							>
								<stop stopColor='#292929' />
								<stop offset='1' stopColor='#fff' />
							</radialGradient>
						</defs>
					</svg>
					<div
						className={`icon ${isActive && '-active'}`}
						style={{
							backgroundImage: `url(${Icons[`${icon}.svg`]})`,
							transform: `translateX(-50%) rotate(-${idx * rotate}deg)`,
						}}
					/>
				</div>
			)
		})

	return (
		<CSSTransition
			in={isOpen}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='RadialMenu'
			nodeRef={nodeRef}
		>
			<div className='RadialMenu' ref={nodeRef}>
				<div className='shadow' />
				<div className='content'>
					{renderPieces()}
					<div
						className='center'
						style={{
							transform: `translate(-50%, -50%) rotate(${mouseInfo.angle}deg)`,
						}}
					/>
					{activePiece != null && pieces.length > activePiece && (
						<div className='info'>
							<div className='helper'>
								{category}
								{category && ' / '}
								{pieces[activePiece]?.helper}
							</div>
							<div className='name'>{pieces[activePiece].name}</div>
							{category && (
								<>
									<div className='line' />
									<div className='back'>
										<div className='text'>Вернуться назад:</div>
										<div className='icon' />
									</div>
								</>
							)}
						</div>
					)}
				</div>
			</div>
		</CSSTransition>
	)
}

export default RadialMenu
