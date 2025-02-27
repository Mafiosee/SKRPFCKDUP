import './styles.sass'
import React, { useMemo } from 'react'
import { useAppSelector } from '../../../../hooks/redux'
import { TabId, TabList, TabName } from '../../types/Tabs'

type Props = {
  activeTabId: TabId
  setActiveTabId: (tabId: TabId) => void
}

const Header: React.FC<Props> = ({ activeTabId, setActiveTabId }) => {
  const { info } = useAppSelector((state) => state.productBusinesses)

  const renderedTabs = useMemo(
    () =>
      TabList.map((tabId) => {
        const isActive = tabId === activeTabId
        const setActive = () => setActiveTabId(tabId)

        return (
          <div
            key={tabId}
            className={`tab ${isActive && '-active'}`}
            onClick={setActive}
          >
            {TabName[tabId]}
          </div>
        )
      }),
    [activeTabId],
  )

  return (
    <div className="_Header">
      <div className="title">{info.title}</div>
      <div className="tabs">
        <div className="content">{renderedTabs}</div>
      </div>
    </div>
  )
}

export default Header
