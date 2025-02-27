import React, { useMemo } from 'react'
import './styles.sass'
import {
  SkinCategories,
  SkinCategoryConfig,
} from '../../../../shared/Skins/SkinCategory'

type Props = {
  activeSkinCategoryIndex: number
  setActiveSkinCategoryIndex: (skinCategoryIndex: number) => void
}

const SelectSkinCategory: React.FC<Props> = ({
  activeSkinCategoryIndex,
  setActiveSkinCategoryIndex,
}) => {
  const renderedSkinCategories = useMemo(
    () =>
      SkinCategories.map((category) => (
        <div
          key={category}
          className="category"
          style={{ transform: `translateX(-${activeSkinCategoryIndex}00%)` }}
        >
          {SkinCategoryConfig[category].name}
        </div>
      )),
    [activeSkinCategoryIndex],
  )

  const changeActiveSkinCategory = (diff: number) => {
    const newActiveSkinCategoryIndex = activeSkinCategoryIndex + diff
    const lastIndex = SkinCategories.length - 1
    if (
      newActiveSkinCategoryIndex < 0 ||
      newActiveSkinCategoryIndex > lastIndex
    ) {
      return
    }
    setActiveSkinCategoryIndex(newActiveSkinCategoryIndex)
  }

  return (
    <div className="SelectSkinCategory">
      <div className="arrow" onClick={() => changeActiveSkinCategory(-1)} />
      <div className="current">{renderedSkinCategories}</div>
      <div className="arrow" onClick={() => changeActiveSkinCategory(1)} />
    </div>
  )
}

export default SelectSkinCategory
