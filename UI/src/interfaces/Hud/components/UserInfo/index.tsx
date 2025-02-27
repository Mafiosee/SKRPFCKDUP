import React from 'react'
import './styles.sass'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'
import { useAppSelector } from '../../../../hooks/redux'
import { Zones } from '../../../../shared/Hud/types'
import { timeFormat } from '../../../../utils/time'

const ZoneInfo = {
	[Zones.SafeZone]: {
		icon: require('../../assets/images/UserInfo/zones/safe-zone.svg'),
		name: 'зеленая зона',
		color: '#42A23A',
	},
}

export const UserInfo: React.FC = () => {
	const { userInfo } = useAppSelector((state) => state.hud)
	const { health, stamina, zone, isMicrophoneEnabled, money, show } = userInfo
	const { time, date } = useAppSelector((state) => state.dateTime)

	const getProgressBarValueInPercents = (
		amount: number,
		maxAmount: number = 100,
	) => {
		if (amount > maxAmount) {
			return 100
		}
		return (amount / maxAmount) * 100
	}

	const showVerticalHealthLine = () => {
		const percents =
			100 - getProgressBarValueInPercents(health.currentHP, health.maxHP)
		return percents > 0 && percents < 100
	}

	return (
		userInfo &&
		(
			<div className={`_UserInfo`}>
				{userInfo.show && (<>
					<div className='money'>
						<div className='block'>
							<div className='coin' />
							<div className='amount'>{numberWithSeparator(money.bank, '.')}</div>
							<div className='bank-icon' />
						</div>
						<div className='line' />
						<div className='block'>
							<div className='coin' />
							<div className='amount'>{numberWithSeparator(money.cash, '.')}</div>
							<div className='cash-icon' />
						</div>
					</div>
					<div className='progress-bars'>
						<div className='health-bar'>
							<div className='bg' />
							<div className='absent-container'>
								<div
									className={`absent-vertical ${showVerticalHealthLine() && '-show'}`}
								/>
								<div
									className={`absent`}
									style={{
										width: `${100 - getProgressBarValueInPercents(health.currentHP, health.maxHP)}%`,
									}}
								/>
							</div>
						</div>
						<div className='stamina'>
							<div className='bg' />
							<div
								className='stamina-value'
								style={{
									width: `${getProgressBarValueInPercents(stamina.currentStamina, stamina.maxStamina)}%`,
								}}
							/>
						</div>
					</div>
				</>)}
				<div className='info'>
					<div className='date'>
						<div className='time'>
							{timeFormat(time.hours)}:{timeFormat(time.minutes)}
						</div>
						<div className='circle' />
						<div className='date'>{date}</div>
					</div>
					<div className='line' />
					<div className='microphone'>
						<svg
							width='13'
							height='19'
							viewBox='0 0 13 19'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M4.34375 0.875C3.55811 0.875 2.90625 1.52686 2.90625 2.3125V10.9375C2.90625 11.7231 3.55811 12.375 4.34375 12.375H8.65625C9.44189 12.375 10.0938 11.7231 10.0938 10.9375V2.3125C10.0938 1.52686 9.44189 0.875 8.65625 0.875H4.34375ZM0.03125 8.0625V10.9375C0.03125 13.3158 1.96541 15.25 4.34375 15.25H5.78125V16.6875H2.90625V18.125H10.0938V16.6875H7.21875V15.25H8.65625C11.0346 15.25 12.9688 13.3158 12.9688 10.9375V8.0625H11.5312V10.9375C11.5312 12.5231 10.2418 13.8125 8.65625 13.8125H7.21875H4.34375C2.75819 13.8125 1.46875 12.5231 1.46875 10.9375V8.0625H0.03125Z'
								fill={isMicrophoneEnabled ? 'white' : 'grey'}
							/>
						</svg>
					</div>
					{zone && (
						<>
							<div className='line' />
							<div className='zone'>
								<div
									className='icon'
									style={{
										backgroundImage: `url(${ZoneInfo[Zones.SafeZone].icon})`,
									}}
								></div>
								<div
									className='name'
									style={{ color: ZoneInfo[Zones.SafeZone].color }}
								>
									{ZoneInfo[Zones.SafeZone].name}
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		)
	)
}
