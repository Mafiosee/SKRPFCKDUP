import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type DeathScreenState = {
  isOpen: boolean
  info: {
    killer: string
    datetime: string
    weapon: string
  }
  secondsLeft: number
  enabledDieButton: boolean
}

const initialState: DeathScreenState = {
  isOpen: false,
  info: {
    killer: 'Луцио голубая грива [59][308]',
    datetime: '02.02.2025 01:45:38',
    weapon: 'Кинжал Драконьева края',
  },
  secondsLeft: 10,
  enabledDieButton: false,
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
    setInfo(state, action: PayloadAction<typeof initialState.info>) {
      state.info = action.payload
    },
    setSecondsLeft(state, action: PayloadAction<{ value: number }>) {
      state.secondsLeft = action.payload.value
    },
    addSecondsLeft(state, action: PayloadAction<{ value: number }>) {
      state.secondsLeft += action.payload.value
    },
    setEnabledDieButton(state, action: PayloadAction<boolean>) {
      state.enabledDieButton = action.payload
    },

    // front
    decrementSecondsLeft(state) {
      if (state.secondsLeft <= 0) {
        return
      }
      state.secondsLeft -= 1
    },
  },
})

export const deathScreenReducer = DeathScreenSlice.reducer
export const deathScreenActions = DeathScreenSlice.actions
