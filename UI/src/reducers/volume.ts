import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type VolumeState = {
	sfxBase: number, // 0 - 1
}

const initialState: VolumeState = {
	sfxBase: .5,
}

export const volumeSlice = createSlice({
	name: 'volume',
	initialState,
	reducers: {
		setBaseSfxVolume(state, action: PayloadAction<number>) {
			state.sfxBase = action.payload
		},
	},
})

export const volumeReducer = volumeSlice.reducer
export const volumeActions = volumeSlice.actions
