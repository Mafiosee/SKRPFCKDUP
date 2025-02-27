import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import {
  CharSlots,
  EquipItemDto,
  ItemDto,
  ItemType,
  NearbyItemDto,
} from '../../shared/inventory/itemType'
import { Grids, GridType } from '../../shared/inventory/inventoryType'
import { Stats } from '../../shared/inventory/Stats'
import { Race } from '../../shared/Race/type'
import { Gender } from '../../shared/characterEditor/enums/Genders'
import { ItemHashes } from '../../shared/inventory/ItemHashes'

type Equipment = {
  [CharSlots.Backpack]: EquipItemDto
  [CharSlots.Headdress]: EquipItemDto
  [CharSlots.Amulet]: EquipItemDto
  [CharSlots.Outerwear]: EquipItemDto
  [CharSlots.Shoes]: EquipItemDto
  [CharSlots.Bracers]: EquipItemDto
  [CharSlots.Ring]: EquipItemDto
  [CharSlots.FirstHand]: EquipItemDto
  [CharSlots.SecondHand]: EquipItemDto
}

const GridNames = {
  [Grids.Inventory]: 'inventory',
  [Grids.Backpack]: 'backpack',
  [Grids.Container]: 'container',
  [Grids.Nearby]: 'nearbyItems',
}

type Search = null | {
  title: string
  race: Race
  gender: Gender
  name: string
  grid: GridType
}

type InventoryState = {
  isOpen: boolean
  inventory: GridType
  hasBackpack: boolean
  backpack?: GridType
  hasContainer: boolean
  container?: GridType
  nearbyItems?: NearbyItemDto[] | null
  equipment: Equipment
  stats: Stats
  showHelmet: boolean
  search: Search
}

