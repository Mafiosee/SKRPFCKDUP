import React, { useEffect, useMemo, useRef, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CSSTransition } from 'react-transition-group'
import { callClient } from '../../utils/api'
import { tradingTavernActions } from './reducer'
import { TradingTavernEvents, TradingTavernPayloads } from '../../shared/TradingTavern/events'
import { BodyImages, ThemeClass, HeadImages, TableImages, TableNameColor } from './assets/theme'
import { Product } from '../../shared/TradingTavern/Product'
import { HoverInfo, hoverInfoDefault } from '../Inventory/types'
import Hover from '../Inventory/components/Hover'
import { TimeoutRef } from '../../types/timeoutRef'
import { QualityNoShadowIcon } from '../DonateStore/data/quality'
import { QualityColors, QualityNames } from '../Inventory/data'
import { numberWithSeparator } from '../../utils/numberWithSeparator'
import { ItemImagesSquad } from '../Inventory/assets/items'
import { calcVh } from '../../utils/calcVh'
import { ItemType } from '../../shared/inventory/itemType'
import { KeyCodes } from '../../utils/keyCodes'
import { useEscClose } from '../../hooks/useEscClose'

const TradingTavern: React.FC = () => {
	const dispatch = useAppDispatch()
	const { isOpen, info, categories, products } = useAppSelector(
		(state) => state.tradingTavern,
	)
	const nodeRef = useRef(null)
	const [activeCategoryId, setActiveCategoryId] = useState<string | number>(-1)
	const [search, setSearch] = useState('')
	const [buyProduct, setBuyProduct] = useState<{ isOpen: boolean, product: Product | null, amount: number | '' }>({
		isOpen: false,
		product: null,
		amount: 1,
	})
	const [pageNumber, setPageNumber] = useState<number>(0)
	const activeCategoryRef = useRef<HTMLDivElement>(null)
	const [hoverInfo, setHoverInfo] = useState<HoverInfo>({
		...hoverInfoDefault,
	})
	const hoverItemTimeout = useRef<TimeoutRef>(null)

	useEscClose({ isOpenInterface: isOpen, closeEvent: TradingTavernEvents.Close })

	// useEffect(() => {
	// 	setTimeout(() => dispatch(tradingTavernActions.show()), 150)
	// }, [dispatch])

	useEffect(() => {
		setPageNumber(0)
	}, [activeCategoryId])

	useEffect(() => {
		setActiveCategoryId(-1)
		setSearch('')
		setBuyProduct({ isOpen: false, product: null, amount: 1 })
	}, [categories, products])

	useEffect(() => {
		const mouseUpHandler = () => {
			setHoverInfo({ ...hoverInfoDefault })
		}

		if (isOpen) {
			document.addEventListener('mouseup', mouseUpHandler)
		}
		return () => {
			document.removeEventListener('mouseup', mouseUpHandler)
		}
	}, [isOpen])

	useEffect(() => {
		if (activeCategoryRef.current == null) {
			return
		}
		activeCategoryRef.current.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'center' })
	}, [activeCategoryId])

	const categoriesList = useMemo(() => [{ id: -1, name: 'Все' }, ...categories], [categories])

	const renderCategories = () => categoriesList.map(({ id, name }) => {
		const isActive = activeCategoryId === id
		const setActive = () => setActiveCategoryId(id)

		return (
			<div key={id} ref={isActive ? activeCategoryRef : undefined}
					 className={`category ${ThemeClass[info.type]} ${isActive && '-active'}`}
					 onClick={setActive}>{name}</div>
		)
	})

	const changeActiveCategory = (diff: number) => {
		const list = [-1, ...categories.map(el => el.id)]
		const currentIndex = list.findIndex(id => id === activeCategoryId)
		let newIndex = currentIndex + diff
		const limits = { min: 0, max: list.length - 1 }
		if (newIndex < limits.min) {
			newIndex = limits.min
		} else if (newIndex > limits.max) {
			newIndex = limits.max
		}
		const newActiveCategoryId = list[newIndex]
		setActiveCategoryId(newActiveCategoryId)
	}

	const renderProduct = (product: Product) => {
		return (
			<div
				key={product.id} className='product'
				style={{ backgroundImage: `url(${ItemImagesSquad[`${product.image}.png`]})` }}
				onMouseEnter={() => {
					setHoverInfo(prev => ({ ...prev, itemId: product.id }))
					if (hoverItemTimeout.current != null) {
						clearTimeout(hoverItemTimeout.current)
					}
				}}
				onMouseLeave={() => {
					hoverItemTimeout.current = setTimeout(() => {
						setHoverInfo(prev => ({ ...prev, itemId: null }))
					}, 50)
				}}
				onClick={() => {
					setBuyProduct({ isOpen: true, product, amount: 1 })
					setTimeout(() => {
						setHoverInfo(prev => ({ ...prev, itemId: null }))
					}, 50)
				}}
			/>
		)
	}

	const CategoryIdList = useMemo(() => [-1, ...(categories.map(category => category.id))], [categories])

	const FilteredProductPages = useMemo(() => {
		const result: Record<any, Product[][][]> = {}
		CategoryIdList.forEach(categoryId => {
			let productList = categoryId === -1 ? products : products.filter(product => product?.categoryId === categoryId)
			productList = productList.filter(product => product.info.name.toLowerCase().includes(search.toLowerCase()))
			const splitProductList: Product[][] = []
			let splitProducts: Product[] = []
			productList.forEach((product, index) => {
				splitProducts.push(product)
				if (splitProducts.length === 6) {
					splitProductList.push(splitProducts)
					splitProducts = []
				} else if (index === productList.length - 1) {
					splitProductList.push(splitProducts)
				}
			})
			const splitPages: Product[][][] = []
			let splitPage: Product[][] = []
			splitProductList.forEach((splitProducts, index) => {
				splitPage.push(splitProducts)
				if (splitPage.length === 3) {
					splitPages.push(splitPage)
					splitPage = []
				} else if (index === splitProductList.length - 1) {
					while (splitPage.length < 3) {
						splitPage.push([])
					}
					splitPages.push(splitPage)
				}
			})
			result[categoryId] = splitPages
		})
		return result
	}, [CategoryIdList, products, search])

	const renderProducts = useMemo(() => CategoryIdList.map(categoryId => {
		const pages = FilteredProductPages[categoryId]
		const isActive = categoryId === activeCategoryId
		return (
			<div key={categoryId} className={`category ${isActive && '-active'}`}>
				{pages.map((page, pageIndex) => (
					<div key={pageIndex} className='list'
							 style={{ transform: `translateX(${calcVh(-(763 + 120) * pageNumber)})` }}>
						{page.map((row, rowIndex) => (
							<div key={rowIndex} className='row'>
								{row.map(renderProduct)}
							</div>
						))}
					</div>
				))}
			</div>
		)
	}), [CategoryIdList, FilteredProductPages, activeCategoryId, pageNumber, search])

	useEffect(() => {
		if (hoverInfo.itemId != null) {
			const hasItem = products.some((item) => item?.id === hoverInfo.itemId)
			if (!hasItem) {
				setHoverInfo((prev) => ({ ...prev, itemId: null }))
			}
		}
	}, [products, hoverInfo.itemId])

	const updateBuyAmount = (diff: number) => {
		if (buyProduct.amount === '') {
			return setBuyProduct(prev => ({ ...prev, amount: 1 }))
		}
		let newAmount = buyProduct.amount + diff
		const limits = { min: 1, max: buyProduct.product?.maxAmount || 1 }
		if (newAmount < limits.min) {
			newAmount = limits.min
		} else if (newAmount > limits.max) {
			newAmount = limits.max
		}
		setBuyProduct(prev => ({ ...prev, amount: newAmount }))
	}

	const onChangeAmount = (value: string) => {
		if (!value.length) {
			return setBuyProduct(prev => ({ ...prev, amount: '' }))
		}
		let intValue = parseInt(value)
		if (isNaN(intValue) || intValue < 0) {
			return
		}
		if (intValue > (buyProduct.product?.maxAmount || 1)) {
			intValue = (buyProduct.product?.maxAmount || 1)
		}
		setBuyProduct(prev => ({ ...prev, amount: intValue }))
	}

	return (
		<CSSTransition
			in={isOpen}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='TradingTavern'
			nodeRef={nodeRef}
		>
			<div className='TradingTavern' ref={nodeRef}>
				<Hover info={hoverInfo} items={products} />
				<div className='window'>
					<div className='head' style={{ backgroundImage: `url(${HeadImages[info.type]})` }}>
						<div className='close' onClick={() => callClient(TradingTavernEvents.Close)} />
						<div className='name'>
							<div className='shadow' />
							<div className='table' style={{
								backgroundImage: `url(${TableImages[info.type]})`,
								color: TableNameColor[info.type],
							}}>{info.name}</div>
						</div>
					</div>
					<div className='body' style={{ backgroundImage: `url(${BodyImages[info.type]})` }}>
						<div className='products'>
							{pageNumber !== 0 && (
								<div className={`arrow ${ThemeClass[info.type]} -left`}
										 onClick={() => setPageNumber(prev => prev - 1)} />
							)}
							{renderProducts}
							{pageNumber < FilteredProductPages[activeCategoryId].length - 1 && (
								<div className={`arrow ${ThemeClass[info.type]} -right`}
										 onClick={() => setPageNumber(prev => prev + 1)} />
							)}
						</div>
						<div className='controls'>
							<div className='categories'>
								<div className={`arrow ${ThemeClass[info.type]} -left`} onClick={() => changeActiveCategory(-1)} />
								<div className='list'>
									{renderCategories()}
								</div>
								<div className={`arrow ${ThemeClass[info.type]} -right`} onClick={() => changeActiveCategory(1)} />
							</div>
							<div className={`search ${ThemeClass[info.type]} ${search.length && '-filled'}`}>
								<input type='text' placeholder='Текст' value={search} onChange={e => {
									if (e.target.value.length > 20) {
										return
									}
									setSearch(e.target.value)
								}} />
								<div className='icon' />
								<div className='background' />
								<div className='clear' onClick={() => setSearch('')} />
							</div>
						</div>
					</div>
				</div>
				<div className={`buyProduct ${buyProduct.isOpen && '-opened'}`}>
					<div className='shadow' />
					{buyProduct.product != null && (
						<div className='window'>
							<div className='title'>Покупка товара</div>
							<div className='close' onClick={() => setBuyProduct(prev => ({ ...prev, isOpen: false }))} />
							<div className='row'>
								<div className='image'
										 style={{ backgroundImage: `url(${ItemImagesSquad[`${buyProduct.product.image}.png`]})` }} />
								<div className='info'>
									<div className='name'>{buyProduct.product.info.name}</div>
									<div className='quality'>
										<div className='icon'
												 style={{ backgroundImage: `url(${QualityNoShadowIcon[buyProduct.product.info.quality]})` }} />
										<div className='text'
												 style={{ color: QualityColors[buyProduct.product.info.quality] }}>{QualityNames[buyProduct.product.info.quality]}</div>
									</div>
									<div className='line'></div>
									<div className='amount'>
										<div
											className={`button -minus ${+buyProduct.amount <= (buyProduct.product.maxAmount ?? 1) && '-disabled'}`}
											onClick={() => updateBuyAmount(-1)} />
										<input type='text' placeholder='1' value={buyProduct.amount}
													 onChange={e => onChangeAmount(e.target.value)} />
										<div
											className={`button -plus ${+buyProduct.amount >= (buyProduct.product.maxAmount ?? 1) && '-disabled'}`}
											onClick={() => updateBuyAmount(1)} />
									</div>
									<div className='price'>
										{numberWithSeparator(buyProduct.product.price, '.')} / шт
									</div>
								</div>
							</div>
							<div className='buttons'>
								<div className='button -buy' onClick={() => {
									const payload: TradingTavernPayloads[TradingTavernEvents.Buy] = {
										productId: buyProduct.product?.id,
										amount: buyProduct.amount || 1,
									}
									callClient(TradingTavernEvents.Buy, payload)
									setBuyProduct(prev => ({ ...prev, isOpen: false }))
								}}>
									Приобрести
									<div className='icon' />
									{numberWithSeparator(buyProduct.product.price * (buyProduct.amount || 1), '')}
								</div>
								<div className='button -cancel'
										 onClick={() => setBuyProduct(prev => ({ ...prev, isOpen: false }))}>Отмена
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</CSSTransition>
	)
}

export default TradingTavern
