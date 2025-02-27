import { createSlice } from '@reduxjs/toolkit'

type DisclaimerState = {
  isOpen: boolean
}

const initialState: DisclaimerState = {
  isOpen: false,
}

export const disclaimerSlice = createSlice({
  name: 'disclaimer',
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

export const disclaimerReducer = disclaimerSlice.reducer
export const disclaimerActions = disclaimerSlice.actions
