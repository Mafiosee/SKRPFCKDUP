import './styles.sass'
import React, { useMemo } from 'react'
import { CharSlots, ItemType } from '../../../../shared/inventory/itemType'
import { useAppSelector } from '../../../../hooks/redux'
import { CategoryIcons } from '../../assets/categories'

type Props = {
	activeCategory: CharSlots | ItemType | null;
	setActiveCategory: (category: CharSlots | ItemType | null) => void;
};

const Categories: React.FC<Props> = ({ activeCategory, setActiveCategory }) => {
	const { products } = useAppSelector((state) => state.armorStore)

	const categories = useMemo(() => {
		const productCategories = products.map((product) => {
			if (product.charSlot != null) {
				return product.charSlot
			} else if (product.itemType != null) {
				return product.itemType
			}
		})
		const allCategories = [
			CharSlots.Headdress,
			CharSlots.Outerwear,
			ItemType.Armor, // -----
			CharSlots.Bracers,
			CharSlots.Backpack,
			CharSlots.Amulet,
			CharSlots.Ring,
			CharSlots.Shoes,
			CharSlots.FirstHand,
			CharSlots.SecondHand,
			ItemType.Weapon, // -----
			ItemType.Backpack, // -----
			ItemType.Potions, // -----
			ItemType.Manuscripts, // -----
			ItemType.Food, // -----
			ItemType.Drinks, // -----
			ItemType.Ingredients, // -----
			ItemType.Resources, // -----
			ItemType.Other, // -----
			ItemType.Accessories, // -----
			ItemType.Clothes, // -----
		]
		return allCategories
			.map((category) =>
				productCategories.includes(category) ? category : null,
			)
			.filter((category) => category != null)
	}, [products])

	const renderCategories = () =>
		categories.map((category) => {
			if (category == null) {
				return
			}

			const isActive = activeCategory === category
			const setActive = () => setActiveCategory(category)

			return (
				<div
					key={category}
					className={`category ${isActive && '-active'}`}
					onClick={setActive}
				>
					<div
						className='icon'
						style={{ backgroundImage: `url(${CategoryIcons[category]})` }}
					/>
				</div>
			)
		})

	return <div className='_Categories'>{renderCategories()}</div>
}

export default Categories
