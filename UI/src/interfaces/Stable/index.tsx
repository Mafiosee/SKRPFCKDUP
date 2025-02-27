import React, { useEffect, useRef, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CSSTransition } from 'react-transition-group'
import { stableActions } from './reducer'
import ExitButton from './components/ExitButton'
import Balance from './components/Balance'
import StoreName from './components/StoreName'
import { Quality } from '../../shared/inventory/itemType'
import QualitySelector from './components/QualitySelector'
import Search from './components/Search'
import { callClient } from '../../utils/api'
import { StableEvents, StablePayloads } from '../../shared/Stable/events'
import Products from './components/Products'
import ActiveProduct from './components/ActiveProduct'
import { KeyCodes } from '../../utils/keyCodes'
import { useEscClose } from '../../hooks/useEscClose'

const Stable: React.FC = () => {
	const dispatch = useAppDispatch()
	const { isOpen, products } = useAppSelector((state) => state.stable)
	const nodeRef = useRef(null)
	const [activeProductId, setActiveProductId] = useState(null)
	const [activeQuality, setActiveQuality] = useState<Quality | null>(null)
	const [search, setSearch] = useState('')

	useEscClose({ isOpenInterface: isOpen, closeEvent: StableEvents.Close })

	// useEffect(() => {
	//   setTimeout(() => dispatch(stableActions.show()), 150);
	// }, [dispatch]);

	useEffect(() => {
		setActiveProductId(products.length ? products[0].id : null)
		setActiveQuality(null)
		setSearch('')
	}, [isOpen, products])

	useEffect(() => {
		if (!isOpen) {
			return
		}
		const payload: StablePayloads[StableEvents.SetActiveProduct] = {
			productId: activeProductId,
		}
		callClient(StableEvents.SetActiveProduct, payload)
	}, [isOpen, activeProductId])

	return (
		<CSSTransition
			in={isOpen}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='Stable'
			nodeRef={nodeRef}
		>
			<div className='Stable' ref={nodeRef}>
				<ExitButton />
				<Balance />
				<StoreName />
				<div className='row'>
					<QualitySelector
						activeQuality={activeQuality}
						setActiveQuality={setActiveQuality}
					/>
					<Search search={search} setSearch={setSearch} />
				</div>
				<div className='category'>Лошади</div>
				<Products
					activeProductId={activeProductId}
					setActiveProductId={setActiveProductId}
					activeQuality={activeQuality}
					search={search}
				/>
				<ActiveProduct activeProductId={activeProductId} />
			</div>
		</CSSTransition>
	)
}

export default Stable
