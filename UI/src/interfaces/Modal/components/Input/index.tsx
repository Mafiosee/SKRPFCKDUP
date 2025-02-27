import './styles.sass'
import React, { useEffect, useRef, useState } from 'react'
import { ComponentInput, InputMode } from '../../../../shared/Modal/Component/Input'
import { calcVh } from '../../../../utils/calcVh'

type Props = {
	component: ComponentInput;
	value: string;
	setValue: (value: string) => void;
};

const Input: React.FC<Props> = ({ component, value, setValue }) => {
	const [isHidden, setIsHidden] = useState(!!component?.isPassword)
	const inputRef = useRef(null)

	useEffect(() => {
		inputRef.current?.focus()
	}, [])

	const handleChangeValue = (event: InputEvent) => {
		const value = (event.target as HTMLInputElement).value
		if (component?.lengthLimit != null && value.length > component.lengthLimit) {
			return
		}
		if (!value.length || component?.mode === InputMode.All) {
			setValue(value)
		} else {
			switch (component?.mode) {
				case InputMode.OnlyNumbers: {
					const intValue = parseInt(value)
					if (isNaN(intValue)) {
						return
					}
					setValue(intValue.toString())
					break
				}
				case InputMode.OnlyString: {
					if (/[0-9]+/ig.test(value)) {
						return
					}
					setValue(value)
					break
				}
			}
		}
	}

	return (
		<div
			className='_Input'
			style={{ marginBottom: calcVh(component.marginBottom) }}
		>
			<div className='title'>{component.title}</div>
			<input
				className={`input ${component?.isPassword && isHidden && value?.length > 0 && '-hidden'}`}
				placeholder={component.placeholder}
				type={component?.isPassword && isHidden ? 'password' : 'text'}
				value={value}
				onChange={handleChangeValue}
				ref={inputRef}
			/>
			{!!component?.isPassword && (
				<div
					className={`eye ${isHidden && '-closed'}`}
					onClick={() => setIsHidden((prev) => !prev)}
				/>
			)}
		</div>
	)
}

export default Input
