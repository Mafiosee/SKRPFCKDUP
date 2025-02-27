import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import {
	AdminInfo,
	AdminInfoType,
	AdminLvlInfo,
	AdminPanelSections,
	APanelSection,
	FactionLeaders,
	FastAnswerType,
	MyStatDayType,
	PunishedPlayerType,
	ReportCategories,
	SenderStatus,
	SettingInfo,
	TicketContentType,
	TicketMessage,
	TicketType,
} from '../../shared/AdminPanel/type'
import { ReportReason } from '../../shared/Tickets/type'

type AdminPanel = {
	isOpen: boolean;
	sections: APanelSection[];
	adminInfo: AdminInfoType;
	commands: AdminLvlInfo[];
	settings: SettingInfo[];
	punishedPlayers: PunishedPlayerType[];
	reportCategories: ReportCategories;
	factionLeaders: FactionLeaders[];
	myStat: {
		days: MyStatDayType[],
		date: string;
	};
	adminStats: {
		stat: {
			days: MyStatDayType[],
			date: string;
		}
		admins: AdminInfo[]
	};
	tickets: TicketType[];
	ticketContent: TicketContentType | null;
	fastAnswers: FastAnswerType[];
};

const initialState: AdminPanel = {
	isOpen: false,
	sections: [
		{
			id: AdminPanelSections.Tickets,
			name: 'Тикеты',
			hasNotify: true,
		},
		{
			id: AdminPanelSections.Commands,
			name: 'Команды',
		},
		{
			id: AdminPanelSections.Settings,
			name: 'Настройки',
		},
		{
			id: AdminPanelSections.MyStat,
			name: 'Моя статистика',
		},
	],
	adminInfo: {
		name: '',
		lvl: 0,
		uid: '',
	},
	// bugs: [],
	adminStats: {
		stat: {
			date: '01.02.2024 13:30:55',
			days: [
				// {
				//     date: "10.02",
				//     time: 1,
				//     tickets: 2,
				//     reports: 3,
				//     demorgans: 6,
				//     mutes: 8,
				//     warns: 12,
				//     bans: 9,
				// },
				// {
				//     date: "11.02",
				//     time: 333,
				//     tickets: 44,
				//     reports: 44,
				//     demorgans: 6,
				//     mutes: 8,
				//     warns: 12,
				//     bans: 9,
				// },
				// {
				//     date: "12.02",
				//     time: 22,
				//     tickets: 44,
				//     reports: 55,
				//     demorgans: 644,
				//     mutes: 8,
				//     warns: 12,
				//     bans: 9,
				// },
				// {
				//     date: "13.02",
				//     time: 33,
				//     tickets: 44,
				//     reports: 55,
				//     demorgans: 6,
				//     mutes: 813,
				//     warns: 12,
				//     bans: 9,
				// },
				// {
				//     date: "14.02",
				//     time: 444,
				//     tickets: 44,
				//     reports: 55,
				//     demorgans: 6,
				//     mutes: 8,
				//     warns: 12,
				//     bans: 9,
				// },
				// {
				//     date: "15.02",
				//     time: 555,
				//     tickets: 44,
				//     reports: 5544,
				//     demorgans: 6,
				//     mutes: 8,
				//     warns: 12,
				//     bans: 9,
				// },
				// {
				//     date: "10.02",
				//     time: 666,
				//     tickets: 4455,
				//     reports: 55,
				//     demorgans: 6,
				//     mutes: 8,
				//     warns: 12,
				//     bans: 9,
				// },
				// {
				//     date: "11.02",
				//     time: 155555,
				//     tickets: 44,
				//     reports: 2,
				//     demorgans: 6,
				//     mutes: 8,
				//     warns: 12,
				//     bans: 9,
				// },
				// {
				//     date: "12.02",
				//     time: 55555,
				//     tickets: 44,
				//     reports: 55,
				//     demorgans: 1,
				//     mutes: 8,
				//     warns: 12,
				//     bans: 9,
				// },
				// {
				//     date: "13.02",
				//     time: 44444,
				//     tickets: 44,
				//     reports: 55,
				//     demorgans: 12,
				//     mutes: 813,
				//     warns: 12,
				//     bans: 9,
				// },
				// {
				//     date: "14.02",
				//     time: 33333,
				//     tickets: 44,
				//     reports: 55,
				//     demorgans: 16,
				//     mutes: 8,
				//     warns: 12,
				//     bans: 9,
				// },
				// {
				//     date: "15.02",
				//     time: 22222,
				//     tickets: 44,
				//     reports: 5544,
				//     demorgans: 6,
				//     mutes: 8,
				//     warns: 12,
				//     bans: 9,
				// },
				// {
				//     date: "10.02",
				//     time: 10000,
				//     tickets: 4455,
				//     reports: 55,
				//     demorgans: 6,
				//     mutes: 8,
				//     warns: 12,
				//     bans: 9,
				// },
				// {
				//     date: "11.02",
				//     time: 155555,
				//     tickets: 44,
				//     reports: 5555,
				//     demorgans: 6,
				//     mutes: 8,
				//     warns: 12,
				//     bans: 9,
				// },
				// {
				//     date: "12.02",
				//     time: 55555,
				//     tickets: 44,
				//     reports: 55,
				//     demorgans: 644,
				//     mutes: 8,
				//     warns: 12,
				//     bans: 9,
				// },
				// {
				//     date: "13.02",
				//     time: 44444,
				//     tickets: 44,
				//     reports: 55,
				//     demorgans: 6,
				//     mutes: 813,
				//     warns: 12,
				//     bans: 9,
				// },
				// {
				//     date: "14.02",
				//     time: 33333,
				//     tickets: 44,
				//     reports: 55,
				//     demorgans: 6,
				//     mutes: 8,
				//     warns: 12,
				//     bans: 9,
				// },
				// {
				//     date: "15.02",
				//     time: 22222,
				//     tickets: 44,
				//     reports: 5544,
				//     demorgans: 6,
				//     mutes: 8,
				//     warns: 12,
				//     bans: 9,
				// },
			],
		},
		admins: [
			{
				name: 'Serhio Braavos',
				uid: 'Z6Z',
			},
			{
				name: 'Admin Sergey',
				uid: 'B8S',
			},
			{
				name: 'Admin Admin',
				uid: '3G9',
			},
		],
	},
	factionLeaders: [
		// {
		//     color: FactionLeadersColor.Red,
		//     factionName: "Морфал",
		//     leaderName: "Люцио Серая Грива",
		//     lastOnline: "03.10.2022 20:31",
		// },
		// {
		//     color: FactionLeadersColor.SignalBlue,
		//     factionName: "Вайтран",
		//     leaderName: "Люцио Серая Грива",
		//     lastOnline: "03.10.2022 20:31",
		// },
		// {
		//     color: FactionLeadersColor.Grey,
		//     factionName: "Рифтен",
		//     leaderName: "Люцио Серая Грива",
		//     lastOnline: "",
		// },
		// {
		//     color: FactionLeadersColor.Brawn,
		//     factionName: "Морфал",
		//     leaderName: "Люцио Серая Грива",
		//     lastOnline: "03.10.2022 20:31",
		// },
		// {
		//     color: FactionLeadersColor.Red,
		//     factionName: "Вайтран",
		//     leaderName: "Люцио Серая Грива",
		//     lastOnline: "03.10.2022 20:31",
		// },
		// {
		//     color: FactionLeadersColor.Grey,
		//     factionName: "Рифтен",
		//     leaderName: "Люцио Серая Грива",
		//     lastOnline: "",
		// },
		// {
		//     color: FactionLeadersColor.Sand,
		//     factionName: "Морфал",
		//     leaderName: "Люцио Серая Грива",
		//     lastOnline: "03.10.2022 20:31",
		// },
		// {
		//     color: FactionLeadersColor.GreyGreen,
		//     factionName: "Вайтран",
		//     leaderName: "Люцио Серая Грива",
		//     lastOnline: "03.10.2022 20:31",
		// },
		// {
		//     color: FactionLeadersColor.Brawn,
		//     factionName: "Рифтен",
		//     leaderName: "Люцио Серая Грива",
		//     lastOnline: "",
		// },
		// {
		//     color: FactionLeadersColor.Red,
		//     factionName: "Вайтран",
		//     leaderName: "Люцио Серая Грива",
		//     lastOnline: "03.10.2022 20:31",
		// },
		// {
		//     color: FactionLeadersColor.Sand,
		//     factionName: "Рифтен",
		//     leaderName: "Люцио Серая Грива",
		//     lastOnline: "",
		// },
		// {
		//     color: FactionLeadersColor.Red,
		//     factionName: "Вайтран",
		//     leaderName: "Люцио Серая Грива",
		//     lastOnline: "03.10.2022 20:31",
		// },
		// {
		//     color: FactionLeadersColor.SignalBlue,
		//     factionName: "Рифтен",
		//     leaderName: "Люцио Серая Грива",
		//     lastOnline: "",
		// },
		// {
		//     color: FactionLeadersColor.Red,
		//     factionName: "Вайтран",
		//     leaderName: "Люцио Серая Грива",
		//     lastOnline: "03.10.2022 20:31",
		// },
		// {
		//     color: FactionLeadersColor.SignalBlue,
		//     factionName: "Рифтен",
		//     leaderName: "Люцио Серая Грива",
		//     lastOnline: "",
		// },
	],
	reportCategories: [
		ReportReason.reportPlayer,
		ReportReason.reportAdmin,
		ReportReason.question,
		ReportReason.help,
		ReportReason.bag,
	],
	punishedPlayers: [
		// {
		//     id: 0,
		//     type: PunishedTypes.banned,
		//     date: `04.09.2003 12:35`,
		//     playerName: `Луцио Серая Грива`,
		//     playerUID: `P70`,
		//     adminName: `Денис Майданов`,
		//     adminUID: `Y5S`,
		//     endPunished: `15.09.2024 12:35`,
		//     reason: `Все элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и сВсе элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и сВсе элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и сВсе элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и сВсе элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и сВсе элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и сВсе элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и сВсе элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и сВсе элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и сВсе элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и сВсе элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и сВсе элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и синих тонах. Все элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и синих тонах. Все элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и синих тонах.`,
		// },
		// {
		//     id: 1,
		//     type: PunishedTypes.banned,
		//     date: `04.09.2003 12:35`,
		//     playerName: `Луцццииио`,
		//     playerUID: `P70`,
		//     adminName: `Майор Гречкин`,
		//     adminUID: `Y5S`,
		//     endPunished: `15.09.2024 12:35`,
		//     reason: `Все элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и синих тонах. Все элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и синих тонах. Все элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и синих тонах.`,
		// },
		// {
		//     id: 5,
		//     type: PunishedTypes.banned,
		//     date: `04.09.2003 12:35`,
		//     playerName: `Фруцццио`,
		//     playerUID: `P70`,
		//     adminName: `Майор Гречкин`,
		//     adminUID: `Y5S`,
		//     endPunished: `15.09.2024 12:35`,
		//     reason: `Все элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и синих тонах. Все элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и синих тонах. Все элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и синих тонах.`,
		// },
		// {
		//     id: 6,
		//     type: PunishedTypes.banned,
		//     date: `04.09.2003 12:35`,
		//     playerName: `Луццииио`,
		//     playerUID: `P70`,
		//     adminName: `Майор Гречкин`,
		//     adminUID: `Y5S`,
		//     endPunished: `15.09.2024 12:35`,
		//     reason: `Все элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и синих тонах. Все элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и синих тонах. Все элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и синих тонах.`,
		// },
		// {
		//     id: 7,
		//     type: PunishedTypes.banned,
		//     date: `04.09.2003 12:35`,
		//     playerName: `Луцииио`,
		//     playerUID: `P70`,
		//     adminName: `Майор Гречкин`,
		//     adminUID: `Y5S`,
		//     endPunished: `15.09.2024 12:35`,
		//     reason: `Все элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и синих тонах. Все элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и синих тонах. Все элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и синих тонах.`,
		// },
		// {
		//     id: 2,
		//     type: PunishedTypes.muted,
		//     date: `04.09.2003 12:35`,
		//     playerName: `Луцио Серая Грива3`,
		//     playerUID: `P70`,
		//     adminName: `Денис Майданов`,
		//     adminUID: `Y5S`,
		//     endPunished: `15.09.2024 12:35`,
		//     reason: `Все элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и синих тонах. Все элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и синих тонах. Все элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и синих тонах.`,
		// },
		// {
		//     id: 8,
		//     type: PunishedTypes.muted,
		//     date: `04.09.2003 12:35`,
		//     playerName: `Серхио Браавос`,
		//     playerUID: `P70`,
		//     adminName: `Миша Киша`,
		//     adminUID: `Y5S`,
		//     endPunished: `15.09.2024 12:35`,
		//     reason: `Все элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и синих тонах. Все элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и синих тонах. Все элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и синих тонах.`,
		// },
		// {
		//     id: 0,
		//     type: PunishedTypes.demorgan,
		//     date: `04.09.2003 12:35`,
		//     playerName: `Луцио Серая Грива`,
		//     playerUID: `P70`,
		//     adminName: `Денис Майданов`,
		//     adminUID: `Y5S`,
		//     endPunished: `15.09.2024 12:35`,
		//     reason: `Все элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и синих тонах. Все элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и синих тонах. Все элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и синих тонах.`,
		// },
	],
	myStat: {
		date: '01.02.2024 13:30:55',
		days: [
			{
				date: '20.11.2024',
				time: 11378.41,
				tickets: 0,
				reports: 0,
				demorgans: 0,
				mutes: 0,
				warns: 0,
				bans: 0,
			},
			{
				date: '21.11.2024',
				time: 0.72,
				tickets: 0,
				reports: 0,
				demorgans: 0,
				mutes: 0,
				warns: 0,
				bans: 0,
			},
			{
				date: '22.11.2024',
				time: 13.27,
				tickets: 0,
				reports: 0,
				demorgans: 0,
				mutes: 0,
				warns: 0,
				bans: 0,
			},
			{
				date: '23.11.2024',
				time: 2.65,
				tickets: 0,
				reports: 0,
				demorgans: 0,
				mutes: 0,
				warns: 0,
				bans: 0,
			},
			{
				date: '24.11.2024',
				time: 0.03,
				tickets: 0,
				reports: 0,
				demorgans: 0,
				mutes: 0,
				warns: 0,
				bans: 0,
			},
			{
				date: '25.11.2024',
				time: 21.22,
				tickets: 0,
				reports: 0,
				demorgans: 0,
				mutes: 0,
				warns: 0,
				bans: 0,
			},
			{
				date: '26.11.2024',
				time: 143.56,
				tickets: 0,
				reports: 0,
				demorgans: 0,
				mutes: 0,
				warns: 0,
				bans: 0,
			},
			{
				date: '27.11.2024',
				time: 277.56,
				tickets: 1,
				reports: 0,
				demorgans: 0,
				mutes: 0,
				warns: 0,
				bans: 0,
			},
		],
	},
	commands: [
		{
			lvl: 1,
			commands: [
				// {
				//     command: "offdm",
				//     description:
				//         "посадить игрока в деморган оффлайнпосадить игрока в деморган оффлайнпосадить игрока в деморган оффлайнпосадить игрока в деморган оффлайнпосадить игрока в деморган оффлайнпосадить игрока в деморган оффлайнпосадить игрока в деморган оффлайнпосадить игрока в деморган оффлайнпосадить игрока в деморган оффлайнпосадить игрока в деморган оффлайнпосадить игрока в деморган оффлайнпосадить игрока в деморган оффлайнпосадить игрока в деморган оффлайнпосадить игрока в деморган оффлайн",
				// },
				// {
				//     command: "offdm",
				//     description: "посадить игрока в деморган оффлайн",
				// },
				// {
				//     command: "offdm",
				//     description: "посадить игрока в деморган оффлайн",
				// },
				// {
				//     command: "offdm",
				//     description: "посадить игрока в деморган оффлайн",
				// },
				// {
				//     command: "offdm",
				//     description: "посадить игрока в деморган оффлайн",
				// },
				// {
				//     command: "offdm",
				//     description: "посадить игрока в деморган оффлайн",
				// },
				// {
				//     command: "offdm",
				//     description: "посадить игрока в деморган оффлайн",
				// },
			],
		},
		{
			lvl: 2,
			commands: [
				// {
				//     command: "offdm",
				//     description: "посадить игрока в деморган оффлайн",
				// },
				// {
				//     command: "offdm",
				//     description: "посадить игрока в деморган оффлайн",
				// },
				// {
				//     command: "offdm",
				//     description: "посадить игрока в деморган оффлайн",
				// },
				// {
				//     command: "offdm",
				//     description: "посадить игрока в деморган оффлайн",
				// },
				// {
				//     command: "offdm",
				//     description: "посадить игрока в деморган оффлайн",
				// },
				// {
				//     command: "offdm",
				//     description: "посадить игрока в деморган оффлайн",
				// },
				// {
				//     command: "offdm",
				//     description: "посадить игрока в деморган оффлайн",
				// },
			],
		},
		{
			lvl: 3,
			commands: [
				// {
				//     command: "offdm",
				//     description: "посадить игрока в деморган оффлайн",
				// },
				// {
				//     command: "offdm",
				//     description: "посадить игрока в деморган оффлайн",
				// },
				// {
				//     command: "offdm",
				//     description: "посадить игрока в деморган оффлайн",
				// },
				// {
				//     command: "offdm",
				//     description: "посадить игрока в деморган оффлайн",
				// },
				// {
				//     command: "offdm",
				//     description: "посадить игрока в деморган оффлайн",
				// },
				// {
				//     command: "offdm",
				//     description: "посадить игрока в деморган оффлайн",
				// },
				// {
				//     command: "offdm",
				//     description: "посадить игрока в деморган оффлайн",
				// },
			],
		},
		{
			lvl: 4,
			commands: [
				// {
				//     command: "offdm",
				//     description: "посадить игрока в деморган оффлайн",
				// },
				// {
				//     command: "offdm",
				//     description: "посадить игрока в деморган оффлайн",
				// },
				// {
				//     command: "offdm",
				//     description: "посадить игрока в деморган оффлайн",
				// },
				// {
				//     command: "offdm",
				//     description: "посадить игрока в деморган оффлайн",
				// },
				// {
				//     command: "offdm",
				//     description: "посадить игрока в деморган оффлайн",
				// },
				// {
				//     command: "offdm",
				//     description: "посадить игрока в деморган оффлайн",
				// },
				// {
				//     command: "offdm",
				//     description: "посадить игрока в деморган оффлайн",
				// },
			],
		},
	],
	settings: [
		// {
		//     id: 0,
		//     type: AdminPanelSettingsTypes.Button,
		//     text: "Экранные элементы",
		//     content: null,
		// },
		// {
		//     id: 1,
		//     type: AdminPanelSettingsTypes.Switch,
		//     text: "гм",
		//     content: true,
		// },
		// {
		//     id: 2,
		//     type: AdminPanelSettingsTypes.Switch,
		//     text: "Отображение ников",
		//     content: false,
		// },
		// {
		//     id: 3,
		//     type: AdminPanelSettingsTypes.Switch,
		//     text: "Экранные элементы",
		//     content: true,
		// },
		// {
		//     id: 4,
		//     type: AdminPanelSettingsTypes.Switch,
		//     text: "гм",
		//     content: true,
		// },
		// {
		//     id: 5,
		//     type: AdminPanelSettingsTypes.Switch,
		//     text: "Отображение ников",
		//     content: false,
		// },
		// {
		//     id: 6,
		//     type: AdminPanelSettingsTypes.Switch,
		//     text: "Экранные элементы",
		//     content: false,
		// },
		// {
		//     id: 7,
		//     type: AdminPanelSettingsTypes.Switch,
		//     text: "гм",
		//     content: true,
		// },
		// {
		//     id: 8,
		//     type: AdminPanelSettingsTypes.Switch,
		//     text: "Отображение ников",
		//     content: false,
		// },
		// {
		//     id: 9,
		//     type: AdminPanelSettingsTypes.Switch,
		//     text: "Экранные элементы",
		//     content: false,
		// },
		// {
		//     id: 10,
		//     type: AdminPanelSettingsTypes.Switch,
		//     text: "гм",
		//     content: true,
		// },
		// {
		//     id: 11,
		//     type: AdminPanelSettingsTypes.Switch,
		//     text: "Отображение ников",
		//     content: false,
		// },
		// {
		//     id: 12,
		//     type: AdminPanelSettingsTypes.Button,
		//     text: "Экранные элементы",
		//     content: null,
		// },
		// {
		//     id: 13,
		//     type: AdminPanelSettingsTypes.Switch,
		//     text: "гм",
		//     content: true,
		// },
		// {
		//     id: 14,
		//     type: AdminPanelSettingsTypes.Switch,
		//     text: "Отображение ников",
		//     content: false,
		// },
		// {
		//     id: 15,
		//     type: AdminPanelSettingsTypes.Key,
		//     text: "Админ - панельАдмин - панельАдмин - панельАдмин - панельАдмин - панельАдмин - панель",
		//     content: "F11",
		// },
		// {
		//     id: 16,
		//     type: AdminPanelSettingsTypes.Key,
		//     text: "Инвиз",
		//     content: "F11",
		// },
		// {
		//     id: 17,
		//     type: AdminPanelSettingsTypes.Key,
		//     text: "ВХ",
		//     content: "F11",
		// },
		// {
		//     id: 18,
		//     type: AdminPanelSettingsTypes.Key,
		//     text: "Флай",
		//     content: "F11",
		// },
	],
	tickets: [
		// {
		// 	id: 512521,
		// 	datetime: '04.09.2003 12:35',
		// 	senderInfo: {
		// 		name: 'Луцио Серая Грива',
		// 		id: 1000,
		// 		uid: '4UI',
		// 	},
		// 	isPrivate: true,
		// 	amountNotification: 4,
		// 	type: ReportReason.bag,
		// },
		// {
		// 	id: 12345,
		// 	datetime: '04.09.2003 12:35',
		// 	senderInfo: {
		// 		name: 'Луцио Серая Грива',
		// 		id: 1000,
		// 		uid: '4UI',
		// 	},
		// 	isClosed: true,
		// 	amountNotification: 4,
		// 	type: ReportReason.bag,
		// },
		// {
		// 	id: 1568,
		// 	datetime: '04.09.2003 12:35',
		// 	senderInfo: {
		// 		name: 'Луцио Серая Грива',
		// 		id: 1000,
		// 		uid: '4UI',
		// 	},
		// 	amountNotification: 4,
		// 	type: ReportReason.bag,
		// },
	],
	ticketContent: null,
	// ticketContent: {
	// 	id: 12345,
	// 	senderLastOnline: '08.02.2024 03:49',
	// 	isPrivate: true,
	// 	type: ReportReason.help,
	// 	playerInfo: {
	// 		id: 232,
	// 		name: 'Mason Dookee',
	// 		uid: '1296',
	// 	},
	// 	suspectInfo: {
	// 		id: 444,
	// 		name: 'Vlad Burogoz',
	// 		uid: '454',
	// 	},
	// 	messages: [
	// 		{
	// 			date: '04.09.2003 12:35',
	// 			senderName: 'Луцио Серая Грива',
	// 			message: 'Приветствую! А проект скам и фейк?',
	// 			senderStatus: SenderStatus.Player,
	// 		},
	// 		'Администратор: Луцио Серая Грива принял(а) тикет',
	// 		{
	// 			date: '04.09.2003 12:37',
	// 			senderName: 'Jigglypuff',
	// 			message:
	// 				'Здравствуйте, уважаемый Луцио Серая Грива. Нет, не фейк. Приятной игры',
	// 			senderStatus: SenderStatus.Admin,
	// 		},
	// 		{
	// 			date: '04.09.2003 12:35',
	// 			senderName: 'Луцио Серая Грива',
	// 			message: 'Приветствую! А проект скам и фейк?',
	// 			senderStatus: SenderStatus.Player,
	// 		},
	// 		'Администратор: Луцио Серая Грива принял(а) тикет',
	// 		{
	// 			date: '04.09.2003 12:37',
	// 			senderName: 'Jigglypuff',
	// 			message:
	// 				'Здравствуйте, уважаемый Луцио Серая Грива. Нет, не фейк. Приятной игры',
	// 			senderStatus: SenderStatus.Admin,
	// 		},
	// 		{
	// 			date: '04.09.2003 12:35',
	// 			senderName: 'Луцио Серая Грива',
	// 			message: 'Приветствую! А проект скам и фейк?',
	// 			senderStatus: SenderStatus.Player,
	// 		},
	// 		'Администратор: Луцио Серая Грива принял(а) тикет',
	// 		{
	// 			date: '04.09.2003 12:37',
	// 			senderName: 'Jigglypuff',
	// 			message:
	// 				'Здравствуйте, уважаемый Луцио Серая Грива. Нет, не фейк. Приятной игры',
	// 			senderStatus: SenderStatus.Admin,
	// 		},
	// 	],
	// 	ticketInfo: {
	// 		title: 'Какой-то длинный заголовок проблемы',
	// 		description: 'Запрещено в системе обращений использовать нец. лексику, оскорбления и иные способы унижения чести и достоинства игроков и администраторов. Запрещено в системе обращений использовать нец. лексику, оскорбления и иные способы унижения чести и достоинства игроков и администраторов. Запрещено в системе обращений использовать нец. лексику, оскорбления и иные способы унижения чести и достоинства игроков и администраторов. Запрещено в системе обращений использовать нец. лексику, оскорбления и иные способы унижения чести и достоинства игроков и администраторов.',
	// 		proofs: [
	// 			'https://i.imgur.com/nwrPXiT.jpeg',
	// 			'https://i.imgur.com/nwrPXiT.jpeg',
	// 			'https://i.imgur.com/nwrPXiT.jpeg',
	// 			'https://i.imgur.com/nwrPXiT.jpeg',
	// 		],
	// 		date: '07.09.2022 15:01',
	// 		senderName: 'Mike Tayson',
	// 		senderStatus: SenderStatus.Player,
	// 	},
	// },
	fastAnswers: [
		// {
		//     name: "Быстрый ответ 1",
		//     value: "Ляляля-ляляля 1",
		//     id: 0,
		// },
		// {
		//     name: "Быстрый ответ 2",
		//     value: "Ляляля-ляляля 2",
		//     id: 1,
		// },
		// {
		//     name: "Быстрый ответ 3",
		//     value: "Ляляля-ляляля 3",
		//     id: 2,
		// },
		// {
		//     name: "Быстрый ответ 4",
		//     value: "Ляляля-ляляля 4",
		//     id: 3,
		// },
		// {
		//     name: "Быстрый ответ 5",
		//     value: "Ляляля-ляляля 5",
		//     id: 4,
		// },
	],
}

