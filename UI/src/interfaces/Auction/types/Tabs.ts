export enum Tab {
  Lots = 'Lots',
  SelfBets = 'SelfBets',
  SelfLots = 'SelfLots',
  Favorites = 'Favorites',
}

export const TabName: Record<Tab, string> = {
  [Tab.Lots]: 'Лоты',
  [Tab.SelfBets]: 'Мои ставки',
  [Tab.SelfLots]: 'Мои лоты',
  [Tab.Favorites]: 'Избранное',
}
