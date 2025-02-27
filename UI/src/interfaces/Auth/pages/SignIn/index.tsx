import './styles.sass'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { PageId } from '../../../../shared/Auth/pageId'
import { authActions } from '../../reducer'
import Header from '../../components/Header'
import Title from '../../components/Title'
import Input from '../../components/Input'
import Button, { ButtonType } from '../../components/Button'
import { AuthEvents, AuthSignInPayload } from '../../../../shared/Auth/events'
import { callClient } from '../../../../utils/api'
import Separator from '../../components/Separator'
import { InputId } from '../../../../shared/Auth/InputId'

const PageSignIn = () => {
	const dispatch = useAppDispatch()
	const { page, rememberLogin } = useAppSelector(state => state.auth)
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [isRemember, setIsRemember] = useState(false)
	const [isRememberSkip, setIsRememberSkip] = useState(false)

	const isOpen = page === PageId.SignIn

	useEffect(() => {
		setLogin(rememberLogin)
		setIsRemember(!!rememberLogin.length)
		setIsRememberSkip(!!rememberLogin.length)
	}, [rememberLogin])

	useEffect(() => {
		if (!isRemember && isRememberSkip) setIsRememberSkip(false)
	}, [isRemember, isRememberSkip])

	return (
		<div className={`PageSignIn ${isOpen && '-show'}`}>
			<Header text='Авторизация' />

			<Title text='Добро пожаловать!' marginBottom={32} />

			<Input
				id={InputId.AuthLogin}
				placeholder='Логин'
				value={login}
				setValue={setLogin}
				marginBottom={16}
			/>

			<Input
				id={InputId.AuthPassword}
				placeholder='Пароль'
				type='password'
				value={password}
				setValue={setPassword}
				isDisabled={isRememberSkip}
				marginBottom={24}
				hasEye={!isRememberSkip}
			/>

			<div className='row'>
				<div className='remember' onClick={() => setIsRemember(prev => !prev)}>
					<div className={`checkbox ${isRemember && '-checked'}`} />
					<div className='title'>Запомнить меня</div>
				</div>
				<div className='link' onClick={() => dispatch(authActions.setPage(PageId.RecoveryMail))}>
					Восстановление пароля
				</div>
			</div>

			<Button
				type={ButtonType.Light}
				text='Войти'
				onClick={() => {
					const payload: AuthSignInPayload = { login, password, isRemember }
					callClient(AuthEvents.SignIn, payload)
				}}
				marginBottom={16}
			/>

			<Separator marginBottom={16} />

			<Button
				type={ButtonType.Dark}
				text='Создать аккаунт'
				onClick={() => dispatch(authActions.setPage(PageId.SignUp))}
			/>
		</div>
	)
}

export default PageSignIn
