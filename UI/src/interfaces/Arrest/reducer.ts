import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Race } from '../../shared/Race/type'
import { Gender } from '../../shared/characterEditor/enums/Genders'

export type ArrestState = {
  isOpen: boolean
  name: string
  staticId: string
  race: Race
  gender: Gender
  maxDurationMinutes: number
}

const initialState: ArrestState = {
  isOpen: false,
  name: '',
  staticId: '',
  race: Race.Nord,
  gender: Gender.Male,
  maxDurationMinutes: 360,
}

export const arrestSlice = createSlice({
  name: 'arrest',
  initialState,
  // initialState: mockState,
  reducers: {
    show(state) {
      state.isOpen = true
    },
    hide(state) {
      state.isOpen = false
    },
    setName(state, action: PayloadAction<typeof initialState.name>) {
      state.name = action.payload
    },
    setStaticId(state, action: PayloadAction<typeof initialState.staticId>) {
      state.staticId = action.payload
    },
    setRace(state, action: PayloadAction<typeof initialState.race>) {
      state.race = action.payload
    },
    setGender(state, action: PayloadAction<typeof initialState.gender>) {
      state.gender = action.payload
    },
    setMaxDurationMinutes(
      state,
      action: PayloadAction<typeof initialState.maxDurationMinutes>,
    ) {
      state.maxDurationMinutes = action.payload
    },
  },
})

export const arrestReducer = arrestSlice.reducer
export const arrestActions = arrestSlice.actions
