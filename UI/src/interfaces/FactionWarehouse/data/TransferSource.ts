import { UIKitTabsTab } from '../../../ui-kit/Tabs/types/Tab'
import { TransferSource } from '../../../shared/FactionWarehouse/TransferSource'

export const TransferSourceName: Record<TransferSource, string> = {
  [TransferSource.Warehouse]: 'Склад',
  [TransferSource.Inventory]: 'Инвентарь',
}

export const TransferSourceList: UIKitTabsTab[] = Object.values(
  TransferSource,
).map((source) => ({
  id: source,
  name: TransferSourceName[source],
}))
