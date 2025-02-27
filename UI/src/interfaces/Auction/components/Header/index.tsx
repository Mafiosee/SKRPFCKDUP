import React from 'react'
import './styles.sass'
import { TabId, TabName, TabsList } from '../../types/Tabs'

type Props = {
	activeTabId: TabId,
	setActiveTabId: (tabId: TabId) => void,
	openCreateLot: () => void
}

const Header: React.FC<Props> = ({ activeTabId, setActiveTabId, openCreateLot }) => {

	const getTabs = () => TabsList.map(tabId => {
		const isActive = activeTabId === tabId
		const setActive = () => setActiveTabId(tabId)
		const name = TabName[tabId]
		return (
			<div key={tabId} className={`tab ${isActive && '-active'}`} onClick={setActive}>{name}</div>
		)
	})

	return (
		<div className='Header'>
			<div className='tabs'>{getTabs()}</div>
			<div className='create-lot' onClick={openCreateLot}>Создать лот</div>
		</div>
	)
}

export default Header
