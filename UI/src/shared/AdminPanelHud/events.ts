import { MovingElementBase } from './type'

export enum AdminPanelHudEvents {
	Close = 'AdminPanelHud:close',
	ConfirmAction = 'AdminPanelHud:confirmAction',
	ChangeElementPosition = 'AdminPanelHud:changeElementPosition',
	OffEditMode = 'AdminPanelHud:offEditMode',
	SaveEditMode = 'AdminPanelHud:saveEditMode',
}

export type AdminPanelHudPayloads = {
	[AdminPanelHudEvents.Close]: null
	[AdminPanelHudEvents.ConfirmAction]: {
		playerUID: string
		buttonId: any
		time?: number
		percent?: number
		pointId?: any
		otherPointsId?: any[]
	}
	[AdminPanelHudEvents.ChangeElementPosition]: {
		id: any
		positions: {
			x: number
			y: number
		}
	}
	[AdminPanelHudEvents.SaveEditMode]: {
		elements: MovingElementBase[]
	}
}
