import React, { useEffect, useState } from 'react'
import './styles.sass'
import { numberWithSeparator } from '../../../utils/numberWithSeparator'
import { ItemInfo } from '../index'
import { ButtonTypes } from '../../../shared/NpcShop/type'
import { ColorClassName } from '../../NpcShop'

type PropsType = {
	blockName: string
	buttonType: ButtonTypes
	text: string
	item: ItemInfo
	exit: () => void
	mainBtn: () => void
	mainBtnText: string
}
const ConfirmWindow: React.FC<PropsType> = ({
																							blockName,
																							buttonType,
																							item,
																							exit,
																							mainBtn,
																							mainBtnText,
																							text,
																						}) => {
	const getPrice = () =>
		numberWithSeparator(item.amount === null ? item.price : (item.amount === 0 ? 1 : item.amount) * item.price, ' ')

	return (
		item !== null && (
			<div className={`_SellResource-Confirm-window`}>
				<div className='block-info'>
					<div className='name'>{blockName}</div>
					<div className='exit' onClick={exit} />
				</div>
				<div className='text-block'>
					<div className='alarm'>{text}</div>
					<div className='info'>
						<span>
							{item.name} {item.amount !== null && `(x${item.amount === 0 ? 1 : item.amount})`}
						</span>
						<span style={{ color: '#AFAFAF' }}> за </span>
						<div>
							<div className='icon' />
							<div className='price'>{getPrice()}</div>
						</div>
						<span style={{ color: '#AFAFAF' }}>?</span>
					</div>
				</div>

				<div className='confirm-buttons'>
					<div className={`btn -confirm ${ColorClassName[buttonType]}`} onClick={mainBtn}>
						{mainBtnText}
					</div>
					<div className={`btn -cancel -secondary`} onClick={exit}>
						{'Отмена'}
					</div>
				</div>
			</div>
		)
	)
}

export default ConfirmWindow
