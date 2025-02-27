import './styles.sass'
import React, { useEffect, useMemo, useState } from 'react'
import { useAppSelector } from '../../../../hooks/redux'
import { Tab } from '../../enums/Tabs'
import { VipsInfo } from '../../data/vip'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'
import { ApiFunctions } from '../../api'
import { DonateStoreEvents } from '../../../../shared/DonateStore/events'
import { VipType } from '../../../../shared/Vip/types'
import { enumerate } from '../../../../utils/enumerate'

const CardImageUrl: Record<VipType, string> = {
  [VipType.BASIC]: require('../../assets/images/VipsPage/card-started.png'),
  [VipType.ADVANCED]: require('../../assets/images/VipsPage/card-limited.png'),
  [VipType.MAXIMUM]: require('../../assets/images/VipsPage/card-legendary.png'),
}

const PopupImageUrl: Record<VipType, string> = {
  [VipType.BASIC]: require('../../assets/images/VipsPage/popup-started.png'),
  [VipType.ADVANCED]: require('../../assets/images/VipsPage/popup-limited.png'),
  [VipType.MAXIMUM]: require('../../assets/images/VipsPage/popup-legendary.png'),
}

const PageVips: React.FC = () => {
  const { tab, vipsPage } = useAppSelector((state) => state.donateStore)
  const [popup, setPopup] = useState<{
    isOpen: boolean
    vipType: VipType
    durationId: any
  }>({
    isOpen: false,
    vipType: VipType.BASIC,
    durationId: null,
  })
  const [isOpenBuy, setIsOpenBuy] = useState(false)
  const [openedDurations, setOpenedDurations] = useState(false)

  const isOpen = useMemo(() => tab === Tab.Vips, [tab])

  useEffect(() => {
    setPopup((prev) => ({ ...prev, isOpen: false }))
  }, [tab])

  useEffect(() => {
    setIsOpenBuy(false)
    setOpenedDurations(false)
  }, [popup.isOpen])

  const getVip = (vipType: VipType) => {
    const { description, durations } = vipsPage[vipType]
    const currentPrice = durations[0].price
    return (
      <div
        className="vip"
        style={{ backgroundImage: `url(${CardImageUrl[vipType]})` }}
      >
        <div className="name">
          <div className="title">VIP - статус</div>
          <div className="value">{VipsInfo[vipType].name}</div>
        </div>
        <div className="days">
          <div className="title">Срок действия:</div>
          <div className="value">
            {durations[0].days}{' '}
            {enumerate(durations[0].days, ['день', 'дня', 'дней'])}
          </div>
        </div>
        <div className="price">
          <div className="icon" />
          <div className="current">
            {numberWithSeparator(currentPrice, '.')}
          </div>
          {/*{discount ? (*/}
          {/*  <div className="prev">{numberWithSeparator(price, '.')}</div>*/}
          {/*) : null}*/}
        </div>
        <div className="line" />
        <div className="description">
          <div className="title">Включает в себя:</div>
          <div className="list">
            {description.map((text, idx) => {
              if (idx >= 5) return null
              return (
                <div key={idx} className="item">
                  {text}
                </div>
              )
            })}
          </div>
        </div>
        <div
          className="link"
          onClick={() =>
            setPopup((prev) => ({
              ...prev,
              isOpen: true,
              vipType,
              durationId: vipsPage[vipType].durations[0].id,
            }))
          }
        >
          Все привелегии
        </div>
      </div>
    )
  }

  const openedVip = useMemo(() => {
    if (popup.vipType == null) return null
    return vipsPage[popup.vipType]
  }, [popup.vipType, vipsPage])

  return (
    <div
      className="_PageVips"
      style={{
        transform: `translateX(-${tab * 100}%)`,
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
      }}
    >
      {getVip(VipType.BASIC)}
      {getVip(VipType.ADVANCED)}
      {getVip(VipType.MAXIMUM)}

      <div className={`popup ${popup.isOpen && openedVip != null && '-show'}`}>
        <div className="shadow" />
        <div
          className="window"
          style={{
            backgroundImage:
              openedVip == null
                ? 'none'
                : `url(${PopupImageUrl[popup.vipType]})`,
          }}
        >
          <div className="title">VIP-Статус</div>
          <div
            className="close"
            onClick={() => setPopup((prev) => ({ ...prev, isOpen: false }))}
          />
          <div className="description">
            <div className="title">Что включает статус:</div>
            <div className="list">
              {openedVip != null &&
                openedVip.description.map((text, idx) => (
                  <div key={idx} className="item">
                    {text}
                  </div>
                ))}
            </div>
          </div>
          <div className="content">
            <div className="name">
              <div className="title">VIP - статус</div>
              <div className="value">
                {popup.vipType != null && VipsInfo[popup.vipType].name}
              </div>
            </div>
            {openedVip != null && (
              <div className="days">
                <div
                  className={`current ${openedDurations && '-opened'}`}
                  onClick={() => setOpenedDurations((prev) => !prev)}
                >{`${openedVip.durations.find((duration) => duration.id === popup.durationId)?.days} ${enumerate(openedVip.durations.find((duration) => duration.id === popup.durationId)?.days ?? 1, ['день', 'дня', 'дней'])}`}</div>
                <div className={`list ${openedDurations && '-opened'}`}>
                  {openedVip.durations.map((duration) => (
                    <div
                      key={duration.id}
                      className="duration"
                      onClick={() => {
                        setOpenedDurations(false)
                        setPopup((prev) => ({
                          ...prev,
                          durationId: duration.id,
                        }))
                      }}
                    >
                      <div className="days">
                        {duration.days}{' '}
                        {enumerate(duration.days, ['день', 'дня', 'дней'])}
                      </div>
                      <div className="price">
                        {numberWithSeparator(duration.price, '.')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="button" onClick={() => setIsOpenBuy(true)}>
              <div className="text">Приобрести</div>
              {openedVip != null && (
                <div className="price">
                  {numberWithSeparator(
                    openedVip.durations.find(
                      (duration) => duration.id === popup.durationId,
                    )?.price ?? 0,
                    '.',
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={`buyPopup ${isOpenBuy && '-show'}`}>
        <div className="shadow" />
        <div className="window">
          <div className="title">Покупка</div>
          <div className="close" onClick={() => setIsOpenBuy(false)} />
          <div className="text">
            Вы действительно хотите приобрести:
            <br />
            <span className="name">
              {openedVip != null &&
                popup.vipType != null &&
                `VIP-Статус ${VipsInfo[popup.vipType].name} на ${openedVip.durations.find((duration) => duration.id === popup.durationId)?.days} ${enumerate(openedVip.durations.find((duration) => duration.id === popup.durationId)?.days ?? 1, ['день', 'дня', 'дней'])}`}
            </span>
            {' за '}
            <span className="price">
              {openedVip != null &&
                numberWithSeparator(
                  openedVip.durations.find(
                    (duration) => duration.id === popup.durationId,
                  )?.price ?? 0,
                  '.',
                )}
            </span>
            {' ?'}
          </div>
          <div className="buttons">
            <div
              className="button -light"
              onClick={() => {
                ApiFunctions[DonateStoreEvents.VipBuy]({
                  vipType: popup.vipType,
                  durationId: popup.durationId,
                })
                setIsOpenBuy(false)
                setPopup((prev) => ({ ...prev, isOpen: false }))
              }}
            >
              Приобрести
            </div>
            <div className="button -" onClick={() => setIsOpenBuy(false)}>
              Назад
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageVips
