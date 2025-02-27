import './styles.sass'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { BuyProductData } from '../../data/buyProduct'
import {
	TradingStoreEvents,
	TradingStorePayloads,
} from '../../../../shared/TradingStore/events'
import { callClient } from '../../../../utils/api'
import { ItemImagesSquad } from '../../../Inventory/assets/items'

type Props = {
	data: BuyProductData;
	close: () => void;
};

const BuyProduct: React.FC<Props> = ({ data, close }) => {
	const [amount, setAmount] = useState<string | number>(1)

	useEffect(() => {
		setAmount(1)
	}, [data.isOpen])

	const changeAmount = (diff: number) => {
		const newAmount = +amount + diff
		if (newAmount < 1 || newAmount > (data.product?.maxAmount || 1)) {
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
		if (numValue < 0 || numValue > (data.product?.maxAmount || 1)) {
			return
		}

		setAmount(value)
	}

	return (
		<div className={`_BuyProduct ${data.isOpen && '-opened'}`}>
			<div className='window'>
				<div className='title'>Покупка товара</div>
				<div className='close' onClick={close} />
				<div
					className='image'
					style={{
						backgroundImage: data.product
							? `url(${ItemImagesSquad[`${data.product.image}.png`]})`
							: 'none',
					}}
				/>
				<div className='info'>
					<div className='name'>{data.product?.name}</div>
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
					<div className='price'>{data.product?.price} / шт</div>
				</div>
				<div className='buttons'>
					<div
						className='button -buy'
						onClick={() => {
							const payload: TradingStorePayloads[TradingStoreEvents.Buy] = {
								amount: +amount,
								productId: data.product?.id,
							}
							callClient(TradingStoreEvents.Buy, payload)
							close()
						}}
					>
						Приобрести
						<div className='icon' />
						{+amount * +(data.product?.price ?? 0)}
					</div>
					<div className='button -cancel' onClick={close}>
						Отмена
					</div>
				</div>
			</div>
		</div>
	)
}

export default BuyProduct
