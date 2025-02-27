import React, { useEffect, useState } from 'react'
import './styles.sass'
import { useAppSelector } from '../../hooks/redux'
import { BankEvents, BankPayloads } from '../../shared/Bank/events'
import { numberWithSeparator } from '../../utils/numberWithSeparator'
import { callClient } from '../../utils/api'
import PopupBalance from './components/PopupBalance'
import Card from './components/Card'
import CardPopup, { RealtyCards } from './components/CardPopup'
import { useEscClose } from '../../hooks/useEscClose'
import useSound from 'use-sound'
import BusinessPopup from './components/BusinessPopup'

const Bank: React.FC = () => {
  const { isOpen, balance, house, business, faction } = useAppSelector(
    (state) => state.bank,
  )
  const { sfxBase } = useAppSelector((state) => state.volume)
  const [isOpenWithdrawPopup, setIsOpenWithdrawPopup] = useState(false)
  const [isOpenDepositPopup, setIsOpenDepositPopup] = useState(false)
  const [isOpenBusinessReplenishPopup, setIsOpenBusinessReplenishPopup] =
    useState(false)
  const [isOpenBusinessWithdrawPopup, setIsOpenBusinessWithdrawPopup] =
    useState(false)

  const [isOpenHousePopup, setIsOpenHousePopup] = useState(false)
  const [isOpenBusinessPopup, setIsOpenBusinessPopup] = useState(false)
  const [isOpenFactionPopup, setIsOpenFactionPopup] = useState(false)
  const [playOpenCloseInterfaceSfx] = useSound(
    require('../../assets/sounds/open-close_interface_2.mp3'),
    { volume: sfxBase },
  )

  useEscClose({ isOpenInterface: isOpen, closeEvent: BankEvents.Close })

  useEffect(() => {
    playOpenCloseInterfaceSfx()
  }, [isOpen])

  const onClickCloseBank = () => {
    callClient(BankEvents.Close)
  }

  const onClickDeposit = (value: number) => {
    if (value <= 0) {
      return
    }
    const payload: BankPayloads[BankEvents.Replenish] = { sum: value }
    callClient(BankEvents.Replenish, payload)
  }

  const onClickWithdraw = (value: number) => {
    if (value <= 0) {
      return
    }
    const payload: BankPayloads[BankEvents.Withdraw] = { sum: value }
    callClient(BankEvents.Withdraw, payload)
  }

  const onClickPayRentHouse = (value: number) => {
    if (value <= 0) {
      return
    }
    const payload: BankPayloads[BankEvents.PayRentHouse] = { days: value }
    callClient(BankEvents.PayRentHouse, payload)
  }

  const onClickPayRentBusiness = (value: number) => {
    if (value <= 0) {
      return
    }
    const payload: BankPayloads[BankEvents.PayRentBusiness] = { days: value }
    callClient(BankEvents.PayRentBusiness, payload)
  }

  const onClickWithdrawFaction = (value: number) => {
    if (value <= 0) {
      return
    }
    const payload: BankPayloads[BankEvents.WithdrawFaction] = { sum: value }
    callClient(BankEvents.WithdrawFaction, payload)
  }

  const handleBusinessWithdraw = (sum: number) => {
    if (sum < 0) {
      return
    }
    const payload: BankPayloads[BankEvents.BusinessWithdraw] = { sum }
    callClient(BankEvents.BusinessWithdraw, payload)
  }

  const handleBusinessReplenish = (sum: number) => {
    if (sum < 0) {
      return
    }
    const payload: BankPayloads[BankEvents.BusinessReplenish] = { sum }
    callClient(BankEvents.BusinessReplenish, payload)
  }

  const onClickClosePopupRealty = () => {
    setIsOpenHousePopup(false)
    setIsOpenBusinessPopup(false)
    setIsOpenFactionPopup(false)
  }

  const getCards = () => {
    return (
      <>
        <Card
          state={isOpenHousePopup}
          setState={setIsOpenHousePopup}
          realty={'House'}
          info={house}
        />
        <Card
          state={isOpenBusinessPopup}
          setState={setIsOpenBusinessPopup}
          realty={'Business'}
          info={business}
        />
        <Card
          state={isOpenFactionPopup}
          setState={setIsOpenFactionPopup}
          realty={'Faction'}
          info={faction}
        />
      </>
    )
  }

  useEffect(() => {
    setIsOpenHousePopup(false)
    setIsOpenBusinessPopup(false)
    setIsOpenFactionPopup(false)
  }, [isOpen])

  return !isOpen ? null : (
    <div className="Bank">
      <div className="shadow" />
      <div className="watermark" />
      <div className="blur" />

      <div className="window">
        <CardPopup
          isShow={isOpenHousePopup}
          onClickClose={onClickClosePopupRealty}
          realty={RealtyCards.House}
          info={house}
          send={onClickPayRentHouse}
        />
        <BusinessPopup
          opened={isOpenBusinessPopup}
          close={onClickClosePopupRealty}
          info={business}
          payRent={onClickPayRentBusiness}
          openReplenish={() => setIsOpenBusinessReplenishPopup(true)}
          openWithdraw={() => setIsOpenBusinessWithdrawPopup(true)}
        />
        <CardPopup
          isShow={isOpenFactionPopup}
          onClickClose={onClickClosePopupRealty}
          realty={RealtyCards.Faction}
          info={faction}
          send={onClickWithdrawFaction}
        />
        {isOpenDepositPopup && (
          <PopupBalance
            state={isOpenDepositPopup}
            setState={setIsOpenDepositPopup}
            blockName={'Пополнение'}
            placeholder={'Например 500'}
            infoText={'Введите сумму, которую хотите положить на счет'}
            successBtn={'Пополнить'}
            cancelBtn={'Отмена'}
            send={onClickDeposit}
          />
        )}
        {isOpenWithdrawPopup && (
          <PopupBalance
            state={isOpenWithdrawPopup}
            setState={setIsOpenWithdrawPopup}
            blockName={'Снятие'}
            placeholder={'Например 500'}
            infoText={'введите сумму, которую хотите снять со счета'}
            successBtn={'Снять'}
            cancelBtn={'Отмена'}
            send={onClickWithdraw}
          />
        )}
        {isOpenBusinessWithdrawPopup && (
          <PopupBalance
            state={isOpenBusinessWithdrawPopup}
            setState={setIsOpenBusinessWithdrawPopup}
            blockName="Снятие"
            placeholder="Например: 500"
            infoText="Введите сумму, которую хотите снять со счета бизнеса"
            successBtn="Снять"
            cancelBtn="Отмена"
            send={handleBusinessWithdraw}
          />
        )}
        {isOpenBusinessReplenishPopup && (
          <PopupBalance
            state={isOpenBusinessReplenishPopup}
            setState={setIsOpenBusinessReplenishPopup}
            blockName="Пополнение"
            placeholder="Например: 500"
            infoText="Введите сумму, которую хотите положить на счет бизнеса"
            successBtn="Пополнить"
            cancelBtn="Отмена"
            send={handleBusinessReplenish}
          />
        )}
        <div className="bg" />
        <div className="frame" />
        <div className="effects" />

        <div className="content">
          <div className="info">
            <div className="name">Банк</div>
            <div className="cross" onClick={onClickCloseBank}></div>
          </div>
          <div className="balance">
            <div className="name">Баланс счета</div>
            <div className="coins">
              <div className="icon" />
              <div className="amount">{numberWithSeparator(balance, '.')}</div>
            </div>
          </div>
          <div className="buttons">
            <div
              className={`btn deposit`}
              onClick={() => setIsOpenDepositPopup(true)}
            >
              Пополнить
            </div>
            <div
              className={`btn withdraw`}
              onClick={() => setIsOpenWithdrawPopup(true)}
            >
              Снять
            </div>
          </div>
          <div className="character" />

          <div className="cards-info">
            <div className="name">Аренда и Хранилище</div>
            <div className="cards">{getCards()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bank
