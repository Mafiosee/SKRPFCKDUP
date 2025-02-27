import React, { useEffect, useMemo, useState } from 'react'
import './styles.sass'

type Props = {
	title: string
	list: { id: any, name: string }[]
	currentId: any
	select: (id: any) => void
}

const CreateLotSelect: React.FC<Props> = ({ title, list, currentId, select }) => {
	const [opened, setOpened] = useState(false)

	const current = useMemo(() => list.find(item => item.id === currentId), [currentId, list])

	const renderedItems = useMemo(() => list.map(item => (
		<div
			key={item.id}
			className='item'
			onClick={() => {
				select(item.id)
				setOpened(false)
			}}
		>{item.name}</div>
	)), [list, select])

	return (
		<div className='CreateLotSelect'>
			<div className='title'>{title}</div>
			<div className='select'>
				<div
					className={`current ${opened && '-opened'}`}
					onClick={() => setOpened(prev => !prev)}
				>{current?.name ?? 'Не выбрано'}</div>
				<div className={`list ${opened && '-opened'}`}>{renderedItems}</div>
			</div>
		</div>
	)
}

export default CreateLotSelect
