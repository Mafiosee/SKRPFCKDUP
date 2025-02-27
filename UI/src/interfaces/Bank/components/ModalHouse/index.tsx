import React, { useState } from 'react'
import UIKitWindowModal from '../../../../ui-kit/WindowModal'
import { UIKitButtonType } from '../../../../ui-kit/Button/data/Type'
import { useAppSelector } from '../../../../hooks/redux'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'
import UIKitInput from '../../../../ui-kit/Input'
import { Icon } from '../../../../ui-kit/Icons'
import { BankEvents, BankPayloads } from '../../../../shared/Bank/events'
import { callClient } from '../../../../utils/api'
import { handleChangeNumberInput } from '../../../../utils/handleChangeNumberInput'
import { LocationImages } from '../../assets/Images'
import { enumerate } from '../../../../utils/enumerate'
import UIKitModalParameters from '../../../../ui-kit/ModalParameters'
import UIKitModalInfo from '../../../../ui-kit/ModalInfo'

type Props = {
  close: () => void
}

const ModalHouse: React.FC<Props> = ({ close }) => {
  const { balance, limits, house } = useAppSelector((state) => state.bank)
  const [hours, setHours] = useState<number | ''>('')

  return (
    <UIKitWindowModal
      title="Оплатить дом"
      balance={balance}
      handleClose={close}
      imageUrl={LocationImages[`${house.image}.png`]}
      footerButtons={[
        {
          type: UIKitButtonType.Primary,
          text: 'Оплатить',
          disabled: hours === '' || hours > limits.houseDaysMax,
          onClick: () => {
            const payload: BankPayloads[BankEvents.PayRentHouse] = {
              days: +hours,
            }
            callClient(BankEvents.PayRentHouse, payload)
            close()
          },
        },
        {
          type: UIKitButtonType.Secondary,
          text: 'Отмена',
          onClick: close,
        },
      ]}
    >
      <div className="modal-content">
        <div className="title">{house.name}</div>
        <UIKitModalParameters
          className="parameters"
          parameters={[
            {
              title: 'Аренда оплачена до',
              value: house.date,
            },
            {
              title: 'Стоимость аренды',
              icon: Icon.CoinSeptim,
              value: numberWithSeparator(house.rent, '.'),
              helper: '/ сутки',
            },
          ]}
        />
        <UIKitInput
          className="input"
          title="Количество дней"
          placeholder="Например: 7"
          value={hours.toString()}
          onChange={(value) =>
            handleChangeNumberInput({
              value,
              setValue: setHours,
              max: limits.houseDaysMax,
            })
          }
          helper={{
            text: enumerate(hours === '' ? 7 : hours, ['Час', 'Часа', 'Часов']),
          }}
        />
        <UIKitModalInfo
          className="info"
          text={`Оплатить дом можно на не более ${limits.houseDaysMax} ${enumerate(limits.houseDaysMax, ['день', 'дня', 'дней'])}`}
        />
      </div>
    </UIKitWindowModal>
  )
}

export default ModalHouse
