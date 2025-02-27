import './styles.sass'
import React from 'react'
import { Background } from './Background'
import { QualityIcons } from '../../assets/products'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'
import {
  Product as ProductType,
  ProductMark,
} from '../../../../shared/DonateStore/Product'
import { Case } from '../../../../shared/DonateStore/Case'
import { ItemImagesSquad } from '../../../Inventory/assets/items'
import { WarehouseItem } from '../../../../shared/DonateStore/PageWarehouse'
import { getImageUrlBySourceType } from '../../../../utils/getImageUrlBySourceType'

type Props = {
  isLarge?: boolean
  info: ProductType | Case | WarehouseItem
  setOpenedId: (productId: any) => void
}

const Product: React.FC<Props> = ({ isLarge = false, info, setOpenedId }) => {
  const { id, price, quality, name, description, giftFrom } = info

  const getMark = () => {
    if (info.giftFrom) {
      return (
        <div className="mark -gift">
          <div className="helper">
            Подарок{giftFrom ? ` от: ${giftFrom}` : ''}
          </div>
        </div>
      )
    }
    switch (info?.mark) {
      case ProductMark.Discount:
        return (
          <div className="mark -discount">
            -{info?.discount}%
            <div className="helper">Скидка: {info?.discount}%</div>
          </div>
        )
      case ProductMark.New:
        return (
          <div className="mark -new">
            New
            <div className="helper">Новое</div>
          </div>
        )
      case ProductMark.Popular:
        return (
          <div className="mark -popular">
            <div className="helper">Популярное</div>
          </div>
        )
      case ProductMark.Gift:
        return (
          <div className="mark -gift">
            <div className="helper">
              Подарок{giftFrom ? ` от: ${giftFrom}` : ''}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const getImage = () =>
    `url(${getImageUrlBySourceType(info?.image?.name, info?.image?.sourceType)})`

  return (
    <div
      className={`_Product ${isLarge && '-large'}`}
      onClick={() => setOpenedId(id)}
    >
      <div className="background">
        <Background isLarge={isLarge} quality={quality} />
        <div className="hover" />
      </div>
      <div
        className="quality"
        style={{ backgroundImage: `url(${QualityIcons[quality]})` }}
      />
      <div
        className="image"
        style={{
          backgroundImage: getImage(),
        }}
      />
      <div className="info">
        <div className="name">
          {name}
          {info?.amount > 0 && ` (x${info.amount})`}
        </div>
        <div className="description">{description.small}</div>
        {info?.price != null && (
          <div className="price">
            <div className="icon" />
            <div className="current">
              {numberWithSeparator(
                parseInt(
                  String(
                    info.price *
                      (!info?.discount ? 1 : (100 - info?.discount) / 100),
                  ),
                ),
                '.',
              )}
            </div>
            {!!info?.discount && (
              <div className="previous">{numberWithSeparator(price, '.')}</div>
            )}
          </div>
        )}
      </div>
      {getMark()}
    </div>
  )
}

export default Product
