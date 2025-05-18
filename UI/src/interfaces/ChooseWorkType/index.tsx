import React, { useEffect, useMemo, useRef, useState } from 'react'
import './styles.sass'
import { useAppSelector } from '../../hooks/redux'
import { useEscClose } from '../../hooks/useEscClose'
import { callClient } from '../../utils/api'
import { BackgroundImages, CharacterImages } from './assets/BackgroundImages'
import {
  ChooseWorkTypeEvents,
  ChooseWorkTypePayload,
} from '../../shared/ChooseWorkType/events'
import { WorkStatus } from '../../shared/Work/Work'
import { WorkIcons } from './assets/WorkIcons'
import { WorkBackgrounds } from './assets/WorkBackgrounds'

const ChooseWorkType = () => {
  const { isOpen, title, image, levelHelper, works } = useAppSelector(
    (state) => state.chooseWorkType,
  )
  useEscClose({
    isOpenInterface: isOpen,
    closeEvent: ChooseWorkTypeEvents.Close,
  })
  const [currentWorkId, setCurrentWorkId] = useState(null)
  const currentWorkRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!works.length) {
      return setCurrentWorkId(null)
    }
    const activeWork = works.find((work) => work.status === WorkStatus.Working)
    if (activeWork != null) {
      return setCurrentWorkId(activeWork.id)
    }
    const firstAvailableWork = works.find(
      (work) => work.status === WorkStatus.Available,
    )
    if (firstAvailableWork != null) {
      return setCurrentWorkId(firstAvailableWork.id)
    }
    setCurrentWorkId(null)
  }, [works])

  const currentWork = useMemo(
    () => works.find((work) => work.id === currentWorkId),
    [works, currentWorkId],
  )

  const currentWorkButton = useMemo(() => {
    if (currentWork == null) {
      return null
    }
    switch (currentWork.status) {
      case WorkStatus.Available: {
        return (
          <div
            className="button -available"
            onClick={() => {
              const payload: ChooseWorkTypePayload[ChooseWorkTypeEvents.Start] =
                { workId: currentWork.id }
              callClient(ChooseWorkTypeEvents.Start, payload)
            }}
          >
            Начать работу
          </div>
        )
      }
      case WorkStatus.Working: {
        return (
          <div
            className="button -working"
            onClick={() => {
              const payload: ChooseWorkTypePayload[ChooseWorkTypeEvents.Dismiss] =
                { workId: currentWork.id }
              callClient(ChooseWorkTypeEvents.Dismiss, payload)
            }}
          >
            Закончить работу
          </div>
        )
      }
      case WorkStatus.Unavailable: {
        return <div className="button -unavailable">Начать работу</div>
      }
      default: {
        return null
      }
    }
  }, [currentWork])

  const currentWorkHelper = useMemo(() => {
    if (currentWork == null || !works.length) {
      return null
    }
    const isCurrentWorkLast = currentWork.id === works.at(-1)?.id
    const isCurrentWorkCompleted =
      currentWork.progress.current >= currentWork.progress.max

    if (isCurrentWorkCompleted) {
      return (
        <div className="helper">
          <div className="title -completed">
            {isCurrentWorkLast
              ? 'Поздравляем, теперь вам доступны все виды работ!'
              : 'Поздравляем, теперь вам доступен следущий вид работы!'}
          </div>
        </div>
      )
    }
    return (
      <div className="helper">
        <div className="title">Для достижения следующего уровня:</div>
        <div className="value">
          <div
            className="icon"
            style={{
              backgroundImage: `url(${WorkIcons[`${currentWork.icon}.svg`]})`,
            }}
          />
          <div className="amount">
            {currentWork.progress.current}/{currentWork.progress.max}
          </div>
        </div>
      </div>
    )
  }, [currentWork, works])

  const renderedWorks = useMemo(
    () =>
      works.map((work) => {
        const isActive = work.id === currentWorkId
        const setActive = () => setCurrentWorkId(work.id)

        return (
          <div
            key={work.id}
            className={`work ${isActive && '-active'} ${work.status === WorkStatus.Unavailable && '-unavailable'}`}
            onClick={setActive}
            style={{
              backgroundImage: `url(${WorkBackgrounds[`${work.image}.png`]})`,
            }}
            ref={isActive ? currentWorkRef : undefined}
          >
            <div className="level">
              {levelHelper}: {work.level}
            </div>
            <div className="name">{work.name}</div>
          </div>
        )
      }),
    [works, currentWorkId],
  )

  const handleClickSelectArrow = (diff: number) => {
    const currentWorkIndex = works.findIndex(
      (work) => work.id === currentWork?.id,
    )
    const newCurrentWorkIndex = currentWorkIndex + diff
    if (newCurrentWorkIndex < 0 || newCurrentWorkIndex > works.length - 1) {
      return
    }
    const newCurrentWork = works[newCurrentWorkIndex]
    setCurrentWorkId(newCurrentWork.id)
  }

  useEffect(() => {
    if (currentWorkRef.current == null) {
      return
    }
    currentWorkRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    })
  }, [currentWorkRef.current])

  return !isOpen || !currentWork ? null : (
    <div className="ChooseWorkType">
      <div className="shadow" />
      <div className="window">
        <div className="title">{title}</div>
        <div
          className="close"
          onClick={() => callClient(ChooseWorkTypeEvents.Close)}
        />
        <div className="body">
          <div
            className="background"
            style={{
              backgroundImage: `url(${BackgroundImages[`${image}.png`]})`,
            }}
          >
            <div className="color" />
            <div
              className="character"
              style={{
                backgroundImage: `url(${CharacterImages[`${image}.png`]})`,
              }}
            />
          </div>
          <div className="content">
            <div className="info">
              <div className="level">
                {levelHelper}: {currentWork.level}
              </div>
              <div className="title">{currentWork.name}</div>
              <div className="description">{currentWork.description}</div>
              <div className="controls">
                {currentWorkButton}
                <div className="salary">
                  <div className="value">
                    <div className="amount">1</div>
                    <div
                      className="icon"
                      style={{
                        backgroundImage: `url(${WorkIcons[`${currentWork.icon}.svg`]})`,
                      }}
                    />
                  </div>
                  <div className="equal">=</div>
                  <div className="value">
                    <div className="icon -coin" />
                    <div className="amount">{currentWork.salary}</div>
                  </div>
                </div>
              </div>
              {currentWorkHelper}
            </div>
            <div className="select">
              <div className="header">
                <div className="title">Список занятий</div>
                <div className="arrows">
                  <div
                    className="arrow"
                    onClick={() => handleClickSelectArrow(-1)}
                  />
                  <div
                    className="arrow"
                    onClick={() => handleClickSelectArrow(1)}
                  />
                </div>
              </div>
              <div className="works">
                <div className="list">
                  <div className="wrapper">{renderedWorks}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChooseWorkType
