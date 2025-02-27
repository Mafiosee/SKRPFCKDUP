import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Skin, SkinId } from '../../shared/Skins/Skin'
import { SkinSlot } from '../../shared/Skins/SkinSlot'

type SkinsState = {
  isOpen: boolean
  skins: Skin[]
  slots: Record<SkinSlot, SkinId | null>
}

const initialState: SkinsState = {
  isOpen: false,
  slots: {
    Dagger: null,
    Sword: null,
    GreatSword: null,
    Mace: null,
    WarAxe: null,
    BattleAxe: null,
    WarHammer: null,
    Bow: null,
    Headdress: null,
    Outerwear: null,
    Bracers: null,
    Shoes: null,
    Earrings: null,
    Amulet: null,
    Scarf: null,
    Cloak: null,
    Ring: null,
    Belt: null,
    Bag: null,
    Mask: null,
    Glasses: null,
  },
  skins: [
    // {
    //   id: 1,
    //   quality: Quality.Epic,
    //   image: 'test-earrings',
    //   name: 'Очень большое название мощного скина',
    //   slot: SkinSlot.Outerwear,
    //   set: 12,
    // },
    // {
    //   id: 5,
    //   quality: Quality.Epic,
    //   image: 'test-earrings',
    //   name: 'Большое название скина',
    //   slot: SkinSlot.Outerwear,
    //   set: 12,
    // },
    // {
    //   id: 0,
    //   quality: Quality.Legendary,
    //   image: 'test-earrings',
    //   name: 'Большое название скина 2',
    //   slot: SkinSlot.Headdress,
    //   set: 12,
    // },
    // {
    //   id: 2,
    //   quality: Quality.Rare,
    //   image: 'test-earrings',
    //   name: 'Большое название скина 3',
    //   slot: SkinSlot.BattleAxe,
    // },
  ],
}

export const skinsSlice = createSlice({
  name: 'skins',
  initialState,
  reducers: {
    show(state) {
      state.isOpen = true
    },
    hide(state) {
      state.isOpen = false
    },

    setSlots(state, action: PayloadAction<typeof initialState.slots>) {
      state.slots = action.payload
    },
    setSlot(
      state,
      action: PayloadAction<{ slot: SkinSlot; skinId: SkinId | null }>,
    ) {
      const { slot, skinId } = action.payload
      state.slots[slot] = skinId
    },
    setSkins(state, action: PayloadAction<typeof initialState.skins>) {
      state.skins = action.payload
    },
  },
})

export const skinsReducer = skinsSlice.reducer
export const skinsActions = skinsSlice.actions
