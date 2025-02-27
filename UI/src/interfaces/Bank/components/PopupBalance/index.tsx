import './styles.sass'
import React, { useState } from 'react'

type PropsType = {
	blockName: string
	infoText: string
	successBtn: string
	cancelBtn: string
	placeholder: string
	state: boolean
	setState: (state: boolean) => void
	send: (value: number) => void
}

const PopupBalance: React.FC<PropsType> = ({
																						 setState,
																						 blockName,
																						 infoText,
																						 placeholder,
																						 successBtn,
																						 cancelBtn,
																						 send,
																					 }) => {
	const [sum, setSum] = useState<number | ''>('')
	return (
		<div className={`_Popup-window`}>
			<div className='content'>
				<div className='info'>
					<div className='name'>{blockName}</div>
					<div className='cross' onClick={() => setState(false)} />
				</div>

				<div className='text'>{infoText}</div>
				<input
					type='number'
					className={`input-block`}
					placeholder={placeholder}
					onChange={event => {
						if (!event.target.value) {
							return setSum('')
						}
						const intValue = parseInt(event.target.value)
						if (isNaN(intValue) || intValue < 0) {
							return
						}
						setSum(intValue)
					}}
				/>

				<div className='btns'>
					<div className='btn -success' onClick={() => {
						if (sum === '') {
							return
						}
						send(sum)
						setState(false)
					}}>
						{successBtn}
					</div>
					<div className='btn -cancel' onClick={() => setState(false)}>
						{cancelBtn}
					</div>
				</div>
			</div>
		</div>
	)
}

export default PopupBalance
