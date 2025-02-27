import './styles.sass'
import React, { useEffect, useRef } from 'react'
import { ComponentTextarea } from '../../../../shared/Modal/Component/Textarea'
import { calcVh } from '../../../../utils/calcVh'
import { KeyCodes } from '../../../../utils/keyCodes'

type Props = {
	component: ComponentTextarea
	value: string
	setValue: (value: string) => void
}

const Textarea: React.FC<Props> = ({ component, value, setValue }) => {
	const inputRef = useRef(null)

	useEffect(() => {
		inputRef.current?.focus()
	}, [])

	return (
		<div className='_Textarea' style={{ marginBottom: calcVh(component.marginBottom) }}>
			<div className='title'>{component.title}</div>
			<textarea
				rows={component.rowsAmount}
				placeholder={component.placeholder}
				value={value}
				onChange={event => setValue(event.target.value)}
				// onKeyDown={event => {
				// 	if (event.keyCode === KeyCodes.Enter) event.preventDefault()
				// }}
				ref={inputRef}
			/>
		</div>
	)
}

export default Textarea
