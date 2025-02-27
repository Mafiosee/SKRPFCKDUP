import React, { useEffect, useRef, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CSSTransition } from 'react-transition-group'
import { callClient } from '../../utils/api'
import { numberWithSeparator } from '../../utils/numberWithSeparator'
import { Quality } from '../../shared/inventory/itemType'
import { sellResourceActions } from './reducer'
import ConfirmWindow from './components'
import {
	SellPayload,
	SellResourceEvents,
} from '../../shared/SellResource/events'
import { ButtonTypes } from '../../shared/NpcShop/type'
import { ItemImagesSquad } from '../Inventory/assets/items'
import { KeyCodes } from '../../utils/keyCodes'
import { useEscClose } from '../../hooks/useEscClose'

enum ArrowType {
	Prev,
	Next,
}

export type ItemInfo = {
	name: string;
	amount: number;
	price: number;
};

const QualityColor = {
	[Quality.Normal]: '#3F3F3F',
	[Quality.Unusual]: 'rgb(62, 127, 69)',
	[Quality.Rare]: 'rgb(71, 106, 173)',
	[Quality.Epic]: 'rgb(110, 51, 144)',
	[Quality.Legendary]: 'rgb(173, 157, 71)',
}

const SellResource = () => {
	const dispatch = useAppDispatch()
	const { isOpen, title, quality, image, name, amount, price } = useAppSelector(
		(state) => state.sellResource,
	)
	const nodeRef = useRef(null)
	const inputRef = useRef<HTMLInputElement>(null)
	const [sellAmount, setSellAmount] = useState<string>('')
	const [isInputActive, setIsInputActive] = useState<boolean>(false)
	const [showConfirmWindow, setShowConfirmWindow] = useState<boolean>(false)
	const [itemInfo, setItemInfo] = useState<ItemInfo | null>(null)

	useEscClose({ isOpenInterface: isOpen, closeEvent: SellResourceEvents.Cancel })

	const currentItemImage = `url(${ItemImagesSquad[`${image}.png`]})`

	// useEffect(() => {
	//   setTimeout(() => dispatch(sellResourceActions.show()), 150);
	// }, [dispatch]);

	useEffect(() => {
		setSellAmount('1')
	}, [amount])

	const onChangeSellAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		if (isNaN(+value)) {
			return
		}
		if (+value < 0) {
			return
		}
		if (value.length === 0) {
			setSellAmount('')
		}

		if (+value > amount) {
			setSellAmount(amount.toString())
			return
		}

		setSellAmount(value)
	}

	const handleFocus = () => setIsInputActive(true)
	const handleBlur = () => setIsInputActive(false)
	const handleClick = () => {
		if (inputRef.current == null) {
			return
		}
		inputRef.current.focus()
	}

	const onClickCancel = () => {
		callClient(SellResourceEvents.Cancel)
	}

	const onClickSell = () => {
		setItemInfo({ amount: +sellAmount, name: name, price: price })
		setShowConfirmWindow(true)
	}

	const onClickArrow = (arrowType: ArrowType) => {
		if (arrowType === ArrowType.Prev && +sellAmount > 1) {
			setSellAmount((+sellAmount - 1).toString())
		} else if (arrowType === ArrowType.Next && +sellAmount < amount) {
			setSellAmount((+sellAmount + 1).toString())
		}
	}

	const onClickMaxAmount = () => {
		setSellAmount(amount.toString())
	}

	const isSellAmountLessThanAmount = +sellAmount < amount
	const isSellAmountMoreThanOne = +sellAmount > 1

	const onClickCloseConfirmWindow = () => {
		setShowConfirmWindow(false)
	}

	const onClickMainBtnConfirmWindow = () => {
		if (sellAmount.toString().length <= 0 || +sellAmount === 0) {
			return
		}
		const payload: SellPayload = { amount: +sellAmount }
		callClient(SellResourceEvents.Sell, payload)
		setShowConfirmWindow(false)
	}

	return (
		<CSSTransition
			in={isOpen}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='SellResource'
			nodeRef={nodeRef}
		>
			<div className='SellResource' ref={nodeRef}>
				<div className='window'>
					<div className='block-info'>
						<div className='name'>{title}</div>
						<div className='cross' onClick={onClickCancel} />
					</div>
					<div className='content'>
						<div
							className='effects'
							style={{ background: QualityColor[quality] }}
						/>
						<div
							className='image'
							style={{ backgroundImage: currentItemImage }}
						/>
						<div className='name'>{'Карапус'}</div>
						<div className='bag-amount'>
							<div className='icon' />
							<div className='text'>Сейчас у вас:</div>
							<div className='amount'>{amount} шт.</div>
						</div>
						<div className='amount-selection-block'>
							<div
								className={`arrow -left ${!isSellAmountMoreThanOne && '-disable'}`}
								onClick={() => onClickArrow(ArrowType.Prev)}
							/>
							<div
								className={`input-container ${isInputActive && '-active'} ${sellAmount.length > 0 && '-filled'}`}
								onClick={handleClick}
							>
								<input
									value={sellAmount}
									ref={inputRef}
									onFocus={handleFocus}
									onBlur={handleBlur}
									placeholder={'Кол-во шт.'}
									className={'input-block'}
									style={{
										paddingLeft: `${isInputActive ? '1.1111vh' : '3.7036vh'}`,
									}}
									onChange={onChangeSellAmount}
								/>
								{!isInputActive && <div className='icon' />}
							</div>
							<div
								className={`arrow -right ${!isSellAmountLessThanAmount && '-disable'}`}
								onClick={() => onClickArrow(ArrowType.Next)}
							/>
							<div className={`btn `} onClick={onClickMaxAmount}>
								max
							</div>
						</div>
						<div className='sell-sum-result'>
							<div className='text'>Сумма продажи ({sellAmount} шт.):</div>
							<div className='sum-block'>
								<div className='icon' />
								<div className='sum'>
									{numberWithSeparator(+sellAmount * price, ' ')}
								</div>
							</div>
						</div>

						<div className='primary-buttons'>
							<div className={`btn sell `} onClick={onClickSell}>
								{'Продать'}
							</div>
							<div className={`btn cancel`} onClick={onClickCancel}>
								{'Отмена'}
							</div>
						</div>
					</div>
				</div>

				<div className={`confirm-window ${showConfirmWindow && '-show'}`}>
					{itemInfo !== null && (
						<ConfirmWindow
							blockName={'Продажа'}
							item={itemInfo}
							exit={onClickCloseConfirmWindow}
							mainBtn={onClickMainBtnConfirmWindow}
							text={'Вы действительно хотите продать:'}
							mainBtnText={'Продать'}
							buttonType={ButtonTypes.Warning}
						/>
					)}
				</div>
			</div>
		</CSSTransition>
	)
}

export default SellResource
