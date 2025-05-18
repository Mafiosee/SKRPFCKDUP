import React, { useMemo } from 'react'
import './styles.sass'
import { UIKitTabsTab, UIKitTabsTabId } from './types/Tab'
import { UIKitSize, UIKitSizeClass } from '../types/Size'

type Props = {
  className?: string
  size?: UIKitSize
  tabs: UIKitTabsTab[]
  activeTabId: UIKitTabsTabId
  setActiveTabId: (tabId: UIKitTabsTabId) => void
  allSidesBorder?: boolean
}

const UIKitTabs: React.FC<Props> = ({
  className,
  size = UIKitSize.Large,
  tabs,
  activeTabId,
  setActiveTabId,
  allSidesBorder,
}) => {
  const classes = useMemo(
    () =>
      [
        className,
        UIKitSizeClass[size],
        allSidesBorder && '-allSidesBorder',
      ].join(' '),
    [className, size, allSidesBorder],
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
