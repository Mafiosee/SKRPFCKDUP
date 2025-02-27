import { SettingsTabId } from '../../shared/settings/SettingsTabId'
import { NavId } from './types'

export const NavList = [
  NavId.Map,
  NavId.DonateStore,
  NavId.Help,
  NavId.Promo,
  NavId.Report,
  NavId.Settings,
  NavId.Exit,
]

export const SettingsTabList: SettingsTabId[] = [
  SettingsTabId.GameProcess,
  SettingsTabId.Sound,
  SettingsTabId.Keyboard,
  SettingsTabId.Graphics,
  SettingsTabId.Account,
]
