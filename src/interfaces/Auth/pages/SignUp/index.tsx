import './styles.sass'
import React, { useState } from 'react'
import { useAppSelector } from '../../../../hooks/redux'
import { PageId } from '../../../../shared/Auth/pageId'
import Header from '../../components/Header'
import Title from '../../components/Title'
import Input from '../../components/Input'
import Button, { ButtonType } from '../../components/Button'
import { AuthEvents, AuthSignUpPayload } from '../../../../shared/Auth/events'
import { callClient } from '../../../../utils/api'
import { InputId } from '../../../../shared/Auth/InputId'

const PageSignUp = () => {
	const { page } = useAppSelector(state => state.auth)
	const [login, setLogin] = useState('')
	const [mail, setMail] = useState('')
	const [password, setPassword] = useState('')
	const [repass, setRepass] = useState('')
	const [promo, setPromo] = useState('')

	const isOpen = page === PageId.SignUp

	return (
		<div className={`PageSignUp ${isOpen && '-show'}`}>
			<Header text='Регистрация' />

			<Title text='Создание аккаунта' marginBottom={32} />

			<Input
				id={InputId.RegLogin}
				placeholder='Логин'
				value={login}
				setValue={setLogin}
				marginBottom={16}
			/>

			<Input
				id={InputId.RegMail}
				placeholder='Почта'
				value={mail}
				setValue={setMail}
				marginBottom={16}
			/>

			<Input
				id={InputId.RegPassword}
				placeholder='Пароль'
				value={password}
				setValue={setPassword}
				marginBottom={16}
				hasEye
				type='password'
			/>

			<Input
				id={InputId.RegRepassword}
				placeholder='Повторите пароль'
				value={repass}
				setValue={setRepass}
				marginBottom={16}
				hasEye
				type='password'
			/>

			<Input
				id={InputId.RegPromocode}
				placeholder='Промокод'
				value={promo}
				setValue={setPromo}
				marginBottom={32}
			/>

			<Button
				type={ButtonType.Light}
				text='Создать'
				onClick={() => {
					const payload: AuthSignUpPayload = {
						login,
						mail,
						password,
						repass,
						promo,
					}
					callClient(AuthEvents.SignUp, payload)
				}}
			/>
		</div>
	)
}

export default PageSignUp
