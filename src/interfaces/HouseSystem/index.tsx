import React, { useEffect, useRef, useState, useMemo } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CSSTransition } from 'react-transition-group'
import { callClient } from '../../utils/api'
import { KeyCodes } from '../../utils/keyCodes'
import { importAllImagesFromFolder } from '../../utils/images'
import {
	HouseSystemBuyInteriorPayload,
	HouseSystemBuyUpgradePayload,
	HouseSystemEvents,
	HouseSystemKickMemberPayload,
	HouseSystemPayload,
} from '../../shared/HouseSystem/events'
import { houseSystemActions } from './reducer'
import { numberWithSeparator } from '../../utils/numberWithSeparator'
import { useEscClose } from '../../hooks/useEscClose'

export const HouseImages = importAllImagesFromFolder(
	require.context('./assets/images/houses', false, /.png$/),
)
const InteriorImages = importAllImagesFromFolder(
	require.context('./assets/images/interiors', false, /.png$/),
)

const HouseSystem = () => {
	const dispatch = useAppDispatch()
	const {
		isOpen,
		image,
		owner,
		name,
		number,
		level,
		district,
		price,
		tax,
		isOwner,
		members,
		interiors,
		upgrades,
		locked,
	} = useAppSelector((state) => state.houseSystem)
	const nodeRef = useRef(null)
	const [isOpenMembers, setIsOpenMembers] = useState(false)
	const [isOpenUpgrades, setIsOpenUpgrades] = useState(false)
	const [selectedInteriorId, setSelectedInteriorId] = useState<any>(null)
	const selectedInteriorRef = useRef<HTMLDivElement>(null)

	useEscClose({ isOpenInterface: isOpen, closeEvent: HouseSystemEvents.Exit })

	// useEffect(() => {
	//   setTimeout(() => dispatch(houseSystemActions.show()), 150);
	// }, []);

	useEffect(() => {
		const onKeyDownHandler = ({ keyCode }: KeyboardEvent) => {
			switch (keyCode) {
				case KeyCodes.Esc:
					callClient(HouseSystemEvents.Exit)
					break
			}
		}
		setIsOpenMembers(false)
		setIsOpenUpgrades(false)
		if (isOpen) {
			document.addEventListener('keyup', onKeyDownHandler)
		}
		return () => {
			document.removeEventListener('keyup', onKeyDownHandler)
		}
	}, [isOpen])

	useEffect(() => {
		const boughtInterior = interiors.find((interior) => interior.bought)
		setSelectedInteriorId(boughtInterior ? boughtInterior.id : null)
	}, [interiors])

	useEffect(() => {
		selectedInteriorRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [selectedInteriorRef.current])

	const selectedInterior = useMemo(() => {
		const interior = interiors.find((el) => el.id === selectedInteriorId)
		return interior ?? null
	}, [interiors, selectedInteriorId])

	const getMembers = () =>
		members.map(({ id, name, datetime }) => (
			<div key={id} className='member'>
				<div className='icon' />
				<div className='info'>
					<div className='name'>{name}</div>
					<div className='datetime'>Дата заселения: {datetime}</div>
				</div>
				<div
					className='button'
					onClick={() => {
						const payload: HouseSystemKickMemberPayload = {
							houseId: number,
							memberId: id,
						}
						callClient(HouseSystemEvents.KickMember, payload)
					}}
				>
					Выселить
				</div>
			</div>
		))

	const updateSelectedInterior = (diff: number) => {
		if (!selectedInteriorId) {
			setSelectedInteriorId(interiors.length ? interiors[0].id : null)
		}
		const currentIndex = interiors.findIndex(
			(el) => el.id === selectedInteriorId,
		)
		const newIndex = currentIndex + diff
		if (newIndex < 0) {
			return
		}
		if (newIndex > interiors.length - 1) {
			return
		}
		setSelectedInteriorId(interiors[newIndex].id)
	}

	const getInteriors = () =>
		interiors.map(({ id, image, name, price, bought }) => {
			const isSelected = id === selectedInteriorId
			const setSelected = () => setSelectedInteriorId(id)

			return (
				<div
					key={id}
					className={`interior ${isSelected && '-selected'}`}
					onClick={setSelected}
					ref={isSelected ? selectedInteriorRef : null}
				>
					<div
						className='image'
						style={{
							backgroundImage: `url(${InteriorImages[`${image}-small.png`]})`,
						}}
					/>
					<div className='content'>
						{bought ? (
							<div className='bought'>Приобретено</div>
						) : (
							<div className='price'>{numberWithSeparator(price, '.')}</div>
						)}
						<div className='name'>{name}</div>
					</div>
				</div>
			)
		})

	const getUpgrades = () =>
		upgrades.map(({ id, name, price, bought }) => (
			<div key={id} className={`upgrade ${bought && '-bought'}`}>
				<div className='name'>{name}</div>
				{bought ? (
					<div className='bought'>Приобетено</div>
				) : (
					<div
						className='buy'
						onClick={() => {
							const payload: HouseSystemBuyUpgradePayload = {
								houseId: number,
								upgradeId: id,
							}
							callClient(HouseSystemEvents.BuyUpgrade, payload)
						}}
					>
						<div className='text'>Приобрести</div>
						<div className='price'>{numberWithSeparator(price, '.')}</div>
					</div>
				)}
			</div>
		))

	return (
		<CSSTransition
			in={isOpen}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='HouseSystem'
			nodeRef={nodeRef}
		>
			<div className='HouseSystem' ref={nodeRef}>
				<div className='window'>
					<div
						className='image'
						style={{ backgroundImage: `url(${HouseImages[`${image}.png`]})` }}
					/>
					<div className='content'>
						<div
							className='close'
							onClick={() => callClient(HouseSystemEvents.Exit)}
						/>
						<div className='title'>О доме</div>
						<div className='header'>
							<div className={`status ${!owner && '-sale'}`}>
								{owner ? owner : 'В продаже'}
							</div>
							<div className='name'>{name}</div>
							<div className='number'>Номер дома: #{number}</div>
						</div>
						<div className='footer'>
							<div className='info'>
								{isOwner !== null && (
									<div className='block'>
										<div className='title'>Состояние:</div>
										<div className={`value ${locked ? '-lock' : '-unlock'}`}>
											{locked ? 'Закрыт' : 'Открыт'}
										</div>
									</div>
								)}
								<div className='block'>
									<div className='title'>Класс:</div>
									<div className='value'>{level}</div>
								</div>
								<div className='block'>
									<div className='title'>Подданство:</div>
									<div className='value'>{district}</div>
								</div>
								<div className='block'>
									<div className='title'>Стоимость / налог:</div>
									<div className='value -price'>
										<div className='price'>
											{numberWithSeparator(price, '.')}
										</div>
										<div className='separator'>/</div>
										<div className='price'>{numberWithSeparator(tax, '.')}</div>
									</div>
								</div>
							</div>
							<div className='separator' />
							<div className='buttons'>
								{!owner && (
									<>
										<div
											className='button -l -white'
											onClick={() => {
												const payload: HouseSystemPayload = { houseId: number }
												callClient(HouseSystemEvents.Buy, payload)
											}}
										>
											Приобрести
										</div>
										<div
											className={`button -l ${!isOwner && locked && '-disabled'}`}
											onClick={() => {
												if (!isOwner && locked) {
													return
												}
												const payload: HouseSystemPayload = { houseId: number }
												callClient(HouseSystemEvents.Enter, payload)
											}}
										>
											Войти
										</div>
									</>
								)}
								{owner !== null && !isOwner && (
									<div
										className='button -l -white'
										onClick={() => {
											const payload: HouseSystemPayload = { houseId: number }
											callClient(HouseSystemEvents.Enter, payload)
										}}
									>
										Войти
									</div>
								)}
								{owner !== null && isOwner && (
									<>
										<div
											className='button -s -white -icon -icon-enter'
											onClick={() => {
												const payload: HouseSystemPayload = { houseId: number }
												callClient(HouseSystemEvents.Enter, payload)
											}}
										>
											Войти
										</div>
										<div
											className={`button -s -icon -icon-${locked ? 'open' : 'close'}`}
											onClick={() => {
												const payload: HouseSystemPayload = { houseId: number }
												callClient(HouseSystemEvents.ToggleOpen, payload)
											}}
										>
											{locked ? 'Открыто' : 'Закрыто'}
										</div>
										<div
											className='button -s'
											onClick={() => {
												setIsOpenMembers(true)
												setIsOpenUpgrades(false)
											}}
										>
											Сожители
										</div>
										<div
											className='button -s'
											onClick={() => {
												setIsOpenUpgrades(true)
												setIsOpenMembers(false)
											}}
										>
											Улучшения
										</div>
										<div
											className='button -s'
											onClick={() => {
												const payload: HouseSystemPayload = { houseId: number }
												callClient(HouseSystemEvents.Pay, payload)
											}}
										>
											Оплатить
										</div>
										<div
											className='button -s -red -icon -icon-sell'
											onClick={() => {
												const payload: HouseSystemPayload = { houseId: number }
												callClient(HouseSystemEvents.Sell, payload)
											}}
										>
											Продать
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
				{isOpenMembers && (
					<div className='members'>
						<div className='close' onClick={() => setIsOpenMembers(false)} />
						<div className='title'>Сожители</div>
						<div className='amount'>Количество сожителей: {members.length}</div>
						<div className='list'>{getMembers()}</div>
					</div>
				)}
				{isOpenUpgrades && selectedInterior && (
					<div className='upgrades'>
						<div
							className='image'
							style={{
								backgroundImage: `url(${InteriorImages[`${selectedInterior.image}-big.png`]})`,
							}}
						/>
						<div className='content'>
							<div className='close' onClick={() => setIsOpenUpgrades(false)} />
							<div className='title'>Улучшения</div>
							<div className='interior'>
								<div className='name'>{selectedInterior.name}</div>
								<div className='status'>
									<div
										className={`bought ${selectedInterior.bought && '-show'}`}
									>
										Приобретено
									</div>
									<div
										className={`buy ${!selectedInterior.bought && '-show'}`}
										onClick={() => {
											const payload: HouseSystemBuyInteriorPayload = {
												houseId: number,
												interiorId: selectedInterior.id,
											}
											callClient(HouseSystemEvents.BuyInterior, payload)
										}}
									>
										<div className='text'>Приобрести</div>
										<div className='price'>
											{numberWithSeparator(selectedInterior.price, '.')}
										</div>
									</div>
								</div>
								<div className='list'>
									<div
										className='arrow -left'
										onClick={() => updateSelectedInterior(-1)}
									/>
									<div className='interiors'>{getInteriors()}</div>
									<div
										className='arrow -right'
										onClick={() => updateSelectedInterior(1)}
									/>
								</div>
							</div>
							<div className='upgrades'>{getUpgrades()}</div>
						</div>
					</div>
				)}
			</div>
		</CSSTransition>
	)
}

export default HouseSystem
