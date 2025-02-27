import React, { useEffect, useRef, useState } from 'react'
import './styles.sass'
import { CSSTransition } from 'react-transition-group'
import { callClient } from '../../../../utils/api'
import {
  QualityColor,
  QualityName,
  QualityNoShadowIcon,
} from '../../../DonateStore/data/quality'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { importAllImagesFromFolder } from '../../../../utils/images'
import { calcVh } from '../../../../utils/calcVh'
import { QualityGiftColor } from '../../const'
import {
  PromoMenuEvents,
  PromoMenuPayloads,
} from '../../../../shared/PromoMenu/events'
import { getImageUrlBySourceType } from '../../../../utils/getImageUrlBySourceType'
import { escMenuActions } from '../../reducer'

const MIN_PROMO_LENGTH = 3

type PropsType = {
  isShow: boolean
}

enum ArrowWay {
  next,
  prev,
}

const Images = importAllImagesFromFolder(
  require.context('../../assets/images/Promo/images/', false, /.png$/),
)

const ItemsWidth = 996

const Promo: React.FC<PropsType> = ({ isShow }) => {
  const dispatch = useAppDispatch()
  const nodeRef = useRef(null)
  const [isPromo, setIsPromo] = useState(false)
  const [showGifts, setShowGifts] = useState(true)
  const [activePage, setActivePage] = useState(0)

  const [activeInput, setActiveInput] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const { promo } = useAppSelector((state) => state.escMenu)

  const PagesLength = promo != null ? promo.gifts.length : 0 / 3

  useEffect(() => {
    setShowGifts(promo != null && promo.gifts.length > 0)
  }, [isShow, promo?.gifts])

  useEffect(() => {
    setIsPromo(true)
  }, [isShow])
  const onClickSend = () => {
    if (inputValue.length < MIN_PROMO_LENGTH) {
      return
    }
    const payload: PromoMenuPayloads[PromoMenuEvents.ActivatePromo] = {
      promo: inputValue,
    }
    setInputValue('')
    callClient(PromoMenuEvents.ActivatePromo, payload)
  }

  const onClickClose = () => {
    setIsPromo(false)
  }

  const onClickTakeGifts = () => {
    callClient(PromoMenuEvents.TakeGifts)
    dispatch(escMenuActions.setGifts([]))
  }

  const onClickArrowPage = (way: ArrowWay) => {
    if (way === ArrowWay.next) {
      if (activePage >= PagesLength) {
        return
      }
      setActivePage(activePage + 1)
    }
    if (way === ArrowWay.prev) {
      if (activePage > 0) {
        setActivePage(activePage - 1)
      }
    }
  }

  const onClickPage = (id: number) => {
    if (id < 0 || id >= PagesLength) {
      return
    }
    setActivePage(id)
  }

  const getPages = () => {
    const pages = Array.from({ length: PagesLength }, () => null)

    return pages.map((page, idx) => (
      <div
        className={`page ${idx === activePage && '-active'}`}
        key={idx}
        onClick={() => onClickPage(idx)}
      >
        <div
          className="fill"
          style={{
            backgroundColor: `${idx === activePage ? '#FFFFFF' : '#696C6F'}`,
          }}
        />
      </div>
    ))
  }

  return (
    <CSSTransition
      in={isShow}
      timeout={0}
      mountOnEnter
      unmountOnExit
      classNames="_Promo"
      nodeRef={nodeRef}
    >
      <div className={'_Promo'}>
        {isPromo && !showGifts && (
          <div className={'promo-window'}>
            <div className="block-info">
              <div className="name">Промокод</div>
              <div className="exit" onClick={onClickClose} />
            </div>
            <div className="title">введите ПРОМОКОД, если он у вас есть</div>
            <input
              className={`${activeInput && '-active'}`}
              type="text"
              placeholder={'Промокод'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onClick={() => setActiveInput(true)}
              onBlur={() => setActiveInput(false)}
            />
            <div className="buttons">
              <div
                className={`btn primary ${inputValue.length < MIN_PROMO_LENGTH && '-disabled'}`}
                onClick={onClickSend}
              >
                Активировать
              </div>
              <div className={`btn secondary `} onClick={onClickClose}>
                Отмена
              </div>
            </div>
          </div>
        )}

        {promo != null && promo.gifts.length > 0 && showGifts && (
          <div className={'gifts'}>
            <div className="window">
              <div className="title">Ваши подарки за промокод</div>
              <div className="row">
                <div
                  className={`arrow ${activePage > 0 && '-show'}`}
                  onClick={() => onClickArrowPage(ArrowWay.prev)}
                />
                <div className="items-content">
                  <div
                    className="items"
                    style={{
                      marginLeft: calcVh(-ItemsWidth * activePage),
                    }}
                  >
                    {promo.gifts.map((gift, idx) => (
                      <div className="item" key={idx}>
                        <div className="bg">
                          <div className="background" />
                          <div className="vector" />
                          <div
                            className="shadow"
                            style={{
                              backgroundColor: QualityGiftColor[gift.quality],
                            }}
                          />
                          <div
                            className="image"
                            style={{
                              backgroundImage: `url(${getImageUrlBySourceType(gift.image.name, gift.image.sourceType)})`,
                            }}
                          />
                        </div>
                        <div className="content">
                          <div className="name">{gift.name}</div>
                          <div className="line" />
                          <div className="row">
                            <div className="quality">
                              <div
                                className="icon"
                                style={{
                                  backgroundImage: `url(${QualityNoShadowIcon[gift.quality]})`,
                                }}
                              />
                              <div
                                className="name"
                                style={{ color: QualityColor[gift.quality] }}
                              >
                                {QualityName[gift.quality]}
                              </div>
                            </div>
                            {/*<div className="separator" />*/}
                            {/*<div className="category">{gift.type}</div>*/}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className={`arrow ${activePage < PagesLength - 1 && '-show'}`}
                  onClick={() => onClickArrowPage(ArrowWay.next)}
                />
              </div>
              <div className="pages">{getPages()}</div>
              <div className="accept-block">
                <div className="line" />
                <div className="button" onClick={onClickTakeGifts}>
                  Принять
                </div>
                <div className="line" />
              </div>
              <div className="info-text">
                ПОСЛЕ нажатия кнопки <span>ПРИНЯТь</span>, все предметы будут
                автоматически <span>отправлены на склад!</span>
              </div>
              <div className="gifts-info">
                <div>[</div>
                <div>esc</div>
                <div className={'icon'} />
                <div>магазин</div>
                <div className={'icon'} />
                <div>склад</div>
                <div>]</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </CSSTransition>
  )
}

export default Promo
