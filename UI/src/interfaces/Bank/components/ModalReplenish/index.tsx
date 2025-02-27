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
import UIKitModalInfo from '../../../../ui-kit/ModalInfo'
import { enumerate } from '../../../../utils/enumerate'

type Props = {
  close: () => void
}

const ModalReplenish: React.FC<Props> = ({ close }) => {
  const { balance, limits } = useAppSelector((state) => state.bank)
  const [sum, setSum] = useState<number | ''>('')

  return (
    <UIKitWindowModal
      title="Пополнить счет"
      balance={balance}
      handleClose={close}
      imageUrl={require('../../assets/images/popup-balance.png')}
      footerButtons={[
        {
          type: UIKitButtonType.Primary,
          text: 'Пополнить',
          disabled: sum === '' || sum < limits.replenishMin,
          onClick: () => {
            const payload: BankPayloads[BankEvents.Replenish] = { sum: +sum }
            callClient(BankEvents.Replenish, payload)
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
        <UIKitInput
          className="input"
          title="Сумма пополнения"
          placeholder="Например: 500"
          value={sum === '' ? sum : numberWithSeparator(sum, '.')}
          onChange={(value) =>
            handleChangeNumberInput({ value, setValue: setSum })
          }
          helper={{
            icon: Icon.CoinSeptim,
          }}
        />
        <UIKitModalInfo
          className="info"
          text={`Минимальная сумма пополнения: ${numberWithSeparator(limits.replenishMin, '.')}.`}
        />
      </div>
    </UIKitWindowModal>
  )
}

export default ModalReplenish
