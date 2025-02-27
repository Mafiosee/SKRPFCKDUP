import React, { useEffect, useRef, useState } from 'react'
import './styles.sass'
import { useDispatch } from 'react-redux'
import { craftStatusActions } from './reducer'
import { useAppSelector } from '../../hooks/redux'
import { StartCraft } from './components/StartCraft'
import { FinishCraft } from './components/FinishCraft'
import { callClient } from '../../utils/api'
import { CSSTransition } from 'react-transition-group'
import { HoverInfo, hoverInfoDefault } from '../Inventory/types'
import Hover from '../Inventory/components/Hover'
import { CraftStatusEvents } from '../../shared/CraftStatus/events'
import { KeyCodes } from '../../utils/keyCodes'
import { useEscClose } from '../../hooks/useEscClose'

const CraftStatus: React.FC = () => {
	const dispatch = useDispatch()
	const { isOpen, startCraft, finishCraft } = useAppSelector(
		state => state.craftStatus,
	)
	const nodeRef = useRef(null)
	const [hoverInfo, setHoverInfo] = useState<HoverInfo>({ ...hoverInfoDefault })

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			switch (event.keyCode) {
				case KeyCodes.Esc: {
					callClient(CraftStatusEvents.Cancel)
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

	useEffect(() => {
		const mouseUpHandler = () => {
			setHoverInfo({ ...hoverInfoDefault })
		}

		document.addEventListener('mouseup', mouseUpHandler)

		return () => {
			document.removeEventListener('mouseup', mouseUpHandler)
		}
	}, [])

	const hover = {
		info: hoverInfo,
		set: (info: HoverInfo) => setHoverInfo(info),
	}

	// useEffect(() => {
	// 	setTimeout(() => dispatch(craftStatusActions.show()), 150)
	// }, [dispatch])

	const onClickClose = () => {
		callClient(CraftStatusEvents.Cancel)
	}

	return (
		<CSSTransition
			in={isOpen}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='CraftStatus'
			nodeRef={nodeRef}
		>
			<div className='CraftStatus' ref={nodeRef}>
				<Hover
					info={hoverInfo}
					items={startCraft?.items ?? []}
				/>
				<div className='window'>
					<div className='bg'>
						<svg
							className={'bg-svg'}
							width='100%'
							height='100%'
							viewBox='0 0 466 486'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							preserveAspectRatio={'none'}
						>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M0 16C8.83656 16 16 8.83656 16 0H466V470C457.163 470 450 477.163 450 486H16C16 477.163 8.83656 470 0 470V16Z'
								fill='#111111'
							/>
							<mask id='path-2-inside-1_2200_123959' fill='white'>
								<path
									fillRule='evenodd'
									clipRule='evenodd'
									d='M8 24C16.8366 24 24 16.8366 24 8H458V462C449.163 462 442 469.163 442 478H24C24 469.163 16.8366 462 8 462V24Z'
								/>
							</mask>
							<path
								d='M24 8V7H23V8H24ZM8 24V23H7V24H8ZM458 8H459V7H458V8ZM458 462V463H459V462H458ZM442 478V479H443V478H442ZM24 478H23V479H24V478ZM8 462H7V463H8V462ZM23 8C23 16.2843 16.2843 23 8 23V25C17.3888 25 25 17.3888 25 8H23ZM24 9H458V7H24V9ZM457 8V462H459V8H457ZM458 461C448.611 461 441 468.611 441 478H443C443 469.716 449.716 463 458 463V461ZM442 477H24V479H442V477ZM25 478C25 468.611 17.3888 461 8 461V463C16.2843 463 23 469.716 23 478H25ZM9 462V24H7V462H9Z'
								fill='#2D2D2D'
								mask='url(#path-2-inside-1_2200_123959)'
							/>
						</svg>
					</div>

					{startCraft != null && (
						<StartCraft close={onClickClose} info={startCraft} hover={hover} />
					)}

					{finishCraft != null && (
						<FinishCraft info={finishCraft} />
					)}

					<div className='block-info'>
						<div className='name'>Создание предмета</div>
						<div className='exit' onClick={onClickClose} />
					</div>
				</div>
			</div>
		</CSSTransition>
	)
}

export default CraftStatus
