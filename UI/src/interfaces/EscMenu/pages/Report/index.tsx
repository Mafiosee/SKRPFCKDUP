import './styles.sass'
import React, { useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import {
	ChatSenderColorByStatus,
	ReportReasonTitle,
	ReportRulesConfig,
	ReportStatusColors,
	ReportStatusNames,
} from '../../../../shared/Tickets/config'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { AddTicketMessagePayload, EscMenuEvents, SendReportPayload, SetCurrentTicketPayload } from '../../api'
import { callClient } from '../../../../utils/api'
import { TicketRules } from '../../components/ReportRules'
import { SenderStatus } from '../../../../shared/AdminPanel/type'
import { ReportReason, ReportRulesType, ReportStatus } from '../../../../shared/Tickets/type'
import { KeyCodes } from '../../../../utils/keyCodes'
import { escMenuActions } from '../../reducer'

type Props = {
	isShow: boolean;
};

enum ArrowDirection {
	Left,
	Right,
}


const reportReasonsList = [
	ReportReason.reportPlayer,
	ReportReason.reportAdmin,
	ReportReason.help,
	ReportReason.question,
	ReportReason.bag,
]

type MeterialType = string

const TicketCreateContentByType = {
	[ReportReason.reportPlayer]: {
		input: {
			show: true,
			placeholder: 'UID нарушителя',
		},
		textArea: {
			show: true,
			placeholder: 'Подробнее о проблеме',
		},
		materials: {
			show: false,
		},
	},
	[ReportReason.reportAdmin]: {
		input: {
			show: true,
			placeholder: 'UID администратора',
		},
		textArea: {
			show: true,
			placeholder: 'Подробнее о проблеме',
		},
		materials: {
			show: true,
		},
	},
	[ReportReason.help]: {
		input: {
			show: false,
			placeholder: 'UID / Никнейм администратора',
		},
		textArea: {
			show: true,
			placeholder: 'Опишите проблему',
		},
		materials: {
			show: false,
		},
	},
	[ReportReason.bag]: {
		input: {
			show: true,
			placeholder: 'Краткое описание',
		},
		textArea: {
			show: true,
			placeholder: 'Подробное описание',
		},
		materials: {
			show: true,
		},
	},
	[ReportReason.question]: {
		input: {
			show: true,
			placeholder: 'Заголовок вопроса',
		},
		textArea: {
			show: true,
			placeholder: 'Подробное описание',
		},
		materials: {
			show: false,
		},
	},
}

const SenderNamesByStatus = {
	[SenderStatus.Player]: 'Вы',
	[SenderStatus.Admin]: 'Администратор',
}

const Report: React.FC<Props> = ({ isShow }) => {
	const dispatch = useAppDispatch()
	const nodeRef = useRef(null)
	const { report } = useAppSelector(state => state.escMenu)
	const { currentTicket } = report
	const [showTicketRules, setShowTicketRules] = useState<boolean>(false)
	const [isCreateTicket, setIsCreateTicket] = useState(false)

	const [reasonFilter, setReasonFilter] = useState<ReportReason>(
		ReportReason.reportPlayer,
	)
	const [isShowTicketTypes, setIsShowTicketTypes] = useState(false)
	const [materialsValue, setMaterialsValue] = useState<MeterialType[]>([''])
	const [inputValue, setInputValue] = useState('')
	const [textAreaValue, setTextAreaValue] = useState('')
	const [messageValue, setMessageValue] = useState('')
	/////////////////////////////////////////////////////////////////////

	/** Открыть окно 'Правила подачи тикета' */
	const onClickShowTicketRules = () => {
		setShowTicketRules(true)
	}

	/** Закрыть окно 'Правила подачи тикета' */
	const onClickHideTicketRules = () => {
		setShowTicketRules(false)
	}

	/** Выбрать тип тикета */
	const onClickSelectEl = (event: React.MouseEvent, rep: ReportRulesType) => {
		event.preventDefault()
		setInputValue('')
		setTextAreaValue('')
		setMaterialsValue([''])
		setReasonFilter(rep.type)
		setIsShowTicketTypes(false)
	}

	/** Отрисовать доступные варианты тикета*/
	const getSelectsReportTypes = () => {
		return (
			<div className={'report-types-select'}>
				{ReportRulesConfig.map((rep, idx) => (
					<div
						key={idx}
						className={`select`}
						onClick={e => onClickSelectEl(e, rep)}
					>
						<div className='name'>{ReportReasonTitle[rep.type]}</div>
						<span></span>
					</div>
				))}
			</div>
		)
	}

	const getCurrentTicketTypeRules = () => {
		const findIndex = ReportRulesConfig.findIndex(
			rep => rep.type === reasonFilter,
		)

		if (findIndex === -1) {
			return {
				title: '',
				text: [],
			}
		}

		return {
			title: ReportRulesConfig[findIndex].title,
			text: ReportRulesConfig[findIndex].text,
		}
	}

	/** Отрисовать input (create-report) */
	const drawInput = () => {
		if (reasonFilter == null) {
			return
		}
		const { show, placeholder } =
			TicketCreateContentByType[reasonFilter].input
		return (
			show && (
				<input
					type='text'
					className={'input-block'}
					placeholder={placeholder}
					value={inputValue}
					onChange={e => setInputValue(e.target.value)}
				/>
			)
		)
	}

	/** Отрисовать text-area (create-report) */
	const drawTextArea = () => {
		if (reasonFilter == null) {
			return
		}
		const { show, placeholder } =
			TicketCreateContentByType[reasonFilter].textArea

		return (
			show && (
				<textarea
					className={'textarea-block'}
					placeholder={placeholder}
					value={textAreaValue}
					onChange={e => setTextAreaValue(e.target.value)}
				/>
			)
		)
	}

	const isShowCreateTicket =
		(currentTicket?.id == null && report.history.length === 0) || isCreateTicket

	const onClickTicket = (id: any) => {
		const payload: SetCurrentTicketPayload = {
			id,
		}
		setIsCreateTicket(false)
		callClient(EscMenuEvents.SetCurrentTicket, payload)
	}

	const onClickAddTicket = () => {
		dispatch(escMenuActions.setCurrentTicket(null))
		setIsCreateTicket(true)
	}

	/** click send ticket */
	const onClickSendTicket = () => {
		if (reasonFilter == null) {
			return
		}
		const ticketContent = TicketCreateContentByType[reasonFilter]

		if (ticketContent.input.show && inputValue.length <= 0) {
			return
		}

		if (ticketContent.textArea.show && textAreaValue.length <= 0) {
			return
		}
		if (ticketContent.materials.show && (!materialsValue.length || materialsValue[0].length <= 0)) {
			return
		}

		const payload: SendReportPayload = {
			type: reasonFilter,
			description: textAreaValue.length > 0 ? textAreaValue : null,
			title: inputValue.length > 0 ? inputValue : null,
			proofs: materialsValue[0].length > 0 ? materialsValue : null,
		}

		callClient(EscMenuEvents.CreateTicket, payload)

		setIsShowTicketTypes(false)
		setMaterialsValue([''])
		setInputValue('')
		setTextAreaValue('')
		setIsCreateTicket(false)
	}

	const deleteEmptySymbols = (str: string) => {
		if (!str.trim()) {
			return false
		}

		return str.trim()
	}

	const onClickSendMessage = () => {
		if (currentTicket == null) {
			return
		}
		const newStr = deleteEmptySymbols(messageValue)

		const payload: AddTicketMessagePayload = {
			ticketId: currentTicket.id,
			value: newStr === false ? '' : newStr,
		}
		if (newStr === false || newStr.length === 0) {
			return
		}
		callClient(EscMenuEvents.AddTicketMessage, payload)
		setMessageValue('')
	}

	/** change material value */
	const onChangeMaterialValue = (value: string, idx: number) => {
		const newMaterials = [...materialsValue]
		newMaterials[idx] = value

		setMaterialsValue([...newMaterials])
	}

	/** click add material */
	const onClickAddMaterial = () => {
		// const maxObject = materialsValue.reduce((max, obj) => obj.id > max.id ? obj : max, materialsValue[0])
		const newMaterials = [...materialsValue]
		newMaterials.push('')

		setMaterialsValue(newMaterials)
	}

	/** click remove material */
	const onClickRemoveMaterial = (idx: number) => {
		const newMaterials = materialsValue.filter(
			(materialValue, index) => idx !== index,
		)

		setMaterialsValue([...newMaterials])
	}

	/** Отрисовать materials (create-report) */
	const drawMaterials = () => {
		if (reasonFilter == null) {
			return
		}
		const { show } = TicketCreateContentByType[reasonFilter].materials

		return (
			show && (
				<div className='materials'>
					<div className='name'>Приложенные материалы:</div>
					<div className='material-container'>
						<input
							type='text'
							value={materialsValue[0]}
							onChange={e => onChangeMaterialValue(e.target.value, 0)}
						/>
						{materialsValue[0].length > 0 && (
							<div
								className={`btn -add`}
								onClick={() =>
									materialsValue.length > 0 && onClickAddMaterial()
								}
							/>
						)}
					</div>
					{materialsValue.length > 1 &&
						materialsValue.map(
							(material, idx) =>
								idx !== 0 && (
									<div key={idx} className='material-container'>
										<input
											type='text'
											value={material}
											onChange={e => onChangeMaterialValue(e.target.value, idx)}
										/>
										{materialsValue[idx].length > 0 && (
											<div
												className={`btn ${materialsValue.length > 0 ? '-add' : '-delete'}`}
												onClick={() =>
													materialsValue.length > 0
														? onClickAddMaterial()
														: onClickRemoveMaterial(idx)
												}
											/>
										)}
									</div>
								),
						)}
				</div>
			)
		)
	}

	/** Нажатие стрелочек в switch */
	const handleClickFilterArrow = (direction: ArrowDirection) => {
		let reasonFilterIndex = reportReasonsList.indexOf(reasonFilter)
		switch (direction) {
			case ArrowDirection.Left:
				reasonFilterIndex -= 1
				break
			case ArrowDirection.Right:
				reasonFilterIndex += 1
				break
		}
		if (reasonFilterIndex < 0) {
			setReasonFilter(reportReasonsList.at(reasonFilterIndex) ?? reportReasonsList[0])
		} else {
			setReasonFilter(reportReasonsList[reasonFilterIndex % reportReasonsList.length])
		}
	}

	/** Отрисовать уже существующие тикеты */
	const drawAlreadyExistsTickets = () => {
		return (
			<>
				<div className='btn-create' onClick={onClickAddTicket}>
					<div className='icon' />
					<div className='name'>Создать тикет</div>
				</div>
				{reasonFilter != null && (
					<div className='switch'>
						<div
							className={`arrow ${reportReasonsList.indexOf(reasonFilter) <= 0 && '-disabled'}`}
							onClick={() => handleClickFilterArrow(ArrowDirection.Left)}
						/>
						<div className='name'>{ReportReasonTitle[reasonFilter]}</div>
						<div
							className={`arrow ${reportReasonsList.indexOf(reasonFilter) >= reportReasonsList.length - 1 && '-disabled'}`}
							onClick={() => handleClickFilterArrow(ArrowDirection.Right)}
						/>
					</div>
				)}
				<div className='reports-list'>
					{report.history
						.filter(rep => rep.type === reasonFilter)
						.map((rep, idx) => (
							<div
								key={idx}
								className={'report'}
								onClick={() => onClickTicket(rep.id)}
							>
								<div
									className={`frame ${currentTicket?.id === rep.id && '-activeFrame'}`}
								/>
								{rep.amountNotifications > 0 && (
									<div className='notifications'>{rep.amountNotifications}</div>
								)}
								<div
									className={`bg ${currentTicket?.id === rep.id && '-activeBg'}`}
								/>
								<div className='date-status'>
									<div className='date'>{rep.datetime}</div>
									<div className='status'>
										<div
											className='circle'
											style={{
												backgroundColor: `${ReportStatusColors[rep.reportStatus]}`,
											}}
										/>
										<div
											className='text'
											style={{ color: ReportStatusColors[rep.reportStatus] }}
										>
											{ReportStatusNames[rep.reportStatus]}
										</div>
									</div>
								</div>
								<div className='title'>{rep.title}</div>
								<div className='line' />
								<div className='admin-status'>
									<span>Администратор:</span>
									<span style={{ color: rep.adminColor }}>
										{rep.adminName === null
											? 'Ожидаем администратора'
											: rep.adminName}
									</span>
								</div>
							</div>
						))}
				</div>
			</>
		)
	}

	/** Отрисовать сообщения в чате */
	const drawChatMessages = () => {
		return (
			currentTicket !== null &&
			currentTicket.messages.map((msg, idx) => {
				if (typeof msg === 'string') {
					return (
						<div key={idx} className={`line-message`}>
							{msg}
						</div>
					)
				} else {
					return (
						<div key={idx} className={'message'}>
							<div className='icon'>
								<svg
									width='37'
									height='37'
									viewBox='0 0 37 37'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										opacity='0.24'
										d='M6.71892 6.55078H13.1029L18.4987 0.769531L24.2799 6.55078H30.2785L30.2785 12.6683L36.2279 18.8463L30.2785 24.5671V30.5165H24.8812L18.4987 36.2279L12.9063 30.5165H6.71892V24.5671L0.769531 18.8463L6.71892 12.6683L6.71892 6.55078Z'
										stroke={msg?.senderColor ? msg?.senderColor : 'white'}
									/>
									<path
										d='M3.08203 18.8413L18.4987 3.08203L33.9154 18.8413L18.4987 33.9154L3.08203 18.8413Z'
										fill={msg?.senderColor ? msg?.senderColor : '#424242'}
										stroke={msg?.senderColor ? msg?.senderColor : 'white'}
										strokeOpacity='0.16'
									/>
								</svg>

								{/*<div className='vector' />*/}
								<div className='user-icon' />
							</div>
							<div className='info'>
								<div className='sender'>
									<span
										style={{
											color: msg?.senderColor
												? msg.senderColor
												: ChatSenderColorByStatus[msg.senderStatus],
										}}
									>
										{SenderNamesByStatus[msg.senderStatus]}:
									</span>
									<span>{msg.senderName}</span>
									<span>{msg.date}</span>
								</div>
								<div className='msg'>{msg.message}</div>
							</div>
						</div>
					)
				}
			})
		)
	}

	/** Отрисовать информацию тикета в чате */
	const drawTicketInfoInMessages = () =>
		currentTicket !== null && (
			<div className={'message'}>
				<div className='icon'>
					<svg
						width='37'
						height='37'
						viewBox='0 0 37 37'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							opacity='0.24'
							d='M6.71892 6.55078H13.1029L18.4987 0.769531L24.2799 6.55078H30.2785L30.2785 12.6683L36.2279 18.8463L30.2785 24.5671V30.5165H24.8812L18.4987 36.2279L12.9063 30.5165H6.71892V24.5671L0.769531 18.8463L6.71892 12.6683L6.71892 6.55078Z'
							stroke={
								currentTicket.ticketInfo.senderColor
									? currentTicket.ticketInfo.senderColor
									: 'white'
							}
						/>
						<path
							d='M3.08203 18.8413L18.4987 3.08203L33.9154 18.8413L18.4987 33.9154L3.08203 18.8413Z'
							fill={
								currentTicket.ticketInfo.senderColor
									? currentTicket.ticketInfo.senderColor
									: '#424242'
							}
							stroke={
								currentTicket.ticketInfo.senderColor
									? currentTicket.ticketInfo.senderColor
									: 'white'
							}
							strokeOpacity='0.16'
						/>
					</svg>

					{/*<div className='vector' />*/}
					<div className='user-icon' />
				</div>
				<div className='info'>
					<div className='sender'>
						<span
							style={{
								color: currentTicket.ticketInfo.senderColor
									? currentTicket.ticketInfo.senderColor
									: ChatSenderColorByStatus[
										currentTicket.ticketInfo.senderStatus
										],
							}}
						>
							{SenderNamesByStatus[currentTicket.ticketInfo.senderStatus]}:
						</span>
						<span>{currentTicket.ticketInfo.senderName}</span>
						<span>{currentTicket.ticketInfo.date}</span>
					</div>
					<div className='msg'>
						{currentTicket.ticketInfo?.title && (
							<div className={'title'}>{currentTicket.ticketInfo.title}</div>
						)}
						{currentTicket.ticketInfo?.description && (
							<div className={'description'}>
								{currentTicket.ticketInfo.description}
							</div>
						)}
						{currentTicket.ticketInfo?.proofs && (
							<div className={'proofs'}>
								<div className='name'>Приложенные материалы</div>
								{currentTicket.ticketInfo.proofs.map((proof, idx) => (
									<div key={idx} className={'proof'}>
										{proof}
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		)

	return (
		<CSSTransition
			in={isShow}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='_PageReport'
			nodeRef={nodeRef}
		>
			<div className='_PageReport' ref={nodeRef}>
				<div className='title'>Техническая поддержка</div>
				<div className='tickets-list'>
					<div className='name'>Ваши тикеты</div>
					<div className='tickets'>
						{report.history.length === 0 ? (
							<div className={'empty-tickets'}>
								<div className={'text'}>
									у вас еще нет тикетов, создай первый, заполнив форму
								</div>
							</div>
						) : (
							<div className={'tickets'}>{drawAlreadyExistsTickets()}</div>
						)}
					</div>
				</div>
				<div className='ticket-content'>
					{isShowCreateTicket && (
						<div className={'create-ticket'}>
							<div className={'name'}>Создание тикета</div>
							<div className='rules'>
								<div className='text'>
									<div className='info'>
										Внимание! Перед подачей тикета, рекомендуем ознакомиться с
										правилами.
									</div>
									<div className='text-alert'>
										В некоторых случаях тикет может быть отклонен по причине
										неправильного оформления.
									</div>
								</div>
								<div className='btn' onClick={onClickShowTicketRules}>
									{'Правила подачи тикета'}
								</div>
							</div>

							<div className='ticket-content'>
								<div className='select-container'>
									<div
										className={`select ${isShowTicketTypes && '-disabled'}`}
										onClick={() => setIsShowTicketTypes(!isShowTicketTypes)}
									>
										<div className='name'>
											{reasonFilter == null
												? ''
												: ReportReasonTitle[reasonFilter]}
										</div>
										<div
											className={`arrow ${isShowTicketTypes && '-active'}`}
										/>
									</div>
									{isShowTicketTypes && getSelectsReportTypes()}
								</div>
								{drawInput()}
								{drawTextArea()}
								{drawMaterials()}
								<div className='btn-send' onClick={onClickSendTicket}>
									Отправить
								</div>
							</div>
						</div>
					)}
					{!isShowCreateTicket && currentTicket != null && (
						<div className={'shadow'} />
					)}
					{!isShowCreateTicket && currentTicket != null && (
						<div className={'chat-container'}>
							<div className='header-chat'>
								<div className='icon'>
									<svg
										width='48'
										height='48'
										viewBox='0 0 48 48'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											opacity='0.24'
											d='M8.71812 8.5H17L24 1L31.5 8.5H39.2819L39.2819 16.4362L47 24.451L39.2819 31.8725V39.5906H32.28L24 47L16.745 39.5906H8.71812V31.8725L1 24.451L8.71812 16.4362L8.71812 8.5Z'
											stroke={
												currentTicket?.adminInfo
													? currentTicket.adminInfo.color
													: '#D1671A'
											}
										/>
										<path
											d='M4 24.4444L24 4L44 24.4444L24 44L4 24.4444Z'
											fill={
												currentTicket?.adminInfo
													? currentTicket.adminInfo.color
													: '#D1671A'
											}
											stroke={
												currentTicket?.adminInfo
													? currentTicket.adminInfo.color
													: '#D1671A'
											}
											strokeOpacity='0.16'
										/>
									</svg>
									<div className='vector' />
									<div className='user-icon' />
								</div>
								{currentTicket.adminInfo !== null ? (
									<div className='info'>
										<div className='name'>{currentTicket.adminInfo.name}</div>
										<div
											className='admin'
											style={{ color: currentTicket.adminInfo.color }}
										>
											Администратор
										</div>
									</div>
								) : (
									<div className={'wait-info'}>
										Ждем свободного администратора
									</div>
								)}
							</div>
							<div className='messages'>
								{drawTicketInfoInMessages()}
								{drawChatMessages()}
							</div>

							{currentTicket.status === ReportStatus.InProcess && (
								<div className='input-container'>
									<textarea
										placeholder={'Введите сообщение...'}
										value={messageValue}
										onChange={e => setMessageValue(e.target.value)}
										onKeyDown={(event) => {
											if (event.keyCode === KeyCodes.Enter) {
												event.preventDefault()
												onClickSendMessage()
											}
										}}
									/>
									<div className='btn-send' onClick={onClickSendMessage} />
								</div>
							)}
						</div>
					)}
				</div>

				<TicketRules
					info={getCurrentTicketTypeRules()}
					isShow={showTicketRules}
					close={onClickHideTicketRules}
				/>
			</div>
		</CSSTransition>
	)
}

export default Report
