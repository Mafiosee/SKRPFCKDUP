import './styles.sass'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import Balance from '../Balance'
import { Quality } from '../../../../shared/inventory/itemType'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'
import { ApiFunctions } from '../../api'
import { DonateStoreEvents } from '../../../../shared/DonateStore/events'
import {
  QualityColor,
  QualityName,
  QualityNoShadowIcon,
} from '../../data/quality'
import { donateStoreActions } from '../../reducer'
import { Case } from '../../../../shared/DonateStore/Case'
import { Background } from '../OpenedProduct/Background'
import { GiftBackground } from '../OpenedProduct/GiftBackground'
import { PrizeBackground } from './PrizeBackground'
import { ItemImagesSquad } from '../../../Inventory/assets/items'
import { getImageUrlBySourceType } from '../../../../utils/getImageUrlBySourceType'
import { buyCasesActions } from '../../../BuyCases/reducer'

type Props = {
  isShow: boolean
  caseId: any
  close: () => void
}
const OpenedCase: React.FC<Props> = ({ isShow, caseId, close }) => {
  const dispatch = useAppDispatch()
  const {
    giftPlayer,
    casesPage: { cases },
    balance,
  } = useAppSelector((state) => state.donateStore)
  const [currentCase, setCurrentCase] = useState<Case | null>(null)
  const [buyPopup, setBuyPopup] = useState<{ isOpen: boolean; amount: number }>(
    {
      isOpen: false,
      amount: 1,
    },
  )
  const [giftPopup, setGiftPopup] = useState<{
    isOpen: boolean
    input: string
    amount: number | string
  }>({
    isOpen: false,
    input: '',
    amount: 1,
  })
  const [isOpenPrizes, setIsOpenPrizes] = useState(false)

  useEffect(() => {
    setBuyPopup((prev) => ({ ...prev, isOpen: false }))
    setGiftPopup((prev) => ({ ...prev, isOpen: false }))
    setIsOpenPrizes(false)
  }, [isShow])

  useEffect(() => {
    dispatch(donateStoreActions.setGiftPlayer(null))
  }, [dispatch, buyPopup.isOpen, giftPopup.isOpen])

  useEffect(() => {
    if (caseId === null) {
      return
    }
    const newCase = cases.find((el) => el.id === caseId)
    setCurrentCase(newCase ?? null)
  }, [caseId, cases])

  const getCurrentPrice = () => {
    if (!currentCase) {
      return 0
    }
    if (!currentCase.discount) {
      return currentCase.price
    }
    return parseInt(
      `${currentCase.price * ((100 - currentCase.discount) / 100)}`,
    )
  }

  const changeGiftAmount = (diff: number) => {
    let newAmount: number
    if (typeof giftPopup.amount === 'string') {
      newAmount = 0
    } else {
      newAmount = giftPopup.amount + diff
      if (newAmount < 1) {
        newAmount = 1
      } else if (newAmount > 99) {
        newAmount = 99
      }
    }
    setGiftPopup((prev) => ({ ...prev, amount: newAmount }))
  }

  const getPrizes = () => {
    if (!currentCase) {
      return null
    }
    return [...currentCase.prizes]
      .sort((a, b) => a.quality - b.quality)
      .map(({ name, quality, image }, idx) => (
        <div key={idx} className="prize">
          <div className="background">
            <PrizeBackground quality={quality} />
          </div>
          <div className="info">
            <div className="name">{name}</div>
            {/*<div className="change">Шанс: {chance}%</div>*/}
          </div>
          <div
            className="image"
            style={{
              backgroundImage: `url(${getImageUrlBySourceType(image.name, image.sourceType)})`,
            }}
          />
        </div>
      ))
  }

  return (
    <div className={`_OpenedCase ${isShow && '-show'}`}>
      <div className="content">
        <div className={`main ${!isOpenPrizes && '-show'}`}>
          <div className="header">
            <div className="back" onClick={close}>
              Назад
            </div>
            <div className="title">О кейсе</div>
            <Balance />
          </div>

          <div className="item">
            <Background
              quality={currentCase ? currentCase.quality : Quality.Unusual}
            />
            <div
              className="image"
              style={{
                backgroundImage: currentCase
                  ? `url(${getImageUrlBySourceType(currentCase.image.name, currentCase.image.sourceType)})`
                  : 'none',
              }}
            >
              <div className="prizes" onClick={() => setIsOpenPrizes(true)}>
                Возможные призы
              </div>
            </div>
          </div>

          <div className="info">
            <div className="category">
              <div className="quality">
                <div
                  className="icon"
                  style={{
                    backgroundImage: currentCase
                      ? `url(${QualityNoShadowIcon[currentCase.quality]})`
                      : 'none',
                  }}
                />
                <div
                  className="text"
                  style={{
                    color: currentCase
                      ? QualityColor[currentCase.quality]
                      : '#fff',
                  }}
                >
                  {currentCase ? QualityName[currentCase.quality] : null}
                </div>
              </div>
              <div className="separator" />
              <div className="type">
                {currentCase ? currentCase.type : null}
              </div>
            </div>
            <div className="name">{currentCase ? currentCase.name : null}</div>
            <div className="price">
              <div className="icon" />
              <div className="current">
                {currentCase
                  ? numberWithSeparator(getCurrentPrice(), '.')
                  : null}
              </div>
              {currentCase?.discount ? (
                <>
                  <div className="prev">
                    {numberWithSeparator(currentCase.price, '.')}
                  </div>
                  <div className="discount">-{currentCase.discount}%</div>
                </>
              ) : null}
            </div>
            <div className="line" />
            <div className="description">
              {currentCase ? currentCase.description.large : null}
            </div>
            <div className="buttons">
              <div
                className="button -buy"
                onClick={() => {
                  if (currentCase == null) {
                    return
                  }
                  dispatch(
                    buyCasesActions.show({
                      case: { ...currentCase, amount: 1 },
                      balance,
                    }),
                  )
                }}
              >
                Приобрести
              </div>
              <div
                className="button -gift"
                onClick={() =>
                  setGiftPopup((prev) => ({
                    ...prev,
                    isOpen: true,
                    input: '',
                    amount: 1,
                  }))
                }
              >
                Подарить
              </div>
            </div>
          </div>

          <div className={`buyPopup ${buyPopup.isOpen && '-show'}`}>
            <div className="shadow" />
            <div className="window">
              <div className="title">Покупка</div>
              <div
                className="close"
                onClick={() =>
                  setBuyPopup((prev) => ({ ...prev, isOpen: false }))
                }
              />
              <div className="text">
                Вы действительно хотите приобрести:
                <br />
                <span className="name">
                  {currentCase?.name} (X{buyPopup.amount})
                </span>
                {' за '}
                <span className="price">
                  {currentCase
                    ? numberWithSeparator(
                        getCurrentPrice() * buyPopup.amount,
                        '.',
                      )
                    : null}
                </span>
                {' ?'}
              </div>
              <div className="buttons">
                <div
                  className="button -light"
                  onClick={() => {
                    ApiFunctions[DonateStoreEvents.CaseBuy]({
                      caseId,
                      amount: buyPopup.amount,
                    })
                    setBuyPopup((prev) => ({ ...prev, isOpen: false }))
                  }}
                >
                  Приобрести
                </div>
                <div
                  className="button -"
                  onClick={() =>
                    setBuyPopup((prev) => ({ ...prev, isOpen: false }))
                  }
                >
                  Назад
                </div>
              </div>
            </div>
          </div>

          <div className={`giftPopup ${giftPopup.isOpen && '-show'}`}>
            <div className="shadow" />
            <div className="window">
              <div className="background">
                <GiftBackground
                  quality={currentCase ? currentCase.quality : Quality.Unusual}
                />
              </div>
              <div className="content">
                <div className="title">Подарок игроку</div>
                <div
                  className="close"
                  onClick={() =>
                    setGiftPopup((prev) => ({ ...prev, isOpen: false }))
                  }
                />
                <div className="row">
                  <div
                    className="image"
                    style={{
                      backgroundImage: currentCase
                        ? `url(${getImageUrlBySourceType(currentCase.image.name, currentCase.image.sourceType)})`
                        : 'none',
                    }}
                  />
                  <div className="info">
                    <div className="title">Вы дарите</div>
                    <div className="name">{currentCase?.name}</div>
                    <div className="quality">
                      <div
                        className="icon"
                        style={{
                          backgroundImage: currentCase
                            ? `url(${QualityNoShadowIcon[currentCase.quality]})`
                            : 'none',
                        }}
                      />
                      <div
                        className="text"
                        style={{
                          color: currentCase
                            ? QualityColor[currentCase.quality]
                            : '#fff',
                        }}
                      >
                        {currentCase ? QualityName[currentCase.quality] : null}
                      </div>
                    </div>
                    <div className="line" />
                    <div className="amount">
                      <div
                        className="btn -minus"
                        onClick={() => changeGiftAmount(-1)}
                      />
                      <input
                        type="text"
                        placeholder="1"
                        value={giftPopup.amount}
                        onChange={({ target: { value } }) => {
                          if (!value) {
                            return setGiftPopup((prev) => ({
                              ...prev,
                              amount: value,
                            }))
                          }
                          const intValue = parseInt(value)
                          if (
                            isNaN(intValue) ||
                            intValue < 1 ||
                            intValue > 99
                          ) {
                            return
                          }
                          setGiftPopup((prev) => ({
                            ...prev,
                            amount: intValue,
                          }))
                        }}
                      />
                      <div
                        className="btn -plus"
                        onClick={() => changeGiftAmount(1)}
                      />
                    </div>
                    <div className="price">
                      {currentCase
                        ? `${numberWithSeparator(getCurrentPrice(), '.')} / шт`
                        : null}
                    </div>
                  </div>
                </div>
                <div className="helper">Введите UID игрока</div>
                <div className="input">
                  <div
                    className={`block ${(giftPlayer != null || giftPopup.input.length) && '-active'}`}
                  >
                    {giftPlayer ? (
                      <div className="player">
                        {giftPlayer.name} (UID: {giftPlayer.uid})
                      </div>
                    ) : (
                      <input
                        type="text"
                        placeholder="Например: AB1"
                        value={giftPopup.input}
                        onChange={(event) =>
                          setGiftPopup((prev) => ({
                            ...prev,
                            input: event.target.value,
                          }))
                        }
                      />
                    )}
                  </div>
                  <div
                    className={`button ${giftPlayer != null && '-cancel'} ${giftPopup.input.length && '-active'}`}
                    onClick={() => {
                      if (giftPlayer != null) {
                        dispatch(donateStoreActions.setGiftPlayer(null))
                      } else if (giftPopup.input.length) {
                        ApiFunctions[DonateStoreEvents.RequestGiftPlayer]({
                          uid: giftPopup.input,
                        })
                      }
                    }}
                  />
                </div>
                <div className="buttons">
                  <div
                    className={`button -gift ${giftPlayer != null && '-active'}`}
                    onClick={() => {
                      if (giftPlayer != null) {
                        ApiFunctions[DonateStoreEvents.CaseGift]({
                          caseId,
                          amount: 1,
                          playerUid: giftPlayer.uid,
                        })
                      }
                      setGiftPopup((prev) => ({ ...prev, isOpen: false }))
                    }}
                  >
                    <div className="content">
                      <div className="text">Подарить</div>
                      <div className="price">
                        {currentCase
                          ? numberWithSeparator(
                              getCurrentPrice() * (+giftPopup.amount || 1),
                              '.',
                            )
                          : null}
                      </div>
                    </div>
                  </div>
                  <div
                    className="button -cancel"
                    onClick={() =>
                      setGiftPopup((prev) => ({ ...prev, isOpen: false }))
                    }
                  >
                    Отмена
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`prizes ${isOpenPrizes && '-show'}`}>
          <div className="header">
            <div className="back" onClick={() => setIsOpenPrizes(false)}>
              Назад
            </div>
            <div className="title">Возможные призы</div>
            <Balance />
          </div>
          <div className="list">{getPrizes()}</div>
        </div>
      </div>
    </div>
  )
}

export default OpenedCase
