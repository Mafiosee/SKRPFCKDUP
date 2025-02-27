export enum TabId {
  Info = 'Info',
  Statistics = 'Statistics',
}

export const TabName: Record<TabId, string> = {
  [TabId.Info]: 'Информация',
  [TabId.Statistics]: 'Статистика',
}

export const TabList: TabId[] = [TabId.Info, TabId.Statistics]
