import { TransferItem } from './TransferItem'
import { TransferSource } from './TransferSource'

export enum FactionWarehouseEvents {
  Close = 'factionWarehouse:close',
  TransferItems = 'factionWarehouse:transferItems',
}

export type FactionWarehousePayloads = {
  [FactionWarehouseEvents.Close]: undefined
  [FactionWarehouseEvents.TransferItems]: {
    source: TransferSource
    items: TransferItem[]
  }
}
