import { ItemHashes } from '../inventory/ItemHashes'

export enum BlacksmithEvents {
	Close = 'blacksmith:close',
	Cancel = 'blacksmith:cancel',
	ChooseRecipe = 'blacksmith:chooseRecipe',
	ItemAction = 'blacksmith:itemAction',
	Start = 'blacksmith:start',
}

export enum AlchemyTableEvents {
	Close = 'alchemyTable:close',
	Cancel = 'alchemyTable:cancel',
	ChooseRecipe = 'alchemyTable:chooseRecipe',
	ItemAction = 'alchemyTable:itemAction',
	Start = 'alchemyTable:start',
}

export enum EnchantTableEvents {
	Close = 'enchantTable:close',
	Cancel = 'enchantTable:cancel',
	ChooseRecipe = 'enchantTable:chooseRecipe',
	ItemAction = 'enchantTable:itemAction',
	Start = 'enchantTable:start',
}

export enum TanningEvents {
	Close = 'tanning:close',
	Cancel = 'tanning:cancel',
	ChooseRecipe = 'tanning:chooseRecipe',
	ItemAction = 'tanning:itemAction',
	Start = 'tanning:start',
}

export enum WorkbenchEvents {
	Close = 'workbench:close',
	Cancel = 'workbench:cancel',
	ChooseRecipe = 'workbench:chooseRecipe',
	ItemAction = 'workbench:itemAction',
	Start = 'workbench:start',
}

export enum CookingEvents {
	Close = 'cooking:close',
	Cancel = 'cooking:cancel',
	ChooseRecipe = 'cooking:chooseRecipe',
	ItemAction = 'cooking:itemAction',
	Start = 'cooking:start',
}

export type CraftConfirmPayload = {
	amount: number
}

export type ChooseRecipePayload = {
	recipeId: ItemHashes
}
