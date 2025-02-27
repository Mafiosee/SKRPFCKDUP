import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { SettingsTabList } from './config'
import { SettingParameterData } from '../../shared/settings/SettingParameterData'
import { SettingsTabId } from '../../shared/settings/SettingsTabId'
import { SettingParameterType } from '../../shared/settings/SettingParameterType'
import { GiftType, PromoPage } from '../../shared/HelpMenu/types'
import { ChatCommand, ChatMacros } from '../../shared/settings/ChatMacros'
import { InputDeviceType } from '../../shared/binder/InputDeviceType'
import {
  CurrentTicketType,
  MessageType,
  ReportTicket,
} from '../../shared/Tickets/type'
import { SettingSection } from '../../shared/settings/SettingSectionId'
import { NavId } from './types'
import { Quality } from '../../shared/inventory/itemType'
import { SourceType } from '../../shared/Images/SourceType'

type SettingsPage = Record<SettingsTabId, SettingSection[]>

type ExitPage = {
  helper: string | null
}

type ReportPage = {
  history: ReportTicket[]
  // rules: ReportRulesType[];
  currentTicket: CurrentTicketType | null
}

type EscMenuState = {
  isOpen: boolean
  settings: SettingsPage
  chatMacros: {
    list: ChatMacros[]
    commands: ChatCommand[]
  }
  exit: ExitPage
  report: ReportPage
  promo?: PromoPage
  changedSettings: boolean
  showSettingsConfirmWindow: boolean

  requiredNavId: NavId | null
}

const initialState: EscMenuState = {
  isOpen: false,
  requiredNavId: null,
  promo: {
    gifts: [
      // {
      //   quality: Quality.Rare,
      //   type: 'Type name',
      //   name: 'Name',
      //   image: {
      //     name: 'moragtonggrandmaster-store',
      //     sourceType: SourceType.DonateStore,
      //   },
      //   description: {
      //     small: 'Description small',
      //     large: 'Description large',
      //   },
      // },
    ],
  },
  // @ts-expect-error qwe
  settings: {
    [SettingsTabId.Sound]: [
      {
        title: 'Inventory',
        parameters: [
          {
            id: 0,
            title: 'qweqwe',
            type: SettingParameterType.Bind,
            data: {
              id: 'binder_inventory',
              isBlocked: false,
              current: { deviceType: InputDeviceType.Keyboard, codes: [1] },
              closeInterfaceEvent: 'inventory:hide',
            },
          },
        ],
      },
    ],
    [SettingsTabId.Keyboard]: [],
    [SettingsTabId.Graphics]: [],
    [SettingsTabId.Account]: [],
    [SettingsTabId.GameProcess]: [],
  },
  chatMacros: {
    list: [
      {
        id: 0,
        name: 'Название макроса',
        actions: [
          { commandId: 0, value: 'осмотрелся вокруг' },
          { commandId: 1, value: 'олень ничего не подозревал' },
          { commandId: 2, value: 'увидел оленя' },
        ],
      },
    ],
    commands: [
      { id: 0, name: 'Отыгровка', command: '/me' },
      { id: 1, name: 'Отыгровка', command: '/do' },
      { id: 2, name: 'Отыгровка', command: '/try' },
    ],
  },
  exit: {
    helper: '',
  },
  report: {
    history: [
      // {
      // 	id: 7,
      // 	title: 'Какой-то длинный заголовок проблемы :)',
      // 	datetime: '15.02.2024 22:46',
      // 	amountNotifications: 2,
      // 	reportStatus: ReportStatus.Closed,
      // 	type: ReportReason.help,
      // 	adminName: 'Луцио Серая Грива',
      // 	adminColor: AdminColors.Brown,
      // },
      // {
      // 	id: 1,
      // 	title: 'Какой-то длинный заголовок проблемы :)',
      // 	datetime: '15.02.2024 22:46',
      // 	amountNotifications: 0,
      // 	reportStatus: ReportStatus.InProcess,
      // 	type: ReportReason.reportPlayer,
      // 	adminName: 'Луцио Серая Грива',
      // 	adminColor: AdminColors.Brown,
      // },
      // {
      // 	id: 2,
      // 	title: 'Какой-то длинный заголовок проблемы :)',
      // 	datetime: '15.02.2024 22:46',
      // 	amountNotifications: 5,
      // 	reportStatus: ReportStatus.InProcess,
      // 	type: ReportReason.reportPlayer,
      // 	adminName: 'Луцио Серая Грива',
      // 	adminColor: AdminColors.Brown,
      // },
      // {
      // 	id: 3,
      // 	title: 'Какой-то длинный заголовок проблемы :)',
      // 	datetime: '15.02.2024 22:46',
      // 	amountNotifications: 0,
      // 	reportStatus: ReportStatus.InProcess,
      // 	type: ReportReason.reportPlayer,
      // 	adminName: 'Луцио Серая Грива',
      // 	adminColor: AdminColors.Brown,
      // },
      // {
      // 	id: 4,
      // 	title: 'Какой-то длинный заголовок проблемы :)',
      // 	datetime: '15.02.2024 22:46',
      // 	amountNotifications: 0,
      // 	reportStatus: ReportStatus.InProcess,
      // 	type: ReportReason.reportPlayer,
      // 	adminName: 'Луцио Серая Грива',
      // 	adminColor: AdminColors.Brown,
      // },
      // {
      // 	id: 5,
      // 	title: 'Какой-то длинный заголовок проблемы :)',
      // 	datetime: '15.02.2024 22:46',
      // 	amountNotifications: 0,
      // 	reportStatus: ReportStatus.InProcess,
      // 	type: ReportReason.reportPlayer,
      // 	adminName: 'Луцио Серая Грива',
      // 	adminColor: AdminColors.Brown,
      // },
      // {
      // 	id: 6,
      // 	title: 'Какой-то длинный заголовок проблемы :)',
      // 	datetime: '15.02.2024 22:46',
      // 	amountNotifications: 0,
      // 	reportStatus: ReportStatus.InProcess,
      // 	type: ReportReason.reportPlayer,
      // 	adminName: 'Луцио Серая Грива',
      // 	adminColor: AdminColors.Brown,
      // },
      // {
      // 	id: 7,
      // 	title: 'Какой-то длинный заголовок проблемы :)',
      // 	datetime: '15.02.2024 22:46',
      // 	amountNotifications: 0,
      // 	reportStatus: ReportStatus.InProcess,
      // 	type: ReportReason.reportPlayer,
      // 	adminName: 'Луцио Серая Грива',
      // 	adminColor: AdminColors.Brown,
      // },
    ],
    currentTicket: null,
    // currentTicket: {
    // 	id: 7,
    // 	status: ReportStatus.InProcess,
    // 	ticketInfo: {
    // 		title: null,
    // 		description: 're',
    // 		proofs: null,
    // 		date: '24.11.2024 20:11',
    // 		senderName: 'Урн Быстрый-Хуй',
    // 		senderStatus: 0,
    // 	},
    // 	adminInfo: {
    // 		name: 'Ждем свободного администратора...',
    // 		color: 'rgb(128, 128, 128)',
    // 	},
    // 	messages: [],
    // },
  },

  changedSettings: false,
  showSettingsConfirmWindow: false,
}

