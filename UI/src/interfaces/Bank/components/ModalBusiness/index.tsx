import React, { useMemo, useState } from 'react'
import UIKitWindowModal from '../../../../ui-kit/WindowModal'
import { UIKitButtonType } from '../../../../ui-kit/Button/data/Type'
import { useAppSelector } from '../../../../hooks/redux'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'
import { Icon } from '../../../../ui-kit/Icons'
import { BankEvents, BankPayloads } from '../../../../shared/Bank/events'
import { callClient } from '../../../../utils/api'
import { BusinessImages } from '../../assets/Images'
import { enumerate } from '../../../../utils/enumerate'
import { Tab, TabName } from './types/Tab'
import { Mode, ModeName } from './types/Mode'
import { UIKitButtonProps } from '../../../../ui-kit/Button'
import { handleChangeNumberInput } from '../../../../utils/handleChangeNumberInput'
import UIKitInput from '../../../../ui-kit/Input'
import UIKitTabs from '../../../../ui-kit/Tabs'
import UIKitModalParameters from '../../../../ui-kit/ModalParameters'
import UIKitModalInfo from '../../../../ui-kit/ModalInfo'

const TabList = Object.values(Tab).map((tab) => ({
  id: tab,
  name: TabName[tab],
}))
const ModeList = Object.values(Mode).map((mode) => ({
  id: mode,
  name: ModeName[mode],
}))

type Props = {
  close: () => void
}

const ModalBusiness: React.FC<Props> = ({ close }) => {
  const { balance, limits, business } = useAppSelector((state) => state.bank)
  const [tab, setTab] = useState<Tab>(Tab.Warehouse)
  const [mode, setMode] = useState<Mode>(Mode.Replenish)
  const [replenishSum, setReplenishSum] = useState<number | ''>('')
  const [withdrawSum, setWithdrawSum] = useState<number | ''>('')
  const [hours, setHours] = useState<number | ''>('')

  const primaryFooterButtonProps: Pick<
    UIKitButtonProps,
    'text' | 'disabled' | 'onClick'
  > = useMemo(() => {
    switch (tab) {
      case Tab.Warehouse: {
        switch (mode) {
          case Mode.Replenish: {
            return {
              text: 'Пополнить',
              disabled:
                replenishSum === '' ||
                replenishSum < limits.businessReplenishMin,
              onClick: () => {
                const payload: BankPayloads[BankEvents.BusinessReplenish] = {
                  sum: +replenishSum,
                }
                callClient(BankEvents.BusinessReplenish, payload)
                close()
              },
            }
          }
          case Mode.Withdraw: {
            return {
              text: 'Снять',
              disabled:
                withdrawSum === '' || withdrawSum < limits.businessWithdrawMin,
              onClick: () => {
                const payload: BankPayloads[BankEvents.BusinessWithdraw] = {
                  sum: +withdrawSum,
                }
                callClient(BankEvents.BusinessWithdraw, payload)
                close()
              },
            }
          }
        }
        break
      }
      case Tab.Rent: {
        return {
          text: 'Оплатить',
          disabled: hours === '' || hours > limits.businessDaysMax,
          onClick: () => {
            const payload: BankPayloads[BankEvents.PayRentBusiness] = {
              days: +hours,
            }
            callClient(BankEvents.PayRentBusiness, payload)
            close()
          },
        }
      }
    }
  }, [tab, mode, replenishSum, withdrawSum, hours, limits])

  const parameters = useMemo(() => {
    switch (tab) {
      case Tab.Warehouse: {
        return (
          <UIKitModalParameters
            className="parameters"
            parameters={[
              {
                title: 'Баланс бизнеса',
                icon: Icon.CoinSeptim,
                value: numberWithSeparator(business.balance, '.'),
              },
            ]}
          />
        )
      }
      case Tab.Rent: {
        return (
          <UIKitModalParameters
            className="parameters"
            parameters={[
              {
                title: 'Аренда оплачена до',
                value: business.date,
              },
              {
                title: 'Стоимость аренды',
                icon: Icon.CoinSeptim,
                value: numberWithSeparator(business.balance, '.'),
                helper: '/ сутки',
              },
            ]}
          />
        )
      }
    }
  }, [tab, business])

  const input = useMemo(() => {
    switch (tab) {
      case Tab.Warehouse: {
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
        break
      }
      case Tab.Rent: {
        return (
          <UIKitInput
            className="input"
            title="Количество дней"
            placeholder="Например: 7"
            value={hours.toString()}
            onChange={(value) =>
              handleChangeNumberInput({
                value,
                setValue: setHours,
                max: limits.businessDaysMax,
              })
            }
            helper={{
              text: enumerate(hours === '' ? 7 : hours, [
                'Час',
                'Часа',
                'Часов',
              ]),
            }}
          />
        )
      }
    }
  }, [tab, mode, replenishSum, withdrawSum, hours, limits])

  const info = useMemo(() => {
    switch (tab) {
      case Tab.Warehouse: {
        switch (mode) {
          case Mode.Replenish: {
            return `Минимальная сумма пополнения: ${numberWithSeparator(limits.businessReplenishMin, '.')}.`
          }
          case Mode.Withdraw: {
            return `Минимальная сумма снятия: ${numberWithSeparator(limits.businessWithdrawMin, '.')}.`
          }
        }
        break
      }
      case Tab.Rent: {
        return `Оплатить бизнес можно на не более ${limits.businessDaysMax} ${enumerate(limits.businessDaysMax, ['день', 'дня', 'дней'])}`
      }
    }
  }, [tab, mode, limits])

  return (
    <UIKitWindowModal
      title="Бизнес"
      balance={balance}
      handleClose={close}
      tabs={{
        list: TabList,
        activeTabId: tab,
        setActiveTabId: (tab: Tab) => setTab(tab),
      }}
      imageUrl={BusinessImages[`${business.image}.png`]}
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
        <div className="title">{business.name}</div>
        {parameters}
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

export default ModalBusiness
