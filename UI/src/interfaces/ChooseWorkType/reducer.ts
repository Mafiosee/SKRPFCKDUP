import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { mockState } from './mockState'
import { Work } from '../../shared/Work/Work'

export type ChooseWorkTypeState = {
  isOpen: boolean
  title: string
  image: string
  levelHelper: string
  works: Work[]
}

const initialState: ChooseWorkTypeState = {
  isOpen: false,
  title: '',
  image: '',
  levelHelper: '',
  works: [],
}

export const chooseWorkTypeSlice = createSlice({
  name: 'chooseWorkType',
  // initialState: mockState,
  initialState,
  reducers: {
    show(state) {
      state.isOpen = true
    },
    hide(state) {
      state.isOpen = false
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload
    },
    setImage(state, action: PayloadAction<string>) {
      state.image = action.payload
    },
    setLevelHelper(state, action: PayloadAction<string>) {
      state.levelHelper = action.payload
    },
    setWorks(state, action: PayloadAction<Work[]>) {
      state.works = action.payload
    },
  },
})

export const chooseWorkTypeReducer = chooseWorkTypeSlice.reducer
export const chooseWorkTypeActions = chooseWorkTypeSlice.actions
