import './styles.sass'
import React, { useState } from 'react'
import { useAppSelector } from '../../../../hooks/redux'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'
import { Period } from '../../../../shared/ProductBusiness/Statistic'

type PropsType = {}

const PageStatistic: React.FC<PropsType> = ({}) => {
	const { statistic } = useAppSelector(state => state.bizControl)
	const [activePeriod, setActivePeriod] = useState<Period>(Period.Day)

	const getList = () =>
		statistic
			.filter(el => el.period === activePeriod)
			.map(({ name, role, profitFaction, profitBiz }, idx) => (
				<div key={idx} className='item'>
					<div className='value -l'>{name}</div>
					<div className='value -l'>{role}</div>
					<div className='value -coin'>{numberWithSeparator(profitFaction, ' ')}</div>
					<div className='value -coin'>{numberWithSeparator(profitBiz, ' ')}</div>
				</div>
			))

	return (
		<div className='_PageStatistic'>
			<div className='header'>
				<div className='title'>Статистика</div>
				<div className='switch'>
					<div
						className={`item ${activePeriod === Period.Day && '-active'}`}
						onClick={() => setActivePeriod(Period.Day)}
					>
						День
					</div>
					<div
						className={`item ${activePeriod === Period.Week && '-active'}`}
						onClick={() => setActivePeriod(Period.Week)}
					>
						Неделя
					</div>
					<div
						className={`item ${activePeriod === Period.Month && '-active'}`}
						onClick={() => setActivePeriod(Period.Month)}
					>
						Месяц
					</div>
				</div>
			</div>

			<div className='titles'>
				<div className='title -l'>Никнейм</div>
				<div className='title -l'>Роль</div>
				<div className='title'>Доход: Фракция</div>
				<div className='title'>Доход: Лесопилка</div>
			</div>

			<div className='list'>{getList()}</div>
		</div>
	)
}

export default PageStatistic
