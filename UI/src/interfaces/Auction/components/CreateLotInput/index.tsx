import React from 'react'
import './styles.sass'

type Props = {
	title: string
	helper?: string
	placeholder: string
	value: string
	setValue: (value: string) => void
	warning?: string
}

const CreateLotInput: React.FC<Props> = ({ title, helper, placeholder, value, setValue, warning }) => {

	return (
		<div className='CreateLotInput'>
			<div className='title'>
				{title}
				{helper != null && <div className='helper'>({helper})</div>}
			</div>
			<input type='text' placeholder={placeholder} value={value} onChange={(event) => setValue(event.target.value)} />
			{warning != null && <div className='warning'>{warning}</div>}
		</div>
	)
}

export default CreateLotInput
