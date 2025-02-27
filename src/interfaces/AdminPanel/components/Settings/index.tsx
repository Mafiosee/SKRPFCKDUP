import React, { useEffect, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import {
	AdminPanelSettingsTypes,
	SettingInfo,
	SettingsInfoContentType,
} from '../../../../shared/AdminPanel/type'
import { adminPanelActions } from '../../reducer'
import { callClient } from '../../../../utils/api'
import {
	AdminPanelEvents, AdminPanelPayloads,
} from '../../../../shared/AdminPanel/events'

export const Settings: React.FC = () => {
	const { settings } = useAppSelector(state => state.adminPanel)
	const dispatch = useAppDispatch()

	const [activeSettingId, setActiveSettingId] = useState(null)
	const [unsavedSettingIds, setUnsavedSettingIds] = useState([])

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (activeSettingId !== null) {
				const targetSetting = settings.find(setting => setting.id === activeSettingId)
				if (targetSetting.type === AdminPanelSettingsTypes.Key) {
					const newSettingInfo: SettingInfo = {
						...targetSetting,
						content: event.key,
					}
					dispatch(adminPanelActions.updateSetting(newSettingInfo))

					setActiveSettingId(null)
				}
			}
		}

		window.addEventListener('keyup', handleKeyDown)

		return () => {
			window.removeEventListener('keyup', handleKeyDown)
		}
	}, [dispatch, settings, activeSettingId])

	const onClickButtonElement = (setting: SettingInfo) => {
		callClient(AdminPanelEvents.ChangeSetting)
	}

	const onClickToggleElement = (setting: SettingInfo) => {
		const newSettingInfo: SettingInfo = {
			...setting,
			content: !setting.content,
		}
		dispatch(adminPanelActions.updateSetting(newSettingInfo))

		const payload: AdminPanelPayloads[AdminPanelEvents.ChangeSetting] = {
			settingId: setting.id,
			content: setting.content,
		}
		callClient(AdminPanelEvents.ChangeSetting, payload)
	}

	const onClickKeyboardSetting = (settingId: number) => {
		setActiveSettingId(settingId)
		if (unsavedSettingIds.includes(settingId)) {return}
		setUnsavedSettingIds([...unsavedSettingIds, settingId])
	}

	const onClickSaveChanges = (settingId: number, content: SettingsInfoContentType) => {
		if (!unsavedSettingIds.includes(settingId)) {return}

		const payload: AdminPanelPayloads[AdminPanelEvents.ChangeSetting] = {
			settingId: settingId,
			content: content,
		}
		callClient(AdminPanelEvents.ChangeSetting, payload)

		const indexUnsavedSetting = unsavedSettingIds.indexOf(settingId)

		if (indexUnsavedSetting === -1) {return}

		const tempUnsavedSettings = [...unsavedSettingIds]
		tempUnsavedSettings.splice(indexUnsavedSetting, 1)

		setUnsavedSettingIds(tempUnsavedSettings)
	}

	const getFunctionalSettings = () => {
		return settings
			.filter(setting => setting.type !== AdminPanelSettingsTypes.Key)
			.map((setting, idx) => {
				switch (setting.type) {
					case AdminPanelSettingsTypes.Button:
						return (
							<div key={idx} className={'setting-block'}>
								<div className='button-element' onClick={() => onClickButtonElement(setting)}>
									<div className='icon' />
									<div className='text'>{`Экранные элементы`}</div>
								</div>
								<div className='line' />
							</div>
						)
					case AdminPanelSettingsTypes.Switch:
						return (
							<div key={idx} className={'setting-block'}>
								<div className='toggle-element' onClick={() => onClickToggleElement(setting)}>
									<div className='text'>ГМ</div>
									<div className={`toggle-container ${setting.content ? '-on' : '-off'}`}>
										<div className={`bg`} />
										<div className={`toggle-switch`} />
									</div>
								</div>
								<div className='line' />
							</div>
						)
				}
			})
	}

	const getKeyboardsSettings = () => {
		return settings
			.filter(setting => setting.type === AdminPanelSettingsTypes.Key)
			.map((setting, idx) => {
				return (
					<div key={idx} className={'setting-block'}>
						<div className='key-container'>
							<div className='text'>{setting.text}</div>
							<div className='change-key-container'>
								<div
									className={`key ${unsavedSettingIds.includes(setting.id) && '-unsaved'} ${activeSettingId === setting.id && '-active'}`}
									onClick={() => onClickKeyboardSetting(setting.id)}
								>
									{setting.content}
								</div>
								<div
									className='btn'
									onClick={() => onClickSaveChanges(setting.id, setting.content)}
								>
									<div className='icon' />
								</div>
							</div>
						</div>
						<div className='line'></div>
					</div>
				)
			})
	}
	return (
		<div className={`_SettingsAdminPanel`}>
			{settings && (
				<>
					<div className='card'>
						<div className='content'>
							<div className='name'>Функциональные настройки</div>
							<div className='elements'>{getFunctionalSettings()}</div>
						</div>
					</div>
					<div className='card'>
						<div className='content'>
							<div className='name'>Настройки клавиш</div>
							<div className='elements'>{getKeyboardsSettings()}</div>
						</div>
					</div>
				</>
			)}
		</div>
	)
}
