import { Gender } from '../../types/gender'
import { Race } from '../../types/race'

export enum SlotType {
	Empty,
	Blocked,
}

export type Character =
	| {
			id: number
			name: string
			staticId: string
			gender: Gender
			race: Race
			balance: number
	  }
	| SlotType

export type SelectCharacterActionShowPayload = {
	characters: Character[]
	unlockPrice: number
}
