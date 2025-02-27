import React, { ChangeEvent, useMemo, useRef, useState } from 'react'
import './styles.sass'
import { PunishedPlayerType, PunishedTypes } from '../../../../shared/AdminPanel/type'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { Popup, TextBlockType } from '../Popup'
import { callClient } from '../../../../utils/api'
import {
	AdminPanelEvents, AdminPanelPayloads,
} from '../../../../shared/AdminPanel/events'

const CategoriesPunishedNames = {
	[PunishedTypes.muted]: 'Заглушенные',
	[PunishedTypes.banned]: 'Заблокированные',
	[PunishedTypes.demorgan]: 'Деморган',
}

const PunishedNames = {
	[PunishedTypes.muted]: 'Мут',
	[PunishedTypes.banned]: 'Блокировка',
	[PunishedTypes.demorgan]: 'Деморган',
}

const PopupPunishedNames = {
	[PunishedTypes.muted]: 'Заглушенный игрок',
	[PunishedTypes.banned]: 'Заблокированный игрок',
	[PunishedTypes.demorgan]: 'Игрок в деморгане',
}

const PopupUnpunishedNames = {
	[PunishedTypes.muted]: 'Снять мут',
	[PunishedTypes.banned]: 'Разблокировать',
	[PunishedTypes.demorgan]: 'Освободить из деморгана',
}

const Categories = [PunishedTypes.banned, PunishedTypes.muted, PunishedTypes.demorgan]

enum StepTypes {
	Left,
	Right,
}

const SearchFields = ['date', 'playerName', 'playerUID', 'adminName', 'adminUID', 'endPunished']

