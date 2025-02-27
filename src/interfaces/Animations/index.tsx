import React, { useCallback, useEffect, useRef, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CSSTransition } from 'react-transition-group'
import { InterfacesId } from '../../utils/interfacesId'
import { animationsActions } from './reducer'
import { notificationsActions } from '../Notifications/reducer'
import { callClient } from '../../utils/api'
import {
  AnimationsPlayPayload,
  AnimationsRemovePayload,
  AnimationsSetIsFavoritePayload,
  AnimationsSetPayload,
} from './api'
import { calcVh } from '../../utils/calcVh'
import { KeyCodes } from '../../utils/keyCodes'
import { importAllImagesFromFolder } from '../../utils/images'
import { TimeoutRef } from '../../types/timeoutRef'
import { AnimationsMenuEvents } from '../../shared/Animation/events'
import { useEscClose } from '../../hooks/useEscClose'

const Categories = importAllImagesFromFolder(
  require.context('./assets/images/categories/', false, /.svg$/),
)
const Sources = importAllImagesFromFolder(
  require.context('../../assets/Animations/', false, /.webm$/),
)

const PieceClipOffset: { [key: number]: number[][] } = {
  1: [
    [0, 0],
    [0, 100],
    [100, 100],
    [100, 0],
  ],
  2: [
    [0, 0],
    [0, 49.6],
    [100, 49.6],
    [100, 0],
  ],
  3: [
    [-36, 0],
    [50, 49.5],
    [50, 49.6],
    [136, 0],
  ],
  4: [
    [0.5, 0],
    [50, 49.3],
    [50, 49.3],
    [100 - 0.5, 0],
  ],
  5: [
    [14.6, 0],
    [50, 49.5],
    [50, 49.5],
    [100 - 14.6, 0],
  ],
  6: [
    [21.6, 0],
    [50, 49.3],
    [50, 49.3],
    [100 - 21.6, 0],
  ],
}

const PieceRotate: { [key: number]: number } = {
  1: 0,
  2: 180,
  3: 120,
  4: 90,
  5: 72,
  6: 60,
}

const PieceLineData: {
  [key: number]: { top: number; left: number; rotate: number }
} = {
  1: { top: 0, left: 0, rotate: 0 },
  2: { top: 198, left: 0, rotate: 90 },
  3: { top: 99, left: 28, rotate: 60 },
  4: { top: 58, left: 61, rotate: 45 },
  5: { top: 38, left: 85, rotate: 36 },
  6: { top: 26.5, left: 102, rotate: 30 },
}

type DragInfo = {
  animationIdx: number | null
  position: { x: number; y: number }
}