export const escMenuSlice = createSlice({
  name: 'escMenu',
  initialState,
  reducers: {
    show(state, action: PayloadAction<{ navId: NavId }>) {
      state.isOpen = true
      state.report.currentTicket = null
      if (action?.payload?.navId) {
        state.requiredNavId = action.payload.navId
      }
    },
    hide(state) {
      if (state.changedSettings) {
        state.showSettingsConfirmWindow = true
      } else {
        state.isOpen = false
        state.requiredNavId = null
      }
    },

    setGifts(state, action: PayloadAction<GiftType[]>) {
      state.promo = { gifts: [...action.payload] }
    },

    setSettings(state, action: PayloadAction<SettingsPage>) {
      state.settings = action.payload
    },
    setSettingsSection(
      state,
      action: PayloadAction<{
        sectionId: SettingsTabId
        data: SettingSection[]
      }>,
    ) {
      const { sectionId, data } = action.payload
      state.settings[sectionId] = [...data]
    },
    setSetting(
      state,
      action: PayloadAction<{ settingId: any; data: SettingParameterData }>,
    ) {
      const { settingId, data } = action.payload
      for (let tabIdx = 0; tabIdx < SettingsTabList.length; tabIdx++) {
        const tabId = SettingsTabList[tabIdx]
        for (
          let sectionIdx = 0;
          sectionIdx < state.settings[tabId].length;
          sectionIdx++
        ) {
          for (
            let parameterIdx = 0;
            parameterIdx < state.settings[tabId][sectionIdx].parameters.length;
            parameterIdx++
          ) {
            const parameterId =
              state.settings[tabId][sectionIdx].parameters[parameterIdx].id
            if (parameterId !== settingId) {
              continue
            }
            state.settings[tabId][sectionIdx].parameters[parameterIdx].data = {
              ...state.settings[tabId][sectionIdx].parameters[parameterIdx]
                .data,
              ...data,
            }
            break
          }
        }
      }
    },

    setExit(state, action: PayloadAction<ExitPage>) {
      state.exit = action.payload
    },

    /** Report System */
    setReport(state, action: PayloadAction<ReportPage>) {
      state.report = action.payload
    },
    setReportHistory(state, action: PayloadAction<ReportTicket[]>) {
      state.report.history = action.payload
    },
    addReportToHistory(state, action: PayloadAction<ReportTicket>) {
      state.report.history.push(action.payload)
    },
    setCurrentTicket(state, action: PayloadAction<CurrentTicketType | null>) {
      state.report.currentTicket = action.payload
    },
    addCurrentTicketMessage(state, action: PayloadAction<MessageType>) {
      if (state.report.currentTicket == null) {
        return
      }
      state.report.currentTicket.messages.push(action.payload)
    },
    // setRules(state, action: PayloadAction<ReportRulesType[]>) {
    //     state.report.rules = action.payload
    // },

    addReportHistoryItem(state, action: PayloadAction<ReportTicket>) {
      const ticket = action.payload
      state.report.history.push({ ...ticket })
    },
    removeReportHistoryItem(state, action: PayloadAction<any>) {
      const ticketId = action.payload
      const index = state.report.history.findIndex((el) => el.id === ticketId)
      if (!~index) {
        return
      }
      state.report.history.splice(index, 1)
    },
    updateReportHistoryItem(state, action: PayloadAction<ReportTicket>) {
      const ticket = action.payload
      const index = state.report.history.findIndex((el) => el.id === ticket.id)
      if (!~index) {
        return
      }
      state.report.history[index] = { ...ticket }
    },

    // only front
    setChangedSettings(state, action: PayloadAction<boolean>) {
      state.changedSettings = action.payload
    },
    setShowSettingsConfirmWindow(state, action: PayloadAction<boolean>) {
      state.showSettingsConfirmWindow = action.payload
    },
    saveSettings(state) {
      state.changedSettings = false
      state.showSettingsConfirmWindow = false
    },
  },
})

export const escMenuReducer = escMenuSlice.reducer
export const escMenuActions = escMenuSlice.actions
