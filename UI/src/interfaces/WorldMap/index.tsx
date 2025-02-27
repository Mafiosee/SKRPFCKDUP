import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {
  getCoordinateByFormattedByCenter,
  getFormattedCoordinateByCenter,
} from '../../utils/map'
import { TimeoutRef } from '../../types/timeoutRef'
import { BlipIcons } from './assets/BlipIcons'
import { mapActions } from '../../reducers/map'
import { BlipType } from '../../shared/Blips/BlipType'
import { MouseButton } from '../../types/mouseButton'
import { Coordinates } from '../../shared/Map/Coordinates'
import { KeyCodes } from '../../utils/keyCodes'
import { callClient } from '../../utils/api'
import { WorldMapEvents } from '../../shared/WorldMap/events'
import { Task } from '../Hud/components/Task'

enum TransitionType {
  Scale = 'Scale',
  Move = 'Move',
}

const TransitionTime: Record<TransitionType, number> = {
  [TransitionType.Scale]: 150,
  [TransitionType.Move]: 500,
}

const TransitionTimingFunction: Record<TransitionType, string> = {
  [TransitionType.Scale]: 'linear',
  [TransitionType.Move]: 'ease',
}

const MapTest: React.FC = () => {
  const dispatch = useAppDispatch()
  const { isOpen } = useAppSelector((state) => state.worldMap)
  const {
    data: { playerPosition, playerHeading },
    blipCategories,
    blips,
    marker,
  } = useAppSelector((state) => state.map)
  const {
    character: {
      playerInfo: { exp, lvl },
    },
  } = useAppSelector((state) => state.characterMenu)
  const mousePosition = useRef<Coordinates>({ x: 0, y: 0 })
  const [enabledMove, setEnabledMove] = useState(false)
  const [mapData, setMapData] = useState<{
    offset: Coordinates
    scale: number
  }>({
    offset: { x: 0, y: 0 },
    scale: 1,
  })
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const [transition, setTransition] = useState<{
    enabled: boolean
    type: TransitionType | null
  }>({
    enabled: false,
    type: null,
  })
  const transitionTimout = useRef<TimeoutRef>(null)
  const [activeCategoryId, setActiveCategoryId] = useState(null)

  const currentCategoryName = useMemo(() => {
    if (activeCategoryId == null) {
      return 'Все'
    } else {
      return blipCategories.find((category) => category.id === activeCategoryId)
        ?.name
    }
  }, [activeCategoryId, blipCategories])

  const filteredBlips = useMemo(() => {
    if (activeCategoryId == null) {
      return blips
    } else {
      return blips.filter((blip) => blip.categoryId === activeCategoryId)
    }
  }, [activeCategoryId, blips])

  const toggleTransition = (type: TransitionType) => {
    setTransition({
      enabled: true,
      type,
    })
    if (transitionTimout.current != null) {
      clearTimeout(transitionTimout.current)
    }
    transitionTimout.current = setTimeout(() => {
      setTransition({
        enabled: false,
        type: null,
      })
    }, TransitionTime[type] + 10)
  }

  const changeMapData = useCallback(
    (newMapData: { scale: number; offset: Coordinates }) => {
      if (!containerRef.current || !mapRef.current) {
        return
      }
      const containerRect = containerRef.current.getBoundingClientRect()
      const mapRect = mapRef.current.getBoundingClientRect()
      const minOffset = { x: 0, y: 0 }
      const maxOffset = {
        x:
          (mapRect.width / mapData.scale) * newMapData.scale -
          containerRect.width,
        y:
          (mapRect.height / mapData.scale) * newMapData.scale -
          containerRect.height,
      }
      if (newMapData.offset.x < minOffset.x) {
        newMapData.offset.x = minOffset.x
      }
      if (newMapData.offset.y < minOffset.y) {
        newMapData.offset.y = minOffset.y
      }
      if (newMapData.offset.x > maxOffset.x) {
        newMapData.offset.x = maxOffset.x
      }
      if (newMapData.offset.y > maxOffset.y) {
        newMapData.offset.y = maxOffset.y
      }
      setMapData(newMapData)
    },
    [mapData.scale],
  )

  const moveTo = useCallback(
    ({ scale = 1, position }: { scale?: number; position: Coordinates }) => {
      if (!containerRef.current || !mapRef.current || transition.enabled) {
        return
      }
      const containerRect = containerRef.current.getBoundingClientRect()
      const mapRect = mapRef.current.getBoundingClientRect()
      const offset = {
        x:
          ((mapRect.width / mapData.scale) * scale) / 2 +
          getFormattedCoordinateByCenter(position.x) * scale -
          containerRect.width / 2,
        y:
          ((mapRect.height / mapData.scale) * scale) / 2 +
          getFormattedCoordinateByCenter(-position.y) * scale -
          containerRect.height / 2,
      }

      toggleTransition(TransitionType.Move)
      changeMapData({ scale, offset })
    },
    [changeMapData, mapData.scale, transition.enabled],
  )

  useEffect(() => {
    const handleKeyDown = ({ keyCode }: KeyboardEvent) => {
      switch (keyCode) {
        case KeyCodes.Tab: {
          moveTo({ scale: 3, position: playerPosition })
          break
        }
        case KeyCodes.Esc: {
          callClient(WorldMapEvents.CloseRequest)
          break
        }
      }
    }

    const handleMouseUp = () => {
      setEnabledMove(false)
    }

    const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
      if (enabledMove) {
        const diff = {
          x: mousePosition.current.x - clientX,
          y: mousePosition.current.y - clientY,
        }
        changeMapData({
          ...mapData,
          offset: {
            x: mapData.offset.x + diff.x,
            y: mapData.offset.y + diff.y,
          },
        })
      }
      mousePosition.current = {
        x: clientX,
        y: clientY,
      }
    }

    document.addEventListener('mouseup', handleMouseUp)
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('mousemove', handleMouseMove)
    }
    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [changeMapData, enabledMove, isOpen, mapData, moveTo, playerPosition])

  useEffect(() => {
    moveTo({ scale: 2, position: playerPosition })
  }, [isOpen])

  const getFormattedPointPosition = (position: Coordinates) => {
    return {
      top:
        (4096 * (window.screen.height / 1080)) / 2 +
        getFormattedCoordinateByCenter(-position.y),
      left:
        (4096 * (window.screen.height / 1080)) / 2 +
        getFormattedCoordinateByCenter(position.x),
    }
  }

  const playerPointPosition = useMemo(
    () => getFormattedPointPosition(playerPosition),
    [playerPosition],
  )
  const blipPositions = useMemo(() => {
    const positions: Record<any, { top: number; left: number }> = {}
    blips.forEach(
      (blip) => (positions[blip.id] = getFormattedPointPosition(blip.position)),
    )
    if (marker) {
      positions[marker.id] = getFormattedPointPosition(marker.position)
    }
    return positions
  }, [blips, marker])

  const currentTransition = useMemo(() => {
    if (enabledMove || transition.type == null) {
      return 'none'
    }
    return `all ${TransitionTime[transition.type]}ms ${TransitionTimingFunction[transition.type]}`
  }, [enabledMove, transition.type])

  const mapBlips = useMemo(
    () =>
      [...filteredBlips, marker].map(
        (blip) =>
          blip != null && (
            <div
              key={blip.id}
              id={blip.id}
              className={`blip ${blip.id === 'marker' && '-marker'}`}
              style={{
                ...blipPositions[blip.id],
                transition: currentTransition,
                transform: `translate(-50%, -50%) scale(${1 / mapData.scale})`,
              }}
              onContextMenu={(event) => {
                event.preventDefault()
                if (blip.id === 'marker') {
                  dispatch(mapActions.setMarker(null))
                  event.stopPropagation()
                }
              }}
            >
              <div
                className="icon"
                style={{
                  backgroundImage: `url(${BlipIcons[`${blip.icon}.svg`]})`,
                }}
              />
              <div
                className={`name ${blip.id === 'marker' && '-marker'}`}
                style={{
                  backgroundColor: blip?.tooltip?.backgroundColor,
                  color: blip?.tooltip?.textColor,
                }}
              >
                {blip.name.full}
              </div>
            </div>
          ),
      ),
    [
      blipPositions,
      currentTransition,
      dispatch,
      filteredBlips,
      mapData.scale,
      marker,
    ],
  )

  const helpBlips = useMemo(
    () =>
      filteredBlips.map((blip) => (
        <div
          key={blip.id}
          className="blip"
          onClick={() => moveTo({ scale: 3, position: blip.position })}
        >
          <div
            className="icon"
            style={{ backgroundImage: `url(${BlipIcons[`${blip.icon}.svg`]})` }}
          />
          <div className="name">{blip.name.short}</div>
        </div>
      )),
    [filteredBlips, moveTo],
  )

  const updateActiveCategory = (diff: number) => {
    const activeCategoryIndex = blipCategories.findIndex(
      (category) => category.id === activeCategoryId,
    )
    let newCategoryIndex = activeCategoryIndex + diff
    const maxCategoryIndex = blipCategories.length - 1
    if (newCategoryIndex > maxCategoryIndex) {
      newCategoryIndex = -1
    }
    if (newCategoryIndex < -1) {
      newCategoryIndex = maxCategoryIndex
    }
    if (newCategoryIndex === -1) {
      setActiveCategoryId(null)
    } else {
      setActiveCategoryId(blipCategories[newCategoryIndex].id)
    }
  }

  return isOpen ? (
    <div className="WorldMap">
      <div
        className="container"
        ref={containerRef}
        onMouseDown={(event) => {
          if (event.button !== MouseButton.Left) {
            return
          }
          setEnabledMove(true)
        }}
      >
        <div
          className="map"
          ref={mapRef}
          style={{
            transition: currentTransition,
            transform: `translate(${-mapData.offset.x}px, ${-mapData.offset.y}px) scale(${mapData.scale})`,
          }}
          onWheel={({ deltaY, clientX, clientY }) => {
            if (
              !containerRef.current ||
              !mapRef.current ||
              transition.enabled
            ) {
              return
            }
            let newMapScale = mapData.scale + (deltaY < 0 ? 0.3 : -0.3)
            const containerRect = containerRef.current.getBoundingClientRect()
            const mapRect = mapRef.current.getBoundingClientRect()
            const maxMapScale = 3
            const minMapScale =
              containerRect.width / (mapRect.width / mapData.scale)
            if (newMapScale < minMapScale) {
              newMapScale = minMapScale
            } else if (newMapScale > maxMapScale) {
              newMapScale = maxMapScale
            }
            const currentCursorPosition = {
              x:
                containerRect.left +
                mapData.offset.x +
                (clientX - containerRect.left),
              y:
                containerRect.top +
                mapData.offset.y +
                (clientY - containerRect.left),
            }
            const newCursorPosition = {
              x: (currentCursorPosition.x / mapData.scale) * newMapScale,
              y: (currentCursorPosition.y / mapData.scale) * newMapScale,
            }
            const newMapOffset = {
              x:
                mapData.offset.x +
                newCursorPosition.x -
                currentCursorPosition.x,
              y:
                mapData.offset.y +
                newCursorPosition.y -
                currentCursorPosition.y,
            }
            toggleTransition(TransitionType.Scale)
            changeMapData({
              scale: newMapScale,
              offset: newMapOffset,
            })
          }}
          onContextMenu={(event) => {
            const { clientX, clientY } = event
            event.preventDefault()
            if (
              !containerRef.current ||
              !mapRef.current ||
              transition.enabled
            ) {
              return
            }
            const containerRect = containerRef.current.getBoundingClientRect()
            const mapRect = mapRef.current.getBoundingClientRect()
            const coordinatesByCenter = {
              x:
                getCoordinateByFormattedByCenter(
                  containerRect.left +
                    mapData.offset.x +
                    (clientX - containerRect.left) -
                    mapRect.width / 2,
                ) / mapData.scale,
              y:
                -getCoordinateByFormattedByCenter(
                  containerRect.top +
                    mapData.offset.y +
                    (clientY - containerRect.left) -
                    mapRect.height / 2,
                ) / mapData.scale,
            }
            dispatch(
              mapActions.setMarker({
                id: 'marker',
                icon: BlipType.Marker,
                name: {
                  short: '',
                  full: 'Ваша метка',
                },
                position: coordinatesByCenter,
                categoryId: -1,
                alwaysVisibleOnMinimap: true,
              }),
            )
          }}
        >
          <div
            className="player"
            style={{
              ...playerPointPosition,
              transition: currentTransition,
              transform: `translate(-50%, -50%) rotate(${-playerHeading}deg) scale(${1 / mapData.scale})`,
            }}
          />
          <div className="blips">{mapBlips}</div>
        </div>
      </div>
      <div className="cover">
        <div className="shadow-left" />
        <div className="content">
          <div className="title">Карта мира</div>
          <div className="helpers">
            <div className="helper">
              <div className="icon -lmb" />
              <div className="name">Перемещение</div>
            </div>
            <div className="helper">
              <div className="icon -mmb" />
              <div className="name">Приблизить/отдалить</div>
            </div>
            <div className="helper">
              <div className="icon -rmb" />
              <div className="name">Установить/удалить маркер</div>
            </div>
            <div className="helper">
              <div className="icon -tab" />
              <div className="name">Текущее местоположение</div>
            </div>
          </div>
          <div className="close">
            <div className="helper">Выйти</div>
            <div className="icon" />
          </div>
          <div className="blips">
            <div className="list">{helpBlips}</div>
          </div>
          <div className="blipCategories">
            <div className="arrow" onClick={() => updateActiveCategory(-1)} />
            <div className="current">{currentCategoryName}</div>
            <div className="arrow" onClick={() => updateActiveCategory(1)} />
          </div>
          <div className="level">
            <div className="row">
              <div className="current">{lvl} уровень</div>
              <div className="exp">
                {exp.current}/{exp.max} EXP
              </div>
            </div>
            <div className="progress">
              <div
                className="bar"
                style={{ width: `${(exp.current / exp.max) * 100}%` }}
              />
            </div>
          </div>
          <Task />
        </div>
      </div>
    </div>
  ) : null
}

export default MapTest
