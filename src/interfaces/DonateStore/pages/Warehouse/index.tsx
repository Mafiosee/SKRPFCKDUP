import './styles.sass'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { Tab } from '../../enums/Tabs'
import Categories from '../../components/Categories'
import Product from '../../components/Product'
import type { WarehouseItem } from '../../../../shared/DonateStore/PageWarehouse'
import { Background } from './Background'
import {
  QualityColor,
  QualityName,
  QualityNoShadowIcon,
} from '../../data/quality'
import { ApiFunctions } from '../../api'
import {
  DonateStoreEvents,
  DonateStorePayloads,
} from '../../../../shared/DonateStore/events'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'
import { donateStoreActions } from '../../reducer'
import { ItemImagesSquad } from '../../../Inventory/assets/items'
import { callClient } from '../../../../utils/api'
import { getImageUrlBySourceType } from '../../../../utils/getImageUrlBySourceType'

const PageWarehouse: React.FC = () => {
  const dispatch = useAppDispatch()
  const {
    tab,
    giftPlayer,
    pageWarehouse: { categories, items },
  } = useAppSelector((state) => state.donateStore)
  const [activeCategoryId, setActiveCategoryId] = useState(null)
  const [search, setSearch] = useState('')
  const [popup, setPopup] = useState<{
    isOpen: boolean
    item: WarehouseItem | null
    isGift: boolean
    amount: number | string
    input: string
  }>({ isOpen: false, item: null, isGift: false, amount: 1, input: '' })

  const showPopup = useCallback(
    (item: WarehouseItem) => {
      dispatch(donateStoreActions.setGiftPlayer(null))
      setPopup((prev) => {
        return {
          ...prev,
          isOpen: true,
          isGift: false,
          item,
          amount: 1,
          input: '',
        }
      })
    },
    [dispatch],
  )

  const isOpen = useMemo(() => tab === Tab.Warehouse, [tab])

  const activeCategoryIdx = useMemo(
    () => categories.findIndex((el) => el.id === activeCategoryId),
    [categories, activeCategoryId],
  )

  useEffect(() => {
    setActiveCategoryId(categories[0]?.id ?? null)
  }, [categories])

  const getItems = (categoryId: any) => {
    const list = items
      .filter((el) => {
        if (search.length) {
          return el.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
        }
        return el.categoryIds.includes(categoryId)
      })
      .map((product) => (
        <Product
          key={product.id}
          info={{
            ...product,
            description: {
              small: product.description,
              large: product.description,
            },
          }}
          setOpenedId={() => showPopup(product)}
        />
      ))

    while (list.length < 8) {
      list.push(<div className="empty" />)
    }

    return list
  }

  const getCategoryBlocks = () =>
    categories.map((category, idx) => {
      const isActive = category.id === activeCategoryId

      return (
        <div
          className={`block ${isActive && '-active'}`}
          key={category.id}
          style={{
            transform: `translateY(${(activeCategoryIdx - idx) * 100}%)`,
          }}
        >
          <div className="title">{category.name}</div>
          <div className="list">{getItems(category.id)}</div>
        </div>
      )
    })

  const changeGiftAmount = (diff: number) => {
    let newAmount: number
    if (typeof popup.amount === 'string') {
      newAmount = 0
    } else {
      newAmount = popup.amount + diff
      if (newAmount < 1) {
        newAmount = 1
      }
      if (popup?.item?.amount == null) {
        return
      } else if (newAmount > popup.item.amount) {
        newAmount = popup.item.amount
      }
    }
    setPopup((prev) => ({ ...prev, amount: newAmount }))
  }

  return (
    <div
      className="_PageWarehouse"
      style={{
        transform: `translateX(-${tab * 100}%)`,
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
      }}
    >
      <div className="main">
        <Categories
          search={{ value: search, serValue: setSearch }}
          categories={{
            list: categories,
            activeId: activeCategoryId,
            setActiveId: setActiveCategoryId,
          }}
        />
        <div className="content">{getCategoryBlocks()}</div>
      </div>
      <div className={`popup ${popup.isOpen && popup.item != null && '-show'}`}>
        {popup.item != null && (
          <>
            <div className="shadow" />
            <div className="window">
              <div className="background">
                <Background quality={popup.item?.quality} />
              </div>
              <div className="content">
                <div className="title">Заголовок</div>
                <div
                  className="close"
                  onClick={() =>
                    setPopup((prev) => ({ ...prev, isOpen: false }))
                  }
                />
                <div className="row">
                  <div
                    className="image"
                    style={{
                      backgroundImage: `url(${getImageUrlBySourceType(popup.item.image.name, popup.item.image.sourceType)})`,
                    }}
                  />
                  <div className="col">
                    {popup.isGift ? (
                      <div className="info">
                        <div className="title">Вы дарите</div>
                        <div className="name">
                          {popup.item.name}
                          {popup.item?.amount > 0 && ` (x${popup.item.amount})`}
                        </div>
                        <div className="quality">
                          <div
                            className="icon"
                            style={{
                              backgroundImage: `url(${QualityNoShadowIcon[popup.item.quality]})`,
                            }}
                          />
                          <div
                            className="text"
                            style={{
                              color: QualityColor[popup.item.quality],
                            }}
                          >
                            {QualityName[popup.item.quality]}
                          </div>
                        </div>
                        <div className="line" />
                        {popup.item?.amount && (
                          <div className="amount">
                            <div
                              className="btn -minus"
                              onClick={() => changeGiftAmount(-1)}
                            />
                            <input
                              type="text"
                              placeholder="1"
                              value={popup.amount}
                              onChange={({ target: { value } }) => {
                                if (!value) {
                                  return setPopup((prev) => ({
                                    ...prev,
                                    amount: value,
                                  }))
                                }
                                const intValue = parseInt(value)
                                if (
                                  isNaN(intValue) ||
                                  intValue < 1 ||
                                  popup?.item?.amount == null ||
                                  intValue > popup.item.amount
                                ) {
                                  return
                                }
                                setPopup((prev) => ({
                                  ...prev,
                                  amount: intValue,
                                }))
                              }}
                            />
                            <div
                              className="btn -plus"
                              onClick={() => changeGiftAmount(1)}
                            />
                          </div>
                        )}
                        <div className="price">
                          {`${numberWithSeparator(popup.item?.price ?? 0, '.')} / шт`}
                        </div>
                      </div>
                    ) : (
                      <div className="buttons">
                        {(popup.item?.buttons ?? []).map((button) => (
                          <div
                            key={button.id}
                            className="button"
                            onClick={() => {
                              setPopup((prev) => ({ ...prev, isOpen: false }))
                              const payload: DonateStorePayloads[DonateStoreEvents.ClickWarehouseButton] =
                                { buttonId: button.id, itemId: popup?.item?.id }
                              callClient(
                                DonateStoreEvents.ClickWarehouseButton,
                                payload,
                              )
                            }}
                          >
                            {button.name}
                          </div>
                        ))}

                        {!popup.item.giftFrom != null && (
                          <div
                            className="button -icon -icon-gift"
                            onClick={() =>
                              setPopup((prev) => ({ ...prev, isGift: true }))
                            }
                          >
                            Подарить
                          </div>
                        )}
                        {popup.item.canSell && (
                          <div
                            className="button -red -icon -icon-sell"
                            onClick={() => {
                              setPopup((prev) => ({ ...prev, isOpen: false }))
                              if (popup?.item != null) {
                                ApiFunctions[
                                  DonateStoreEvents.SellWarehouseItem
                                ]({ itemId: popup.item.id })
                              }
                            }}
                          >
                            Продать
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {popup.isGift ? (
                  <div className="gift">
                    <div className="helper">Введите UID игрока</div>
                    <div className="input">
                      <div
                        className={`block ${(giftPlayer != null || popup.input.length) && '-active'}`}
                      >
                        {giftPlayer ? (
                          <div className="player">
                            {giftPlayer.name} (UID: {giftPlayer.uid})
                          </div>
                        ) : (
                          <input
                            type="text"
                            placeholder="Например: AB1"
                            value={popup.input}
                            onChange={(event) =>
                              setPopup((prev) => ({
                                ...prev,
                                input: event.target.value,
                              }))
                            }
                          />
                        )}
                      </div>
                      <div
                        className={`button ${giftPlayer != null && '-cancel'} ${popup.input.length && '-active'}`}
                        onClick={() => {
                          if (giftPlayer != null) {
                            dispatch(donateStoreActions.setGiftPlayer(null))
                          } else if (popup.input.length) {
                            ApiFunctions[DonateStoreEvents.RequestGiftPlayer]({
                              uid: popup.input,
                            })
                          }
                        }}
                      />
                    </div>
                    <div className="buttons">
                      <div
                        className={`button -gift ${giftPlayer != null && '-active'}`}
                        onClick={() => {
                          if (popup?.item != null && giftPlayer != null) {
                            ApiFunctions[DonateStoreEvents.GiftWarehouseItem]({
                              itemId: popup.item.id,
                              amount: +popup.amount ?? 1,
                              playerUid: giftPlayer.uid,
                            })
                          }
                          setPopup((prev) => ({ ...prev, isOpen: false }))
                        }}
                      >
                        <div className="content">
                          <div className="text">Подарить</div>
                          <div className="price">
                            {numberWithSeparator(
                              (popup.item?.price ?? 0) * (+popup.amount || 1),
                              '.',
                            )}
                          </div>
                        </div>
                      </div>
                      <div
                        className="button -cancel"
                        onClick={() =>
                          setPopup((prev) => ({ ...prev, isOpen: false }))
                        }
                      >
                        Отмена
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="about">
                    <div className="row">
                      <div className="quality">
                        <div
                          className="icon"
                          style={{
                            backgroundImage: `url(${QualityNoShadowIcon[popup.item.quality]})`,
                          }}
                        />
                        <div
                          className="name"
                          style={{ color: QualityColor[popup.item.quality] }}
                        >
                          {QualityName[popup.item.quality]}
                        </div>
                      </div>
                      <div className="separator" />
                      <div className="category">{popup.item.type}</div>
                    </div>
                    <div className="name">
                      {popup.item.name}
                      {popup.item?.amount > 0 && ` (x${popup.item.amount})`}
                    </div>
                    <div className="description">{popup.item.description}</div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default PageWarehouse
