export enum AuthEvents {
	Exit = 'auth:exit',
	SignIn = 'auth:signIn',
	SignUp = 'auth:signUp',
	RecoveryMail = 'auth:recoveryMail',
	RecoveryCode = 'auth:recoveryCode',
	RecoveryPassword = 'auth:recoveryPassword',
	ExitQueue = 'auth:exitQueue',
	SetIp = 'auth:setIp',
	CheckRemembered = 'auth:checkRemembered'
}

export type AuthSignInPayload = {
	login: string
	password: string
	isRemember: boolean
}

export type AuthSignUpPayload = {
	login: string
	mail: string
	password: string
	repass: string
	promo: string
}

export type AuthRecoveryMail = {
	mail: string
}

export type AuthRecoveryCode = {
	code: string
}

export type AuthRecoveryPassword = {
	password: string
	repass: string
}

export type AuthSetIp = {
	ip: string
}

export type AuthCheckRememberedPayload = {
	isRemember: boolean
	token: string
}