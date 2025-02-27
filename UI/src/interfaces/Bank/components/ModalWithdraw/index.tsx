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

type Props = {
  close: () => void
}

const ModalWithdraw: React.FC<Props> = ({ close }) => {
  const { balance, limits } = useAppSelector((state) => state.bank)
  const [sum, setSum] = useState<number | ''>('')

  return (
    <UIKitWindowModal
      title="Снять со счета"
      balance={balance}
      handleClose={close}
      imageUrl={require('../../assets/images/popup-balance.png')}
      footerButtons={[
        {
          type: UIKitButtonType.Primary,
          text: 'Снять',
          disabled: sum === '' || sum < limits.withdrawMin,
          onClick: () => {
            const payload: BankPayloads[BankEvents.Withdraw] = { sum: +sum }
            callClient(BankEvents.Withdraw, payload)
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
          title="Сумма снятия"
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
          text={`Минимальная сумма снятия: ${numberWithSeparator(limits.withdrawMin, '.')}.`}
        />
      </div>
    </UIKitWindowModal>
  )
}

export default ModalWithdraw
