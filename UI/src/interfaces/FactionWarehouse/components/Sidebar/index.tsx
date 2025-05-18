import './styles.sass'
import React, { useMemo, useState } from 'react'
import UIKitTabs from '../../../../ui-kit/Tabs'
import UIKitButton from '../../../../ui-kit/Button'
import { Icon } from '../../../../ui-kit/Icons'
import { UIKitButtonType } from '../../../../ui-kit/Button/data/Type'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { factionWarehouseActions } from '../../reducer'
import { ItemType } from '../../../../shared/inventory/itemType'
import UIKitSelect from '../../../../ui-kit/Select'
import { ItemTypeList } from '../../data/ItemType'
import { callClient } from '../../../../utils/api'
import {
  FactionWarehouseEvents,
  FactionWarehousePayloads,
} from '../../../../shared/FactionWarehouse/events'
import TransferItem from '../TransferItem'
import { UIKitSize } from '../../../../ui-kit/types/Size'
import { TransferSource } from '../../../../shared/FactionWarehouse/TransferSource'
import { TransferSourceList } from '../../data/TransferSource'
import { Item } from '../../../../shared/FactionWarehouse/Item'

const MinItemsAmount = 3
const MinScrollableItemsAmount = 4

const EmptyCoverInfo: Record<
  TransferSource,
  { title: string; description: string }
> = {
  [TransferSource.Warehouse]: {
    title: 'Предметы не выбраны',
    description: 'Выберите предметы и они отобразятся тут.',
  },
  [TransferSource.Inventory]: {
    title: 'Инвентарь пуст',
    description: 'В вашем инвентаре отсутствуют предметы.',
  },
}

type ItemWithTransferAmount = Item & { transferAmount: number }

const Sidebar = () => {
  const dispatch = useAppDispatch()
  const { warehouse, transferItems, inventory } = useAppSelector(
    (state) => state.factionWarehouse,
  )
  const [source, setSource] = useState<TransferSource>(TransferSource.Warehouse)
  const [itemType, setItemType] = useState<ItemType | null>(null)

  const clearWarehouseTransferItems = () =>
    dispatch(factionWarehouseActions.setWarehouseTransferItems([]))

  const renderedControls = useMemo(() => {
    switch (source) {
      case TransferSource.Warehouse: {
        const hasSelectedItems =
          transferItems[TransferSource.Warehouse].length > 0
        return (
          <>
            <UIKitButton
              className="button"
              iconBefore={Icon.Trash}
              type={UIKitButtonType.Secondary}
              text="Очистить список"
              size={UIKitSize.Medium}
              disabled={!hasSelectedItems}
              onClick={clearWarehouseTransferItems}
            />
            <UIKitButton
              className="button"
              iconAfter={Icon.ArrowUp}
              text="Взять все"
              size={UIKitSize.Medium}
              disabled={!hasSelectedItems}
              onClick={() => {
                const payload: FactionWarehousePayloads[FactionWarehouseEvents.TransferItems] =
                  {
                    source: TransferSource.Warehouse,
                    items: transferItems[TransferSource.Warehouse],
                  }
                callClient(FactionWarehouseEvents.TransferItems, payload)
                clearWarehouseTransferItems()
              }}
            />
          </>
        )
      }
      case TransferSource.Inventory: {
        return (
          <UIKitSelect
            size={UIKitSize.Medium}
            icon={Icon.Categories}
            items={ItemTypeList}
            placeholder="Все категории"
            currentId={itemType}
            setCurrentId={setItemType}
          />
        )
      }
      default: {
        return null
      }
    }
  }, [source, transferItems, itemType])

  const filteredItems = useMemo(() => {
    const items: ItemWithTransferAmount[] = []
    switch (source) {
      case TransferSource.Warehouse: {
        transferItems[TransferSource.Warehouse].forEach((transferItem) => {
          const item = warehouse.find((item) => item.id === transferItem.id)
          if (item != null) {
            items.push({ ...item, transferAmount: transferItem.amount })
          }
        })
        break
      }
      case TransferSource.Inventory: {
        const list = inventory.filter((item) =>
          itemType == null ? true : item.type === itemType,
        )
        list.forEach((item) => {
          const transferItem = transferItems[TransferSource.Inventory].find(
            (transferItem) => transferItem.id === item.id,
          )
          if (transferItem != null) {
            items.push({ ...item, transferAmount: transferItem.amount })
          }
        })
        break
      }
    }
    return items
  }, [source, warehouse, inventory, transferItems, itemType])

  const renderedItems = useMemo(() => {
    const renderedList: React.JSX.Element[] = filteredItems.map((item) => (
      <TransferItem
        key={item.id}
        item={item}
        amount={item.transferAmount}
        source={source}
      />
    ))
    if (renderedList.length < MinItemsAmount) {
      renderedList.push(
        ...new Array(MinItemsAmount - renderedList.length)
          .fill(null)
          .map((_, index) => (
            <TransferItem key={`empty-${index}`} source={source} />
          )),
      )
    }
    return renderedList
  }, [filteredItems])

  return (
    <div className="Sidebar">
      <UIKitTabs
        className="tabs"
        size={UIKitSize.Medium}
        tabs={TransferSourceList}
        activeTabId={source}
        setActiveTabId={(source: TransferSource) => setSource(source)}
        allSidesBorder
      />
      <div className="content">
        <div className="controls">{renderedControls}</div>
        <div
          className={`items ${renderedItems.length >= MinScrollableItemsAmount && '-scrollable UIKitScrollbar'}`}
        >
          {renderedItems}
          {!filteredItems.length && (
            <div className="empty">
              <div className="background" />
              <div className="content">
                <div className="title">{EmptyCoverInfo[source].title}</div>
                <div className="description">
                  {EmptyCoverInfo[source].description}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
