import React from 'react'
import './styles.sass'
import { ItemImagesSquad } from '../../../Inventory/assets/items'
import { RarityBg } from '../RarityBg'
import { RarityInfo } from '../RarityInfo'
import { callClient } from '../../../../utils/api'
import { CraftStatusEvents } from '../../../../shared/CraftStatus/events'
import { FinishCraftDTO } from '../../../../shared/CraftStatus/FinishCraft'

type PropsType = {
	info: FinishCraftDTO
}

export const FinishCraft: React.FC<PropsType> = ({
																									 info: craftFinish,
																								 }) => {
	const onClickTakeItem = () => {
		callClient(CraftStatusEvents.Finish)
	}
	return (
		<div className={'_FinishCraft'}>
			<RarityBg quality={craftFinish.quality} />
			<div className='item-block'>
				<div
					className='item'
					style={{
						background: `url(${ItemImagesSquad[`${craftFinish.image}.png`]})`,
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'contain',
						zIndex: '1',
					}}
				/>
			</div>
			<div className='name-block'>
				<div className='text'>Вы успешно создали:</div>
				<div className='name'>{craftFinish.name}</div>
			</div>
			<div className='line' />
			<div className='quality-amount-container'>
				<RarityInfo quality={craftFinish.quality} />
				<div className='circle' />
				<div className='amount-name'>количество</div>
				<div className='amount'>{craftFinish.amount}</div>
			</div>
			<div className='btns'>
				<div className='btn' onClick={onClickTakeItem}>
					Принять
				</div>
			</div>
		</div>
	)
}
