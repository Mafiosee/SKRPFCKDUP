import React from 'react'
import './styles.sass'
import { useAppSelector } from '../../../../hooks/redux'

export const KillList = () => {
	const { killList } = useAppSelector(state => state.hud)
	return (
		killList.show ? (
			<div className={'_KillList'}>
				{killList.kills.map((kill, idx) => (
					<div key={idx} className={'kill-container'}>
						<div className='bg' />

						<div className='content'>
							<div className='player-block'>
								<div className='eclipse' style={{ backgroundColor: kill.killer.color }} />
								<div className='name'>{kill.killer.name}</div>
							</div>
							<div className='icon' />
							<div className='player-block'>
								<div className='eclipse' style={{ backgroundColor: kill.victim.color }} />
								<div className='name'>{kill.victim.name}</div>
							</div>
						</div>
					</div>
				))}
			</div>
		) : null
	)
}
