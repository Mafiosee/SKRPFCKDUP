import './styles.sass'
import React, { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { callClient } from '../../../../utils/api'
import { createCharacterActions } from '../../reducer'
import { BackKeys, Parts, ValuesKeys } from '../../types'
import { CreateCharacterEvents } from '../../../../shared/characterEditor/events'

type SelectWithColorProps = {
	componentId: string
	title: string
	part?: Parts
	colorKey: ValuesKeys
	colorTitle: string
	hasAlpha?: boolean
}

const SelectWithColor: React.FC<SelectWithColorProps> = ({
	componentId,
	title,
	part,
	colorKey,
	colorTitle,
	hasAlpha,
}) => {
	const dispatch = useAppDispatch()
	const { values, keys } = useAppSelector(state => state.createCharacter)
	const list = keys[componentId]
	// @ts-expect-error qwe
	const current = list.find(el => el.id === values[componentId])
	const colorRef = useRef(null)

	useEffect(() => {
		const data: any[] = []
		// @ts-expect-error qwe
		list.forEach(item => {
			let value = { ...item.value }
			if (value.hasOwnProperty('argb')) value.argb = keys[colorKey][value.argb]
			else value = null
			if (value !== null) data.push(value)
		})

		callClient(CreateCharacterEvents.UpdatePart, {
			part,
			data: {
				// @ts-expect-error qwe
				[BackKeys[componentId]]: data,
			},
		})
	}, [colorKey, componentId, keys, list, part])

	const handleChangeCurrent = (diff: number) => {
		// @ts-expect-error qwe
		const index = list.findIndex(el => el.id === values[componentId])
		let newIndex = index + diff
		if (newIndex < 0) newIndex = list.length - 1
		else if (newIndex >= list.length) newIndex = 0
		const id = list[newIndex].id
		dispatch(
			createCharacterActions.setSelectWithColorValue({
				key: componentId,
				value: id,
			})
		)
		// if (id !== -1) {
		// }
	}

	const handleChangeColor = (diff: number) => {
		const colorsList: number[] = keys[colorKey]
		const index = current?.value?.argb
		let newIndex = index + diff
		if (newIndex < 0) newIndex = colorsList.length - 1
		else if (newIndex >= colorsList.length) newIndex = 0
		dispatch(
			createCharacterActions.setSelectWithColorColor({
				key: componentId,
				// @ts-expect-error qwe
				varIdx: list.findIndex(el => el.id === values[componentId]),
				colorIdx: newIndex,
			})
		)
	}

	useEffect(() => {
		colorRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
	}, [current])

	const getColors = () => {
		const colorsList: number[] = keys[colorKey]
		return (
			<div className={`list ${colorsList.length <= 5 && 'center'}`}>
				{colorsList.map((color, idx) => {
					const isActive = idx === current?.value?.argb
					const [a, r, g, b] = color.toString(16).split(/(?=(?:..)*$)/)
					const isVisible = color > 0x00ffffff || color < 0
					return (
						isVisible && (
							<div
								key={idx}
								className={`item ${isActive && 'active'}`}
								ref={isActive ? colorRef : null}
								onClick={() => {
									dispatch(
										createCharacterActions.setSelectWithColorColor({
											key: componentId,
											varIdx: list.findIndex((el: any) => el.id === values[componentId]),
											colorIdx: idx,
										})
									)
								}}
							>
								{isVisible ? (
									<svg width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M24.0001 7.77293C24.8392 7.77293 25.6093 7.4832 26.2122 7.00012L44 24.4561L26.2124 41.9119C25.6094 41.4287 24.8393 41.1389 24.0001 41.1389C23.1609 41.1389 22.3907 41.4287 21.7877 41.912L4 24.4561L21.7879 7C22.3909 7.48315 23.161 7.77293 24.0001 7.77293Z"
											fill={isVisible ? `#${r}${g}${b}${hasAlpha ? a : ''}` : ''}/>
									</svg>
								) : (
									<div className='-empty'/>
								)}
							</div>
						)
					)
				})}
			</div>
		)
	}

	return (
		<div className='_SelectWithColor'>
			<div className='body'>
				<div className='title'>{title}</div>
				<div className='block'>
					<div className='arrow' onClick={() => handleChangeCurrent(-1)} />
					<div className='current'>{current.name}</div>
					<div className='arrow' onClick={() => handleChangeCurrent(1)} />
				</div>
			</div>
			<div className={`color ${current.id === -1 && 'hidden'}`}>
				<div className='title'>{colorTitle}</div>
				<div className='block'>
					<div className='arrow' onClick={() => handleChangeColor(-1)} />
					{getColors()}
					<div className='arrow' onClick={() => handleChangeColor(1)} />
				</div>
			</div>
		</div>
	)
}

export default SelectWithColor
