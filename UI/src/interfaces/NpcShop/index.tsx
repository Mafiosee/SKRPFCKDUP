import React, { useEffect, useRef, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CSSTransition } from 'react-transition-group'
import { npcShopActions } from './reducer'
import { Quality } from '../../shared/inventory/itemType'
import { callClient } from '../../utils/api'
import { numberWithSeparator } from '../../utils/numberWithSeparator'
import ConfirmWindow from '../SellResource/components'
import { ItemInfo } from '../SellResource'
import ConfirmBuyWindow from './components'
import { BuyPayload, NpcShopEvents } from '../../shared/NpcShop/events'
import { ButtonTypes } from '../../shared/NpcShop/type'
import { ItemImagesSquad } from '../Inventory/assets/items'
import { KeyCodes } from '../../utils/keyCodes'
import { useEscClose } from '../../hooks/useEscClose'

const QualityColor = {
  [Quality.Unusual]: '#3F3F3F',
  [Quality.Normal]: 'rgb(62, 127, 69)',
  [Quality.Rare]: 'rgb(71, 106, 173)',
  [Quality.Epic]: 'rgb(110, 51, 144)',
  [Quality.Legendary]: 'rgb(173, 157, 71)',
}

export const ColorClassName = {
  [ButtonTypes.Primary]: '-primary',
  [ButtonTypes.Secondary]: '-secondary',
  [ButtonTypes.Warning]: '-warning',
}

const MAX_AVAILABLE_DISTANCE_FOR_OPEN = 25 // px
const SCROLL_SPEED = 0.8

const NpcShop = () => {
  const dispatch = useAppDispatch()
  const { isOpen, categories, products } = useAppSelector(
    (state) => state.npcShop,
  )
  const nodeRef = useRef(null)
  const [activeCategoryId, setActiveCategoryId] = useState<unknown>(null)
  const [activeItemId, setActiveItemId] = useState<unknown>(null)

  const [showConfirmWindow, setShowConfirmWindow] = useState(false)
  const [itemInfo, setItemInfo] = useState<ItemInfo | null>(null)

  //scroll
  const itemsRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [startY, setStartY] = useState<number>(0)
  const [scrollTop, setScrollTop] = useState<number>(0)

  useEscClose({ isOpenInterface: isOpen, closeEvent: NpcShopEvents.Close })

  // useEffect(() => {
  // 	setTimeout(() => dispatch(npcShopActions.show()), 150)
  // }, [dispatch])

  useEffect(() => {
    setActiveCategoryId(categories.length ? categories[0].id : null)
  }, [categories])

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
    setStartY(e.clientY)
    setScrollTop(itemsRef.current?.scrollTop || 0)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !itemsRef.current) {
      return
    }

    const deltaY = (e.clientY - startY) * SCROLL_SPEED
    itemsRef.current.scrollTop = scrollTop - deltaY
  }

  const onClickCategoryBlock = (id: string) => {
    setActiveCategoryId(id)
  }

  const onClickItem = (Item: ItemInfo, id: number) => {
    if (
      itemsRef.current == null ||
      itemsRef.current.scrollTop >
        scrollTop + MAX_AVAILABLE_DISTANCE_FOR_OPEN ||
      itemsRef.current.scrollTop <
        scrollTop - MAX_AVAILABLE_DISTANCE_FOR_OPEN ||
      activeItemId === id
    ) {
      return
    }
    setItemInfo(Item)
    setActiveItemId(id)
    setShowConfirmWindow(true)
  }

  const hideConfirmWindow = () => {
    setShowConfirmWindow(false)
  }

  const onClickCloseConfirmWindow = () => {
    hideConfirmWindow()
    setActiveItemId(null)
  }

  const onClickBuyConfirmWindow = () => {
    const payload: BuyPayload = { productId: activeItemId, amount: 1 }
    callClient(NpcShopEvents.Buy, payload)

    hideConfirmWindow()
    setActiveItemId(null)
  }

  const onClickBuyConfirmWindowWithAmount = (amount: number) => {
    const payload: BuyPayload = { productId: activeItemId, amount }
    callClient(NpcShopEvents.Buy, payload)
    hideConfirmWindow()
    setActiveItemId(null)
  }

  const onClickClose = () => {
    callClient(NpcShopEvents.Close)
  }

  const getCategories = () =>
    categories.map(({ id, name }) => {
      const isActive = id === activeCategoryId
      return (
        <div
          key={id}
          className={`category ${isActive && '-active'}`}
          onClick={() => onClickCategoryBlock(id)}
        >
          {isActive && <div className={'shadow'} />}
          <div className="span">{name}</div>
        </div>
      )
    })

  const getProducts = () => {
    return products
      .filter((el) => el.categoryId === activeCategoryId)
      .map(({ id, price, amount, image, quality, name }) => {
        const Item: ItemInfo = {
          name,
          price,
          amount: amount ?? 0,
        }
        return (
          <div
            key={id}
            className={`product ${activeItemId === id && '-active'}`}
            onClick={() => onClickItem(Item, id)}
          >
            <div className="hover" />
            <div className="info">
              <div className="name">{name}</div>
              <div className="price">
                <div className="coin" />
                <div className="amount">
                  <span>{numberWithSeparator(price, ' ')}</span>
                  {amount == null
                    ? ''
                    : `/ ${numberWithSeparator(amount, ' ')} шт`}
                </div>
              </div>
            </div>
            <div className="image">
              <div className="watermark">
                <div
                  className="effects"
                  style={{ backgroundColor: QualityColor[quality] }}
                />
                <div
                  className="image"
                  style={{
                    backgroundImage: `url(${ItemImagesSquad[`${image}.png`]})`,
                  }}
                />
              </div>
            </div>
          </div>
        )
      })
  }

  const getConfirmWindow = () => {
    if (!itemInfo) {
      return
    }

    return !itemInfo.amount ? (
      <ConfirmWindow
        blockName={'Покупка'}
        item={itemInfo}
        exit={onClickCloseConfirmWindow}
        mainBtn={onClickBuyConfirmWindow}
        text={'Вы действительно хотите купить:'}
        mainBtnText={'Купить'}
        buttonType={ButtonTypes.Primary}
      />
    ) : (
      <ConfirmBuyWindow
        blockName={'Покупка'}
        item={itemInfo}
        text={'Введите кол-во товара:'}
        exit={onClickCloseConfirmWindow}
        confirm={onClickBuyConfirmWindowWithAmount}
        confirmText={'Оплатить'}
        buttonType={ButtonTypes.Primary}
      />
    )
  }

  return (
    <CSSTransition
      in={isOpen}
      timeout={0}
      mountOnEnter
      unmountOnExit
      classNames="NpcShop"
      nodeRef={nodeRef}
    >
      <div className="NpcShop" ref={nodeRef}>
        <div className="bg-content">
          <div className="full-size-shadow" />
          <div className="left-block-shadow" />
          <div className="left-block-shadow-2" />
          <div className={`watermark -top`} />
          <div className={`watermark -bottom`} />
          <div className="effect" />
        </div>

        <div className={`confirm-window ${showConfirmWindow && '-show'} `}>
          <div className="window">{getConfirmWindow()}</div>
        </div>

        <div className="window" onMouseUp={handleMouseUp}>
          <div className="name">{'Матерый рыбак'}</div>
          <div className="categories">{getCategories()}</div>

          <div
            className="items"
            ref={itemsRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
          >
            {getProducts()}
          </div>

          <div className="btn-exit" onClick={onClickClose}>
            {'Покинуть торговца'}
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}

export default NpcShop
