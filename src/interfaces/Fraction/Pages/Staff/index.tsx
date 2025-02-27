import './styles.sass'
import React from 'react'
import { useAppSelector } from '../../../../hooks/redux'
import { PageType } from '../../../../shared/Fraction/PageType'
import { callClient } from '../../../../utils/api'
import { FractionEvents, FractionStaffActionPayload } from '../../../../shared/Fraction/events'
import { StaffActions } from '../../../../shared/Fraction/StaffActions'

const PageStaff = () => {

	const { pages } = useAppSelector(state => state.fraction)
	const info = pages.find(el => el.type === PageType.Staff)
	if (!info || info.type !== PageType.Staff) {return null}
	const { list, hasControl } = info

	const getStaff = () => list.map(({ id, name, rank, lastEnter, isOnline }) => {

		return (
			<div key={id} className='item'>
				<div className={`block -status ${isOnline && '-active'}`} />
				<div className='block -name'>{name}</div>
				<div className='block -rank'>{rank.name} [{rank.number}]</div>
				<div className='block -lastEnter'>{lastEnter}</div>
				{hasControl && (
					<div className='block -actions'>
						<div className='btn -settings' onClick={() => {
							const payload: FractionStaffActionPayload = { staffId: id, actionId: StaffActions.RankUp }
							callClient(FractionEvents.StaffAction, payload)
						}} />
						{/*<div className="btn -rankUp" onClick={() => {*/}
						{/*  const payload: FractionStaffActionPayload = { staffId: id, actionId: StaffActions.RankUp }*/}
						{/*  callClient(FractionEvents.StaffAction, payload)*/}
						{/*}}/>*/}
						{/*<div className="btn -rankDown" onClick={() => {*/}
						{/*  const payload: FractionStaffActionPayload = { staffId: id, actionId: StaffActions.RankDown }*/}
						{/*  callClient(FractionEvents.StaffAction, payload)*/}
						{/*}}/>*/}
						<div className='btn -kick' onClick={() => {
							const payload: FractionStaffActionPayload = { staffId: id, actionId: StaffActions.Kick }
							callClient(FractionEvents.StaffAction, payload)
						}} />
					</div>
				)}
			</div>
		)
	})

	return (
		<div className='_PageStaff'>
			{list.length ? (
				<div className='main'>
					<div className='helpers'>
						<div className='helper -status' />
						<div className='helper -name'>Имя игрока</div>
						<div className='helper -rank'>Должность [Ранг]</div>
						<div className='helper -lastEnter'>Последний вход</div>
						{hasControl && <div className='helper -actions' />}
					</div>
					<div className='list'>{getStaff()}</div>
				</div>
			) : (
				<div className='empty'>
					<div className='col'>
						<div className='title'>Участники отсутствуют</div>
						<div className='helper'>Пригласите первых участников, используя радиальное меню: <span>Фракция / Пригласить во фракцию</span>
						</div>
					</div>
					<div className='char' />
				</div>
			)}
		</div>
	)
}

export default PageStaff