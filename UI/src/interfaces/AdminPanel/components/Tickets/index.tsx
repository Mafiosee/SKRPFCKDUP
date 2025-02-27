import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './styles.sass'
import { ButtonTypes, SenderStatus, TicketMessage, TicketType } from '../../../../shared/AdminPanel/type'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { callClient } from '../../../../utils/api'
import {
	AdminPanelEvents,
	AdminPanelPayloads,
} from '../../../../shared/AdminPanel/events'
import { ReportReason } from '../../../../shared/Tickets/type'
import { KeyCodes } from '../../../../utils/keyCodes'

enum ArrowDirection {
	Left,
	Right,
}

type TicketButtonType = {
	id: ButtonTypes
	text: string
	icon: string
	name: string
}

const TicketButtons: TicketButtonType[] = [
	{
		id: ButtonTypes.TeleportToPlayer,
		name: 'tp',
		text: 'Телепортироваться к игроку',
		icon: require('../../assets/images/tickets/icon-tp-to-player.svg'),
	},
	{
		id: ButtonTypes.TeleportPlayer,
		name: 'tpc',
		text: 'Телепортировать к себе',
		icon: require('../../assets/images/tickets/icon-tp-to-me.svg'),
	},
	{
		id: ButtonTypes.Spectre,
		name: 'idk',
		text: 'Режим наблюденя',
		icon: require('../../assets/images/tickets/icon-eye-visible.svg'),
	},
	{
		id: ButtonTypes.TicketHistory,
		name: 'idk',
		text: 'История тикета',
		icon: require('../../assets/images/tickets/icon-time-back.svg'),
	},
	{
		id: ButtonTypes.Leave,
		name: 'leave',
		text: 'Покинуть тикет',
		icon: require('../../assets/images/tickets/icon-leave.svg'),
	},
	{
		id: ButtonTypes.Close,
		name: 'close',
		text: 'Закрыть тикет',
		icon: require('../../assets/images/tickets/icon-close.svg'),
	},
]

const SenderInfoByStatus = {
	[SenderStatus.Player]: {
		name: 'Игрок',
		icon: require('../../assets/images/tickets/icon-user-small.svg'),
	},
	[SenderStatus.Admin]: {
		name: 'Администратор',
		icon: require('../../assets/images/tickets/icon-admin-small.svg'),
	},
}

const MaxLengthFastAnswerName = 30
const MaxLengthFastAnswerValue = 250

enum StatusFilter {
	Private = 'Private',
	Free = 'Free',
	Closed = 'Closed',
}

const StatusFilterName: Record<StatusFilter, string> = {
	[StatusFilter.Private]: 'Личные',
	[StatusFilter.Free]: 'Свободные',
	[StatusFilter.Closed]: 'Закрытые',
}

const StatusFilterOrder: StatusFilter[] = [
	StatusFilter.Private,
	StatusFilter.Free,
	StatusFilter.Closed,
]

const TypeOrder: ReportReason[] = [
	ReportReason.reportPlayer,
	ReportReason.reportAdmin,
	ReportReason.help,
	ReportReason.question,
	ReportReason.bag,
]

const TypeName: Record<ReportReason, string> = {
	[ReportReason.reportPlayer]: 'Жалобы',
	[ReportReason.reportAdmin]: 'Жалобы на администрацию',
	[ReportReason.help]: 'Помощь',
	[ReportReason.question]: 'Вопросы',
	[ReportReason.bag]: 'Баги',
}

