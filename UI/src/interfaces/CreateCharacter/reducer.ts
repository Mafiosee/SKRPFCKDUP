import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentTypes, ValuesKeys, ValueTypes } from './types'
import { Race } from '../../types/race'
import { Gender } from '../../types/gender'
import { Tab } from '../../shared/characterEditor/tabs'

type CreateCharacterState = {
  isOpen: boolean
  tab: Tab
  keys: { [key: string]: any }
  values: { [key: string]: any }

  // ---
  isShowPopupName: boolean
  tick: boolean
}

const defaultValues: { [key: string]: any } = {
  [ValuesKeys.Race]: Race.Nord,
  [ValuesKeys.Gender]: Gender.Male,

  [ValuesKeys.SkinColor]: null,
  [ValuesKeys.Weight]: null,
  [ValuesKeys.BodyType]: null,
  [ValuesKeys.Dirt]: null,
  [ValuesKeys.DirtColor]: null,
  [ValuesKeys.Scars]: null,
  [ValuesKeys.NoseType]: null,
  [ValuesKeys.NoseLength]: null,
  [ValuesKeys.NoseHeight]: null,
  [ValuesKeys.JawWidth]: null,
  [ValuesKeys.JawHeight]: null,
  [ValuesKeys.CheekboneHeight]: null,
  [ValuesKeys.CheekboneWidth]: null,
  [ValuesKeys.CheekColor]: null,
  [ValuesKeys.UnderCheekColor]: null,
  [ValuesKeys.UnderNoseColor]: null,
  [ValuesKeys.NoseColor]: null,
  [ValuesKeys.ChinColor]: null,
  [ValuesKeys.NeckColor]: null,
  [ValuesKeys.ForeheadColor]: null,
  [ValuesKeys.HairStyle]: null,
  [ValuesKeys.BeardStyle]: null,
  [ValuesKeys.HairColor]: null,
  [ValuesKeys.EyesForm]: null,
  [ValuesKeys.EyesColor]: null,
  [ValuesKeys.EyesHeight]: null,
  [ValuesKeys.EyesDistance]: null,
  [ValuesKeys.EyesDeep]: null,
  [ValuesKeys.EyelinerColor]: null,
  [ValuesKeys.EyeShadowTopColor]: null,
  [ValuesKeys.EyeShadowBotColor]: null,
  [ValuesKeys.BrowType]: null,
  [ValuesKeys.BrowHeight]: null,
  [ValuesKeys.BrowWidth]: null,
  [ValuesKeys.BrowDeep]: null,
  [ValuesKeys.LipsForm]: null,
  [ValuesKeys.LipsHeight]: null,
  [ValuesKeys.LipsDeep]: null,
  [ValuesKeys.ChinWidth]: null,
  [ValuesKeys.ChinLength]: null,
  [ValuesKeys.ChinDeep]: null,
  [ValuesKeys.LipsColor]: null,
  [ValuesKeys.ClothesTop]: 0,
  [ValuesKeys.ClothesShoes]: 0,
}

const initialState: CreateCharacterState = {
  isOpen: false,
  tab: Tab.Race,
  keys: {
    ...defaultValues,
  },
  values: {
    ...defaultValues,
  },

  // ---
  isShowPopupName: false,

  tick: false,
}

export const createCharacterSlice = createSlice({
  name: 'createCharacter',
  initialState,
  reducers: {
    show(state) {
      state.isOpen = true
      state.tab = Tab.Race
    },
    hide(state) {
      state.isOpen = false
      state.isShowPopupName = false
    },
    setTab(state, action: PayloadAction<Tab>) {
      state.tab = action.payload
    },
    setValue(state, action: PayloadAction<{ id: any; value: any }>) {
      const { id, value } = action.payload
      state.values[id] = value
    },
    resetValues(state) {
      state.values[ValuesKeys.Race] = defaultValues[ValuesKeys.Race]
      state.values[ValuesKeys.Gender] = defaultValues[ValuesKeys.Gender]
      state.tick = !state.tick
    },
    setKeys(state, action: PayloadAction<{ id: any; keys: any }>) {
      const { id, keys } = action.payload
      if (keys === null) {
        state.keys[id] = null
        state.values[id] = null
        return
      }
      switch (ValueTypes[id]) {
        case ComponentTypes.Color: {
          const arr = []
          for (let i = 0; i < keys.length; i++) {
            const color = keys[i]
            const isVisible = color > 0x00ffffff || color < 0
            if (isVisible) {
              arr.push(color)
            } else {
              arr.unshift(color)
            }
          }
          state.keys[id] = arr
          state.values[id] = 0
          break
        }
        case ComponentTypes.Range:
          state.keys[id] = keys
          state.values[id] = keys[0] + Math.abs(keys[0] - keys[1]) / 2
          break
        case ComponentTypes.Select:
          if (keys !== null) {
            const arr: any[] | null = []
            for (const key of keys) {
              arr.push({
                id: key,
                name: `Вариант ${arr.length + 1}`,
              })
            }
            if (id === ValuesKeys.Scars) {
              arr.unshift({ id: -1, name: 'Отсутствует' })
            }
            state.keys[id] = arr
            state.values[id] = arr[0].id
          } else {
            state.keys[id] = null
            state.values[id] = null
          }
          break
        case ComponentTypes.SelectWithColor:
          const arr: any[] | null = []
          for (let i = 0; i < keys.length; i++) {
            arr.push({
              id: i,
              value: { ...keys[i], argb: 0 },
              name: `Вариант ${arr.length + 1}`,
            })
          }
          arr.unshift({ id: -1, value: null, name: 'Отсутствует' })
          state.keys[id] = arr
          state.values[id] = arr[0].id
      }
    },

    setSelectWithColorColor(
      state,
      action: PayloadAction<{
        key: string
        varIdx: number
        colorIdx: number
      }>,
    ) {
      const { key, varIdx, colorIdx } = action.payload
      state.keys[key][varIdx].value.argb = colorIdx
    },

    setSelectWithColorValue(
      state,
      action: PayloadAction<{
        key: string
        value: number
      }>,
    ) {
      const { key, value } = action.payload
      state.values[key] = value
      const list: any[] = []
      for (let i = 0; i < state.keys[key].length; i++) {
        const item = { ...state.keys[key][i], value: null }
        if (state.keys[key][i].value !== null) {
          item.value = { ...state.keys[key][i].value }
        }
        if (item.value?.hasOwnProperty('argb')) {
          item.value.argb = item.id === value ? 1 : 0
        }
        list.push(item)
      }
      state.keys[key] = list
    },

    setIsOpenPopupName(state, action: PayloadAction<boolean>) {
      state.isShowPopupName = action.payload
    },
  },
})

export const createCharacterReducer = createCharacterSlice.reducer
export const createCharacterActions = createCharacterSlice.actions
