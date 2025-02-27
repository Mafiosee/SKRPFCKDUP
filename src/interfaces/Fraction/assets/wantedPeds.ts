import { Race } from '../../../shared/Race/type'
import { Gender } from '../../../shared/characterEditor/enums/Genders'

export const WantedPeds: Record<Race, Record<Gender, string>> = {
	[Race.Argonian]: {
		[Gender.Male]: require('./images/PageWanted/peds/argonian-male.png'),
		[Gender.Female]: require('./images/PageWanted/peds/argonian-female.png'),
	},
	[Race.Breton]: {
		[Gender.Male]: require('./images/PageWanted/peds/breton-male.png'),
		[Gender.Female]: require('./images/PageWanted/peds/breton-female.png'),
	},
	[Race.DarkElf]: {
		[Gender.Male]: require('./images/PageWanted/peds/darkElf-male.png'),
		[Gender.Female]: require('./images/PageWanted/peds/darkElf-female.png'),
	},
	[Race.HighElf]: {
		[Gender.Male]: require('./images/PageWanted/peds/highElf-male.png'),
		[Gender.Female]: require('./images/PageWanted/peds/highElf-female.png'),
	},
	[Race.Imperial]: {
		[Gender.Male]: require('./images/PageWanted/peds/imperial-male.png'),
		[Gender.Female]: require('./images/PageWanted/peds/imperial-female.png'),
	},
	[Race.Khajit]: {
		[Gender.Male]: require('./images/PageWanted/peds/khajit-male.png'),
		[Gender.Female]: require('./images/PageWanted/peds/khajit-female.png'),
	},
	[Race.Nord]: {
		[Gender.Male]: require('./images/PageWanted/peds/nord-male.png'),
		[Gender.Female]: require('./images/PageWanted/peds/nord-female.png'),
	},
	[Race.Orc]: {
		[Gender.Male]: require('./images/PageWanted/peds/orc-male.png'),
		[Gender.Female]: require('./images/PageWanted/peds/orc-female.png'),
	},
	[Race.Redguard]: {
		[Gender.Male]: require('./images/PageWanted/peds/redguard-male.png'),
		[Gender.Female]: require('./images/PageWanted/peds/redguard-female.png'),
	},
	[Race.WoodElf]: {
		[Gender.Male]: require('./images/PageWanted/peds/woodElf-male.png'),
		[Gender.Female]: require('./images/PageWanted/peds/woodElf-female.png'),
	},
}