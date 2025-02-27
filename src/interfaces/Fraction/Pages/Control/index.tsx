import './styles.sass'
import React from 'react'
import { useAppSelector } from '../../../../hooks/redux'
import { PageType } from '../../../../shared/Fraction/PageType'
import {
	FractionEvents,
	FractionRankRemovePayload,
	FractionRankUpdatePayload,
} from '../../../../shared/Fraction/events'
import { callClient } from '../../../../utils/api'

const PageControl = () => {
	const { pages } = useAppSelector(state => state.fraction)
	const info = pages.find(el => el.type === PageType.Control)
	if (!info || info.type !== PageType.Control) return null
	const { ranks, permissions } = info

	const getRanks = () =>
		ranks.map(({ id, name, number }) => (
			<div key={id} className='rank'>
				<div className='row'>
					<div className='number'>{number}</div>
					<div className='circle' />
					<div className='name'>{name}</div>
				</div>
				<div className='buttons'>
					{permissions.updateRank && (
						<div
							className='update'
							onClick={() => {
								const payload: FractionRankUpdatePayload = { rankId: id }
								callClient(FractionEvents.RankUpdate, payload)
							}}
						/>
					)}
					{permissions.removeRank && (
						<div
							className='remove'
							onClick={() => {
								const payload: FractionRankRemovePayload = { rankId: id }
								callClient(FractionEvents.RankRemove, payload)
							}}
						/>
					)}
				</div>
			</div>
		))

	return (
		<div className='_PageControl'>
			{permissions.addRank && (
				<div className='add' onClick={() => callClient(FractionEvents.RankAdd)}>
					Новый ранг
				</div>
			)}
			<div className='ranks'>{getRanks()}</div>
		</div>
	)
}

export default PageControl
