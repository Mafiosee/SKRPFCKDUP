import './styles.sass'
import React from 'react'

type Props = {
	search?: {
		value: string
		serValue: (newValue: string) => void
	}
	categories: {
		list: { id: any; name: string; amount?: number }[]
		activeId: any
		setActiveId: (categoryId: any) => void
	}
}

const Categories: React.FC<Props> = ({ search = null, categories }) => {
	const getCategories = () =>
		categories.list.map(({ id, name, amount = null }) => {
			const isActive = categories.activeId === id
			const setActive = () => categories.setActiveId(id)

			return (
				<div
					key={id}
					className={`category ${isActive && '-active'}`}
					onClick={setActive}
				>
					<div className='name'>{name}</div>
					{amount !== null && <div className='amount'>{amount}</div>}
				</div>
			)
		})

	return (
		<div className='_Categories'>
			<div className='search'>
				<input
					type='text'
					placeholder='Поиск'
					value={search.value}
					onChange={event => search.serValue(event.target.value)}
				/>
				<div className={`icon ${search.value.length && '-active'}`} />
			</div>
			<div className='list'>{getCategories()}</div>
		</div>
	)
}

export default Categories
