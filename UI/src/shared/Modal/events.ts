import { ComponentId, ComponentValue, ModalId } from './types'

export enum ModalEvents {
	Close = 'modal:close',
	ClickButton = 'modal:ClickButton',
}

export type ModalClosePayload = {
	modalId: ModalId
}

export type ModalClickButtonPayload = {
	modalId: ModalId
	values: Record<ComponentId, ComponentValue>
	buttonId: any
}
