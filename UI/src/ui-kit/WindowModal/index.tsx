import React, { useMemo } from 'react'
import './styles.sass'
import { calcVh } from '../../utils/calcVh'
import { numberWithSeparator } from '../../utils/numberWithSeparator'
import { Icon, IconComponent } from '../Icons'
import UIKitButton, { UIKitButtonProps } from '../Button'
import { UIKitTabsTab, UIKitTabsTabId } from '../Tabs/types/Tab'
import UIKitTabs from '../Tabs'
import { getColorWithOpacity } from '../../utils/getColorWithOpacity'

type Props = {
  width?: string
  title: string
  balance?: {
    cash?: number
    bank?: number
  }
  handleClose: () => void
  imageUrl?: string
  color?: string
  children: React.ReactNode
  footerButtons: UIKitButtonProps[]
  tabs?: {
    list: UIKitTabsTab[]
    activeTabId: UIKitTabsTabId
    setActiveTabId: (tabId: UIKitTabsTabId) => void
  }
}

const UIKitWindowModal: React.FC<Props> = ({
  width,
  title,
  balance,
  handleClose,
  imageUrl,
  color,
  children,
  footerButtons,
  tabs,
}) => {
  const renderedBalance = useMemo(() => {
    if (balance == null || (balance.cash == null && balance.bank == null)) {
      return null
    }
    const IconSeptim = IconComponent[Icon.CoinSeptim]
    return (
      <div className="balance">
        {balance.cash != null && (
          <div className="block -cash">
            <div className="coin">
              <IconSeptim />
            </div>
            <div className="sum">{numberWithSeparator(balance.cash, '.')}</div>
          </div>
        )}
        {balance.cash != null && balance.bank != null && (
          <div className="separator" />
        )}
        {balance.bank != null && (
          <div className="block -bank">
            <div className="coin">
              <IconSeptim />
            </div>
            <div className="sum">{numberWithSeparator(balance.bank, '.')}</div>
          </div>
        )}
      </div>
    )
  }, [balance])

  const renderedTabs = useMemo(() => {
    if (!tabs) {
      return null
    }
    return (
      <UIKitTabs
        tabs={tabs.list}
        activeTabId={tabs.activeTabId}
        setActiveTabId={tabs.setActiveTabId}
      />
    )
  }, [tabs])

  const renderedFooterButtons = useMemo(
    () =>
      footerButtons.map((props, index) => (
        <UIKitButton key={index} className="button" {...props} />
      )),
    [footerButtons],
  )

  return (
    <div
      className="UI-Kit_WindowModal"
      style={{
        width: width ?? calcVh(490),
      }}
    >
      <div className="header" style={{ backgroundColor: color }}>
        <div className="row">
          <div className="title">{title}</div>
          {renderedBalance}
        </div>
        <div className="close" onClick={handleClose} />
      </div>
      {renderedTabs}
      <div className="content">
        {color != null && (
          <div
            className="color"
            style={{
              background: `linear-gradient(180deg, ${color}, ${getColorWithOpacity(color, 0.32)}, transparent)`,
            }}
          />
        )}
        {imageUrl != null && (
          <div
            className="image"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        )}
        <div className="body">{children}</div>
      </div>
      <div className="footer">{renderedFooterButtons}</div>
    </div>
  )
}

export default UIKitWindowModal
