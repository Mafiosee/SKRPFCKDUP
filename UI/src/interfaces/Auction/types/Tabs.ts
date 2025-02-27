export enum TabId {
  Main = 'Main',
  SelfBets = 'SelfBets',
  SelfLots = 'SelfLots',
}

export const TabName: Record<TabId, string> = {
  [TabId.Main]: 'Главная',
  [TabId.SelfBets]: 'Мои ставки',
  [TabId.SelfLots]: 'Мои лоты',
}

export const TabCategoriesTitle: Record<TabId, string> = {
  [TabId.Main]: 'Активные лоты',
  [TabId.SelfBets]: 'Ваши ставки',
  [TabId.SelfLots]: 'ваши ставки',
}

export const TabsList: TabId[] = [TabId.Main, TabId.SelfBets, TabId.SelfLots]
