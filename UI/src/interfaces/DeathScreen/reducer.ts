import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type DeathScreenState = {
  isOpen: boolean
  lifeTime: number
  showWaitBtn: boolean
}

const initialState: DeathScreenState = {
  isOpen: false,
  showWaitBtn: true,
  lifeTime: 6,
}

export const DeathScreenSlice = createSlice({
  name: 'deathScreen',
  initialState,
  reducers: {
    show(state) {
      state.isOpen = true
    },
    hide(state) {
      state.isOpen = false
    },
    setSeconds(state, action: PayloadAction<{ value: number }>) {
      state.lifeTime = action.payload.value
    },
    addSeconds(state, action: PayloadAction<{ value: number }>) {
      state.lifeTime = state.lifeTime + action.payload.value
    },
    setShowWaitBtn(state, action: PayloadAction<boolean>) {
      state.showWaitBtn = action.payload
    },
    activateDeathButton(state) {
      state.lifeTime = 0
      state.showWaitBtn = false
    },

    // front
    timerLifeTime(state) {
      if (state.lifeTime <= 0) {
        return
      }
      state.lifeTime = state.lifeTime - 1
    },
  },
})

export const deathScreenReducer = DeathScreenSlice.reducer
export const deathScreenActions = DeathScreenSlice.actions
