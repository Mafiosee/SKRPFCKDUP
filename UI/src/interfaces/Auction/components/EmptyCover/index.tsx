import React, { useMemo } from 'react'
import './styles.sass'
import { useAppSelector } from '../../../../hooks/redux'
import { Tab } from '../../types/Tabs'
import { getFilteredLots } from '../../utils/getFilteredLots'

type ConfigItem = {
  title: string
  helper: string
  iconUrl: string
}

const Config: Record<Tab, ConfigItem> = {
  [Tab.Lots]: {
    title: 'Лоты не найдены',
    helper:
      'Возможно еще никто не создал лоты или произошла техническая ошибка, которую мы активно решаем.',
    iconUrl: require('../../assets/images/empty-lots.svg'),
  },
  [Tab.SelfBets]: {
    title: 'Вы еще не делали ставок',
    helper:
      'Ставки можно делать в разделе «Лоты». После этого лоты будут отображаться здесь.',
    iconUrl: require('../../assets/images/empty-bets.svg'),
  },
  [Tab.SelfLots]: {
    title: 'Вы еще не создавали лоты',
    helper:
      'Лоты можно создать по нажатию на кнопку «Создать лот» в левом верхнем углу или ниже.',
    iconUrl: require('../../assets/images/empty-bets.svg'),
  },
  [Tab.Favorites]: {
    title: 'Ничего не найдено',
    helper:
      'Добавляйте лоты в избранное, нажимая на флажок с сердечком в правом верхнем углу карточки.',
    iconUrl: require('../../assets/images/empty-favorite.svg'),
  },
}

const EmptyCover: React.FC = () => {
  const {
    activeTab,
    activeSort,
    activeFilter,
    lots,
    locations,
    activeLocationIndex,
  } = useAppSelector((state) => state.auction)

  const config = useMemo(() => Config[activeTab], [activeTab])

  const filteredLots = useMemo(
    () =>
      getFilteredLots(
        lots,
        activeFilter,
        activeSort,
        // @ts-expect-error qwe
        locations[activeLocationIndex] ?? activeLocationIndex,
      ),
    [lots, activeFilter, activeSort, locations, activeLocationIndex],
  )

  return filteredLots.length > 0 ? null : (
    <div className="EmptyCover">
      <div className="content">
        <div
          className="icon"
          style={{ backgroundImage: `url(${config.iconUrl})` }}
        />
        <div className="text">
          <div className="title">{config.title}</div>
          <div className="helper">{config.helper}</div>
        </div>
      </div>
    </div>
  )
}

export default EmptyCover
