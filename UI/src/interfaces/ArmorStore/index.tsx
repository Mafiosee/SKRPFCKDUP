import React, { useEffect, useMemo, useRef, useState } from 'react'
import './styles.sass'
import { useAppSelector } from '../../hooks/redux'
import ExitButton from './components/ExitButton'
import Balance from './components/Balance'
import StoreName from './components/StoreName'
import Products from './components/Products'
import { CharSlots, ItemType, Quality } from '../../shared/inventory/itemType'
import QualitySelector from './components/QualitySelector'
import Search from './components/Search'
import {
  ArmorStoreEvents,
  ArmorStorePayloads,
} from '../../shared/ArmorStore/events'
import { callClient } from '../../utils/api'
import Categories from './components/Categories'
import { ArmorStatusColor, ArmorStatusLimits } from '../Inventory/data'
import { CategoryNames } from './data/category'
import { ArmorStatusImages } from '../Inventory/assets/armorStatus'
import { useEscClose } from '../../hooks/useEscClose'

const ArmorStore: React.FC = () => {
  const { isOpen, products, currentProtection } = useAppSelector(
    (state) => state.armorStore,
  )
  const [activeProductId, setActiveProductId] = useState(null)
  const [activeQuality, setActiveQuality] = useState<Quality | null>(null)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<
    CharSlots | ItemType | null
  >(null)
  useEscClose({ isOpenInterface: isOpen, closeEvent: ArmorStoreEvents.Close })

  useEffect(() => {
    setActiveProductId(null)
    setActiveQuality(null)
    setSearch('')
    if (!products.length) {
      setActiveCategory(null)
    } else {
      if (products[0].charSlot != null) {
        setActiveCategory(products[0].charSlot)
      } else if (products[0].itemType != null) {
        setActiveCategory(products[0].itemType)
      }
    }
  }, [isOpen, products])

  useEffect(() => {
    if (!isOpen) {
      return
    }
    const payload: ArmorStorePayloads[ArmorStoreEvents.SetActiveProduct] = {
      productId: activeProductId,
    }
    callClient(ArmorStoreEvents.SetActiveProduct, payload)
  }, [isOpen, activeProductId])

  useEffect(() => {
    if (!isOpen) {
      return
    }
    const payload: ArmorStorePayloads[ArmorStoreEvents.ChangeCategory] = {
      categoryId: activeCategory,
    }
    callClient(ArmorStoreEvents.ChangeCategory, payload)
  }, [activeCategory])

  const armorStatus = useMemo(() => {
    let status = Quality.Unusual

    for (
      let quality = Quality.Unusual;
      quality <= Quality.Legendary;
      quality++
    ) {
      const limits = ArmorStatusLimits[quality]
      // @ts-expect-error qwe
      if (currentProtection >= limits.Min && currentProtection <= limits.Max) {
        status = quality
        break
      }
    }

    return status
  }, [currentProtection])

  return !isOpen ? null : (
    <div className="ArmorStore">
      <ExitButton />
      <Balance />
      <StoreName />
      <div className="row">
        <QualitySelector
          activeQuality={activeQuality}
          setActiveQuality={setActiveQuality}
        />
        <Search search={search} setSearch={setSearch} />
      </div>
      <div className="category">
        {activeCategory != null && CategoryNames[activeCategory]}
      </div>
      <Products
        activeProductId={activeProductId}
        setActiveProductId={setActiveProductId}
        activeQuality={activeQuality}
        search={search}
        activeCategory={activeCategory}
      />
      {currentProtection != null && (
        <div
          className="armorStatus"
          style={{
            backgroundImage: `url(${ArmorStatusImages[armorStatus]})`,
          }}
        >
          <div className="title">Защита</div>
          <div className="value">
            <div
              className="shadow"
              style={{ background: ArmorStatusColor[armorStatus] }}
            />
            <div className="numbers">{currentProtection}</div>
          </div>
        </div>
      )}
      <Categories
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
    </div>
  )
}

export default ArmorStore