export const Tickets: React.FC = () => {
	const dispatch = useAppDispatch()
	const { tickets, ticketContent, adminInfo, fastAnswers } = useAppSelector(
		state => state.adminPanel,
	)

	const [statusFilter, setStatusFilter] = useState<StatusFilter>(StatusFilter.Private)
	const [typeFilter, setTypeFilter] = useState<ReportReason>(ReportReason.reportPlayer)
	const [toolTipId, setToolTipId] = useState<number | null>(null)
	const [showFastAnswer, setShowFastAnswer] = useState<boolean>(false)
	const [message, setMessage] = useState<string>('')
	const [showMainPopup, setShowMainPopup] = useState<boolean>(false)
	const [showAddPopup, setShowAddPopup] = useState<boolean>(false)
	const [fastAnswerName, setFastAnswerName] = useState<string>('')
	const [fastAnswerValue, setFastAnswerValue] = useState<string>('')
	const [currentFastAnswerId, setCurrentFastAnswerId] = useState<number | null>(null)
	const [showTicketInfo, setShowTicketInfo] = useState(false)
	const [openedTypeSelect, setOpenedTypeSelect] = useState(false)
	const lastMessageRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (lastMessageRef.current == null) {
			return
		}
		lastMessageRef.current.scrollIntoView({ behavior: 'smooth' })
	}, [ticketContent?.messages])

	const handleKeyDown = useCallback((event: KeyboardEvent) => {
		switch (event.keyCode) {
			case KeyCodes.Enter: {
				event.preventDefault()
				if (ticketContent == null || !message.length) {
					return
				}
				const payload: AdminPanelPayloads[AdminPanelEvents.SendTicketMessage] = { id: ticketContent.id, message }
				callClient(AdminPanelEvents.SendTicketMessage, payload)
				setMessage('')
				break
			}
		}
	}, [message, ticketContent])

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [handleKeyDown])

	const handleClickFilterArrow = (direction: ArrowDirection) => {
		let statusFilterIndex = StatusFilterOrder.indexOf(statusFilter)
		switch (direction) {
			case ArrowDirection.Left:
				statusFilterIndex -= 1
				break
			case ArrowDirection.Right:
				statusFilterIndex += 1
				break
		}
		if (statusFilterIndex < 0) {
			setStatusFilter(StatusFilterOrder.at(statusFilterIndex) ?? StatusFilter.Private)
		} else {
			setStatusFilter(StatusFilterOrder[statusFilterIndex % StatusFilterOrder.length])
		}
	}

	const ticketsByStatus = useMemo(() => {
		return tickets.filter(ticket => {
			switch (statusFilter) {
				case StatusFilter.Private:
					return ticket.isPrivate && !ticket.isClosed
				case StatusFilter.Closed:
					return ticket.isClosed
				default:
					return !ticket.isPrivate && !ticket.isClosed
			}
		})
	}, [statusFilter, tickets])

	const ticketsByStatusAndType = useMemo(() => {
		const result: Record<ReportReason, TicketType[]> = {
			[ReportReason.reportPlayer]: [],
			[ReportReason.reportAdmin]: [],
			[ReportReason.help]: [],
			[ReportReason.question]: [],
			[ReportReason.bag]: [],
		}
		ticketsByStatus.forEach(ticket => result[ticket.type].push(ticket))
		return result
	}, [ticketsByStatus])

	const onClickTicket = (ticket: TicketType) => {
		const payload: AdminPanelPayloads[AdminPanelEvents.OpenTicket] = { id: ticket.id }
		callClient(AdminPanelEvents.OpenTicket, payload)
	}

	/** Нажатие на одну из списка копок для Тикета (часть чата) */
	const onClickSecondaryButtons = (buttonId: ButtonTypes) => {
		if (ticketContent == null) {
			return
		}
		const payload: AdminPanelPayloads[AdminPanelEvents.ClickTicketSecondaryButton] = {
			buttonId,
			ticketId: ticketContent.id,
		}
		callClient(AdminPanelEvents.ClickTicketSecondaryButton, payload)

		if (buttonId === ButtonTypes.TicketHistory) {
			setShowTicketInfo(true)
		}
	}

	/** Отрисовать список кнопок для Тикета (часть чата) */
	const getTicketButtons = (buttons: TicketButtonType[]) =>
		buttons.map((btn, idx) => {
			const backgroundImage = `url(${btn.icon})`
			return (
				<div
					key={idx}
					className={'btn'}
					style={{ backgroundImage }}
					onMouseEnter={() => setToolTipId(idx)}
					onMouseLeave={() => setToolTipId(null)}
					onClick={() => onClickSecondaryButtons(btn.id)}
				>
					<div className={`tool-tip-container ${toolTipId === idx && '-show'}`}>
						<div className='triangle' />
						<div className='content'>{btn.text}</div>
					</div>
				</div>
			)
		})

	/** Взять свободный тикет (часть чата) */
	const onClickTakeFreeTicket = (ticketId: number) => {
		const payload: AdminPanelPayloads[AdminPanelEvents.TakeTicket] = { id: ticketId }
		callClient(AdminPanelEvents.TakeTicket, payload)
	}

	/** Отрисовать сообщения для чата (часть чата) */
	const getMessages = (messages: TicketMessage[]) => {
		return ([{
			date: ticketContent?.ticketInfo.date,
			senderName: ticketContent?.playerInfo.name,
			message: ticketContent?.ticketInfo.description,
			senderStatus: SenderStatus.Player,
		}, ...messages] as TicketMessage[]).map((thisMessage, idx) => {
			if (typeof thisMessage === 'string') {
				return (
					<div key={idx} className={`alert`} ref={lastMessageRef}>
						{thisMessage}
					</div>
				)
			} else {
				const backgroundImage = `url(${SenderInfoByStatus[thisMessage.senderStatus].icon})`
				return (
					<div key={idx} className={'message'} ref={lastMessageRef}>
						<div className='icon' style={{ backgroundImage }} />
						<div className='content'>
							<div className='other'>
								<span
									className={thisMessage.senderName === adminInfo.name ? '-orange' : '-default'}
								>
									{thisMessage.senderName === adminInfo.name
										? 'Вы'
										: SenderInfoByStatus[thisMessage.senderStatus].name}
									:
								</span>
								<span>{thisMessage.senderName}</span> <span>{thisMessage.date}</span>
							</div>
							<div className='text'>{thisMessage.message}</div>
						</div>
					</div>
				)
			}
		})
	}

	/** Нажатие на быстрый ответ (часть чата) */
	const onClickFastAnswer = (answerId: number) => {
		const newInputValue = message + fastAnswers[answerId].value
		setMessage(newInputValue)
	}

	/** Открыть настройки быстрых ответов (часть чата) */
	const onClickFastAnswerSettings = () => {
		setShowMainPopup(true)
	}

	/** Отправить сообщение в чат (часть чата) */
	const onClickSendMessage = () => {
		if (ticketContent == null) {
			return
		}
		const payload: AdminPanelPayloads[AdminPanelEvents.SendTicketMessage] = { id: ticketContent.id, message }
		callClient(AdminPanelEvents.SendTicketMessage, payload)
		setMessage('')
	}

	/** Закрыть popup */
	const onClickExitPopup = () => {
		setShowMainPopup(false)
		setShowAddPopup(false)
	}
	/** Закрыть дополнительный popup */
	const onClickExitAddPopup = () => {
		setShowAddPopup(false)
		setFastAnswerName('')
		setFastAnswerValue('')
	}

	/** Закрыть popup и отменить ввод */
	const onClickCancelFastAnswer = () => {
		setShowAddPopup(false)
		setFastAnswerName('')
		setFastAnswerValue('')
	}

	/** Изменение быстрого ответа */
	const onClickEditFastAnswer = (id: number) => {
		const currentFastAnswer = fastAnswers.filter(answer => answer.id === id)
		if (currentFastAnswer.length <= 0) {
			return
		}
		setCurrentFastAnswerId(id)
		setFastAnswerName(currentFastAnswer[0].name)
		setFastAnswerValue(currentFastAnswer[0].value)
		setShowAddPopup(true)
	}

	/** Удаление быстрого ответа */
	const onClickDeleteFastAnswer = (id: number) => {
		const payload: AdminPanelPayloads[AdminPanelEvents.DeleteFastAnswer] = { id }
		callClient(AdminPanelEvents.DeleteFastAnswer, payload)
	}

	/** Услоавия для кнопки сохранения (редактирование быстрых ответов) */
	const disableSaveBtn =
		fastAnswerValue.length > 0 &&
		fastAnswerName.length > 0 &&
		fastAnswerValue.length < MaxLengthFastAnswerValue &&
		fastAnswerName.length < MaxLengthFastAnswerName

	/** Сохранить быстрый ответ */
	const onClickSaveFastAnswer = () => {
		if (!disableSaveBtn) {
			return
		}

		const payload: AdminPanelPayloads[AdminPanelEvents.AddFastAnswer] = {
			name: fastAnswerName,
			value: fastAnswerValue,
			id: currentFastAnswerId === null ? null : currentFastAnswerId,
		}
		callClient(AdminPanelEvents.AddFastAnswer, payload)
		setShowAddPopup(false)
		setCurrentFastAnswerId(null)
		setFastAnswerName('')
		setFastAnswerValue('')
	}

	/** Настройка быстрых ответов на сообщения */
	const getPopupWindow = () => {
		return (
			<div className={`main-popup ${showMainPopup && '-show'}`}>
				<div className='content'>
					<div className='window'>
						<div className='bg' />
						<div className='content'>
							{fastAnswers.length <= 0 ? (
								<div className={`not-find-answers`}>
									<div className={'text'}>У вас ещё нет быстрых ответов, создайте первый</div>
									<div className={'btn'} onClick={() => setShowAddPopup(true)}>
										<div className='icon' />
										<div className='text'>Добавить ответ</div>
									</div>
								</div>
							) : (
								<div className={'find-answers'}>
									<div className={'btn'} onClick={() => setShowAddPopup(true)}>
										<div className='icon' />
										<div className='text'>Добавить ответ</div>
									</div>
									<div className='answers'>
										{fastAnswers.map((answer, idx) => (
											<div key={idx} className={'answer-container'}>
												<div className='name'>{answer.name}</div>
												<div className='btns'>
													<div className={`edit`} onClick={() => onClickEditFastAnswer(idx)} />
													<div className={`delete`}
															 onClick={() => onClickDeleteFastAnswer(idx)} />
												</div>
											</div>
										))}
									</div>
								</div>
							)}
						</div>
						<div className='block-info'>
							<div className='name'>Быстрые ответы</div>
							<div className='exit' onClick={onClickExitPopup} />
						</div>
					</div>
					<div className={`add-popup-window ${showAddPopup && '-show'}`}>
						<div className='bg' />
						<div className='content'>
							<div className='text'>Настрока ответа</div>
							<input
								type='text'
								value={fastAnswerName}
								className={'input-block'}
								placeholder={'Краткое название'}
								onChange={e => setFastAnswerName(e.target.value)}
							/>
							<textarea
								placeholder={`Ответ (не более ${MaxLengthFastAnswerValue} символов)`}
								value={fastAnswerValue}
								onChange={e => setFastAnswerValue(e.target.value)}
							/>
							<div className='btns'>
								<div
									className={`save ${!disableSaveBtn && '-disabled'}`}
									onClick={onClickSaveFastAnswer}
								>
									Сохранить
								</div>
								<div className='cancel' onClick={onClickCancelFastAnswer}>
									Отмена
								</div>
							</div>
						</div>
						<div className='block-info'>
							<div className='name'>Настройка ответа</div>
							<div className='exit' onClick={onClickExitAddPopup} />
						</div>
					</div>
				</div>
			</div>
		)
	}

	/** Закрыть TicketInfo */
	const onClickExitTicketInfo = () => {
		setShowTicketInfo(false)
	}

	/** Информация о тикете (secondary btn click) */
	const getTicketInfo = () => {
		return ticketContent != null && (
			<div className={`popup-window ${showTicketInfo && '-show'}`}>
				<div className='content'>
					<div className='window'>
						<div className='bg' />
						<div className='content'>
							<div className='blocks'>
								<div className='block'>
									<div className='name'>Тип</div>
									<div className='text'>{TypeName[ticketContent.type]}</div>
								</div>
								<div className='block'>
									<div className='name'>Дата и время</div>
									<div className='text'>{ticketContent.ticketInfo.date}</div>
								</div>
								<div className='block'>
									<div className='name'>Игрок [uid]</div>
									<div className='text'>
										{ticketContent.playerInfo.name}[$
										{ticketContent.playerInfo.uid}]
									</div>
								</div>
								{ticketContent?.suspectInfo && (
									<div className='block'>
										<div className='name'>Нарушитель [uid]</div>
										<div className='text'>
											{ticketContent.suspectInfo.name} [$
											{ticketContent.suspectInfo.uid}]
										</div>
									</div>
								)}

								<div className={`block reason`}>
									<div className='name'>Причина</div>
									<div className='text'>{ticketContent.ticketInfo.description}</div>
								</div>

								{ticketContent.ticketInfo?.proofs && (
									<div className={`block proofs`}>
										<div className='name'>Приложенные материалы</div>
										<div className='text'>
											{ticketContent.ticketInfo
												? ticketContent.ticketInfo.proofs.map((proof, idx) => (
													<div key={idx} className={'proof'}>
														{proof}
													</div>
												))
												: 'Текст'}
										</div>
									</div>
								)}
							</div>
						</div>
						<div className='block-info'>
							<div className='name'>
								{ticketContent.ticketInfo ? `РЕПОРТ №${ticketContent.id}` : 'Ошибка :('}
							</div>
							<div className='exit' onClick={onClickExitTicketInfo} />
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className={'_Tickets'}>
			<div className='tickets-list'>
				<div className='switch'>
					<div
						className='arrow'
						onClick={() => handleClickFilterArrow(ArrowDirection.Left)}
					/>
					<div className='name'>
						{StatusFilterName[statusFilter]} {`(${ticketsByStatus.length})`}
					</div>
					<div
						className='arrow'
						onClick={() => handleClickFilterArrow(ArrowDirection.Right)}
					/>
				</div>
				<div className={`select ${openedTypeSelect && '-opened'}`} onClick={() => setOpenedTypeSelect(prev => !prev)}>
					<div className='current'>{TypeName[typeFilter]} ({ticketsByStatusAndType[typeFilter].length})</div>
					<div className='list'>
						{TypeOrder.map(type => (
							<div key={type} className='item'
									 onClick={() => setTypeFilter(type)}>{TypeName[type]} ({ticketsByStatusAndType[type].length})</div>
						))}
					</div>
				</div>
				<div className='tickets-block'>
					{ticketsByStatusAndType[typeFilter]
						.map(ticket => (
							<div
								key={ticket.id}
								className={`ticket ${ticketContent?.id === ticket.id && '-active'}`}
								onClick={() => onClickTicket(ticket)}
							>
								<div className='sender'>
									{ticket.senderInfo.name} #{ticket.senderInfo.uid} {ticket.senderInfo?.id ? `[${ticket.senderInfo.id}]` : ''}
								</div>
								<div className='other-info'>
									<div className='number'>№{ticket.id}</div>
									<div className='circle' />
									<div className='date'>{ticket.datetime}</div>
								</div>
								{ticket?.amountNotification != null && ticket.amountNotification > 0 && (
									<div className='amount-messages'>{ticket.amountNotification}</div>
								)}
							</div>
						))}
				</div>
			</div>
			{ticketContent && adminInfo ? (
				<>
					<div className={`ticket-content ${ticketContent && '-show'}`}>
						<div className='header'>
							<div className='player-info'>
								<div className='icon' />
								<div className='info'>
									<div className='name'>
										{ticketContent.playerInfo.name} #{ticketContent.playerInfo.uid} {ticketContent.playerInfo?.id ? `[${ticketContent.playerInfo.id}]` : ''}
									</div>
									<div className='last-online'>
										{ticketContent.senderLastOnline !== null
											? `был(а) в сети ${ticketContent.senderLastOnline}`
											: 'онлайн'}
									</div>
								</div>
							</div>
							{ticketContent.isPrivate && (
								<div className='btns'>{getTicketButtons(TicketButtons)}</div>
							)}
						</div>
						<div className='content'>
							<div className='num-container'>
								<div className='line' />
								<div className='num'>Тикет №{ticketContent && ticketContent.id}</div>
								<div className='line' />
							</div>

							<div className='messages'>{ticketContent && getMessages(ticketContent.messages)}</div>

							{!ticketContent.isPrivate && !ticketContent.isClosed && (
								<div className={'free-ticket'}>
									<div className='icon' />
									<div className='text'>Заберите тикет, чтобы ответить на него</div>
									<div className='btn' onClick={() => onClickTakeFreeTicket(ticketContent.id)}>
										Забрать тикет
									</div>
								</div>
							)}
							{ticketContent.isClosed && (
								<div className={'closed-ticket'}>
									<div className='icon' />
									<div className='text'>Тикет закрыт</div>
								</div>
							)}
							{/*{!ticketContent.isPrivate &&*/}
							{/*	!ticketContent.isClosed && (*/}
							{/*		<div className={'free-ticket'}>*/}
							{/*			<div className='icon' />*/}
							{/*			<div className='text'>Тикет занят другим администраторм!</div>*/}
							{/*		</div>*/}
							{/*	)}*/}

							{!ticketContent.isClosed && ticketContent.isPrivate && (
								<div className={'chat-container'}>
									<div className='fast-answer' onClick={() => setShowFastAnswer(!showFastAnswer)}>
										<div className='text'>Быстрые ответы</div>
										<div
											className='icon'
											style={{
												transform: `rotate(${showFastAnswer ? 180 : 0}deg)`,
												transition: `all .1s ease`,
											}}
										/>
									</div>

									<div className={`answers-blocks ${showFastAnswer && '-show'}`}>
										{fastAnswers.map((fastAnswer, idx) => (
											<div key={idx} className={'answer'} onClick={() => onClickFastAnswer(idx)}>
												{fastAnswer.name}
											</div>
										))}
									</div>
									<div className='dialog'>
										<div className='btn' onClick={onClickFastAnswerSettings} />
										<textarea
											value={message}
											onChange={e => setMessage(e.target.value)}
											className={''}
											placeholder={'Введите сообщение...'}
										/>
										<div className='btn' onClick={onClickSendMessage}></div>
									</div>
								</div>
							)}
						</div>
					</div>
				</>
			) : (
				<div className={'ticket-not-found'}>Выберите подходящий тикет</div>
			)}
			{getPopupWindow()}
			{getTicketInfo()}
		</div>
	)
}
