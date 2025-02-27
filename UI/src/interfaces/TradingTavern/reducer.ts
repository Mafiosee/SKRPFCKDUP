import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { Category } from '../../shared/TradingStore/Category'
import { Product } from '../../shared/TradingTavern/Product'
import { ItemType, Quality } from '../../shared/inventory/itemType'
import { Type } from '../../shared/TradingTavern/Type'
import { numberWithSeparator } from '../../utils/numberWithSeparator'

type TradingTavernState = {
	isOpen: boolean;
	info: {
		name: string
		type: Type
	}
	categories: Category[]
	products: Product[]
};

const initialState: TradingTavernState = {
	isOpen: false,
	info: {
		name: 'Сытый странник',
		type: Type.Light,
	},
	categories: [
		{
			id: 'food',
			name: 'Еда',
		},
		{
			id: 'water',
			name: 'Напитки',
		},
		{
			id: 'ingredients',
			name: 'Ингридиенты',
		},
	],
	products: [
		{
			id: 'jug_of_milk',
			categoryId: 'water',
			image: 'jug_of_milk',
			type: ItemType.Drinks,
			price: 15,
			info: {
				quality: 2,
				name: 'Кувшин молока',
				parameters: [
					{
						title: 'Восполняет',
						value: '30 ед. жажды',
					},
					{
						title: 'Восполняет',
						value: '10 ед. еды',
					},
					{
						title: 'Вес',
						value: '1 кг.',
					},
				],
				description: 'Вкусное и полезное, не только утоляет жажду, но и немного насыщает.',
				actions: [
					{
						type: 'food_and_water',
						name: 'Использовать',
					},
					{
						type: 'drop',
						name: 'Выбросить(Удалить)',
					},
				],
			},
			maxAmount: 1,
		},
		{
			id: 'cooked_beef',
			categoryId: 'food',
			image: 'cooked_beef',
			type: ItemType.Food,
			price: 15,
			info: {
				quality: 0,
				name: 'Отварная говядина',
				parameters: [
					{
						title: 'Восполняет',
						value: '35 ед. еды',
					},
					{
						title: 'Вес',
						value: '0.5 кг.',
					},
				],
				description: 'Сытный и ароматный кусок варёного мяса.',
				actions: [
					{
						type: 'eat',
						name: 'Съесть',
					},
					{
						type: 'drop',
						name: 'Выбросить(Удалить)',
					},
				],
			},
		},
		{
			id: 'salt',
			categoryId: 'ingredients',
			image: 'salt',
			type: ItemType.Food,
			price: 15,
			info: {
				quality: 1,
				name: 'Соль',
				parameters: [
					{
						title: 'Восполняет',
						value: '0 ед. еды',
					},
					{
						title: 'Вес',
						value: '0.5 кг.',
					},
				],
				description: 'Незаменимый ингредиент для приготовления еды. В чистом виде употреблять не рекомендуется.',
				actions: [
					{
						type: 'eat',
						name: 'Съесть',
					},
					{
						type: 'drop',
						name: 'Выбросить(Удалить)',
					},
				],
			},
		},
		{
			id: 'leek',
			categoryId: 'ingredients',
			image: 'leek',
			type: ItemType.Food,
			price: 15,
			info: {
				quality: 1,
				name: 'Лук-порей',
				parameters: [
					{
						title: 'Восполняет',
						value: '10 ед. еды',
					},
					{
						title: 'Вес',
						value: '0.5 кг.',
					},
				],
				description: 'Холодостойкий овощ, прекрасно растущий в Скайриме. Плохо насыщает в сыром виде.',
				actions: [
					{
						type: 'eat',
						name: 'Съесть',
					},
					{
						type: 'drop',
						name: 'Выбросить(Удалить)',
					},
				],
			},
		},
		{
			id: 'sack_of_flour',
			categoryId: 'ingredients',
			image: 'sack_of_flour',
			type: ItemType.Food,
			price: 18,
			info: {
				quality: 0,
				name: 'Мешок муки',
				parameters: [
					{
						title: 'Восполняет',
						value: '12 ед. еды',
					},
					{
						title: 'Вес',
						value: '0.5 кг.',
					},
				],
				description: 'Пшеничная мука высшего качества. Подходит для изготовления любых хлебобулочных изделий.',
				actions: [
					{
						type: 'eat',
						name: 'Съесть',
					},
					{
						type: 'drop',
						name: 'Выбросить(Удалить)',
					},
				],
			},
		},
		{
			id: 'raw_rabbit_leg',
			categoryId: 'ingredients',
			image: 'raw_rabbit_leg',
			type: ItemType.Food,
			price: 18,
			info: {
				quality: 0,
				name: 'Сырая кроличья ножка',
				parameters: [
					{
						title: 'Восполняет',
						value: '12 ед. еды',
					},
					{
						title: 'Вес',
						value: '0.5 кг.',
					},
				],
				description: 'Вкусное и нежное мясо дикого кролика.',
				actions: [
					{
						type: 'eat',
						name: 'Съесть',
					},
					{
						type: 'drop',
						name: 'Выбросить(Удалить)',
					},
				],
			},
		},
		{
			id: 'venison',
			categoryId: 'ingredients',
			image: 'venison',
			type: ItemType.Food,
			price: 21,
			info: {
				quality: 2,
				name: 'Оленина',
				parameters: [
					{
						title: 'Восполняет',
						value: '14 ед. еды',
					},
					{
						title: 'Вес',
						value: '0.5 кг.',
					},
				],
				description: 'Вкуснейшее лакомство, высоко ценимое гурманами.',
				actions: [
					{
						type: 'eat',
						name: 'Съесть',
					},
					{
						type: 'drop',
						name: 'Выбросить(Удалить)',
					},
				],
			},
		},
		{
			id: 'tomato',
			categoryId: 'ingredients',
			image: 'tomato',
			type: ItemType.Food,
			price: 24,
			info: {
				quality: 3,
				name: 'Помидор',
				parameters: [
					{
						title: 'Восполняет',
						value: '16 ед. еды',
					},
					{
						title: 'Вес',
						value: '0.5 кг.',
					},
				],
				description: 'Довольно редкий для Скайрима теплолюбивый овощ. В основном завозится из южных провинций.',
				actions: [
					{
						type: 'eat',
						name: 'Съесть',
					},
					{
						type: 'drop',
						name: 'Выбросить(Удалить)',
					},
				],
			},
		},
		{
			id: 'potato',
			categoryId: 'ingredients',
			image: 'potato',
			type: ItemType.Food,
			price: 24,
			info: {
				quality: 3,
				name: 'Картофель',
				parameters: [
					{
						title: 'Восполняет',
						value: '16 ед. еды',
					},
					{
						title: 'Вес',
						value: '0.5 кг.',
					},
				],
				description: 'Неприхотливое растение, приспособившееся к суровому местному климату.',
				actions: [
					{
						type: 'eat',
						name: 'Съесть',
					},
					{
						type: 'drop',
						name: 'Выбросить(Удалить)',
					},
				],
			},
		},
		{
			id: 'cabbage',
			categoryId: 'ingredients',
			image: 'cabbage',
			type: ItemType.Food,
			price: 24,
			info: {
				quality: 3,
				name: 'Капуста',
				parameters: [
					{
						title: 'Восполняет',
						value: '16 ед. еды',
					},
					{
						title: 'Вес',
						value: '0.5 кг.',
					},
				],
				description: 'Сочный, полный витаминов овощ. В правильных условиях может храниться долгое время.',
				actions: [
					{
						type: 'eat',
						name: 'Съесть',
					},
					{
						type: 'drop',
						name: 'Выбросить(Удалить)',
					},
				],
			},
		},
		{
			id: 'apple',
			categoryId: 'ingredients',
			image: 'apple',
			type: ItemType.Food,
			price: 30,
			info: {
				quality: 3,
				name: 'Яблоко',
				parameters: [
					{
						title: 'Восполняет',
						value: '16 ед. еды',
					},
					{
						title: 'Вес',
						value: '0.5 кг.',
					},
				],
				description: 'Особый хладостойкий сорт фруктов. Выведен специально для северных провинций.',
				actions: [
					{
						type: 'eat',
						name: 'Съесть',
					},
					{
						type: 'drop',
						name: 'Выбросить(Удалить)',
					},
				],
			},
		},
		{
			id: 'eidar_cheese_wedge',
			categoryId: 'ingredients',
			image: 'eidar_cheese_wedge',
			type: ItemType.Food,
			price: 30,
			info: {
				quality: 4,
				name: 'Кусок эйдарского сыра',
				parameters: [
					{
						title: 'Восполняет',
						value: '18 ед. еды',
					},
					{
						title: 'Вес',
						value: '0.5 кг.',
					},
				],
				description: 'Кусок сыра, заплесневелый и жутко вонючий. На вкус столь же отвратителен, как и на вид. Впрочем, находятся безумцы, считающие его деликатесом.',
				actions: [
					{
						type: 'eat',
						name: 'Съесть',
					},
					{
						type: 'drop',
						name: 'Выбросить(Удалить)',
					},
				],
			},
		},
		{
			id: 'grilled_leeks',
			categoryId: 'food',
			image: 'grilled_leeks',
			type: ItemType.Food,
			price: 30,
			info: {
				quality: 1,
				name: 'Жареный лук-порей',
				parameters: [
					{
						title: 'Восполняет',
						value: '20 ед. еды',
					},
					{
						title: 'Вес',
						value: '0.5 кг.',
					},
				],
				description: 'Простейшее блюдо, хрустящее и очень вкусное.',
				actions: [
					{
						type: 'eat',
						name: 'Съесть',
					},
					{
						type: 'drop',
						name: 'Выбросить(Удалить)',
					},
				],
			},
		},
		{
			id: 'grilled_chicken_breast',
			categoryId: 'food',
			image: 'grilled_chicken_breast',
			type: ItemType.Food,
			price: 38,
			info: {
				quality: 1,
				name: 'Жареная куриная грудка',
				parameters: [
					{
						title: 'Восполняет',
						value: '25 ед. еды',
					},
					{
						title: 'Вес',
						value: '0.5 кг.',
					},
				],
				description: 'Ароматное мясо с золотистой корочкой.',
				actions: [
					{
						type: 'eat',
						name: 'Съесть',
					},
					{
						type: 'drop',
						name: 'Выбросить(Удалить)',
					},
				],
			},
		},
		{
			id: 'rabbit_haunch',
			categoryId: 'food',
			image: 'rabbit_haunch',
			type: ItemType.Food,
			price: 45,
			info: {
				quality: 0,
				name: 'Жареная кроличья ножка',
				parameters: [
					{
						title: 'Восполняет',
						value: '30 ед. еды',
					},
					{
						title: 'Вес',
						value: '0.5 кг.',
					},
				],
				description: 'Очень вкусное и нежное мясо.',
				actions: [
					{
						type: 'eat',
						name: 'Съесть',
					},
					{
						type: 'drop',
						name: 'Выбросить(Удалить)',
					},
				],
			},
		},
		{
			id: 'bread',
			categoryId: 'food',
			image: 'bread',
			type: ItemType.Food,
			price: 53,
			info: {
				quality: 0,
				name: 'Хлеб',
				parameters: [
					{
						title: 'Восполняет',
						value: '35 ед. еды',
					},
					{
						title: 'Вес',
						value: '0.5 кг.',
					},
				],
				description: 'Самая распространённая еда во всём Тамриэле.',
				actions: [
					{
						type: 'eat',
						name: 'Съесть',
					},
					{
						type: 'drop',
						name: 'Выбросить(Удалить)',
					},
				],
			},
		},
		{
			id: 'venison_stew',
			categoryId: 'food',
			image: 'venison_stew',
			type: ItemType.Food,
			price: 75,
			info: {
				quality: 2,
				name: 'Похлёбка из оленины',
				parameters: [
					{
						title: 'Восполняет',
						value: '35 ед. еды',
					},
					{
						title: 'Вес',
						value: '0.5 кг.',
					},
				],
				description: 'Густой ароматный суп. Не только насыщает, но и отлично согревает.',
				actions: [
					{
						type: 'eat',
						name: 'Съесть',
					},
					{
						type: 'drop',
						name: 'Выбросить(Удалить)',
					},
				],
			},
		},
		{
			id: 'braided_bread',
			categoryId: 'food',
			image: 'braided_bread',
			type: ItemType.Food,
			price: 75,
			info: {
				quality: 2,
				name: 'Булка-плетёнка',
				parameters: [
					{
						title: 'Восполняет',
						value: '50 ед. еды',
					},
					{
						title: 'Вес',
						value: '0.5 кг.',
					},
				],
				description: 'Мягкая, нежная, ароматная булка.',
				actions: [
					{
						type: 'eat',
						name: 'Съесть',
					},
					{
						type: 'drop',
						name: 'Выбросить(Удалить)',
					},
				],
			},
		},
		{
			id: 'chicken_breast',
			categoryId: 'ingredients',
			image: 'chicken_breast',
			type: ItemType.Food,
			price: 21,
			info: {
				quality: 1,
				name: 'Куриная грудка',
				parameters: [
					{
						title: 'Восполняет',
						value: '10 ед. еды',
					},
					{
						title: 'Вес',
						value: '0.5 кг.',
					},
				],
				description: 'Лучше не пытаться самостоятельно получить её из домашних кур, - почему-то стражники это очень не любят.',
				actions: [
					{
						type: 'eat',
						name: 'Съесть',
					},
					{
						type: 'drop',
						name: 'Выбросить(Удалить)',
					},
				],
			},
		},
		{
			id: 'cabbage_potato_soup',
			categoryId: 'food',
			image: 'cabbage_potato_soup',
			type: ItemType.Drinks,
			price: 105,
			info: {
				quality: 3,
				name: 'Капустный суп с картошкой',
				parameters: [
					{
						title: 'Восполняет',
						value: '30 ед. жажды',
					},
					{
						title: 'Восполняет',
						value: '40 ед. еды',
					},
					{
						title: 'Вес',
						value: '1 кг.',
					},
				],
				description: 'Овощной суп, лёгкий, но вкусный и сытный.',
				actions: [
					{
						type: 'food_and_water',
						name: 'Использовать',
					},
					{
						type: 'drop',
						name: 'Выбросить(Удалить)',
					},
				],
			},
		},
		{
			id: 'tomato_soup',
			categoryId: 'food',
			image: 'tomato_soup',
			type: ItemType.Drinks,
			price: 120,
			info: {
				quality: 3,
				name: 'Томатный суп',
				parameters: [
					{
						title: 'Восполняет',
						value: '40 ед. жажды',
					},
					{
						title: 'Восполняет',
						value: '40 ед. еды',
					},
					{
						title: 'Вес',
						value: '1 кг.',
					},
				],
				description: 'Овощной суп, приготовленный из томатов. Одинаково хорош как в горячем, так и в холодном виде.',
				actions: [
					{
						type: 'food_and_water',
						name: 'Использовать',
					},
					{
						type: 'drop',
						name: 'Выбросить(Удалить)',
					},
				],
			},
		},
		{
			id: 'apple_pie',
			categoryId: 'food',
			image: 'apple_pie',
			type: ItemType.Food,
			price: 150,
			info: {
				quality: 4,
				name: 'Яблочный пирог',
				parameters: [
					{
						title: 'Восполняет',
						value: '100 ед. еды',
					},
					{
						title: 'Вес',
						value: '0.5 кг.',
					},
				],
				description: 'Сладкая выпечка, настоящее лакомство.',
				actions: [
					{
						type: 'eat',
						name: 'Съесть',
					},
					{
						type: 'drop',
						name: 'Выбросить(Удалить)',
					},
				],
			},
		},
		{
			id: 'elsweyr_fondue',
			categoryId: 'food',
			image: 'elsweyr_fondue',
			type: ItemType.Drinks,
			price: 150,
			info: {
				quality: 4,
				name: 'Эльсвейрcкое фондю',
				parameters: [
					{
						title: 'Восполняет',
						value: '50 ед. жажды',
					},
					{
						title: 'Восполняет',
						value: '50 ед. еды',
					},
					{
						title: 'Вес',
						value: '1 кг.',
					},
				],
				description: 'Пикантное блюдо из очень специфических ингредиентов. Утоляет и голод, и жажду.',
				actions: [
					{
						type: 'food_and_water',
						name: 'Использовать',
					},
					{
						type: 'drop',
						name: 'Выбросить(Удалить)',
					},
				],
			},
		},
		{
			id: 'sweetroll',
			categoryId: 'food',
			image: 'sweetroll',
			type: ItemType.Food,
			price: 150,
			info: {
				quality: 4,
				name: 'Сладкий рулет',
				parameters: [
					{
						title: 'Восполняет',
						value: '100 ед. еды',
					},
					{
						title: 'Вес',
						value: '0.5 кг.',
					},
				],
				description: 'Такой аппетитный... Смотри, чтоб не украли!',
				actions: [
					{
						type: 'eat',
						name: 'Съесть',
					},
					{
						type: 'drop',
						name: 'Выбросить(Удалить)',
					},
				],
			},
		},
		{
			id: 'bottle_of_water',
			categoryId: 'water',
			image: 'bottle_of_water',
			type: ItemType.Drinks,
			price: 23,
			info: {
				quality: 1,
				name: 'Бутылка воды',
				parameters: [
					{
						title: 'Восполняет',
						value: '15 ед. жажды',
					},
					{
						title: 'Вес',
						value: '1 кг.',
					},
				],
				description: 'Прозрачная и освежающая, эта вода из чистейших источников утоляет жажду путника и возвращает его к жизни в пути к новым приключениям.',
				actions: [
					{
						type: 'drink',
						name: 'Выпить',
					},
					{
						type: 'drop',
						name: 'Выбросить(Удалить)',
					},
				],
			},
		},
	],
}

export const tradingTavernSlice = createSlice({
	name: 'tradingTavern',
	initialState,
	reducers: {
		show(state) {
			state.isOpen = true
		},
		hide(state) {
			state.isOpen = false
		},
		setInfo(state, action: PayloadAction<{ name: string, type: Type }>) {
			state.info = action.payload
		},
		setCategories(state, action: PayloadAction<Category[]>) {
			state.categories = action.payload
		},
		setProducts(state, action: PayloadAction<Product[]>) {
			state.products = action.payload.map(product => {
				if (!product.info.parameters) {
					product.info.parameters = []
				}
				product.info.parameters.push({ title: 'Цена', value: numberWithSeparator(product.price, '.') })
				return product
			})
		},
	},
})

export const tradingTavernReducer = tradingTavernSlice.reducer
export const tradingTavernActions = tradingTavernSlice.actions
