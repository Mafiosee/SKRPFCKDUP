import './styles.sass'
import React from 'react'
import { useAppSelector } from '../../../../hooks/redux'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'
import { callClient } from '../../../../utils/api'
import { BizControlEvents } from '../../api'

type PropsType = {}

const PageRent: React.FC<PropsType> = ({}) => {
	const { rentSum, rentList } = useAppSelector(state => state.bizControl)

	const getList = () =>
		rentList.map(({ datetime, sum }, idx) => (
			<div key={idx} className='item'>
				<div className='datetime'>{datetime}</div>
				<div className='sum'>{numberWithSeparator(sum, ' ')}</div>
			</div>
		))

	return (
		<div className='_PageRent'>
			<div className='block'>
				<div className='col'>
					<div className='title'>Сумма оплаты:</div>
					<div className='value'>{numberWithSeparator(rentSum, ' ')}</div>
				</div>
				<div className='button' onClick={() => callClient(BizControlEvents.PayRent)}>
					Оплатить
				</div>
			</div>
			<div className='helper'>Пополнения</div>
			<div className='list'>{getList()}</div>
		</div>
	)
}

export default PageRent
