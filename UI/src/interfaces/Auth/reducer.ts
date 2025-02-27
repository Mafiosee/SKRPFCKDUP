import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { PageId } from '../../shared/Auth/pageId'
import { InputId } from '../../shared/Auth/InputId'

type AuthState = {
	isOpen: boolean
	disclaimerDuration: number
	page: PageId
	rememberLogin: string
	recoveryMail: string
	recoverySecondsLeft: number
	queuePosition: number
	inputErrors: Record<InputId, string | null>
}

const initialState: AuthState = {
	isOpen: false,
	disclaimerDuration: 0,
	page: PageId.Disclaimer,
	rememberLogin: '',
	recoveryMail: '',
	recoverySecondsLeft: 0,
	queuePosition: 0,
	inputErrors: {
		[InputId.AuthLogin]: null,
		[InputId.AuthPassword]: null,

		[InputId.RegLogin]: null,
		[InputId.RegMail]: null,
		[InputId.RegPassword]: null,
		[InputId.RegRepassword]: null,
		[InputId.RegPromocode]: null,

		[InputId.RecoveryMail]: null,
		[InputId.RecoveryCode]: null,
		[InputId.RecoveryPassword]: null,
		[InputId.RecoveryRepassword]: null,
	},
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		show(state, action: PayloadAction<{ value: number }>) {
			state.isOpen = true
			state.disclaimerDuration = action.payload.value
			state.page = action.payload.value > 0 ? PageId.Disclaimer : PageId.SignIn
		},
		hide(state) {
			state.isOpen = false
		},
		setPage(state, action: PayloadAction<PageId>) {
			state.page = action.payload
		},
		setRememberLogin(state, action: PayloadAction<string>) {
			state.rememberLogin = action.payload
		},
		setRecoveryMail(state, action: PayloadAction<string>) {
			state.recoveryMail = action.payload
		},
		setRecoverySecondsLeft(state, action: PayloadAction<{ value: number }>) {
			state.recoverySecondsLeft = action.payload.value
		},
		setQueuePosition(state, action: PayloadAction<{ value: number }>) {
			state.queuePosition = action.payload.value
		},
		setInputError(state, action: PayloadAction<{ inputId: InputId; error: string | null }>) {
			const { inputId, error } = action.payload
			state.inputErrors[inputId] = error
		},
		setRememberToken(_, action: PayloadAction<string>) {
			const token = action.payload
			localStorage.setItem('auth:isRemember', 'true')
			localStorage.setItem('auth:token', token)
		},

		// Для фронта

		decrementTime(state) {
			if (state.recoverySecondsLeft > 0) {
				state.recoverySecondsLeft--
			}
		},
	},
})

export const authReducer = authSlice.reducer
export const authActions = authSlice.actions
