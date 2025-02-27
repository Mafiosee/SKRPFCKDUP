import React, { useEffect, useRef, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CSSTransition } from 'react-transition-group'
import ExitButton from './components/ExitButton'
import Balance from './components/Balance'
import StoreName from './components/StoreName'
import { Quality } from '../../shared/inventory/itemType'
import QualitySelector from './components/QualitySelector'
import Search from './components/Search'
import { callClient } from '../../utils/api'
import Products from './components/Products'
import { CategoryNames } from './data/category'
import Categories from './components/Categories'
import BuyButton from './components/BuyButton'
import Colors from './components/Colors'
import { Category } from '../../shared/TattooShop/Category'
import { tattooShopActions } from './reducer'
import {
	TattooShopEvents,
	TattooShopPayloads,
} from '../../shared/TattooShop/events'
import { KeyCodes } from '../../utils/keyCodes'
import { useEscClose } from '../../hooks/useEscClose'

const TattooShop: React.FC = () => {
	const dispatch = useAppDispatch()
	const { isOpen, products, colors } = useAppSelector(
		(state) => state.tattooShop,
	)
	const nodeRef = useRef(null)
	const [activeProductId, setActiveProductId] = useState(null)
	const [activeQuality, setActiveQuality] = useState<Quality | null>(null)
	const [search, setSearch] = useState('')
	const [activeCategory, setActiveCategory] = useState<Category | null>(null)
	const [activeColorId, setActiveColorId] = useState(null)

	useEscClose({ isOpenInterface: isOpen, closeEvent: TattooShopEvents.Close })

	// useEffect(() => {
	//   setTimeout(() => dispatch(tattooShopActions.show()), 150);
	// }, [dispatch]);

	useEffect(() => {
		setActiveProductId(products.length ? products[0].id : null)
		setActiveQuality(null)
		setSearch('')
		setActiveCategory(products.length ? products[0].category : null)
		setActiveColorId(colors.length ? colors[0].id : null)
	}, [isOpen, products, colors])

	useEffect(() => {
		if (!isOpen) {
			return
		}
		const payload: TattooShopPayloads[TattooShopEvents.SetActiveProduct] = {
			productId: activeProductId,
		}
		callClient(TattooShopEvents.SetActiveProduct, payload)
	}, [isOpen, activeProductId])

	useEffect(() => {
		if (!isOpen) {
			return
		}
		const payload: TattooShopPayloads[TattooShopEvents.SetActiveColor] = {
			colorId: activeColorId,
		}
		callClient(TattooShopEvents.SetActiveColor, payload)
	}, [isOpen, activeColorId])

	return (
		<CSSTransition
			in={isOpen}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='TattooShop'
			nodeRef={nodeRef}
		>
			<div className='TattooShop' ref={nodeRef}>
				<ExitButton />
				<Balance />
				<StoreName />
				<Colors
					activeColorId={activeColorId}
					setActiveColorId={setActiveColorId}
				/>
				<div className='row'>
					<QualitySelector
						activeQuality={activeQuality}
						setActiveQuality={setActiveQuality}
					/>
					<Search search={search} setSearch={setSearch} />
				</div>
				<div className='category'>
					{activeCategory != null && CategoryNames[activeCategory]}
				</div>
				<Products
					activeProductId={activeProductId}
					setActiveProductId={setActiveProductId}
					activeQuality={activeQuality}
					search={search}
				/>
				<BuyButton
					activeProductId={activeProductId}
					activeColorId={activeColorId}
				/>
				<Categories
					activeCategory={activeCategory}
					setActiveCategory={setActiveCategory}
				/>
			</div>
		</CSSTransition>
	)
}

export default TattooShop
