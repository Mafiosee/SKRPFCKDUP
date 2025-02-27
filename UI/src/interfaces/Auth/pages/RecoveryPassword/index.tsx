import './styles.sass'
import React, { useState } from 'react'
import { useAppSelector } from '../../../../hooks/redux'
import { PageId } from '../../../../shared/Auth/pageId'
import Header from '../../components/Header'
import Title from '../../components/Title'
import Input from '../../components/Input'
import { callClient } from '../../../../utils/api'
import { AuthEvents, AuthRecoveryPassword } from '../../../../shared/Auth/events'
import Button, { ButtonType } from '../../components/Button'
import { InputId } from '../../../../shared/Auth/InputId'

const PageRecoveryPassword = () => {
	const { page } = useAppSelector(state => state.auth)
	const [password, setPassword] = useState('')
	const [repass, setRepass] = useState('')

	const isOpen = page === PageId.RecoveryPassword

	return (
		<div className={`PageRecoveryPassword ${isOpen && '-show'}`}>
			<Header text='Забыли пароль' />

			<Title text='Восстановление пароля' marginBottom={32} />

			<Input
				id={InputId.RecoveryPassword}
				type='password'
				placeholder='Введите новый пароль'
				value={password}
				setValue={setPassword}
				hasEye
				marginBottom={8}
			/>

			<Input
				id={InputId.RecoveryRepassword}
				type='password'
				placeholder='Повторите новый пароль'
				value={repass}
				setValue={setRepass}
				hasEye
				marginBottom={32}
			/>

			<Button
				type={ButtonType.Light}
				text='Изменить пароль'
				onClick={() => {
					const payload: AuthRecoveryPassword = { password, repass }
					callClient(AuthEvents.RecoveryPassword, payload)
				}}
				isDisabled={!password.length || !repass.length || password !== repass}
			/>
		</div>
	)
}

export default PageRecoveryPassword