export const adminPanelSlice = createSlice({
	name: 'adminPanel',
	initialState,
	reducers: {
		show(state) {
			state.isOpen = true
			state.ticketContent = null
		},
		hide(state) {
			state.isOpen = false
		},
		setSections(state, action: PayloadAction<APanelSection[]>) {
			state.sections = action.payload
		},
		updateSetting(state, action: PayloadAction<SettingInfo>) {
			const { id, content } = action.payload
			state.settings[id].content = content
		},
		setAdminInfo(state, action: PayloadAction<AdminInfoType>) {
			state.adminInfo = action.payload
		},
		setCommands(state, action: PayloadAction<AdminLvlInfo[]>) {
			state.commands = action.payload
		},
		setSettings(state, action: PayloadAction<SettingInfo[]>) {
			state.settings = action.payload
		},
		/** Punished */
		setPunishedPlayers(state, action: PayloadAction<PunishedPlayerType[]>) {
			state.punishedPlayers = action.payload
		},
		addPunishPlayer(state, action: PayloadAction<PunishedPlayerType>) {
			state.punishedPlayers.push(action.payload)
		},
		/** Faction Leaders */
		setFactionLeaders(state, action: PayloadAction<FactionLeaders[]>) {
			state.factionLeaders = action.payload
		},
		setMyStat(state, action: PayloadAction<MyStatDayType[]>) {
			state.myStat.days = action.payload
		},
		setTickets(state, action: PayloadAction<TicketType[]>) {
			state.tickets = action.payload
		},
		setTicketContent(state, action: PayloadAction<TicketContentType | null>) {
			state.ticketContent = action.payload
		},
		setFastAnswers(state, action: PayloadAction<FastAnswerType[]>) {
			state.fastAnswers = action.payload
		},
		addTicket(state, action: PayloadAction<TicketType>) {
			state.tickets.push(action.payload)
		},
		updateTicket(state, action: PayloadAction<TicketType>) {
			const { id } = action.payload

			const findIndex = state.tickets.findIndex((ticket) => ticket.id === id)

			if (findIndex === -1) {
				return
			}

			state.tickets[findIndex] = { ...action.payload }
		},
		updateTicketContent(state, action: PayloadAction<TicketContentType>) {
			state.ticketContent = action.payload
		},
		addTicketContentMessage(state, action: PayloadAction<TicketMessage>) {
			if (state.ticketContent == null) {
				return
			}
			state.ticketContent.messages.push(action.payload)
		},

		updateStatDays(state, action: PayloadAction<MyStatDayType[]>) {
			state.myStat.days = action.payload
		},
		updateAdminStats(state, action: PayloadAction<MyStatDayType[]>) {
			state.adminStats.stat.days = action.payload
		},
	},
})

export const adminPanelReducer = adminPanelSlice.reducer
export const adminPanelActions = adminPanelSlice.actions
