import {
  AdminPanelSections,
  ButtonTypes,
  SettingsInfoContentType,
} from './type'

export enum AdminPanelEvents {
  OpenSection = 'AdminPanel:openSection',
  Close = 'AdminPanel:close',
  ChangeSetting = 'AdminPanel:changeSetting',
  RemovePunishment = 'AdminPanel:removePunishment',
  SendTicketMessage = 'AdminPanel:sendTicketMessage',
  ClickTicketSecondaryButton = 'AdminPanel:clickTicketSecondaryButton',
  AddFastAnswer = 'AdminPanel:addFastAnswer',
  DeleteFastAnswer = 'AdminPanel:deleteFastAnswer',
  TakeTicket = 'AdminPanel:takeTicket',
  OpenTicket = 'AdminPanel:openTicket',
  GetStatByDate = 'AdminPanel:getDateByDate',
  GetAdminStatByDate = 'AdminPanel:getAdminStatByDate',
  SetIsReadForReport = 'AdminPanel:setIsReadForReport',
  ReconPlayer = 'AdminPanel:reconPlayer',
}

export type AdminPanelPayloads = {
  [AdminPanelEvents.OpenSection]: {
    id: AdminPanelSections
  }
  [AdminPanelEvents.ChangeSetting]: {
    settingId: any
    content: SettingsInfoContentType
  } | null
  [AdminPanelEvents.DeleteFastAnswer]: {
    id: number
  }
  [AdminPanelEvents.AddFastAnswer]: {
    name: string
    value: string
    id: number | null
  }
  [AdminPanelEvents.OpenTicket]: {
    id: number
  }
  [AdminPanelEvents.TakeTicket]: {
    id: number
  }
  [AdminPanelEvents.GetStatByDate]: {
    uid: string
    firstDate: {
      day: number
      month: number
    }
    secondDate: {
      day: number
      month: number
    }
  }
  [AdminPanelEvents.GetAdminStatByDate]: {
    uid: string
    firstDate: {
      day: number
      month: number
    } | null
    secondDate: {
      day: number
      month: number
    } | null
  }
  [AdminPanelEvents.SetIsReadForReport]: {
    id: number
    status: boolean
  }
  [AdminPanelEvents.ClickTicketSecondaryButton]: {
    buttonId: ButtonTypes
    ticketId: number
  }
  [AdminPanelEvents.SendTicketMessage]: {
    id: number
    message: string
  }
  [AdminPanelEvents.RemovePunishment]: {
    id: number
  }
  [AdminPanelEvents.ChangeSetting]: {
    settingId: any
    content: SettingsInfoContentType
  } | null
  [AdminPanelEvents.ReconPlayer]: {
    uid: string
  }
}
