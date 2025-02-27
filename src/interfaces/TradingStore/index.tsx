import React, { useEffect, useRef, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CSSTransition } from 'react-transition-group'
import { tradingStoreActions } from './reducer'
import { callClient } from '../../utils/api'
import { TradingStoreEvents } from '../../shared/TradingStore/events'
import Navbar from './components/Navbar'
import QualitySelector from './components/QualitySelector'
import { Quality } from '../../shared/inventory/itemType'
import Search from './components/Search'
import Products from './components/Products'
import { BuyProductData } from './data/buyProduct'
import BuyProduct from './components/BuyProduct'
import { KeyCodes } from '../../utils/keyCodes'
import { useEscClose } from '../../hooks/useEscClose'

const TradingStore: React.FC = () => {
	const dispatch = useAppDispatch()
	const { isOpen, categories, products } = useAppSelector(
		(state) => state.tradingStore,
	)
	const nodeRef = useRef(null)
	const [activeCategoryId, setActiveCategoryId] = useState(null)
	const [activeQuality, setActiveQuality] = useState<Quality | null>(null)
	const [search, setSearch] = useState('')
	const [buyProduct, setBuyProduct] = useState<BuyProductData>({
		isOpen: false,
		product: null,
	})

	useEscClose({ isOpenInterface: isOpen, closeEvent: TradingStoreEvents.Close })

	// useEffect(() => {
	// 	setTimeout(() => dispatch(tradingStoreActions.show()), 150)
	// }, [dispatch])

	useEffect(() => {
		setActiveCategoryId(null)
		setActiveQuality(null)
		setSearch('')
		setBuyProduct((prev) => ({ ...prev, isOpen: false }))
	}, [categories, products])

	return (
		<CSSTransition
			in={isOpen}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='TradingStore'
			nodeRef={nodeRef}
		>
			<div className='TradingStore' ref={nodeRef}>
				<div className='window'>
					<div className='title'>Торговая лавка</div>
					<div
						className='close'
						onClick={() => callClient(TradingStoreEvents.Close)}
					/>
					<Navbar
						activeCategoryId={activeCategoryId}
						setActiveCategoryId={setActiveCategoryId}
					/>
					<div className='row'>
						<QualitySelector
							activeQuality={activeQuality}
							setActiveQuality={setActiveQuality}
						/>
						<Search search={search} setSearch={setSearch} />
					</div>
					<Products
						activeCategoryId={activeCategoryId}
						activeQuality={activeQuality}
						search={search}
						buyProduct={(product) =>
							setBuyProduct((prev) => ({ ...prev, isOpen: true, product }))
						}
					/>
				</div>
				<BuyProduct
					data={buyProduct}
					close={() => setBuyProduct((prev) => ({ ...prev, isOpen: false }))}
				/>
			</div>
		</CSSTransition>
	)
}

export default TradingStore
