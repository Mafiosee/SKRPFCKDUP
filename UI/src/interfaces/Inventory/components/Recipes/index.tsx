import './styles.sass'
import React, { useEffect, useRef, useState } from 'react'
import BlockHeader, { FiltersType } from '../BlockHeader'
import { callClient } from '../../../../utils/api'
import { RecipeDTO } from '../../../../shared/Crafts/types'
import { ChooseRecipePayload } from '../../../../shared/Crafts/events'
import { TimeoutRef } from '../../../../types/timeoutRef'
import { BlockIcons } from '../../assets/icons'
import { ItemImagesSquad } from '../../assets/items'
import { ItemType, Quality } from '../../../../shared/inventory/itemType'
import { ControlsDefault, ControlsType, HoverInfo, Sorts } from '../../types'

type PropsType = {
  recipes: RecipeDTO[]
  hover: {
    info: HoverInfo
    set: (info: HoverInfo) => void
  }
  chooseEvent?: string
  emptyText?: React.ReactNode
  title?: string
  disableControls?: boolean
}

const QualityBg: Record<Quality, string> = {
  [Quality.Unusual]: require('../../assets/images/recipes/unusual.svg'),
  [Quality.Normal]: require('../../assets/images/recipes/common.svg'),
  [Quality.Rare]: require('../../assets/images/recipes/rare.svg'),
  [Quality.Epic]: require('../../assets/images/recipes/epic.svg'),
  [Quality.Legendary]: require('../../assets/images/recipes/legendary.svg'),
}

const Recipes: React.FC<PropsType> = ({
  recipes,
  hover,
  chooseEvent,
  emptyText,
  title,
  disableControls,
}) => {
  const [controls, setControls] = useState<ControlsType>({
    ...ControlsDefault,
    sort: Sorts.Quality,
  })
  const [tempFilters, setTempFilters] = useState<FiltersType>({
    ...ControlsDefault.filters,
  })
  const hoverItemTimeout = useRef<TimeoutRef>(null)

  const getRecipes = () => {
    let list = [...recipes]
    if (!disableControls) {
      switch (controls.sort) {
        case Sorts.Quality:
          list.sort((a, b) => a.info.quality - b.info.quality)
          break
        case Sorts.Name:
          // @ts-expect-error qwe
          list.sort((a, b) => b.info.name - a.info.name)
          break
      }
      if (Object.values(controls.filters.quality).includes(true)) {
        const qualities: Quality[] = Object.keys(controls.filters.quality)
          .map((key) => parseInt(key))
          .filter((quality: Quality) => controls.filters.quality[quality])
        list = list.filter((recipe) => qualities.includes(recipe.info.quality))
      }
      if (Object.values(controls.filters.type).includes(true)) {
        const types: ItemType[] = (
          Object.keys(controls.filters.type) as ItemType[]
        ).filter((type: ItemType) => controls.filters.type[type])
        list = list.filter((recipe) => types.includes(recipe.type))
      }
    } else {
      list.sort((a, b) => a.info.quality - b.info.quality)
    }
    return list.map(({ id, image, info }) => {
      return (
        <div
          key={id}
          className={`recipe ${!disableControls && '-hoverable'}`}
          onClick={() => {
            if (chooseEvent == null) {
              return
            }
            const payload: ChooseRecipePayload = { recipeId: id }
            callClient(chooseEvent, payload)
          }}
          onMouseEnter={() => {
            hover.set({ ...hover.info, itemId: id })
            if (hoverItemTimeout.current != null) {
              clearTimeout(hoverItemTimeout.current)
            }
          }}
          onMouseLeave={() => {
            hoverItemTimeout.current = setTimeout(() => {
              hover.set({ ...hover.info, itemId: null })
            }, 50)
          }}
        >
          <div
            className="background"
            style={{
              backgroundImage: `url(${QualityBg[info.quality]})`,
              backgroundSize: '100% 100%',
            }}
          ></div>
          <div
            className="image"
            style={{
              backgroundImage: `url(${ItemImagesSquad[`${image}.png`]}) `,
            }}
          />
        </div>
      )
    })
  }

  useEffect(() => {
    if (controls.isOpenFiltersList) {
      setTempFilters({ ...controls.filters })
    } else {
      setTempFilters({ ...ControlsDefault.filters })
    }
  }, [controls.isOpenFiltersList])

  return (
    <div className="_Inventory_Recipes">
      <BlockHeader
        icon={BlockIcons.Recipes}
        title={title ?? 'Рецепты'}
        hasControls={!disableControls}
        hasSearch={false}
        controls={controls}
        weight={null}
        setControls={(newValues) =>
          setControls((prev) => ({ ...prev, ...newValues }))
        }
        tempFilters={tempFilters}
        setTempFilters={(newValues) =>
          setTempFilters((prev) => ({ ...prev, ...newValues }))
        }
      />
      <div className="list">
        {recipes.length ? (
          getRecipes()
        ) : emptyText ? (
          <div className="empty">
            <div className="icon" />
            <div className="text">{emptyText}</div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Recipes
