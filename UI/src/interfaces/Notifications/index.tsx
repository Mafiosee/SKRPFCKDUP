import './styles.sass'
import React, { ReactElement, useEffect, useMemo } from 'react'
import { useAppSelector } from '../../hooks/redux'
import { NotificationPositions } from './types'
import { useDispatch } from 'react-redux'
import { notificationsActions } from './reducer'
import { numberWithSeparator } from '../../utils/numberWithSeparator'
import { TextTemplateParams } from '../../shared/Modal/Component/TextTemplate'

const Notifications: React.FC = () => {
  const dispatch = useDispatch()
  const { list, rendered } = useAppSelector((state) => state.notifications)

  useEffect(() => {
    // @ts-expect-error qwe
    window.sendNotify = (data) => dispatch(notificationsActions.send(data))
    // @ts-expect-error qwe
    window.removeNotify = (id) => {
      dispatch(notificationsActions.removeFromRendered({ value: id }))
      setTimeout(() => {
        dispatch(notificationsActions.removeFromList({ value: id }))
      }, 500)
    }
  }, [dispatch])

  const getFormattedTemplate = (
    template: string,
    params: TextTemplateParams,
  ) => {
    const result: ReactElement[] = []

    const paramsInfo: Record<
      string,
      { openTagIndex: number; closeTagIndex: number }
    > = {}
    const paramsOrder: string[] = []
    Object.keys(params).forEach((paramName) => {
      paramsInfo[paramName] = {
        openTagIndex: template.indexOf(`<${paramName}>`),
        closeTagIndex: template.indexOf(`</${paramName}>`),
      }
      if (!paramsOrder.length) {
        paramsOrder.push(paramName)
      } else if (
        paramsInfo[paramsOrder[paramsOrder.length - 1]].openTagIndex <
        paramsInfo[paramName].openTagIndex
      ) {
        paramsOrder.push(paramName)
      } else {
        paramsOrder.unshift(paramName)
      }
    })

    let symbolIndex = 0
    let currentParam: string | null = null

    while (
      symbolIndex <
      template.length - paramsOrder.join('').length - paramsOrder.length * 5
    ) {
      if (currentParam === null) {
        if (paramsOrder.length) {
          currentParam = paramsOrder.shift() ?? null
        }
        result.push(
          <span key={symbolIndex}>
            {template.slice(
              symbolIndex,
              currentParam == null
                ? template.length
                : paramsInfo[currentParam].openTagIndex,
            )}
          </span>,
        )
        if (currentParam) {
          symbolIndex =
            paramsInfo[currentParam].openTagIndex + currentParam.length + 2
        } else {
          break
        }
      } else {
        let text = template.slice(
          paramsInfo[currentParam].openTagIndex + currentParam.length + 2,
          paramsInfo[currentParam].closeTagIndex,
        )
        if (params[currentParam]?.numberSeparator != null) {
          const intText = parseInt(text)
          if (!isNaN(intText)) {
            text = numberWithSeparator(
              intText,
              params[currentParam].numberSeparator ?? '',
            )
          }
        }
        result.push(
          <span
            key={currentParam}
            className={`${params[currentParam]?.isMoney && '-money'}`}
            style={{ color: params[currentParam]?.color }}
          >
            {text}
          </span>,
        )
        symbolIndex =
          paramsInfo[currentParam].closeTagIndex + currentParam.length + 3
        currentParam = null
      }
    }

    return result
  }

  const renderList = (position: NotificationPositions) => {
    const currentList = list.filter((notify) => notify.position === position)
    return (
      <div className={`NotificationsList position-${position}`}>
        {currentList.map(({ id, type, text, template, params, duration }) => {
          const animationName = ~rendered.indexOf(id) ? 'enter' : 'exit'
          return (
            <div
              className={`Notify type-${type}`}
              key={id}
              style={{
                animation: `.4s ease 0s 1 normal none running ${animationName}`,
              }}
            >
              <div className="background">
                <div className="color" />
                <div className="image" />
              </div>
              <div className="content">
                <div className="icon">
                  <div className="shadow" />
                  <div className="vector" />
                  <div className="line" />
                  <div
                    className="loading"
                    style={{
                      animation: `loading ${duration}s linear forwards`,
                    }}
                  />
                  <div className="icon" />
                </div>
                {text ? <div className="text">{text}</div> : null}
                {template ? (
                  <div className="text">
                    {getFormattedTemplate(template, params)}
                  </div>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <>
      {renderList(NotificationPositions.Auth)}
      {renderList(NotificationPositions.Bottom)}
    </>
  )
}

export default Notifications
