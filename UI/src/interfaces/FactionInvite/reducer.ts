import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { FactionHash } from '../../shared/Fraction/FactionHash'

type State = {
  isOpen: boolean
  factionHash: FactionHash
  price: number
}

const initialState: State = {
  isOpen: false,
  factionHash: FactionHash.Imperials,
  price: 0,
}

export const factionInviteSlice = createSlice({
  name: 'factionInvite',
  initialState,
  reducers: {
    show(state) {
      state.isOpen = true
    },
    hide(state) {
      state.isOpen = false
    },
    setFactionHash(state, action: PayloadAction<FactionHash>) {
      state.factionHash = action.payload
    },
    setPrice(state, action: PayloadAction<number>) {
      state.price = action.payload
    },
  },
})

export const factionInviteReducer = factionInviteSlice.reducer
export const factionInviteActions = factionInviteSlice.actions
