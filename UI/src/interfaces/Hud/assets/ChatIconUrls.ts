import { Race } from '../../../shared/Race/type'
import { Gender } from '../../../shared/characterEditor/enums/Genders'
import { SenderStatuses } from '../../../shared/Hud/types'

export const ChatStatusIconUrls: Record<SenderStatuses, { background: string, content: string }> = {
	[SenderStatuses.Player]: {
		background: require('./images/Chat/icon-server.svg'),
		content: require('./images/Chat/content-server.png'),
	},
	[SenderStatuses.Admin]: {
		background: require('./images/Chat/icon-admin.svg'),
		content: require('./images/Chat/content-server.png'),
	},
	[SenderStatuses.Server]: {
		background: require('./images/Chat/icon-server.svg'),
		content: require('./images/Chat/content-server.png'),
	},
}

export const ChatRaceIconUrls: Record<Race, Record<Gender, string>> = {
	[Race.Argonian]: {
		[Gender.Male]: require('./images/Chat/race/argonian-male.png'),
		[Gender.Female]: require('./images/Chat/race/argonian-female.png'),
	},
	[Race.Breton]: {
		[Gender.Male]: require('./images/Chat/race/breton-male.png'),
		[Gender.Female]: require('./images/Chat/race/breton-female.png'),
	},
	[Race.DarkElf]: {
		[Gender.Male]: require('./images/Chat/race/darkElf-male.png'),
		[Gender.Female]: require('./images/Chat/race/darkElf-female.png'),
	},
	[Race.HighElf]: {
		[Gender.Male]: require('./images/Chat/race/highElf-male.png'),
		[Gender.Female]: require('./images/Chat/race/highElf-female.png'),
	},
	[Race.Imperial]: {
		[Gender.Male]: require('./images/Chat/race/imperial-male.png'),
		[Gender.Female]: require('./images/Chat/race/imperial-female.png'),
	},
	[Race.Khajit]: {
		[Gender.Male]: require('./images/Chat/race/khajit-male.png'),
		[Gender.Female]: require('./images/Chat/race/khajit-female.png'),
	},
	[Race.Nord]: {
		[Gender.Male]: require('./images/Chat/race/nord-male.png'),
		[Gender.Female]: require('./images/Chat/race/nord-female.png'),
	},
	[Race.Orc]: {
		[Gender.Male]: require('./images/Chat/race/orc-male.png'),
		[Gender.Female]: require('./images/Chat/race/orc-female.png'),
	},
	[Race.Redguard]: {
		[Gender.Male]: require('./images/Chat/race/redguard-male.png'),
		[Gender.Female]: require('./images/Chat/race/redguard-female.png'),
	},
	[Race.WoodElf]: {
		[Gender.Male]: require('./images/Chat/race/woodElf-male.png'),
		[Gender.Female]: require('./images/Chat/race/woodElf-female.png'),
	},
}