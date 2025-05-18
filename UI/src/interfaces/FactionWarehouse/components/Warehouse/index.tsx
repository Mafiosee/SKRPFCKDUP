import './styles.sass'
import React, { useMemo, useState } from 'react'
import UIKitInput from '../../../../ui-kit/Input'
import { Icon } from '../../../../ui-kit/Icons'
import UIKitSelect from '../../../../ui-kit/Select'
import { Sort, SortList } from '../../data/Sort'
import { useAppSelector } from '../../../../hooks/redux'
import WarehouseItem from '../WarehouseItem'
import { UIKitSize } from '../../../../ui-kit/types/Size'
import { TransferSource } from '../../../../shared/FactionWarehouse/TransferSource'

const MinItemsAmount = 9
const MinScrollableItemsAmount = 7

const Warehouse = () => {
  const { warehouse, weightLimit, transferItems } = useAppSelector(
    (state) => state.factionWarehouse,
  )
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<Sort>(Sort.Amount)

  const allWeight = useMemo(
    () =>
      (
        warehouse.reduce((acc, item) => acc + item.weight * 1000, 0) / 1000
      ).toFixed(3),
    warehouse,
  )

  const filteredWarehouse = useMemo(() => {
    const list = warehouse.filter(
      (item) => item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1,
    )
    switch (sort) {
      case Sort.Amount: {
        list.sort((a, b) => b.amount - a.amount)
        break
      }
      case Sort.Weight: {
        list.sort((a, b) => b.weight - a.weight)
        break
      }
      case Sort.Type: {
        list.sort((a, b) => b.type.localeCompare(a.type))
        break
      }
    }
    return list
  }, [warehouse, search, sort])

  const renderedItems = useMemo(() => {
    const items = filteredWarehouse.map((item, index) => {
      const selected =
        transferItems[TransferSource.Warehouse].findIndex(
          ({ id }) => id === item.id,
        ) !== -1
      return (
        <WarehouseItem
          key={item.id}
          item={item}
          selected={selected}
          index={index}
        />
      )
    })
    if (items.length < MinItemsAmount) {
      items.push(
        ...new Array(MinItemsAmount - items.length)
          .fill(null)
          .map((_, index) => <WarehouseItem key={`empty-${index}`} />),
      )
    }
    return items
  }, [filteredWarehouse, transferItems])

  return (
    <div className="Warehouse">
      <div className="controls">
        <div className="weight">
          <div className="current">{allWeight}</div>
          <div className="max">/ {weightLimit.toFixed(3)} кг</div>
        </div>
        <UIKitInput
          className="search"
          size={UIKitSize.Medium}
          icon={Icon.Search}
          placeholder="Поиск"
          value={search}
          onChange={setSearch}
        />
        <UIKitSelect
          className="sort"
          size={UIKitSize.Medium}
          icon={Icon.Sort}
          items={SortList}
          currentId={sort}
          setCurrentId={setSort}
        />
      </div>
      <div className="items">
        <div
          className={`list ${warehouse.length >= MinScrollableItemsAmount && '-scrollable UIKitScrollbar'}`}
        >
          {renderedItems}
        </div>
        {!warehouse.length && (
          <div className="empty">
            <div className="background" />
            <div className="content">
              <div className="title">Склад пуст</div>
              <div className="description">
                Здесь еще нет предметов, но вы можете что-то сюда положить.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Warehouse
