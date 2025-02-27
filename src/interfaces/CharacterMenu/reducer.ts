import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  AchievementType,
  CharacterType,
  MountType,
  SkillType,
} from '../../shared/CharacterMenu/types'
import { Gender } from '../../shared/characterEditor/enums/Genders'
import { Race } from '../../types/race'

type CharacterMenuState = {
  isOpen: boolean
  character: CharacterType
  skills: SkillType[]
  achievements: AchievementType[]
  mounts: MountType[]
}

const initialState: CharacterMenuState = {
  isOpen: false,
  character: {
    playerInfo: {
      name: '',
      gender: Gender.Male,
      race: Race.Nord,
      age: 21,
      lvl: 1,
      balance: 0,
      warns: 0,
      exp: {
        current: 0,
        max: 4,
      },
    },
    blocksInfo: {
      location: 'Сиродил',
      // house: {
      //   name: '',
      //   timeUntilEndRent: '',
      // },
      // guild: {
      //   name: '',
      //   description: '',
      // },
      // business: {
      //   name: '',
      // },
      // vip: null,
    },
  },
  skills: [
    {
      icon: 'farm',
      name: 'Фермерство',
      level: 8,
      progress: {
        current: 1000,
        max: 1000,
      },
    },
    {
      icon: 'sawmill',
      name: 'Лесорубство',
      level: 4,
      progress: {
        current: 150,
        max: 300,
      },
    },
    {
      icon: 'honey',
      name: 'Медоварение',
      level: 2,
      progress: {
        current: 450,
        max: 600,
      },
    },
    {
      icon: 'fishing',
      name: 'Рыболовство',
      level: 3,
      progress: {
        current: 10,
        max: 150,
      },
    },
  ],
  achievements: [
    // {
    //   name: 'Драконорожденный #1',
    //   progress: {
    //     current: 50,
    //     max: 1000,
    //   },
    //   description: 'Завершите основной квест, уничтожив Алдуина.',
    // },
  ],
  mounts: [
    // {
    //   rarity: Quality.Unusual,
    //   mount: Mounts.Horse,
    // },
  ],
}

export const characterMenuSlice = createSlice({
  name: 'characterMenu',
  initialState,
  reducers: {
    show(state) {
      state.isOpen = true
    },
    hide(state) {
      state.isOpen = false
    },

    setCharacter(state, action: PayloadAction<CharacterType>) {
      if (action.payload.blocksInfo?.vip?.status === 'inactive') {
        action.payload.blocksInfo.vip = undefined
      }
      state.character = action.payload
    },
    setSkills(state, action: PayloadAction<SkillType[]>) {
      state.skills = action.payload
    },
    setAchievements(state, action: PayloadAction<AchievementType[]>) {
      state.achievements = action.payload
    },
    setMounts(state, action: PayloadAction<MountType[]>) {
      state.mounts = action.payload
    },
  },
})

export const characterMenuReducer = characterMenuSlice.reducer
export const characterMenuActions = characterMenuSlice.actions
