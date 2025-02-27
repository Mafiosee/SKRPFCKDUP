import './styles.sass'
import React, { useState } from 'react'
import { useAppSelector } from '../../../../hooks/redux'
import { PageType } from '../../../../shared/Fraction/PageType'
import { WantedPeds } from '../../assets/wantedPeds'
import { Gender } from '../../../../shared/characterEditor/enums/Genders'
import { RaceName } from '../../../../shared/Race/RaceName'
import { GenderNames } from '../../../SelectCharacter/components/Character'
import { FractionEvents, FractionRemoveWanted } from '../../../../shared/Fraction/events'
import { callClient } from '../../../../utils/api'

const PageWanted: React.FC = () => {

	const { pages } = useAppSelector(state => state.fraction)
	const [popupInfo, setPopupInfo] = useState({ opened: false, peopleId: null })
	const info = pages.find(el => el.type === PageType.Wanted)
	if (!info || info.type !== PageType.Wanted) {
		return null
	}
	const { wantedPeoples } = info
	const popupPeople = wantedPeoples.find(people => people.id === popupInfo.peopleId)

	const getList = () => wantedPeoples.map(people => (
		<div key={people.id} className={`people ${people?.closedInfo && '-closed'}`}
				 onClick={() => setPopupInfo({ opened: true, peopleId: people.id })}>
			<div className='ped' style={{ backgroundImage: `url(${WantedPeds[people.race][people.gender]})` }} />
			<div className={`gender ${people.gender === Gender.Female && '-female'}`} />
			<div className='content'>
				<div className='name'>{people.name}</div>
				<div className='row'>
					<div className='title'>Раса:</div>
					<div className='value'>{RaceName[people.race]}</div>
				</div>
				<div className='row'>
					<div className='title'>Причина:</div>
					<div className='value'>{people.reason.short}</div>
				</div>
				<div className='row'>
					<div className='title'>Тип:</div>
					<div className='value'>{people.type}</div>
				</div>
				<div className='row'>
					<div className='title'>Дата:</div>
					<div className='value'>{people.date}</div>
				</div>
			</div>
		</div>
	))

	return (
		<div className='_PageWanted'>
			<div className='list'>{getList()}</div>
			<div className={`popup ${popupInfo.opened && '-opened'}`}>
				{popupPeople && (
					<div className={`window ${popupPeople?.closedInfo && '-closed'}`}>
						<div className='close' onClick={() => setPopupInfo(prev => ({ ...prev, opened: false }))} />
						<div className='ped'
								 style={{ backgroundImage: `url(${WantedPeds[popupPeople.race][popupPeople.gender]})` }} />
						<div className='content'>
							<div className='name'>{popupPeople.name}</div>
							<div className='row'>
								<div className='title'>Пол:</div>
								<div className='value'>{GenderNames[popupPeople.gender]}</div>
							</div>
							<div className='row'>
								<div className='title'>Раса:</div>
								<div className='value'>{RaceName[popupPeople.race]}</div>
							</div>
							{!popupPeople?.closedInfo && <div className='row'>
								<div className='title'>Причина:</div>
								<div className='value'>{popupPeople.reason.full}</div>
							</div>}
							<div className='row'>
								<div className='title'>Тип:</div>
								<div className='value'>{popupPeople.type}</div>
							</div>
							{!popupPeople?.closedInfo && <div className='row'>
								<div className='title'>Дата:</div>
								<div className='value'>{popupPeople.date}</div>
							</div>}
							{popupPeople?.closedInfo && <>
								<div className='row'>
									<div className='title'>Посадил:</div>
									<div className='value'>{popupPeople.closedInfo.catcherName}</div>
								</div>
								<div className='row'>
									<div className='title'>Наказание до:</div>
									<div className='value'>{popupPeople.closedInfo.releaseDatetime}</div>
								</div>
								<div className='row'>
									<div className='title'>Причина:</div>
									<div className='value'>{popupPeople.reason.full}</div>
								</div>
							</>}
							<div className='button' onClick={() => {
								setPopupInfo(prev => ({ ...prev, opened: false }))
								const payload: FractionRemoveWanted = { peopleId: popupPeople.id }
								const event = popupPeople?.closedInfo ? FractionEvents.ReleaseEarly : FractionEvents.RemoveWanted
								callClient(event, payload)
							}}>{popupPeople?.closedInfo ? 'Выпустить досрочно' : 'Снять розыск'}</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default PageWanted