const Animations = () => {
  const dispatch = useAppDispatch()
  const { isOpen, animations, categories, radial } = useAppSelector(
    (state) => state.animations,
  )
  const nodeRef = useRef(null)
  const [category, setCategory] = useState(null)
  const [isOpenCategories, setIsOpenCategories] = useState(false)
  const [search, setSearch] = useState({ isOpen: false, value: '' })
  const searchRef = useRef(null)
  const [dragInfo, setDragInfo] = useState<DragInfo>({
    animationIdx: null,
    position: { x: 0, y: 0 },
  })
  const [isDebounced, setIsDebounced] = useState(false)
  const debounceRef = useRef<TimeoutRef>(null)
  const dragStartTimeout = useRef<TimeoutRef>(null)

  const [hoverAnimId, setHoverAnimId] = useState<null | number>(null)

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  useEscClose({
    isOpenInterface: isOpen,
    closeEvent: AnimationsMenuEvents.Exit,
  })

  const onClickHandler = useCallback(() => {
    if (isOpenCategories) {
      setIsOpenCategories(false)
    }
  }, [isOpenCategories])

  const mouseMoveHandler = useCallback(
    (event: MouseEvent) => {
      if (!isOpen || isDebounced) {
        return
      }
      setIsDebounced(true)
      if (debounceRef.current != null) {
        clearTimeout(debounceRef.current)
      }
      debounceRef.current = setTimeout(() => setIsDebounced(false), 15)
      setDragInfo((prev) => ({
        ...prev,
        position: { x: event.clientX, y: event.clientY },
      }))
    },
    [isOpen, isDebounced],
  )

  // useEffect(() => {
  // 	setTimeout(() => dispatch(animationsActions.show()), 150)
  // }, [dispatch])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', onClickHandler)
    }

    return () => {
      document.removeEventListener('click', onClickHandler)
    }
  }, [isOpen, isOpenCategories, onClickHandler])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousemove', mouseMoveHandler)
    }
    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler)
    }
  }, [mouseMoveHandler, isOpen])

  useEffect(() => {
    const mouseUpHandler = (event: MouseEvent) => {
      if (dragStartTimeout.current != null) {
        clearTimeout(dragStartTimeout.current)
      }
      setDragInfo((prev) => ({ ...prev, animationIdx: null }))
      // @ts-expect-error qwe
      if (
        !event.target?.dataset ||
        !event.target.dataset.hasOwnProperty('idx')
      ) {
        return
      }
      // @ts-expect-error qwe
      const idx = parseInt(event.target.dataset.idx)
      const payload: AnimationsPlayPayload = {
        animationId: animations[idx]?.id,
      }
      callClient(AnimationsMenuEvents.Play, payload)
    }
    if (isOpen) {
      document.addEventListener('mouseup', mouseUpHandler)
    }
    return () => {
      document.removeEventListener('mouseup', mouseUpHandler)
    }
  }, [animations, isOpen])

  useEffect(() => {
    if (debounceRef.current != null) {
      clearTimeout(debounceRef.current)
    }
    setIsDebounced(false)
    setDragInfo({
      animationIdx: null,
      position: { x: 0, y: 0 },
    })
    if (!isOpen) {
      dispatch(
        notificationsActions.removeFromInterface(InterfacesId.Animations),
      )
    }
  }, [dispatch, isOpen])

  const getList = () => {
    return animations.map(
      ({ id, title, categoryId, source, isFavorite }, idx) => {
        const itemCategory = categories.find((el) => el.id === categoryId)
        if (!itemCategory) {
          return null
        }

        if (category !== null && itemCategory.id !== category) {
          return null
        }
        if (
          search.value.length &&
          !~title.toLowerCase().indexOf(search.value.toLowerCase())
        ) {
          return null
        }

        const handleMouseOver = (
          e: React.MouseEvent<HTMLDivElement>,
          index: number,
        ) => {
          setHoverAnimId(index)

          const video = videoRefs.current[idx]
          if (!video) {
            return
          }
          if (video.paused && video.readyState === video.HAVE_ENOUGH_DATA) {
            video.play().catch((error) => {
              console.error('Ошибка при воспроизведении видео:', error)
            })
          }
        }

        const handleMouseOut = (
          e: React.MouseEvent<HTMLDivElement>,
          index: number,
        ) => {
          setHoverAnimId(null)
          const video = videoRefs.current[idx]
          if (!video) {
            return
          }
          video.pause()
          video.currentTime = 0
        }

        const handleMouseDown = (index: number) => {
          if (dragStartTimeout.current != null) {
            clearTimeout(dragStartTimeout.current)
          }
          dragStartTimeout.current = setTimeout(() => {
            setDragInfo((prev) => ({ ...prev, animationIdx: index }))
          }, 100)
        }

        return (
          <div
            key={id}
            className={`animation ${dragInfo.animationIdx === idx && '-focused'}`}
            data-idx={idx}
            onMouseOver={(event) => handleMouseOver(event, idx)}
            onMouseOut={(event) => handleMouseOut(event, idx)}
            onMouseDown={() => handleMouseDown(idx)}
          >
            <div className="blur" />
            <div className="bg">
              <video ref={(el) => (videoRefs.current[idx] = el)}>
                <source src={Sources[`${source}.webm`]} type="video/webm" />
              </video>
            </div>

            <div className="content">
              <div className="row">
                <div
                  className="category"
                  style={{
                    backgroundImage: `url(${Categories[`${itemCategory.icon}.svg`]})`,
                  }}
                />
                <div
                  className={`favorite ${isFavorite && '-active'}`}
                  onClick={() => {
                    const payload: AnimationsSetIsFavoritePayload = {
                      animationId: id,
                      isFavorite: !isFavorite,
                    }
                    callClient(AnimationsMenuEvents.SetIsFavorite, payload)
                  }}
                />
              </div>
              <div className="name">{animations[idx].title}</div>
            </div>
          </div>
        )
      },
    )
  }

  const getCurrentCategoryTitle = () => {
    if (category === null) {
      return 'Все'
    }
    const current = categories.find((el) => el.id === category)
    if (!current) {
      return null
    }
    return current.title
  }

  const getCategoriesList = () =>
    [{ id: null, title: 'Все', icon: '' }, ...categories].map(
      ({ id, title, icon }) => {
        const isActive = id === category
        return (
          <div
            key={id}
            className={`item ${isActive && '-active'}`}
            onClick={() => {
              if (isActive) {
                return
              }
              setCategory(id)
            }}
          >
            {title}
          </div>
        )
      },
    )

  const renderPieces = () =>
    radial.map(({ id, isEmpty, categoryId, title }, idx) => {
      const offsets = PieceClipOffset[radial.length]
      const rotate = PieceRotate[radial.length]
      const lineData = PieceLineData[radial.length]

      const category = categories.find((el) => el.id === categoryId)

      return (
        <div
          className={`piece ${isEmpty && '-empty'}`}
          key={id}
          style={{
            clipPath: `polygon(${offsets[0][0]}% ${offsets[0][1]}%, ${offsets[1][0]}% ${offsets[1][1]}%, ${offsets[2][0]}% ${offsets[2][1]}%, ${offsets[3][0]}% ${offsets[3][1]}%)`,
            transform: `rotate(${idx * rotate}deg)`,
          }}
          onMouseUp={() => {
            if (dragInfo.animationIdx === null) {
              return
            }
            const payload: AnimationsSetPayload = {
              pieceId: id,
              animationId: animations[dragInfo.animationIdx].id,
            }
            callClient(AnimationsMenuEvents.Set, payload)
          }}
          onContextMenu={() => {
            const payload: AnimationsRemovePayload = {
              pieceId: id,
            }
            callClient(AnimationsMenuEvents.Remove, payload)
          }}
        >
          <div
            className={`content -length-${radial.length} -idx-${idx}`}
            style={{ transform: `rotate(-${idx * rotate}deg)` }}
          >
            <div
              className="icon"
              // style={
              //     isEmpty
              //         ? {}
              //         : {
              //             backgroundImage: `url(${Categories[`${category?.icon}.svg`]})`,
              //         }
              // }
            />
            <div className="title">{isEmpty ? 'Пусто' : title}</div>
          </div>
        </div>
      )
    })

  return (
    <CSSTransition
      in={isOpen}
      timeout={0}
      mountOnEnter
      unmountOnExit
      classNames="Animations"
      nodeRef={nodeRef}
    >
      <div className="Animations" ref={nodeRef}>
        <div className="window">
          <div className="title">Анимации</div>
          <div
            className="close"
            onClick={() => callClient(AnimationsMenuEvents.Exit)}
          />
          <div className="radial">
            <div className="title">
              <div className="name">Радиальное меню</div>
              <div className="blur" />
              <div className="vector" />
            </div>
            <div className="circle">
              {renderPieces()}
              <div className="center">
                <div className="helper">
                  <div className="icon" />
                  <div className="text">
                    Перетащите анимацию из списка в нужный слот
                  </div>
                </div>
              </div>
            </div>
            <div className="cancel">
              <div className="text">Для отмены анимации, нажмите</div>
              <div className="button">
                <div className="button">{'C'}</div>
              </div>
            </div>
          </div>
          <div className="list">
            <div className="header">
              <div className="title">Список анимаций</div>
              <div className="line" />
              <div className="controls">
                <div className={`category ${search.isOpen && '-hidden'}`}>
                  <div
                    className={`current ${isOpenCategories && '-active'}`}
                    onClick={(event) => {
                      event.stopPropagation()
                      setIsOpenCategories((prev) => !prev)
                    }}
                  >
                    {getCurrentCategoryTitle()}
                  </div>
                  <div
                    className={`list ${!isOpenCategories && '-hidden'}`}
                    style={{
                      height: isOpenCategories
                        ? calcVh((categories.length + 1) * 30)
                        : 0,
                      opacity: isOpenCategories ? 1 : 0,
                    }}
                  >
                    {getCategoriesList()}
                  </div>
                </div>
                <div className={`search ${search.isOpen && '-opened'}`}>
                  <div className="input">
                    <input
                      ref={searchRef}
                      type="text"
                      placeholder="Название..."
                      value={search.value}
                      onChange={(e) =>
                        setSearch((prev) => ({
                          ...prev,
                          value: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div
                    className="btn"
                    onClick={() =>
                      setSearch({ isOpen: !search.isOpen, value: '' })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="list">{getList()}</div>
          </div>
        </div>
        <div
          className="drag"
          style={{
            top: calcVh(dragInfo.position.y - 40),
            left: calcVh(dragInfo.position.x - 36),
            zIndex: dragInfo.animationIdx === null ? -1 : 5,
            opacity: dragInfo.animationIdx === null ? 0 : 1,
          }}
        >
          {dragInfo.animationIdx !== null && (
            // <div
            //     className={'image'}
            //     style={{
            //         backgroundImage: `url(${Sources[`${animations[dragInfo.animationIdx].source}.webm`]})`,
            //     }}
            // ></div>
            <div className={'image'}>
              <video
                // @ts-ignore
                src={
                  Sources[`${animations[dragInfo.animationIdx].source}.webm`]
                }
              ></video>
            </div>
          )}
        </div>
      </div>
    </CSSTransition>
  )
}

export default Animations
