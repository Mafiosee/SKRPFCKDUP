import { Race } from '../Race/type'
import { CharacterEditorService } from './characterEditor.service'
import { Gender } from './enums/Genders'
import { Parts } from './enums/Parts'

export class CharacterEditorController {
	static getData(race: Race, gender: Gender, part: Parts) {
		return CharacterEditorService.getDataQuery(race, gender, part)
	}

	static getPresets(race: Race, gender: Gender) {
		return CharacterEditorService.getPresetsQuery(race, gender)
	}
}
