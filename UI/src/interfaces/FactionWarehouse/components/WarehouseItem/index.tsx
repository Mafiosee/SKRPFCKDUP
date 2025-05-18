import './styles.sass'
import React from 'react'
import { QualityColor } from '../../data/Quality'
import { ItemImagesSquad } from '../../../Inventory/assets/items'
import UIKitCheckbox from '../../../../ui-kit/Checkbox'
import { factionWarehouseActions } from '../../reducer'
import { Item } from '../../../../shared/FactionWarehouse/Item'
import { useAppDispatch } from '../../../../hooks/redux'
import UIKitHelperQuality from '../../../../ui-kit/HelperQuality'
import { UIKitTooltipAlign } from '../../../../ui-kit/Tooltip/data/align'
import UIKitHelperGender from '../../../../ui-kit/HelperGender'
import ItemParameters from '../ItemParameters'

type Props = {
  item?: Item
  selected?: boolean
  index?: number
}

const WarehouseItem: React.FC<Props> = ({
  item,
  selected = false,
  index = 0,
}) => {
  const dispatch = useAppDispatch()

  if (!item) {
    return <div className="WarehouseItem -empty" />
  }

  return (
    <div
      className={`WarehouseItem ${selected && '-active'}`}
      onClick={() =>
        dispatch(factionWarehouseActions.toggleWarehouseTransferItem(item.id))
      }
    >
      <div className="background">
        <div
          className="quality"
          style={{ backgroundColor: QualityColor[item.quality] }}
        />
      </div>
      <div className="content">
        <div
          className="image"
          style={{
            backgroundImage: `url(${ItemImagesSquad[`${item.image}.png`]})`,
          }}
        />
        <div className="name">{item.name}</div>
        <ItemParameters item={item} />
        <UIKitHelperQuality
          className="quality"
          quality={item.quality}
          hasTooltip
          tooltipAlign={index % 3 === 0 ? UIKitTooltipAlign.Left : undefined}
        />
        {item.gender != null && (
          <UIKitHelperGender
            className="gender"
            gender={item.gender}
            hasTooltip
          />
        )}
        <UIKitCheckbox className="checkbox" checked={selected} />
      </div>
    </div>
  )
}

export default WarehouseItem
