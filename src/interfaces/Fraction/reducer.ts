import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { findPageByType, Page } from '../../shared/Fraction/page'
import { PageType } from '../../shared/Fraction/PageType'
import { ContractCondition } from '../../shared/Fraction/contract/Condition'
import { FactionHash } from '../../shared/Fraction/FactionHash'
import { Race } from '../../shared/Race/type'
import { Gender } from '../../shared/characterEditor/enums/Genders'

type FractionState = {
	isOpen: boolean;
	factionHash: FactionHash;
	player: {
		name: string;
		rank: string;
	};
	pages: Page[];
};

const initialState: FractionState = {
	isOpen: false,
	factionHash: FactionHash.Dark_Brotherhood,
	player: {
		name: 'Люцио Серая Грива',
		rank: 'Новичек',
	},
	pages: [
		// 	{
		// 		type: PageType.News,
		// 		name: 'Новости',
		// 		news: [
		// 			{
		// 				id: 0,
		// 				sender: {
		// 					id: 12,
		// 					name: 'Люцио Серая Грива',
		// 					rank: {
		// 						name: 'Лидер',
		// 						number: 10,
		// 					},
		// 				},
		// 				text: 'Ясность нашей\nпозиции очевидна: понимание сути\nресурсосберегающих технологий говорит\nо\nвозможностях\nновых\nпринципов\nформирования материально-технической и кадровой базы. Сложно сказать, почему независимые государства будут обнародованы. Каждый из нас понимает очевидную вещь: базовый вектор развития в значительной степени обусловливает важность переосмысления внешнеэкономических политик. Предварительные выводы неутешительны: глубокий уровень погружения требует от анализа соответствующих условий.',
		// 				datetime: '21.12.2023 1:51',
		// 			},
		// 		],
		// 		hasControl: true,
		// 	},
		// 	{
		// 		type: PageType.Staff,
		// 		name: 'Участники',
		// 		list: [
		// 			{
		// 				id: 0,
		// 				name: 'Люцио Серая Грива',
		// 				rank: {
		// 					name: 'Лидер',
		// 					number: 10,
		// 				},
		// 				lastEnter: '21.12.2023 02:25',
		// 				isOnline: true,
		// 			},
		// 		],
		// 		hasControl: true,
		// 	},
		// 	{
		// 		type: PageType.Info,
		// 		name: 'Информация',
		// 		fractionName: 'Королевский шторм',
		// 		level: 5,
		// 		reputation: { current: 36790, max: 45000 },
		// 		staff: { current: 22, max: 50 },
		// 		stables: { current: 1, max: 3 },
		// 		bank: 91720,
		// 		canLeave: false,
		// 	},
		// 	{
		// 		type: PageType.Control,
		// 		name: 'Управление',
		// 		ranks: [{ id: 0, name: 'Ранг 0', number: 0 }],
		// 		permissions: {
		// 			addRank: true,
		// 			removeRank: true,
		// 			updateRank: true,
		// 		},
		// 	},
		// 	{
		// 		type: PageType.Contracts,
		// 		name: 'Контракты',
		// 		timeToUpdate: 23 * 60 * 60 * 1000 + 17 * 60 * 1000,
		// 		contracts: [
		// 			{
		// 				id: 0,
		// 				background: 'fishing',
		// 				condition: ContractCondition.Available,
		// 				name: 'Рыболовные дела',
		// 				task: 'Поймать 30 рыб',
		// 				reward: 1500,
		// 				timeToComplete: 12 * 60 * 60 * 1000,
		// 			},
		// 			{
		// 				id: 1,
		// 				background: 'hunting',
		// 				icon: 'hunting',
		// 				condition: ContractCondition.Started,
		// 				name: 'Сезон охоты',
		// 				task: 'Убить 12 животных',
		// 				reward: 3500,
		// 				timeToEnd: 4 * 60 * 60 * 1000 + 20 * 60 * 1000,
		// 				progress: { current: 2, max: 12 },
		// 			},
		// 			{
		// 				id: 2,
		// 				background: 'miner',
		// 				icon: 'miner',
		// 				condition: ContractCondition.Finished,
		// 				name: 'Шахтерские будни',
		// 				task: 'Добыть 20 руды',
		// 				reward: 2000,
		// 				progress: { current: 12, max: 12 },
		// 			},
		// 			{
		// 				id: 3,
		// 				condition: ContractCondition.Waiting,
		// 				timeToNext: 34 * 60 * 60 * 1000 + 42 * 60 * 1000,
		// 			},
		// 		],
		// 	},
		// 	{
		// 		type: PageType.Upgrades,
		// 		name: 'Улучшения',
		// 		level: 5,
		// 		balance: 342988,
		// 		upgrades: [
		// 			{
		// 				id: 0,
		// 				name: 'Улучшение 0',
		// 				description: '',
		// 				condition: UpgradeCondition.Available,
		// 				requirements: [],
		// 				price: { reputation: 1, money: 1 },
		// 				position: { x: 20, y: 0 },
		// 				links: [
		// 					{
		// 						from: Side.Left,
		// 						to: { upgradeId: StartPointId, side: Side.Right },
		// 					},
		// 				],
		// 			},
		// 			{
		// 				id: 1,
		// 				name: 'Улучшение 0',
		// 				description: '',
		// 				condition: UpgradeCondition.Available,
		// 				requirements: [],
		// 				price: { reputation: 1, money: 1 },
		// 				position: { x: 45, y: 0 },
		// 				links: [
		// 					{
		// 						from: Side.Left,
		// 						to: { upgradeId: 0, side: Side.Right },
		// 					},
		// 				],
		// 			},
		// 			{
		// 				id: 2,
		// 				name: 'Улучшение 1',
		// 				description: '',
		// 				condition: UpgradeCondition.Unlocked,
		// 				requirements: [],
		// 				price: { reputation: 1, money: 1 },
		// 				position: { x: -20, y: 0 },
		// 				links: [
		// 					{
		// 						from: Side.Right,
		// 						to: { upgradeId: StartPointId, side: Side.Left },
		// 					},
		// 				],
		// 			},
		// 			{
		// 				id: 3,
		// 				name: 'Улучшение 0',
		// 				description: '',
		// 				condition: UpgradeCondition.Available,
		// 				requirements: [],
		// 				price: { reputation: 1, money: 1 },
		// 				position: { x: -45, y: 0 },
		// 				links: [
		// 					{
		// 						from: Side.Right,
		// 						to: { upgradeId: 2, side: Side.Left },
		// 					},
		// 				],
		// 			},
		// 			{
		// 				id: 4,
		// 				name: 'Улучшение 0',
		// 				description: '',
		// 				condition: UpgradeCondition.Unlocked,
		// 				requirements: [],
		// 				price: { reputation: 1, money: 1 },
		// 				position: { x: -20, y: 15 },
		// 				links: [
		// 					{
		// 						from: Side.Right,
		// 						to: { upgradeId: StartPointId, side: Side.Bottom },
		// 					},
		// 				],
		// 			},
		// 			{
		// 				id: 5,
		// 				name: 'Улучшение 0',
		// 				description: '',
		// 				condition: UpgradeCondition.Available,
		// 				requirements: [],
		// 				price: { reputation: 1, money: 1 },
		// 				position: { x: -45, y: 8 },
		// 				links: [
		// 					{
		// 						from: Side.Right,
		// 						to: { upgradeId: 4, side: Side.Top },
		// 					},
		// 				],
		// 			},
		// 			{
		// 				id: 6,
		// 				name: 'Улучшение 0',
		// 				description: '',
		// 				condition: UpgradeCondition.Available,
		// 				requirements: [],
		// 				price: { reputation: 1, money: 1 },
		// 				position: { x: -45, y: 22 },
		// 				links: [
		// 					{
		// 						from: Side.Right,
		// 						to: { upgradeId: 4, side: Side.Bottom },
		// 					},
		// 				],
		// 			},
		// 			{
		// 				id: 7,
		// 				name: 'Улучшение 0',
		// 				description: '',
		// 				condition: UpgradeCondition.Available,
		// 				requirements: [],
		// 				price: { reputation: 1, money: 1 },
		// 				position: { x: -20, y: 30 },
		// 				links: [
		// 					{
		// 						from: Side.Right,
		// 						to: { upgradeId: StartPointId, side: Side.Bottom },
		// 					},
		// 				],
		// 			},
		// 			{
		// 				id: 8,
		// 				name: 'Улучшение 0',
		// 				description: '',
		// 				condition: UpgradeCondition.Available,
		// 				requirements: [],
		// 				price: { reputation: 1, money: 1 },
		// 				position: { x: -45, y: 37 },
		// 				links: [
		// 					{
		// 						from: Side.Right,
		// 						to: { upgradeId: 7, side: Side.Bottom },
		// 					},
		// 				],
		// 			},
		// 			{
		// 				id: 9,
		// 				name: 'Улучшение 0',
		// 				description: '',
		// 				condition: UpgradeCondition.Available,
		// 				requirements: [],
		// 				price: { reputation: 1, money: 1 },
		// 				position: { x: 20, y: 18 },
		// 				links: [
		// 					{
		// 						from: Side.Left,
		// 						to: { upgradeId: StartPointId, side: Side.Bottom },
		// 					},
		// 				],
		// 			},
		// 			{
		// 				id: 10,
		// 				name: 'Улучшение 0',
		// 				description: '',
		// 				condition: UpgradeCondition.Available,
		// 				requirements: [],
		// 				price: { reputation: 1, money: 1 },
		// 				position: { x: 45, y: 11 },
		// 				links: [
		// 					{
		// 						from: Side.Left,
		// 						to: { upgradeId: 9, side: Side.Top },
		// 					},
		// 				],
		// 			},
		// 			{
		// 				id: 11,
		// 				name: 'Улучшение 0',
		// 				description: '',
		// 				condition: UpgradeCondition.Available,
		// 				requirements: [],
		// 				price: { reputation: 1, money: 1 },
		// 				position: { x: 45, y: 25 },
		// 				links: [
		// 					{
		// 						from: Side.Left,
		// 						to: { upgradeId: 9, side: Side.Bottom },
		// 					},
		// 				],
		// 			},
		// 			{
		// 				id: 12,
		// 				name: 'Улучшение 0',
		// 				description: '',
		// 				condition: UpgradeCondition.Available,
		// 				requirements: [],
		// 				price: { reputation: 1, money: 1 },
		// 				position: { x: 20, y: 40 },
		// 				links: [
		// 					{
		// 						from: Side.Left,
		// 						to: { upgradeId: StartPointId, side: Side.Bottom },
		// 					},
		// 				],
		// 			},
		// 			{
		// 				id: 13,
		// 				name: 'Улучшение 0',
		// 				description: '',
		// 				condition: UpgradeCondition.Available,
		// 				requirements: [],
		// 				price: { reputation: 1, money: 1 },
		// 				position: { x: 45, y: 47 },
		// 				links: [
		// 					{
		// 						from: Side.Left,
		// 						to: { upgradeId: 12, side: Side.Bottom },
		// 					},
		// 				],
		// 			},
		// 		],
		// 	},
		// 	{
		// 		type: PageType.Bank,
		// 		name: 'Хранилище',
		// 		balance: 152720,
		// 		isWarehouseOpen: true,
		// 		logs: [
		// 			{
		// 				datetime: '20.03.2024 / 19:00',
		// 				action: 'Аргонианская Дева положил(а) на склад 10 шт. Зелье лечения',
		// 				type: LogType.Put,
		// 			},
		// 			{
		// 				datetime: '20.03.2024 / 19:00',
		// 				action: 'Аргонианская Дева положил(а) на склад 10 шт. Зелье лечения',
		// 				type: LogType.Take,
		// 			},
		// 			{
		// 				datetime: '20.03.2024 / 19:00',
		// 				action: 'Аргонианская Дева положил(а) на склад 10 шт. Зелье лечения',
		// 				type: LogType.Tax,
		// 			},
		// 		],
		// 	},
		// 	{
		// 		type: PageType.Events,
		// 		name: 'Крышевание',
		// 		events: [
		// 			{
		// 				id: 0,
		// 				background: '0',
		// 				name: 'Ферма Пелагино',
		// 				parameters: [
		// 					{ icon: 'star', name: 'Номер', value: '#222' },
		// 					{ icon: 'staff', name: 'Участники', value: '25' },
		// 				],
		// 				button: 'Учавствовать',
		// 			},
		// 		],
		// 	},
		// 	{
		// 		type: PageType.History,
		// 		name: 'История',
		// 		history: [
		// 			{
		// 				background: '0',
		// 				name: 'Полулунная лесопилка',
		// 				number: '#137',
		// 				parameters: [
		// 					{ icon: 'point', name: 'Месторасположение', value: 'Фолкрит' },
		// 					{ icon: 'sword', name: 'Захвачено', value: '18.12.2023 15:06' },
		// 				],
		// 			},
		// 		],
		// 	},
		// {
		// 	type: PageType.Ads,
		// 	name: 'Объявления',
		// 	ads: [{ id: 0, number: '0001', sender: 'Люцио Серая Грива' }],
		// },
		// 	{
		// 		type: PageType.CivilWar,
		// 		name: 'Карта войны',
		// 		zones: [
		// 			{
		// 				id: ZoneId.Haafingar_0,
		// 				owner: CivilWarMembers.Empire,
		// 				isSpawn: true,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Reach_0,
		// 				owner: CivilWarMembers.Empire,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Reach_1,
		// 				owner: CivilWarMembers.Empire,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Reach_2,
		// 				owner: CivilWarMembers.Empire,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Reach_3,
		// 				owner: CivilWarMembers.Empire,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Reach_4,
		// 				owner: CivilWarMembers.Empire,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Reach_5,
		// 				owner: CivilWarMembers.Empire,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Hjaaalmarch_0,
		// 				owner: CivilWarMembers.Empire,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Hjaaalmarch_1,
		// 				owner: CivilWarMembers.Empire,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Hjaaalmarch_2,
		// 				owner: CivilWarMembers.Empire,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Hjaaalmarch_3,
		// 				owner: CivilWarMembers.Empire,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Hjaaalmarch_4,
		// 				owner: CivilWarMembers.Empire,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Hjaaalmarch_5,
		// 				owner: CivilWarMembers.Empire,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Winterhold_0,
		// 				owner: CivilWarMembers.Empire,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Winterhold_1,
		// 				owner: CivilWarMembers.Empire,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Winterhold_2,
		// 				owner: CivilWarMembers.Empire,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Winterhold_3,
		// 				owner: CivilWarMembers.Empire,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Winterhold_4,
		// 				owner: CivilWarMembers.Empire,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Winterhold_5,
		// 				owner: CivilWarMembers.Empire,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Pale_0,
		// 				owner: CivilWarMembers.Empire,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Pale_1,
		// 				owner: CivilWarMembers.Empire,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Pale_2,
		// 				owner: CivilWarMembers.Empire,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Pale_3,
		// 				owner: CivilWarMembers.Empire,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Pale_4,
		// 				owner: CivilWarMembers.Empire,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Pale_5,
		// 				owner: CivilWarMembers.Empire,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Whiterun_0,
		// 				owner: CivilWarMembers.Empire,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Whiterun_1,
		// 				owner: CivilWarMembers.Empire,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Whiterun_2,
		// 				owner: CivilWarMembers.Empire,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Whiterun_3,
		// 				owner: CivilWarMembers.StormCloaks,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Whiterun_4,
		// 				owner: CivilWarMembers.StormCloaks,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Whiterun_5,
		// 				owner: CivilWarMembers.StormCloaks,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Falkreath_0,
		// 				owner: CivilWarMembers.StormCloaks,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Falkreath_1,
		// 				owner: CivilWarMembers.StormCloaks,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Falkreath_2,
		// 				owner: CivilWarMembers.StormCloaks,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Falkreath_3,
		// 				owner: CivilWarMembers.StormCloaks,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Falkreath_4,
		// 				owner: CivilWarMembers.StormCloaks,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Falkreath_5,
		// 				owner: CivilWarMembers.StormCloaks,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Eastmarch_0,
		// 				owner: CivilWarMembers.StormCloaks,
		// 				isSpawn: true,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Rift_0,
		// 				owner: CivilWarMembers.StormCloaks,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Rift_1,
		// 				owner: CivilWarMembers.StormCloaks,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Rift_2,
		// 				owner: CivilWarMembers.StormCloaks,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Rift_3,
		// 				owner: CivilWarMembers.StormCloaks,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Rift_4,
		// 				owner: CivilWarMembers.StormCloaks,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 			{
		// 				id: ZoneId.Rift_5,
		// 				owner: CivilWarMembers.StormCloaks,
		// 				isSpawn: false,
		// 				captureDatetime: '18.12.2023 15:06',
		// 				canCapture: true,
		// 			},
		// 		],
		// 	},
		// {
		// 	type: PageType.Wanted,
		// 	name: 'Розыскиваемые',
		// 	wantedPeoples: [
		// 		{
		// 			id: 0,
		// 			race: Race.Nord,
		// 			gender: Gender.Male,
		// 			name: 'Луцио Серая Грива',
		// 			reason: {
		// 				short: 'Убийство',
		// 				full: 'произвел зверское убийство на глазах всего города',
		// 			},
		// 			type: 'Серийный маньяк',
		// 			date: '09.10.2024',
		// 		},
		// 		{
		// 			id: 1,
		// 			race: Race.Nord,
		// 			gender: Gender.Female,
		// 			name: 'Афродита Данко',
		// 			reason: {
		// 				short: 'Убийство',
		// 				full: 'произвел зверское убийство на глазах всего города',
		// 			},
		// 			type: 'Серийный маньяк',
		// 			date: '09.10.2024',
		// 			closedInfo: {
		// 				catcherName: 'Бруно Минарди',
		// 				releaseDatetime: '22.10.2024 20:47',
		// 			},
		// 		},
		// 	],
		// },
	],
}

