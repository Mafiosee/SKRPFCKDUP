import { PageInfo } from './PageInfo'
import { PageNews } from './PageNews'
import { PageStaff } from './PageStaff'
import { PageControl } from './PageControl'
import { PageContracts } from './PageContracts'
import { PageType } from '../PageType'
import { PageUpgrades } from './PageUpgrades'
import { PageBank } from './PageBank'
import { PageEvents } from './PageEvents'
import { PageHistory } from './PageHistory'
import { PageAds } from './PageAds'
import { PageCivilWar } from './PageCivilWar'
import { PageWanted } from './PageWanted'

export type Page =
	| PageInfo
	| PageNews
	| PageStaff
	| PageControl
	| PageContracts
	| PageUpgrades
	| PageBank
	| PageEvents
	| PageHistory
	| PageAds
	| PageCivilWar
	| PageWanted

export const PagesOrder: PageType[] = [
	PageType.Info,
	PageType.News,
	PageType.Staff,
	PageType.Wanted,
	PageType.Control,
	PageType.Contracts,
	PageType.Upgrades,
	PageType.Bank,
	PageType.Events,
	PageType.History,
	PageType.Ads,
	PageType.CivilWar,
]

type Helper<T extends Page, K extends Page['type']> = T extends { type: K } ? T : never

export const isPageByType = <T extends PageType>(page: Page, type: T): page is Helper<Page, T> =>
	page.type === type

export function findPageByType<T extends PageType>(
	pages: Page[],
	type: T,
): Helper<Page, T> | undefined {
	for (const page of pages) {
		if (isPageByType(page, type)) {
			return page
		}
	}
	return undefined
}
