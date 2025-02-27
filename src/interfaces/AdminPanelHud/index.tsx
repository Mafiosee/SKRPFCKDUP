import React, { useEffect, useRef, useState } from 'react'
import './styles.sass'
import { CSSTransition } from 'react-transition-group'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { adminPanelHudActions } from './reducer'
import {
	AdminPanelHudActiveModes,
	ButtonType,
} from '../../shared/AdminPanelHud/type'
import { ConfirmWindow } from './components/ConfirmWindow'
import { MovingElements } from './components/MovingElements'
import { AdminPanelHudEvents, AdminPanelHudPayloads } from '../../shared/AdminPanelHud/events'
import { callClient } from '../../utils/api'

const AdminPanelHud: React.FC = () => {
	const dispatch = useAppDispatch()
	const { isOpen, notifications, buttons, playerInfo, activeMode } =
		useAppSelector((state) => state.adminPanelHud)

	// useEffect(() => {
	// 	setTimeout(() => dispatch(adminPanelHudActions.show()), 150)
	// }, [dispatch])

	//Spectre Mode
	const [showConfirmWindow, setShowConfirmWindow] = useState(false)
	const [currentButton, setCurrentButton] = useState<ButtonType | null>(null)

	const nodeRef = useRef(null)

	const onClickButton = (button: ButtonType) => {
		if (button?.skipConfirm) {
			const payload: AdminPanelHudPayloads[AdminPanelHudEvents.ConfirmAction] = {
				playerUID: playerInfo.playerUID,
				buttonId: button.id,
			}
			callClient(AdminPanelHudEvents.ConfirmAction, payload)
			return
		}
		setShowConfirmWindow(true)
		setCurrentButton(button)
	}

	const onClickCloseConfirmWindow = () => {
		setShowConfirmWindow(false)
		setCurrentButton(null)
	}

	return (
		<CSSTransition
			in={isOpen}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='AdminPanelHud'
			nodeRef={nodeRef}
		>
			<div className={'AdminPanelHud'} ref={nodeRef}>
				<div className='spectre-mode'>
					{activeMode === AdminPanelHudActiveModes.Spectre && (
						<div className='bg' />
					)}
					<div className='content'>
						<div className='notify-container'>
							{notifications.map((notify, idx) => (
								<div key={idx} className={'notify'}>
									<div className='name'>{notify.name}:</div>
									<div className='amount'>
										<div>{notify.value}</div>
									</div>
								</div>
							))}
						</div>
						{activeMode === AdminPanelHudActiveModes.Spectre && (
							<>
								<div className='buttons-container'>
									{buttons.map((btn, idx) => (
										<div
											key={idx}
											className={'button-block'}
											onClick={() => onClickButton(btn)}
										>
											{btn.name}
										</div>
									))}
								</div>
								<div className='player-info'>
									<div className='icon' />
									<div className='text'>
										<span>Вы наблюдаете за: </span>
										<span>{playerInfo.playerName}</span>
										<span>[ID:{playerInfo.playerID}]</span>
										<span>[UID:{playerInfo.playerUID}]</span>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
				<MovingElements />

				{activeMode === AdminPanelHudActiveModes.Spectre && (
					<div className={`confirm-window ${showConfirmWindow && '-show'}`}>
						<div className='bg' />
						<div className='watermark' />
						<div className='blur' />
						{showConfirmWindow && (
							<ConfirmWindow
								button={currentButton}
								player={playerInfo}
								close={onClickCloseConfirmWindow}
							/>
						)}
					</div>
				)}
			</div>
		</CSSTransition>
	)
}

export default AdminPanelHud
