import { createSlice } from '@reduxjs/toolkit'

type WorldMapState = {
  isOpen: boolean
}

const initialState: WorldMapState = {
  isOpen: false,
}

export const worldMapSlice = createSlice({
  name: 'worldMap',
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

export const worldMapReducer = worldMapSlice.reducer
export const worldMapActions = worldMapSlice.actions
