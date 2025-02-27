import './styles.sass'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { callClient } from '../../../../utils/api'
import { createCharacterActions } from '../../reducer'
import { BackKeys, Parts, ValuesKeys } from '../../types'
import { Race } from '../../../../types/race'
import { Gender } from '../../../../types/gender'
import { CreateCharacterEvents } from '../../../../shared/characterEditor/events'

type SelectProps = {
	componentId: string
	title: string
	list?: { id: any; name: string }[]
	part?: Parts
}

const Select: React.FC<SelectProps> = ({ componentId, title, list, part }) => {
	const dispatch = useAppDispatch()
	const { values, keys } = useAppSelector(state => state.createCharacter)
	if (
		(values[ValuesKeys.Gender] === Gender.Female && componentId === ValuesKeys.BeardStyle) ||
		(values[ValuesKeys.Race] === Race.Khajit && componentId === ValuesKeys.BrowType)
	)
		{return null}
	if (!list) {
		if (keys[componentId] === null) {return null}
		list = keys[componentId]
	}
	const current = list.find(el => el.id === values[componentId])
	if (!current) {return null}

	const handleChangeValue = (diff: number) => {
		const index = list.findIndex(el => el.id === values[componentId])
		let newIndex = index + diff
		if (newIndex < 0) {newIndex = list.length - 1}
		else if (newIndex >= list.length) {newIndex = 0}
		dispatch(
			createCharacterActions.setValue({
				id: componentId,
				value: list[newIndex].id,
			})
		)
		if (componentId === ValuesKeys.Gender)
			{callClient(CreateCharacterEvents.UpdateGender, {
				gender: list[newIndex].id,
			})}
		else {
			let value = list[newIndex].id
			if (!isNaN(parseInt(value))) {value = parseInt(value)}
			callClient(CreateCharacterEvents.UpdatePart, {
				part,
				data: {
					// @ts-expect-error qwe
					[BackKeys[componentId]]: value,
				},
			})
		}
	}

	return (
		<div className='_Select'>
			<div className='title'>{title}</div>
			<div className='block'>
				<div className='arrow' onClick={() => handleChangeValue(-1)} />
				<div className='current'>{current.name}</div>
				<div className='arrow' onClick={() => handleChangeValue(1)} />
			</div>
		</div>
	)
}

export default Select
