import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ConfirmStates } from '../../shared/inventory/events'
import { GridType } from '../../shared/inventory/inventoryType'

type TradeState = {
  isOpen: boolean
  traderName: string
  give: GridType
  receive: GridType
  isAccepted: boolean
  confirmState: ConfirmStates
  giveMoney: number
  receiveMoney: number | null
}

const initialState: TradeState = {
  isOpen: false,
  traderName: 'Mason Dookee',
  give: {
    size: { width: 7, height: 4 },
    maxWeight: 300,
    items: [],
  },
  receive: {
    size: { width: 7, height: 4 },
    maxWeight: 300,
    items: [],
  },
  isAccepted: true,
  confirmState: ConfirmStates.Wait,
  giveMoney: 5000,
  receiveMoney: null,
}

export const tradeSlice = createSlice({
  name: 'trade',
  initialState,
  reducers: {
    show(state) {
      state.isOpen = true
    },
    hide(state) {
      state.isOpen = false
    },

    setTraderName(state, action: PayloadAction<string>) {
      state.traderName = action.payload
    },
    setGive(state, action: PayloadAction<GridType>) {
      state.give = action.payload
    },
    setReceive(state, action: PayloadAction<GridType>) {
      state.receive = action.payload
    },
    setIsAccepted(state, action: PayloadAction<boolean>) {
      state.isAccepted = action.payload
    },
    setConfirmState(
      state,
      action: PayloadAction<{ confirmState: ConfirmStates }>,
    ) {
      state.confirmState = action.payload.confirmState
    },
    setReceiveMoney(state, action: PayloadAction<{ value: number }>) {
      state.receiveMoney = action.payload.value
    },
    setGiveMoney(state, action: PayloadAction<{ value: number }>) {
      state.giveMoney = action.payload.value
    },
  },
})

export const tradeReducer = tradeSlice.reducer
export const tradeActions = tradeSlice.actions
