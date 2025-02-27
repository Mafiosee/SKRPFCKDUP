import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CraftItemDto, ItemType, Quality } from '../../shared/inventory/itemType'
import { RecipeDTO } from '../../shared/Crafts/types'
import { ItemHashes } from '../../shared/inventory/ItemHashes'

type CurrentCraft = {
	result: CraftItemDto
	components: CraftItemDto[]
	progress: {
		isStarted: boolean
		isCompleted: boolean
		time: { current: number; max: number }
	}
} | null

type BlacksmithState = {
	isOpen: boolean
	recipes: RecipeDTO[]
	currentCraft: CurrentCraft
}

const initialState: BlacksmithState = {
	isOpen: false,
	recipes: [
		// {
		// 	'id': 'iron_sword',
		// 	'image': 'iron_sword',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 1,
		// 		'name': 'Железный меч',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Одноручное' }, {
		// 			'title': 'Урон',
		// 			'value': '7',
		// 		}, { 'title': 'Состояние', 'value': '100%' }, { 'title': 'Вес', 'value': '9кг.' }],
		// 		'description': 'Прочный и надежный, железный меч — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'steel_sword',
		// 	'image': 'steel_sword',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 1,
		// 		'name': 'Стальной меч',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Одноручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '10кг.' }],
		// 		'description': 'Прочный и надежный, стальной меч — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'orcish_sword',
		// 	'image': 'orcish_sword',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 0,
		// 		'name': 'Орочий меч',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Одноручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '11кг.' }],
		// 		'description': 'Прочный и надежный, орочий меч — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'dwarven_sword',
		// 	'image': 'dwarven_sword',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 0,
		// 		'name': 'Двемерский меч',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Одноручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '12кг.' }],
		// 		'description': 'Прочный и надежный, двемерский меч — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'elven_sword',
		// 	'image': 'elven_sword',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 2,
		// 		'name': 'Эльфийский меч',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Одноручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '13кг.' }],
		// 		'description': 'Прочный и надежный, эльфийский меч — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'glass_sword',
		// 	'image': 'glass_sword',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 3,
		// 		'name': 'Стеклянный меч',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Одноручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '14кг.' }],
		// 		'description': 'Прочный и надежный, стеклянный меч — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'ebony_sword',
		// 	'image': 'ebony_sword',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 3,
		// 		'name': 'Эбонитовый меч',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Одноручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '15кг.' }],
		// 		'description': 'Прочный и надежный, эбонитовый меч — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'daedric_sword',
		// 	'image': 'daedric_sword',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 4,
		// 		'name': 'Даэдрический меч',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Одноручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '16кг.' }],
		// 		'description': 'Прочный и надежный, даэдрический меч — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'dragonbone_sword',
		// 	'image': 'dragonbone_sword',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 4,
		// 		'name': 'Даэдрический меч',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Одноручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '19кг.' }],
		// 		'description': 'Прочный и надежный, меч из драконьей кости — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'iron_dagger',
		// 	'image': 'iron_dagger',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 1,
		// 		'name': 'Железный кинжал',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Одноручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '2кг.' }],
		// 		'description': 'Прочный и надежный, железный кинжал — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'steel_dagger',
		// 	'image': 'steel_dagger',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 1,
		// 		'name': 'Стальной кинжал',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Одноручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '2.5кг.' }],
		// 		'description': 'Прочный и надежный, стальной кинжал — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'orcish_dagger',
		// 	'image': 'orcish_dagger',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 0,
		// 		'name': 'Орочий кинжал',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Одноручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '3кг.' }],
		// 		'description': 'Прочный и надежный, орочий кинжал — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'dwarven_dagger',
		// 	'image': 'dwarven_dagger',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 0,
		// 		'name': 'Двемерский кинжал',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Одноручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '3.5кг.' }],
		// 		'description': 'Прочный и надежный, двемерский кинжал — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'elven_dagger',
		// 	'image': 'elven_dagger',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 2,
		// 		'name': 'Эльфийский кинжал',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Одноручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '4кг.' }],
		// 		'description': 'Прочный и надежный, эльфийский кинжал — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'glass_dagger',
		// 	'image': 'glass_dagger',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 3,
		// 		'name': 'Стеклянный кинжал',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Одноручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '4.5кг.' }],
		// 		'description': 'Прочный и надежный, стеклянный кинжал — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'ebony_dagger',
		// 	'image': 'ebony_dagger',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 3,
		// 		'name': 'Эбонитовый кинжал',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Одноручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '5кг.' }],
		// 		'description': 'Прочный и надежный, эбонитовый кинжал — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'daedric_dagger',
		// 	'image': 'daedric_dagger',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 4,
		// 		'name': 'Даэдрический кинжал',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Одноручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '6кг.' }],
		// 		'description': 'Прочный и надежный, даэдрический кинжал — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'dragonbone_dagger',
		// 	'image': 'dragonbone_dagger',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 4,
		// 		'name': 'Кинжал из драконьей кости',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Одноручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '6.5кг.' }],
		// 		'description': 'Прочный и надежный, кинжал из драконьей кости — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'iron_mace',
		// 	'image': 'iron_mace',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 1,
		// 		'name': 'Железная булава',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Одноручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '13кг.' }],
		// 		'description': 'Прочная и надежная, железная булава — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'steel_mace',
		// 	'image': 'steel_mace',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 1,
		// 		'name': 'Стальная булава',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Одноручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '14кг.' }],
		// 		'description': 'Прочная и надежная, стальная булава — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'orcish_mace',
		// 	'image': 'orcish_mace',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 0,
		// 		'name': 'Орочья булава',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Одноручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '15кг.' }],
		// 		'description': 'Прочная и надежная, орочья булава — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'dwarven_mace',
		// 	'image': 'dwarven_mace',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 0,
		// 		'name': 'Двемерская булава',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Одноручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '16кг.' }],
		// 		'description': 'Прочная и надежная, двемерская булава — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'elven_mace',
		// 	'image': 'elven_mace',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 2,
		// 		'name': 'Эльфийская булава',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Одноручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '17кг.' }],
		// 		'description': 'Прочная и надежная, эльфийская булава — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'glass_mace',
		// 	'image': 'glass_mace',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 3,
		// 		'name': 'Стеклянная булава',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Одноручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '18кг.' }],
		// 		'description': 'Прочная и надежная, стеклянная булава — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'ebony_mace',
		// 	'image': 'ebony_mace',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 3,
		// 		'name': 'Эбонитовая булава',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Одноручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '19кг.' }],
		// 		'description': 'Прочная и надежная, эбонитовая булава — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'daedric_mace',
		// 	'image': 'daedric_mace',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 4,
		// 		'name': 'Даэдрическая булава',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Одноручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '20кг.' }],
		// 		'description': 'Прочная и надежная, даэдрическая булава — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'dragonbone_mace',
		// 	'image': 'dragonbone_mace',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 4,
		// 		'name': 'Булава из драконьей кости',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Одноручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '22кг.' }],
		// 		'description': 'Прочная и надежная, булава из драконьей кости — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'iron_war_axe',
		// 	'image': 'iron_war_axe',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 1,
		// 		'name': 'Железный топор',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Одноручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '11кг.' }],
		// 		'description': 'Прочный и надежный, железный топор — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'steel_war_axe',
		// 	'image': 'steel_war_axe',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 1,
		// 		'name': 'Стальной топор',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Одноручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '12кг.' }],
		// 		'description': 'Прочный и надежный, стальной топор — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'orcish_war_axe',
		// 	'image': 'orcish_war_axe',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 0,
		// 		'name': 'Орочий топор',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Одноручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '13кг.' }],
		// 		'description': 'Прочный и надежный, орочий топор — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'dwarven_war_axe',
		// 	'image': 'dwarven_war_axe',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 0,
		// 		'name': 'Двемерский топор',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Одноручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '14кг.' }],
		// 		'description': 'Прочный и надежный, двемерский топор — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'elven_war_axe',
		// 	'image': 'elven_war_axe',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 2,
		// 		'name': 'Эльфийский топор',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Одноручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '15кг.' }],
		// 		'description': 'Прочный и надежный, эльфийский топор — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'glass_war_axe',
		// 	'image': 'glass_war_axe',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 3,
		// 		'name': 'Стеклянный топор',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Одноручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '16кг.' }],
		// 		'description': 'Прочный и надежный, стеклянный топор — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'ebony_war_axe',
		// 	'image': 'ebony_war_axe',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 3,
		// 		'name': 'Эбонитовый топор',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Одноручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '17кг.' }],
		// 		'description': 'Прочный и надежный, эбонитовый топор — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'daedric_war_axe',
		// 	'image': 'daedric_war_axe',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 4,
		// 		'name': 'Даэдрический топор',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Одноручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '18кг.' }],
		// 		'description': 'Прочный и надежный, даэдрический топор — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'dragonbone_war_axe',
		// 	'image': 'dragonbone_war_axe',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 4,
		// 		'name': 'Топор из драконьей кости',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Одноручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '21кг.' }],
		// 		'description': 'Прочный и надежный, топор из драконьей кости — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'iron_greatsword',
		// 	'image': 'iron_greatsword',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 1,
		// 		'name': 'Железный двуручный меч',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Двуручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '11кг.' }],
		// 		'description': 'Прочный и надежный, железный топор — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'steel_greatsword',
		// 	'image': 'steel_greatsword',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 1,
		// 		'name': 'Стальной двуручный меч',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Двуручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '12кг.' }],
		// 		'description': 'Прочный и надежный, стальной топор — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'orcish_greatsword',
		// 	'image': 'orcish_greatsword',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 0,
		// 		'name': 'Орочий двуручный меч',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Двуручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '13кг.' }],
		// 		'description': 'Орочий топор — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'dwarven_greatsword',
		// 	'image': 'dwarven_greatsword',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 0,
		// 		'name': 'Двемерский двуручный меч',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Двуручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '14кг.' }],
		// 		'description': 'Двемерский двуручный меч — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'elven_greatsword',
		// 	'image': 'elven_greatsword',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 2,
		// 		'name': 'Эльфийский двуручный меч',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Двуручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '15кг.' }],
		// 		'description': 'Эльфийский двуручный меч — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'glass_greatsword',
		// 	'image': 'glass_greatsword',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 3,
		// 		'name': 'Стеклянный двуручный меч',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Двуручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '16кг.' }],
		// 		'description': 'Стеклянный двуручный меч — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'ebony_greatsword',
		// 	'image': 'ebony_greatsword',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 3,
		// 		'name': 'Эбонитовый двуручный меч',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Двуручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '17кг.' }],
		// 		'description': 'Эбонитовый двуручный меч — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'daedric_greatsword',
		// 	'image': 'daedric_greatsword',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 4,
		// 		'name': 'Даэдрический двуручный меч',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Двуручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '18кг.' }],
		// 		'description': 'Даэдрический двуручный меч — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'dragonbone_greatsword',
		// 	'image': 'dragonbone_greatsword',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 4,
		// 		'name': 'Двуручный меч из драконьей кости',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Двуручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '21кг.' }],
		// 		'description': 'Двуручный меч из драконьей кости — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'iron_warhammer',
		// 	'image': 'iron_warhammer',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 1,
		// 		'name': 'Железный боевой молот',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Двуручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '24кг.' }],
		// 		'description': 'Железный боевой молот — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'steel_warhammer',
		// 	'image': 'steel_warhammer',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 1,
		// 		'name': 'Стальной боевой молот',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Двуручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '25кг.' }],
		// 		'description': 'Стальной боевой молот — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'orcish_warhammer',
		// 	'image': 'orcish_warhammer',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 0,
		// 		'name': 'Орочий боевой молот',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Двуручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '26кг.' }],
		// 		'description': 'Орочий боевой молот — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'dwarven_warhammer',
		// 	'image': 'dwarven_warhammer',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 0,
		// 		'name': 'Двемерский боевой молот',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Двуручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '27кг.' }],
		// 		'description': 'Двемерский боевой молот — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'elven_warhammer',
		// 	'image': 'elven_warhammer',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 2,
		// 		'name': 'Эльфийский боевой молот',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Двуручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '28кг.' }],
		// 		'description': 'Эльфийский боевой молот — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'glass_warhammer',
		// 	'image': 'glass_warhammer',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 3,
		// 		'name': 'Стеклянный боевой молот',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Двуручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '29кг.' }],
		// 		'description': 'Стеклянный боевой молот — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'ebony_warhammer',
		// 	'image': 'ebony_warhammer',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 3,
		// 		'name': 'Эбонитовый боевой молот',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Двуручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '30кг.' }],
		// 		'description': 'Эбонитовый боевой молот — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'daedric_warhammer',
		// 	'image': 'daedric_warhammer',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 4,
		// 		'name': 'Даэдрический боевой молот',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Двуручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '31кг.' }],
		// 		'description': 'Даэдрический боевой молот — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'dragonbone_warhammer',
		// 	'image': 'dragonbone_warhammer',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 4,
		// 		'name': 'Боевой молот из драконьей кости',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Двуручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '33кг.' }],
		// 		'description': 'Боевой молот из драконьей кости — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'iron_battleaxe',
		// 	'image': 'iron_battleaxe',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 1,
		// 		'name': 'Железная секира',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Двуручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '20кг.' }],
		// 		'description': 'Железная секира — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'steel_battleaxe',
		// 	'image': 'steel_battleaxe',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 1,
		// 		'name': 'Стальная секира',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Двуручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '21кг.' }],
		// 		'description': 'Стальная секира — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'orcish_battleaxe',
		// 	'image': 'orcish_battleaxe',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 0,
		// 		'name': 'Орочья секира',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Двуручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '22кг.' }],
		// 		'description': 'Орочья секира — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'dwarven_battleaxe',
		// 	'image': 'dwarven_battleaxe',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 0,
		// 		'name': 'Двемерская секира',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Двуручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '23кг.' }],
		// 		'description': 'Двемерская секира — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'elven_battleaxe',
		// 	'image': 'elven_battleaxe',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 2,
		// 		'name': 'Эльфийская секира',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Двуручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '24кг.' }],
		// 		'description': 'Эльфийская секира — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'glass_battleaxe',
		// 	'image': 'glass_battleaxe',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 3,
		// 		'name': 'Стеклянная секира',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Двуручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '25кг.' }],
		// 		'description': 'Стеклянная секира — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'ebony_battleaxe',
		// 	'image': 'ebony_battleaxe',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 3,
		// 		'name': 'Эбонитовая секира',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Двуручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '26кг.' }],
		// 		'description': 'Эбонитовая секира — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'daedric_battleaxe',
		// 	'image': 'daedric_battleaxe',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 4,
		// 		'name': 'Даэдрический двуручный меч',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Двуручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '27кг.' }],
		// 		'description': 'Даэдрическая секира — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'dragonbone_battleaxe',
		// 	'image': 'dragonbone_battleaxe',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 4,
		// 		'name': 'Секира из драконьей кости',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Двуручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '30кг.' }],
		// 		'description': 'Секира из драконьей кости — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'long_bow',
		// 	'image': 'long_bow',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 1,
		// 		'name': 'Длинный лук',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Двуручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '5кг.' }],
		// 		'description': 'Длинный лук — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'hunting_bow',
		// 	'image': 'hunting_bow',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 1,
		// 		'name': 'Охотничий лук',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Двуручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '7кг.' }],
		// 		'description': 'Охотничий лук — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'orcish_bow',
		// 	'image': 'orcish_bow',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 0,
		// 		'name': 'Орочий лук',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Двуручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '9кг.' }],
		// 		'description': 'Орочий лук — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'dwarven_bow',
		// 	'image': 'dwarven_bow',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 0,
		// 		'name': 'Двемерский лук',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Двуручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '10кг.' }],
		// 		'description': 'Двемерский лук — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'elven_bow',
		// 	'image': 'elven_bow',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 2,
		// 		'name': 'Эльфийский лук',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Двуручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '12кг.' }],
		// 		'description': 'Эльфийский лук — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'glass_bow',
		// 	'image': 'glass_bow',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 3,
		// 		'name': 'Стеклянний лук',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Двуручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '14кг.' }],
		// 		'description': 'Стеклянний лук — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'ebony_bow',
		// 	'image': 'ebony_bow',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 3,
		// 		'name': 'Эбонитовый лук',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Двуручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '16кг.' }],
		// 		'description': 'Эбонитовый лук — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'daedric_bow',
		// 	'image': 'daedric_bow',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 4,
		// 		'name': 'Даэдрический лук',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Двуручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '18кг.' }],
		// 		'description': 'Даэдрический лук — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'dragonbone_bow',
		// 	'image': 'dragonbone_bow',
		// 	'type': 'ItemTypeWeapon',
		// 	'info': {
		// 		'quality': 4,
		// 		'name': 'Лук из драконьей кости',
		// 		'parameters': [{ 'title': 'Тип Оружия', 'value': 'Двуручное' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '20кг.' }],
		// 		'description': 'Лук из драконьей кости — это базовый инструмент любого воина, служащий верой и правдой в столкновениях с врагами.',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'iron_helmet',
		// 	'image': 'iron_helmet',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 1,
		// 		'name': 'Железный шлем',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Тяжелая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '5кг.' }],
		// 		'description': 'Железный шлем, являющийся частью железного снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'iron_armor',
		// 	'image': 'iron_armor',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 1,
		// 		'name': 'Железная броня',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Тяжелая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '30кг.' }],
		// 		'description': 'Железная броня, являющаяся частью железного снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'iron_bracers',
		// 	'image': 'iron_bracers',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 1,
		// 		'name': 'Железные наручи',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Тяжелая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '5кг.' }],
		// 		'description': 'Железные наручи, являющиеся частью железного снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'iron_boots',
		// 	'image': 'iron_boots',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 1,
		// 		'name': 'Железные ботинки',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Тяжелая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '6кг.' }],
		// 		'description': 'Железные ботинки, являющиеся частью железного снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'iron_shield',
		// 	'image': 'iron_shield',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 1,
		// 		'name': 'Железный щит',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Щит' }, { 'title': 'Состояние', 'value': '100%' }, {
		// 			'title': 'Вес',
		// 			'value': '12кг.',
		// 		}],
		// 		'description': 'Железный щит, являющийся частью железного снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'steel_helmet',
		// 	'image': 'steel_helmet',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 1,
		// 		'name': 'Стальной шлем',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Тяжелая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '5кг.' }],
		// 		'description': 'Стальной шлем, являющийся частью стального снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'steel_armor',
		// 	'image': 'steel_armor',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 1,
		// 		'name': 'Стальная броня',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Тяжелая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '30кг.' }],
		// 		'description': 'Стальная броня, являющаяся частью стального снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'steel_bracers',
		// 	'image': 'steel_bracers',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 1,
		// 		'name': 'Стальные наручи',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Тяжелая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '4кг.' }],
		// 		'description': 'Стальные наручи, являющиеся частью стального снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'steel_boots',
		// 	'image': 'steel_boots',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 1,
		// 		'name': 'Стальные ботинки',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Тяжелая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '8кг.' }],
		// 		'description': 'Стальные ботинки, являющиеся частью стального снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'steel_shield',
		// 	'image': 'steel_shield',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 1,
		// 		'name': 'Стальной щит',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Щит' }, { 'title': 'Состояние', 'value': '100%' }, {
		// 			'title': 'Вес',
		// 			'value': '12кг.',
		// 		}],
		// 		'description': 'Стальной щит, являющийся частью стального снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'orcish_helmet',
		// 	'image': 'orcish_helmet',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 0,
		// 		'name': 'Орочий шлем',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Тяжелая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '8кг.' }],
		// 		'description': 'Орочий шлем, являющийся частью орочьего снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'orcish_armor',
		// 	'image': 'orcish_armor',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 0,
		// 		'name': 'Орочья броня',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Тяжелая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '35кг.' }],
		// 		'description': 'Орочья броня, являющаяся частью орочьего снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'orcish_bracers',
		// 	'image': 'orcish_bracers',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 0,
		// 		'name': 'Орочьи наручи',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Тяжелая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '7кг.' }],
		// 		'description': 'Орочьи наручи, являющиеся частью орочьего снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'orcish_boots',
		// 	'image': 'orcish_boots',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 0,
		// 		'name': 'Орочьи ботинки',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Тяжелая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '7кг.' }],
		// 		'description': 'Орочьи ботинки, являющиеся частью орочьего снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'orcish_shield',
		// 	'image': 'orcish_shield',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 0,
		// 		'name': 'Орочий щит',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Щит' }, { 'title': 'Состояние', 'value': '100%' }, {
		// 			'title': 'Вес',
		// 			'value': '14кг.',
		// 		}],
		// 		'description': 'Орочий щит, являющийся частью орочьего снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'dwarven_helmet',
		// 	'image': 'dwarven_helmet',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 0,
		// 		'name': 'Двемерский шлем',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Тяжелая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '12кг.' }],
		// 		'description': 'Двемерский шлем, являющийся частью двемерского снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'dwarven_armor',
		// 	'image': 'dwarven_armor',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 0,
		// 		'name': 'Двемерская броня',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Тяжелая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '45кг.' }],
		// 		'description': 'Двемерская броня, являющаяся частью двемерского снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'dwarven_bracers',
		// 	'image': 'dwarven_bracers',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 0,
		// 		'name': 'Двемерские наручи',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Тяжелая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '8кг.' }],
		// 		'description': 'Двемерские наручи, являющиеся частью двемерского снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'dwarven_boots',
		// 	'image': 'dwarven_boots',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 0,
		// 		'name': 'Двемерские ботинки',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Тяжелая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '10кг.' }],
		// 		'description': 'Двемерские ботинки, являющиеся частью двемерского снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'dwarven_shield',
		// 	'image': 'dwarven_shield',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 0,
		// 		'name': 'Двемерский щит',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Щит' }, { 'title': 'Состояние', 'value': '100%' }, {
		// 			'title': 'Вес',
		// 			'value': '12кг.',
		// 		}],
		// 		'description': 'Двемерский щит, являющийся частью двемерского снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'elven_helmet',
		// 	'image': 'elven_helmet',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 2,
		// 		'name': 'Эльфийский шлем',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Легкая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '1кг.' }],
		// 		'description': 'Эльфийский шлем, являющийся частью эльфийского снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'elven_armor',
		// 	'image': 'elven_armor',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 2,
		// 		'name': 'Эльфийская броня',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Легкая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '4кг.' }],
		// 		'description': 'Эльфийская броня, являющаяся частью эльфийского снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'elven_bracers',
		// 	'image': 'elven_bracers',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 2,
		// 		'name': 'Эльфийские наручи',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Легкая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '1кг.' }],
		// 		'description': 'Эльфийские наручи, являющиеся частью эльфийского снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'elven_boots',
		// 	'image': 'elven_boots',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 2,
		// 		'name': 'Эльфийские ботинки',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Легкая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '1кг.' }],
		// 		'description': 'Эльфийские ботинки, являющиеся частью эльфийского снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'elven_shield',
		// 	'image': 'elven_shield',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 2,
		// 		'name': 'Эльфийский щит',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Щит' }, { 'title': 'Состояние', 'value': '100%' }, {
		// 			'title': 'Вес',
		// 			'value': '4кг.',
		// 		}],
		// 		'description': 'Эльфийский щит, являющийся частью эльфийского снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'scaled_helmet',
		// 	'image': 'scaled_helmet',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 2,
		// 		'name': 'Ламеллярный шлем',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Легкая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '2кг.' }],
		// 		'description': 'Ламеллярный шлем, являющийся частью ламеллярного снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'scaled_armor',
		// 	'image': 'scaled_armor',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 2,
		// 		'name': 'Ламеллярная броня',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Легкая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '6кг.' }],
		// 		'description': 'Ламеллярная броня, являющаяся частью ламеллярного снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'scaled_bracers',
		// 	'image': 'scaled_bracers',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 2,
		// 		'name': 'Ламеллярная наручи',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Легкая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '2кг.' }],
		// 		'description': 'Ламеллярные наручи, являющиеся частью ламеллярного снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'scaled_boots',
		// 	'image': 'scaled_boots',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 2,
		// 		'name': 'Ламеллярные ботинки',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Легкая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '2кг.' }],
		// 		'description': 'Ламеллярный ботинки, являющиеся частью ламеллярного снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'nordic_carved_helmet',
		// 	'image': 'nordic_carved_helmet',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 2,
		// 		'name': 'Нордский резной шлем',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Тяжелая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '7кг.' }],
		// 		'description': 'Нордский резной шлем, являющийся частью нордского резного снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'nordic_carved_armor',
		// 	'image': 'nordic_carved_armor',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 2,
		// 		'name': 'Нордская резная броня',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Тяжелая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '37кг.' }],
		// 		'description': 'Нордская резная броня, являющаяся частью нордского резного снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'nordic_carved_bracers',
		// 	'image': 'nordic_carved_bracers',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 2,
		// 		'name': 'Нордские резные наручи',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Тяжелая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '6кг.' }],
		// 		'description': 'Нордские резные наручи, являющиеся частью нордского резного снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'nordic_carved_boots',
		// 	'image': 'nordic_carved_boots',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 2,
		// 		'name': 'Нордские резные ботинки',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Тяжелая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '6кг.' }],
		// 		'description': 'Нордские резные ботинки, являющиеся частью нордского резного снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'nordic_carved_shield',
		// 	'image': 'nordic_carved_shield',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 2,
		// 		'name': 'Нордский резной щит',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Щит' }, { 'title': 'Состояние', 'value': '100%' }, {
		// 			'title': 'Вес',
		// 			'value': '10кг.',
		// 		}],
		// 		'description': 'Нордский резной щит, являющийся частью нордского резного снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'ebony_helmet',
		// 	'image': 'ebony_helmet',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 3,
		// 		'name': 'Эбонитовый шлем',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Тяжелая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '10кг.' }],
		// 		'description': 'Эбонитовый шлем, являющийся частью эбонитового снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'ebony_armor',
		// 	'image': 'ebony_armor',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 3,
		// 		'name': 'Эбонитовая броня',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Тяжелая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '38кг.' }],
		// 		'description': 'Эбонитовая броня, являющаяся частью эбонитового снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'ebony_bracers',
		// 	'image': 'ebony_bracers',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 3,
		// 		'name': 'Эбонитовые наручи',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Тяжелая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '7кг.' }],
		// 		'description': 'Эбонитовые наручи, являющиеся частью эбонитового снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'ebony_boots',
		// 	'image': 'ebony_boots',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 3,
		// 		'name': 'Эбонитовые ботинки',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Тяжелая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '7кг.' }],
		// 		'description': 'Эбонитовые ботинки, являющиеся частью эбонитового снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'ebony_shield',
		// 	'image': 'ebony_shield',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 3,
		// 		'name': 'Эбонитовый щит',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Щит' }, { 'title': 'Состояние', 'value': '100%' }, {
		// 			'title': 'Вес',
		// 			'value': '14кг.',
		// 		}],
		// 		'description': 'Эбонитовый щит, являющийся частью эбонитового снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'dragonplate_helmet',
		// 	'image': 'dragonplate_helmet',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 4,
		// 		'name': 'Драконий панцирный шлем',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Тяжелая' }, {
		// 			'title': 'Физическая Защита',
		// 			'value': '22',
		// 		}, { 'title': 'Магическая Защита', 'value': '0' }, { 'title': 'Состояние', 'value': '100%' }, {
		// 			'title': 'Вес',
		// 			'value': '8кг.',
		// 		}],
		// 		'description': 'Драконий панцирный шлем, являющийся частью драконьего панцирного снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'dragonplate_armor',
		// 	'image': 'dragonplate_armor',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 4,
		// 		'name': 'Драконья панцирная броня',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Тяжелая' }, {
		// 			'title': 'Физическая Защита',
		// 			'value': '46',
		// 		}, { 'title': 'Магическая Защита', 'value': '0' }, { 'title': 'Состояние', 'value': '100%' }, {
		// 			'title': 'Вес',
		// 			'value': '40кг.',
		// 		}],
		// 		'description': 'Драконья панцирная броня, являющаяся частью драконьего панцирного снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'dragonplate_bracers',
		// 	'image': 'dragonplate_bracers',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 4,
		// 		'name': 'Драконьи панцирные перчатки',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Тяжелая' }, {
		// 			'title': 'Физическая Защита',
		// 			'value': '17',
		// 		}, { 'title': 'Магическая Защита', 'value': '0' }, { 'title': 'Состояние', 'value': '100%' }, {
		// 			'title': 'Вес',
		// 			'value': '8кг.',
		// 		}],
		// 		'description': 'Драконьи панцирные перчатки, являющиеся частью драконьего панцирного снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'dragonplate_boots',
		// 	'image': 'dragonplate_boots',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 4,
		// 		'name': 'Драконьи панцирные ботинки',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Тяжелая' }, {
		// 			'title': 'Физическая Защита',
		// 			'value': '17',
		// 		}, { 'title': 'Магическая Защита', 'value': '0' }, { 'title': 'Состояние', 'value': '100%' }, {
		// 			'title': 'Вес',
		// 			'value': '8кг.',
		// 		}],
		// 		'description': 'Драконьи панцирные ботинки, являющиеся частью драконьего панцирного снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'dragonplate_shield',
		// 	'image': 'dragonplate_shield',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 4,
		// 		'name': 'Драконий панцирный щит',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Щит' }, { 'title': 'Состояние', 'value': '100%' }, {
		// 			'title': 'Вес',
		// 			'value': '15кг.',
		// 		}],
		// 		'description': 'Драконий панцирный щит, являющийся частью драконьего панцирного снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'hide_helmet',
		// 	'image': 'hide_helmet',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 1,
		// 		'name': 'Сыромятный шлем',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Легкая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '2кг.' }],
		// 		'description': 'Лёгкий сыромятный шлем с небольшим показателем защиты, являющиеся частью сыромятного снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'hide_armor',
		// 	'image': 'hide_armor',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 1,
		// 		'name': 'Сыромятная броня',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Легкая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '5кг.' }],
		// 		'description': 'Лёгкая сыромятная броня с небольшим показателем защиты, являющиеся частью сыромятного снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'hide_bracers',
		// 	'image': 'hide_bracers',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 1,
		// 		'name': 'Сыромятные наручи',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Легкая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '1кг.' }],
		// 		'description': 'Лёгкие сыромятные наручи с небольшим показателем защиты, являющиеся частью сыромятного снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'hide_boots',
		// 	'image': 'hide_boots',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 1,
		// 		'name': 'Сыромятные ботинки',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Легкая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '1кг.' }],
		// 		'description': 'Лёгкие сыромятные ботинки с небольшим показателем защиты, являющиеся частью сыромятного снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'hide_shield',
		// 	'image': 'hide_shield',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 1,
		// 		'name': 'Сыромятный щит',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Щит' }, { 'title': 'Состояние', 'value': '100%' }, {
		// 			'title': 'Вес',
		// 			'value': '5кг.',
		// 		}],
		// 		'description': 'Лёгкий щит с небольшим показателем защиты, являющийся частью сыромятного снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'leather_helmet',
		// 	'image': 'leather_helmet',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 0,
		// 		'name': 'Кожаный шлем',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Легкая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '2кг.' }],
		// 		'description': 'Кожаный шлем с небольшим показателем защиты, являющийся частью кожаного снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'leather_armor',
		// 	'image': 'leather_armor',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 0,
		// 		'name': 'Кожаная броня',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Легкая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '6кг.' }],
		// 		'description': 'Кожаная броня с небольшим показателем защиты, являющаяся частью кожаного снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'leather_bracers',
		// 	'image': 'leather_bracers',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 0,
		// 		'name': 'Кожаные наручи',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Легкая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '2кг.' }],
		// 		'description': 'Кожаные наручи с небольшим показателем защиты, являющиеся частью кожаного снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'leather_boots',
		// 	'image': 'leather_boots',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 0,
		// 		'name': 'Кожаные ботинки',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Легкая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '2кг.' }],
		// 		'description': 'Кожаные ботинки с небольшим показателем защиты, являющиеся частью кожаного снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'glass_helmet',
		// 	'image': 'glass_helmet',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 3,
		// 		'name': 'Стеклянный шлем',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Легкая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '2кг.' }],
		// 		'description': 'Стеклянный шлем, являющийся частью стеклянного снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'glass_armor',
		// 	'image': 'glass_armor',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 3,
		// 		'name': 'Стеклянная броня',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Легкая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '6кг.' }],
		// 		'description': 'Стеклянная броня, являющаяся частью стеклянного снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'glass_bracers',
		// 	'image': 'glass_bracers',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 3,
		// 		'name': 'Стеклянные наручи',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Легкая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '2кг.' }],
		// 		'description': 'Стеклянные наручи, являющиеся частью стеклянного снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'glass_boots',
		// 	'image': 'glass_boots',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 3,
		// 		'name': 'Стеклянные ботинки',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Легкая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '2кг.' }],
		// 		'description': 'Стеклянные ботинки, являющиеся частью стеклянного снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'glass_shield',
		// 	'image': 'glass_shield',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 3,
		// 		'name': 'Стеклянный щит',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Щит' }, { 'title': 'Состояние', 'value': '100%' }, {
		// 			'title': 'Вес',
		// 			'value': '7кг.',
		// 		}],
		// 		'description': 'Стеклянный щит, являющийся частью стеклянного снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'dragonscale_helmet',
		// 	'image': 'dragonscale_helmet',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 4,
		// 		'name': 'Драконий чешуйчатый шлем',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Легкая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '4кг.' }],
		// 		'description': 'Драконий чешуйчатый шлем, являющийся частью легкого драконьего снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'dragonscale_armor',
		// 	'image': 'dragonscale_armor',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 4,
		// 		'name': 'Драконья чешуйчатая броня',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Легкая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '10кг.' }],
		// 		'description': 'Драконья чешуйчатая броня, являющаяся частью легкого драконьего снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'dragonscale_bracers',
		// 	'image': 'dragonscale_bracers',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 4,
		// 		'name': 'Драконьи чешуйчатые наручи',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Легкая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '3кг.' }],
		// 		'description': 'Драконьи чешуйчатые наручи, являющиеся частью легкого драконьего снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'dragonscale_boots',
		// 	'image': 'dragonscale_boots',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 4,
		// 		'name': 'Драконьи чешуйчатые ботинки',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Легкая' }, {
		// 			'title': 'Состояние',
		// 			'value': '100%',
		// 		}, { 'title': 'Вес', 'value': '3кг.' }],
		// 		'description': 'Драконьи чешуйчатые ботинки, являющиеся частью легкого драконьего снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }, {
		// 	'id': 'dragonscale_shield',
		// 	'image': 'dragonscale_shield',
		// 	'type': 'ItemTypeArmor',
		// 	'info': {
		// 		'quality': 4,
		// 		'name': 'Драконий чешуйчатый щит',
		// 		'parameters': [{ 'title': 'Броня', 'value': 'Щит' }, { 'title': 'Состояние', 'value': '100%' }, {
		// 			'title': 'Вес',
		// 			'value': '6кг.',
		// 		}],
		// 		'description': 'Драконий чешуйчатый щит, являющийся частью легкого драконьего снаряжения',
		// 		'actions': [{ 'type': 'put_on', 'name': 'Надеть' }, { 'type': 'drop', 'name': 'Выбросить(Удалить)' }],
		// 	},
		// }
	],
	currentCraft: {
		result: {
			id: '123',
			image: 'ingot-test',
			type: ItemType.Ingredients,
			amount: 2,
			size: { width: 1, height: 3 },
			info: {
				quality: Quality.Rare,
				name: 'Слиток добра',
				parameters: [{ title: 'Шанс крафта', value: '35%' }],
				description: 'Огромный слиток странной формы',
			},
		},
		components: [
			{
				id: 'c1',
				image: 'ingot-test',
				type: ItemType.Ingredients,
				size: { width: 2, height: 3 },
				amount: 2,
				info: {
					quality: Quality.Rare,
					name: 'Слиток добра',
					parameters: [{ title: 'Шанс крафта', value: '35%' }],
					description: 'Огромный слиток странной формы',
					actions: [{ type: 'test', name: 'Проверить' }],
				},
			},
			null,
			null,
			null,
			null,
		],
		progress: {
			isStarted: true,
			isCompleted: true,
			time: { current: 0, max: 10 },
		},
	},
}

export const blacksmithSlice = createSlice({
	name: 'blacksmith',
	initialState,
	reducers: {
		show(state) {
			state.isOpen = true
		},
		hide(state) {
			state.isOpen = false
		},
		setRecipes(state, action: PayloadAction<RecipeDTO[]>) {
			state.recipes = action.payload
		},
		setCurrentCraft(state, action: PayloadAction<CurrentCraft>) {
			state.currentCraft = action.payload
		},
		incrementCurrentCraftTime(state) {
			if (state.currentCraft == null || !state.currentCraft.progress.isStarted) {
				return
			}
			if (state.currentCraft.progress.time.current >= state.currentCraft.progress.time.max) {
				state.currentCraft.progress.time.current = state.currentCraft.progress.time.max
			} else {
				state.currentCraft.progress.time.current += 1
			}
		},
	},
})

export const blacksmithReducer = blacksmithSlice.reducer
export const blacksmithActions = blacksmithSlice.actions
