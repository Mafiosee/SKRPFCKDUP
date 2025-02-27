import './styles.sass'
import React, { useEffect, useState } from 'react'
import { calcVh } from '../../../../utils/calcVh'
import { ComponentList } from '../../../../shared/Modal/Component/List'

type Props = {
	component: ComponentList
	currentItemId: any
	setCurrentItemId: (itemId: any) => void
}

const List: React.FC<Props> = ({ component, currentItemId, setCurrentItemId }) => {
	const [isOpened, setIsOpened] = useState(false)

	useEffect(() => {
		const onClick = () => setIsOpened(false)
		document.addEventListener('click', onClick)
		return () => {
			document.addEventListener('click', onClick)
		}
	}, [])

	const getList = () =>
		component.items.map(({ id, text }) => {
			return (
				<div key={id} className='item' onClick={() => setCurrentItemId(id)}>
					{text}
				</div>
			)
		})

	const currentItem = component.items.find(el => el.id === currentItemId)

	return (
		<div className='_List' style={{ marginBottom: calcVh(component.marginBottom) }}>
			<div
				className={`current ${isOpened && '-active'}`}
				onClick={event => {
					event.stopPropagation()
					setIsOpened(prev => !prev)
				}}
			>
				{currentItem ? currentItem.text : 'Выберите из списка'}
			</div>
			<div className={`list ${isOpened && '-opened'}`}>{getList()}</div>
		</div>
	)
}

export default List
