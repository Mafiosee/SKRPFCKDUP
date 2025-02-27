import React, { useMemo, useState } from 'react'
import './styles.sass'
import { useAppSelector } from '../../hooks/redux'
import { callClient } from '../../utils/api'
import { SkinsTradeEvents } from '../../shared/SkinsTrade/events'
import SelectSkinCategory from '../Skins/components/SelectSkinCategory'
import { SkinCategories } from '../../shared/Skins/SkinCategory'
import { Sort } from '../../shared/Skins/Sort'
import SortSelect from '../Skins/components/Sort'
import Search from '../Skins/components/Search'
import SkinsList from './components/SkinsList'
import TradeBlock from './components/TradeBlock'
import { TradeType } from './components/TradeBlock/types'

const SkinsTrade: React.FC = () => {
  const { isOpen } = useAppSelector((state) => state.skinsTrade)
  const [activeSkinCategoryIndex, setActiveSkinCategoryIndex] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [sortType, setSortType] = useState<Sort>(Sort.Name)

  const activeSkinCategory = useMemo(
    () => SkinCategories[activeSkinCategoryIndex],
    [activeSkinCategoryIndex],
  )

  return isOpen ? (
    <div id="SkinsTrade">
      <div className="background" />
      <div className="window">
        <div className="title">Обмен скинами</div>
        <div
          className="close"
          onClick={() => callClient(SkinsTradeEvents.Close)}
        />

        <div className="col -skins">
          <SelectSkinCategory
            activeSkinCategoryIndex={activeSkinCategoryIndex}
            setActiveSkinCategoryIndex={setActiveSkinCategoryIndex}
          />
          <div className="controls">
            <SortSelect type={sortType} setType={setSortType} />
            <Search value={searchValue} setValue={setSearchValue} />
          </div>
          <SkinsList
            activeSkinCategory={activeSkinCategory}
            searchValue={searchValue}
            sortType={sortType}
          />
        </div>
        <div className="col -trades">
          <TradeBlock type={TradeType.Give} />
          <TradeBlock type={TradeType.Receive} />
        </div>
      </div>
    </div>
  ) : null
}

export default SkinsTrade
