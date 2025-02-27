import { SkillHashes } from './PersonSkills'

export type SkillData = {
	level: number
	experience: number
}

export type Skills = Record<SkillHashes, SkillData>

export enum MoneyType {
	CASH,
	BANK,
}

export enum StatsType {
	HUNGER,
	THIRST,
}

//STAMINA
export const MAXIMUM_PLAYER_STAMIN = 100
export const MINIMUM_PLAYER_STAMIN = 0

export const REQUIRED_STAMIN_FOR_ATTACK = 5
export const REQUIRED_STAMINA_FOR_JUMP = 5
export const REQUIRED_STAMINA_FOR_DODGE = 10
export const REQUIRED_STAMINA_FOR_SPRINT_PER_SECOND = 7
export const REQUIRED_STAMINA_FOR_DODGING = 10
export const REQUIRED_STAMINA_FOR_BLOCK = 5
export const RECOVERY_STAMIN_PER_SECOND = 5

export const TIME_TO_RECOVERY_STAMIN = 2 * 1000

//HEALTH
export const MAXIMUM_HEALTH_OF_PLAYER = 100
export const MINIMUM_HEALTH_OF_PLAYER = 0

//SPEED HACK
export const DEFAULT_SPEED_MULT = 100
