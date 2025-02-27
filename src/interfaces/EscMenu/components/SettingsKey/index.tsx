import './styles.sass'
import React, { useCallback, useEffect, useState } from 'react'
import { EscMenuEvents, UpdateSettingValuePayload } from '../../api'
import { callClient } from '../../../../utils/api'
import { KeyNames, MouseButtonNames } from '../../../../utils/keyNames'
import { SettingParameterData } from '../../../../shared/settings/SettingParameterData'
import { getDxCodeByKeyCode, KeyCodeByDxCode, KeyCodeByMouseButton } from '../../../../utils/SkyrimKeyCodes'
import { KeyCodes } from '../../../../utils/keyCodes'
import { MouseButton } from '../../../../types/mouseButton'
import { escMenuActions } from '../../reducer'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { SettingParameterType } from '../../../../shared/settings/SettingParameterType'
import { SettingParameter } from '../../../../shared/settings/SettingSectionId'
import { InputDeviceType } from '../../../../shared/binder/InputDeviceType'

type Props = {
	settingId: any;
	data: SettingParameterData;
};

const SettingsKey: React.FC<Props> = ({ data, settingId }) => {
	const dispatch = useAppDispatch()
	const { settings } = useAppSelector(state => state.escMenu)
	const [isChange, setIsChange] = useState(false)
	const [activeModifier, setActiveModifier] = useState<KeyCodes | null>(null)
	const [isError, setIsError] = useState(false)

	useEffect(() => {
		window.globalBlocked = isChange
		if (!isChange) {
			setActiveModifier(null)
		}
	}, [isChange])

	const keyDownHandler = useCallback(
		(event: KeyboardEvent) => {
			if (!isChange || !settings) {
				return
			}
			const { keyCode } = event
			switch (keyCode) {
				case KeyCodes.LeftShift:
				case KeyCodes.LeftControl:
				case KeyCodes.LeftAlt: {
					setActiveModifier(keyCode)
					break
				}
				case 0:
					break
				default: {
					setIsChange(false)
					if (!settings) {
						return
					}
					const payload: UpdateSettingValuePayload = {
						settingId,
						newValue: {
							deviceType: InputDeviceType.Keyboard,
							codes: [+getDxCodeByKeyCode(keyCode)],
						},
					}
					if (activeModifier !== null) {
						payload.newValue.codes.unshift(+getDxCodeByKeyCode(activeModifier))
					}
					const keySettings: SettingParameter[] = []
					Object.values(settings).forEach(sections => {
						sections.forEach(section => {
							if (Array.isArray(section?.parameters)) {
								section.parameters.forEach(parameter => {
									if (parameter.type === SettingParameterType.Bind) {
										keySettings.push({
											...parameter,
											data: { ...parameter.data, current: parameter.data.current.codes.join(' ') },
										})
									}
								})
							}
						})
					})
					if (keySettings.find(setting => setting.data.current === payload.newValue.codes.join(' '))) {
						setIsError(true)
					} else {
						callClient(EscMenuEvents.UpdateSettingValue, payload)
						dispatch(escMenuActions.setChangedSettings(true))
					}
					break
				}
			}
		},
		[isChange, activeModifier, settings, dispatch],
	)

	useEffect(() => {
		window.removeEventListener('keyup', keyDownHandler)
		window.addEventListener('keyup', keyDownHandler)
		return () => {
			window.removeEventListener('keyup', keyDownHandler)
		}
	}, [keyDownHandler])

	const keyUpHandler = useCallback((event: KeyboardEvent) => {
		const { keyCode } = event
		switch (keyCode) {
			case KeyCodes.LeftShift:
			case KeyCodes.LeftControl:
			case KeyCodes.LeftAlt: {
				setActiveModifier(null)
				break
			}
		}
	}, [])

	useEffect(() => {
		window.removeEventListener('keyup', keyUpHandler)
		window.addEventListener('keyup', keyUpHandler)
		return () => {
			window.removeEventListener('keyup', keyUpHandler)
		}
	}, [keyUpHandler])

	const mouseDownHandler = useCallback(
		(event: MouseEvent) => {
			if (!isChange) {
				return
			}
			setIsChange(false)
			const { button } = event
			let keyCode = null
			switch (button) {
				case MouseButton.Left:
				case MouseButton.Middle:
				case MouseButton.Right:
				case MouseButton.Additional3:
				case MouseButton.Additional4:
					keyCode = KeyCodeByMouseButton[button]
			}
			if (keyCode == null) {
				return
			}
			const payload: UpdateSettingValuePayload = {
				settingId,
				newValue: {
					deviceType: InputDeviceType.Mouse,
					codes: [+getDxCodeByKeyCode(keyCode)],
				},
			}
			// if (activeModifier !== null) {
			// 	payload.newValue.unshift(+getDxCodeByKeyCode(activeModifier))
			// }
			const keySettings: SettingParameter[] = []
			Object.values(settings).forEach(sections => {
				sections.forEach(section => {
					if (Array.isArray(section?.parameters)) {
						section.parameters.forEach(parameter => {
							if (parameter.type === SettingParameterType.Bind) {
								keySettings.push({
									...parameter,
									data: { ...parameter.data, current: parameter.data.current.codes.join(' ') },
								})
							}
						})
					}
				})
			})
			if (!keySettings.find(setting => setting.data.current === payload.newValue.codes.join(' '))) {
				callClient(EscMenuEvents.UpdateSettingValue, payload)
				dispatch(escMenuActions.setChangedSettings(true))
			}
		},
		[activeModifier, isChange, settingId],
	)

	useEffect(() => {
		window.removeEventListener('mousedown', mouseDownHandler)
		window.addEventListener('mousedown', mouseDownHandler)
		return () => {
			window.removeEventListener('mousedown', mouseDownHandler)
		}
	}, [mouseDownHandler])

	const getCurrentName = (): string => {
		if (data.current.deviceType === InputDeviceType.Keyboard) {
			// @ts-expect-error qwe
			return data.current.codes.map((dxCode) => KeyNames[KeyCodeByDxCode[dxCode]])
				.join(' + ')
		} else if (data.current.deviceType === InputDeviceType.Mouse) {
			return MouseButtonNames[KeyCodeByDxCode[data.current.codes[0]]]
		} else {
			return ''
		}
	}

	return (
		<div
			// @ts-expect-error qwe
			className={`_SettingsKey ${(data?.isBlocked || isChange) && '-disabled'} ${isError && '-error'}`}
			onClick={() => {
				// @ts-expect-error qwe
				if (data?.isBlocked || isChange) {
					return
				}
				setIsError(false)
				setIsChange(true)
			}}
		>
			{isChange ? 'Нажмите клавишу' : getCurrentName()}
		</div>
	)
}

export default SettingsKey
