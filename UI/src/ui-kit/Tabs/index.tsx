import React, { useMemo } from 'react'
import './styles.sass'
import { UIKitTabsSize, UIKitTabsSizeClass } from './data/Size'
import { UIKitTabsTab, UIKitTabsTabId } from './types/Tab'

type Props = {
  size?: UIKitTabsSize
  tabs: UIKitTabsTab[]
  activeTabId: UIKitTabsTabId
  setActiveTabId: (tabId: UIKitTabsTabId) => void
  allSidesBorder?: boolean
}

const UIKitTabs: React.FC<Props> = ({
  size = UIKitTabsSize.Large,
  tabs,
  activeTabId,
  setActiveTabId,
  allSidesBorder,
}) => {
  const classes = useMemo(
    () =>
      [UIKitTabsSizeClass[size], allSidesBorder && '-allSidesBorder'].join(' '),
    [size],
  )

  const renderedTabs = useMemo(
    () =>
      tabs.map((tab) => {
        const isActive = tab.id === activeTabId
        const setActive = () => setActiveTabId(tab.id)

        return (
          <div
            key={tab.id}
            className={`tab ${isActive && '-active'}`}
            onClick={setActive}
          >
            {tab.name}
          </div>
        )
      }),
    [tabs, activeTabId],
  )

  return <div className={`UI-Kit_Tabs ${classes}`}>{renderedTabs}</div>
}

export default UIKitTabs
