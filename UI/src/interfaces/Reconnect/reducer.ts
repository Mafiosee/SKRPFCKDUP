import { createSlice } from '@reduxjs/toolkit'

type ReconnectState = {
  isOpen: boolean
}

const initialState: ReconnectState = {
  isOpen: false,
}

export const reconnectSlice = createSlice({
  name: 'reconnect',
  initialState,
  reducers: {
    show(state) {
      state.isOpen = true
    },
    hide(state) {
      state.isOpen = false
    },
  },
})

export const reconnectReducer = reconnectSlice.reducer
export const reconnectActions = reconnectSlice.actions
