import React from 'react'
import './styles.sass'
import { QualityColors } from '../../../Inventory/data'
import { QualityName } from '../../../DonateStore/data/quality'
import { Quality } from '../../../../shared/inventory/itemType'
import { QualityBackgrounds } from '../../data'

type PropsType = {
	quality: Quality
}

export const RarityInfo: React.FC<PropsType> = ({ quality }) => {
	return (
		<div className='_RarityInfo'>
			<div className='rarity'>
				<div
					className='shadow'
					style={{ backgroundColor: QualityBackgrounds[quality] }}
				/>
				<div className='icon'>
					<svg
						width='100%'
						height='100%'
						viewBox='0 0 20 20'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M0.625 10L10 0.625L19.375 10L10 19.375L0.625 10Z'
							stroke='white'
							strokeOpacity='0.16'
							strokeWidth='0.5'
						/>
						<path
							d='M1.25 10L10 1.25L18.75 10L10 18.75L1.25 10Z'
							fill='url(#paint0_radial_2565_136985)'
						/>
						<path
							d='M12.3717 7.02583C10.8257 7.00846 7.59292 7 7.59292 7L5.5 9.53018L9.9862 14.5L14.5 9.53226C14.5 9.53226 13.0077 7.76303 12.3717 7.02583ZM11.5553 8.80144L10.5368 7.5794C11.0164 7.57524 11.4958 7.57094 11.9765 7.565L11.5553 8.80144ZM11.0145 9.18741C10.6946 9.19187 10.3762 9.19632 10.0577 9.20374L8.81348 9.22898L9.97841 7.70143L11.0145 9.18741ZM12.538 8.11961C12.7932 8.46906 13.0486 8.8154 13.3028 9.15817L12.9764 9.16218L12.1795 9.17257L12.538 8.11961ZM7.85167 7.59321C8.38856 7.59291 8.92516 7.59024 9.46177 7.58727L8.36053 9.03006L7.9642 7.94785L7.63298 8.42586L7.93447 9.24828L7.04414 9.27351L6.87287 9.52143L7.02998 9.76785L8.11141 9.79903L10.0577 9.83911C10.706 9.85395 11.3557 9.85841 12.004 9.86732L12.9764 9.88068L13.2292 9.88379L10.9896 12.4695L11.8992 10.2503L11.1391 10.2236L9.97417 13.0664L8.66769 10.1345L8.15528 10.1152L9.11667 12.673L6.26393 9.51267L7.85167 7.59321Z'
							fill='white'
						/>
						<defs>
							<radialGradient
								id='paint0_radial_2565_136985'
								cx='0'
								cy='0'
								r='1'
								gradientUnits='userSpaceOnUse'
								gradientTransform='translate(10 10) rotate(90) scale(8.75)'
							>
								<stop offset='0.0001' stopColor='#399241' stopOpacity='0' />
								<stop offset='1' stopColor={QualityBackgrounds[quality]} />
							</radialGradient>
						</defs>
					</svg>
				</div>
			</div>
			<div className='text' style={{ color: QualityColors[quality] }}>
				{QualityName[quality]}
			</div>
		</div>
	)
}
