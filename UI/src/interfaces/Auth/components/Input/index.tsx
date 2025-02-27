import './styles.sass'
import React, { useState } from 'react'
import { calcVh } from '../../../../utils/calcVh'
import { InputId } from '../../../../shared/Auth/InputId'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { authActions } from '../../reducer'

type Props = {
	id: InputId
	placeholder: string
	value: string
	setValue: (value: string) => void
	type?: 'text' | 'password'
	hasEye?: boolean
	isDisabled?: boolean
	marginBottom?: number
}

const Input: React.FC<Props> = ({
	id,
	placeholder,
	value,
	setValue,
	type = 'text',
	hasEye = false,
	isDisabled = false,
	marginBottom = 0,
}) => {
	const dispatch = useAppDispatch()
	const { inputErrors } = useAppSelector(state => state.auth)
	const [isShowValue, setIsShowValue] = useState(false)

	const error = inputErrors[id]
	const hasError = !!error

	return (
		<div className='_Input' style={{ marginBottom: calcVh(marginBottom) }}>
			<input
				className={`${isDisabled && '-disabled'}`}
				type={value.length && type === 'password' && hasEye && !isShowValue ? 'password' : 'text'}
				placeholder={isDisabled ? 'Введено' : placeholder}
				value={value}
				onChange={e => {
					if (isDisabled) return
					dispatch(authActions.setInputError({ inputId: id, error: null }))
					setValue(e.target.value)
				}}
			/>
			{hasEye && (
				<div
					className={`eye ${isShowValue && '-show'} ${hasError && '-withError'}`}
					onClick={() => setIsShowValue(prev => !prev)}
				/>
			)}
			<div className={`error ${hasError && '-show'}`}>
				<div className='icon' />
				<div className='text'>{error}</div>
			</div>
		</div>
	)
}

export default Input