export const fractionSlice = createSlice({
	name: 'fraction',
	initialState,
	reducers: {
		show(state) {
			state.isOpen = true
		},
		hide(state) {
			state.isOpen = false
		},
		setFactionHash(state, action: PayloadAction<FactionHash>) {
			state.factionHash = action.payload
		},
		setPlayer(state, action: PayloadAction<{ name: string; rank: string }>) {
			state.player = action.payload
		},
		setPages(state, action: PayloadAction<Page[]>) {
			state.pages = action.payload
		},
		updatePage(state, action: PayloadAction<Page>) {
			state.pages = state.pages.map((page) =>
				page.type === action.payload.type
					? { ...page, ...action.payload }
					: page,
			)
		},
		addPage(state, action: PayloadAction<Page>) {
			if (state.pages.some((page) => page.type === action.payload.type)) {
				return
			}
			state.pages.push(action.payload)
		},
		removePage(state, action: PayloadAction<PageType>) {
			const index = state.pages.findIndex(
				(page) => page.type === action.payload,
			)
			if (index === -1) {
				return
			}
			state.pages.splice(index, 1)
		},

		// Только для фронта

		decrementTimes(state) {
			const pageContracts = findPageByType(state.pages, PageType.Contracts)
			if (pageContracts) {
				if (pageContracts.timeToUpdate >= 1000) {
					pageContracts.timeToUpdate -= 1000
				}
				if (pageContracts.contracts.length) {
					for (let i = 0; i < pageContracts.contracts.length; i++) {
						const contract = pageContracts.contracts[i]
						switch (contract.condition) {
							case ContractCondition.Available:
								if (contract.timeToComplete >= 1000) {
									contract.timeToComplete -= 1000
								}
								break
							case ContractCondition.Started:
								if (contract.timeToEnd >= 1000) {
									contract.timeToEnd -= 1000
								}
								break
							case ContractCondition.Waiting:
								if (contract.timeToNext >= 1000) {
									contract.timeToNext -= 1000
								}
								break
						}
					}
				}
			}
		},
	},
})

export const fractionReducer = fractionSlice.reducer
export const fractionActions = fractionSlice.actions
