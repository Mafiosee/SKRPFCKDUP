import './styles.sass'
import React, { useCallback, useEffect, useState } from 'react'
import { useAppSelector } from '../../../../hooks/redux'
import { BizControlEvents, StaffKickPayload, StaffRankUpPayload } from '../../api'
import { callClient } from '../../../../utils/api'

type PropsType = {}

const PageStaffControl: React.FC<PropsType> = ({}) => {
	const { staffControl } = useAppSelector(state => state.bizControl)
	const [activeStaffId, setActiveStaffId] = useState<any>(null)

	const onClickHandler = useCallback(() => {
		setActiveStaffId(null)
	}, [])

	useEffect(() => {
		addEventListener('click', onClickHandler)
		return () => removeEventListener('click', onClickHandler)
	}, [onClickHandler])

	const getList = () =>
		staffControl.map(({ id, name, rank }, idx) => (
			<div key={idx} className='item'>
				<div className='value -name'>{name}</div>
				<div className='value -rank'>
					{rank.title} [{rank.number}]
				</div>
				<div className='value -action'>
					<div
						className={`button ${activeStaffId === id && '-active'}`}
						onClick={event => {
							event.stopPropagation()
							setActiveStaffId(id)
						}}
					>
						<div className='list'>
							<div
								className='item'
								onClick={event => {
									event.stopPropagation()
									const payload: StaffRankUpPayload = { staffId: id }
									callClient(BizControlEvents.StaffRankUp, payload)
									setActiveStaffId(null)
								}}
							>
								Повысить
							</div>
							<div
								className='item -red'
								onClick={event => {
									event.stopPropagation()
									const payload: StaffKickPayload = { staffId: id }
									callClient(BizControlEvents.StaffKick, payload)
									setActiveStaffId(null)
								}}
							>
								Исключить
							</div>
						</div>
					</div>
				</div>
			</div>
		))

	return (
		<div className='_PageStaffControl'>
			<div className='title'>Управление составом</div>

			<div className='titles'>
				<div className='title -name'>Никнейм</div>
				<div className='title -rank'>Должность</div>
				<div className='title -action'>Действие</div>
			</div>

			<div className='list'>{getList()}</div>
		</div>
	)
}

export default PageStaffControl
