import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
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

type WorkbenchState = {
	isOpen: boolean
	recipes: RecipeDTO[]
	currentCraft: CurrentCraft
}

const initialState: WorkbenchState = {
	isOpen: false,
	recipes: [
		{
			id: ItemHashes.BACKPACK,
			image: 'ingot-test',
			type: ItemType.Ingredients,
			info: {
				quality: Quality.Rare,
				name: 'Слиток добра',
				parameters: [{ title: 'Шанс крафта', value: '35%' }],
				description: 'Огромный слиток странной формы',
			},
		},
	],
	currentCraft: {
		result: {
			id: '123',
			image: 'ingot-test',
			type: ItemType.Ingredients,
			size: { width: 2, height: 3 },
			amount: 2,
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
		],
		progress: {
			isStarted: true,
			isCompleted: true,
			time: { current: 5, max: 10 },
		},
	},
}

export const workbenchSlice = createSlice({
	name: 'workbench',
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
			if (state.currentCraft == null || !state.currentCraft.progress.isStarted) return
			if (state.currentCraft.progress.time.current >= state.currentCraft.progress.time.max)
				state.currentCraft.progress.time.current = state.currentCraft.progress.time.max
			else state.currentCraft.progress.time.current += 1
		},
	},
})

export const workbenchReducer = workbenchSlice.reducer
export const workbenchActions = workbenchSlice.actions
