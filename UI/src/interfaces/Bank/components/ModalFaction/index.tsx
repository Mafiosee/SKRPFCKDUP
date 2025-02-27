import React, { useMemo, useState } from 'react'
import UIKitWindowModal from '../../../../ui-kit/WindowModal'
import { UIKitButtonType } from '../../../../ui-kit/Button/data/Type'
import { useAppSelector } from '../../../../hooks/redux'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'
import { Icon } from '../../../../ui-kit/Icons'
import { BankEvents, BankPayloads } from '../../../../shared/Bank/events'
import { callClient } from '../../../../utils/api'
import { LocationImages } from '../../assets/Images'
import { Mode, ModeName } from './types/Mode'
import { UIKitButtonProps } from '../../../../ui-kit/Button'
import { handleChangeNumberInput } from '../../../../utils/handleChangeNumberInput'
import UIKitInput from '../../../../ui-kit/Input'
import UIKitTabs from '../../../../ui-kit/Tabs'
import UIKitModalParameters from '../../../../ui-kit/ModalParameters'
import UIKitModalInfo from '../../../../ui-kit/ModalInfo'

const ModeList = Object.values(Mode).map((mode) => ({
  id: mode,
  name: ModeName[mode],
}))

type Props = {
  close: () => void
}

const ModalFaction: React.FC<Props> = ({ close }) => {
  const { balance, limits, faction } = useAppSelector((state) => state.bank)
  const [mode, setMode] = useState<Mode>(Mode.Replenish)
  const [replenishSum, setReplenishSum] = useState<number | ''>('')
  const [withdrawSum, setWithdrawSum] = useState<number | ''>('')

  const primaryFooterButtonProps: Pick<
    UIKitButtonProps,
    'text' | 'disabled' | 'onClick'
  > = useMemo(() => {
    switch (mode) {
      case Mode.Replenish: {
        return {
          text: 'Пополнить',
          disabled:
            replenishSum === '' || replenishSum < limits.factionReplenishMin,
          onClick: () => {
            const payload: BankPayloads[BankEvents.ReplenishFaction] = {
              sum: +replenishSum,
            }
            callClient(BankEvents.ReplenishFaction, payload)
            close()
          },
        }
      }
      case Mode.Withdraw: {
        return {
          text: 'Снять',
          disabled:
            withdrawSum === '' || withdrawSum < limits.factionWithdrawMin,
          onClick: () => {
            const payload: BankPayloads[BankEvents.WithdrawFaction] = {
              sum: +withdrawSum,
            }
            callClient(BankEvents.WithdrawFaction, payload)
            close()
          },
        }
      }
    }
  }, [mode, replenishSum, withdrawSum, limits])

  const input = useMemo(() => {
    switch (mode) {
      case Mode.Replenish: {
        return (
          <UIKitInput
            className="input"
            title="Сумма"
            placeholder="Например: 500"
            value={replenishSum.toString()}
            onChange={(value) =>
              handleChangeNumberInput({ value, setValue: setReplenishSum })
            }
            helper={{
              icon: Icon.CoinSeptim,
            }}
          />
        )
      }
      case Mode.Withdraw: {
        return (
          <UIKitInput
            className="input"
            title="Сумма"
            placeholder="Например: 500"
            value={withdrawSum.toString()}
            onChange={(value) =>
              handleChangeNumberInput({ value, setValue: setWithdrawSum })
            }
            helper={{
              icon: Icon.CoinSeptim,
            }}
          />
        )
      }
    }
  }, [mode, replenishSum, withdrawSum])

  const info = useMemo(() => {
    switch (mode) {
      case Mode.Replenish: {
        return `Минимальная сумма пополнения: ${numberWithSeparator(limits.factionReplenishMin, '.')}.`
      }
      case Mode.Withdraw: {
        return `Минимальная сумма снятия: ${numberWithSeparator(limits.factionWithdrawMin, '.')}.`
      }
    }
  }, [mode, limits])

  return (
    <UIKitWindowModal
      title="Бизнес"
      balance={balance}
      handleClose={close}
      imageUrl={LocationImages[`${faction.image}.png`]}
      footerButtons={[
        {
          type: UIKitButtonType.Primary,
          ...primaryFooterButtonProps,
        },
        {
          type: UIKitButtonType.Secondary,
          text: 'Отмена',
          onClick: close,
        },
      ]}
    >
      <div className="modal-content">
        <div className="title">{faction.name}</div>
        <UIKitModalParameters
          className="parameters"
          parameters={[
            {
              title: 'Баланс фракции',
              icon: Icon.CoinSeptim,
              value: numberWithSeparator(faction.balance, '.'),
            },
          ]}
        />
        {input}
        <UIKitTabs
          tabs={ModeList}
          activeTabId={mode}
          setActiveTabId={(mode: Mode) => setMode(mode)}
        />

        <UIKitModalInfo className="info" text={info} />
      </div>
    </UIKitWindowModal>
  )
}

export default ModalFaction
