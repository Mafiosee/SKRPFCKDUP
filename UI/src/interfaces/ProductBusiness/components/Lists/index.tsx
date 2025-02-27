import './styles.sass'
import React, { useMemo } from 'react'
import { useAppSelector } from '../../../../hooks/redux'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'
import { ItemImagesSquad } from '../../../Inventory/assets/items'

type Props = {
  openChangePriceMarkup: (productId: any) => void
}

const Lists: React.FC<Props> = ({ openChangePriceMarkup }) => {
  const { products } = useAppSelector((state) => state.productBusinesses)

  const renderedPopularProducts = useMemo(
    () =>
      products.map(({ id, image, name, sales, profit }) => (
        <div key={id} className="product">
          <div className="block -name">
            <div className="vector">
              <div
                className="image"
                style={{
                  backgroundImage: `url(${ItemImagesSquad[`${image}.png`]})`,
                }}
              />
            </div>
            {name}
          </div>
          <div className="block -sales">{sales}</div>
          <div className="block -profit">
            {numberWithSeparator(profit, '.')}
          </div>
        </div>
      )),
    [products],
  )

  const renderedProductPrices = useMemo(
    () =>
      products.map(({ id, image, name, priceMarkup }) => (
        <div key={id} className="product">
          <div className="block -name">
            <div className="vector">
              <div
                className="image"
                style={{
                  backgroundImage: `url(${ItemImagesSquad[`${image}.png`]})`,
                }}
              />
            </div>
            {name}
          </div>
          <div className="block -priceMarkup">{priceMarkup}%</div>
          <div className="block -action">
            <div className="button" onClick={() => openChangePriceMarkup(id)}>
              Настроить
            </div>
          </div>
        </div>
      )),
    [products],
  )

  return (
    <div className="_Lists">
      <div className="col">
        <div className="title">Популярность товаров</div>
        <div className="helpers">
          <div className="helper -name">Наименование товара</div>
          <div className="helper -sales">Продано</div>
          <div className="helper -profit">Выручка</div>
        </div>
        <div className="list">
          <div className="content -popular">{renderedPopularProducts}</div>
          {products.length > 5 && <div className="shadow" />}
        </div>
      </div>
      <div className="col">
        <div className="title">Цены на товары</div>
        <div className="helpers">
          <div className="helper -name">Наименование товара</div>
          <div className="helper -percents">Наценка</div>
          <div className="helper -action">Действие</div>
        </div>
        <div className="list">
          <div className="content -price">{renderedProductPrices}</div>
          {products.length > 5 && <div className="shadow" />}
        </div>
      </div>
    </div>
  )
}

export default Lists
