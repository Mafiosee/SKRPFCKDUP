import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type WeddingResponseState = {
  isOpen: boolean;
  senderName: string;
};

const initialState: WeddingResponseState = {
  isOpen: false,
  senderName: "Луцио Серая Грива",
};

export const weddingResponseSlice = createSlice({
  name: "weddingResponse",
  initialState,
  reducers: {
    show(state) {
      state.isOpen = true;
    },
    hide(state) {
      state.isOpen = false;
    },
    setSenderName(state, action: PayloadAction<string>) {
      state.senderName = action.payload;
    },
  },
});

export const weddingResponseReducer = weddingResponseSlice.reducer;
export const weddingResponseActions = weddingResponseSlice.actions;
