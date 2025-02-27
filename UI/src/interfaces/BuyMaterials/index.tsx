import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CSSTransition } from 'react-transition-group'
import { buyMaterialsActions } from './reducer'
import { callClient } from '../../utils/api'
import {
	BuyMaterialsEvents,
	BuyMaterialsPayloads,
} from '../../shared/BuyMaterials/events'
import { numberWithSeparator } from '../../utils/numberWithSeparator'
import { KeyCodes } from '../../utils/keyCodes'
import { useEscClose } from '../../hooks/useEscClose'

const BuyMaterials: React.FC = () => {
	const dispatch = useAppDispatch()
	const { isOpen, info } = useAppSelector((state) => state.buyMaterials)
	const nodeRef = useRef(null)
	const [amount, setAmount] = useState<string | number>(1)

	useEscClose({ isOpenInterface: isOpen, closeEvent: BuyMaterialsEvents.Close })

	// useEffect(() => {
	//   setTimeout(() => dispatch(buyMaterialsActions.show()), 150);
	// }, [dispatch]);

	const changeAmount = (diff: number) => {
		const newAmount = +amount + diff
		if (newAmount < 1 || newAmount > 999) {
			return
		}
		setAmount(newAmount)
	}

	const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		if (!value.length) {
			setAmount('')
		}
		const numValue = +value
		if (isNaN(numValue)) {
			return
		}
		if (numValue < 0 || numValue > 999) {
			return
		}

		setAmount(value)
	}

	return (
		<CSSTransition
			in={isOpen}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='BuyMaterials'
			nodeRef={nodeRef}
		>
			<div className='BuyMaterials' ref={nodeRef}>
				<div className='window'>
					<div className='title'>Приобрести материалы</div>
					<div
						className='close'
						onClick={() => callClient(BuyMaterialsEvents.Close)}
					/>
					<div className='image' />
					<div className='info'>
						<div className='title'>Материалы</div>
						<div className='helper'>
							Предмет необходимый для работы бизнесов
						</div>
						<div className='line' />
						<div className='amount'>
							<div className='btn -minus' onClick={() => changeAmount(-1)} />
							<input
								type='text'
								placeholder='1'
								value={amount}
								onChange={onChangeInput}
							/>
							<div className='btn -plus' onClick={() => changeAmount(1)} />
						</div>
						<div className='row'>
							<div className='price'>
								{numberWithSeparator(info.price * +amount, '.')}
							</div>
							<div className='separator' />
							<div className='weight'>
								<div className='title'>Вес:</div>
								<div className='value'>{+amount * info.weight} кг</div>
							</div>
						</div>
					</div>
					<div className='buttons'>
						<div
							className='button -buy'
							onClick={() => {
								const payload: BuyMaterialsPayloads[BuyMaterialsEvents.Buy] = {
									amount: +amount,
								}
								callClient(BuyMaterialsEvents.Buy, payload)
							}}
						>
							Приобрести
						</div>
						<div
							className='button -cancel'
							onClick={() => callClient(BuyMaterialsEvents.Close)}
						>
							Отмена
						</div>
					</div>
				</div>
			</div>
		</CSSTransition>
	)
}

export default BuyMaterials
