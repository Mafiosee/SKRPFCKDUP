import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import {
  AcceptCancelNotification,
  ChatType,
  InteractNotification,
  JailData,
  Kill,
  KillList,
  MessageType,
  PunishmentType,
  ServerInfo,
  TaskType,
  UserInfo,
  UserInfoHP,
  UserInfoMoney,
  UserInfoStamina,
  Zones,
} from '../../shared/Hud/types'
import { Bind } from '../../shared/Hud/Bind'
import { SkyrimScanCode } from '../../shared/Utils/skyrimKeyCode'
import { BinderModifiers } from '../../shared/binder'

const MAX_AMOUNT_MESSAGES = 25

type HudState = {
  isOpen: boolean
  userInfo: UserInfo
  serverInfo: ServerInfo
  task: TaskType
  punishment: PunishmentType
  killList: KillList
  interactNotification: InteractNotification
  acceptCancelNotification: AcceptCancelNotification
  chat: ChatType
  binds: Bind[]
  jail: JailData
  visibleMinimap: boolean
}

const initialState: HudState = {
  isOpen: false,

  userInfo: {
    show: true,
    money: {
      cash: 0,
      bank: 0,
    },
    health: {
      maxHP: 0,
      currentHP: 0,
    },
    stamina: {
      maxStamina: 0,
      currentStamina: 0,
    },
    date: ``,
    isMicrophoneEnabled: false,
    zone: null,
  },

  serverInfo: {
    show: true,
    online: 0,
    playerUID: '',
    playerID: 0,
    serverName: 'Sovngarde',
  },

  task: {
    show: false,
    name: 'Дом, милый дом',
    text: `Для успешного старта, советуем первым делом поговорить с NPC-гидом и взять 'Начальные задания'. Это поможет вам легче и быстрее адаптироваться на сервере.`,
    tasks: [{ id: 0, name: 'Посетить дома', progress: { current: 0, max: 1 } }],
  },

  punishment: {
    show: false,
    blocks: [
      // {
      // 	name: 'Выдал наказание',
      // 	content: 'Serhio Braavos',
      // },
      // {
      // 	name: 'Выдал наказание',
      // 	content: 'Serhio Braavos',
      // },
      // {
      // 	name: 'Выдал наказание',
      // 	content: '20.02.2024 14:35:56',
      // },
    ],
  },

  killList: {
    show: false,
    kills: [
      // {
      // 	killer: {
      // 		name: 'Serhio Braavos',
      // 		color: KillPlayerColors.Red,
      // 	},
      // 	victim: {
      // 		name: 'Davinchi59',
      // 		color: KillPlayerColors.Blue,
      // 	},
      // },
      // {
      // 	killer: {
      // 		name: 'Serhio Braavos',
      // 		color: KillPlayerColors.Red,
      // 	},
      // 	victim: {
      // 		name: 'Serhio Braavos',
      // 		color: KillPlayerColors.Blue,
      // 	},
      // },
      // {
      // 	killer: {
      // 		name: 'Serhio Braavos',
      // 		color: KillPlayerColors.Red,
      // 	},
      // 	victim: {
      // 		name: 'Davinchi59',
      // 		color: KillPlayerColors.Blue,
      // 	},
      // },
      // {
      // 	killer: {
      // 		name: 'Davinchi59',
      // 		color: KillPlayerColors.Red,
      // 	},
      // 	victim: {
      // 		name: 'Serhio Braavos',
      // 		color: KillPlayerColors.Blue,
      // 	},
      // },
      // {
      // 	killer: {
      // 		name: 'Serhio Braavos',
      // 		color: KillPlayerColors.Red,
      // 	},
      // 	victim: {
      // 		name: 'Davinchi59',
      // 		color: KillPlayerColors.Blue,
      // 	},
      // },
    ],
  },

  interactNotification: {
    show: false,
    text: '',
    button: '',
  },

  acceptCancelNotification: {
    show: false,
    text: '',
    buttonAccept: '',
    buttonCancel: '',
  },

  chat: {
    show: true,
    showMessages: true,
    showInput: false,
    commandButtons: [
      //"me", "do", "todo", "try", "b", "c", "r"
    ],
    messages: [
      // {
      // 	senderName: 'Jigglypuff',
      // 	senderInfo: {
      // 		race: Race.Imperial,
      // 		gender: Gender.Female,
      // 	},
      // 	text: 'code is ~{0}~ bad',
      // 	senderStatus: SenderStatuses.Admin,
      // 	subtextParametr: {
      // 		0: { text: 'very', color: TextColors.red },
      // 	},
      // },
      // {
      // 	senderName: 'Jigglypuff',
      // 	text: '2',
      // 	senderStatus: SenderStatuses.Admin,
      // },
      // {
      // 	senderName: 'davinchi59',
      // 	text: '3',
      // 	senderStatus: SenderStatuses.Player,
      // },
    ],
  },

  binds: [
    // { name: 'Меню', key: SkyrimScanCode.Escape },
    // {
    //   name: 'Взаимодействие',
    //   key: SkyrimScanCode.G,
    //   modifier: BinderModifiers.SHIFT,
    // },
    // { name: 'Ещё что то', key: SkyrimScanCode.LeftMouseButton },
  ],

  jail: {
    visible: false,
    title: 'Деморган',
    secondsLeft: 2 * 60 * 60 + 16 * 60 + 58,
    catcher: 'Люся Бритая Нога [F52]',
    reason: 'Очень много наводил суеты в Вайтране',
  },

  visibleMinimap: true,
}

