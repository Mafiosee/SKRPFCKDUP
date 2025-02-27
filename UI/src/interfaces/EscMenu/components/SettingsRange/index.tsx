import './styles.sass'
import React, { useEffect, useState } from 'react'
import { SettingParameterData, SettingParameterType } from '../../types'
import { callClient } from '../../../../utils/api'
import Slider from 'rc-slider'
import { EscMenuEvents, UpdateSettingValuePayload } from '../../api'
import { useAppDispatch } from '../../../../hooks/redux'
import { escMenuActions } from '../../reducer'
import useSound from 'use-sound'

type Props = {
	settingId: any;
	data: SettingParameterData[SettingParameterType.Range];
};

const SettingsRange: React.FC<Props> = ({ data, settingId }) => {
	const dispatch = useAppDispatch()
	const [value, setValue] = useState(0)

	useEffect(() => {
		setValue(data.current)
	}, [data.current])

	return (
		<div className='_SettingsRange'>
			<div className='slider'>
				<Slider
					min={data.min}
					max={data.max}
					step={data.step}
					value={value}
					onChange={(newValue) => {
						if (Array.isArray(newValue)) {
							return
						}
						const payload: UpdateSettingValuePayload = {
							settingId,
							newValue,
						}
						callClient(EscMenuEvents.UpdateSettingValue, payload)
						setValue(newValue)
						dispatch(escMenuActions.setChangedSettings(true))
					}}
					keyboard={false}
				/>
			</div>
			<div className='helper'>{value}</div>
		</div>
	)
}

export default SettingsRange
