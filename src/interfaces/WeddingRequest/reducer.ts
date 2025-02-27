import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { WeddingPlayer } from "../../shared/WeddingRequest/Player";

type WeddingRequestState = {
  isOpen: boolean;
  players: WeddingPlayer[];
};

const initialState: WeddingRequestState = {
  isOpen: false,
  players: [
    { id: 0, name: "Player 0" },
    { id: 1, name: "Player 1" },
    { id: 2, name: "Player 2" },
    { id: 3, name: "Player 3" },
    { id: 4, name: "Player 4" },
    { id: 5, name: "Player 5" },
    { id: 6, name: "Player 6" },
  ],
};

export const weddingRequestSlice = createSlice({
  name: "weddingRequest",
  initialState,
  reducers: {
    show(state) {
      state.isOpen = true;
    },
    hide(state) {
      state.isOpen = false;
    },
    setPlayer(state, action: PayloadAction<WeddingPlayer[]>) {
      state.players = action.payload;
    },
  },
});

export const weddingRequestReducer = weddingRequestSlice.reducer;
export const weddingRequestActions = weddingRequestSlice.actions;
