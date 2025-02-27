import { Race } from '../Race/type'

export const AgeLimits: Record<Race, { min: number, max: number }> = {
	[Race.Nord]: { min: 18, max: 80 },
	[Race.Imperial]: { min: 18, max: 80 },
	[Race.Breton]: { min: 18, max: 80 },
	[Race.HighElf]: { min: 18, max: 500 },
	[Race.WoodElf]: { min: 18, max: 400 },
	[Race.DarkElf]: { min: 18, max: 300 },
	[Race.Orc]: { min: 18, max: 70 },
	[Race.Argonian]: { min: 18, max: 120 },
	[Race.Khajit]: { min: 18, max: 80 },
	[Race.Redguard]: { min: 18, max: 80 },
}