const initialState: InventoryState = {
  isOpen: false,
  inventory: {
    size: {
      width: 7,
      height: 4,
    },
    maxWeight: 150,
    items: [
      {
        id: 405,
        size: {
          width: 2,
          height: 3,
        },
        position: {
          x: 0,
          y: 0,
        },
        image: 'dragonscale_shield',
        isTurned: true,
        amount: 1,
        type: ItemType.Potions,
        weight: 6,
        info: {
          quality: 4,
          name: 'Драконий чешуйчатый щит',
          parameters: [
            {
              title: 'Броня',
              value: 'Щит',
            },
            {
              title: 'Физическая Защита',
              value: '29',
            },
            {
              title: 'Магическая Защита',
              value: '0',
            },
            {
              title: 'Состояние',
              value: '100%',
            },
            {
              title: 'Вес',
              value: '6кг.',
            },
          ],
          description:
            'Драконий чешуйчатый щит, являющийся частью легкого драконьего снаряжения',
          actions: [
            {
              type: 'put_on',
              name: 'Надеть',
            },
            {
              type: 'drop',
              name: 'Выбросить(Удалить)',
            },
          ],
        },
        wearable: {
          slot: [CharSlots.FirstHand],
        },
        armor: 29,
      },
      {
        id: 407,
        size: {
          width: 2,
          height: 2,
        },
        position: {
          x: 3,
          y: 2,
        },
        image: 'leather_boots',
        isTurned: false,
        amount: 1,
        type: ItemType.Food,
        weight: 2,
        info: {
          quality: 0,
          name: 'Кожаные ботинки',
          parameters: [
            {
              title: 'Броня',
              value: 'Легкая',
            },
            {
              title: 'Физическая Защита',
              value: '7',
            },
            {
              title: 'Магическая Защита',
              value: '0',
            },
            {
              title: 'Состояние',
              value: '100%',
            },
            {
              title: 'Вес',
              value: '2кг.',
            },
          ],
          description:
            'Кожаные ботинки с небольшим показателем защиты, являющиеся частью кожаного снаряжения',
          actions: [
            {
              type: 'put_on',
              name: 'Надеть',
            },
            {
              type: 'drop',
              name: 'Выбросить(Удалить)',
            },
          ],
        },
        wearable: {
          slot: [CharSlots.Shoes],
        },
        armor: 7,
      },
      {
        id: 408,
        size: {
          width: 1,
          height: 1,
        },
        position: {
          x: 5,
          y: 0,
        },
        image: 'iron_ingot',
        isTurned: false,
        amount: 3,
        type: ItemType.Resources,
        weight: 1,
        info: {
          quality: 1,
          name: 'Железный слиток',
          parameters: [
            {
              title: 'Вес',
              value: '1 кг.',
            },
          ],
          description: 'Применяется для создания доспехов и оружия в кузнице',
          actions: [
            {
              type: 'drop',
              name: 'Выбросить(Удалить)',
            },
          ],
        },
        wearable: undefined,
        itemHash: ItemHashes.IRON_INGOT,
      },
      {
        id: 411,
        size: {
          width: 2,
          height: 2,
        },
        position: {
          x: 0,
          y: 2,
        },
        image: 'hide_boots',
        isTurned: false,
        amount: 1,
        type: ItemType.Weapon,
        weight: 1,
        info: {
          quality: 1,
          name: 'Сыромятные ботинки',
          parameters: [
            {
              title: 'Броня',
              value: 'Легкая',
            },
            {
              title: 'Физическая Защита',
              value: '5',
            },
            {
              title: 'Магическая Защита',
              value: '0',
            },
            {
              title: 'Состояние',
              value: '100%',
            },
            {
              title: 'Вес',
              value: '1кг.',
            },
          ],
          description:
            'Лёгкие сыромятные ботинки с небольшим показателем защиты, являющиеся частью сыромятного снаряжения',
          actions: [
            {
              type: 'put_on',
              name: 'Надеть',
            },
            {
              type: 'drop',
              name: 'Выбросить(Удалить)',
            },
          ],
        },
        wearable: {
          slot: [CharSlots.Shoes],
        },
        armor: 5,
      },
      {
        id: 413,
        size: {
          width: 2,
          height: 3,
        },
        position: {
          x: 5,
          y: 1,
        },
        image: 'leather_armor',
        isTurned: false,
        amount: 1,
        type: ItemType.Drinks,
        weight: 6,
        info: {
          quality: 0,
          name: 'Кожаная броня',
          parameters: [
            {
              title: 'Броня',
              value: 'Легкая',
            },
            {
              title: 'Физическая Защита',
              value: '26',
            },
            {
              title: 'Магическая Защита',
              value: '0',
            },
            {
              title: 'Состояние',
              value: '100%',
            },
            {
              title: 'Вес',
              value: '6кг.',
            },
          ],
          description:
            'Кожаная броня с небольшим показателем защиты, являющаяся частью кожаного снаряжения',
          actions: [
            {
              type: 'put_on',
              name: 'Надеть',
            },
            {
              type: 'drop',
              name: 'Выбросить(Удалить)',
            },
          ],
        },
        wearable: {
          slot: [CharSlots.Outerwear],
        },
        armor: 26,
      },
      {
        id: 399,
        size: {
          width: 2,
          height: 2,
        },
        position: {
          x: 3,
          y: 0,
        },
        image: 'dragonscale_bracers',
        isTurned: false,
        amount: 1,
        type: ItemType.Manuscripts,
        weight: 3,
        info: {
          quality: 4,
          name: 'Драконьи чешуйчатые наручи',
          parameters: [
            {
              title: 'Броня',
              value: 'Легкая',
            },
            {
              title: 'Физическая Защита',
              value: '12',
            },
            {
              title: 'Магическая Защита',
              value: '0',
            },
            {
              title: 'Состояние',
              value: '100%',
            },
            {
              title: 'Вес',
              value: '3кг.',
            },
          ],
          description:
            'Драконьи чешуйчатые наручи, являющиеся частью легкого драконьего снаряжения',
          actions: [
            {
              type: 'put_on',
              name: 'Надеть',
            },
            {
              type: 'drop',
              name: 'Выбросить(Удалить)',
            },
          ],
        },
        wearable: {
          slot: [CharSlots.Bracers],
        },
        armor: 12,
      },
    ],
  },
  hasBackpack: false,
  backpack: {
    size: {
      width: 7,
      height: 10,
    },
    items: [],
  },
  hasContainer: false,
  container: {
    title: 'Контейнер',
    size: {
      width: 7,
      height: 20,
    },
    items: [],
  },
  // nearbyItems: [
  // 	{
  // 		id: 4115,
  // 		size: {
  // 			width: 2,
  // 			height: 3,
  // 		},
  // 		image: 'dragonscale_shield',
  // 		amount: 1,
  // 		type: ItemType.Potions,
  // 		weight: 6,
  // 		info: {
  // 			quality: 4,
  // 			name: 'Драконий чешуйчатый щит',
  // 			parameters: [
  // 				{
  // 					title: 'Броня',
  // 					value: 'Щит',
  // 				},
  // 			],
  // 			description: 'Драконий чешуйчатый щит, являющийся частью легкого драконьего снаряжения',
  // 			actions: [
  // 				{
  // 					type: 'put_on',
  // 					name: 'Надеть',
  // 				},
  // 			],
  // 		},
  // 		wearable: {
  // 			slot: [
  // 				CharSlots.FirstHand,
  // 			],
  // 		},
  // 		armor: 29,
  // 	},
  // 	{
  // 		id: 4116,
  // 		size: {
  // 			width: 1,
  // 			height: 1,
  // 		},
  // 		image: 'dragonscale_shield',
  // 		amount: 1,
  // 		type: ItemType.Potions,
  // 		weight: 6,
  // 		info: {
  // 			quality: 4,
  // 			name: 'Драконий чешуйчатый щит',
  // 			parameters: [
  // 				{
  // 					title: 'Броня',
  // 					value: 'Щит',
  // 				},
  // 			],
  // 			description: 'Драконий чешуйчатый щит, являющийся частью легкого драконьего снаряжения',
  // 			actions: [
  // 				{
  // 					type: 'put_on',
  // 					name: 'Надеть',
  // 				},
  // 			],
  // 		},
  // 		wearable: {
  // 			slot: [
  // 				CharSlots.FirstHand,
  // 			],
  // 		},
  // 		armor: 29,
  // 	},
  // 	{
  // 		id: 4117,
  // 		size: {
  // 			width: 4,
  // 			height: 4,
  // 		},
  // 		image: 'dragonscale_shield',
  // 		amount: 1,
  // 		type: ItemType.Potions,
  // 		weight: 6,
  // 		info: {
  // 			quality: 4,
  // 			name: 'Драконий чешуйчатый щит',
  // 			parameters: [
  // 				{
  // 					title: 'Броня',
  // 					value: 'Щит',
  // 				},
  // 			],
  // 			description: 'Драконий чешуйчатый щит, являющийся частью легкого драконьего снаряжения',
  // 			actions: [
  // 				{
  // 					type: 'put_on',
  // 					name: 'Надеть',
  // 				},
  // 			],
  // 		},
  // 		wearable: {
  // 			slot: [
  // 				CharSlots.FirstHand,
  // 			],
  // 		},
  // 		armor: 29,
  // 	},
  // 	{
  // 		id: 4118,
  // 		size: {
  // 			width: 4,
  // 			height: 4,
  // 		},
  // 		image: 'dragonscale_shield',
  // 		amount: 1,
  // 		type: ItemType.Potions,
  // 		weight: 6,
  // 		info: {
  // 			quality: 4,
  // 			name: 'Драконий чешуйчатый щит',
  // 			parameters: [
  // 				{
  // 					title: 'Броня',
  // 					value: 'Щит',
  // 				},
  // 			],
  // 			description: 'Драконий чешуйчатый щит, являющийся частью легкого драконьего снаряжения',
  // 			actions: [
  // 				{
  // 					type: 'put_on',
  // 					name: 'Надеть',
  // 				},
  // 			],
  // 		},
  // 		wearable: {
  // 			slot: [
  // 				CharSlots.FirstHand,
  // 			],
  // 		},
  // 		armor: 29,
  // 	},
  // 	{
  // 		id: 4119,
  // 		size: {
  // 			width: 3,
  // 			height: 5,
  // 		},
  // 		image: 'dragonscale_shield',
  // 		amount: 1,
  // 		type: ItemType.Potions,
  // 		weight: 6,
  // 		info: {
  // 			quality: 4,
  // 			name: 'Драконий чешуйчатый щит',
  // 			parameters: [
  // 				{
  // 					title: 'Броня',
  // 					value: 'Щит',
  // 				},
  // 			],
  // 			description: 'Драконий чешуйчатый щит, являющийся частью легкого драконьего снаряжения',
  // 			actions: [
  // 				{
  // 					type: 'put_on',
  // 					name: 'Надеть',
  // 				},
  // 			],
  // 		},
  // 		wearable: {
  // 			slot: [
  // 				CharSlots.FirstHand,
  // 			],
  // 		},
  // 		armor: 29,
  // 	},
  // 	{
  // 		id: 4120,
  // 		size: {
  // 			width: 2,
  // 			height: 6,
  // 		},
  // 		image: 'dragonscale_shield',
  // 		amount: 1,
  // 		type: ItemType.Potions,
  // 		weight: 6,
  // 		info: {
  // 			quality: 4,
  // 			name: 'Драконий чешуйчатый щит',
  // 			parameters: [
  // 				{
  // 					title: 'Броня',
  // 					value: 'Щит',
  // 				},
  // 			],
  // 			description: 'Драконий чешуйчатый щит, являющийся частью легкого драконьего снаряжения',
  // 			actions: [
  // 				{
  // 					type: 'put_on',
  // 					name: 'Надеть',
  // 				},
  // 			],
  // 		},
  // 		wearable: {
  // 			slot: [
  // 				CharSlots.FirstHand,
  // 			],
  // 		},
  // 		armor: 29,
  // 	},
  // ],
  nearbyItems: null,
  equipment: {
    [CharSlots.Backpack]: null,
    [CharSlots.Headdress]: null,
    [CharSlots.Amulet]: null,
    [CharSlots.Outerwear]: null,
    [CharSlots.Shoes]: null,
    [CharSlots.Bracers]: null,
    [CharSlots.Ring]: null,
    [CharSlots.FirstHand]: null,
    [CharSlots.SecondHand]: null,
  },
  stats: {
    thirst: 25,
    hungry: 90,
  },
  showHelmet: true,
  search: null,
  // 	{
  // 	title: 'Сумка',
  // 	race: Race.Imperial,
  // 	gender: Gender.Male,
  // 	name: 'Луцио Серая Грива',
  // 	grid: {
  // 		size: { width: 7, height: 20 },
  // 		maxWeight: 150,
  // 		items: [
  // 			{
  // 				id: 111,
  // 				size: { width: 1, height: 2 },
  // 				position: { x: 0, y: 0 },
  // 				image: 'leather_strips',
  // 				isTurned: false,
  // 				amount: 8,
  // 				type: ItemType.Resources,
  // 				weight: 1.35,
  // 				info: {
  // 					quality: 1,
  // 					name: 'Полоски кожи',
  // 					parameters: [{ title: 'Вес', value: '1 кг.' }],
  // 					description: 'Применяются для создания доспехов и оружия в кузнице',
  // 					actions: [{ type: 'drop', name: 'Выбросить(Удалить)' }],
  // 				},
  // 				itemHash: ItemHashes.BAIT,
  // 			},
  // 		],
  // 	},
  // },
}

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    show(state) {
      state.isOpen = true
    },
    hide(state) {
      state.isOpen = false
    },

    // Grids

    setInventory(state, action: PayloadAction<GridType>) {
      state.inventory = action.payload
    },
    setHasBackpack(state, action: PayloadAction<boolean>) {
      state.hasBackpack = action.payload
    },
    setBackpack(state, action: PayloadAction<GridType>) {
      state.backpack = action.payload
    },
    setHasContainer(state, action: PayloadAction<boolean>) {
      state.hasContainer = action.payload
    },
    setContainer(state, action: PayloadAction<GridType>) {
      state.container = action.payload
    },
    setNearbyItems(state, action: PayloadAction<NearbyItemDto[] | null>) {
      state.nearbyItems = action.payload
    },
    addNearbyItem(state, action: PayloadAction<NearbyItemDto>) {
      if (state.nearbyItems == null) {
        return
      }
      state.nearbyItems.push(action.payload)
    },
    removeNearbyItem(state, action: PayloadAction<{ itemId: any }>) {
      if (state.nearbyItems == null) {
        return
      }
      const { itemId } = action.payload
      const itemIndex = state.nearbyItems.findIndex(
        (item) => item.id === itemId,
      )
      if (!~itemIndex) {
        return
      }
      state.nearbyItems.splice(itemIndex, 1)
    },

    addGridItem(
      state,
      action: PayloadAction<{ gridId: Grids; item: ItemDto }>,
    ) {
      const { gridId, item } = action.payload
      // @ts-expect error
      const gridName = GridNames[gridId]
      // @ts-expect error
      if (!state[gridName]) {
        return
      }
      // @ts-expect error
      state[gridName].items.push(item)
    },
    removeGridItem(
      state,
      action: PayloadAction<{ gridId: Grids; itemId: any }>,
    ) {
      const { gridId, itemId } = action.payload
      // @ts-expect error
      const gridName = GridNames[gridId]
      // @ts-expect error
      if (!state[gridName]) {
        return
      }
      // @ts-expect error
      state[gridName].items = state[gridName].items.filter(
        (el: ItemDto) => el.id !== itemId,
      )
    },
    updateGridItem(
      state,
      action: PayloadAction<{ gridId: Grids; item: ItemDto }>,
    ) {
      const { gridId, item } = action.payload
      // @ts-expect error
      const gridName = GridNames[gridId]
      // @ts-expect error
      if (!state[gridName]) {
        return
      }
      // @ts-expect error
      const itemIdx: number = [...state[gridName].items].findIndex(
        (el) => el.id === item.id,
      )
      if (!~itemIdx) {
        return
      }
      // @ts-expect error
      state[gridName].items[itemIdx] = { ...item }
    },

    // Equipment

    setEquipment(state, action: PayloadAction<Equipment>) {
      state.equipment = action.payload
    },

    setEquipmentItem(
      state,
      action: PayloadAction<{
        slotId: keyof Equipment
        item: EquipItemDto | null
      }>,
    ) {
      const { slotId, item } = action.payload
      state.equipment[slotId] = item
    },

    setShowHelmet(state, action: PayloadAction<boolean>) {
      state.showHelmet = action.payload
    },

    setStats(state, action: PayloadAction<Stats>) {
      state.stats = action.payload
    },

    setSearch(state, action: PayloadAction<Search>) {
      state.search = action.payload
    },
  },
})

export const inventoryReducer = inventorySlice.reducer
export const inventoryActions = inventorySlice.actions
