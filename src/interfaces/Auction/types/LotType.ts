import { LotType } from '../../../shared/Auction/LotType'

export const LotTypeName: Record<LotType, string> = {
	[LotType.Business]: 'Бизнес',
	[LotType.House]: 'Дом',
	[LotType.FamilyHouse]: 'Семейный дом',
}