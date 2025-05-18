import { Gender } from '../characterEditor/enums/Genders'
import { Race } from '../Race/type'

/** UserInfo*/
export type UserInfoMoney = {
  cash: number
  bank: number
}

export type UserInfoHP = {
  maxHP: number
  currentHP: number
}

export type UserInfoStamina = {
  maxStamina: number
  currentStamina: number
}

export enum Zones {
  Default = 'default',
  SafeZone = 'safeZone',
}

export type UserInfo = {
  show: boolean
  money: UserInfoMoney
  health: UserInfoHP
  stamina: UserInfoStamina
  date: string // 'dd.mm.yy hh:mm:ss'
  isMicrophoneEnabled: boolean
  zone: Zones | null
}

/** ServerInfo */

export type ServerInfo = {
  show: boolean
  serverName: string
  online: number
  playerID: number
  playerUID: string
}

/** Task */
export type TaskType = {
  show: boolean
  name?: string
  text?: string
  tasks: { id: any; name: string; progress: { current: number; max: number } }[]
}

/**Punishment */
export type BlockType = {
  name: string // название блока, к примеру Выдал наказание:
  content: string // текст
}

export type PunishmentType = {
  show: boolean
  blocks: BlockType[]
}

/** KillList */

export enum KillPlayerColors {
  Red = '#9B3942',
  Blue = '#4880B1',
}

export type KillPlayerInfo = {
  name: string
  color: KillPlayerColors
}

export type Kill = {
  killer: KillPlayerInfo
  victim: KillPlayerInfo
}

export type KillList = {
  show: boolean
  kills: Kill[]
}

/** Interact Notification */
export type InteractNotification = {
  show: boolean
  text: string
  button: string
}

/** AcceptCancel Notification */

export type AcceptCancelNotification = {
  show: boolean
  text: string
  buttonAccept: string
  buttonCancel: string
}

/** Chat  */

export enum SenderStatuses {
  Player = 'player',
  Admin = 'admin',
  Server = 'server',
}

export enum TextColors {
  red = 'rgb(255, 0, 0)',
  yellow = 'rgb(255, 255, 0)',
  green = 'rgb(0, 255, 0)',
  softGreen = 'rgb(111, 194, 118)',
  blue = 'rgb(0, 0, 255)',
  turquoise = 'rgb(48, 213, 200)',
  gold = 'rgb(201, 195, 45)',
  white = 'rgb(255, 255, 255)',
  grey = 'rgb(222, 220, 225)',
  pink = 'rgb(250, 191, 255)',
  lettuce = 'rgb(102, 250, 139)',
  lettuce2 = 'rgb(175, 219, 99)',
  coralRed = 'rgb(179, 40, 33)',
}

type SenderColors = {
  [key in SenderStatuses]: TextColors
}

export const senderColors: SenderColors = {
  [SenderStatuses.Player]: TextColors.white,
  [SenderStatuses.Admin]: TextColors.red,
  [SenderStatuses.Server]: TextColors.gold,
}

export type MessageType = {
  senderName: string
  senderStatus: SenderStatuses
  text: string
  senderInfo?: {
    race: Race
    gender: Gender
  }
  subtextParametr?: {
    [key: number]: {
      color: TextColors
      text: string
    }
  }
}

export type ChatType = {
  show: boolean
  showMessages: boolean
  showInput: boolean
  messages: MessageType[]
  commandButtons: string[]
}

export type ArenaTimer = {
  show: boolean
  time: number
}

export type JailData = {
  visible: boolean
  title: string
  secondsLeft: number
  catcher: string
  reason: string
}
