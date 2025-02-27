import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Info } from "../../shared/BuyMaterials/Info";

type BuyMaterialsState = {
  isOpen: boolean;
  info: Info;
};

const initialState: BuyMaterialsState = {
  isOpen: false,
  info: {
    price: 1000,
    weight: 10,
  },
};

export const buyMaterialsSlice = createSlice({
  name: "buyMaterials",
  initialState,
  reducers: {
    show(state) {
      state.isOpen = true;
    },
    hide(state) {
      state.isOpen = false;
    },
    setInfo(state, action: PayloadAction<Info>) {
      state.info = action.payload;
    },
  },
});

export const buyMaterialsReducer = buyMaterialsSlice.reducer;
export const buyMaterialsActions = buyMaterialsSlice.actions;