export const PunishedPlayers: React.FC = () => {
	const dispatch = useAppDispatch()
	const { punishedPlayers } = useAppSelector(state => state.adminPanel)

	const [currentPunished, setCurrentPunished] = useState(0)
	const [isActiveSearch, setIsActiveSearch] = useState(false)
	const [inputValue, setInputValue] = useState('')
	const [punishedInfo, setPunishedInfo] = useState(null)
	const [isShowPopupWindow, setIsShowPopupWindow] = useState(false)

	const inputRef = useRef(null)

	const onClickRemovePunishment = (id: number) => {
		const payload: AdminPanelPayloads[AdminPanelEvents.RemovePunishment] = { id }
		callClient(AdminPanelEvents.RemovePunishment, payload)
		setIsShowPopupWindow(false)
	}

	const handleFocus = () => setIsActiveSearch(true)
	const handleBlur = () => setIsActiveSearch(false)
	const handleClick = () => inputRef.current.focus()

	const searchInObjects = (field: keyof PunishedPlayerType) => {
		const searchTerm = inputValue.toLowerCase()

		return punishedPlayers
			.filter(punished => punished.type === Categories[currentPunished])
			.filter(obj => {
				const fieldValue = obj[field]
				if (typeof fieldValue === 'string') {
					return fieldValue.toLowerCase().includes(searchTerm)
				}
				return false
			})
	}

	const searchResults = SearchFields.reduce<PunishedPlayerType[]>((acc, field) => {
		const results = searchInObjects(field as keyof PunishedPlayerType)
		return [...acc, ...results]
	}, [])

	// const value = useMemo(() => punishedPlayers.length, [punishedPlayers])

	const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setInputValue(value)
	}

	const onClickExitPopup = () => {
		setIsShowPopupWindow(false)
	}

	const onClickArrow = (step: StepTypes) => {
		if (step === StepTypes.Left && currentPunished > 0) {
			setCurrentPunished(prev => prev - 1)
		} else if (step === StepTypes.Right && currentPunished < Categories.length - 1) {
			setCurrentPunished(prev => prev + 1)
		}
	}

	const onClickPunishedPlayer = (punished: PunishedPlayerType) => {
		setIsShowPopupWindow(true)
		setPunishedInfo(punished)
	}

	const getPopupWindow = () => {
		return (
			<div className={`popup-window ${isShowPopupWindow && '-show'}`}>
				{/*<div className='bg' />*/}
				<div className='content'>
					<div className='window'>
						{punishedPlayers && (
							<>
								<div className='bg' />
								<div className='content'>
									<div className='blocks'>
										<div className='block'>
											<div className='name'>Тип</div>
											<div className='text'>
												{punishedInfo ? PunishedNames[Categories[currentPunished]] : 'Текст'}
											</div>
										</div>
										<div className='block'>
											<div className='name'>Дата и время</div>
											<div className='text'>{punishedInfo ? punishedInfo.date : 'Текст'}</div>
										</div>
										<div className='block'>
											<div className='name'>Игрок [uid]</div>
											<div className='text'>
												{punishedInfo
													? `${punishedInfo.playerName} [${punishedInfo.playerUID}]`
													: 'Текст'}
											</div>
										</div>
										<div className='block'>
											<div className='name'>Выдал наказание [uid]</div>
											<div className='text'>
												{punishedInfo
													? `${punishedInfo.adminName} [${punishedInfo.adminUID}]`
													: 'Текст'}
											</div>
										</div>
										<div className={`block reason`}>
											<div className='name'>Причина</div>
											<div className='text'>{punishedInfo ? punishedInfo.reason : ''}</div>
										</div>

										<div className='block'>
											<div className='name'>Окончание наказания</div>
											<div className='text'>{punishedInfo ? punishedInfo.endPunished : ''}</div>
										</div>
									</div>

									<div className={`btn`} onClick={() => onClickRemovePunishment(punishedInfo.id)}>
										{PopupUnpunishedNames[Categories[currentPunished]]}
									</div>
								</div>
								<div className='block-info'>
									<div className='name'>
										{punishedInfo ? PopupPunishedNames[Categories[currentPunished]] : 'Ошибка :('}
									</div>
									<div className='exit' onClick={onClickExitPopup} />
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		)
	}

	const getPunishedPlayers = () => {
		return inputValue
			? searchResults.map((punished, idx) => (
				<div
					key={idx}
					className={'punished-container'}
					onClick={() => onClickPunishedPlayer(punished)}
				>
					<div className='date-start'>{punished.date}</div>
					<div className='player'>{`${punished.playerName} [${punished.playerUID}]`}</div>
					<div className='admin'>{`${punished.adminName} [${punished.adminUID}]`}</div>
					<div className='type'>{PunishedNames[punished.type]}</div>
					<div className='date-end'>{punished.endPunished}</div>
				</div>
			))
			: punishedPlayers
				.filter(punished => punished.type === Categories[currentPunished])
				.map((punished, idx) => (
					<div
						key={idx}
						className={'punished-container'}
						onClick={() => onClickPunishedPlayer(punished)}
					>
						<div className='date-start'>{punished.date}</div>
						<div className='player'>{`${punished.playerName} [${punished.playerUID}]`}</div>
						<div className='admin'>{`${punished.adminName} [${punished.adminUID}]`}</div>
						<div className='type'>{PunishedNames[punished.type]}</div>
						<div className='date-end'>{punished.endPunished}</div>
					</div>
				))
	}

	return (
		<div className={`_PunishedPlayers`}>
			<div className='switch-and-search'>
				<div className='switch'>
					<div
						className={`arrow ${currentPunished <= 0 && '-disabled'}`}
						onClick={() => onClickArrow(StepTypes.Left)}
					/>
					<div className='name'>{CategoriesPunishedNames[Categories[currentPunished]]}</div>
					<div
						className={`arrow ${currentPunished >= Categories.length - 1 && '-disabled'}`}
						onClick={() => onClickArrow(StepTypes.Right)}
					/>
				</div>
				<div className={`input-container ${isActiveSearch && '-active'}`} onClick={handleClick}>
					<input
						value={inputValue}
						ref={inputRef}
						onFocus={handleFocus}
						onBlur={handleBlur}
						placeholder={'Поиск'}
						className={'input-block'}
						style={{ paddingLeft: `${isActiveSearch ? '1.1111vh' : '3.7036vh'}` }}
						onChange={onChangeInput}
					/>
					{!isActiveSearch && <div className='icon' />}
				</div>
			</div>
			<div className='columns-info'>
				<div className='date-start'>Дата и Время</div>
				<div className='player'>Игрок [uid]</div>
				<div className='admin'>Админ [uid]</div>
				<div className='type'>Тип блокировки</div>
				<div className='date-end'>Окончание наказания</div>
			</div>
			<div className='punished-players'>{getPunishedPlayers()}</div>
			{getPopupWindow()}
		</div>
	)
}
