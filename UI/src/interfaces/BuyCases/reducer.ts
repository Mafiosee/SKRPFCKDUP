import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { Case } from '../../shared/Cases/Case'

type BuyCasesState = {
  isOpen: boolean
  caseItem: Case
  balance: number
}

const initialState: BuyCasesState = {
  isOpen: false,
  caseItem: {
    id: 1,
    categoryIds: [0],
    type: 'Кейс',
    name: 'Залупа кейс',
    image: {
      name: 'case-test',
      sourceType: 2,
    },
    price: 199,
    discount: 0,
    quality: 2,
    description: {
      small: '',
      large: '',
    },
    prizes: [],
    amount: 1,
  },
  balance: 16000,
}

export const buyCasesSlice = createSlice({
  name: 'buyCases',
  initialState,
  reducers: {
    show(
      state,
      action: PayloadAction<{
        case: Case
        balance: number
      }>,
    ) {
      state.isOpen = true
      state.caseItem = action.payload.case
      state.balance = action.payload.balance
    },
    hide(state) {
      state.isOpen = false
    },
  },
})

export const buyCasesReducer = buyCasesSlice.reducer
export const buyCasesActions = buyCasesSlice.actions
