import React, { useEffect, useMemo, useState } from 'react'
import './styles.sass'
import CreateLotSelect from '../CreateLotSelect'
import { LotType } from '../../../../shared/Auction/LotType'
import { LotTypeName } from '../../types/LotType'
import CreateLotInput from '../CreateLotInput'
import { useAppSelector } from '../../../../hooks/redux'
import {
  AuctionEvents,
  AuctionPayloads,
} from '../../../../shared/Auction/events'
import { callClient } from '../../../../utils/api'

type Props = {
  opened: boolean
  close: () => void
}

const lotTypesList: { id: any; name: string }[] = []
Object.values(LotType).forEach((lotType) =>
  lotTypesList.push({ id: lotType, name: LotTypeName[lotType] }),
)

const CreateLot: React.FC<Props> = ({ opened, close }) => {
  const { property } = useAppSelector((state) => state.auction)
  const [lotTypeId, setLotTypeId] = useState<LotType>(lotTypesList[0].id)
  const [name, setName] = useState('')
  const [sum, setSum] = useState('')
  const [hours, setHours] = useState('')
  const [propertyId, setPropertyId] = useState(null)

  useEffect(() => {
    setLotTypeId(lotTypesList[0].id)
    setName('')
    setSum('')
    setHours('')
  }, [opened])

  const propertyList = useMemo(() => {
    return property
      .filter(({ type }) => type === lotTypeId)
      .map(({ id, name }) => ({ id, name }))
  }, [lotTypeId, property])

  useEffect(() => {
    setPropertyId(propertyList.length ? propertyList[0].id : null)
  }, [propertyList])

  const disabled = useMemo(() => {
    if (lotTypeId == null) {
      return true
    }
    if (!name.length) {
      return true
    }
    const intSum = parseInt(sum)
    if (isNaN(intSum) || intSum < 0) {
      return true
    }
    const intHours = parseInt(hours)
    if (intHours < 6 || intHours > 48) {
      return true
    }
    if (propertyId == null) {
      return true
    }
    return false
  }, [hours, lotTypeId, name, propertyId, sum])

  const handleCreate = () => {
    if (disabled) {
      return
    }
    const payload: AuctionPayloads[AuctionEvents.CreateLot] = {
      lotType: lotTypeId,
      name,
      sum: parseInt(sum),
      hours: parseInt(hours),
      propertyId,
    }
    callClient(AuctionEvents.CreateLot, payload)
    close()
  }

  return !opened ? null : (
    <div className="CreateLot">
      <div className="window">
        <div className="content">
          <CreateLotSelect
            title="Выберите категорию"
            list={lotTypesList}
            currentId={lotTypeId}
            select={(id: LotType) => setLotTypeId(id)}
          />
          <CreateLotInput
            title="Название лота"
            placeholder="Не более 24 символов"
            value={name}
            setValue={(value) => {
              if (value.length > 24) {
                return
              }
              setName(value)
            }}
          />
          <CreateLotInput
            title="Начальная сумма ставки"
            placeholder="Введите сумму"
            value={sum}
            setValue={(value) => {
              if (!value.length) {
                return setSum('')
              }
              const intValue = parseInt(value)
              if (isNaN(intValue) || intValue < 0) {
                return
              }
              setSum(intValue.toString())
            }}
            warning="Начальная ставка не может быть ниже Тамриэльской стоимости"
          />
          <CreateLotInput
            title="Время аукциона"
            helper="Часы"
            placeholder="Например: 12"
            value={hours}
            setValue={(value) => {
              if (!value.length) {
                return setHours('')
              }
              let intValue = parseInt(value)
              if (isNaN(intValue) || intValue < 0) {
                return
              }
              if (intValue > 48) {
                intValue = 48
              }
              setHours(intValue.toString())
            }}
            warning="От 6 до 48 часов"
          />
          <CreateLotSelect
            title="Ваше имущество"
            list={propertyList}
            currentId={propertyId}
            select={(id: any) => setPropertyId(id)}
          />
        </div>

        <div
          className={`create ${disabled && '-disabled'}`}
          onClick={handleCreate}
        >
          Создать лот
        </div>

        <div className="title">Новый лот</div>
        <div className="close" onClick={close} />
      </div>
    </div>
  )
}

export default CreateLot
