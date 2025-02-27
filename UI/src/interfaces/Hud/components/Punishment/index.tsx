import React from 'react'
import './styles.sass'
import { useAppSelector } from '../../../../hooks/redux'

export const Punishment: React.FC = () => {
	const { punishment } = useAppSelector(state => state.hud)
	return (
		punishment.show && (
			<div className={'_Punishment'}>
				<div className='content'>
					<div className='bg' />
					<div className='bg' />
					<div className='content'>
						{punishment.blocks.map((block, idx) => (
							<div key={idx} className={'block'}>
								<div className='name'>{block.name}:</div>
								<div className='text'>{block.content}222222</div>
							</div>
						))}
					</div>
				</div>
			</div>
		)
	)
}
