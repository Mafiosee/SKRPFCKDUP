import { ChatMacros } from "./ChatMacros";

export enum EscMenuEvents {
	RequestMap = 'escMenu:requestMap',
	RequestExit = 'escMenu:requestExit',
	UpdateSettingValue = 'escMenu:updateSettingValue',
	RequestClose = 'escMenu:requestClose',
	SaveSettings = 'escMenu:saveSettings',
	GetOldSettings = 'escMenu:getOldSettings',
	AddNewMacros = 'escMenu:addNewMacros',
	RemoveMacros = 'escMenu:removeMacros',
	SaveMacros = 'escMenu:saveMacros',
	CreateTicket = 'escMenu:createTicket',
	SetCurrentTicket = 'escMenu:setCurrentTicket',
	AddTicketMessage = 'escMenu:addTicketMessage',
}

export type UpdateSettingValuePayload = {
  settingId: any;
  newValue: any;
};

export type RemoveMacrosPayload = {
  macrosId: any;
};

export type SaveMacrosPayload = {
  macros: ChatMacros;
};

export enum SettingsEvents {
  Update = "settings:update",
  Init = "settings:init",
  UpdateSettings = "settings:updateSettings",
}

export enum EscMenuClientEvents {
  OpenMap = "escMenu:openMap",
  ExitGame = "escMenu:exitGame",
}
