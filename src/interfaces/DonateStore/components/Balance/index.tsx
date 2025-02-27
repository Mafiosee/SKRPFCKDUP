import './styles.sass'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'
import { donateStoreActions } from '../../reducer'
import { Tab } from '../../enums/Tabs'

const Balance = () => {
	const dispatch = useAppDispatch()
	const { balance } = useAppSelector(state => state.donateStore)

	return (
		<div className='_Balance'>
			<div className='value'>{numberWithSeparator(balance, '.')}</div>
			<div className='replenish' onClick={() => dispatch(donateStoreActions.setTab(Tab.Replenish))}/>
		</div>
	)
}

export default Balance
