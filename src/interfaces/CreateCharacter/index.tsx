import React, { useCallback, useEffect, useRef, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { createCharacterActions } from './reducer'
import Navbar from './components/Navbar'
import Body from './components/Body'
import { ValuesKeys } from './types'
import {
  BodyComponents,
  BrowsComponents,
  ClothesComponents,
  EyesComponents,
  FaceComponents,
  HairsComponents,
  HeadComponents,
  MouthComponents,
  RaceComponents,
} from './lists'
import PopupName from './components/PopupName'
import { callClient } from '../../utils/api'
import BackButton from './components/BackButton'
import { CharacterEditorController } from '../../shared/characterEditor/characterEditor.controller'
import { Parts } from '../../shared/characterEditor/enums/Parts'
import { MouseButton } from '../../types/mouseButton'
import { TimeoutRef } from '../../types/timeoutRef'
import { Tab } from '../../shared/characterEditor/tabs'
import { CreateCharacterEvents } from '../../shared/characterEditor/events'

const CreateCharacter: React.FC = () => {
  const dispatch = useAppDispatch()
  const { isOpen, tab, values, tick } = useAppSelector(
    (state) => state.createCharacter,
  )

  const [isDebounced, setIdDebounced] = useState(false)
  const debounceRef = useRef<TimeoutRef>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isRightMouseButton, setIsRightMouseButton] = useState(false)

  // useEffect(() => {
  // 	setTimeout(() => {
  // 		dispatch(createCharacterActions.show())
  // 	}, 150)
  // }, [])

  useEffect(() => {
    const race = values[ValuesKeys.Race]
    const gender = values[ValuesKeys.Gender]
    const parts = [
      Parts.Body,
      Parts.Head,
      Parts.Face,
      Parts.Hair,
      Parts.Eyes,
      Parts.Eyebrows,
      Parts.Mouth,
    ]
    const dataPreset = CharacterEditorController.getPresets(race, gender)

    dispatch(
      createCharacterActions.setKeys({
        id: ValuesKeys.BodyType,
        keys: dataPreset,
      }),
    )

    parts.forEach((part) => {
      const dataParams = CharacterEditorController.getData(race, gender, part)
      // @ts-expect-error qwe
      Object.keys(dataParams).map((key) => {
        dispatch(
          //@ts-expect-error qwe
          createCharacterActions.setKeys({ id: key, keys: dataParams[key] }),
        )
      })
    })
  }, [values[ValuesKeys.Race], values[ValuesKeys.Gender], tick])

  const mouseMoveHandler = useCallback(
    (event: MouseEvent) => {
      if (isDebounced || !isRightMouseButton) {
        return
      }
      setIdDebounced(true)
      if (debounceRef.current != null) {
        clearTimeout(debounceRef.current)
      }
      debounceRef.current = setTimeout(() => setIdDebounced(false), 25)
      setMousePosition({ x: event.clientX, y: event.clientY })
      callClient(CreateCharacterEvents.SendMouseCoords, mousePosition)
    },
    [isDebounced, isRightMouseButton, mousePosition],
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousemove', mouseMoveHandler)
    }
    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler)
    }
  }, [isOpen, mouseMoveHandler])

  const handleMouseDown = (event: React.MouseEvent) => {
    if (event.button === MouseButton.Right) {
      setIsRightMouseButton(true)
    }
  }

  const handleMouseUp = (event: React.MouseEvent) => {
    if (event.button === MouseButton.Right) {
      setIsRightMouseButton(false)
    }
  }

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault()
  }

  return !isOpen ? null : (
    <div
      className="CreateCharacter"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onContextMenu={handleContextMenu}
    >
      <div className="title">Создание персонажа</div>

      <BackButton />

      <Navbar isShow={true} />

      <Body isShow={tab === Tab.Race} name="Раса" components={RaceComponents} />

      <Body
        isShow={tab === Tab.Body}
        name="Телосложение"
        components={BodyComponents}
      />

      <Body
        isShow={tab === Tab.Head}
        name="Голова"
        components={HeadComponents}
      />

      <Body isShow={tab === Tab.Face} name="Лицо" components={FaceComponents} />

      <Body
        isShow={tab === Tab.Eyes}
        name="Глаза"
        components={EyesComponents}
      />

      <Body
        isShow={tab === Tab.Brows}
        name="Брови"
        components={BrowsComponents}
      />

      <Body
        isShow={tab === Tab.Mouth}
        name="Рот"
        components={MouthComponents}
      />

      <Body
        isShow={tab === Tab.Hairs}
        name="Волосы"
        components={HairsComponents}
      />

      <Body
        isShow={tab === Tab.Clothes}
        name="Одежда"
        components={ClothesComponents}
      />

      <div className="buttons">
        <div
          className="refresh"
          onClick={() => {
            dispatch(createCharacterActions.resetValues())
            callClient(CreateCharacterEvents.Reset)
          }}
        />
        <div
          className="next"
          onClick={() =>
            dispatch(createCharacterActions.setIsOpenPopupName(true))
          }
        >
          Далее
        </div>
      </div>

      <PopupName />
    </div>
  )
}

export default CreateCharacter
