import './styles.sass'
import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import Balance from '../Balance'
import { Background } from './Background'
import { Quality } from '../../../../shared/inventory/itemType'
import { Product } from '../../../../shared/DonateStore/Product'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'
import { ApiFunctions } from '../../api'
import { DonateStoreEvents } from '../../../../shared/DonateStore/events'
import { GiftBackground } from './GiftBackground'
import {
  QualityColor,
  QualityName,
  QualityNoShadowIcon,
} from '../../data/quality'
import { donateStoreActions } from '../../reducer'
import { getImageUrlBySourceType } from '../../../../utils/getImageUrlBySourceType'
import { DonateStoreVideos } from '../../assets/DonateStoreVideos'

type Props = {
  isShow: boolean
  productId: any
  close: () => void
}

const OpenedProduct: React.FC<Props> = ({ isShow, productId, close }) => {
  const dispatch = useAppDispatch()
  const {
    giftPlayer,
    storePage: { products },
  } = useAppSelector((state) => state.donateStore)
  const [product, setProduct] = useState<Product | null>(null)
  const [buyPopup, setBuyPopup] = useState<{ isOpen: boolean }>({
    isOpen: false,
  })
  const [giftPopup, setGiftPopup] = useState<{
    isOpen: boolean
    input: string
  }>({
    isOpen: false,
    input: '',
  })
  const videoRef = useRef(null)

  useEffect(() => {
    setBuyPopup((prev) => ({ ...prev, isOpen: false }))
    setGiftPopup((prev) => ({ ...prev, isOpen: false }))
  }, [isShow])

  useEffect(() => {
    dispatch(donateStoreActions.setGiftPlayer(null))
  }, [dispatch, buyPopup.isOpen, giftPopup.isOpen])

  useEffect(() => {
    if (productId === null) {
      return
    }
    const newProduct = products.find((el) => el.id === productId)
    setProduct(newProduct ?? null)
  }, [products, productId])

  const getCurrentPrice = () => {
    if (!product) {
      return 0
    }
    if (!product.discount) {
      return product.price
    }
    return product.price * ((100 - product.discount) / 100)
  }

  return (
    <div className={`_OpenedProduct ${isShow && '-show'}`}>
      <div className="header">
        <div className="back" onClick={close}>
          Назад
        </div>
        <div className="title">О предмете</div>
        <Balance />
      </div>

      <div className="item">
        <Background quality={product ? product.quality : Quality.Unusual} />
        {JSON.stringify(product)}
        {product &&
        product?.image &&
        DonateStoreVideos[`${product.image.name}.webm`] != null ? (
          <video
            className="image"
            ref={videoRef}
            src={DonateStoreVideos[`${product.image.name}.webm`]}
            onMouseOver={() => {
              if (videoRef.current == null) {
                return
              }
              const video = videoRef.current as HTMLVideoElement
              video.currentTime = 0
              video.play()
            }}
            onMouseLeave={() => {
              if (videoRef.current == null) {
                return
              }
              const video = videoRef.current as HTMLVideoElement
              video.pause()
              video.currentTime = 0
            }}
          />
        ) : (
          <div
            className="image"
            style={{
              backgroundImage: `url(${getImageUrlBySourceType(product?.image.name, product?.image.sourceType)})`,
            }}
          />
        )}
      </div>

      <div className="info">
        <div className="category">
          <div className="quality">
            <div
              className="icon"
              style={{
                backgroundImage: product
                  ? `url(${QualityNoShadowIcon[product.quality]})`
                  : 'none',
              }}
            />
            <div
              className="text"
              style={{
                color: product ? QualityColor[product.quality] : '#fff',
              }}
            >
              {product ? QualityName[product.quality] : null}
            </div>
          </div>
          <div className="separator" />
          <div className="type">{product ? product.type : null}</div>
        </div>
        <div className="name">{product ? product.name : null}</div>
        <div className="price">
          <div className="icon" />
          <div className="current">
            {product ? numberWithSeparator(getCurrentPrice(), '.') : null}
          </div>
          {product?.discount ? (
            <>
              <div className="prev">
                {numberWithSeparator(product.price, '.')}
              </div>
              <div className="discount">-{product.discount}%</div>
            </>
          ) : null}
        </div>
        <div className="line" />
        <div className="description">
          {product ? product.description.large : null}
        </div>
        <div className="buttons">
          <div
            className="button -buy"
            onClick={() => setBuyPopup((prev) => ({ ...prev, isOpen: true }))}
          >
            Приобрести
          </div>
          <div
            className="button -gift"
            onClick={() =>
              setGiftPopup((prev) => ({ ...prev, isOpen: true, input: '' }))
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
            onClick={() => setBuyPopup((prev) => ({ ...prev, isOpen: false }))}
          />
          <div className="text">
            Вы действительно хотите приобрести:
            <br />
            <span className="name">{product?.name}</span>
            {' за '}
            <span className="price">
              {product ? numberWithSeparator(getCurrentPrice(), '.') : null}
            </span>
            {' ?'}
          </div>
          <div className="buttons">
            <div
              className="button -light"
              onClick={() => {
                ApiFunctions[DonateStoreEvents.ProductBuy]({
                  productId,
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
              quality={product ? product.quality : Quality.Unusual}
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
                  backgroundImage: product
                    ? `url(${getImageUrlBySourceType(product.image.name, product.image.sourceType)})`
                    : 'none',
                }}
              />
              <div className="info">
                <div className="title">Вы дарите</div>
                <div className="name">{product?.name}</div>
                <div className="quality">
                  <div
                    className="icon"
                    style={{
                      backgroundImage: product
                        ? `url(${QualityNoShadowIcon[product.quality]})`
                        : 'none',
                    }}
                  />
                  <div
                    className="text"
                    style={{
                      color: product ? QualityColor[product.quality] : '#fff',
                    }}
                  >
                    {product ? QualityName[product.quality] : null}
                  </div>
                </div>
                <div className="line" />
                <div className="price">
                  {product ? numberWithSeparator(getCurrentPrice(), '.') : null}
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
                  if (product != null && giftPlayer != null) {
                    ApiFunctions[DonateStoreEvents.ProductGift]({
                      productId: product.id,
                      playerUid: giftPlayer.uid,
                    })
                  }
                  setGiftPopup((prev) => ({ ...prev, isOpen: false }))
                }}
              >
                <div className="content">
                  <div className="text">Подарить</div>
                  <div className="price">
                    {product
                      ? numberWithSeparator(getCurrentPrice(), '.')
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
  )
}

export default OpenedProduct
