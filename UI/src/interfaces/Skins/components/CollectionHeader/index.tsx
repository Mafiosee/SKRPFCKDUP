import React from 'react'
import './styles.sass'
import { Sort } from '../../../../shared/Skins/Sort'
import Search from '../Search'
import SortSelect from '../Sort'

type Props = {
  search: {
    value: string
    setValue: (value: string) => void
  }
  sort: {
    type: Sort
    setType: (sortType: Sort) => void
  }
}

const CollectionHeader: React.FC<Props> = ({ search, sort }) => {
  return (
    <div className="CollectionHeader">
      <div className="title">Ваша коллекция</div>
      <div className="controls">
        <SortSelect type={sort.type} setType={sort.setType} />
        <Search value={search.value} setValue={search.setValue} />
      </div>
    </div>
  )
}

export default CollectionHeader
