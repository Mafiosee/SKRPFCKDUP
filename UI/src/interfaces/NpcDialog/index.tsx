import React, { useEffect, useRef, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CSSTransition } from 'react-transition-group'
import { numberWithSeparator } from '../../utils/numberWithSeparator'
import { callClient } from '../../utils/api'
// import { ButtonTypes } from '../../shared/modalDialog'
import { Button } from './types'
import { importAllImagesFromFolder } from '../../utils/images'
import {
	ClickButtonPayload,
	NpcDialogEvents,
} from '../../shared/npcDialog/events'
import { calcVh } from '../../utils/calcVh'
import { npcDialogActions } from './reducer'
// import {ButtonTypes} from "../../shared/NpcShop/type";
import { ButtonColor } from '../../shared/Modal/Component/Buttons'
import { KeyCodes } from '../../utils/keyCodes'
import { useEscClose } from '../../hooks/useEscClose'

enum ButtonCategories {
	common,
	main,
}

const MAX_AVAILABLE_DISTANCE_FOR_OPEN = 25

export const ColorClassName = {
	[ButtonColor.White]: '-white',
	[ButtonColor.Transparent]: '-default',
	[ButtonColor.Red]: '-red',
}

const IconImages = importAllImagesFromFolder(
	require.context('./assets/images/icons', false, /.svg$/),
)

const NpcDialog = () => {
	const dispatch = useAppDispatch()
	const { isOpen, name, text, buttons, mainButtons } = useAppSelector(
		(state) => state.npcDialog,
	)
	const nodeRef = useRef(null)
	useEscClose({ isOpenInterface: isOpen, closeEvent: mainButtons.find(button => button.icon === 'exit')?.event ?? '' })

	// scroll
	const commonBtnsRef = useRef<HTMLDivElement>(null)
	const [isDragging, setIsDragging] = useState<boolean>(false)
	const [startY, setStartY] = useState<number>(0)
	const [scrollTop, setScrollTop] = useState<number>(0)
	const scrollSpeed = 1.3

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsDragging(true)
		setStartY(e.clientY)
		setScrollTop(commonBtnsRef.current?.scrollTop || 0)
	}

	const handleMouseUp = () => {
		setIsDragging(false)
	}

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!isDragging || !commonBtnsRef.current) {
			return
		}

		const deltaY = (e.clientY - startY) * scrollSpeed
		commonBtnsRef.current.scrollTop = scrollTop - deltaY
	}

	const getScrollBlockMaxHeight = () => {
		if (mainButtons.length === 0) {
			return
		}
		const amountUpperMainButtons = mainButtons.length - 1

		const defaulMaxHeightPx = 585
		const defaultBtnHeightPx = 51
		const defaultMarginPx = 32

		const scrollBlockMaxHeightPx =
			defaulMaxHeightPx -
			(defaultBtnHeightPx + defaultMarginPx) * amountUpperMainButtons +
			defaultMarginPx / 2

		return calcVh(scrollBlockMaxHeightPx)
	}

	const onClickBtn = (btnType: ButtonCategories, event: string) => {
		if (btnType === ButtonCategories.common) {
			if (
				commonBtnsRef.current.scrollTop >
				scrollTop + MAX_AVAILABLE_DISTANCE_FOR_OPEN ||
				commonBtnsRef.current.scrollTop <
				scrollTop - MAX_AVAILABLE_DISTANCE_FOR_OPEN
			) {
				return
			}
		}
		const payload: ClickButtonPayload = { event }
		return callClient(NpcDialogEvents.ClickButton, payload)
	}

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		dispatch(npcDialogActions.show())
	// 	}, 150)
	// }, [dispatch])

	const getButtons = (btnType: ButtonCategories, btns: Button[]) => {
		return btns.map((btn, idx) => {
			const { amount, event, disabled, color, price, icon } = btn
			const Icon = icon !== null ? IconImages[`${icon}.svg`] : ''
			return (
				<div
					className={`btn ${(disabled || amount === 0) && '-disabled'} ${ColorClassName[color]}`}
					key={idx}
					onClick={() => {
						if (!disabled) {
							onClickBtn(btnType, event)
						}
					}}
				>
					<div className='content'>
						<div className='text'>
							<div className='name'>{btn.text}</div>
							{amount !== null && <div className='amount'>({amount} шт)</div>}
						</div>
						<div className='price-icons'>
							{price !== null && (
								<div className={'price-block'}>
									<div className='coin' />
									<div className='price'>{numberWithSeparator(price, ' ')}</div>
								</div>
							)}
							<div
								className='icon'
								style={{ backgroundImage: `url(${Icon}` }}
							/>
						</div>
					</div>
				</div>
			)
		})
	}

	return (
		<CSSTransition
			in={isOpen}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='NpcDialog'
			nodeRef={nodeRef}
		>
			<div className='NpcDialog' ref={nodeRef}>
				<div className='shadow' />
				<div className='bg' />

				<div className='window'>
					<div className='name'>{name}</div>
					<div className='text'>{text}</div>
					<div className='buttons'>
						<div className='main-buttons'>
							{mainButtons.length > 0 &&
								getButtons(ButtonCategories.main, mainButtons.slice(0, -1))}
						</div>
						<div className='separator' />
						{buttons.length > 0 && (
							<>
								<div
									ref={commonBtnsRef}
									onMouseDown={handleMouseDown}
									onMouseUp={handleMouseUp}
									onMouseMove={handleMouseMove}
									className='common-buttons'
									style={{ maxHeight: getScrollBlockMaxHeight() }}
								>
									{buttons.length > 0 &&
										getButtons(ButtonCategories.common, buttons)}
								</div>
								<div className='separator' />
							</>
						)}
						<div className='main-buttons'>
							{mainButtons.length > 0 &&
								getButtons(ButtonCategories.main, [
									mainButtons[mainButtons.length - 1],
								])}
						</div>
					</div>
				</div>
			</div>
		</CSSTransition>
	)
}

export default NpcDialog
