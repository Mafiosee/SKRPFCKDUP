import React, { useState } from 'react'
import './styles.sass'
import { QualityBackgroundRadial } from '../../data'
import { ItemImagesSquad } from '../../../Inventory/assets/items'
import { RarityBg } from '../RarityBg'
import { RarityInfo } from '../RarityInfo'
import { callClient } from '../../../../utils/api'
import { StartCraftDTO } from '../../../../shared/CraftStatus/StartCraft'
import { CraftStatusEvents, CraftStatusPayloads } from '../../../../shared/CraftStatus/events'
import { HoverInfo } from '../../../Inventory'
import craftStatus from '../../index'

type PropsType = {
	info: StartCraftDTO
	close: () => void
	hover: {
		info: HoverInfo
		set: (info: HoverInfo) => void
	}
}

enum AmountWay {
	Plus,
	Minus,
}

export const StartCraft: React.FC<PropsType> = ({
																									close,
																									info: craftCreate,
																									hover,
																								}) => {
	const [amountValue, setAmountValue] = useState<string | number>(1)

	const onChangeAmountValue = (value: string) => {
		if (isNaN(+value)) {
			return
		}
		if (+value < 0) {
			return
		}

		if (value.length > 1 && value.charAt(0) === '0') {
			value = value.slice(1)
		}

		const inputParams = {
			min: 1,
			max: craftCreate.maxAmount,
		}

		if (
			inputParams.max.toString().length < amountValue.toString().length &&
			amountValue.toString().length < value.length
		) {
			return
		}

		if (value.length === 0) {
			setAmountValue('')
		} else {
			setAmountValue(value)
		}
	}

	const onBlurAmountValue = () => {
		const inputParams = {
			min: 1,
			max: craftCreate.maxAmount,
		}

		if (+amountValue < inputParams.min) {
			setAmountValue(inputParams.min)
		} else if (+amountValue > inputParams.max) {
			setAmountValue(inputParams.max)
		}
	}

	const onClickAmountBtn = (way: AmountWay) => {
		const inputParams = {
			min: 1,
			max: craftCreate.maxAmount,
		}

		if (way === AmountWay.Minus && +amountValue > inputParams.min) {
			setAmountValue(prev => +prev - 1)
		} else if (way === AmountWay.Plus && +amountValue < inputParams.max) {
			setAmountValue(prev => +prev + 1)
		}
	}

	const onClickCreate = () => {
		if (!craftCreate.isButtonActive) {
			return
		}
		const payload: CraftStatusPayloads[CraftStatusEvents.Confirm] = {
			amount: +amountValue,
		}
		callClient(CraftStatusEvents.Confirm, payload)
	}

	function formatTime(seconds: number, format: string) {
		const hours = Math.floor(seconds / 3600)
		const minutes = Math.floor((seconds % 3600) / 60)
		const remainingSeconds = seconds % 60

		const hh = String(hours).padStart(2, '0')
		const mm = String(minutes).padStart(2, '0')
		const ss = String(remainingSeconds).padStart(2, '0')

		return format.replace('hh', hh).replace('mm', mm).replace('ss', ss)
	}

	return (
		<div className={'_StartCraft'}>
			<RarityBg quality={craftCreate.quality} />
			<div className='content'>
				<div className='item-info'>
					<div className='item'>
						<div className='image' style={{ backgroundImage: `url(${ItemImagesSquad[`${craftCreate.image}.png`]})` }} />
						<div className='vector' />
					</div>

					<div className='info'>
						<div className='name'>{craftCreate.name}</div>
						<RarityInfo quality={craftCreate.quality} />
						<div className='line' />
						<div className='amount-container'>
							<div
								className='counter-btn'
								onClick={() => onClickAmountBtn(AmountWay.Minus)}
							>
								<div className='icon' />
							</div>

							<input
								type='text'
								value={amountValue}
								onChange={e => onChangeAmountValue(e.target.value)}
								onBlur={onBlurAmountValue}
							/>

							<div
								className='counter-btn'
								onClick={() => onClickAmountBtn(AmountWay.Plus)}
							>
								<div className='icon' />
							</div>
						</div>
						<div className='preporation-time'>
							<div className='icon' />
							<div className='text'>изготовление:</div>
							<div className='time'>
								{/*{((craftCreate.time / 60) * +amountValue).toFixed(1)} Мин*/}
								{formatTime(craftCreate.timeSec * +amountValue, 'hh:mm:ss')}
							</div>
						</div>
					</div>
				</div>
				<div className='resources-container'>
					<div className='name'>Требуемые ресурсы</div>
					<div className='resources'>
						{craftCreate.items.map((resource, idx) => resource == null ? null : (
							<div
								key={idx}
								className='resource'
								onMouseEnter={() => {
									hover.set({ ...hover.info, itemId: resource.id })
								}}
								onMouseLeave={() => {
									hover.set({ ...hover.info, itemId: null })
								}}
								style={{ opacity: resource.has >= (resource?.amount ?? 1) * +amountValue ? 1 : .5 }}
							>
								<div className='vector' />
								<div
									className='rarity'
									style={{
										background:
										QualityBackgroundRadial[resource.info.quality].color,
										opacity:
										QualityBackgroundRadial[resource.info.quality].opacity,
									}}
								/>
								<div
									className='item'
									style={{
										backgroundImage: `url(${ItemImagesSquad[`${resource.image}.png`]})`,
									}}
								/>
								<div className='amount'>X{(resource?.amount == null ? 1 : resource.amount) * +amountValue}</div>
							</div>
						))}
					</div>
				</div>

				<div className='buttons'>
					<div
						className={`confirm ${!craftCreate.isButtonActive && '-disabled'}`}
						onClick={onClickCreate}
					>
						Создать
					</div>
					<div className='cancel' onClick={close}>
						отмена
					</div>
				</div>
			</div>
		</div>
	)
}
