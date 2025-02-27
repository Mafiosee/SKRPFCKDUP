import './styles.sass'
import React, { useMemo } from 'react'
import { useAppSelector } from '../../../../hooks/redux'
import { VipsInfo } from '../../data/vip'
import { VipType } from '../../../../shared/Vip/types'

const VipIconUrls: Record<VipType, string> = {
	[VipType.BASIC]: require('../../assets/images/PlayerInfo/vip-started.svg'),
	[VipType.ADVANCED]: require('../../assets/images/PlayerInfo/vip-limited.svg'),
	[VipType.MAXIMUM]: require('../../assets/images/PlayerInfo/vip-legendary.svg'),
}

const PlayerInfo: React.FC = () => {
	const {
		playerInfo: { name, vip },
	} = useAppSelector(state => state.donateStore)

	const VipInfo = useMemo(() => {
		if (vip.type == null)
			return {
				name: '',
				color: 'rgba(255, 255, 255, .3)',
			}
		else return VipsInfo[vip.type]
	}, [vip])

	return (
		<div className='_PlayerInfo'>
			<div
				className='icon'
				style={{
					backgroundImage: `url(${vip.type == null ? require('../../assets/images/PlayerInfo/vip-none.svg') : VipIconUrls[vip.type]})`,
				}}
			/>
			<div className='info'>
				<div className='name'>{name}</div>
				<div className='text'>
					{vip.type == null ? (
						'VIP-Статус отсутствует'
					) : (
						<>
							<span style={{ color: VipInfo.color }}>VIP-{VipInfo.name}</span>
							{` до ${vip.endDateTime}`}
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default PlayerInfo
