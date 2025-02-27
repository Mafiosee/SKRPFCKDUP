import { Gender } from './enums/Genders'
import { Parts } from './enums/Parts'
import { characterConfig } from './characterConfig'
import { Race } from '../Race/type'

export class CharacterEditorService {
	static getDataQuery(race: Race, gender: Gender, part: Parts) {
		const characterData = characterConfig.find(item => item.raceId === race)

		if (characterData !== undefined) {
			const requestedData = characterData[gender][part]

			return requestedData
		}
	}

	static getPresetsQuery(race: Race, gender: Gender) {
		const characterData = characterConfig.find(item => item.raceId === race)

		if (characterData !== undefined) {
			const requestedData = characterData[gender].presetIndexes

			return requestedData
		}
	}
}
