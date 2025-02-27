import './styles.sass'
import React, { useState } from 'react'
import { useAppSelector } from '../../../../hooks/redux'
import { StaffType } from '../../types'

type PropsType = {}

const PageStaffList: React.FC<PropsType> = ({}) => {
	const { staffList } = useAppSelector(state => state.bizControl)
	const [activeStaffType, setActiveStaffType] = useState<StaffType>(StaffType.Employee)

	const getList = () =>
		staffList
			.filter(el => el.type === activeStaffType)
			.map(({ name }, idx) => (
				<div key={idx} className='item'>
					<div className='name'>{name}</div>
					<div className='icon' />
				</div>
			))

	return (
		<div className='_PageStaffList'>
			<div className='header'>
				<div className='title'>Сотрудники</div>
				<div className='switch'>
					<div
						className={`item ${activeStaffType === StaffType.Employee && '-active'}`}
						onClick={() => setActiveStaffType(StaffType.Employee)}
					>
						Сотрудники: {staffList.filter(el => el.type === StaffType.Employee).length}
					</div>
					<div
						className={`item ${activeStaffType === StaffType.Worker && '-active'}`}
						onClick={() => setActiveStaffType(StaffType.Worker)}
					>
						Работники: {staffList.filter(el => el.type === StaffType.Worker).length}
					</div>
				</div>
			</div>

			<div className='list'>{getList()}</div>
		</div>
	)
}

export default PageStaffList
