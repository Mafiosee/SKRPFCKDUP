import './styles.sass'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { PageId } from '../../../../shared/Auth/pageId'
import Header from '../../components/Header'
import Title from '../../components/Title'
import Input from '../../components/Input'
import Button, { ButtonType } from '../../components/Button'
import { AuthEvents, AuthRecoveryMail } from '../../../../shared/Auth/events'
import { callClient } from '../../../../utils/api'
import Helper from '../../components/Helper'
import { InputId } from '../../../../shared/Auth/InputId'

const PageRecoveryMail = () => {
	const { page } = useAppSelector(state => state.auth)
	const [mail, setMail] = useState('')

	const isOpen = page === PageId.RecoveryMail

	return (
		<div className={`PageRecoveryMail ${isOpen && '-show'}`}>
			<Header text='Забыли пароль' />

			<Title text='Восстановление пароля' marginBottom={32} />

			<Input
				id={InputId.RecoveryMail}
				placeholder='Введите почту'
				value={mail}
				setValue={setMail}
				marginBottom={16}
			/>

			<Helper
				text='Напоминаем! Почта должна совпадать с той, что была указана при регистрации!'
				marginBottom={32}
			/>

			<Button
				type={ButtonType.Light}
				text='Отправить код'
				onClick={() => {
					const payload: AuthRecoveryMail = { mail }
					callClient(AuthEvents.RecoveryMail, payload)
				}}
				isDisabled={mail.length === 0}
			/>
		</div>
	)
}

export default PageRecoveryMail
