import { ComponentTypes, Parts, ValuesKeys } from './types'
import { Race } from '../../types/race'
import { Gender } from '../../types/gender'

export const RaceComponents = [
	{
		id: ValuesKeys.Race,
		type: ComponentTypes.Race,
		list: [
			{ id: Race.Nord, name: 'Норды' },
			{ id: Race.Imperial, name: 'Имперцы' },
			{ id: Race.Orc, name: 'Орки' },
			{ id: Race.Argonian, name: 'Аргониане' },
			{ id: Race.DarkElf, name: 'Темные Эльфы' },
			{ id: Race.HighElf, name: 'Высшие Эльфы' },
			{ id: Race.Breton, name: 'Бретонцы' },
			{ id: Race.WoodElf, name: 'Лесные Эльфы' },
			{ id: Race.Khajit, name: 'Каджиты' },
			{ id: Race.Redguard, name: 'Редгарды' },
		],
	},
]

export const BodyComponents = [
	{
		id: ValuesKeys.Gender,
		type: ComponentTypes.Select,
		title: 'Пол',
		list: [
			{ id: Gender.Male, name: 'Мужской' },
			{ id: Gender.Female, name: 'Женский' },
		],
	},
	// {
	// 	id: ValuesKeys.BodyType,
	// 	type: ComponentTypes.Select,
	// 	title: 'Типаж',
	// 	part: Parts.Preset,
	// },
	{
		id: ValuesKeys.SkinColor,
		type: ComponentTypes.Color,
		title: 'Тон кожи',
		part: Parts.Body,
		hasAlpha: true,
	},
	{
		id: ValuesKeys.Weight,
		type: ComponentTypes.Range,
		title: 'Вес',
		step: 1,
		helper: '%',
		part: Parts.Body,
	},
]

export const HeadComponents: any = [
	{
		id: ValuesKeys.Dirt,
		type: ComponentTypes.SelectWithColor,
		colorKey: ValuesKeys.DirtColor,
		title: 'Грязь',
		colorTitle: 'Цвет грязи',
		part: Parts.Head,
		hasAlpha: true,
	},
	{
		id: ValuesKeys.Scars,
		type: ComponentTypes.Select,
		title: 'Шрамы',
		part: Parts.Head,
	},
]

export const FaceComponents: any = [
	{
		id: ValuesKeys.NoseType,
		type: ComponentTypes.Select,
		title: 'Тип носа',
		part: Parts.Face,
	},
	{
		id: ValuesKeys.NoseHeight,
		type: ComponentTypes.Range,
		title: 'Длина носа',
		step: 0.1,
		part: Parts.Face,
	},
	{
		id: ValuesKeys.NoseLength,
		type: ComponentTypes.Range,
		title: 'Высота носа',
		step: 0.1,
		part: Parts.Face,
	},
	{
		id: ValuesKeys.JawWidth,
		type: ComponentTypes.Range,
		title: 'Ширина челюсти',
		step: 0.1,
		part: Parts.Face,
	},
	{
		id: ValuesKeys.JawHeight,
		type: ComponentTypes.Range,
		title: 'Высота челюсти',
		step: 0.1,
		part: Parts.Face,
	},
	{
		id: ValuesKeys.CheekboneHeight,
		type: ComponentTypes.Range,
		title: 'Высота скул',
		step: 0.1,
		part: Parts.Face,
	},
	{
		id: ValuesKeys.CheekboneWidth,
		type: ComponentTypes.Range,
		title: 'Ширина скул',
		step: 0.1,
		part: Parts.Face,
	},
	{
		id: ValuesKeys.CheekColor,
		type: ComponentTypes.Color,
		title: 'Цвет щёк',
		part: Parts.Face,
		hasAlpha: true,
	},
	{
		id: ValuesKeys.UnderCheekColor,
		type: ComponentTypes.Color,
		title: 'Цвет щёк (низ)',
		part: Parts.Face,
		hasAlpha: true,
	},
	{
		id: ValuesKeys.UnderNoseColor,
		type: ComponentTypes.Color,
		title: 'Цвет области под носом',
		part: Parts.Face,
		hasAlpha: true,
	},
	{
		id: ValuesKeys.NoseColor,
		type: ComponentTypes.Color,
		title: 'Цвет носа',
		part: Parts.Face,
		hasAlpha: true,
	},
	{
		id: ValuesKeys.ChinColor,
		type: ComponentTypes.Color,
		title: 'Цвет подбородка',
		part: Parts.Face,
		hasAlpha: true,
	},
	{
		id: ValuesKeys.NeckColor,
		type: ComponentTypes.Color,
		title: 'Цвет шеи',
		part: Parts.Face,
		hasAlpha: true,
	},
	{
		id: ValuesKeys.ForeheadColor,
		type: ComponentTypes.Color,
		title: 'Цвет лба',
		part: Parts.Face,
		hasAlpha: true,
	},
]

