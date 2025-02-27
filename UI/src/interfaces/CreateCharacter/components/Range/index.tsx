import './styles.sass'
import React, { useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { callClient } from '../../../../utils/api'
import { createCharacterActions } from '../../reducer'
import { BackKeys, Parts, ValuesKeys } from '../../types'
import { CreateCharacterEvents } from '../../../../shared/characterEditor/events'

type RangeProps = {
	componentId: ValuesKeys
	title: string
	step: number
	helper?: string
	part?: Parts
}

const Range: React.FC<RangeProps> = ({ componentId, title, step, helper, part }) => {
	const dispatch = useAppDispatch()
	const { values, keys } = useAppSelector(state => state.createCharacter)
	if (!keys[componentId]) return null
	const [min, max] = keys[componentId]

	return (
		<div className='_Range'>
			<div className='row'>
				<div className='title'>{title}</div>
				{helper !== undefined ? (
					<div className='helper'>
						{values[componentId]} {helper}
					</div>
				) : null}
			</div>
			<div className='slider'>
				<Slider
					min={min}
					max={max}
					step={step}
					value={values[componentId]}
					onChange={newValue => {
						dispatch(
							createCharacterActions.setValue({
								id: componentId,
								value: newValue,
							})
						)
						callClient(CreateCharacterEvents.UpdatePart, {
							part,
							data: {
								// @ts-expect-error qwe
								[BackKeys[componentId]]: newValue,
							},
						})
					}}
					keyboard={false}
				/>
			</div>
		</div>
	)
}

export default Range
