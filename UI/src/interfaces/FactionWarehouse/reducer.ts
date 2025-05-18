import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Item, ItemId } from '../../shared/FactionWarehouse/Item'
import { TransferItem } from '../../shared/FactionWarehouse/TransferItem'
import { TransferSource } from '../../shared/FactionWarehouse/TransferSource'

export type FactionWarehouseState = {
  isOpen: boolean
  weightLimit: number
  warehouse: Item[]
  inventory: Item[]

  // Front
  transferItems: Record<TransferSource, TransferItem[]>
}

const initialState: FactionWarehouseState = {
  isOpen: false,
  weightLimit: 0,
  warehouse: [],
  inventory: [],

  transferItems: {
    [TransferSource.Warehouse]: [],
    [TransferSource.Inventory]: [],
  },
}

export const factionWarehouseSlice = createSlice({
  name: 'factionWarehouse',
  initialState,
  reducers: {
    show(state) {
      state.isOpen = true
    },
    hide(state) {
      state.isOpen = false
    },
    setWeightLimit(state, action: PayloadAction<{ value: number }>) {
      state.weightLimit = action.payload.value
    },
    setWarehouse(state, action: PayloadAction<Item[]>) {
      state.warehouse = action.payload
    },
    setInventory(state, action: PayloadAction<Item[]>) {
      state.inventory = action.payload
      state.transferItems[TransferSource.Inventory] = action.payload.map(
        (item) => ({
          id: item.id,
          amount: 1,
        }),
      )
    },

    // Front
    toggleWarehouseTransferItem(state, action: PayloadAction<ItemId>) {
      const index = state.transferItems[TransferSource.Warehouse].findIndex(
        (item) => item.id === action.payload,
      )
      if (!~index) {
        state.transferItems[TransferSource.Warehouse].push({
          id: action.payload,
          amount: 1,
        })
      } else {
        state.transferItems[TransferSource.Warehouse].splice(index, 1)
      }
    },
    setWarehouseTransferItems(state, action: PayloadAction<TransferItem[]>) {
      state.transferItems[TransferSource.Warehouse] = action.payload
    },
    setTransferItemAmount(
      state,
      action: PayloadAction<{
        source: TransferSource
        itemId: ItemId
        amount: number
      }>,
    ) {
      const index = state.transferItems[action.payload.source].findIndex(
        (item) => item.id === action.payload.itemId,
      )
      if (!~index) {
        return
      }
      if (
        action.payload.source === TransferSource.Warehouse &&
        action.payload.amount === 0
      ) {
        state.transferItems[TransferSource.Warehouse].splice(index, 1)
      } else {
        state.transferItems[action.payload.source][index].amount =
          action.payload.amount
      }
    },
  },
})

export const factionWarehouseReducer = factionWarehouseSlice.reducer
export const factionWarehouseActions = factionWarehouseSlice.actions
