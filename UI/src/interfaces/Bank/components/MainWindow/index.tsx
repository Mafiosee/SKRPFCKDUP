import React from 'react'
import './styles.sass'
import { callClient } from '../../../../utils/api'
import { BankEvents } from '../../../../shared/Bank/events'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'
import UIKitButton from '../../../../ui-kit/Button'
import { UIKitButtonType } from '../../../../ui-kit/Button/data/Type'
import Card from '../Card'
import { BusinessImages, LocationImages } from '../../assets/Images'
import UIKitWindowMain from '../../../../ui-kit/WindowMain'
import { useAppSelector } from '../../../../hooks/redux'
import { Icon, IconComponent } from '../../../../ui-kit/Icons'
import { Modal } from '../../types/Modal'

const IconCoinSeptimComponent = IconComponent[Icon.CoinSeptim]

type Props = {
  openModal: (modal: Modal) => void
  covered: boolean
}

const MainWindow: React.FC<Props> = ({ openModal, covered }) => {
  const { title, balance, house, faction, business } = useAppSelector(
    (state) => state.bank,
  )

  return (
    <UIKitWindowMain
      size={{ width: 1000, height: 650 }}
      title={title}
      handleClose={() => callClient(BankEvents.Close)}
      covered={covered}
    >
      <div className="MainWindow">
        <div className="info">
          <div className="text">
            <div className="title">
              Добро пожаловать
              <br />в банк
            </div>
            <div className="description">
              Оплачивайте жильё, управляйте казной гильдии
              <br />
              или бизнеса, а также безопасно храните и<br />
              пополняйте свое хранилище.
            </div>
          </div>
          <div className="controls">
            <div className="title">Ваше хранилище</div>
            <div className="balance">
              <div className="icon">
                <IconCoinSeptimComponent />
              </div>
              <div className="sum">
                {numberWithSeparator(balance.bank, '.')}
              </div>
            </div>
            <div className="buttons">
              <UIKitButton
                className="button"
                text="Пополнить"
                onClick={() => openModal(Modal.Replenish)}
              />
              <UIKitButton
                className="button"
                text="Снять"
                type={UIKitButtonType.Secondary}
                onClick={() => openModal(Modal.Withdraw)}
              />
            </div>
          </div>
        </div>
        <div className="infrastructure">
          <div className="title">Инфраструктура</div>
          <Card
            has={house.has}
            empty={{
              imageUrl: require('../../assets/images/house-empty.png'),
              name: 'Личный дом',
            }}
            name={house.name}
            date={house.date}
            imageUrl={LocationImages[`${house.image}.png`]}
            onClick={() => openModal(Modal.House)}
          />
          <Card
            has={faction.has}
            empty={{
              imageUrl: require('../../assets/images/faction-empty.png'),
              name: 'Фракция',
              helper: 'Вы не во фракции',
            }}
            name={faction.name}
            balance={faction.balance}
            imageUrl={LocationImages[`${faction.image}.png`]}
            onClick={() => openModal(Modal.Faction)}
          />
          <Card
            has={business.has}
            empty={{
              imageUrl: require('../../assets/images/business-empty.png'),
              name: 'Бизнес',
            }}
            name={business.name}
            date={business.date}
            imageUrl={BusinessImages[`${business.image}.png`]}
            onClick={() => openModal(Modal.Business)}
          />
        </div>
      </div>
    </UIKitWindowMain>
  )
}

export default MainWindow
