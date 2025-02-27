import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Price} from "../../shared/CreateGuild/Price";
import {House} from "../../shared/CreateGuild/House";
import {Additional} from "../../shared/CreateGuild/Additional";

type CreateGuildState = {
  isOpen: boolean
  price: Price
  houses: House[]
  additional: Additional[]
}

const initialState: CreateGuildState = {
  isOpen: false,
  price: {
    money: 150000,
    donate: 2000
  },
  houses: [
    { id: 0, name: 'Дом красных огней', image: '0' },
    { id: 1, name: 'Дом теплого меда', image: '1' },
  ],
  additional: [
    { id: 0, image: 'warehouse', name: 'Склад', price: { money: 35000, donate: 2000 } },
    { id: 1, image: 'horse', name: 'Конюшня', price: { money: 78000, donate: 5000 } },
  ]
}

export const createGuildSlice = createSlice({
  name: 'createGuild',
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

export const createGuildReducer = createGuildSlice.reducer
export const createGuildActions = createGuildSlice.actions
