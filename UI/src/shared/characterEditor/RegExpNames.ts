import { Race } from '../Race/type'

export const RegExpNames: {
	FirstName: RegExp,
	LastName: Record<Race, { regExp: RegExp, error: string }>
} = {
	FirstName: /^[А-ЯЁ][а-яё]{1,9}$/,
	LastName: {
		[Race.Nord]: {
			regExp: /^[А-ЯЁ][а-яё]{2,11}$/,
			error: 'Error Nord Name',
		},
		[Race.Imperial]: {
			regExp: /^[А-ЯЁ][а-яё]{2,11}$/,
			error: 'Error Imperial Name',
		},
		[Race.Breton]: {
			regExp: /^[А-ЯЁ][а-яё]{2,11}$/,
			error: 'Error Breton Name',
		},
		[Race.HighElf]: {
			regExp: /^[А-ЯЁ][а-яё]{2,11}$/,
			error: 'Error HighElf Name',
		},
		[Race.WoodElf]: {
			regExp: /^[А-ЯЁ][а-яё]{2,11}$/,
			error: 'Error WoodElf Name',
		},
		[Race.DarkElf]: {
			regExp: /^[А-ЯЁ][а-яё]{2,11}$/,
			error: 'Error DarkElf Name',
		},
		[Race.Orc]: {
			regExp: /^[А-ЯЁ][а-яё]{2,11}$/,
			error: 'Error Orc Name',
		},
		[Race.Argonian]: {
			regExp: /^[А-ЯЁ][а-яё]{1,9}-?[А-ЯЁ]?[а-яё]{1,9}$/,
			error: 'Error Argonian Name',
		},
		[Race.Khajit]: {
			regExp: /^[А-ЯЁ][а-яё]{0,3}'?[А-ЯЁ]?[а-яё]{1,9}$/,
			error: 'Error Khajit Name',
		},
		[Race.Redguard]: {
			regExp: /^[А-ЯЁ][а-яё]{2,11}$/,
			error: 'Error Redguard Name',
		},
	},
}