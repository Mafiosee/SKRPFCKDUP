import './styles.sass'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { Tab } from '../../enums/Tabs'
import { donateStoreActions } from '../../reducer'

const TabList = [
	{ id: Tab.Store, name: 'Магазин' },
	{ id: Tab.Cases, name: 'Кейсы' },
	{ id: Tab.Replenish, name: 'Пополнение' },
	{ id: Tab.Services, name: 'Услуги' },
	{ id: Tab.Vips, name: 'VIP-Статусы' },
	{ id: Tab.Warehouse, name: 'Склад' },
]

const Navbar = () => {
	const dispatch = useAppDispatch()
	const { tab } = useAppSelector(state => state.donateStore)

	const getTabs = () =>
		TabList.map(({ id, name }) => {
			const isActive = tab === id
			const setActive = () => dispatch(donateStoreActions.setTab(id))

			return (
				<div
					key={id}
					className={`tab ${isActive && '-active'}`}
					onClick={setActive}
				>
					<div className='name'>
						<div className='shadow' />
						<div className='value'>{name}</div>
					</div>
				</div>
			)
		})

	return <div className='__Navbar'>{getTabs()}</div>
}

export default Navbar
