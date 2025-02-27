import React, { useEffect, useMemo, useRef, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CSSTransition } from 'react-transition-group'
import { Amount, Step } from './types'
import { Video } from './assets/video'
import { numberWithSeparator } from '../../utils/numberWithSeparator'
import { callClient } from '../../utils/api'
import { CasesEvents, CasesRequestOpenPayload } from '../../shared/Cases/events'
import { QualityColors, QualityName } from '../Inventory/data'
import { CasePrize } from '../../shared/DonateStore/CasePrize'
import { CardBackgrounds } from './assets/cards'
import { useEscClose } from '../../hooks/useEscClose'
import { casesActions } from './reducer'
import { getImageUrlBySourceType } from '../../utils/getImageUrlBySourceType'
import { buyCasesActions } from '../BuyCases/reducer'
import { escMenuActions } from '../EscMenu/reducer'
import { NavId } from '../EscMenu/types'
import { donateStoreActions } from '../DonateStore/reducer'
import { Tab } from '../DonateStore/enums/Tabs'

const Cases = () => {
  const dispatch = useAppDispatch()
  const { isOpen, isInstant, balance, cases, drop } = useAppSelector(
    (state) => state.cases,
  )
  const nodeRef = useRef(null)
  const [step, setStep] = useState<Step>(Step.Wait)
  const videoDropRef = useRef<HTMLVideoElement>(null)
  const videoIdleRef = useRef<HTMLVideoElement>(null)
  const videoOpenOneRef = useRef<HTMLVideoElement>(null)
  const videoOpenThreeRef = useRef<HTMLVideoElement>(null)
  const videoAfterOneRef = useRef<HTMLVideoElement>(null)
  const videoAfterThreeRef = useRef<HTMLVideoElement>(null)
  const [videosLoaded, setVideosLoaded] = useState({
    [Step.Drop]: false,
    [Step.Idle]: false,
    [Step.Open]: {
      [Amount.One]: false,
      [Amount.Three]: false,
    },
    [Step.After]: {
      [Amount.One]: false,
      [Amount.Three]: false,
    },
  })
  const [isStarted, setIsStarted] = useState(false)
  const [selectedCaseId, setSelectedCaseId] = useState(null)
  const [availablePrizes, setAvailablePrizes] = useState<{
    isShow: boolean
    list: CasePrize[]
  }>({
    isShow: false,
    list: [],
  })
  const [openAmount, setOpenAmount] = useState<Amount>(Amount.One)

  useEscClose({ isOpenInterface: isOpen, closeEvent: CasesEvents.Close })

  useEffect(() => {
    if (!isOpen) {
      return
    }
    setStep(Step.Open)
  }, [drop])

  const currentCase = useMemo(() => {
    return cases.find((el) => el.id === selectedCaseId)
  }, [cases, selectedCaseId])

  useEffect(() => {
    setStep(Step.Wait)
    if (!isOpen) {
      setIsStarted(false)
      setVideosLoaded({
        [Step.Drop]: false,
        [Step.Idle]: false,
        [Step.Open]: {
          [Amount.One]: false,
          [Amount.Three]: false,
        },
        [Step.After]: {
          [Amount.One]: false,
          [Amount.Three]: false,
        },
      })
    }
  }, [isOpen])

  useEffect(() => {
    switch (step) {
      case Step.Drop:
        if (videoDropRef.current == null) {
          return
        }
        videoDropRef.current.currentTime = 0
        videoDropRef.current.play()
        break

      case Step.Idle:
        if (videoIdleRef.current == null) {
          return
        }
        videoIdleRef.current.currentTime = 0
        videoIdleRef.current.play()
        break

      case Step.Open: {
        let video: HTMLVideoElement
        switch (openAmount) {
          case Amount.One:
            if (videoOpenOneRef.current == null) {
              return
            }
            video = videoOpenOneRef.current
            break
          case Amount.Three:
            if (videoOpenThreeRef.current == null) {
              return
            }
            video = videoOpenThreeRef.current
            break
        }
        if (video == null) {
          return
        }
        video.currentTime = 0
        video.play().then()
        break
      }
    }
  }, [openAmount, step])

  useEffect(() => {
    if (isStarted) {
      return
    }
    const values = [
      videosLoaded[Step.Drop],
      videosLoaded[Step.Idle],
      videosLoaded[Step.Open][Amount.One],
      videosLoaded[Step.Open][Amount.Three],
      videosLoaded[Step.After][Amount.One],
      videosLoaded[Step.After][Amount.Three],
    ]
    if (values.includes(false)) {
      return
    }
    setIsStarted(true)
    if (
      videoDropRef.current == null ||
      videoIdleRef.current == null ||
      videoOpenOneRef.current == null ||
      videoOpenThreeRef.current == null ||
      videoAfterOneRef.current == null ||
      videoAfterThreeRef.current == null
    ) {
      return
    }
    videoDropRef.current.volume = 0.2
    videoIdleRef.current.volume = 0.2
    videoOpenOneRef.current.volume = 0.2
    videoOpenThreeRef.current.volume = 0.2
    videoAfterOneRef.current.volume = 0.2
    videoAfterThreeRef.current.volume = 0.2
    setStep(Step.Drop)
  }, [videosLoaded, isStarted])

  useEffect(() => {
    setSelectedCaseId(cases.length ? cases[0].id : null)
  }, [cases])

  const getCases = () =>
    cases.map(({ id, quality, name, image, amount, prizes }) => {
      const isSelected = id === selectedCaseId
      const setSelected = () => setSelectedCaseId(id)

      return (
        <div
          key={id}
          className={`case ${isSelected && '-active'}`}
          onClick={setSelected}
        >
          <div className="backgrounds">
            <div
              className="idle"
              style={{
                backgroundImage: `url(${CardBackgrounds[quality].idle})`,
              }}
            />
            <div
              className="hover"
              style={{
                backgroundImage: `url(${CardBackgrounds[quality].hover})`,
              }}
            />
            <div
              className="active"
              style={{
                backgroundImage: `url(${CardBackgrounds[quality].active})`,
              }}
            />
          </div>
          <div className="content">
            <div className="name">{name}</div>
            <div
              className="prizes"
              onClick={(event) => {
                event.stopPropagation()
                setAvailablePrizes(() => ({ isShow: true, list: prizes }))
              }}
            >
              Возможные призы
            </div>
            <div
              className="image"
              style={{
                backgroundImage: `url(${getImageUrlBySourceType(image.name, image.sourceType)})`,
              }}
            >
              <div className="amount">x{amount}</div>
            </div>
          </div>
        </div>
      )
    })

  const getAvailablePrizes = () =>
    availablePrizes.list.map(({ quality, image, name, chance }, idx) => (
      <div key={idx} className="prize">
        <div className="content">
          <div className="image">
            <div
              className="quality"
              style={{ backgroundColor: QualityColors[quality] }}
            />
            <div
              className="item"
              style={{
                backgroundImage: `url(${getImageUrlBySourceType(image.name, image.sourceType)})`,
              }}
            />
          </div>
          <div className="name">{name}</div>
        </div>
        {/*<div className="chance">Шанс: {chance}%</div>*/}
      </div>
    ))

  const openCase = (amount: number) => {
    if (currentCase == null) {
      return
    }
    const payload: CasesRequestOpenPayload = { caseId: currentCase.id, amount }
    callClient(CasesEvents.RequestOpen, payload)
    setOpenAmount(amount)
    setStep(Step.Open)
  }

  const getDrop = () =>
    drop.map(({ quality, image, name, description }, idx) =>
      openAmount === Amount.One && idx > 0 ? null : (
        <div key={idx} className={`prize -idx-${idx}`}>
          <div
            className="quality"
            style={{ backgroundColor: QualityColors[quality] }}
          />
          <div className="content">
            <div className="image">
              <div className="background" />
              <div
                className="quality"
                style={{ backgroundColor: QualityColors[quality] }}
              />
              <div
                className="item"
                style={{
                  backgroundImage: `url(${getImageUrlBySourceType(image.name, image.sourceType)})`,
                }}
              />
            </div>
            <div className="name">{name}</div>
            <div className="description">{description}</div>
          </div>
        </div>
      ),
    )

  return (
    <CSSTransition
      in={isOpen}
      timeout={0}
      mountOnEnter
      unmountOnExit
      classNames="Cases"
      nodeRef={nodeRef}
    >
      <div className="Cases" ref={nodeRef}>
        <div className="background">
          <video
            ref={videoDropRef}
            className={`video ${step === Step.Drop ? '-show' : '-hidden'}`}
            src={Video[Step.Drop]}
            onCanPlay={() =>
              setVideosLoaded((prev) => ({ ...prev, [Step.Idle]: true }))
            }
            onEndedCapture={() => {
              if (isInstant) {
                dispatch(casesActions.setIsInstant(false))
                setOpenAmount(drop.length === 1 ? Amount.One : Amount.Three)
                setStep(Step.Open)
              } else {
                setStep(Step.Idle)
              }
            }}
          />
          <video
            ref={videoIdleRef}
            className={`video ${step === Step.Idle ? '-show' : '-hidden'}`}
            loop
            src={Video[Step.Idle]}
            onCanPlay={() =>
              setVideosLoaded((prev) => ({ ...prev, [Step.Drop]: true }))
            }
          />
          <video
            ref={videoOpenOneRef}
            className={`video ${step === Step.Open && openAmount === Amount.One ? '-show' : '-hidden'}`}
            src={Video[Step.Open][Amount.One]}
            onCanPlay={() =>
              setVideosLoaded((prev) => ({
                ...prev,
                [Step.Open]: { ...prev[Step.Open], [Amount.One]: true },
              }))
            }
            onPlayCapture={() => setTimeout(() => setStep(Step.After), 4800)}
            // onEndedCapture={() => setStep(Step.After)}
          />
          <video
            ref={videoOpenThreeRef}
            className={`video ${step === Step.Open && openAmount === Amount.Three ? '-show' : '-hidden'}`}
            src={Video[Step.Open][Amount.Three]}
            onCanPlay={() =>
              setVideosLoaded((prev) => ({
                ...prev,
                [Step.Open]: { ...prev[Step.Open], [Amount.Three]: true },
              }))
            }
            onPlayCapture={() => setTimeout(() => setStep(Step.After), 4800)}
            // onEndedCapture={() => setStep(Step.After)}
          />
          <video
            ref={videoAfterOneRef}
            className={`video ${step === Step.After && openAmount === Amount.One ? '-show' : '-hidden'}`}
            src={Video[Step.After][Amount.One]}
            onCanPlay={() =>
              setVideosLoaded((prev) => ({
                ...prev,
                [Step.After]: { ...prev[Step.After], [Amount.One]: true },
              }))
            }
          />
          <video
            ref={videoAfterThreeRef}
            className={`video ${step === Step.After && openAmount === Amount.Three ? '-show' : '-hidden'}`}
            src={Video[Step.After][Amount.Three]}
            onCanPlay={() =>
              setVideosLoaded((prev) => ({
                ...prev,
                [Step.After]: { ...prev[Step.After], [Amount.Three]: true },
              }))
            }
          />
        </div>
        <div
          className={`content -fullTime ${step !== Step.Drop && step !== Step.Wait && '-show'}`}
        >
          <div className="current">
            <div className="type">
              {currentCase ? `${QualityName[currentCase.quality]} | Кейс` : ''}
            </div>
            <div className="name">{currentCase ? currentCase.name : ''}</div>
          </div>
          <div className="balance">
            <div className="title">Баланс:</div>
            <div className="row">
              <div className="value">{numberWithSeparator(balance, ' ')}</div>
              <div
                className="plus"
                onClick={() => {
                  dispatch(casesActions.hide())
                  dispatch(escMenuActions.show({ navId: NavId.DonateStore }))
                  dispatch(donateStoreActions.setTab(Tab.Replenish))
                }}
              />
            </div>
          </div>
          <div
            className={`button -store ${step !== Step.Idle && '-hidden'}`}
            onClick={() => {
              dispatch(casesActions.hide())
              dispatch(escMenuActions.show({ navId: NavId.DonateStore }))
              dispatch(donateStoreActions.setTab(Tab.Store))
            }}
          >
            В магазин
          </div>
          <div className="helper">
            При закрытии, все выпавшие предметы будут автоматически отправлены
            на склад!
          </div>
          <div
            className={`button -warehouse ${step !== Step.Idle && '-hidden'}`}
            onClick={() => {
              dispatch(casesActions.hide())
              setTimeout(
                () =>
                  dispatch(escMenuActions.show({ navId: NavId.DonateStore })),
                100,
              )
              setTimeout(
                () => dispatch(donateStoreActions.setTab(Tab.Warehouse)),
                200,
              )
            }}
          >
            На склад
          </div>
        </div>
        <div className={`content -idle ${step === Step.Idle && '-show'}`}>
          <div className="cases">
            <div className="title">Доступные кейсы</div>
            {getCases()}
          </div>
          <div className="_buttons">
            <div
              className="button -white"
              onClick={() => {
                if (currentCase?.amount && currentCase.amount >= 1) {
                  return openCase(Amount.One)
                }
                if (currentCase != null) {
                  dispatch(buyCasesActions.show({ case: currentCase, balance }))
                }
              }}
            >
              Открыть (х1)
            </div>
            <div
              className="button -white"
              onClick={() => {
                if (currentCase?.amount && currentCase.amount >= 3) {
                  return openCase(Amount.Three)
                }
                if (currentCase != null) {
                  dispatch(buyCasesActions.show({ case: currentCase, balance }))
                }
              }}
            >
              Открыть (х3)
            </div>
          </div>
        </div>
        <div className={`content -prizes ${availablePrizes.isShow && '-show'}`}>
          <div className="body">
            <div className="header">
              <div className="title">Возможные призы</div>
              <div
                className="close"
                onClick={() =>
                  setAvailablePrizes((prev) => ({ ...prev, isShow: false }))
                }
              />
            </div>
            <div className="list">{getAvailablePrizes()}</div>
          </div>
        </div>
        <div className={`content -drop ${step === Step.After && '-show'}`}>
          <div className="drop">{getDrop()}</div>
          <div className="_buttons">
            <div
              className="button -white"
              onClick={() => {
                callClient(CasesEvents.TakeDrop)
                setStep(Step.Drop)
              }}
            >
              Забрать
            </div>
            <div
              className="button -red"
              onClick={() => {
                callClient(CasesEvents.SellDrop)
                setStep(Step.Drop)
              }}
            >
              <div className="title">Продать</div>
              <div className="value">
                {numberWithSeparator(
                  drop.reduce((acc, item) => acc + item.price, 0),
                  ' ',
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}

export default Cases
