import React, { useEffect, useMemo, useState } from 'react'
import './styles.sass'
import { useAppSelector } from '../../hooks/redux'
import Frame from './components/Frame'
import Header from './components/Header'
import { TabId } from './types/Tabs'
import Info from './components/Info'
import Lists from './components/Lists'
import PopupRange from './components/PopupRange'
import {
  ProductBusinessesEvents,
  ProductBusinessesPayloads,
} from '../../shared/ProductBusiness/events'
import { callClient } from '../../utils/api'
import { useEscClose } from '../../hooks/useEscClose'
import ProfitChart from './components/ProfitChart'
import Statistics from './components/Statistics'

const ProductBusinesses: React.FC = () => {
  const { isOpen, info, products } = useAppSelector(
    (state) => state.productBusinesses,
  )
  const [activeTabId, setActiveTabId] = useState<TabId>(TabId.Info)
  const [openedLoadMaterials, setOpenedLoadMaterials] = useState(false)
  const [priceMarkupProductId, setPriceMarkupProductId] = useState(null)
  useEscClose({
    isOpenInterface: isOpen,
    closeEvent: ProductBusinessesEvents.Close,
  })

  const reset = () => {
    setActiveTabId(TabId.Info)
    setOpenedLoadMaterials(false)
    setPriceMarkupProductId(null)
  }

  useEffect(() => {
    reset()
  }, [isOpen])

  const priceMarkupProduct = useMemo(
    () => products.find((product) => product.id === priceMarkupProductId),
    [products, priceMarkupProductId],
  )

  const handleLoadMaterials = (value: number) => {
    const payload: ProductBusinessesPayloads[ProductBusinessesEvents.LoadMaterials] =
      { value }
    callClient(ProductBusinessesEvents.LoadMaterials, payload)
  }

  const handleChangePriceMarkup = (priceMarkup: number) => {
    const payload: ProductBusinessesPayloads[ProductBusinessesEvents.ChangePriceMarkup] =
      {
        productId: priceMarkupProductId,
        priceMarkup,
      }
    callClient(ProductBusinessesEvents.ChangePriceMarkup, payload)
  }

  return !isOpen ? null : (
    <div className="ProductBusinesses">
      <div className="window">
        <Frame />
        <div className="content">
          <Header
            activeTabId={activeTabId}
            setActiveTabId={(tabId: TabId) => setActiveTabId(tabId)}
          />
          {activeTabId === TabId.Info && (
            <>
              <Info openLoadMaterials={() => setOpenedLoadMaterials(true)} />
              <Lists
                openChangePriceMarkup={(productId) =>
                  setPriceMarkupProductId(productId)
                }
              />
            </>
          )}
          {activeTabId === TabId.Statistics && (
            <div className="statistics">
              <ProfitChart />
              <Statistics />
            </div>
          )}
        </div>
      </div>

      <PopupRange
        opened={openedLoadMaterials}
        title="Пополнение товаров"
        close={() => setOpenedLoadMaterials(false)}
        text="Выберите кол-во товаров для загрузки"
        helper="(кг)"
        limits={{
          min: 1,
          max: Math.ceil(info.materials.max - info.materials.current),
        }}
        step={1}
        helpers={{
          min: 1,
          max: Math.ceil(info.materials.max - info.materials.current),
        }}
        current={Math.round((info.materials.max - info.materials.current) / 2)}
        accept={handleLoadMaterials}
        price={info.materials.price}
      />
      <PopupRange
        opened={priceMarkupProduct != null}
        title="Выбор наценки"
        close={() => setPriceMarkupProductId(null)}
        text="Текущая наценка:"
        helper={`${priceMarkupProduct?.priceMarkup}%`}
        limits={{
          min: 0,
          max: 100,
        }}
        step={1}
        helpers={{
          min: '0%',
          max: '100%',
        }}
        current={priceMarkupProduct?.priceMarkup ?? 0}
        accept={handleChangePriceMarkup}
      />
    </div>
  )
}

export default ProductBusinesses