export const EyesComponents: any = [
	{
		id: ValuesKeys.EyesForm,
		type: ComponentTypes.Select,
		title: 'Форма глаз',
		part: Parts.Eyes,
	},
	{
		id: ValuesKeys.EyesColor,
		type: ComponentTypes.Select,
		title: 'Цвет глаз',
		part: Parts.Eyes,
	},
	{
		id: ValuesKeys.EyesHeight,
		type: ComponentTypes.Range,
		title: 'Высота глаз',
		step: 0.1,
		part: Parts.Eyes,
	},
	{
		id: ValuesKeys.EyesDistance,
		type: ComponentTypes.Range,
		title: 'Расстояние между глазами',
		step: 0.1,
		part: Parts.Eyes,
	},
	{
		id: ValuesKeys.EyesDeep,
		type: ComponentTypes.Range,
		title: 'Глубина глазниц',
		step: 0.1,
		part: Parts.Eyes,
	},
	{
		id: ValuesKeys.EyelinerColor,
		type: ComponentTypes.Color,
		title: 'Цвет подводки',
		part: Parts.Eyes,
	},
	{
		id: ValuesKeys.EyeShadowTopColor,
		type: ComponentTypes.Color,
		title: 'Тени (верхнее веко)',
		part: Parts.Eyes,
	},
	{
		id: ValuesKeys.EyeShadowBotColor,
		type: ComponentTypes.Color,
		title: 'Тени (нижнее веко)',
		part: Parts.Eyes,
	},
]

export const BrowsComponents: any = [
	{
		id: ValuesKeys.BrowType,
		type: ComponentTypes.Select,
		title: 'Тип бровей',
		part: Parts.Eyebrows,
	},
	{
		id: ValuesKeys.BrowHeight,
		type: ComponentTypes.Range,
		title: 'Высота бровей',
		step: 0.1,
		part: Parts.Eyebrows,
	},
	{
		id: ValuesKeys.BrowWidth,
		type: ComponentTypes.Range,
		title: 'Ширина бровей',
		step: 0.1,
		part: Parts.Eyebrows,
	},
	{
		id: ValuesKeys.BrowDeep,
		type: ComponentTypes.Range,
		title: 'Брови вперёд',
		step: 0.1,
		part: Parts.Eyebrows,
	},
]

export const MouthComponents: any = [
	{
		id: ValuesKeys.LipsForm,
		type: ComponentTypes.Select,
		title: 'Форма губ',
		part: Parts.Mouth,
	},
	{
		id: ValuesKeys.LipsHeight,
		type: ComponentTypes.Range,
		title: 'Высота губ',
		step: 0.1,
		part: Parts.Mouth,
	},
	{
		id: ValuesKeys.LipsDeep,
		type: ComponentTypes.Range,
		title: 'Губы вперёд',
		step: 0.1,
		part: Parts.Mouth,
	},
	{
		id: ValuesKeys.ChinWidth,
		type: ComponentTypes.Range,
		title: 'Ширина подбородка',
		step: 0.1,
		part: Parts.Mouth,
	},
	{
		id: ValuesKeys.ChinLength,
		type: ComponentTypes.Range,
		title: 'Длина подбородка',
		step: 0.1,
		part: Parts.Mouth,
	},
	{
		id: ValuesKeys.ChinDeep,
		type: ComponentTypes.Range,
		title: 'Подбородок вперёд',
		step: 0.1,
		part: Parts.Mouth,
	},
	{
		id: ValuesKeys.LipsColor,
		type: ComponentTypes.Color,
		title: 'Цвет губ',
		part: Parts.Mouth,
	},
]

export const HairsComponents: any = [
	{
		id: ValuesKeys.HairStyle,
		type: ComponentTypes.Select,
		title: 'Причёска',
		part: Parts.Hair,
	},
	{
		id: ValuesKeys.BeardStyle,
		type: ComponentTypes.Select,
		title: 'Борода и усы',
		part: Parts.Hair,
	},
	{
		id: ValuesKeys.HairColor,
		type: ComponentTypes.Color,
		title: 'Цвет волос',
		part: Parts.Hair,
	},
]

export const ClothesComponents: any = [
	{
		id: ValuesKeys.ClothesTop,
		type: ComponentTypes.Clothes,
		title: 'Верхняя одежда',
		list: [
			{ id: 0, name: 'Без Верхей Одежды', image: 'noBody' },
			{ id: 1, name: 'Сыромятная одежда', image: 'body' },
		],
	},
	{
		id: ValuesKeys.ClothesShoes,
		type: ComponentTypes.Clothes,
		title: 'Обувь',
		list: [
			{ id: 0, name: 'Без Обуви', image: 'noBoots' },
			{ id: 1, name: 'Сыромятная обувь', image: 'boots' },
		],
	},
]
