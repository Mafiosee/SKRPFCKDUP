import './styles.sass'
import React, { useState } from 'react'
import { QualityColor } from '../../data/Quality'
import { Item } from '../../../../shared/FactionWarehouse/Item'
import { ItemImagesSquad } from '../../../Inventory/assets/items'
import ItemParameters from '../ItemParameters'
import UIKitAmountSelector from '../../../../ui-kit/AmountSelector'
import { useAppDispatch } from '../../../../hooks/redux'
import { factionWarehouseActions } from '../../reducer'
import { UIKitSize } from '../../../../ui-kit/types/Size'
import UIKitHelperQuality from '../../../../ui-kit/HelperQuality'
import { UIKitTooltipAlign } from '../../../../ui-kit/Tooltip/data/align'
import UIKitHelperGender from '../../../../ui-kit/HelperGender'
import { Gender } from '../../../../shared/characterEditor/enums/Genders'
import { TransferSource } from '../../../../shared/FactionWarehouse/TransferSource'
import UIKitButton from '../../../../ui-kit/Button'
import { UIKitButtonType } from '../../../../ui-kit/Button/data/Type'
import { Icon } from '../../../../ui-kit/Icons'
import {
  FactionWarehouseEvents,
  FactionWarehousePayloads,
} from '../../../../shared/FactionWarehouse/events'
import { callClient } from '../../../../utils/api'

type Props = {
  item?: Item
  amount?: number
  source: TransferSource
}

const TransferItem: React.FC<Props> = ({ item, amount = 0, source }) => {
  const dispatch = useAppDispatch()
  const [isAmountEmpty, setIsAmountEmpty] = useState(false)

  if (!item) {
    return <div className="TransferItem -empty" />
  }

  return (
    <div className="TransferItem">
      <div className="background">
        <div
          className="quality"
          style={{ backgroundColor: QualityColor[item.quality] }}
        />
      </div>
      <div className="content">
        <div className="row">
          <div
            className="image"
            style={{
              backgroundImage: `url(${ItemImagesSquad[`${item.image}.png`]})`,
            }}
          />
          <div className="info">
            <div className="name">{item.name}</div>
            <ItemParameters item={item} />
          </div>
        </div>
        <div className="controls">
          {source === TransferSource.Warehouse && (
            <UIKitButton
              className="remove"
              size={UIKitSize.Medium}
              type={UIKitButtonType.Secondary}
              iconBefore={Icon.Trash}
              onClick={() =>
                dispatch(
                  factionWarehouseActions.setTransferItemAmount({
                    source,
                    itemId: item?.id,
                    amount: 0,
                  }),
                )
              }
            />
          )}
          <UIKitAmountSelector
            size={UIKitSize.Medium}
            amount={isAmountEmpty ? '' : amount}
            max={item.amount}
            setAmount={(amount) => {
              if (amount === '') {
                amount = 1
                setIsAmountEmpty(true)
              } else {
                setIsAmountEmpty(false)
              }
              if (source === TransferSource.Inventory && amount === 0) {
                amount = 1
              }
              dispatch(
                factionWarehouseActions.setTransferItemAmount({
                  source,
                  itemId: item?.id,
                  amount,
                }),
              )
            }}
          />
          {source === TransferSource.Warehouse && (
            <UIKitButton
              className="button"
              size={UIKitSize.Medium}
              text="Взять"
              iconAfter={Icon.ArrowUp}
              onClick={() => {
                const payload: FactionWarehousePayloads[FactionWarehouseEvents.TransferItems] =
                  {
                    source,
                    items: [{ id: item?.id, amount }],
                  }
                callClient(FactionWarehouseEvents.TransferItems, payload)
                dispatch(
                  factionWarehouseActions.setTransferItemAmount({
                    source,
                    itemId: item?.id,
                    amount: 0,
                  }),
                )
              }}
            />
          )}
          {source === TransferSource.Inventory && (
            <UIKitButton
              className="button"
              size={UIKitSize.Medium}
              text="Положить"
              iconAfter={Icon.ArrowDown}
              onClick={() => {
                const payload: FactionWarehousePayloads[FactionWarehouseEvents.TransferItems] =
                  {
                    source,
                    items: [{ id: item?.id, amount }],
                  }
                callClient(FactionWarehouseEvents.TransferItems, payload)
                dispatch(
                  factionWarehouseActions.setTransferItemAmount({
                    source,
                    itemId: item?.id,
                    amount: 1,
                  }),
                )
              }}
            />
          )}
        </div>
        <UIKitHelperQuality
          className="quality"
          quality={item.quality}
          hasTooltip
          tooltipAlign={UIKitTooltipAlign.Left}
        />
        <UIKitHelperGender
          className="gender"
          gender={item?.gender ?? Gender.Male}
          hasTooltip
        />
      </div>
    </div>
  )
}

export default TransferItem
