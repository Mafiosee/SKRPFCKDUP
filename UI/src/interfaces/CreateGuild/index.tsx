import React, { useEffect, useRef, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CSSTransition } from 'react-transition-group'
import { createGuildActions } from './reducer'
import Frame from '../../components/Frame'
import { CreateGuildCreatePayload, CreateGuildEvents } from '../../shared/CreateGuild/events'
import { PaymentMethod } from '../../shared/CreateGuild/PaymentMethod'
import { numberWithSeparator } from '../../utils/numberWithSeparator'
import { AdditionalImages } from './assets/additional'
import { callClient } from '../../utils/api'
import { HouseImages } from '../HouseSystem'
import { KeyCodes } from '../../utils/keyCodes'
import { useEscClose } from '../../hooks/useEscClose'

const CreateGuild = () => {
	const dispatch = useAppDispatch()
	const { isOpen, price, houses, additional } = useAppSelector(state => state.createGuild)
	const nodeRef = useRef(null)
	const [name, setName] = useState('')
	const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)
	const [activeHouseId, setActiveHouseId] = useState(null)
	const [activeAdditionalIds, setActiveAdditionalIds] = useState<any[]>([])

	useEscClose({ isOpenInterface: isOpen, closeEvent: CreateGuildEvents.Close })

	// useEffect(() => {
	//   setTimeout(() => dispatch(createGuildActions.show()), 150)
	// }, [])

	useEffect(() => {
		setActiveHouseId(null)
	}, [houses])

	useEffect(() => {
		setActiveAdditionalIds([])
	}, [additional])

	const getHouses = () => {
		if (!houses.length) {
			return (
				<div className='house -empty -active'>
					<div className='empty'>Дома отсутствуют</div>
				</div>
			)
		} else {
			return houses.map(({ id, image, name: houseName }) => {
				const isActive = id === activeHouseId
				const setActive = () => setActiveHouseId(id)

				return (
					<div key={id} className={`house ${isActive && '-active'}`} onClick={setActive}>
						<div
							className='content'
							style={{ backgroundImage: `url(${HouseImages[`${image}.png`]})` }}
						>
							<div className='shadow'>{houseName}</div>
						</div>
					</div>
				)
			})
		}
	}

	const getAdditional = () =>
		additional.map(({ id, image, name: additionalName, price: additionalPrice }) => {
			const isActive = activeAdditionalIds.includes(id)
			const toggle = () => {
				if (isActive) {
					const newActiveAdditionalIds = [...activeAdditionalIds]
					const index = newActiveAdditionalIds.findIndex(el => el === id)
					newActiveAdditionalIds.splice(index, 1)
					setActiveAdditionalIds(newActiveAdditionalIds)
				} else {
					setActiveAdditionalIds(prev => [...prev, id])
				}
			}

			return (
				<div key={id} className={`additional ${isActive && '-active'}`} onClick={toggle}>
					<div className='content'>
						<div
							className='bg'
							style={{ backgroundImage: `url(${AdditionalImages[`${image}.png`]})` }}
						/>
						<div className='row'>
							<div className='checkbox' />
							<div className='name'>{additionalName}</div>
							<div className='price'>
								<div className='value -donate'>
									+{numberWithSeparator(additionalPrice.donate, ' ')}
								</div>
								/
								<div className='value -money'>
									+{numberWithSeparator(additionalPrice.money, ' ')}
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		})

	const getFullPrice = (currentPaymentMethod: PaymentMethod) => {
		let base, adds
		switch (currentPaymentMethod) {
			case PaymentMethod.Money:
				base = price.money
				adds = activeAdditionalIds.reduce((acc, id) => {
					const el = additional.find(addEl => addEl.id === id)
					if (!el) {
						return acc
					}
					return acc + el.price.money
				}, 0)
				return base + adds

			case PaymentMethod.Donate:
				base = price.money
				adds = activeAdditionalIds.reduce((acc, id) => {
					const el = additional.find(addEl => addEl.id === id)
					if (!el) {
						return acc
					}
					return acc + el.price.money
				}, 0)
				return base + adds
		}
	}

	return (
		<CSSTransition
			in={isOpen}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='CreateGuild'
			nodeRef={nodeRef}
		>
			<div className='CreateGuild' ref={nodeRef}>
				<div className='window'>
					<Frame
						imageUrl={require('./assets/images/bg.png')}
						color='#514F40'
						title='Новая гильдия'
						closeEvent={CreateGuildEvents.Close}
					/>
					<div className='content'>
						<div className='col -s'>
							<div className='title'>Регистрация гильдии</div>
							<div className='name'>
								<div className='title'>Введите название</div>
								<input
									type='text'
									placeholder='Текст'
									value={name}
									onChange={event => setName(event.target.value)}
								/>
							</div>
							<div className='payment'>
								<div className='title'>Выберите оплату</div>
								<div className='choose'>
									<div
										className={`item ${paymentMethod === PaymentMethod.Money && '-active'}`}
										onClick={() => setPaymentMethod(PaymentMethod.Money)}
									>
										<div className='checkbox' />
										<div className='price -money'>
											{numberWithSeparator(getFullPrice(PaymentMethod.Money), ' ')}
										</div>
									</div>
									<div
										className={`item ${paymentMethod === PaymentMethod.Donate && '-active'}`}
										onClick={() => setPaymentMethod(PaymentMethod.Donate)}
									>
										<div className='checkbox' />
										<div className='price -donate'>
											{numberWithSeparator(getFullPrice(PaymentMethod.Donate), ' ')}
										</div>
									</div>
								</div>
							</div>
							<div
								className={`buy ${(paymentMethod === null || !name.length) && '-disabled'}`}
								onClick={() => {
									if (paymentMethod == null) {
										return
									}
									const payload: CreateGuildCreatePayload = {
										paymentMethod,
										houseId: activeHouseId,
										additionalIds: activeAdditionalIds,
									}
									callClient(CreateGuildEvents.Create, payload)
								}}
							>
								Приобрести
							</div>
							<div className='rules' onClick={() => callClient(CreateGuildEvents.Rules)}>
								Правила создания
							</div>
						</div>
						<div className='col -l'>
							<div className='house'>
								<div className='title'>Выберите дом</div>
								<div className='list'>{getHouses()}</div>
							</div>
							<div className='additional'>
								<div className='title'>Дополнительные возможности</div>
								<div className='list'>{getAdditional()}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</CSSTransition>
	)
}

export default CreateGuild
