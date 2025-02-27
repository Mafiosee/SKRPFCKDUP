import { Gender } from '../../../types/gender'
import { Race } from '../../../types/race'

type RacePed = {
	[Gender.Male]: unknown
	[Gender.Female]: unknown
}

type PedsType = {
	[Race.Nord]: RacePed
	[Race.Imperial]: RacePed
	[Race.Orc]: RacePed
	[Race.Argonian]: RacePed
	[Race.DarkElf]: RacePed
	[Race.HighElf]: RacePed
	[Race.Breton]: RacePed
	[Race.WoodElf]: RacePed
	[Race.Khajit]: RacePed
	[Race.Redguard]: RacePed
}

export const Peds: PedsType = {
	[Race.Nord]: {
		[Gender.Male]: require('./images/peds/nords-male.png'),
		[Gender.Female]: require('./images/peds/nords-female.png'),
	},
	[Race.Imperial]: {
		[Gender.Male]: require('./images/peds/imperials-male.png'),
		[Gender.Female]: require('./images/peds/imperials-female.png'),
	},
	[Race.Orc]: {
		[Gender.Male]: require('./images/peds/orcs-male.png'),
		[Gender.Female]: require('./images/peds/orcs-female.png'),
	},
	[Race.Argonian]: {
		[Gender.Male]: require('./images/peds/argonians-male.png'),
		[Gender.Female]: require('./images/peds/argonians-female.png'),
	},
	[Race.DarkElf]: {
		[Gender.Male]: require('./images/peds/darkElves-male.png'),
		[Gender.Female]: require('./images/peds/darkElves-female.png'),
	},
	[Race.HighElf]: {
		[Gender.Male]: require('./images/peds/highElves-male.png'),
		[Gender.Female]: require('./images/peds/highElves-female.png'),
	},
	[Race.Breton]: {
		[Gender.Male]: require('./images/peds/bretons-male.png'),
		[Gender.Female]: require('./images/peds/bretons-female.png'),
	},
	[Race.WoodElf]: {
		[Gender.Male]: require('./images/peds/forestElves-male.png'),
		[Gender.Female]: require('./images/peds/forestElves-female.png'),
	},
	[Race.Khajit]: {
		[Gender.Male]: require('./images/peds/khajits-male.png'),
		[Gender.Female]: require('./images/peds/khajits-female.png'),
	},
	[Race.Redguard]: {
		[Gender.Male]: require('./images/peds/regards-male.png'),
		[Gender.Female]: require('./images/peds/regards-female.png'),
	},
}
