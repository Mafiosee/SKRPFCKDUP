import './styles.sass'
import React from 'react'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'

type RealtyType = 'House' | 'Business' | 'Faction'

type HBInfoType = {
	name: string
	has: boolean
	date: string
	rent: number
}

type FInfoType = {
	name: string
	has: boolean
	balance: number
}

type PropsType = {
	state: boolean
	setState: (state: boolean) => void
	realty: RealtyType
	info: HBInfoType | FInfoType
}

enum RealtyCards {
	House,
	Business,
	Faction,
}

enum RealtyBackgrounds {
	House = require('../../assets/images/cards/house-bg.png'),
	Business = require('../../assets/images/cards/business-bg.png'),
	Faction = require('../../assets/images/cards/faction-bg.png'),
}

const RealtyNames = {
	[RealtyCards.House]: 'Дом',
	[RealtyCards.Business]: 'Бизнес',
	[RealtyCards.Faction]: 'Фракция',
}

const Card: React.FC<PropsType> = ({ state, setState, realty, info }) => {
	const onClickCard = () => {
		if (!info.has) {return}
		setState(true)
	}

	const backgroundImage = `url(${RealtyBackgrounds[realty]})`

	return (
		<div className={`_Card ${info.has ? '-has' : '-not'}`} onClick={onClickCard}>
			<div className='frame' />
			<div
				className='image'
				style={{ backgroundImage, filter: `grayscale(${!info.has && '100%'})` }}
			/>
			<div className={`shadow ${info.has && '-has'}`} />
			{state && <div className={'-selected'}></div>}
			{info.has && <div className='hovered-shadow' />}
			<div className='content'>
				<div className='info'>
					<div className='name'>{RealtyNames[RealtyCards[realty]]}</div>
					<div className='line' />
					{'rent' in info && info.has && (
						<>
							<div className='text'>
								<span>АРЕНДА ДО: </span>
								<span>{info.date}</span>
							</div>
						</>
					)}
					{'balance' in info && info.has && (
						<>
							<div className='text'>
								<span>Баланс счета:</span>
								<div className='icon' />
								<span>{numberWithSeparator(info.balance, '.')}</span>
							</div>
						</>
					)}

					{!info.has && <div className={'lock'} />}
				</div>
			</div>
		</div>
	)
}

export default Card
