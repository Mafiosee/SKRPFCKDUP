import './styles.sass'
import React from 'react'
import { useAppSelector } from '../../../../hooks/redux'
import Background from './Background'
import { QualityIcons } from '../../../DonateStore/assets/products'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'
import {
  CharSlots,
  ItemType,
  Quality,
} from '../../../../shared/inventory/itemType'
import {
  ArmorStoreEvents,
  ArmorStorePayloads,
} from '../../../../shared/ArmorStore/events'
import { callClient } from '../../../../utils/api'
import { ItemImagesSquad } from '../../../Inventory/assets/items'

type Props = {
  activeProductId: any
  setActiveProductId: (productId: any) => void
  activeQuality: Quality | null
  search: string
  activeCategory: CharSlots | ItemType | null
}

const Products: React.FC<Props> = ({
  activeProductId,
  setActiveProductId,
  activeQuality,
  search,
  activeCategory,
}) => {
  const { products } = useAppSelector((state) => state.armorStore)

  const renderProducts = () =>
    products
      .filter((product) => {
        const isQualityMatch =
          activeQuality == null || activeQuality === product.quality
        const isSearchMatch =
          product.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
        const isCategoryMatch =
          activeCategory == null ||
          product?.charSlot === activeCategory ||
          product?.itemType === activeCategory
        return isQualityMatch && isSearchMatch && isCategoryMatch
      })
      .map(
        ({
          id,
          quality,
          image,
          name,
          price,
          durability,
          protection,
          damage,
        }) => {
          const isActive = activeProductId === id
          const setActive = () => setActiveProductId(id)

          return (
            <div
              key={id}
              className={`product ${isActive && '-active'}`}
              onClick={setActive}
            >
              <Background quality={quality} />
              <div
                className="image"
                style={{
                  backgroundImage: `url(${ItemImagesSquad[`${image}.png`]})`,
                }}
              />
              <div
                className="icon"
                style={{ backgroundImage: `url(${QualityIcons[quality]})` }}
              />
              <div className="content">
                <div className="name">{name}</div>
                {(durability != null ||
                  protection != null ||
                  damage != null) && (
                  <div className="row">
                    {durability != null && (
                      <div className="parameter -condition">{durability}</div>
                    )}
                    {durability != null &&
                      protection != null &&
                      protection > 0 && <div className="separator" />}
                    {protection != null && protection > 0 && (
                      <div className="parameter -protection">{protection}</div>
                    )}
                    {protection != null &&
                      protection > 0 &&
                      damage != null &&
                      damage > 0 && <div className="separator" />}
                    {damage != null && damage > 0 && (
                      <div className="parameter -damage">{damage}</div>
                    )}
                  </div>
                )}

                <div
                  className="buy"
                  onClick={(event) => {
                    event.stopPropagation()
                    const payload: ArmorStorePayloads[ArmorStoreEvents.BuyProduct] =
                      { productId: id }
                    callClient(ArmorStoreEvents.BuyProduct, payload)
                  }}
                >
                  Приобрести
                  <div className="icon" />
                  {numberWithSeparator(price, '.')}
                </div>
              </div>
            </div>
          )
        },
      )

  return <div className="_Products">{renderProducts()}</div>
}

export default Products
