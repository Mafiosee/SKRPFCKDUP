import React, { useEffect, useMemo, useState } from 'react'
import './styles.sass'
import { Sort, SortConfig } from '../../../../shared/Skins/Sort'

type Props = {
  type: Sort
  setType: (sortType: Sort) => void
}

const SortSelect: React.FC<Props> = ({ type, setType }) => {
  const [openedSorts, setOpenedSorts] = useState(false)

  useEffect(() => {
    const onClick = () => setOpenedSorts(false)

    if (openedSorts) {
      document.addEventListener('click', onClick)
    }
    return () => {
      document.removeEventListener('click', onClick)
    }
  }, [openedSorts])

  const renderedSorts = useMemo(
    () =>
      Object.values(Sort).map((sortType) => (
        <div key={sortType} className="sort" onClick={() => setType(sortType)}>
          {SortConfig[sortType].name}
        </div>
      )),
    [type],
  )

  return (
    <div className={`SkinsSort ${openedSorts && '-opened'}`}>
      <div
        className="current"
        onClick={(event) => {
          event.stopPropagation()
          setOpenedSorts((prev) => !prev)
        }}
      >
        {openedSorts ? 'Выберите из списка' : SortConfig[type].name}
      </div>
      <div className="list">{renderedSorts}</div>
    </div>
  )
}

export default SortSelect
