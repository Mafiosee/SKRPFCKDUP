import { LotType } from '../../../shared/Auction/LotType'

export const CategoriesList: { lotType: LotType | null, name: string }[] = [
	{ lotType: null, name: 'Все' },
	{ lotType: LotType.House, name: 'Дома' },
	{ lotType: LotType.FamilyHouse, name: 'Семейные дома' },
	{ lotType: LotType.Business, name: 'Бизнесы' },
]