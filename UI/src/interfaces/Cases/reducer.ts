import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { Case } from '../../shared/Cases/Case'
import { ItemType, Quality } from '../../shared/inventory/itemType'
import { Drop } from '../../shared/Cases/Drop'
import { SourceType } from '../../shared/Images/SourceType'

type CasesState = {
  isOpen: boolean
  balance: number
  cases: Case[]
  drop: Drop[]
  isInstant: boolean
}

const initialState: CasesState = {
  isOpen: false,
  balance: 32000,
  cases: [
    // {
    //   id: 1,
    //   categoryIds: [0],
    //   type: 'Кейс',
    //   name: 'Залупа кейс',
    //   image: {
    //     name: 'case-test',
    //     sourceType: 2,
    //   },
    //   price: 199,
    //   discount: 0,
    //   quality: 2,
    //   description: {
    //     small: '',
    //     large: '',
    //   },
    //   prizes: [],
    //   amount: 1,
    // },
  ],
  drop: [
    // {
    //   quality: Quality.Legendary,
    //   image: {
    //     name: 'nordic_carved_armor',
    //     sourceType: SourceType.Inventory,
    //   },
    //   name: 'Нордский нагрудник',
    //   description:
    //     'Скин для нордской брони, не дает преимуществ, но выглядит эффектно.',
    //   price: 600,
    // },
    // {
    // 	quality: Quality.Rare,
    // 	image: 'test-0',
    // 	name: 'Перчатки Supreme',
    // 	description:
    // 		'Скин для чешуйчатых перчаток, не дает преимуществ, но выглядит эффектно.',
    // 	price: 400,
    // },
    // {
    // 	quality: Quality.Normal,
    // 	image: 'test-0',
    // 	name: 'Невероятные штаны',
    // 	description:
    // 		'Скин для чешуйчатых штанов, не дает преимуществ, но выглядит эффектно.',
    // 	price: 200,
    // },
  ],
  isInstant: false,
}

export const casesSlice = createSlice({
  name: 'cases',
  initialState,
  reducers: {
    show(state) {
      state.isInstant = false
      state.isOpen = true
    },
    showWithInstantOpen(state, action: PayloadAction<Drop[]>) {
      state.drop = action.payload
      state.isInstant = true
      state.isOpen = true
    },
    hide(state) {
      state.isInstant = false
      state.isOpen = false
    },
    setBalance(state, action: PayloadAction<{ value: number }>) {
      state.balance = action.payload.value
    },
    setCases(state, action: PayloadAction<Case[]>) {
      state.cases = action.payload
    },
    setDrop(state, action: PayloadAction<Drop[]>) {
      state.drop = action.payload
    },

    // Front
    setIsInstant(state, action: PayloadAction<boolean>) {
      state.isInstant = action.payload
    },
  },
})

export const casesReducer = casesSlice.reducer
export const casesActions = casesSlice.actions
