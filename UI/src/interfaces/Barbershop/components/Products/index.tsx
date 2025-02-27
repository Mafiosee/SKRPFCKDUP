import './styles.sass'
import React from 'react'
import { useAppSelector } from '../../../../hooks/redux'
import Background from './Background'
import { Quality } from '../../../../shared/inventory/itemType'
import {
  QualityColor,
  QualityNoShadowIcon,
} from '../../../DonateStore/data/quality'
import { QualityNames } from '../../../Inventory/data'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'
import { Category } from '../../../../shared/Barbershop/Category'

type Props = {
  activeProductId: any
  setActiveProductId: (productId: any) => void
  activeQuality: Quality | null
  search: string
  activeCategory: Category | null
}

const Products: React.FC<Props> = ({
  activeProductId,
  setActiveProductId,
  activeQuality,
  search,
  activeCategory,
}) => {
  const { products } = useAppSelector((state) => state.barbershop)

  const renderProducts = () =>
    products
      .filter((product) => {
        const isQualityMatch =
          activeQuality == null || activeQuality === product.quality
        const isSearchMatch =
          product.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
        const isCategoryMatch = activeCategory === product.category
        return isQualityMatch && isSearchMatch && isCategoryMatch
      })
      .map(({ id, quality, name, price }) => {
        const isActive = activeProductId === id
        const setActive = () => setActiveProductId(id)

        return (
          <div
            key={id}
            className={`product ${isActive && '-active'}`}
            onClick={setActive}
          >
            <Background quality={quality} />
            <div className="content">
              <div className="name">{name}</div>
              <div className="line" />
              <div className="row">
                <div className="quality">
                  <div
                    className="icon"
                    style={{
                      backgroundImage: `url(${QualityNoShadowIcon[quality]})`,
                    }}
                  />
                  <div
                    className="name"
                    style={{ color: QualityColor[quality] }}
                  >
                    {QualityNames[quality]}
                  </div>
                </div>
                <div className="price">{numberWithSeparator(price, '.')}</div>
              </div>
            </div>
          </div>
        )
      })

  return <div className="_Products">{renderProducts()}</div>
}

export default Products
