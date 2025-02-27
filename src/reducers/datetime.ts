import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type DateTimeState = {
	date: string
	time: {
		hours: number
		minutes: number
		seconds: number
	}
}

const initialState: DateTimeState = {
	date: '10.07.2023',
	time: {
		hours: 23,
		minutes: 59,
		seconds: 58,
	},
}

export const dateTimeSlice = createSlice({
	name: 'dateTime',
	initialState,
	reducers: {
		setDate(state, action: PayloadAction<string>) {
			state.date = action.payload
		},
		setTime(
			state,
			action: PayloadAction<{
				hours: number
				minutes: number
				seconds: number
			}>,
		) {
			state.time = action.payload
		},

		incrementTime(state) {
			const time = { ...state.time }
			time.seconds++
			if (time.seconds >= 60) {
				time.seconds = 0
				time.minutes++
			}
			if (time.minutes >= 60) {
				time.minutes = 0
				time.hours++
			}
			if (time.hours >= 24) {
				time.hours = 0
			}
			state.time = { ...time }
		},
	},
})

export const dateTimeReducer = dateTimeSlice.reducer
export const dateTimeActions = dateTimeSlice.actions
