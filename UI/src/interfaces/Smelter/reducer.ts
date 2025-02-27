import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {
  CraftItemDto,
  ItemType,
  Quality,
} from '../../shared/inventory/itemType'
import { RecipeDTO } from '../../shared/Crafts/types'
import { ItemHashes } from '../../shared/inventory/ItemHashes'
import { callClient } from '../../utils/api'

type CurrentCraft = {
  result: CraftItemDto
  components: CraftItemDto[]
  progress: {
    isStarted: boolean
    isCompleted: boolean
    time: { current: number; max: number }
  }
} | null

type SmelterState = {
  isOpen: boolean
  recipes: RecipeDTO[]
  currentCraft: CurrentCraft
}

const initialState: SmelterState = {
  isOpen: false,
  recipes: [
    {
      id: ItemHashes.BACKPACK,
      image: 'ale',
      type: ItemType.Ingredients,
      info: {
        quality: Quality.Rare,
        name: 'Слиток добра',
        parameters: [{ title: 'Шанс крафта', value: '35%' }],
        description: 'Огромный слиток странной формы',
      },
    },
  ],
  currentCraft: null,
  // {
  // 	result:
  // 	// null,
  // 		{
  // 			id: '123',
  // 			image: 'ingot-test',
  // 			type: ItemType.Ingredients,
  // 			size: { width: 2, height: 3 },
  // 			amount: 2,
  // 			info: {
  // 				quality: Quality.Rare,
  // 				name: 'Слиток добра',
  // 				parameters: [{ title: 'Шанс крафта', value: '35%' }],
  // 				description: 'Огромный слиток странной формы',
  // 			},
  // 		},
  // 	components: [
  // 		// {
  // 		// 	id: 'c1',
  // 		// 	image: 'ingot-test',
  // 		// 	type: ItemType.Ingredients,
  // 		// 	size: { width: 2, height: 3 },
  // 		// 	amount: 2,
  // 		// 	info: {
  // 		// 		quality: Quality.Rare,
  // 		// 		name: 'Слиток добра',
  // 		// 		parameters: [{ title: 'Шанс крафта', value: '35%' }],
  // 		// 		description: 'Огромный слиток странной формы',
  // 		// 		actions: [{ type: 'test', name: 'Проверить' }],
  // 		// 	},
  // 		// },
  // 		null,
  // 	],
  // 	progress: {
  // 		isStarted: true,
  // 		isCompleted: false,
  // 		time: { current: 0, max: 10 },
  // 	},
  // },
}

export const smelterSlice = createSlice({
  name: 'smelter',
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
      // callClient('logger', JSON.stringify(action.payload))
    },
    setCurrentCraft(state, action: PayloadAction<CurrentCraft>) {
      state.currentCraft = action.payload
    },
    incrementCurrentCraftTime(state) {
      if (
        state.currentCraft == null ||
        !state.currentCraft.progress.isStarted
      ) {
        return
      }
      if (
        state.currentCraft.progress.time.current >=
        state.currentCraft.progress.time.max
      ) {
        state.currentCraft.progress.time.current =
          state.currentCraft.progress.time.max
      } else {
        state.currentCraft.progress.time.current += 1
      }
    },
  },
})

export const smelterReducer = smelterSlice.reducer
export const smelterActions = smelterSlice.actions
