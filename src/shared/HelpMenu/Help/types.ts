/** HELP */
import { ButtonsIds } from './config'

/** Help content */
export enum HelpPagesIds {
	Jobs,
	Factions,
	Business,
	OtherSystems,
	GameRules,
}

export const HelpPagesNames: Record<HelpPagesIds, string> = {
	[HelpPagesIds.Jobs]: 'Работы',
	[HelpPagesIds.Business]: 'Бизнесы',
	[HelpPagesIds.Factions]: 'Фракции',
	[HelpPagesIds.OtherSystems]: 'Другие системы',
	[HelpPagesIds.GameRules]: 'Игровые правила',
}

export type ButtonType = {
	name: string;
	icon: string;
	id: ButtonsIds;
};

export type SubsectionContent = {
	subsectionInfo?: SubsectionInfoType;
	name: string;
	text: string;
	image: string;
	subtitle?: string;
	button?: ButtonType;
};

export type SectionContentType = {
	subcategories: SubsectionContent[];
};

export type SectionType = {
	name: string;
	image?: string
	title: string
	description: string | string[]
};

export type HelpPageType = {
	sections: SectionType[];
};

export type SubsectionInfoType = {
	name: string;
	icon?: string;
};

/** Rules content */
export type RuleType = {
	name: string;
	content: string[];
};

export type RulePageType = {
	id: HelpPagesIds;
	name: string;
	sections: RuleType[];
};
