import './styles.sass'
import React from 'react'
import { NavId } from '../../types'
import { NavList } from '../../config'
import { NavData } from '../../const'
import { callClient } from '../../../../utils/api'
import useSound from 'use-sound'
import { useAppSelector } from '../../../../hooks/redux'

type Props = {
	nav: NavId | null;
	setNav: (navId: NavId) => void;
	changedSettings: {
		changed: boolean;
		onClick: () => void;
	};
};

const Navbar: React.FC<Props> = ({ nav, setNav, changedSettings }) => {
	const { sfxBase } = useAppSelector(state => state.volume)
	const [playButtonHoverSfx] = useSound(require('../../../../assets/sounds/button_hover_0.mp3'), { volume: sfxBase })
	const [playButtonClickSfx] = useSound(require('../../../../assets/sounds/button_click_1.mp3'), { volume: sfxBase })

	return (
		<div className='_Navbar'>
			<div className='logo' />
			<div className='navs'>
				{NavList.map((id, idx) => {
					if (id === null) {
						return <div key={idx} className='line' />
					}
					const { title, isButton, event } = NavData[id]
					const isActive = id === nav
					return (
						<div
							key={idx}
							className={`nav ${isActive && '-active'}`}
							onClick={() => {
								playButtonClickSfx()
								if (changedSettings.changed) {
									changedSettings.onClick()
									return
								}
								if (isButton) {
									return callClient(event)
								}
								if (isActive) {
									return
								}
								setNav(id)
							}}
							onMouseOver={() => playButtonHoverSfx()}
						>
							{title}
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Navbar
