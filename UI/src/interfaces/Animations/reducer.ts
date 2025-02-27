import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Animation, Category, Piece } from './types'

type AnimationsState = {
  isOpen: boolean
  categories: Category[]
  animations: Animation[]
  radial: Piece[]
}

const initialState: AnimationsState = {
  isOpen: false,
  categories: [],
  animations: [],
  radial: [],
}

export const animationsSlice = createSlice({
  name: 'animations',
  initialState,
  reducers: {
    show(state) {
      state.isOpen = true
    },
    hide(state) {
      state.isOpen = false
    },
    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = [...action.payload]
    },
    setAnimations(state, action: PayloadAction<Animation[]>) {
      state.animations = [...action.payload]
    },
    setRadial(state, action: PayloadAction<Piece[]>) {
      state.radial = [...action.payload]
    },
  },
})

export const animationsReducer = animationsSlice.reducer
export const animationsActions = animationsSlice.actions
