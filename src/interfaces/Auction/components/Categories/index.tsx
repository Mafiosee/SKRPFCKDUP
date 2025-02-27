import React from 'react'
import './styles.sass'
import { LotType } from '../../../../shared/Auction/LotType'
import { TabCategoriesTitle, TabId } from '../../types/Tabs'
import { CategoriesList } from '../../types/Categories'
import { useAppSelector } from '../../../../hooks/redux'

type Props = {
	activeTabId: TabId,
	activeCategoryId: LotType | null,
	setActiveCategoryId: (categoryId: LotType | null) => void,
}

const Categories: React.FC<Props> = ({ activeTabId, activeCategoryId, setActiveCategoryId }) => {
	const { lots } = useAppSelector(state => state.auction)

	const getCategories = () => CategoriesList.map(category => {
		const isActive = activeCategoryId === category.lotType
		const setActive = () => setActiveCategoryId(category.lotType)

		return <div key={category.lotType} className={`category ${isActive && '-active'}`}
								onClick={setActive}>{category.name}</div>
	})

	return activeTabId === TabId.SelfLots && !lots.filter(lot => lot.isSelf).length ? null : (
		<div className='Categories'>
			<div className='row'>
				<div className='title'>{TabCategoriesTitle[activeTabId]}</div>
				<div className='categories'>{getCategories()}</div>
			</div>
		</div>
	)
}

export default Categories
