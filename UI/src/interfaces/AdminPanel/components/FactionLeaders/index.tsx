import React, { useEffect, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { FactionLeadersColor } from '../../../../shared/AdminPanel/type'

export const FactionLeaders: React.FC = () => {
	const { factionLeaders } = useAppSelector(state => state.adminPanel)

	const getColorBg = (color: FactionLeadersColor) => (
		<svg
			width='100%'
			height='100%'
			viewBox='0 0 272 144'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<mask
				id='mask0_7001_141858'
				// style='mask-type:alpha'
				maskUnits='userSpaceOnUse'
				x='0'
				y='0'
				width='272'
				height='144'
			>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M0 8C4.41828 8 8 4.41828 8 0H264C264 4.41828 267.582 8 272 8V136C267.582 136 264 139.582 264 144H8C8 139.582 4.41828 136 0 136V8Z'
					fill='#D9D9D9'
				/>
			</mask>
			<g mask='url(#mask0_7001_141858)'>
				<g filter='url(#filter0_f_7001_141858)'>
					<ellipse cx='42.5' cy='2.5' rx='132.5' ry='92.5' fill={color} />
				</g>
			</g>
			<defs>
				<filter
					id='filter0_f_7001_141858'
					x='-240'
					y='-240'
					width='565'
					height='485'
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'
				>
					<feFlood floodOpacity='0' result='BackgroundImageFix' />
					<feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
					<feGaussianBlur stdDeviation='75' result='effect1_foregroundBlur_7001_141858' />
				</filter>
			</defs>
		</svg>
	)

	return (
		<div className={`_FactionLeaders`}>
			<div className='leaders'>
				{factionLeaders &&
					factionLeaders.map(({ leaderName, factionName, color, lastOnline }, idx) => (
						<div key={idx} className={'leader-block'}>
							<div className='bg'>{getColorBg(color)}</div>
							<div className='content'>
								<div className='leader-name'>{leaderName}</div>
								<div className='online-status'>
									{lastOnline ? (
										<div className={'offline'}>Был в сети: {lastOnline}</div>
									) : (
										<>
											<div className={'online'}>онлайн</div>
										</>
									)}
								</div>
								<div className='line' />
								<div className='faction-name'>{factionName}</div>
							</div>
						</div>
					))}
			</div>
		</div>
	)
}
