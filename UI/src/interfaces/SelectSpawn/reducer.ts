import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Point, Points } from './types'

type SelectSpawnState = {
  isOpen: boolean
  points: {
    [Points.Exit]: Point
    [Points.Start]: Point
    [Points.House]: Point
    [Points.Faction]: Point
  }
}

const initialState: SelectSpawnState = {
  isOpen: false,
  points: {
    [Points.Exit]: true,
    [Points.Start]: true,
    [Points.House]: true,
    [Points.Faction]: true,
  },
}

export const selectSpawnSlice = createSlice({
  name: 'selectSpawn',
  initialState,
  reducers: {
    show(
      state,
      action: PayloadAction<{
        [Points.Exit]: Point
        [Points.Start]: Point
        [Points.House]: Point
        [Points.Faction]: Point
      }>,
    ) {
      state.isOpen = true
      state.points = action.payload
    },
    hide(state) {
      state.isOpen = false
    },
  },
})

export const selectSpawnReducer = selectSpawnSlice.reducer
export const selectSpawnActions = selectSpawnSlice.actions
