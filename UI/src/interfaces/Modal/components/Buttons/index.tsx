import './styles.sass'
import React from 'react'
import { calcVh } from '../../../../utils/calcVh'
import {
	Button,
	ButtonColor,
	ComponentButtons,
} from '../../../../shared/Modal/Component/Buttons'
import { ButtonBackgrounds } from '../../assets/buttons'
import { ButtonIcons } from '../../assets/buttonIcons'
import {
	ComponentId,
	ComponentValue,
	ModalId,
} from '../../../../shared/Modal/types'
import {
	ModalClickButtonPayload,
	ModalEvents,
} from '../../../../shared/Modal/events'
import { callClient } from '../../../../utils/api'

type Props = {
	component: ComponentButtons
	modalId: ModalId
	values: Record<ComponentId, ComponentValue>
}

const _Buttons: React.FC<Props> = ({ component, modalId, values }) => {
	const getButtons = () => {
		const rows: Button[][] = []
		let row: Button[] = []
		component.buttons.forEach(button => {
			if (row.length === 2) {
				rows.push(row)
				row = []
			}
			row.push(button)
		})
		if (row.length) rows.push(row)

		return rows.map((row, rowIdx) => (
			<div key={rowIdx} className='row'>
				{row.map(({ id, color, icon, text }, buttonIdx) => (
					<div
						key={buttonIdx}
						className={`button ${row.length === 1 && '-large'}`}
						style={{
							backgroundImage: `url(${
								ButtonBackgrounds[color][row.length === 1 ? 'large' : 'small']
							})`,
							color: color === ButtonColor.White ? '#080808' : '#fff',
						}}
						onClick={() => {
							const payload: ModalClickButtonPayload = {
								modalId,
								values,
								buttonId: id,
							}
							callClient(ModalEvents.ClickButton, payload)
						}}
					>
						{icon && (
							<div
								className='icon'
								style={{
									backgroundImage: `url(${ButtonIcons[`${icon}.svg`]})`,
								}}
							/>
						)}
						<div className='text'>{text}</div>
					</div>
				))}
			</div>
		))
	}

	return (
		<div
			className='_Buttons'
			style={{ marginBottom: calcVh(component.marginBottom) }}
		>
			{getButtons()}
		</div>
	)
}

export default _Buttons
