import React, { useMemo } from 'react'
import './styles.sass'
import { useAppSelector } from '../../../../hooks/redux'
import { KeyCodeByDxCode } from '../../../../utils/SkyrimKeyCodes'
import { KeyNames } from '../../../../utils/keyNames'
import { KeyCodes } from '../../../../utils/keyCodes'


const mouseKeys = [
	KeyCodes.LeftMouseButton,
	KeyCodes.MiddleMouseButton,
	KeyCodes.RightMouseButton,
	KeyCodes.MouseButton3,
	KeyCodes.MouseButton4,
]
const mouseImages = {
	[KeyCodes.LeftMouseButton]: require('../../assets/images/mouse/left.svg'),
	[KeyCodes.MiddleMouseButton]: require('../../assets/images/mouse/middle.svg'),
	[KeyCodes.RightMouseButton]: require('../../assets/images/mouse/right.svg'),
	[KeyCodes.MouseButton3]: require('../../assets/images/mouse/add3.svg'),
	[KeyCodes.MouseButton4]: require('../../assets/images/mouse/add4.svg'),
}

export const Keys: React.FC = () => {
	const { binds } = useAppSelector((state) => state.hud)

	const bindList = useMemo(() => binds.map(({ name, key, modifier }, index) => {
		const keyCode = KeyCodeByDxCode[key]
		let keyElement
		if (mouseKeys.includes(keyCode)) {
			// @ts-expect-error qwe
			keyElement = <div className='mouse' style={{ backgroundImage: `url(${mouseImages[keyCode]})` }} />
		} else {
			// @ts-expect-error qwe
			const keyName = KeyNames[keyCode]
			keyElement = <div className='key'>
				<div className='center'>
					{modifier != null && `${modifier} + `}{keyName}
				</div>
			</div>
		}

		return (
			<div key={index} className='bind'>
				{keyElement}
				<div className='name'>{name}</div>
			</div>
		)
	}), [binds])

	return ((
			<div className='_Keys'>
				{bindList}
			</div>
		)
	)
}
