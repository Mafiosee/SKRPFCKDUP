import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ChequeState = {
  isOpen: boolean
  from: string
  to: string
}

const initialState: ChequeState = {
  isOpen: false,
  from: 'Бруно Минарди',
  to: 'Хасбик Бразбик',
}

export const chequeSlice = createSlice({
  name: 'cheque',
  initialState,
  reducers: {
    show(state) {
      state.isOpen = true
    },
    hide(state) {
      state.isOpen = false
    },
    setFrom(state, action: PayloadAction<string>) {
      state.from = action.payload
    },
    setTo(state, action: PayloadAction<string>) {
      state.to = action.payload
    },
  },
})

export const chequeReducer = chequeSlice.reducer
export const chequeActions = chequeSlice.actions
