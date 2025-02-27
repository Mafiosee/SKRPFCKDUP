import './styles.sass'
import React, { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { BackKeys, ValuesKeys } from '../../types'
import { callClient } from '../../../../utils/api'
import { createCharacterActions } from '../../reducer'
import { importAllImagesFromFolder } from '../../../../utils/images'
import { Parts } from '../../../../shared/characterEditor/enums/Parts'
import { CreateCharacterEvents } from '../../../../shared/characterEditor/events'

export const Images: Record<string, string> = importAllImagesFromFolder(
	require.context('../../assets/images/clothes/', false, /.png$/)
)

type ClothesProps = {
	componentId: ValuesKeys
	title: string
	list: { id: any; name: string; image: string }[]
}

const Clothes: React.FC<ClothesProps> = ({ componentId, title, list }) => {
	const dispatch = useAppDispatch()
	const { values } = useAppSelector(state => state.createCharacter)
	const activeClothesRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		activeClothesRef.current?.scrollIntoView({
			block: 'nearest',
			behavior: 'smooth',
		})
	}, [activeClothesRef.current])

	const renderList = () =>
		list.map(({ id, name, image }) => {
			const isActive = id === values[componentId]
			const setActive = () => {
				dispatch(createCharacterActions.setValue({ id: componentId, value: id }))
				callClient(CreateCharacterEvents.UpdatePart, {
					part: Parts.Clothes,
					data: {
						// @ts-expect-error qwe
						[BackKeys[componentId]]: id,
					},
				})
			}
			return (
				<div
					className={`item ${isActive && '-active'}`}
					key={id}
					onClick={setActive}
					ref={isActive ? activeClothesRef : null}
				>
					<div className='image' style={{ backgroundImage: `url(${Images[`${image}.png`]})` }} />
					<div className='cover' />
					<div className='name'>{name}</div>
				</div>
			)
		})

	return (
		<div className='_Clothes'>
			<div className='title'>{title}</div>
			<div className='list'>{renderList()}</div>
		</div>
	)
}

export default Clothes
