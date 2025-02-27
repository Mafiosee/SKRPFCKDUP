export enum WorkStatus {
  Unavailable, // Недоступно, серая кнопка "Требуется уровень: {level}"
  Available, // Доступно, белая кнопка "Начать работу"
  Working, // Уже работает, красная кнопка "Закончить работу"
}

export enum Works {
  Farm,
  Sawmill,
  HoneyFactory,
}

export const WorksImages = {
  [Works.Farm]: {
    bg: 'farm',
    icons: {
      potato: 'potato',
      wheat: 'wheat',
      bag_cow: 'bag_cow',
      watering_can: 'watering_can',
      apple: 'apple',
    },
    works: {
      potato: 'farm_3',
      wheat: 'farm_0',
      bag_cow: 'farm_2',
      watering_can: 'farm_1',
      apple: 'apple',
    },
  },
  [Works.Sawmill]: {
    bg: 'forest',
    icons: {
      wood: 'wood',
    },
    works: {
      level_1: 'forest_0',
      level_2: 'forest_1',
      level_3: 'forest_2',
      level_4: 'forest_3',
    },
  },
  [Works.HoneyFactory]: {
    bg: 'honey',
    icons: {
      honey: 'honey',
    },
    works: {
      level_1: 'honey_0',
      level_2: 'honey_1',
      level_3: 'honey_2',
    },
  },
}

export type Work = {
  id: any
  level: number
  name: string
  description: string
  status: WorkStatus
  icon: string
  salary: number
  progress: { current: number; max: number }
  image: string
}
