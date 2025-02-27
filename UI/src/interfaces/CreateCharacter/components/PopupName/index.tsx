import './styles.sass'
import React, { useMemo, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { createCharacterActions } from '../../reducer'
import { CSSTransition } from 'react-transition-group'
import { ValuesKeys } from '../../types'
import { callClient } from '../../../../utils/api'
import { RegionNames } from '../../../../shared/Regions/RegionName'
import { Region } from '../../../../shared/Regions/type'
import { getRandomInt } from '../../../../utils/getRandomInt'
import { Gender } from '../../../../shared/characterEditor/enums/Genders'
import { FirstNames } from '../../data/FirstNames'
import { Race } from '../../../../shared/Race/type'
import { LastNames } from '../../data/LastNames'
import { RegExpNames } from '../../../../shared/characterEditor/RegExpNames'
import { AgeLimits } from '../../../../shared/characterEditor/AgeLimits'
import {
  CreateCharacterEvents,
  CreateCharacterSetNamePayload,
} from '../../../../shared/characterEditor/events'

const RegionList: Region[] = [
  Region.Skyrim,
  Region.Morrowind,
  Region.Syrodil,
  Region.Summerset,
  Region.Hammerfell,
  Region.HighRock,
  Region.Elsweyr,
  Region.BlackMarsh,
  Region.Valenwood,
]

const PopupName: React.FC = () => {
  const nodeRef = useRef(null)
  const dispatch = useAppDispatch()
  const { isOpen, isShowPopupName, values } = useAppSelector(
    (state) => state.createCharacter,
  )
  const [isOpenRules, setIsOpenRules] = useState(false)
  const [regionId, setRegionId] = useState<Region | null>(null)
  const [isOpenRegions, setIsOpenRegions] = useState(false)
  const [name, setName] = useState('')
  const [age, setAge] = useState<'' | number>('')
  const [isNameInvalid, setIsNameInvalid] = useState(false)
  const [isAgeInvalid, setIsAgeInvalid] = useState(false)
  const [isRegionInvalid, setIsRegionInvalid] = useState(false)

  const checkValid = () => {
    const [firstName, lastName] = name.split(' ')
    const isValidFirstName = RegExpNames.FirstName.test(firstName)
    if (!isValidFirstName) {
      setIsNameInvalid(true)
    }
    const race = values[ValuesKeys.Race] as Race
    const isValidLastName = RegExpNames.LastName[race].regExp.test(lastName)
    if (!isValidLastName) {
      setIsNameInvalid(true)
    }
    const ageLimits = AgeLimits[race]
    const isValidAge = age !== '' && age > ageLimits.min && age < ageLimits.max
    if (!isValidAge) {
      setIsAgeInvalid(true)
    }
    const isValidRegion = regionId != null
    if (!isValidRegion) {
      setIsRegionInvalid(true)
    }
    return isValidFirstName && isValidLastName && isValidAge && isValidRegion
  }

  const getRegions = () =>
    RegionList.map((id) => (
      <div
        key={id}
        className="region"
        onClick={() => {
          setIsRegionInvalid(false)
          setRegionId(id)
          setIsOpenRegions(false)
        }}
      >
        {RegionNames[id]}
      </div>
    ))

  const randomizeName = () => {
    const gender = values[ValuesKeys.Gender] as Gender
    const FirstNamesList = [...FirstNames[gender], ...FirstNames[-1]]
    const firstName = FirstNamesList[getRandomInt(0, FirstNamesList.length)]

    const race = values[ValuesKeys.Race] as Race
    const LastNamesList = LastNames[race]
    const lastName = LastNamesList[getRandomInt(0, LastNamesList.length)]

    setName(`${firstName} ${lastName}`)
  }

  const nameErrorText = useMemo(() => {
    const race = values[ValuesKeys.Race] as Race
    return RegExpNames.LastName[race].error
  }, [values])

  const ageErrorText = useMemo(() => {
    const race = values[ValuesKeys.Race] as Race
    const ageLimits = AgeLimits[race]
    return `Для выбранной рассы возраст должен быть в пределах от ${ageLimits.min} до ${ageLimits.max} лет`
  }, [values])

  return (
    <CSSTransition
      in={isOpen && isShowPopupName}
      timeout={0}
      mountOnEnter
      unmountOnExit
      classNames="_PopupName"
      nodeRef={nodeRef}
    >
      <div
        className="_PopupName"
        ref={nodeRef}
        onClick={() =>
          dispatch(createCharacterActions.setIsOpenPopupName(false))
        }
      >
        <div
          className={`window ${!isOpenRules && '-show'}`}
          onClick={(event) => {
            event.stopPropagation()
            setIsOpenRegions(false)
          }}
        >
          <div className="title">Последний шаг</div>
          <div className="text">
            Перед тем, как начать игру, необходимо придумать Имя и<br />
            Фамилию своему персонажу. Помимо этого на серверах имеются
            <br />
            ограничения по именам и фамилиям. Более подробно вы можете
            <br />
            ознакомиться ниже
          </div>
          <div className="helper">
            Если у вас возникнут трудности, воспользуйтесь генератором имен.
            <br />
            Для более точной настройки, задайте фильтр по стране
          </div>
          <div className="region">
            <div
              className={`current ${regionId != null && '-selected'} ${isOpenRegions && '-opened'} ${isRegionInvalid && '-invalid'}`}
              onClick={(event) => {
                event.stopPropagation()
                setIsRegionInvalid(false)
                setIsOpenRegions((prev) => !prev)
              }}
            >
              {regionId === null ? 'Выберите провинцию' : RegionNames[regionId]}
            </div>
            <div className={`list ${isOpenRegions && '-opened'}`}>
              {getRegions()}
            </div>
          </div>
          <div className="button" onClick={() => setIsOpenRules(true)}>
            Ограничения по именам
          </div>
          <div className="row">
            <div className={`input ${isNameInvalid && '-invalid'}`}>
              <input
                type="text"
                placeholder="Введите имя"
                value={name}
                onChange={(event) => {
                  setIsNameInvalid(false)
                  setName(event.target.value)
                }}
              />
              <div className={`error ${isNameInvalid && '-active'}`}>
                <div className="icon" />
                <div className="text">{nameErrorText}</div>
              </div>
            </div>
            <div className="button -random" onClick={randomizeName} />
          </div>
          <div className="row">
            <div className={`input ${isAgeInvalid && '-invalid'}`}>
              <input
                type="text"
                placeholder="Введите возраст"
                value={age}
                onChange={(event) => {
                  setIsAgeInvalid(false)
                  const value = event.target.value
                  if (!value.length) {
                    return setAge('')
                  }
                  const intValue = parseInt(value)
                  if (isNaN(intValue) || intValue < 0) {
                    return
                  }
                  setAge(intValue)
                }}
              />
              <div className={`error ${isAgeInvalid && '-active'}`}>
                <div className="icon" />
                <div className="text">{ageErrorText}</div>
              </div>
            </div>
          </div>
          <div className="buttons">
            <div
              className="button -light"
              onClick={() => {
                const isValid = checkValid()
                if (!isValid || regionId == null || !age) {
                  return
                }
                const payload: CreateCharacterSetNamePayload = {
                  region: regionId,
                  name,
                  age: +age,
                }
                callClient(CreateCharacterEvents.SetName, payload)
                dispatch(createCharacterActions.setIsOpenPopupName(false))
              }}
            >
              Начать игру
            </div>
            <div
              className="button"
              onClick={() =>
                dispatch(createCharacterActions.setIsOpenPopupName(false))
              }
            >
              Назад
            </div>
          </div>
        </div>

        <div
          className={`rules ${isOpenRules && '-show'}`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="close" onClick={() => setIsOpenRules(false)} />
          <div className="title">Ограничения по именам</div>
          <div className="body">
            <div className="text">
              Персонажу запрещено иметь nonRP &quot;Имя&quot;, к nonRP никнеймам
              относятся:
            </div>
            <div className="list">
              <div className="item">
                Персонажу запрещено иметь nonRP &quot;Имя&quot;, к nonRP
                никнеймам относятся:
              </div>
              <div className="item">
                Имена, которых не существует в реальности.
              </div>
              <div className="item">
                Исключение: разрешены адекватные nonRP никнеймы если они имеют
                место быть в реалиях Skyrim, а так же у игрока имеется
                одобренная на форуме RP биография.
              </div>
              <div className="item">
                Примечание: главный следящий за биографиями / ГА имеют право
                отклонить nonRP никнейм без каких-либо обоснований или
                пояснений.
              </div>
              <div className="item">
                Пояснение: если игрок планирует использовать nonRP никнейм, то
                биография должна быть написана максимально качественно, с полным
                раскрытием характера и именем / фамилией данного персонажа.
              </div>
              <div className="item">Имена похожие на ники администраторов.</div>
              <div className="item">
                Имена и фамилии знаменитостей, актеров, персонажей из фильмов,
                сериалов и т.д., а так же схожие имена и фамилии.
              </div>
              <div className="item">
                Примечание: специально допущенная ошибка в имени известной
                личности так же приравнивается к nonRP никнейму.
              </div>
              <div className="item">
                Никнеймы несущие в себе скрытый смысл / звучание, а так же
                никнеймы не несущие смысловой нагрузки.
              </div>
              <div className="item">
                Запрещено играть за персонажа противоположного Вам пола. |
                Demorgan до смены внешности персонажа.
              </div>
            </div>
            <div className="helper">
              ЗА ПОДОБНЫЙ РЯД НИКНЕЙМОВ ВЫДАЕТСЯ DEMORGAN до смены никнейма.
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}

export default PopupName
