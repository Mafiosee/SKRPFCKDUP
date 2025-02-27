import './styles.sass'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { PageId } from '../../../../shared/Auth/pageId'
import Header from '../../components/Header'
import Title from '../../components/Title'
import Input from '../../components/Input'
import Helper from '../../components/Helper'
import { callClient } from '../../../../utils/api'
import { AuthEvents, AuthRecoveryCode, AuthRecoveryMail } from '../../../../shared/Auth/events'
import Button, { ButtonType } from '../../components/Button'
import { InputId } from '../../../../shared/Auth/InputId'

const PageRecoveryCode = () => {
	const { page, recoveryMail, recoverySecondsLeft } = useAppSelector(state => state.auth)
	const [code, setCode] = useState('')

	const isOpen = page === PageId.RecoveryCode

	return (
		<div className={`PageRecoveryCode ${isOpen && '-show'}`}>
			<Header text='Забыли пароль' />

			<Title text='Восстановление пароля' marginBottom={32} />

			<Input
				id={InputId.RecoveryCode}
				placeholder='Код из письма'
				value={code}
				setValue={setCode}
				marginBottom={16}
			/>

			<Helper
				text={
					<>
						На почту <span>{recoveryMail}</span> был отправлен код подтверждения. Не забудьте
						проверить папку “Спам”!
					</>
				}
				marginBottom={32}
			/>

			<div className='row'>
				<div className='title'>Не пришёл код?</div>
				<div
					className={`link ${recoverySecondsLeft >= 1 && '-disabled'}`}
					onClick={() => {
						if (recoverySecondsLeft >= 1) return
						const payload: AuthRecoveryMail = { mail: recoveryMail }
						callClient(AuthEvents.RecoveryMail, payload)
					}}
				>
					Отправить снова{recoverySecondsLeft >= 1 && `(через ${recoverySecondsLeft} сек)`}
				</div>
			</div>

			<Button
				type={ButtonType.Light}
				text='Продолжить'
				onClick={() => {
					const payload: AuthRecoveryCode = { code }
					callClient(AuthEvents.RecoveryCode, payload)
				}}
				isDisabled={!code.length || recoverySecondsLeft >= 1}
			/>
		</div>
	)
}

export default PageRecoveryCode
