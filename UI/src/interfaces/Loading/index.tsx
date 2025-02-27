import './styles.sass'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks/redux'
import { Backgrounds } from './assets/backgrounds'
import { getRandomInt } from '../../utils/getRandomInt'
import { Hints } from '../../shared/Loading/Hints'

const Loading: React.FC = () => {
  const { isOpen } = useAppSelector((state) => state.loading)
  const [backgroundIndex, setBackgroundIndex] = useState(0)
  const [hintIndex, setHintIndex] = useState(0)

  useEffect(() => {
    if (!isOpen) {
      return
    }
    setBackgroundIndex(getRandomInt(0, Backgrounds.length))
    setHintIndex(getRandomInt(0, Hints.length))
  }, [isOpen])

  return !isOpen ? null : (
    <div
      id="Loading"
      style={{ backgroundImage: `url(${Backgrounds[backgroundIndex]})` }}
    >
      <div className="shadow" />
      <div className="frame" />
      <div className="vectors" />
      <div className="frame" />
      <div className="loader">
        <div className="cover" />
      </div>
      <div className="hint">
        <div className="title">{Hints[hintIndex].title}</div>
        <div className="line" />
        <div className="description">{Hints[hintIndex].description}</div>
      </div>
    </div>
  )
}

export default Loading
