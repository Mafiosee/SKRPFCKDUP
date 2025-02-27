import { Grids } from './inventoryType'
import { CharSlots, Cords } from './itemType'

export enum InventoryEvents {
  Close = 'inventory:close',
  Open = 'inventory:open',
  MoveItem = 'inventory:moveItem',
  StackItem = 'inventory:stackItem',
  EquipItem = 'inventory:equipItem',
  ItemAction = 'inventory:itemAction',
  TakeOffEquipItem = 'inventory:takeOffEquipItem',
  FastTakeOffEquipItem = 'inventory:fastTakeOffEquipItem',
  SetShowHelmet = 'inventory:setShowHelmet',
  HalfSplitItem = 'inventory:halfSplitItem',
  DropItem = 'inventory:dropItem',

  ForceClose = 'inventoryItem:forceClose',
}

export enum TradeEvents {
  Close = 'trade:close',
  Accept = 'trade:accept',
  Cancel = 'trade:cancel',
  ItemAction = 'trade:itemAction',
}

export enum PickupItemEvents {
  SendItems = 'pickupItem:sendItems',
  SendItem = 'pickupItem:sendItem',
  DeleteItem = 'pickupItem:deleteItem',
  PickItem = 'pickupItem:pickupItem',
}

export type TradeAcceptPayload = {
  giveMoney: number
}

export type Position = {
  gridId: Grids
  position: Cords
}

export type ItemActionPayload = {
  itemId: any
  actionType: string
  from: Position
}

export type MoveItemData = {
  itemId: any
  from: Position
  to: Position
  isTurned: boolean
}

export type StackItemData = {
  from: {
    itemId: any
    gridId: Grids
  }
  to: {
    itemId: any
    gridId: Grids
  }
}

export type EquipItemData = {
  itemId: any
  from: Position
  slotId: CharSlots
}

export type TakeOffEquipItemData = {
  itemId: any
  slotId: CharSlots
  to: Position
  isTurned: boolean
}

export type FastTakeOffEquipItemData = {
  itemId: any
  slotId: CharSlots
}

export type SetShowHelmetData = {
  isShow: boolean
}

export enum ConfirmStates {
  Wait,
  Confirmed,
}

export type HalfSplitItemData = {
  from: {
    itemId: any
    gridId: Grids
  }
}

export type DropItemData = {
  from: {
    itemId: any
    gridId: Grids
  }
}
