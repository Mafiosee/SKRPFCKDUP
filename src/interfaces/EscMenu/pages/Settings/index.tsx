import './styles.sass'
import React, { useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { SettingsTabList } from '../../config'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import SettingsSelect from '../../components/SettingsSelect'
import SettingsCheckbox from '../../components/SettingsCheckbox'
import SettingsRange from '../../components/SettingsRange'
import SettingsInput from '../../components/SettingsInput'
import SettingsList from '../../components/SettingsList'
import SettingsKey from '../../components/SettingsKey'
import { SettingsTabId } from '../../../../shared/settings/SettingsTabId'
import { SettingParameterType } from '../../../../shared/settings/SettingParameterType'
import { SettingsTabData } from '../../const'
import { SettingParameter } from '../../../../shared/settings/SettingSectionId'
import { callClient } from '../../../../utils/api'
import { EscMenuEvents } from '../../../../shared/settings/events'
import { ConfirmWindow } from '../../components/ConfirmWindow'
import { escMenuActions } from '../../reducer'
import Chat from './Chat'

type Props = {
	isShow: boolean;
};

const Settings: React.FC<Props> = ({ isShow }) => {
	const dispatch = useAppDispatch()
	const { changedSettings, showSettingsConfirmWindow } = useAppSelector(
		(state) => state.escMenu,
	)
	const nodeRef = useRef<HTMLDivElement>(null)
	const [tab, setTab] = useState<SettingsTabId>(SettingsTabId.GameProcess)
	const { settings } = useAppSelector((state) => state.escMenu)

	const saveSettings = () => {
		if (!changedSettings) {
			return
		}
		callClient(EscMenuEvents.SaveSettings)
		dispatch(escMenuActions.saveSettings())
	}

	useEffect(() => {
		if (tab === SettingsTabId.Chat || settings[tab].length) {
			return
		}
		for (const tabId in SettingsTabList) {
			if (!settings[tabId as SettingsTabId]?.length) {
				continue
			}
			setTab(tabId as SettingsTabId)
			break
		}
	}, [settings, tab])

	const getTabBar = () =>
		SettingsTabList.map((tabId) => {
			if (!settings[tabId].length || !settings[tabId].filter(section => section?.parameters.length).length) {
				return null
			}
			const isActive = tab === tabId
			const { title } = SettingsTabData[tabId]
			return (
				<div
					key={tabId}
					className={`tab ${isActive && '-active'}`}
					onClick={() => {
						if (isActive) {
							return
						}
						setTab(tabId)
					}}
				>
					<div className='active' />
					<div className='title'>{title}</div>
				</div>
			)
		})

	const getParameterComponent = (
		parameter: SettingParameter,
	): React.ReactNode => {
		switch (parameter.type) {
			case SettingParameterType.Select:
				return (
					<SettingsSelect data={parameter.data} settingId={parameter.id} />
				)

			case SettingParameterType.Checkbox:
				return (
					<SettingsCheckbox data={parameter.data} settingId={parameter.id} />
				)

			case SettingParameterType.Range:
				return <SettingsRange data={parameter.data} settingId={parameter.id} />

			case SettingParameterType.Input:
				return <SettingsInput data={parameter.data} settingId={parameter.id} />

			case SettingParameterType.List:
				return <SettingsList data={parameter.data} settingId={parameter.id} />

			case SettingParameterType.Bind:
				return <SettingsKey data={parameter.data} settingId={parameter.id} />

			default:
				return null
		}
	}

	const hideConfirmWindow = () => {
		dispatch(escMenuActions.setShowSettingsConfirmWindow(false))
	}

	const getOldSettings = () => {
		callClient(EscMenuEvents.GetOldSettings)
		hideConfirmWindow()
		dispatch(escMenuActions.setChangedSettings(false))
	}

	const getCurrentTab = () => {
		if (tab === SettingsTabId.Chat) {
			return <Chat />
		}
		return settings[tab].map((section, sectionIdx) =>
			!section.parameters.length ? null : (
				<div key={sectionIdx} className='section'>
					<div className='title'>{section.title}</div>
					<div className='parameters'>
						{section.parameters.map((parameter, parameterIdx) => (
							<div key={parameterIdx} className='parameter'>
								<div className='title'>{parameter.title}</div>
								<div className='component'>
									{getParameterComponent(parameter)}
								</div>
							</div>
						))}
					</div>
				</div>
			),
		)
	}

	return (
		<CSSTransition
			in={isShow}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='_PageSettings'
			nodeRef={nodeRef}
		>
			<div className='_PageSettings' ref={nodeRef}>
				<div className='title'>Настройки</div>
				<div className='body'>
					<div className='tabs'>
						<div className='line' />
						<div className='list'>
							{getTabBar()}
							{/*<div*/}
							{/*  className={`tab ${tab === SettingsTabId.Chat && "-active"}`}*/}
							{/*  onClick={() => {*/}
							{/*    if (tab === SettingsTabId.Chat) {*/}
							{/*      return;*/}
							{/*    }*/}
							{/*    setTab(SettingsTabId.Chat);*/}
							{/*  }}*/}
							{/*>*/}
							{/*  <div className="active" />*/}
							{/*  <div className="title">*/}
							{/*    {SettingsTabData[SettingsTabId.Chat].title}*/}
							{/*  </div>*/}
							{/*</div>*/}
						</div>
					</div>
					<div className={`tab ${tab !== SettingsTabId.Chat && '-small'}`}>
						{getCurrentTab()}
					</div>
					{tab !== SettingsTabId.Chat && (
						<div
							className={`confirm-btn ${!changedSettings && '-disabled'}`}
							onClick={saveSettings}
						>
							Сохранить
						</div>
					)}

					{showSettingsConfirmWindow && (
						<ConfirmWindow
							blockName={'Подтверждение'}
							text={'Вы хотите сохранить настройки?'}
							confirm={{ name: 'сохранить', onClick: saveSettings }}
							exit={{ onClick: hideConfirmWindow }}
							cancel={{ name: 'отмена', onClick: getOldSettings }}
						/>
					)}
				</div>
			</div>
		</CSSTransition>
	)
}

export default Settings
