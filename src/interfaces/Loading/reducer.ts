import { createSlice } from '@reduxjs/toolkit'

type LoadingState = {
  isOpen: boolean
}

const initialState: LoadingState = {
  isOpen: false,
}

export const loadingSlice = createSlice({
  name: 'loading',
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

export const loadingReducer = loadingSlice.reducer
export const loadingActions = loadingSlice.actions
