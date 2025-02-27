import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Skin } from '../../shared/Skins/Skin'
import { Quality } from '../../shared/inventory/itemType'
import { SkinSlot } from '../../shared/Skins/SkinSlot'
import { TradeStatus } from '../../shared/SkinsTrade/TradeStatus'

type SkinsTradeState = {
  isOpen: boolean
  skins: Skin[]
  tradeStatus: TradeStatus
  giveSkins: Skin[]
  receiveSkins: Skin[]
}

const initialState: SkinsTradeState = {
  isOpen: false,
  skins: [
    {
      id: 0,
      quality: Quality.Rare,
      image: 'test-earrings',
      name: 'Большое название скина',
      slot: SkinSlot.Headdress,
      set: 12,
    },
  ],
  tradeStatus: {
    giveMoney: 0,
    giveConfirmed: true,
    receiveMoney: 8200,
    receiveConfirmed: true,
  },
  giveSkins: [
    {
      id: 0,
      quality: Quality.Rare,
      image: 'test-earrings',
      name: 'Большое название скина',
      slot: SkinSlot.Headdress,
      set: 12,
    },
  ],
  receiveSkins: [
    {
      id: 444,
      quality: Quality.Legendary,
      image: 'test-earrings',
      name: 'Большое название скина 5',
      slot: SkinSlot.Headdress,
      set: 12,
    },
  ],
}

export const skinsTradeSlice = createSlice({
  name: 'skinsTrade',
  initialState,
  reducers: {
    show(state) {
      state.isOpen = true
    },
    hide(state) {
      state.isOpen = false
    },

    setSkins(state, action: PayloadAction<typeof initialState.skins>) {
      state.skins = action.payload
    },
    setTradeStatus(
      state,
      action: PayloadAction<typeof initialState.tradeStatus>,
    ) {
      state.tradeStatus = action.payload
    },
    setGiveSkins(state, action: PayloadAction<typeof initialState.giveSkins>) {
      state.giveSkins = action.payload
    },
    setReceiveSkins(
      state,
      action: PayloadAction<typeof initialState.receiveSkins>,
    ) {
      state.receiveSkins = action.payload
    },
  },
})

export const skinsTradeReducer = skinsTradeSlice.reducer
export const skinsTradeActions = skinsTradeSlice.actions
