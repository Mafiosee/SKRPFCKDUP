import React, { useMemo } from 'react'
import './styles.sass'
import { useAppSelector } from '../../../../hooks/redux'
import { getTimeString } from '../../../../utils/time'

export const Jail: React.FC = () => {
  const {
    jail: { visible, title, secondsLeft, catcher, reason },
  } = useAppSelector((state) => state.hud)

  const formattedTimeLeft = useMemo(
    () =>
      getTimeString(secondsLeft * 1000, {
        hours: true,
        minutes: true,
        seconds: true,
        separator: ':',
      }),
    [secondsLeft],
  )

  return !visible ? null : (
    <div className="_Jail">
      <div className="background" />
      <div className="content">
        <div className="title">{title}</div>
        <div className="time-left">{formattedTimeLeft}</div>
        <div className="separator"></div>
        <div className="block">
          <div className="title">Вас посадил(а):</div>
          <div className="value">{catcher}</div>
        </div>
        <div className="block">
          <div className="title">Причина:</div>
          <div className="value">{reason}</div>
        </div>
      </div>
    </div>
  )
}
