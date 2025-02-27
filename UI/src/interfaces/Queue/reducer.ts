import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type QueueState = {
  isOpen: boolean
  position: number
}

const initialState: QueueState = {
  isOpen: false,
  position: 105,
}

export const queueSlice = createSlice({
  name: 'queue',
  initialState,
  reducers: {
    show(state) {
      state.isOpen = true
    },
    hide(state) {
      state.isOpen = false
    },
    setPosition(state, action: PayloadAction<{ position: number }>) {
      state.position = action.payload.position
    },
  },
})

export const queueReducer = queueSlice.reducer
export const queueActions = queueSlice.actions