export const hudSlice = createSlice({
  name: 'hud',
  initialState,
  reducers: {
    show(state) {
      state.isOpen = true
    },
    hide(state) {
      state.isOpen = false
    },

    /** User info */
    setUserInfo(state, action: PayloadAction<UserInfo>) {
      state.userInfo = action.payload
    },
    setShowUserInfo(state, action: PayloadAction<boolean>) {
      state.userInfo.show = action.payload
    },
    setUserMoney(state, action: PayloadAction<UserInfoMoney>) {
      state.userInfo.money = action.payload
    },
    setUserHealth(state, action: PayloadAction<UserInfoHP>) {
      state.userInfo.health = action.payload
    },
    setUserStamina(state, action: PayloadAction<UserInfoStamina>) {
      state.userInfo.stamina = action.payload
    },
    setDate(state, action: PayloadAction<{ value: number }>) {
      state.userInfo.stamina.maxStamina = action.payload.value
    },
    setUserZone(state, action: PayloadAction<Zones>) {
      state.userInfo.zone = action.payload
    },
    setMicStatus(state, action: PayloadAction<boolean>) {
      state.userInfo.isMicrophoneEnabled = action.payload
    },

    /** Server Info */
    setServerInfo(state, action: PayloadAction<ServerInfo>) {
      state.serverInfo = action.payload
    },
    setShowServerInfo(state, action: PayloadAction<boolean>) {
      state.serverInfo.show = action.payload
    },
    setOnline(state, action: PayloadAction<{ value: number }>) {
      state.serverInfo.online = action.payload.value
    },
    setPlayerID(state, action: PayloadAction<{ value: number }>) {
      state.serverInfo.playerID = action.payload.value
    },
    setPlayerUID(state, action: PayloadAction<any>) {
      state.serverInfo.playerUID = action.payload
    },

    /** Task */
    setTask(state, action: PayloadAction<TaskType>) {
      state.task = action.payload
    },
    setShowTask(state, action: PayloadAction<boolean>) {
      state.task.show = action.payload
    },
    updateTaskTask(
      state,
      action: PayloadAction<{
        id: any
        name: string
        progress: { current: number; max: number }
      }>,
    ) {
      const taskIndex = state.task.tasks.findIndex(
        (task) => task.id === action.payload.id,
      )
      if (!~taskIndex) {
        return
      }
      state.task.tasks[taskIndex] = action.payload
    },

    /** Punishment */
    setPunishment(state, action: PayloadAction<PunishmentType>) {
      state.punishment = action.payload
    },
    setShowPunishment(state, action: PayloadAction<PunishmentType>) {
      state.punishment = action.payload
    },

    /** Kill List */
    setKillList(state, action: PayloadAction<KillList>) {
      state.killList = action.payload
    },
    addKill(state, action: PayloadAction<Kill>) {
      if (state.killList.kills.length === 5) {
        state.killList.kills.pop()
      }
      state.killList.kills.unshift(action.payload)
    },
    setShowKillList(state, action: PayloadAction<boolean>) {
      state.killList.show = action.payload
    },

    /** Interact Notify */
    setInteractNotification(
      state,
      action: PayloadAction<InteractNotification>,
    ) {
      state.interactNotification = action.payload
    },
    setShowInteractNotification(state, action: PayloadAction<boolean>) {
      state.interactNotification.show = action.payload
    },

    /** AcceptCancel Notification */
    setAcceptCancelNotify(
      state,
      action: PayloadAction<AcceptCancelNotification>,
    ) {
      state.acceptCancelNotification = action.payload
    },
    setShowAcceptCancelNotify(state, action: PayloadAction<boolean>) {
      state.acceptCancelNotification.show = action.payload
    },

    /** Chat */
    setChat(state, action: PayloadAction<ChatType>) {
      state.chat = action.payload
    },
    setShowMessages(state, action: PayloadAction<boolean>) {
      if (!action.payload) {
        state.chat.showInput = false
      }
      state.chat.showMessages = action.payload
    },
    setShowInput(state, action: PayloadAction<boolean>) {
      state.chat.showInput = action.payload
      // state.chat.
    },
    addMessage(state, action: PayloadAction<MessageType>) {
      if (state.chat.messages.length >= MAX_AMOUNT_MESSAGES) {
        state.chat.messages.shift()
      }
      if (/<\/?[a-z][\s\S]*>/i.test(action.payload.text)) {
        return
      }
      state.chat.messages.push(action.payload)
    },
    clearMessages(state) {
      state.chat.messages.length = 0
    },
    setCommandButtons(state, action: PayloadAction<string[]>) {
      state.chat.commandButtons = action.payload
    },

    /** Binds */
    setBinds(state, action: PayloadAction<Bind[]>) {
      state.binds = action.payload
    },

    /** Jail */
    setJailData(state, action: PayloadAction<JailData>) {
      state.jail = action.payload
    },
    setJailVisible(state, action: PayloadAction<boolean>) {
      state.jail.visible = action.payload
    },
    setJailSecondsLeft(state, action: PayloadAction<{ value: number }>) {
      state.jail.secondsLeft = action.payload.value
    },

    /** Minimap */
    setVisibleMinimap(state, action: PayloadAction<boolean>) {
      state.visibleMinimap = action.payload
    },
  },
})

export const hudReducer = hudSlice.reducer
export const hudActions = hudSlice.actions
