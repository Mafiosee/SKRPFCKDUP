import React from 'react'
import './styles.sass'
import { Quality } from '../../../../shared/inventory/itemType'
import { QualityBackgrounds } from '../../data'

type PropsType = {
	quality: Quality
}

export const RarityBg: React.FC<PropsType> = ({ quality }) => {
	return (
		<div className='_Rarity'>
			<svg
				x='0'
				y='0'
				width='100%'
				height='100%'
				viewBox='0 0 450 476'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				preserveAspectRatio={'none'}
			>
				<mask
					id='mask0_2194_118130'
					style={{ maskType: 'alpha' }}
					maskUnits='userSpaceOnUse'
					x='0'
					y='0'
					width='450'
					height='471'
				>
					<path
						fillRule='evenodd'
						clipRule='evenodd'
						d='M0 16.0285V455C8.83656 455 16 462.163 16 471H434C434 462.163 441.163 455 450 455V0H16C15.9998 8.85232 8.83642 16.0285 0 16.0285Z'
						fill='#111111'
					/>
				</mask>
				<g mask='url(#mask0_2194_118130)'>
					<g filter='url(#filter0_f_2194_118130)'>
						<ellipse
							cx='224.5'
							cy='15.0315'
							rx='191.5'
							ry='104.188'
							fill={QualityBackgrounds[quality]}
						/>
					</g>
				</g>
				<defs>
					<filter
						id='filter0_f_2194_118130'
						x='-217'
						y='-339.156'
						width='883'
						height='708.375'
						filterUnits='userSpaceOnUse'
						colorInterpolationFilters='sRGB'
					>
						<feFlood floodOpacity='0' result='BackgroundImageFix' />
						<feBlend
							mode='normal'
							in='SourceGraphic'
							in2='BackgroundImageFix'
							result='shape'
						/>
						<feGaussianBlur
							stdDeviation='125'
							result='effect1_foregroundBlur_2194_118130'
						/>
					</filter>
				</defs>
			</svg>
		</div>
	)
}
