import { Region } from "../Regions/type"
import { Tab } from "./tabs"

export enum CreateCharacterEvents {
	UpdateRace = 'createCharacter:updateRace',
	UpdateGender = 'createCharacter:updateGender',
	UpdatePart = 'createCharacter:updatePart',
	SetName = 'createCharacter:setName',
	Reset = 'createCharacter:reset',
	Back = 'createCharacter:back',
	SendMouseCoords = 'createCharacter:sendMouseCoords',
	OnClickTab = 'createCharacter:onClickTab',
}

export enum CharEditorEvents {
	Save = 'chareditor:save',
	BackToSelectCharacter = 'chareditor:back',
	CheckName = 'chareditor:checkName',
	ResponseCheckName = 'chareditor:responseCheckName',
}

export type CreateCharacterTabPayload = {
    tabId: Tab
}

export type CreateCharacterSetNamePayload = {
	region: Region
	name: string
	age: number
}

export type SendMouseCoordsPayload = {
	x: number
	y: number
}

export type CreateCharacterResponseCheckNamePayload = {
	status: boolean
	region: Region
	name: string
	age: number
}