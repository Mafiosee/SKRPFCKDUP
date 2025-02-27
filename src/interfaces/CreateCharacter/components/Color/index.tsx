import './styles.sass'
import React, { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { callClient } from '../../../../utils/api'
import { createCharacterActions } from '../../reducer'
import { BackKeys, Parts, ValuesKeys } from '../../types'
import { CreateCharacterEvents } from '../../../../shared/characterEditor/events'

type ColorProps = {
	componentId: string
	title: string
	part?: Parts
	hasAlpha?: boolean
}

const Color: React.FC<ColorProps> = ({ componentId, title, part, hasAlpha }) => {
	const dispatch = useAppDispatch()
	const { values, keys } = useAppSelector(state => state.createCharacter)
	const list = keys[componentId]
	const current = values[componentId]
	if (typeof current !== 'number' || !list) {
		return null
	}
	const currentRef = useRef(null)
	const isMounted = useRef(false)

	useEffect(() => {
		if (isMounted.current) {
			currentRef.current?.scrollIntoView({
				block: 'center',
				behavior: 'smooth',
			})
		} else {
			isMounted.current = true
		}
	}, [current])

	const handleChangeValue = (diff: number) => {
		let newIndex = current + diff
		if (newIndex < 0) {
			newIndex = list.length - 1
		} else if (newIndex >= list.length) {
			newIndex = 0
		}
		callClient(CreateCharacterEvents.UpdatePart, {
			part,
			data: {
				// @ts-expect-error qwe
				[BackKeys[componentId]]: list[newIndex],
			},
		})
		dispatch(
			createCharacterActions.setValue({
				id: componentId,
				value: newIndex,
			}),
		)
	}

	const renderList = () =>
		// @ts-expect-error qwe
		list.map((id, idx) => {
			const isActive = idx === current
			const [a, r, g, b] = id.toString(16).split(/(?=(?:..)*$)/)
			const isVisible = id > 0x00ffffff || id < 0
			return (
				<div
					key={id}
					className={`item ${isActive && 'active'}`}
					ref={isActive ? currentRef : null}
					onClick={() => {
						dispatch(
							createCharacterActions.setValue({
								id: componentId,
								value: idx,
							}),
						)
						callClient(CreateCharacterEvents.UpdatePart, {
							part,
							data: {
								// @ts-expect-error qwe
								[BackKeys[componentId]]: id,
							},
						})
					}}
				>
					{isVisible ? (
						<svg
							width='100%'
							height='100%'
							viewBox='0 0 48 48'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M24.0001 7.77293C24.8392 7.77293 25.6093 7.4832 26.2122 7.00012L44 24.4561L26.2124 41.9119C25.6094 41.4287 24.8393 41.1389 24.0001 41.1389C23.1609 41.1389 22.3907 41.4287 21.7877 41.912L4 24.4561L21.7879 7C22.3909 7.48315 23.161 7.77293 24.0001 7.77293Z'
								fill={isVisible ? `#${r}${g}${b}${hasAlpha ? a : ''}` : ''}
							/>
						</svg>
					) : (
						<div className='-empty' />
					)}
				</div>
			)
		})

	return (
		<div className='_Color'>
			<div className='title'>{title}</div>
			<div className='block'>
				<div className='arrow' onClick={() => handleChangeValue(-1)} />
				<div className={`list ${list.length <= 5 && 'center'}`}>{renderList()}</div>
				<div className='arrow' onClick={() => handleChangeValue(1)} />
			</div>
		</div>
	)
}

export default Color
