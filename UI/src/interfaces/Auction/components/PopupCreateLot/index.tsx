import React, { useEffect, useMemo, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { auctionActions } from '../../reducer'
import { LotType } from '../../../../shared/Auction/LotType'
import { LotTypeName } from '../../types/LotTypeName'
import { ControlsListItem } from '../ControlSelect'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'
import { getImageByLotType } from '../../assets/LotImages'
import {
  AuctionEvents,
  AuctionPayloads,
} from '../../../../shared/Auction/events'
import { callClient } from '../../../../utils/api'

enum List {
  Category = 'Category',
  Property = 'Property',
}

const PopupCreateLot: React.FC = () => {
  const dispatch = useAppDispatch()
  const { openedCreateLot, property } = useAppSelector((state) => state.auction)
  const [openedList, setOpenedList] = useState<List | null>(null)
  const [lotType, setLotType] = useState<LotType>(LotType.Business)
  const [propertyId, setPropertyId] = useState(null)
  const [price, setPrice] = useState<number | ''>('')
  const [hours, setHours] = useState<number | ''>('')

  useEffect(() => {
    setOpenedList(null)
  }, [openedCreateLot])

  const filteredLotTypes = useMemo(
    () =>
      Object.values(LotType).filter((lotType) =>
        property.some((property) => property.type === lotType),
      ),
    [property],
  )

  useEffect(() => {
    setLotType(filteredLotTypes[0])
  }, [filteredLotTypes])

  const filteredProperty = useMemo(
    () => property.filter((property) => property.type === lotType),
    [property, lotType],
  )

  const activeProperty = useMemo(
    () => property.find((property) => property.id === propertyId),
    [property, propertyId],
  )

  useEffect(() => {
    if (activeProperty != null && activeProperty.type === lotType) {
      return
    }
    if (!filteredProperty.length) {
      return
    }
    setPropertyId(filteredProperty[0].id)
  }, [filteredProperty, activeProperty, lotType])

  useEffect(() => {
    setPrice('')
  }, [activeProperty])

  const toggleOpenedList = (list: List) => {
    if (openedList === list) {
      return setOpenedList(null)
    }
    setOpenedList(list)
  }

  const getSelect = (
    list: List,
    current: string,
    items: ControlsListItem[],
    setFunc: (id: any) => void,
  ) => {
    return (
      <div className="select">
        <div
          className={`current ${openedList === list && '-opened'}`}
          onClick={(event) => {
            event.stopPropagation()
            toggleOpenedList(list)
          }}
        >
          {current}
        </div>
        <div className={`list ${openedList === list && '-opened'}`}>
          {items.map(({ id, name }) => (
            <div key={id} className="item" onClick={() => setFunc(id)}>
              {name}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const handleChangeInput = (
    value: string,
    setFunc: (value: number | '') => void,
  ) => {
    if (!value.length) {
      return setFunc('')
    }
    const intValue = parseInt(value.replace(/\./g, ''))
    if (isNaN(intValue) || intValue < 0) {
      return
    }
    setFunc(intValue)
  }

  const isValid = useMemo(() => {
    if (!activeProperty) {
      return false
    }
    return +price >= activeProperty.statePrice && +hours >= 6 && +hours <= 48
  }, [activeProperty, price, hours])

  const handleCreateLot = () => {
    if (!isValid) {
      return
    }
    const payload: AuctionPayloads[AuctionEvents.CreateLot] = {
      propertyId,
      lotType,
      sum: +price,
      hours: +hours,
    }
    callClient(AuctionEvents.CreateLot, payload)
  }

  return !openedCreateLot || !activeProperty ? null : (
    <div className="PopupCreateLot" onClick={() => setOpenedList(null)}>
      <div className="window">
        <div className="header">
          <div className="title">Создание лота</div>
          <div
            className="close"
            onClick={() => dispatch(auctionActions.setOpenedCreateLot(false))}
          />
        </div>
        <div className="content">
          <div
            className="image"
            style={{
              backgroundImage: `url(${getImageByLotType(activeProperty.type)[`${activeProperty.image}.png`]})`,
            }}
          />
          <div className="body">
            <div className="block">
              <div className="title">Выберите категорию</div>
              {getSelect(
                List.Category,
                LotTypeName[lotType],
                filteredLotTypes.map((lotType) => ({
                  id: lotType,
                  name: LotTypeName[lotType],
                })),
                setLotType,
              )}
            </div>
            <div className="block">
              <div className="title">Ваше имущество</div>
              {getSelect(
                List.Property,
                activeProperty?.name ?? '',
                property.filter((property) => property.type === lotType),
                setPropertyId,
              )}
            </div>
            <div className="block">
              <div className="title">Сумма продажи</div>
              <div className="state-price">
                <div className="title">Базовая стоимость:</div>
                <div className="value">
                  {numberWithSeparator(activeProperty.statePrice, '.')}
                </div>
              </div>
              <div className="input -sum">
                <input
                  type="text"
                  placeholder={numberWithSeparator(
                    activeProperty.statePrice,
                    '.',
                  )}
                  value={price === '' ? price : numberWithSeparator(price, '.')}
                  onChange={(event) =>
                    handleChangeInput(event.target.value, setPrice)
                  }
                />
              </div>
              <div className="helper">
                <div className="text">
                  Начальная ставка не может быть ниже базовой стоимости.
                </div>
              </div>
              <div className="helper">
                <div className="text">
                  Комиссия с продажи лота составляет 5%.
                </div>
              </div>
            </div>
            <div className="block">
              <div className="title">время аукциона</div>
              <div className="input -hours">
                <input
                  type="text"
                  placeholder="Например: 6"
                  value={hours}
                  onChange={(event) =>
                    handleChangeInput(event.target.value, setHours)
                  }
                />
              </div>
              <div className="helper">
                <div className="text">От 6 до 48 часов.</div>
              </div>
            </div>
          </div>
          <div
            className={`button ${!isValid && '-disabled'}`}
            onClick={handleCreateLot}
          >
            Создать лот
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopupCreateLot
