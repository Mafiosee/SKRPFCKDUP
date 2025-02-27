import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { BlipCategory } from '../shared/Blips/BlipCategory'
import { BlipDTO } from '../shared/Blips/BlipDTO'
import { callClient } from '../utils/api'
import { WorldMapEvents, WorldMapPayloads } from '../shared/WorldMap/events'
import { MapData } from '../shared/Map/MapData'
import { MapType } from '../shared/Map/MapType'
import { MapTypeByWorldOrCell } from '../shared/Map/MapTypeByWorldOrCell'
import { BlipType } from '../shared/Blips/BlipType'

type MapState = {
  data: MapData
  type: MapType | null
  blipCategories: BlipCategory[]
  blips: BlipDTO[]
  marker: BlipDTO | null
}

const initialState: MapState = {
  data: {
    playerPosition: {
      x: 20848,
      y: -6658,
    },
    playerHeading: -20,
    cameraHeading: -20,
    cellOrWorld: 60,
  },
  type: MapType.Global,
  blipCategories: [
    { id: 0, name: 'Работы' },
    { id: 1, name: 'Города' },
  ],
  blips: [
    // {
    //   id: 0,
    //   name: { short: 'Hello, world!', full: 'Hello, world!' },
    //   icon: BlipType.Farm,
    //   position: { x: 0, y: 0 },
    //   categoryId: 0,
    // },
    // {
    //   id: 1,
    //   name: { short: 'Hello, world 2!', full: 'Hello, world 2!' },
    //   icon: BlipType.Farm,
    //   position: { x: 10000, y: 0 },
    //   categoryId: 0,
    //   tooltip: {
    //     backgroundColor: '#f00',
    //     textColor: '#00f',
    //   },
    // },
  ],
  marker: null,
}

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<MapData>) {
      state.data = {
        ...action.payload,
        playerHeading: -action.payload.playerHeading,
        cameraHeading: -action.payload.cameraHeading,
      }
      state.type = MapTypeByWorldOrCell[action.payload.cellOrWorld] ?? null

      if (state.marker) {
        const distanceByAxis = {
          x: Math.pow(
            action.payload.playerPosition.x - state.marker.position.x,
            2,
          ),
          y: Math.pow(
            action.payload.playerPosition.y - state.marker.position.y,
            2,
          ),
        }
        const distanceToMarker = Math.sqrt(distanceByAxis.x + distanceByAxis.y)
        if (distanceToMarker < 1000) {
          state.marker = null
          callClient(WorldMapEvents.SetMarker, null)
        }
      }
    },
    setBlipCategories(state, action: PayloadAction<BlipCategory[]>) {
      state.blipCategories = action.payload
    },
    setBlips(state, action: PayloadAction<BlipDTO[]>) {
      state.blips = action.payload
    },
    addBlip(state, action: PayloadAction<BlipDTO>) {
      state.blips.push(action.payload)
    },
    removeBlip(state, action: PayloadAction<{ blipId: any }>) {
      const blipIndex = state.blips.findIndex(
        (blip) => blip.id === action.payload.blipId,
      )
      if (!~blipIndex) {
        return
      }
      state.blips.splice(blipIndex, 1)
    },
    setMarker(state, action: PayloadAction<BlipDTO | null>) {
      const payload: WorldMapPayloads[WorldMapEvents.SetMarker] =
        !action.payload ? null : action.payload.position
      callClient(WorldMapEvents.SetMarker, payload)
      state.marker = action.payload
    },
  },
})

export const mapReducer = mapSlice.reducer
export const mapActions = mapSlice.actions
