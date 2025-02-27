import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { GameType } from '../../shared/Work/HoneyFactory'

type FinishScreen = {
  isWin: boolean
  text: string
  helper: string | null
} | null

type HoneyFactoryState = {
  isOpen: boolean
  gameType: GameType
  finishScreen: FinishScreen
}

const initialState: HoneyFactoryState = {
  isOpen: false,
  gameType: GameType.Collecting,
  finishScreen: null,
}

export const honeyFactorySlice = createSlice({
  name: 'honeyFactory',
  initialState,
  reducers: {
    show(state, action: PayloadAction<GameType>) {
      state.isOpen = true
      state.gameType = action.payload
      state.finishScreen = null
    },
    hide(state) {
      state.isOpen = false
    },

    // Не для бэка

    setFinishScreen(state, action: PayloadAction<FinishScreen>) {
      state.finishScreen = action.payload
    },
  },
})

export const honeyFactoryReducer = honeyFactorySlice.reducer
export const honeyFactoryActions = honeyFactorySlice.actions
